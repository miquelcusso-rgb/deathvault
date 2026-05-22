"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { translations, makeT, type Lang, type TranslationKey } from "./translations";

export type { Lang, TranslationKey };

const COOKIE_NAME = "PLAGUE_LANG";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Persist the user's language preference (used by the toggle, not for rendering). */
export function writeLangCookie(lang: Lang) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

interface I18nContextType {
  lang: Lang;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  /**
   * Authoritative language for this request, derived server-side from the URL
   * (the x-locale header set by middleware). The language is route-driven, so
   * switching it happens via navigation (see LanguageToggle), not local state.
   */
  initialLang?: Lang;
}

export function I18nProvider({ children, initialLang = "en" }: I18nProviderProps) {
  const lang = initialLang;
  const t = makeT(lang);

  return (
    <I18nContext.Provider value={{ lang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

// Re-export for any consumer that still imports the raw object
export { translations };
