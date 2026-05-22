"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { translations, makeT, type Lang, type TranslationKey } from "./translations";

export type { Lang, TranslationKey };

const COOKIE_NAME = "PLAGUE_LANG";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readLangCookie(): Lang {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`));
  return match?.[1] === "es" ? "es" : "en";
}

function writeLangCookie(lang: Lang) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  /** Passed from server layout after reading the cookie — avoids flash */
  initialLang?: Lang;
}

export function I18nProvider({ children, initialLang = "en" }: I18nProviderProps) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    writeLangCookie(next);
    // Also update <html lang="…"> attribute for accessibility
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  };

  const t = makeT(lang);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
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
