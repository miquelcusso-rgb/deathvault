// Server-side i18n helper — reads the lang cookie so RSC pages can render in the right language.
// Only import this from Server Components / Route Handlers (never from "use client" files).
import { cookies } from "next/headers";
import { makeT, translations, type Lang, type TranslationKey } from "./translations";

export type { Lang, TranslationKey };

export async function getServerLang(): Promise<Lang> {
  const store = await cookies();
  const val = store.get("PLAGUE_LANG")?.value;
  return val === "es" ? "es" : "en";
}

/** Returns a typed t() function for use in Server Components */
export async function getServerT() {
  const lang = await getServerLang();
  return makeT(lang);
}

export { translations };
