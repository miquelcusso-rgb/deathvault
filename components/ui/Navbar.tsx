"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Activity, Shield, FlaskConical, Skull } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useBrand } from "@/app/providers";
import { BRAND_META } from "@/lib/brand";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { ShareButton } from "./ShareButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const brand = useBrand();
  const isDV = brand === "deathvault";

  const links = [
    { href: "/", label: t("nav_home") },
    { href: "/events", label: t("nav_events") },
    { href: "/news", label: t("nav_news") },
    // Pathogens only on PlagueAtlas — DeathVault links out to PA instead
    ...(!isDV ? [{ href: "/pathogens", label: t("nav_pathogens") }] : []),
    { href: "/compare", label: t("nav_compare") },
    { href: "/statistics", label: t("nav_statistics") },
    { href: "/about", label: t("nav_about") },
    { href: "/support", label: t("nav_support") },
  ];

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
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center border transition-colors duration-200",
                accentBg, accentBorder,
                isDV ? "group-hover:bg-amber-500/30" : "group-hover:bg-crimson/30",
              )}>
                {isDV
                  ? <Shield className={cn("w-4 h-4", accentText)} />
                  : <Activity className={cn("w-4 h-4", accentText)} />
                }
              </div>
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
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    pathname === link.href
                      ? activeLink
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
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
                  title="Pathogen data lives on PlagueAtlas"
                >
                  <FlaskConical className="w-3 h-3" />
                  Pathogens → PlagueAtlas
                </a>
              )}
              {!isDV && (
                <a
                  href="https://www.deathvault.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold text-amber-400/80 border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/15 hover:text-amber-300 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  title="Wars, famines, genocides & more on DeathVault"
                >
                  <Skull className="w-3 h-3" />
                  More events → DeathVault
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
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-border/40 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    pathname === link.href
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
                  Pathogens → PlagueAtlas
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
                  More events → DeathVault
                </a>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
