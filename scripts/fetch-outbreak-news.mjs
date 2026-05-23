/**
 * fetch-outbreak-news.mjs
 * Daily script to fetch disease outbreak news from WHO, ECDC, CDC, PAHO.
 * Parses RSS/Atom feeds, maps items to tracked event IDs, merges with
 * existing news-feed.json, and writes the updated file.
 *
 * Run: node scripts/fetch-outbreak-news.mjs
 * Requires Node 18+ (native fetch).
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");
const OUTPUT = join(ROOT, "data", "news-feed.json");

// ── Feed sources ────────────────────────────────────────────────────────────

const FEEDS = [
  {
    url: "https://www.who.int/feeds/entity/csr/don/en/rss.xml",
    source: "WHO",
    type: "rss",
  },
  {
    url: "https://www.ecdc.europa.eu/en/taxonomy/term/1295/feed",
    source: "ECDC",
    type: "rss",
  },
  {
    url: "https://www.ecdc.europa.eu/en/taxonomy/term/1310/feed",
    source: "ECDC",
    type: "rss",
  },
  {
    url: "https://emergency.cdc.gov/han/han.atom",
    source: "CDC",
    type: "atom",
  },
  {
    url: "https://www.paho.org/en/rss.xml",
    source: "PAHO",
    type: "rss",
  },
  // PAHO Spanish feed — covers Latin America outbreaks in Spanish
  {
    url: "https://www.paho.org/es/rss.xml",
    source: "PAHO-ES",
    type: "rss",
  },
  // ProMED — Program for Monitoring Emerging Diseases
  {
    url: "https://promedmail.org/feed/",
    source: "ProMED",
    type: "rss",
  },
  // ReliefWeb disease/health alerts
  {
    url: "https://reliefweb.int/updates?format=rss&primary_type=HA",
    source: "ReliefWeb",
    type: "rss",
  },
];

// ── Keyword → event ID mapping ───────────────────────────────────────────────

const KEYWORD_MAP = {
  "hantavirus":  ["hantavirus", "hanta", "andes virus", "andv", "hps", "hfrs", "hondius"],
  "hiv-aids":    ["hiv", "aids", "antiretroviral", "unaids", "prep", "vih", "sida"],
  "malaria":     ["malaria", "plasmodium", "artemisinin", "anopheles", "paludismo"],
  "cholera":     ["cholera", "vibrio cholerae", "cólera", "colera"],
  "covid-19":    ["covid", "sars-cov-2", "coronavirus", "covid-19"],
  "ebola":       ["ebola", "marburg", "viral hemorrhagic", "haemorrhagic fever", "fiebre hemorrágica"],
  "mpox":        ["mpox", "monkeypox", "viruela del mono"],
  "dengue":      ["dengue", "arbovirus", "aedes aegypti"],
};

// ── Urgency keywords ─────────────────────────────────────────────────────────

const URGENT_KEYWORDS = [
  "alert", "outbreak", "cluster", "deaths", "fatalities", "emergency",
  "rapid risk", "health alert", "han alert", "new cases", "confirmed cases",
];

// ── XML helpers ──────────────────────────────────────────────────────────────

function extractTag(xml, tag) {
  // Handle CDATA
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i");
  const m = xml.match(cdataRe);
  if (m) return m[1].trim();
  // Plain content
  const plainRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m2 = xml.match(plainRe);
  if (m2) return m2[1].replace(/<[^>]+>/g, "").trim();
  // Self-closing href (for <link href="..." /> in Atom)
  const hrefRe = new RegExp(`<${tag}[^>]+href="([^"]+)"`, "i");
  const m3 = xml.match(hrefRe);
  if (m3) return m3[1].trim();
  return "";
}

function extractAll(xml, tag) {
  const re = new RegExp(`<${tag}[\\s>][\\s\\S]*?<\\/${tag}>`, "gi");
  return [...xml.matchAll(re)].map((m) => m[0]);
}

function parseRSS(xml, source) {
  const items = extractAll(xml, "item");
  return items.map((item) => ({
    title: extractTag(item, "title"),
    url:   extractTag(item, "link"),
    date:  extractTag(item, "pubDate"),
    desc:  extractTag(item, "description"),
    source,
  }));
}

function parseAtom(xml, source) {
  const items = extractAll(xml, "entry");
  return items.map((item) => ({
    title: extractTag(item, "title"),
    url:   extractTag(item, "link") || extractTag(item, "id"),
    date:  extractTag(item, "published") || extractTag(item, "updated"),
    desc:  extractTag(item, "summary") || extractTag(item, "content"),
    source,
  }));
}

// ── Classify & score ─────────────────────────────────────────────────────────

function matchEventId(title, desc) {
  const text = `${title} ${desc}`.toLowerCase();
  for (const [eventId, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some((kw) => text.includes(kw))) {
      return eventId;
    }
  }
  return null;
}

function isUrgent(title, desc) {
  const text = `${title} ${desc}`.toLowerCase();
  return URGENT_KEYWORDS.some((kw) => text.includes(kw));
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
}

function parseDate(str) {
  if (!str) return new Date(0);
  try { return new Date(str); } catch { return new Date(0); }
}

function toISODate(str) {
  const d = parseDate(str);
  if (isNaN(d)) return null;
  return d.toISOString().slice(0, 10);
}

// ── Fetch with timeout & User-Agent ─────────────────────────────────────────

async function fetchFeed(feed) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "PlagueAtlas-NewsBot/1.0 (https://plagueatlas.com)",
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const parsed = feed.type === "atom" ? parseAtom(text, feed.source) : parseRSS(text, feed.source);
    console.log(`  ✓ ${feed.source} (${feed.url.split("/").slice(-2).join("/")}): ${parsed.length} items`);
    return parsed;
  } catch (err) {
    console.warn(`  ✗ ${feed.source} (${feed.url}): ${err.message}`);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

// ── Translation (bilingual headlines) ───────────────────────────────────────
// Each news item is stored with BOTH headlineEn and headlineEs so the EN and ES
// pages always show the headline in the reader's language. Uses MyMemory's free
// endpoint (no key). On any failure we fall back to the original text.

function sourceLang(source) {
  return /(-ES|_ES)$/i.test(source || "") ? "es" : "en";
}

async function translate(text, from, to) {
  if (!text || from === to) return text;
  try {
    const q = encodeURIComponent(text.slice(0, 480)); // MyMemory ~500 char limit
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${q}&langpair=${from}|${to}&de=bot@plagueatlas.com`,
      { headers: { "User-Agent": "PlagueAtlas-NewsBot/1.0" }, signal: AbortSignal.timeout(12000) },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const out = data?.responseData?.translatedText;
    if (out && typeof out === "string" && !/MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(out)) {
      return out.trim();
    }
    return text;
  } catch (err) {
    console.warn(`  ⚠ translate(${from}→${to}) failed: ${err.message}`);
    return text;
  }
}

/** Ensure every item has headlineEn + headlineEs. Only translates what's missing. */
async function bilingualize(items) {
  let done = 0;
  for (const item of items) {
    if (item.headlineEn && item.headlineEs) continue; // already bilingual
    if (done >= 60) break; // safety cap per run (respect free-tier limits)
    const orig = item.headline || item.headlineEn || item.headlineEs || "";
    if (sourceLang(item.source) === "es") {
      item.headlineEs = item.headlineEs || orig;
      item.headlineEn = item.headlineEn || (await translate(orig, "es", "en"));
    } else {
      item.headlineEn = item.headlineEn || orig;
      item.headlineEs = item.headlineEs || (await translate(orig, "en", "es"));
    }
    done++;
    await new Promise((r) => setTimeout(r, 250)); // gentle pacing for the free API
  }
  if (done) console.log(`🌐 Translated ${done} headline(s) to add the missing language`);
  return done;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍 Fetching outbreak news from WHO, ECDC, CDC, PAHO, ProMED, ReliefWeb...\n");

  // Load existing feed (preserve manual/curated items)
  let existing = { lastUpdated: "", items: [] };
  if (existsSync(OUTPUT)) {
    try { existing = JSON.parse(readFileSync(OUTPUT, "utf-8")); } catch {}
  }
  const manualItems = existing.items.filter((i) => i.manual === true);
  const existingIds = new Set(existing.items.map((i) => i.id));

  // Fetch all feeds in parallel
  const allRaw = (await Promise.all(FEEDS.map(fetchFeed))).flat();

  // Filter: last 90 days only
  const cutoff = Date.now() - 90 * 24 * 3600 * 1000;
  const recent = allRaw.filter((item) => parseDate(item.date).getTime() > cutoff);

  // Map to news items
  const newItems = [];
  for (const raw of recent) {
    if (!raw.title || raw.title.length < 10) continue;
    const eventId = matchEventId(raw.title, raw.desc);
    if (!eventId) continue;

    const isoDate = toISODate(raw.date);
    if (!isoDate) continue;

    // Generate deterministic ID from source + title slug
    const id = `${raw.source.toLowerCase()}-${slugify(raw.title)}-${isoDate}`;
    if (existingIds.has(id)) continue; // already known

    newItems.push({
      id,
      eventId,
      date: isoDate,
      headline: raw.title.slice(0, 180),
      source: raw.source,
      url: raw.url,
      urgent: isUrgent(raw.title, raw.desc),
    });
  }

  console.log(`\n📰 Found ${newItems.length} new items across tracked events`);

  // Merge: new + existing (non-manual), keep last 90 days, max 8 per eventId
  const merged = [...manualItems, ...newItems, ...existing.items.filter((i) => !i.manual)]
    .filter((item, idx, arr) => arr.findIndex((i) => i.id === item.id) === idx) // dedupe
    .filter((i) => parseDate(i.date).getTime() > cutoff)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Cap per eventId
  const countPerEvent = {};
  const capped = merged.filter((item) => {
    countPerEvent[item.eventId] = (countPerEvent[item.eventId] ?? 0) + 1;
    return countPerEvent[item.eventId] <= 8;
  });

  // Add the missing-language headline to every item (new + any legacy items)
  await bilingualize(capped);

  const output = {
    lastUpdated: new Date().toISOString(),
    items: capped,
  };

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`\n✅ Written ${capped.length} items to data/news-feed.json`);
  console.log(`   Last updated: ${output.lastUpdated}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
