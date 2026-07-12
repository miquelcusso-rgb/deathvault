"use client";
import Link from "next/link";
import { Activity, ExternalLink } from "lucide-react";
import { BrandMark } from "./BrandMark";
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              {isDV ? (
                <BrandMark size={28} color="#F59E0B" />
              ) : (
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center border", accentBg, accentBorder)}>
                  <Activity className={cn("w-3.5 h-3.5", accentText)} />
                </div>
              )}
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
              <Link href={localizedHref("/cookies", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer">
                {t("footer_cookies")}
              </Link>
              <Link href={localizedHref("/contact", lang)} className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer">
                {t("footer_contact")}
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

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-slate-600 text-xs">
            © {year} {isDV ? "DeathVault" : "PlagueAtlas"} by <a href="https://furiosa.studio" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors duration-200">Furiosa Studio</a>. {t("footer_rights")}
          </p>
          <p className="text-slate-600 text-xs">
            {t("footer_data")}
          </p>
        </div>

        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid currentColor', borderTopColor: 'rgba(128,128,128,0.15)', fontSize: 11, opacity: 0.6, textAlign: 'center' }}>
          Part of the <a href="https://furiosadata.com" rel="dofollow" style={{ color: 'inherit', borderBottom: '1px solid currentColor' }}>Furiosa Data Tools Network</a> — open data and 8 free tools by Furiosa Studio.
        </div>

        {/* Badges de directorios — requeridos para el backlink dofollow de cada
            listing (verifican periódicamente; si se quita, lo desactivan).
            LaunchBuff = listing de PlagueAtlas · Launchstag = listing de DeathVault. */}
        {!isDV && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            <a href="https://launchbuff.com/products/plagueatlas-xn6yy5" target="_blank" rel="noopener noreferrer" title="Featured on LaunchBuff">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://launchbuff.com/badge-featured-dark.svg" alt="Featured on LaunchBuff" width={128} height={40} loading="lazy" style={{ display: 'inline-block', opacity: 0.7 }} />
            </a>
          </div>
        )}
        {isDV && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            <a href="https://launchstag.com" target="_blank" rel="noopener noreferrer" title="Featured on Launchstag">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://launchstag.com/badge-dark.svg" alt="Featured on Launchstag" width={128} height={40} loading="lazy" style={{ display: 'inline-block', opacity: 0.7 }} />
            </a>
          </div>
        )}

        {/* tinystartups · Launched on Tiny Startups — solo marca DeathVault */}
        {isDV && (
          <div style={{ marginTop: '0.75rem', textAlign: 'center', transform: 'scale(0.8)', transformOrigin: 'center top' }}>
            <a
              href="https://www.tinystartups.com/startup/deathvault"
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '14px 22px 14px 18px', borderRadius: 14, textDecoration: 'none',
                fontFamily: "'Inter',system-ui,sans-serif",
                background: 'linear-gradient(#fff,#fff) padding-box,linear-gradient(90deg,#3525E6,#D81FE0,#22B8F0) border-box',
                border: '2px solid transparent', color: '#0E0B1F',
              }}
            >
              <svg width="56" height="56" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="tsg" x1=".1" y1="0" x2=".9" y2="1">
                    <stop offset="0%" stopColor="#3525E6" />
                    <stop offset="55%" stopColor="#D81FE0" />
                    <stop offset="100%" stopColor="#22B8F0" />
                  </linearGradient>
                </defs>
                <path d="M50 6C52 32 68 48 94 50C68 52 52 68 50 94C48 68 32 52 6 50C32 48 48 32 50 6Z" fill="url(#tsg)" />
              </svg>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6A6585' }}>Launched on</span>
                <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em' }}>Tiny Startups</span>
                <span style={{ fontSize: 11, color: '#6A6585', marginTop: 4 }}>tinystartups.com</span>
              </span>
            </a>
          </div>
        )}

        {/* launchbuff · Featured on LaunchBuff — listing propio de DeathVault */}
        {isDV && (
          <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            <a href="https://launchbuff.com/products/deathvault-volb2z" target="_blank" rel="noopener noreferrer" title="Featured on LaunchBuff">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://launchbuff.com/badge-featured-light.svg" alt="Featured on LaunchBuff" width={160} height={50} style={{ display: 'inline-block' }} />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
