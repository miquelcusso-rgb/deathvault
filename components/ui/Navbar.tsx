"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Activity, FlaskConical, Skull, ChevronDown } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { useI18n } from "@/lib/i18n";
import { useBrand } from "@/app/providers";
import { BRAND_META } from "@/lib/brand";
import { localizedHref, stripLocale } from "@/lib/locale";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { ShareButton } from "./ShareButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t, lang } = useI18n();
  const pathname = usePathname();
  const currentPath = stripLocale(pathname ?? "/").path;
  const [mobileOpen, setMobileOpen] = useState(false);
  const brand = useBrand();
  const isDV = brand === "deathvault";

  // hrefs are the locale-free paths; we localize at render time and compare on
  // the locale-free path so the active state works in both locales.
  // v2 IA: 4 primary entries + an "Insights" group for the data tools. SEO note:
  // every link stays rendered in the DOM (the dropdown is CSS hover, not JS-gated)
  // so internal-link discovery is preserved. About/Support live in the footer.
  const primaryLinks = [
    { href: "/", label: t("nav_home") },
    { href: "/events", label: t("nav_events") },
    { href: "/news", label: t("nav_news") },
  ];
  const insightsLinks = [
    { href: "/statistics", label: t("nav_statistics") },
    { href: "/compare", label: t("nav_compare") },
    // Pathogens only on PlagueAtlas — DeathVault links out to PA instead
    ...(!isDV ? [{ href: "/pathogens", label: t("nav_pathogens") }] : []),
  ];
  const metaLinks = [
    { href: "/about", label: t("nav_about") },
    { href: "/support", label: t("nav_support") },
  ];
  // Mobile shows everything flat.
  const allLinks = [...primaryLinks, ...insightsLinks, ...metaLinks];
  const insightsActive = insightsLinks.some((l) => l.href === currentPath);

  const meta = BRAND_META[brand];

  const accentBg     = isDV ? "bg-amber-500/20"    : "bg-crimson/20";
  const accentBorder = isDV ? "border-amber-500/40" : "border-crimson/40";
  const accentText   = isDV ? "text-amber-400"      : "text-crimson-light";
  const activeLink   = isDV
    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
    : "bg-crimson/20 text-crimson-light border border-crimson/30";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={isDV ? "mx-4 mt-2" : "mx-4 mt-3"}>
        <nav className={cn("bg-surface/80 backdrop-blur-xl border border-border/60 rounded-2xl px-4 shadow-panel", isDV ? "py-2" : "py-3")}>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href={localizedHref("/", lang)} className="flex items-center gap-2.5 group cursor-pointer">
              {isDV ? (
                <span className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <BrandMark size={30} color="#F59E0B" />
                </span>
              ) : (
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center border transition-colors duration-200",
                  accentBg, accentBorder,
                  "group-hover:bg-crimson/30",
                )}>
                  <Activity className={cn("w-4 h-4", accentText)} />
                </div>
              )}
              <span className="font-display font-bold text-white text-sm tracking-wide hidden sm:block">
                {isDV
                  ? <>Death<span className={accentText}>Vault</span></>
                  : <>Plague<span className={accentText}>Atlas</span></>
                }
              </span>
              {isDV && (
                <span className="hidden sm:inline text-[9px] font-mono font-bold tracking-[0.18em] text-amber-600/60 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase">
                  ARCHIVE
                </span>
              )}
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizedHref(link.href, lang)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    currentPath === link.href
                      ? activeLink
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Insights dropdown — CSS hover; links stay in the DOM for crawlers */}
              <div className="relative group">
                <button
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer inline-flex items-center gap-1",
                    insightsActive ? activeLink : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                  aria-haspopup="true"
                >
                  {t("nav_insights")}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
                  <div className="bg-surface border border-border/60 rounded-xl p-1 shadow-panel min-w-[170px]">
                    {insightsLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={localizedHref(link.href, lang)}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                          currentPath === link.href
                            ? activeLink
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Cross-brand links */}
              {isDV && (
                <a
                  href="https://www.plagueatlas.com/pathogens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold text-emerald-400/80 border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 hover:text-emerald-300 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  title={t("nav_cross_pathogens_title")}
                >
                  <FlaskConical className="w-3 h-3" />
                  {t("nav_cross_pathogens")}
                </a>
              )}
              {!isDV && (
                <a
                  href="https://www.deathvault.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold text-amber-400/80 border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/15 hover:text-amber-300 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  title={t("nav_cross_more_title")}
                >
                  <Skull className="w-3 h-3" />
                  {t("nav_cross_more")}
                </a>
              )}
              {/* Share */}
              <div className="hidden md:block">
                <ShareButton title={meta.name} text={meta.tagline} />
              </div>
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                aria-label={t("nav_toggle_menu")}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-border/40 flex flex-col gap-1">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizedHref(link.href, lang)}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    currentPath === link.href
                      ? activeLink
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {isDV && (
                <a
                  href="https://www.plagueatlas.com/pathogens"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-200 cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  {t("nav_cross_pathogens")}
                </a>
              )}
              {!isDV && (
                <a
                  href="https://www.deathvault.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-200 cursor-pointer"
                >
                  <Skull className="w-3.5 h-3.5" />
                  {t("nav_cross_more")}
                </a>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
