"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, ArrowUpDown, Clock, Skull, ChevronRight, Filter } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useAppStore } from "@/lib/store";
import { useBrand } from "@/app/providers";
import { useI18n } from "@/lib/i18n";
import { EVENTS, formatDeaths } from "@/data/events";
import type { EventCategory } from "@/data/events";
import { BRAND_CATEGORIES } from "@/lib/brand";
import { localizedHref } from "@/lib/locale";
import { cn } from "@/lib/utils";

// ── Category config ────────────────────────────────────────────────────────────

type FilterTab = "all" | EventCategory;

const CATEGORY_COLORS: Record<EventCategory, string> = {
  pandemic: "#EC4899",
  war:      "#EF4444",
  nuclear:  "#FBBF24",
  famine:   "#F97316",
  genocide: "#f43f5e",
};

const CATEGORY_BG: Record<EventCategory, string> = {
  pandemic: "bg-pink-500/15 border-pink-500/30 text-pink-400",
  war:      "bg-red-500/15 border-red-500/30 text-red-400",
  nuclear:  "bg-amber-500/15 border-amber-500/30 text-amber-400",
  famine:   "bg-orange-500/15 border-orange-500/30 text-orange-400",
  genocide: "bg-rose-500/15 border-rose-500/30 text-rose-400",
};

// ── Event Card ─────────────────────────────────────────────────────────────────

interface EventCardProps {
  ev: typeof EVENTS[number];
  index: number;
}

function EventCard({ ev, index }: EventCardProps) {
  const darkMode = useAppStore((s) => s.darkMode);
  const { t, lang } = useI18n();

  const evName = lang === "es" ? ev.nameEs : ev.name;
  const evDesc = lang === "es" ? ev.descriptionEs : ev.descriptionEn;
  const desc = evDesc.slice(0, 120).trimEnd() + (evDesc.length > 120 ? "…" : "");
  const yearRange = ev.endYear
    ? `${ev.startYear} – ${ev.endYear}`
    : `${ev.startYear} – ${lang === "es" ? "actualidad" : "present"}`;
  const tags = ev.tags.slice(0, 3);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28, delay: index * 0.03 }}
      className={cn(
        "group relative flex rounded-2xl border overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-0.5",
        darkMode
          ? "bg-surface/80 border-border/60 hover:border-border"
          : "bg-white/90 border-slate-200 hover:border-slate-300 hover:shadow-slate-200/60",
      )}
      style={{ boxShadow: `0 0 0 0 ${ev.color}00` }}
      whileHover={{ boxShadow: `0 4px 24px -4px ${ev.color}22` }}
    >
      {/* Left color accent bar */}
      <div
        className="w-1 flex-shrink-0 rounded-l-2xl"
        style={{ backgroundColor: ev.color }}
      />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3 min-w-0">

        {/* Top row: name + badge + year */}
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className={cn(
            "font-display font-black text-base leading-tight mr-auto",
            darkMode ? "text-white" : "text-slate-900",
          )}>
            {evName}
          </h3>
          <span className={cn(
            "flex-shrink-0 text-[10px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full border",
            CATEGORY_BG[ev.category],
          )}>
            {t(ev.category as any)}
          </span>
        </div>

        {/* Year range */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-slate-500 flex-shrink-0" />
          <span className="text-xs font-mono text-slate-500">{yearRange}</span>
        </div>

        {/* Death count */}
        <div className="flex items-center gap-2">
          <Skull className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ev.color }} />
          <span className="text-lg font-display font-black leading-none" style={{ color: ev.color }}>
            {formatDeaths(ev.deathsEstimate)}
          </span>
          <span className="text-xs text-slate-500 font-mono">{t("events_est_deaths")}</span>
        </div>

        {/* Description excerpt */}
        <p className={cn(
          "text-xs leading-relaxed line-clamp-2",
          darkMode ? "text-slate-400" : "text-slate-600",
        )}>
          {desc}
        </p>

        {/* Tags + Explore button */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-[10px] font-mono px-2 py-0.5 rounded-md border",
                  darkMode
                    ? "bg-white/5 border-white/8 text-slate-500"
                    : "bg-slate-100 border-slate-200 text-slate-500",
                )}
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={localizedHref(`/pandemic/${ev.id}`, lang)}
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer group/btn"
            style={{
              color: ev.color,
              borderColor: ev.color + "40",
              backgroundColor: ev.color + "12",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = ev.color + "28";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = ev.color + "12";
            }}
          >
            {t("events_explore")}
            <ChevronRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const darkMode = useAppStore((s) => s.darkMode);
  const brand = useBrand();
  const isDV = brand === "deathvault";
  const allowedCats = BRAND_CATEGORIES[brand];
  const accentColor = isDV ? "#F59E0B" : "#DC2626";
  const { t, lang } = useI18n();

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<"deaths" | "chrono">("deaths");

  // Build available tabs (brand-filtered)
  const availableTabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: t("events_filter_all") },
    ...allowedCats.map((cat) => ({ key: cat as FilterTab, label: t(cat as any) })),
  ];

  // Filter + sort
  const filtered = useMemo(() => {
    let list = EVENTS.filter((ev) => allowedCats.includes(ev.category));

    if (activeTab !== "all") {
      list = list.filter((ev) => ev.category === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (ev) =>
          ev.name.toLowerCase().includes(q) ||
          ev.nameEs.toLowerCase().includes(q) ||
          ev.descriptionEn.toLowerCase().includes(q) ||
          ev.descriptionEs.toLowerCase().includes(q) ||
          ev.tags.some((t) => t.includes(q)),
      );
    }

    if (sortMode === "deaths") {
      list = [...list].sort((a, b) => b.deathsEstimate - a.deathsEstimate);
    } else {
      list = [...list].sort((a, b) => a.startYear - b.startYear);
    }

    return list;
  }, [allowedCats, activeTab, search, sortMode]);

  // Total deaths across filtered events
  const totalDeaths = filtered.reduce((sum, ev) => sum + ev.deathsEstimate, 0);

  // Category labels for stats strip (joined list)
  const catList = allowedCats.map((c) => t(c as any)).join(", ");

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      {/* Noscript: full event list for crawlers / no-JS users */}
      <noscript>
        <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
          <h1>{lang === "es" ? "Archivo de eventos" : "Event Archive"}</h1>
          <ul>
            {EVENTS.filter((ev) => allowedCats.includes(ev.category)).map((ev) => (
              <li key={ev.id}>
                <a href={localizedHref(`/pandemic/${ev.id}`, lang)}>
                  {lang === "es" ? ev.nameEs : ev.name} ({ev.startYear}–{ev.endYear ?? (lang === "es" ? "actualidad" : "present")})
                </a>
              </li>
            ))}
          </ul>
        </div>
      </noscript>
      <main id="main-content" className="max-w-7xl mx-auto px-4 pt-24 pb-20">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
              style={{ color: accentColor, borderColor: accentColor + "40", backgroundColor: accentColor + "12" }}
            >
              {isDV ? t("events_archive_dv") : t("events_archive_pa")}
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
            <div className="text-[10px] font-mono text-slate-600">
              {filtered.length} {t("events_count_suffix")} · {formatDeaths(totalDeaths)} {t("events_documented")}
            </div>
          </div>

          <h1 className={cn(
            "font-display font-black text-4xl sm:text-5xl mb-2",
            darkMode ? "text-white" : "text-slate-900",
          )}>
            {isDV ? t("events_title_main_dv") : t("events_title_main_pa")}
            <span style={{ color: accentColor }}>
              {isDV ? t("events_title_accent_dv") : t("events_title_accent_pa")}
            </span>
          </h1>
          <p className={cn("text-base max-w-2xl", darkMode ? "text-slate-400" : "text-slate-600")}>
            {isDV ? t("events_subtitle_dv") : t("events_subtitle_pa")}
          </p>
        </motion.div>

        {/* ── Controls bar ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {/* Category tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {availableTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer",
                  activeTab === tab.key
                    ? "text-white"
                    : darkMode
                      ? "border-border/40 text-slate-400 hover:text-white hover:border-border/70"
                      : "border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300",
                )}
                style={
                  activeTab === tab.key
                    ? {
                        backgroundColor: accentColor + "22",
                        borderColor: accentColor + "60",
                        color: accentColor,
                      }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors",
            darkMode
              ? "bg-surface/60 border-border/50 text-white placeholder:text-slate-600 focus-within:border-border"
              : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus-within:border-slate-300",
          )}>
            <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <input
              type="text"
              placeholder={t("events_search")}
              aria-label="Search historical events"
              role="searchbox"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-xs w-36 sm:w-44"
            />
          </div>

          {/* Sort toggle */}
          <button
            onClick={() => setSortMode((m) => (m === "deaths" ? "chrono" : "deaths"))}
            aria-label={sortMode === "deaths" ? "Sort chronologically" : "Sort by death toll"}
            aria-pressed={sortMode === "deaths"}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer",
              darkMode
                ? "border-border/50 text-slate-400 hover:text-white hover:border-border/80 bg-surface/60"
                : "border-slate-200 text-slate-500 hover:text-slate-800 bg-white",
            )}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortMode === "deaths" ? t("events_sort_deaths") : t("events_sort_chrono")}
          </button>
        </motion.div>

        {/* ── Stats strip ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          className={cn(
            "flex flex-wrap gap-4 sm:gap-8 p-4 rounded-2xl border mb-8",
            darkMode ? "bg-surface/40 border-border/40" : "bg-white/70 border-slate-200",
          )}
        >
          {[
            { label: t("events_stat_total"), value: filtered.length.toString() },
            { label: t("events_stat_deaths"), value: formatDeaths(totalDeaths) },
            { label: t("events_stat_timespan"), value: `${Math.min(...filtered.map((e) => e.startYear))} – ${lang === "es" ? "hoy" : "present"}` },
            { label: t("events_stat_categories"), value: catList },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{stat.label}</span>
              <span
                className="text-base font-display font-black"
                style={{ color: accentColor }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Grid ─────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex flex-col items-center justify-center gap-3 py-20 rounded-2xl border",
                darkMode ? "border-border/40 bg-surface/30" : "border-slate-200 bg-white/60",
              )}
            >
              <Filter className="w-8 h-8 text-slate-600" />
              <p className={cn("text-sm font-medium", darkMode ? "text-slate-400" : "text-slate-500")}>
                {t("events_no_results")}
              </p>
              <button
                onClick={() => { setSearch(""); setActiveTab("all"); }}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-border/40 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {t("events_clear_filters")}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((ev, i) => (
                  <EventCard key={ev.id} ev={ev} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer note ──────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-slate-600 mt-12 font-mono"
        >
          {t("events_source_note")}
        </motion.p>

      </main>
      <Footer />
    </div>
  );
}
