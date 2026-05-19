/**
 * update-death-rates.mjs
 * Daily script to fetch current annual death estimates from WHO GHO API
 * and UNAIDS for ongoing pandemics tracked by DeathVault / PlagueAtlas.
 *
 * Writes to: data/death-rates.json
 * Run: node scripts/update-death-rates.mjs
 * Requires: Node 18+ (native fetch, no npm deps)
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, "..");
const OUTPUT = join(ROOT, "data", "death-rates.json");

// ── Hardcoded fallbacks (used if any API fails AND no previous data exists) ──

const FALLBACKS = {
  malaria:    { annualDeaths: 597_000, year: 2025, source: "WHO World Malaria Report 2025 (fallback)" },
  cholera:    { annualDeaths: 100_000, year: 2025, source: "WHO 2025 (fallback)" },
  "hiv-aids": { annualDeaths: 680_000, year: 2024, source: "UNAIDS 2024 (fallback)" },
  "covid-19": { annualDeaths:  80_000, year: 2026, source: "WHO estimate 2026 (fallback)" },
  hantavirus: { annualDeaths:     200, year: 2026, source: "CDC/WHO 2026 (fallback)" },
};

// ── Load existing data (for graceful fallback if an API call fails) ──────────

function loadExisting() {
  if (!existsSync(OUTPUT)) return { rates: {} };
  try {
    return JSON.parse(readFileSync(OUTPUT, "utf-8"));
  } catch {
    return { rates: {} };
  }
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

async function fetchJSON(url, label) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "DeathVault-DataBot/1.0 (https://deathvault.app)",
        "Accept": "application/json",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(`  ✓ ${label}`);
    return data;
  } catch (err) {
    console.warn(`  ✗ ${label}: ${err.message}`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ── WHO GHO API parser ────────────────────────────────────────────────────────
// GHO API returns { value: [ { TimeDim, NumericValue, SpatialDim, ... } ] }
// We want the global (SpatialDim = "GLOBAL" or null) most recent year.

function parseGHO(data, label) {
  if (!data?.value?.length) {
    console.warn(`  ⚠ ${label}: empty GHO response`);
    return null;
  }

  // Filter for global totals (SpatialDim = "GLOBAL" or spatial dimension is missing)
  const globalRows = data.value.filter(
    (r) => !r.SpatialDim || r.SpatialDim === "GLOBAL" || r.SpatialDimType === "GLOBAL"
  );

  // If no global rows, try all rows and sum by year
  const rows = globalRows.length > 0 ? globalRows : data.value;

  // Group by year, sum NumericValue
  const byYear = {};
  for (const row of rows) {
    const year = parseInt(row.TimeDim, 10);
    const val  = parseFloat(row.NumericValue);
    if (!isNaN(year) && !isNaN(val)) {
      byYear[year] = (byYear[year] ?? 0) + val;
    }
  }

  if (!Object.keys(byYear).length) {
    console.warn(`  ⚠ ${label}: no numeric values found`);
    return null;
  }

  const latestYear = Math.max(...Object.keys(byYear).map(Number));
  const total = Math.round(byYear[latestYear]);
  console.log(`  → ${label}: ${total.toLocaleString()} deaths in ${latestYear}`);
  return { annualDeaths: total, year: latestYear };
}

// ── Fetch malaria deaths from WHO GHO ────────────────────────────────────────

async function fetchMalaria(existing) {
  // WHO GHO indicator: MALARIA_EST_DEATHS — estimated malaria deaths
  const data = await fetchJSON(
    "https://ghoapi.azureedge.net/api/MALARIA_EST_DEATHS?$filter=SpatialDim eq 'GLOBAL'",
    "WHO GHO — malaria deaths"
  );

  const parsed = data ? parseGHO(data, "Malaria") : null;
  if (parsed) {
    return { ...parsed, source: `WHO GHO MALARIA_EST_DEATHS (${parsed.year})` };
  }

  // Fallback to existing data, then hardcoded
  if (existing.rates?.malaria) {
    console.log(`  → malaria: using existing data (${existing.rates.malaria.year})`);
    return existing.rates.malaria;
  }
  return FALLBACKS.malaria;
}

// ── Fetch cholera deaths from WHO GHO ────────────────────────────────────────

async function fetchCholera(existing) {
  // Try WHO GHO cholera reported deaths
  const data = await fetchJSON(
    "https://ghoapi.azureedge.net/api/CHOLERA_000?$filter=SpatialDim eq 'GLOBAL'",
    "WHO GHO — cholera deaths"
  );

  const parsed = data ? parseGHO(data, "Cholera") : null;
  if (parsed) {
    return { ...parsed, source: `WHO GHO CHOLERA_000 (${parsed.year})` };
  }

  // Try fallback endpoint with different indicator code
  const data2 = await fetchJSON(
    "https://ghoapi.azureedge.net/api/WHS3_62",
    "WHO GHO — cholera deaths (alt)"
  );
  const parsed2 = data2 ? parseGHO(data2, "Cholera (alt)") : null;
  if (parsed2) {
    return { ...parsed2, source: `WHO GHO WHS3_62 (${parsed2.year})` };
  }

  if (existing.rates?.cholera) {
    console.log(`  → cholera: using existing data (${existing.rates.cholera.year})`);
    return existing.rates.cholera;
  }
  return FALLBACKS.cholera;
}

// ── Fetch HIV/AIDS deaths ─────────────────────────────────────────────────────
// UNAIDS doesn't have a clean public API; try WHO GHO HIV indicator as fallback.

async function fetchHIV(existing) {
  // WHO GHO: HIV_0000000001 = HIV deaths
  const data = await fetchJSON(
    "https://ghoapi.azureedge.net/api/HIV_0000000001?$filter=SpatialDim eq 'GLOBAL'",
    "WHO GHO — HIV deaths"
  );

  const parsed = data ? parseGHO(data, "HIV/AIDS") : null;
  if (parsed) {
    return { ...parsed, source: `WHO GHO HIV_0000000001 (${parsed.year})` };
  }

  if (existing.rates?.["hiv-aids"]) {
    console.log(`  → hiv-aids: using existing data (${existing.rates["hiv-aids"].year})`);
    return existing.rates["hiv-aids"];
  }
  return FALLBACKS["hiv-aids"];
}

// ── COVID-19 and Hantavirus — no reliable daily API; keep existing or fallback ─

function keepOrFallback(key, existing) {
  if (existing.rates?.[key]) {
    return existing.rates[key];
  }
  return FALLBACKS[key];
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("📊 Updating death rates from WHO GHO API...\n");
  const existing = loadExisting();

  const [malaria, cholera, hivAids] = await Promise.all([
    fetchMalaria(existing),
    fetchCholera(existing),
    fetchHIV(existing),
  ]);

  const rates = {
    malaria,
    cholera,
    "hiv-aids":  hivAids,
    "covid-19":  keepOrFallback("covid-19",  existing),
    hantavirus:  keepOrFallback("hantavirus", existing),
  };

  const output = {
    lastUpdated: new Date().toISOString(),
    rates,
  };

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`\n✅ Written death-rates.json — ${new Date().toISOString()}`);
  for (const [key, val] of Object.entries(rates)) {
    console.log(`   ${key}: ${val.annualDeaths.toLocaleString()} deaths/yr (${val.year})`);
  }
}

main().catch((err) => {
  console.error("Fatal error in update-death-rates:", err);
  // Never crash the GitHub Action — exit 0
  process.exit(0);
});
