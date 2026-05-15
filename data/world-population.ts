/**
 * Approximate world population (in millions) at the time each event began.
 * Sources: UN Population Division, McEvedy & Jones "Atlas of World Population History".
 */
export const WORLD_POP_AT_TIME: Record<string, number> = {
  "plague-of-justinian":   200,   // 541 AD
  "black-death":           400,   // 1347 AD
  "spanish-flu":          1_800,  // 1918 AD
  "wwii":                 2_300,  // 1939 AD
  "smallpox-20th":        1_600,  // ~1900 AD
  "malaria":              1_600,  // ~1900 AD (ongoing)
  "hiv-aids":             4_500,  // 1981 AD
  "mongol-conquests":       400,  // 1206 AD
  "plague-of-justinian-2":  200,  // alias guard
  "taiping-rebellion":    1_200,  // 1850 AD
  "wwi":                  1_800,  // 1914 AD
  "irish-famine":         1_200,  // 1845 AD
  "great-leap-forward":   2_900,  // 1959 AD
  "hiroshima-nagasaki":   2_300,  // 1945 AD
  "chernobyl":            4_900,  // 1986 AD
  "covid-19":             7_800,  // 2019 AD
  "americas-colonization":  500,  // ~1519 AD
};

/**
 * Returns deaths as % of world population at event time.
 * Returns null if population data is unavailable.
 */
export function deathsAsPopPct(eventId: string, deaths: number): number | null {
  const popMillions = WORLD_POP_AT_TIME[eventId];
  if (!popMillions) return null;
  return (deaths / (popMillions * 1_000_000)) * 100;
}

export function formatPct(pct: number): string {
  if (pct >= 1) return `${pct.toFixed(1)}%`;
  if (pct >= 0.1) return `${pct.toFixed(2)}%`;
  return `${pct.toFixed(3)}%`;
}
