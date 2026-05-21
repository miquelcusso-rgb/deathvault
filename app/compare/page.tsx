"use client";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ComparisonChart } from "@/components/charts/ComparisonChart";
import { TimelineChart } from "@/components/charts/TimelineChart";
import { EVENTS, formatDeaths, getEventById } from "@/data/events";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Skull, Users, Calendar, ChevronDown, X, Globe, Plus } from "lucide-react";
import { ShareButton } from "@/components/ui/ShareButton";
import { deathsAsPopPct, formatPct } from "@/data/world-population";
import { useBrand } from "@/app/providers";
import { BRAND_CATEGORIES } from "@/lib/brand";

// ── helpers ────────────────────────────────────────────────────────────────

const GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 xl:grid-cols-4",
};

const SLOT_LABELS = ["Event A", "Event B", "Event C", "Event D"];

// ── EventPicker ────────────────────────────────────────────────────────────

function EventPicker({
  label,
  selectedId,
  onSelect,
  excludeIds = [],
  onRemoveSlot,
  canRemove = false,
  brandEvents,
}: {
  label: string;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  excludeIds?: string[];
  onRemoveSlot?: () => void;
  canRemove?: boolean;
  brandEvents: typeof EVENTS;
}) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const selected = selectedId ? getEventById(selectedId) : null;
  const options = brandEvents.filter((e) => !excludeIds.includes(e.id));

  return (
    <div className="relative z-50">
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">{label}</p>
        {canRemove && (
          <button
            onClick={onRemoveSlot}
            className="p-0.5 rounded text-slate-600 hover:text-slate-400 hover:bg-white/10 transition-colors duration-150 cursor-pointer"
            title="Remove this slot"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-surface/80 border border-border/60 rounded-xl hover:bg-surface/60 transition-all duration-200 cursor-pointer"
      >
        {selected ? (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selected.color }} />
            <span className="text-white font-semibold text-sm truncate">
              {lang === "es" ? selected.nameEs : selected.name}
            </span>
          </div>
        ) : (
          <span className="text-slate-500 text-sm">Select an event...</span>
        )}
        <div className="flex items-center gap-1 flex-shrink-0">
          {selected && (
            <span
              onClick={(e) => { e.stopPropagation(); onSelect(null); }}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white cursor-pointer"
            >
              <X className="w-3 h-3" />
            </span>
          )}
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-surface border border-border/60 rounded-xl shadow-panel z-[200] max-h-60 overflow-y-auto scrollbar-thin">
          {options.map((ev) => (
            <button
              key={ev.id}
              onClick={() => { onSelect(ev.id); setOpen(false); }}
              className="w-full flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ev.color }} />
                <span className="text-sm text-slate-300 truncate">
                  {lang === "es" ? ev.nameEs : ev.name}
                </span>
              </div>
              <span className="text-xs font-mono flex-shrink-0" style={{ color: ev.color }}>
                {formatDeaths(ev.deathsEstimate)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CompareRow (N-wide) ────────────────────────────────────────────────────

function CompareRow({
  label,
  icon,
  entries,
}: {
  label: string;
  icon: React.ReactNode;
  entries: { val: string; raw?: number; color: string }[];
}) {
  const max = entries.reduce((m, e) => Math.max(m, e.raw ?? 0), 0);

  return (
    <div className="bg-black/20 border border-border/40 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-slate-500 text-sm">{icon}</span>
        <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">{label}</span>
      </div>
      <div className={`grid ${GRID[entries.length] ?? "grid-cols-2"} gap-4`}>
        {entries.map((e, i) => (
          <div key={i}>
            <p className="font-mono font-bold text-xl" style={{ color: e.color }}>{e.val}</p>
            {max > 0 && e.raw != null && (
              <div className="mt-2 h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(e.raw / max) * 100}%`, backgroundColor: e.color }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ComparePage() {
  const { t, lang } = useI18n();
  const brand = useBrand();
  const allowedCats = BRAND_CATEGORIES[brand];
  const brandEvents = EVENTS.filter((e) => allowedCats.includes(e.category));

  const [ids, setIds] = useState<(string | null)[]>(["black-death", "wwii"]);

  const addSlot = () => {
    if (ids.length < 4) setIds((prev) => [...prev, null]);
  };

  const removeSlot = (idx: number) => {
    if (ids.length > 2) setIds((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateSlot = (idx: number, id: string | null) => {
    setIds((prev) => prev.map((v, i) => (i === idx ? id : v)));
  };

  const selectedEvents = ids.map((id) => (id ? getEventById(id) : null));
  const validEvents = selectedEvents.filter(Boolean) as NonNullable<typeof selectedEvents[number]>[];
  const allSelected = validEvents.length >= 2;

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-12 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="section-title">{t("compare_title")}</h1>
              <p className="section-sub">{t("compare_subtitle")}</p>
            </div>
            <ShareButton
              title="Compare Deadliest Events"
              text="Side-by-side comparison of history's most deadly events"
            />
          </div>
        </motion.div>

        {/* Pickers grid */}
        <div className={`grid ${GRID[ids.length] ?? "grid-cols-2"} gap-4 mb-4 relative z-40`}>
          {ids.map((id, idx) => {
            const ev = id ? getEventById(id) : null;
            const otherIds = ids.filter((_, i) => i !== idx).filter(Boolean) as string[];
            return (
              <div
                key={idx}
                className="card p-4"
                style={ev ? { borderColor: ev.color + "40", boxShadow: `0 0 20px ${ev.color}15` } : {}}
              >
                <EventPicker
                  label={SLOT_LABELS[idx]}
                  selectedId={id}
                  onSelect={(v) => updateSlot(idx, v)}
                  excludeIds={otherIds}
                  onRemoveSlot={() => removeSlot(idx)}
                  canRemove={idx >= 2}
                  brandEvents={brandEvents}
                />
              </div>
            );
          })}
        </div>

        {/* Add slot button */}
        {ids.length < 4 && (
          <div className="flex justify-center mb-8">
            <button
              onClick={addSlot}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-border/50 text-slate-500 hover:text-slate-300 hover:border-border/80 text-sm font-medium transition-all duration-200 cursor-pointer hover:bg-white/5"
            >
              <Plus className="w-4 h-4" />
              Add event {ids.length + 1} of 4
            </button>
          </div>
        )}

        {allSelected ? (
          <motion.div
            key={ids.join("-")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Name cards */}
            <div className={`grid ${GRID[validEvents.length] ?? "grid-cols-2"} gap-4`}>
              {validEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="card p-4 text-center"
                  style={{ borderColor: ev.color + "40" }}
                >
                  <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: ev.color }} />
                  <h2 className="font-display font-bold text-white text-lg leading-tight">
                    {lang === "es" ? ev.nameEs : ev.name}
                  </h2>
                  <p className="text-slate-500 text-xs font-mono mt-1">
                    {ev.startYear}{ev.endYear ? `–${ev.endYear}` : "–present"}
                  </p>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="card p-6">
              <h3 className="text-white font-semibold mb-4 text-sm">{t("compare_deaths")}</h3>
              <ComparisonChart events={validEvents} />
            </div>

            {/* Stat rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CompareRow
                label={t("compare_deaths")}
                icon={<Skull className="w-4 h-4" />}
                entries={validEvents.map((ev) => ({
                  val: formatDeaths(ev.deathsEstimate),
                  raw: ev.deathsEstimate,
                  color: ev.color,
                }))}
              />

              {validEvents.every((ev) => ev.infectedEstimate) && (
                <CompareRow
                  label={t("compare_infected")}
                  icon={<Users className="w-4 h-4" />}
                  entries={validEvents.map((ev) => ({
                    val: formatDeaths(ev.infectedEstimate!),
                    raw: ev.infectedEstimate,
                    color: ev.color,
                  }))}
                />
              )}

              <CompareRow
                label={t("compare_duration")}
                icon={<Calendar className="w-4 h-4" />}
                entries={validEvents.map((ev) => {
                  const yrs = (ev.endYear ?? 2026) - ev.startYear;
                  return { val: `${yrs} yrs`, raw: yrs, color: ev.color };
                })}
              />

              <CompareRow
                label={t("compare_period")}
                icon={<Calendar className="w-4 h-4" />}
                entries={validEvents.map((ev) => ({
                  val: `${ev.startYear}`,
                  color: ev.color,
                }))}
              />

              {/* % of world population */}
              {(() => {
                const pcts = validEvents.map((ev) => deathsAsPopPct(ev.id, ev.deathsEstimate));
                if (pcts.every((p) => !p)) return null;
                return (
                  <CompareRow
                    label="% of World Population"
                    icon={<Globe className="w-4 h-4" />}
                    entries={validEvents.map((ev, i) => ({
                      val: pcts[i] ? formatPct(pcts[i]!) : "—",
                      raw: pcts[i] ?? undefined,
                      color: ev.color,
                    }))}
                  />
                );
              })()}
            </div>

            {/* Timelines — always 2-col grid for readability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {validEvents.map((ev) => (
                <div key={ev.id} className="card p-4">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: ev.color }}>
                    {lang === "es" ? ev.nameEs : ev.name} — Timeline
                  </h3>
                  <TimelineChart event={ev} />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-slate-500 text-lg">Select at least two events above to compare</p>
            <p className="text-slate-600 text-sm mt-2">
              Add up to 4 events for a side-by-side comparison
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
