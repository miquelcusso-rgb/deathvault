/**
 * fetch-trends.mjs
 * Daily script that checks for trending disease/pandemic signals using
 * publicly available sources and writes results to data/trend-signals.json.
 *
 * Sources attempted (in order of reliability):
 *  1. WHO Disease Outbreak News RSS — definitive signals
 *  2. Google Trends daily trends API — often blocks bots; handles gracefully
 *  3. ProMED RSS — emerging disease signals
 *
 * Writes to: data/trend-signals.json
 * Run: node scripts/fetch-trends.mjs
 * Requires: Node 18+ (native fetch, no npm deps)
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, "..");
const OUTPUT = join(ROOT, "data", "trend-signals.json");

// ── Disease keyword set for trend matching ────────────────────────────────────

const DISEASE_KEYWORDS = [
  "hantavirus", "hanta", "hondius",
  "hiv", "aids",
  "malaria",
  "cholera",
  "covid", "coronavirus", "sars",
  "ebola", "marburg",
  "mpox", "monkeypox",
  "dengue",
  "influenza", "flu",
  "rabies",
  "plague", "yersinia",
  "tuberculosis", "tb",
  "measles",
  "pandemic", "epidemic", "outbreak",
];

// ── Helper: fetch with timeout ────────────────────────────────────────────────

async function fetchWithTimeout(url, options = {}, timeoutMs = 20_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

// ── XML helpers ───────────────────────────────────────────────────────────────

function extractTag(xml, tag) {
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i");
  const m = xml.match(cdataRe);
  if (m) return m[1].trim();
  const plainRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m2 = xml.match(plainRe);
  if (m2) return m2[1].replace(/<[^>]+>/g, "").trim();
  return "";
}

function extractAll(xml, tag) {
  const re = new RegExp(`<${tag}[\\s>][\\s\\S]*?<\\/${tag}>`, "gi");
  return [...xml.matchAll(re)].map((m) => m[0]);
}

function parseRSSItems(xml) {
  const items = extractAll(xml, "item");
  return items.map((item) => ({
    title: extractTag(item, "title"),
    link:  extractTag(item, "link"),
    date:  extractTag(item, "pubDate"),
    desc:  extractTag(item, "description"),
  }));
}

// ── Check if a text string mentions any disease keyword ──────────────────────

function matchesDiseaseKeyword(text) {
  const lower = text.toLowerCase();
  return DISEASE_KEYWORDS.find((kw) => lower.includes(kw)) ?? null;
}

// ── Source 1: WHO DON RSS ─────────────────────────────────────────────────────

async function fetchWHOSignals() {
  const hotTopics = [];
  const trending  = new Set();

  try {
    const res = await fetchWithTimeout(
      "https://www.who.int/feeds/entity/csr/don/en/rss.xml",
      {
        headers: {
          "User-Agent": "DeathVault-TrendBot/1.0 (https://deathvault.app)",
          "Accept": "application/rss+xml, text/xml",
        },
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseRSSItems(xml);

    const cutoff = Date.now() - 14 * 24 * 3600 * 1000; // last 14 days
    for (const item of items) {
      if (!item.title) continue;
      const pubDate = item.date ? new Date(item.date).getTime() : 0;
      if (pubDate < cutoff) continue;

      const keyword = matchesDiseaseKeyword(item.title + " " + item.desc);
      if (keyword) {
        trending.add(keyword);
        hotTopics.push({
          term:   item.title.slice(0, 120),
          source: "WHO DON",
          date:   item.date ? new Date(item.date).toISOString().slice(0, 10) : null,
          url:    item.link || null,
        });
      }
    }
    console.log(`  ✓ WHO DON: ${hotTopics.length} trending disease alerts (last 14 days)`);
  } catch (err) {
    console.warn(`  ✗ WHO DON: ${err.message}`);
  }

  return { trending: [...trending], hotTopics };
}

// ── Source 2: Google Trends daily trends ─────────────────────────────────────
// Google's unofficial endpoint; frequently blocks bots — handle gracefully.

async function fetchGoogleTrends() {
  const trending = new Set();
  const hotTopics = [];

  try {
    const url = "https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=-60&geo=US&ns=15";
    const res = await fetchWithTimeout(
      url,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; DeathVault-TrendBot/1.0)",
          "Accept": "application/json, text/plain",
        },
      },
      15_000
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let text = await res.text();

    // Strip the ")]}'\n" prefix that Google prepends to prevent JSON hijacking
    text = text.replace(/^\)\]\}'\s*\n?/, "");

    const data = JSON.parse(text);
    const stories = data?.default?.trendingSearchesDays?.[0]?.trendingSearches ?? [];

    for (const story of stories) {
      const title = story?.title?.query ?? "";
      const articles = story?.articles ?? [];
      const allText = [title, ...articles.map((a) => a.title ?? "")].join(" ");

      const keyword = matchesDiseaseKeyword(allText);
      if (keyword) {
        trending.add(keyword);
        hotTopics.push({
          term:   title.slice(0, 120),
          source: "Google Trends",
          date:   new Date().toISOString().slice(0, 10),
          url:    story?.shareUrl ?? null,
        });
      }
    }

    console.log(`  ✓ Google Trends: checked ${stories.length} stories, ${hotTopics.length} disease-related`);
  } catch (err) {
    // Google Trends frequently blocks — this is expected; do not fail
    console.warn(`  ✗ Google Trends: ${err.message} (expected — skipping)`);
  }

  return { trending: [...trending], hotTopics };
}

// ── Source 3: ProMED RSS ──────────────────────────────────────────────────────

async function fetchProMEDSignals() {
  const trending  = new Set();
  const hotTopics = [];

  try {
    const res = await fetchWithTimeout(
      "https://promedmail.org/feed/",
      {
        headers: {
          "User-Agent": "DeathVault-TrendBot/1.0 (https://deathvault.app)",
          "Accept": "application/rss+xml, text/xml",
        },
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseRSSItems(xml);

    const cutoff = Date.now() - 7 * 24 * 3600 * 1000; // last 7 days
    for (const item of items) {
      if (!item.title) continue;
      const pubDate = item.date ? new Date(item.date).getTime() : 0;
      if (pubDate < cutoff) continue;

      const keyword = matchesDiseaseKeyword(item.title + " " + item.desc);
      if (keyword) {
        trending.add(keyword);
        hotTopics.push({
          term:   item.title.slice(0, 120),
          source: "ProMED",
          date:   item.date ? new Date(item.date).toISOString().slice(0, 10) : null,
          url:    item.link || null,
        });
      }
    }
    console.log(`  ✓ ProMED: ${hotTopics.length} disease items (last 7 days)`);
  } catch (err) {
    console.warn(`  ✗ ProMED: ${err.message}`);
  }

  return { trending: [...trending], hotTopics };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("📈 Fetching trending disease signals...\n");

  const [who, google, promed] = await Promise.all([
    fetchWHOSignals(),
    fetchGoogleTrends(),
    fetchProMEDSignals(),
  ]);

  // Merge and deduplicate
  const allTrending = [...new Set([...who.trending, ...google.trending, ...promed.trending])];
  const allHotTopics = [...who.hotTopics, ...google.hotTopics, ...promed.hotTopics]
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    .slice(0, 20); // cap at 20 items

  const output = {
    lastUpdated: new Date().toISOString(),
    trending:    allTrending,
    hotTopics:   allHotTopics,
  };

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`\n✅ Written trend-signals.json`);
  console.log(`   Trending keywords: ${allTrending.join(", ") || "(none)"}`);
  console.log(`   Hot topics: ${allHotTopics.length}`);
}

main().catch((err) => {
  console.error("Fatal error in fetch-trends:", err);
  // Never crash the GitHub Action
  process.exit(0);
});
