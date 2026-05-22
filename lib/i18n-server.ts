// Server-side i18n helper — derives the language from the ROUTE (via the
// x-locale header set by middleware) so RSC pages render in the language that
// matches the URL and are therefore indexable by crawlers (no cookie needed).
import { headers } from "next/headers";
import { makeT, translations, type Lang, type TranslationKey } from "./translations";

export type { Lang, TranslationKey };

export async function getServerLang(): Promise<Lang> {
  const h = await headers();
  return h.get("x-locale") === "es" ? "es" : "en";
}

/** Locale-free path of the current request (e.g. "/about"), set by middleware. */
export async function getInvariantPath(): Promise<string> {
  const h = await headers();
  return h.get("x-invariant-path") || "/";
}

/** Returns a typed t() function for use in Server Components */
export async function getServerT() {
  const lang = await getServerLang();
  return makeT(lang);
}

export { translations };
