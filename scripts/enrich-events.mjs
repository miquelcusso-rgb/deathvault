/**
 * enrich-events.mjs
 * Daily script that fetches Wikipedia summaries and thumbnails for all
 * ongoing pandemic events, and writes them to data/event-updates.json.
 *
 * Writes to: data/event-updates.json
 * Run: node scripts/enrich-events.mjs
 * Requires: Node 18+ (native fetch, no npm deps)
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, "..");
const OUTPUT = join(ROOT, "data", "event-updates.json");

// ── Ongoing events → Wikipedia article titles ─────────────────────────────────

const WIKI_MAP = {
  "hantavirus": "Hantavirus",
  "hiv-aids":   "HIV/AIDS",
  "malaria":    "Malaria",
  "covid-19":   "COVID-19_pandemic",
  "cholera":    "Cholera",
};

// ── Load existing data (used for graceful fallback per-event) ─────────────────

function loadExisting() {
  if (!existsSync(OUTPUT)) return { events: {} };
  try {
    return JSON.parse(readFileSync(OUTPUT, "utf-8"));
  } catch {
    return { events: {} };
  }
}

// ── Fetch Wikipedia summary via REST API ──────────────────────────────────────

async function fetchWikiSummary(title, eventId, existingEvents) {
  const encoded = encodeURIComponent(title);
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "DeathVault-EnrichBot/1.0 (https://deathvault.app; contact: hi@deathvault.app)",
        "Accept": "application/json",
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const result = {
      wikiTitle:   data.title ?? title,
      wikiSummary: data.extract ?? "",
      wikiImage:   data.thumbnail?.source ?? null,
      wikiUrl:     data.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encoded}`,
      fetchedAt:   new Date().toISOString(),
    };

    console.log(`  ✓ ${eventId} (${title}): ${result.wikiSummary.length} chars${result.wikiImage ? ", has image" : ""}`);
    return result;

  } catch (err) {
    console.warn(`  ✗ ${eventId} (${title}): ${err.message} — keeping previous data`);

    // Return existing data for this event if available
    if (existingEvents[eventId]) {
      return existingEvents[eventId];
    }
    // No previous data — return null entry
    return null;

  } finally {
    clearTimeout(timeout);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("📖 Enriching ongoing events with Wikipedia summaries...\n");

  const existing = loadExisting();
  const existingEvents = existing.events ?? {};

  // Fetch all events sequentially to be polite to Wikipedia's API
  // (their rate limit is generous but serial is safer in CI)
  const events = {};
  for (const [eventId, wikiTitle] of Object.entries(WIKI_MAP)) {
    const result = await fetchWikiSummary(wikiTitle, eventId, existingEvents);
    if (result) {
      events[eventId] = result;
    } else if (existingEvents[eventId]) {
      // Keep old data if fetch failed and produced null
      events[eventId] = existingEvents[eventId];
    }
    // Small delay to be polite to Wikipedia
    await new Promise((r) => setTimeout(r, 500));
  }

  const output = {
    lastUpdated: new Date().toISOString(),
    events,
  };

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`\n✅ Written event-updates.json with ${Object.keys(events).length} events`);
}

main().catch((err) => {
  console.error("Fatal error in enrich-events:", err);
  // Never crash the GitHub Action
  process.exit(0);
});
