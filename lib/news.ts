// Shared news helpers — dedupe the feed so the same story never shows twice
// (same headline, cross-language source duplicates, or repeated URLs).

export interface NewsItem {
  id: string;
  eventId: string;
  date: string;
  headline: string;
  headlineEn?: string;
  headlineEs?: string;
  source: string;
  url: string;
  urgent?: boolean;
}

/** Headline displayed for a given UI language (falls back to the original). */
export function displayHeadline(item: NewsItem, lang: string): string {
  return lang === "es" ? (item.headlineEs ?? item.headline) : (item.headlineEn ?? item.headline);
}

/** Normalize a string into a comparison key: accent-free, lowercase, alnum-only. */
function normKey(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")  // strip accents
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .slice(0, 70);
}

/** Strip the language segment + query/hash so en/es versions of one URL collapse. */
function urlKey(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/^\/(en|es|fr|pt)(\/|$)/i, "/");
    return (u.host + path).toLowerCase().replace(/\/+$/, "");
  } catch {
    return url.toLowerCase();
  }
}

/**
 * Deduplicate news items for display in a given language.
 * Collapses items that share a normalized headline (in EITHER language so a
 * machine-translated cross-language copy is caught) OR a language-stripped URL.
 * Preserves input order; returns at most `limit` items when provided.
 */
export function dedupeNews(items: NewsItem[], lang: string, limit?: number): NewsItem[] {
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  for (const item of items) {
    const keys = [
      "h:" + normKey(displayHeadline(item, lang)),
      item.headlineEn ? "h:" + normKey(item.headlineEn) : "",
      item.headlineEs ? "h:" + normKey(item.headlineEs) : "",
      "u:" + urlKey(item.url),
    ].filter(Boolean);
    if (keys.some((k) => seen.has(k))) continue;
    keys.forEach((k) => seen.add(k));
    out.push(item);
    if (limit && out.length >= limit) break;
  }
  return out;
}
