"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Bug, Sword, Radiation, Flame, Skull, X, ArrowUpDown, TrendingDown, Clock, CalendarClock, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS, type HistoricalEvent, type EventCategory, formatDeaths } from "@/data/events";
import { useI18n } from "@/lib/i18n";
import { useBrand } from "@/app/providers";
import { BRAND_CATEGORIES } from "@/lib/brand";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type SortMode = "deaths" | "recent" | "oldest" | "ongoing";

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

// ── Category config ────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<EventCategory | "all", React.ReactNode> = {
  all:      <span className="text-xs font-bold">ALL</span>,
  pandemic: <Bug className="w-3.5 h-3.5" />,
  war:      <Sword className="w-3.5 h-3.5" />,
  nuclear:  <Radiation className="w-3.5 h-3.5" />,
  famine:   <Flame className="w-3.5 h-3.5" />,
  genocide: <Skull className="w-3.5 h-3.5" />,
};

const CATEGORY_COLORS: Record<EventCategory | "all", string> = {
  all:      "text-slate-300 bg-white/10 border-white/20",
  pandemic: "text-emerald-light bg-emerald-DEFAULT/15 border-emerald-DEFAULT/30",
  war:      "text-slate-300 bg-slate-500/15 border-slate-500/30",
  nuclear:  "text-amber-light bg-amber-DEFAULT/15 border-amber-DEFAULT/30",
  famine:   "text-orange-400 bg-orange-500/15 border-orange-500/30",
  genocide: "text-rose-400 bg-rose-500/15 border-rose-500/30",
};

// ── Sort options ───────────────────────────────────────────────────────────

const SORT_OPTIONS: { key: SortMode; label: string; icon: React.ReactNode }[] = [
  { key: "deaths",  label: "Most deaths",   icon: <TrendingDown className="w-3.5 h-3.5" /> },
  { key: "recent",  label: "Most recent",   icon: <Clock className="w-3.5 h-3.5" /> },
  { key: "oldest",  label: "Oldest first",  icon: <CalendarClock className="w-3.5 h-3.5" /> },
  { key: "ongoing", label: "Ongoing first", icon: <Activity className="w-3.5 h-3.5" /> },
];

function sortEvents(events: HistoricalEvent[], mode: SortMode): HistoricalEvent[] {
  const list = [...events];
  switch (mode) {
    case "deaths":
      return list.sort((a, b) => b.deathsEstimate - a.deathsEstimate);
    case "recent":
      return list.sort((a, b) => b.startYear - a.startYear);
    case "oldest":
      return list.sort((a, b) => a.startYear - b.startYear);
    case "ongoing":
      return list.sort((a, b) => {
        const aOn = a.endYear === null ? 1 : 0;
        const bOn = b.endYear === null ? 1 : 0;
        if (bOn !== aOn) return bOn - aOn;
        return b.deathsEstimate - a.deathsEstimate;
      });
  }
}

// ── SortDropdown ───────────────────────────────────────────────────────────

function SortDropdown({ sort, setSort }: { sort: SortMode; setSort: (s: SortMode) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = SORT_OPTIONS.find((o) => o.key === sort)!;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        title="Sort events"
        className={cn(
          "flex items-center gap-1.5 h-full px-2.5 rounded-xl border text-xs font-mono font-semibold transition-all duration-200 cursor-pointer",
          open
            ? "bg-white/10 border-border text-slate-200"
            : "bg-black/30 border-border/60 text-slate-500 hover:text-slate-300 hover:border-border hover:bg-black/50"
        )}
      >
        <ArrowUpDown className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="hidden sm:inline truncate max-w-[70px]">{active.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full right-0 mt-1.5 bg-surface border border-border/60 rounded-xl p-1 min-w-[160px] shadow-panel z-50"
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setSort(opt.key); setOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer text-left",
                  sort === opt.key
                    ? "text-white bg-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <span className={sort === opt.key ? "text-cyan-400" : "text-slate-600"}>
                  {opt.icon}
                </span>
                {opt.label}
                {sort === opt.key && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function PandemicSelector({ selectedId, onSelect }: Props) {
  const { t, lang } = useI18n();
  const brand = useBrand();
  const [filter, setFilter] = useState<EventCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("deaths");

  const allowedCats = BRAND_CATEGORIES[brand];
  const brandEvents = useMemo(
    () => EVENTS.filter((e) => allowedCats.includes(e.category)),
    [allowedCats],
  );

  const filtered = useMemo(() => {
    let list = brandEvents.filter((e) => {
      if (filter !== "all" && e.category !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        const name = lang === "es" ? e.nameEs : e.name;
        return (
          name.toLowerCase().includes(q) ||
          e.pathogen?.toLowerCase().includes(q) ||
          e.tags.some((tag) => tag.includes(q))
        );
      }
      return true;
    });
    return sortEvents(list, sort);
  }, [brandEvents, filter, search, lang, sort]);

  const availableCats = useMemo<Array<EventCategory | "all">>(() => {
    const cats = Array.from(new Set(brandEvents.map((e) => e.category)));
    return ["all", ...cats.sort()] as Array<EventCategory | "all">;
  }, [brandEvents]);

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Search + Sort row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder={t("selector_search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/30 border border-border/60 rounded-xl pl-9 pr-8 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-DEFAULT/50 focus:bg-black/50 transition-all duration-200 font-mono"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <SortDropdown sort={sort} setSort={setSort} />
      </div>

      {/* Category filters */}
      <div className="flex gap-1.5 flex-wrap">
        {availableCats.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer",
              filter === cat
                ? CATEGORY_COLORS[cat]
                : "text-slate-600 bg-transparent border-border/40 hover:text-slate-400 hover:border-border/80"
            )}
          >
            {CATEGORY_ICONS[cat]}
            <span className="capitalize">
              {cat === "all"
                ? t("selector_all")
                : cat === "pandemic"
                ? t("selector_pandemics")
                : cat === "war"
                ? t("selector_wars")
                : cat === "nuclear"
                ? t("selector_nuclear")
                : cat === "famine"
                ? t("selector_famines")
                : t("selector_genocides")}
            </span>
          </button>
        ))}
      </div>

      {/* Event list */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
        {selectedId && (
          <button
            onClick={() => onSelect(null)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-700 text-slate-500 hover:text-slate-400 hover:border-slate-600 text-xs transition-all duration-200 cursor-pointer"
          >
            <X className="w-3 h-3" />
            Clear selection
          </button>
        )}

        <AnimatePresence mode="popLayout">
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSelected={selectedId === event.id}
              onSelect={onSelect}
              lang={lang}
            />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-8 text-slate-600 text-sm">No events found</div>
        )}
      </div>
    </div>
  );
}

// ── EventCard ──────────────────────────────────────────────────────────────

function EventCard({
  event, isSelected, onSelect, lang,
}: {
  event: HistoricalEvent;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  lang: string;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      onClick={() => onSelect(isSelected ? null : event.id)}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer",
        isSelected
          ? "border-opacity-60 bg-opacity-20"
          : "border-border/40 bg-black/20 hover:bg-black/40 hover:border-border/80"
      )}
      style={isSelected
        ? { borderColor: event.color + "80", backgroundColor: event.color + "15", boxShadow: `0 0 12px ${event.color}25` }
        : {}
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: event.color }} />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate transition-colors duration-200"
              style={{ color: isSelected ? event.color : undefined }}>
              {lang === "es" ? event.nameEs : event.name}
            </p>
            <p className="text-xs text-slate-600 font-mono">
              {event.startYear}{event.endYear ? `–${event.endYear}` : "–present"}
              {event.pathogen && ` · ${event.pathogen}`}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-xs font-mono font-bold" style={{ color: event.color }}>
            {formatDeaths(event.deathsEstimate)}
          </p>
          <p className="text-xs text-slate-600">deaths</p>
        </div>
      </div>
    </motion.button>
  );
}
