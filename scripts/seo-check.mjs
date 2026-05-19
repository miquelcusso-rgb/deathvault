/**
 * seo-check.mjs
 * Weekly SEO health check for DeathVault / PlagueAtlas.
 *
 * Checks:
 *  1. All event IDs in EVENTS array have a slug route under app/pandemic/[slug]
 *  2. news-feed.json freshness — warns if any urgent item is older than 14 days
 *  3. death-rates.json freshness — warns if any rate is older than 30 days
 *  4. event-updates.json freshness — warns if Wikipedia data is older than 7 days
 *  5. trend-signals.json freshness — warns if older than 2 days
 *
 * Exit code: always 0 (never fails the workflow — report only)
 * Run: node scripts/seo-check.mjs
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, "..");

const NOW = Date.now();

// ── Helpers ───────────────────────────────────────────────────────────────────

function readJSON(relPath) {
  const fullPath = join(ROOT, relPath);
  if (!existsSync(fullPath)) return null;
  try { return JSON.parse(readFileSync(fullPath, "utf-8")); } catch { return null; }
}

function ageInDays(isoString) {
  if (!isoString) return Infinity;
  return (NOW - new Date(isoString).getTime()) / (1000 * 60 * 60 * 24);
}

function pass(label) { console.log(`  ✓  ${label}`); }
function warn(label) { console.log(`  ✗  ${label}`); }
function info(label) { console.log(`     ${label}`); }

// ── Check 1: Event slug routes ─────────────────────────────────────────────

function checkEventSlugs() {
  console.log("\n── Event Slug Routes ──");

  const eventsData = readJSON("data/events.ts");
  // events.ts is TypeScript, not JSON — we parse the IDs with a regex instead
  const eventsFile = join(ROOT, "data", "events.ts");
  if (!existsSync(eventsFile)) {
    warn("data/events.ts not found");
    return;
  }

  const src = readFileSync(eventsFile, "utf-8");
  // Extract all `id: "..."` values
  const idMatches = [...src.matchAll(/\bid:\s*["']([^"']+)["']/g)];
  const eventIds  = idMatches.map((m) => m[1]);

  if (!eventIds.length) {
    warn("No event IDs found in data/events.ts");
    return;
  }

  info(`Found ${eventIds.length} event IDs`);

  // Check if the pandemic slug route directory exists
  const slugRouteDir = join(ROOT, "app", "pandemic");
  const slugRouteExists = existsSync(slugRouteDir);

  if (!slugRouteExists) {
    warn(`app/pandemic/[slug] route directory does not exist at ${slugRouteDir}`);
    info("Consider creating individual pandemic detail pages for better SEO");
    return;
  }

  // Check for [slug] dynamic route
  const dynamicRoute = join(slugRouteDir, "[slug]");
  if (existsSync(dynamicRoute)) {
    pass(`Dynamic route app/pandemic/[slug] exists — covers all ${eventIds.length} events`);
    info(`Event IDs: ${eventIds.join(", ")}`);
  } else {
    // Check for static routes per event
    let missingCount = 0;
    for (const id of eventIds) {
      const staticRoute = join(slugRouteDir, id);
      if (!existsSync(staticRoute)) {
        missingCount++;
        if (missingCount <= 5) info(`Missing route: app/pandemic/${id}`);
      }
    }
    if (missingCount > 0) {
      warn(`${missingCount} / ${eventIds.length} events missing dedicated routes`);
    } else {
      pass(`All ${eventIds.length} events have static routes`);
    }
  }
}

// ── Check 2: News feed freshness ──────────────────────────────────────────────

function checkNewsFeed() {
  console.log("\n── News Feed (data/news-feed.json) ──");

  const feed = readJSON("data/news-feed.json");
  if (!feed) { warn("data/news-feed.json not found"); return; }

  const feedAge = ageInDays(feed.lastUpdated);
  if (feedAge > 2) {
    warn(`Feed last updated ${feedAge.toFixed(1)} days ago (expected: daily)`);
  } else {
    pass(`Feed last updated ${feedAge.toFixed(1)} days ago`);
  }

  const items = feed.items ?? [];
  info(`Total items: ${items.length}`);

  const urgentOld = items.filter((i) => i.urgent && ageInDays(i.date) > 14);
  if (urgentOld.length > 0) {
    warn(`${urgentOld.length} URGENT item(s) older than 14 days — consider archiving`);
    for (const item of urgentOld.slice(0, 3)) {
      info(`  [${item.date}] ${item.headline?.slice(0, 80)}`);
    }
  } else {
    pass(`No stale urgent items (all urgent items < 14 days old)`);
  }

  // Check coverage per eventId
  const byEvent = {};
  for (const item of items) {
    byEvent[item.eventId] = (byEvent[item.eventId] ?? 0) + 1;
  }
  info(`Coverage: ${Object.entries(byEvent).map(([k, v]) => `${k}:${v}`).join(", ")}`);
}

// ── Check 3: Death rates freshness ───────────────────────────────────────────

function checkDeathRates() {
  console.log("\n── Death Rates (data/death-rates.json) ──");

  const rates = readJSON("data/death-rates.json");
  if (!rates) { warn("data/death-rates.json not found"); return; }

  const fileAge = ageInDays(rates.lastUpdated);
  if (fileAge > 2) {
    warn(`File last updated ${fileAge.toFixed(1)} days ago (expected: daily)`);
  } else {
    pass(`File last updated ${fileAge.toFixed(1)} days ago`);
  }

  for (const [key, val] of Object.entries(rates.rates ?? {})) {
    const dataAge = NOW / (1000 * 60 * 60 * 24 * 365) + 1970 - (val.year ?? 0); // rough years since data year
    const isStale = (new Date().getFullYear() - (val.year ?? 0)) > 2;
    if (isStale) {
      warn(`${key}: data from ${val.year} may be outdated — ${val.source}`);
    } else {
      pass(`${key}: ${val.annualDeaths.toLocaleString()} deaths/yr (${val.year}) — ${val.source}`);
    }
  }
}

// ── Check 4: Event updates freshness ─────────────────────────────────────────

function checkEventUpdates() {
  console.log("\n── Event Updates (data/event-updates.json) ──");

  const updates = readJSON("data/event-updates.json");
  if (!updates) { warn("data/event-updates.json not found"); return; }

  const fileAge = ageInDays(updates.lastUpdated);
  if (fileAge > 7) {
    warn(`File last updated ${fileAge.toFixed(1)} days ago (expected: weekly)`);
  } else {
    pass(`File last updated ${fileAge.toFixed(1)} days ago`);
  }

  const events = updates.events ?? {};
  const count = Object.keys(events).length;
  if (count === 0) {
    warn("No event enrichment data found");
  } else {
    pass(`${count} events enriched with Wikipedia data`);
    for (const [id, ev] of Object.entries(events)) {
      const hasImage = !!ev.wikiImage;
      const summaryLen = ev.wikiSummary?.length ?? 0;
      info(`  ${id}: ${summaryLen} chars${hasImage ? ", has image" : ", no image"}`);
    }
  }
}

// ── Check 5: Trend signals freshness ─────────────────────────────────────────

function checkTrendSignals() {
  console.log("\n── Trend Signals (data/trend-signals.json) ──");

  const signals = readJSON("data/trend-signals.json");
  if (!signals) { warn("data/trend-signals.json not found"); return; }

  const fileAge = ageInDays(signals.lastUpdated);
  if (fileAge > 2) {
    warn(`File last updated ${fileAge.toFixed(1)} days ago (expected: daily)`);
  } else {
    pass(`File last updated ${fileAge.toFixed(1)} days ago`);
  }

  const trending = signals.trending ?? [];
  const hotTopics = signals.hotTopics ?? [];
  info(`Trending: ${trending.join(", ") || "(none)"}`);
  info(`Hot topics: ${hotTopics.length}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const dateStr = new Date().toISOString().slice(0, 10);
  console.log(`\n${"═".repeat(60)}`);
  console.log(`  SEO HEALTH CHECK — ${dateStr}`);
  console.log(`  DeathVault / PlagueAtlas`);
  console.log(`${"═".repeat(60)}`);

  checkEventSlugs();
  checkNewsFeed();
  checkDeathRates();
  checkEventUpdates();
  checkTrendSignals();

  console.log(`\n${"═".repeat(60)}`);
  console.log(`  Check complete. Review warnings above.`);
  console.log(`${"═".repeat(60)}\n`);
}

main();
// Always exit 0 — never fail the GitHub Action
process.exit(0);
