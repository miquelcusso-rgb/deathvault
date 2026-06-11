"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, ExternalLink, ChevronRight, TrendingUp, RefreshCw } from "lucide-react";
import { EVENTS, type HistoricalEvent } from "@/data/events";
import { useAppStore } from "@/lib/store";
import { BRAND_CATEGORIES } from "@/lib/brand";
import { useBrand } from "@/app/providers";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { dedupeNews, displayHeadline, type NewsItem } from "@/lib/news";
import newsFeedRaw from "@/data/news-feed.json";
import deathRatesRaw from "@/data/death-rates.json";

// Hardcoded fallbacks — used when death-rates.json is missing a key
// Annual death-rate estimates (deaths/year) for ONGOING events.
const RATE_FALLBACKS: Record<string, number> = {
  "hiv-aids":   680_000,   // UNAIDS 2024
  "malaria":    597_000,   // WHO World Malaria Report 2025
  "covid-19":    80_000,   // conservative 2026 estimate
  "hantavirus":    200,    // elevated 2026 (MV Hondius cluster + sporadic global)
  "cholera":    100_000,   // WHO 2025
  // Ongoing conflicts (DeathVault only — filtered out on PlagueAtlas).
  // Estimates are contested and span wide ranges; values approximate the
  // average annual toll since onset.
  "ukraine-war": 75_000,   // Russia–Ukraine war (2022–): combined military + civilian deaths/yr
  "gaza-war":    25_000,   // Israel–Gaza (2023–): reported deaths/yr (Gaza MoH / UN OCHA)
};

// Sanity ceiling: a single ongoing event can't plausibly have more than ~5M
// deaths/year. Higher values mean the data source returned prevalence/cumulative
// figures (e.g. WHO's HIV indicator returns ~40M people LIVING with HIV) — fall
// back to the curated estimate instead of showing a wildly wrong rate.
const MAX_PLAUSIBLE_ANNUAL = 5_000_000;

// Merge fallbacks with dynamically-updated JSON values (updated daily by GitHub Actions)
const ratesFromJson = (deathRatesRaw as { rates?: Record<string, { annualDeaths: number }> }).rates ?? {};
const ANNUAL_RATES: Record<string, number> = Object.fromEntries(
  Object.entries(RATE_FALLBACKS).map(([id, fallback]) => {
    const fromJson = ratesFromJson[id]?.annualDeaths;
    const valid = typeof fromJson === "number" && fromJson > 0 && fromJson <= MAX_PLAUSIBLE_ANNUAL;
    return [id, valid ? fromJson : fallback];
  })
);

// News items loaded from data/news-feed.json (updated daily by GitHub Actions)
const NEWS_ITEMS = (newsFeedRaw as { lastUpdated: string; items: NewsItem[] }).items;

const FEED_UPDATED = (newsFeedRaw as { lastUpdated: string }).lastUpdated;

interface LiveCount {
  count: number;
  perSecond: number;
}

function useLiveCounter(event: HistoricalEvent): LiveCount {
  const annualRate = ANNUAL_RATES[event.id] ?? 0;
  // deaths per second from annual rate
  const perSecond = annualRate / (365.25 * 24 * 3600);

  // Base count: historical total + estimated deaths elapsed so far this calendar year
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime();
  const elapsedSecAtMount = (Date.now() - yearStart) / 1000;
  const base = Math.round(event.deathsEstimate + elapsedSecAtMount * perSecond);

  const mountRef = useRef(Date.now());
  const [count, setCount] = useState(base);

  useEffect(() => {
    // Only animate if rate is ≥ 1 death per day (avoids 32-bit overflow in setInterval
    // which fires immediately when delay > 2,147,483,647 ms)
    const MIN_RATE = 1 / 86400; // 1 per day
    if (perSecond < MIN_RATE) return;

    // Simple 1-second tick — never overflows, always accurate
    const timer = setInterval(() => {
      const elapsedSec = (Date.now() - mountRef.current) / 1000;
      setCount(Math.round(base + elapsedSec * perSecond));
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { count, perSecond };
}

function formatLive(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(3) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(2) + "K";
  return n.toLocaleString();
}

// Uniform rate display — absolute whole-number deaths/day (estimates are
// approximate). Force en-US grouping so the thousands separator is a comma
// ("1,862/day") and never a locale dot that could read as a decimal.
function formatRate(perSecond: number): string {
  const perDay = Math.max(0, Math.round(perSecond * 86400));
  return `${perDay.toLocaleString("en-US")}/day`;
}

function EventCounter({ event, isSelected, onSelect }: {
  event: HistoricalEvent;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { count, perSecond } = useLiveCounter(event);
  const { t, lang } = useI18n();
  const isAnimating = perSecond >= 1 / 86400;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer text-left w-full",
        isSelected
          ? "border-opacity-60 bg-white/5"
          : "border-border/30 hover:border-border/60 hover:bg-white/3"
      )}
      style={isSelected ? { borderColor: event.color + "60", backgroundColor: event.color + "08" } : {}}
    >
      <div
        className={cn("w-2 h-2 rounded-full flex-shrink-0", isAnimating && "animate-pulse")}
        style={{ backgroundColor: event.color }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 truncate">{lang === "es" ? event.nameEs : event.name}</p>
        <p className="font-mono font-black text-base leading-tight tabular-nums" style={{ color: event.color }}>
          {formatLive(count)}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[10px] text-slate-600 font-mono">{formatRate(perSecond)}</p>
        <p className="text-[10px] text-slate-600">{t("live_deaths")}</p>
      </div>
    </button>
  );
}

export function NowLive({ onEventClick }: { onEventClick?: (e: HistoricalEvent) => void }) {
  const brand = useBrand();
  const isDV = brand === "deathvault";
  const darkMode = useAppStore((s) => s.darkMode);
  const allowedCats = BRAND_CATEGORIES[brand];
  const { t, lang } = useI18n();

  const ongoingEvents = EVENTS.filter(
    (e) => e.endYear === null && allowedCats.includes(e.category) && ANNUAL_RATES[e.id]
  );

  const [selectedNews, setSelectedNews] = useState<string>(
    ongoingEvents[0]?.id ?? "hantavirus"
  );

  const visibleNews = useMemo(
    () =>
      dedupeNews(
        NEWS_ITEMS.filter((n) => n.eventId === selectedNews || selectedNews === "all"),
        lang,
        4,
      ),
    [selectedNews, lang],
  );

  const accentColor = isDV ? "#F59E0B" : "#DC2626";

  return (
    <div className={cn(
      "rounded-2xl border overflow-hidden",
      darkMode ? "bg-surface/80 border-border/60" : "bg-white/90 border-slate-200"
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 border-b",
        darkMode ? "border-border/40" : "border-slate-200"
      )}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: accentColor }} />
          </span>
          <span className={cn("text-xs font-mono font-bold tracking-widest uppercase", darkMode ? "text-white" : "text-slate-900")}>
            {t("live_now")}
          </span>
        </div>
        <div className={cn("h-3.5 w-px", darkMode ? "bg-border/60" : "bg-slate-300")} />
        <span className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-500")}>
          {t("live_subtitle")}
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5">
          <RefreshCw className="w-2.5 h-2.5 text-slate-600" />
          <span className="text-[10px] font-mono text-slate-600">
            {t("live_updated")} {new Date(FEED_UPDATED).toLocaleDateString(lang === "es" ? "es" : "en", { day: "numeric", month: "short" })}
          </span>
        </div>
        <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] divide-y md:divide-y-0 md:divide-x divide-border/30">
        {/* Left: event counters */}
        <div className="p-4 space-y-2">
          <p className={cn("text-[10px] font-mono uppercase tracking-widest mb-3", darkMode ? "text-slate-600" : "text-slate-400")}>
            {t("live_ongoing")}
          </p>
          {ongoingEvents.map((ev) => (
            <EventCounter
              key={ev.id}
              event={ev}
              isSelected={selectedNews === ev.id}
              onSelect={() => setSelectedNews(ev.id)}
            />
          ))}
        </div>

        {/* Right: news feed */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Newspaper className="w-3.5 h-3.5 text-slate-500" />
            <p className={cn("text-[10px] font-mono uppercase tracking-widest", darkMode ? "text-slate-600" : "text-slate-400")}>
              {t("live_recent_alerts")}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNews}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {visibleNews.length > 0 ? visibleNews.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-start gap-2.5 p-2.5 rounded-lg border transition-colors duration-150 cursor-pointer group",
                    darkMode
                      ? "border-border/30 hover:border-border/60 hover:bg-white/5"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {item.urgent && (
                    <span className="mt-0.5 flex-shrink-0 text-[9px] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: accentColor + "25", color: accentColor }}>
                      {t("live_alert")}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs leading-snug group-hover:text-white transition-colors", darkMode ? "text-slate-300" : "text-slate-700")}>
                      {displayHeadline(item, lang)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-slate-600">{item.source}</span>
                      <span className="text-[10px] text-slate-600">·</span>
                      <span className="text-[10px] font-mono text-slate-600">{item.date}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400 flex-shrink-0 mt-0.5" />
                </a>
              )) : (
                <p className="text-slate-600 text-xs">{t("live_no_news")}</p>
              )}
            </motion.div>
          </AnimatePresence>

          {ongoingEvents.find((e) => e.id === selectedNews) && (
            <button
              onClick={() => {
                const ev = ongoingEvents.find((e) => e.id === selectedNews);
                if (ev && onEventClick) onEventClick(ev);
              }}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150 cursor-pointer hover:opacity-80"
              style={{ color: accentColor }}
            >
              {t("view_on_map")} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
