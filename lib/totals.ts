// Single source of truth for brand-filtered totals, computed from the dataset.
// Prevents hardcoded counts (e.g. a stale "813M+ / 16 events") from drifting
// out of sync with the real EVENTS data.
import { EVENTS } from "@/data/events";
import { BRAND_CATEGORIES, type Brand } from "@/lib/brand";

export interface BrandTotals {
  count: number;        // number of events for this brand
  deaths: number;       // summed death estimates
  label: string;        // e.g. "917M+"
}

export function brandTotals(brand: Brand): BrandTotals {
  const evs = EVENTS.filter((e) => BRAND_CATEGORIES[brand].includes(e.category));
  const deaths = evs.reduce((s, e) => s + e.deathsEstimate, 0);
  return {
    count: evs.length,
    deaths,
    label: `${Math.round(deaths / 1_000_000)}M+`,
  };
}
