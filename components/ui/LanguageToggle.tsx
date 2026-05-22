"use client";
import { usePathname } from "next/navigation";
import { useI18n, writeLangCookie } from "@/lib/i18n";
import { localizedHref, stripLocale } from "@/lib/locale";
import type { Lang } from "@/lib/translations";

export function LanguageToggle() {
  const { lang } = useI18n();
  const pathname = usePathname() ?? "/";

  const switchTo = (next: Lang) => {
    if (next === lang) return;
    writeLangCookie(next);
    const { path } = stripLocale(pathname);
    const target = localizedHref(path, next);
    const suffix =
      typeof window !== "undefined" ? window.location.search + window.location.hash : "";
    // Full navigation so the route-driven language (server x-locale header) is re-read.
    if (typeof window !== "undefined") {
      window.location.href = target + suffix;
    }
  };

  return (
    <div className="flex items-center gap-0.5 bg-black/30 border border-border/60 rounded-lg p-0.5">
      <button
        onClick={() => switchTo("en")}
        className={`px-2 py-1 rounded text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
          lang === "en"
            ? "bg-cyan-DEFAULT/30 text-cyan-light border border-cyan-DEFAULT/40"
            : "text-slate-500 hover:text-slate-300"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchTo("es")}
        className={`px-2 py-1 rounded text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
          lang === "es"
            ? "bg-cyan-DEFAULT/30 text-cyan-light border border-cyan-DEFAULT/40"
            : "text-slate-500 hover:text-slate-300"
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
