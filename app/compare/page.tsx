"use client";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ComparisonChart } from "@/components/charts/ComparisonChart";
import { TimelineChart } from "@/components/charts/TimelineChart";
import { EVENTS, formatDeaths, getEventById } from "@/data/events";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Skull, Users, Calendar, ChevronDown, X, Globe } from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { deathsAsPopPct, formatPct } from "@/data/world-population";

function EventPicker({
  label,
  selectedId,
  onSelect,
  excludeId,
}: {
  label: string;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  excludeId?: string | null;
}) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const selected = selectedId ? getEventById(selectedId) : null;

  const options = EVENTS.filter((e) => e.id !== excludeId);

  return (
    <div className="relative z-50">
      <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-2">{label}</p>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-surface/80 border border-border/60 rounded-xl hover:bg-surface transition-all duration-200 cursor-pointer"
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

function CompareRow({
  label,
  icon,
  valA,
  valB,
  rawA,
  rawB,
  colorA,
  colorB,
}: {
  label: string;
  icon: React.ReactNode;
  valA: string;
  valB: string;
  rawA?: number;
  rawB?: number;
  colorA: string;
  colorB: string;
}) {
  const max = rawA && rawB ? Math.max(rawA, rawB) : undefined;

  return (
    <div className="bg-black/20 border border-border/40 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-slate-500 text-sm">{icon}</span>
        <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-mono font-bold text-xl" style={{ color: colorA }}>{valA}</p>
          {max && rawA && (
            <div className="mt-2 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(rawA / max) * 100}%`, backgroundColor: colorA }}
              />
            </div>
          )}
        </div>
        <div>
          <p className="font-mono font-bold text-xl" style={{ color: colorB }}>{valB}</p>
          {max && rawB && (
            <div className="mt-2 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(rawB / max) * 100}%`, backgroundColor: colorB }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const { t, lang } = useI18n();
  const [idA, setIdA] = useState<string | null>("black-death");
  const [idB, setIdB] = useState<string | null>("wwii");

  const evA = idA ? getEventById(idA) : null;
  const evB = idB ? getEventById(idB) : null;
  const bothSelected = evA && evB;

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="section-title">{t("compare_title")}</h1>
          <p className="section-sub">{t("compare_subtitle")}</p>
        </motion.div>

        {/* Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 relative z-40">
          <div
            className="card p-4"
            style={evA ? { borderColor: evA.color + "40", boxShadow: `0 0 20px ${evA.color}15` } : {}}
          >
            <EventPicker
              label="Event A"
              selectedId={idA}
              onSelect={setIdA}
              excludeId={idB}
            />
          </div>
          <div
            className="card p-4"
            style={evB ? { borderColor: evB.color + "40", boxShadow: `0 0 20px ${evB.color}15` } : {}}
          >
            <EventPicker
              label="Event B"
              selectedId={idB}
              onSelect={setIdB}
              excludeId={idA}
            />
          </div>
        </div>

        {/* Ad — between pickers and results */}
        <AdSlot slot="0987654321" format="horizontal" className="w-full rounded-xl mb-8" />

        {bothSelected ? (
          <motion.div
            key={`${idA}-${idB}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Names header */}
            <div className="grid grid-cols-2 gap-4">
              {[evA, evB].map((ev) => (
                <div
                  key={ev!.id}
                  className="card p-4 text-center"
                  style={{ borderColor: ev!.color + "40" }}
                >
                  <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: ev!.color }} />
                  <h2 className="font-display font-bold text-white text-lg leading-tight">
                    {lang === "es" ? ev!.nameEs : ev!.name}
                  </h2>
                  <p className="text-slate-500 text-xs font-mono mt-1">
                    {ev!.startYear}{ev!.endYear ? `–${ev!.endYear}` : "–present"}
                  </p>
                </div>
              ))}
            </div>

            {/* Bar chart comparison */}
            <div className="card p-6">
              <h3 className="text-white font-semibold mb-4 text-sm">{t("compare_deaths")}</h3>
              <ComparisonChart events={[evA!, evB!]} />
            </div>

            {/* Stat rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CompareRow
                label={t("compare_deaths")}
                icon={<Skull className="w-4 h-4" />}
                valA={formatDeaths(evA!.deathsEstimate)}
                valB={formatDeaths(evB!.deathsEstimate)}
                rawA={evA!.deathsEstimate}
                rawB={evB!.deathsEstimate}
                colorA={evA!.color}
                colorB={evB!.color}
              />
              {evA!.infectedEstimate && evB!.infectedEstimate && (
                <CompareRow
                  label={t("compare_infected")}
                  icon={<Users className="w-4 h-4" />}
                  valA={formatDeaths(evA!.infectedEstimate)}
                  valB={formatDeaths(evB!.infectedEstimate)}
                  rawA={evA!.infectedEstimate}
                  rawB={evB!.infectedEstimate}
                  colorA={evA!.color}
                  colorB={evB!.color}
                />
              )}
              <CompareRow
                label={t("compare_duration")}
                icon={<Calendar className="w-4 h-4" />}
                valA={`${(evA!.endYear ?? 2024) - evA!.startYear} yrs`}
                valB={`${(evB!.endYear ?? 2024) - evB!.startYear} yrs`}
                rawA={(evA!.endYear ?? 2024) - evA!.startYear}
                rawB={(evB!.endYear ?? 2024) - evB!.startYear}
                colorA={evA!.color}
                colorB={evB!.color}
              />
              <CompareRow
                label={t("compare_period")}
                icon={<Calendar className="w-4 h-4" />}
                valA={`${evA!.startYear}`}
                valB={`${evB!.startYear}`}
                colorA={evA!.color}
                colorB={evB!.color}
              />
              {/* % of world population at time */}
              {(() => {
                const pctA = deathsAsPopPct(evA!.id, evA!.deathsEstimate);
                const pctB = deathsAsPopPct(evB!.id, evB!.deathsEstimate);
                if (!pctA && !pctB) return null;
                return (
                  <CompareRow
                    label="% of World Population"
                    icon={<Globe className="w-4 h-4" />}
                    valA={pctA ? formatPct(pctA) : "—"}
                    valB={pctB ? formatPct(pctB) : "—"}
                    rawA={pctA ?? undefined}
                    rawB={pctB ?? undefined}
                    colorA={evA!.color}
                    colorB={evB!.color}
                  />
                );
              })()}
            </div>

            {/* Timelines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[evA!, evB!].map((ev) => (
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
            <p className="text-slate-500 text-lg">Select two events above to compare</p>
            <p className="text-slate-600 text-sm mt-2">
              Compare death tolls, timelines, and geographic impact
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
