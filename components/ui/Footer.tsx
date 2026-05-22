"use client";
import Link from "next/link";
import { Activity, Shield, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useBrand } from "@/app/providers";
import { localizedHref } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t, lang } = useI18n();
  const brand = useBrand();
  const isDV = brand === "deathvault";
  const year = new Date().getFullYear();

  const accentText   = isDV ? "text-amber-400"      : "text-crimson-light";
  const accentBg     = isDV ? "bg-amber-500/20"     : "bg-crimson/20";
  const accentBorder = isDV ? "border-amber-500/40" : "border-crimson/40";

  return (
    <footer className="border-t border-border/40 bg-surface/60 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center border", accentBg, accentBorder)}>
                {isDV
                  ? <Shield className={cn("w-3.5 h-3.5", accentText)} />
                  : <Activity className={cn("w-3.5 h-3.5", accentText)} />
                }
              </div>
              <span className="font-display font-bold text-white text-sm">
                {isDV
                  ? <>Death<span className={accentText}>Vault</span></>
                  : <>Plague<span className={accentText}>Atlas</span></>
                }
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              {t("footer_description")}
            </p>
            <p className="text-slate-600 text-xs mt-4 leading-relaxed max-w-sm">
              {t("footer_disclaimer")}
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
              {t("footer_legal")}
            </h3>
            <div className="flex flex-col gap-2">
              <Link href={localizedHref("/privacy", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer">
                {t("footer_privacy")}
              </Link>
              <Link href={localizedHref("/terms", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer">
                {t("footer_terms")}
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
              {t("footer_navigation")}
            </h3>
            <div className="flex flex-col gap-2">
              <Link href={localizedHref("/events", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer">
                {t("footer_event_archive")}
              </Link>
              <Link href={localizedHref("/about", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer">
                {t("footer_about")}
              </Link>
              <Link href={localizedHref("/statistics", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer">
                {t("nav_statistics")}
              </Link>
              <Link href={localizedHref("/compare", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer">
                {t("nav_compare")}
              </Link>
              <Link href={localizedHref("/support", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer flex items-center gap-1">
                {t("footer_support")}
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {year} {isDV ? "DeathVault" : "PlagueAtlas"} by <a href="https://furiosa.studio" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors duration-200">Furiosa Studio</a>. {t("footer_rights")}
          </p>
          <p className="text-slate-600 text-xs">
            {t("footer_data")}
          </p>
        </div>
      </div>
    </footer>
  );
}
