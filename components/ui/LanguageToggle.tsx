"use client";
import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-0.5 bg-black/30 border border-border/60 rounded-lg p-0.5">
      <button
        onClick={() => setLang("en")}
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
        onClick={() => setLang("es")}
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
