"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, Users, Calendar, MapPin, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import { deathsAsPopPct, formatPct } from "@/data/world-population";
import type { HistoricalEvent } from "@/data/events";
import { formatDeaths, formatDeathsFull } from "@/data/events";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Props {
  event: HistoricalEvent | null;
}

function useCountUp(target: number, duration = 1500) {
  const [current, setCurrent] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const start = performance.now();
    const startVal = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(startVal + (target - startVal) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration]);

  return current;
}

function StatCard({
  icon,
  label,
  value,
  color,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  subValue?: string;
}) {
  return (
    <div className="bg-black/30 border border-border/40 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span style={{ color }}>{icon}</span>
        <span className="text-slate-500 text-xs uppercase tracking-wide font-mono">{label}</span>
      </div>
      <p className="font-mono font-bold text-lg" style={{ color }}>
        {value}
      </p>
      {subValue && <p className="text-slate-600 text-xs mt-0.5">{subValue}</p>}
    </div>
  );
}

export function DeathCounter({ event }: Props) {
  const { t, lang } = useI18n();
  const deaths = useCountUp(event?.deathsEstimate ?? 0, 1600);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
        <div className="w-16 h-16 rounded-2xl bg-crimson/10 border border-crimson/20 flex items-center justify-center">
          <Skull className="w-8 h-8 text-crimson/40" />
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-sm">{t("map_select_event")}</p>
          <p className="text-slate-600 text-xs mt-1">{t("counter_select_hint")}</p>
        </div>
      </div>
    );
  }

  const duration =
    event.endYear
      ? `${event.startYear}–${event.endYear} (${event.endYear - event.startYear} ${t("counter_years")})`
      : `${event.startYear}–${t("ongoing")}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={event.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse-slow"
                style={{ backgroundColor: event.color }}
              />
              <span
                className="text-xs font-mono font-semibold uppercase tracking-wider"
                style={{ color: event.color }}
              >
                {t(event.category as "pandemic" | "war" | "nuclear" | "famine")}
              </span>
            </div>
            <h2 className="text-white font-display font-bold text-xl leading-tight">
              {lang === "es" ? event.nameEs : event.name}
            </h2>
            {event.pathogen && (
              <p className="text-slate-500 text-xs font-mono mt-0.5">{event.pathogen}</p>
            )}
          </div>
          <Link
            href={`/pandemic/${event.id}`}
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-border/40 text-slate-400 hover:text-white hover:bg-white/10 text-xs transition-all duration-200 cursor-pointer"
          >
            {t("learn_more")}
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Main death counter */}
        <div
          className="relative overflow-hidden rounded-2xl border p-5 text-center"
          style={{
            borderColor: event.color + "40",
            backgroundColor: event.color + "08",
            boxShadow: `0 0 30px ${event.color}15`,
          }}
        >
          <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-2">
            {t("counter_estimated")}
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <Skull className="w-5 h-5 mb-1" style={{ color: event.color }} />
            <span
              className="font-mono font-black text-4xl sm:text-5xl tabular-nums"
              style={{ color: event.color }}
            >
              {formatDeaths(deaths)}
            </span>
          </div>
          <p className="text-slate-600 text-xs font-mono mt-2">
            {formatDeathsFull(event.deathsEstimate)} {t("counter_est_suffix")}
          </p>
          <p className="text-slate-600 text-xs font-mono mt-0.5">
            {t("counter_range")}: {formatDeaths(event.deathsMin)} – {formatDeaths(event.deathsMax)}
          </p>
          {/* % of world population */}
          {(() => {
            const pct = deathsAsPopPct(event.id, event.deathsEstimate);
            if (!pct) return null;
            return (
              <div
                className="mt-3 pt-3 border-t flex items-center justify-center gap-1.5"
                style={{ borderColor: event.color + "30" }}
              >
                <Globe className="w-3.5 h-3.5" style={{ color: event.color }} />
                <span className="text-xs font-mono font-bold" style={{ color: event.color }}>
                  {formatPct(pct)}
                </span>
                <span className="text-xs text-slate-600 font-mono">{t("counter_of_pop")}</span>
              </div>
            );
          })()}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={<Calendar className="w-3.5 h-3.5" />}
            label={t("map_period_label")}
            value={`${event.startYear}`}
            color={event.color}
            subValue={duration}
          />
          <StatCard
            icon={<MapPin className="w-3.5 h-3.5" />}
            label={t("map_origin_label")}
            value={event.originCountry.split(" ")[0]}
            color={event.color}
            subValue={event.originCountry}
          />
          {event.infectedEstimate && (
            <StatCard
              icon={<Users className="w-3.5 h-3.5" />}
              label={t("counter_infected")}
              value={formatDeaths(event.infectedEstimate)}
              color="#06B6D4"
              subValue={t("counter_est_suffix")}
            />
          )}
          <StatCard
            icon={<Skull className="w-3.5 h-3.5" />}
            label={t("ev_regions_label")}
            value={`${event.regions.length}`}
            color={event.color}
            subValue={t("counter_affected_areas")}
          />
        </div>

        {/* Description */}
        <div className="bg-black/20 border border-border/40 rounded-xl p-3">
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
            {lang === "es" ? event.descriptionEs : event.descriptionEn}
          </p>
          <Link
            href={`/pandemic/${event.id}`}
            className="inline-flex items-center gap-1 text-xs mt-2 transition-colors duration-200 cursor-pointer"
            style={{ color: event.color }}
          >
            {t("read_more")}
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Symptoms (if pandemic/nuclear) */}
        {event.symptomsEn.length > 0 && (
          <div>
            <p className="text-slate-600 text-xs uppercase tracking-wider font-mono mb-2">
              {t("symptoms")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(lang === "es" ? event.symptomsEs : event.symptomsEn).slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 rounded-lg border text-xs font-mono"
                  style={{ borderColor: event.color + "40", color: event.color + "CC", backgroundColor: event.color + "10" }}
                >
                  {s.split("(")[0].trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
