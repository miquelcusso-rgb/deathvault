// Route-based locale helpers — no "use client", safe for both RSC and client code.
import type { Lang } from "./translations";

export const PREFIXED_LOCALES = ["es"] as const;

/** Prefix an internal path with the locale segment (English stays unprefixed). */
export function localizedHref(path: string, lang: Lang): string {
  if (lang !== "es") return stripLocale(path).path;
  const clean = stripLocale(path).path;
  return clean === "/" ? "/es" : `/es${clean}`;
}

/** Split a path into its locale and the locale-free ("invariant") path. */
export function stripLocale(path: string): { lang: Lang; path: string } {
  if (path === "/es") return { lang: "es", path: "/" };
  if (path.startsWith("/es/")) return { lang: "es", path: path.slice(3) || "/" };
  return { lang: "en", path: path || "/" };
}

/**
 * Build reciprocal hreflang alternates + a locale-correct canonical.
 * `baseUrl` has no trailing slash (e.g. https://www.plagueatlas.com).
 * `invariantPath` is the locale-free path (e.g. "/about", or "/" for home).
 */
export function buildAlternates(baseUrl: string, invariantPath: string, locale: Lang) {
  const p = invariantPath === "/" ? "" : invariantPath;
  // For the root path, append "/" so canonical matches the 200 URL (e.g. https://www.deathvault.app/).
  // GSC was reporting "Página con redirección" when canonical lacked the trailing slash (29-may-2026).
  const enUrl = `${baseUrl}${p || "/"}`;
  const esUrl = `${baseUrl}/es${p}`;
  return {
    canonical: locale === "es" ? esUrl : enUrl,
    languages: { en: enUrl, es: esUrl, "x-default": enUrl } as Record<string, string>,
  };
}
