"use client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ComparisonChart } from "@/components/charts/ComparisonChart";
import { CategoryDonut } from "@/components/charts/CategoryDonut";
import { EVENTS, formatDeaths } from "@/data/events";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Skull, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";
const sorted = [...EVENTS].sort((a, b) => b.deathsEstimate - a.deathsEstimate);
const totalDeaths = EVENTS.reduce((s, e) => s + e.deathsEstimate, 0);

export default function StatisticsPage() {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-28 pb-16 space-y-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="section-title">{t("stats_title")}</h1>
              <p className="section-sub">{t("stats_subtitle")}</p>
            </div>
            <ShareButton
              title="Historical Death Statistics"
              text="Ranked charts of history's deadliest events"
            />
          </div>
        </motion.div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Deaths Tracked", value: formatDeaths(totalDeaths), icon: <Skull className="w-5 h-5" />, color: "#DC2626" },
            { label: "Events Documented", value: String(EVENTS.length), icon: <Globe className="w-5 h-5" />, color: "#06B6D4" },
            { label: "Deadliest Event", value: lang === "es" ? sorted[0].nameEs : sorted[0].name, icon: <TrendingUp className="w-5 h-5" />, color: sorted[0].color },
            { label: "Time Span", value: "541 AD – Now", icon: <TrendingUp className="w-5 h-5" />, color: "#10B981" },
          ].map((card) => (
            <div key={card.label} className="card p-4" style={{ borderColor: card.color + "30" }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: card.color }}>
                {card.icon}
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wide">{card.label}</span>
              </div>
              <p className="font-mono font-black text-xl" style={{ color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Top 10 table */}
        <div className="card p-6">
          <h2 className="section-title mb-1">{t("stats_top_10")}</h2>
          <p className="section-sub mb-6">{t("stats_top_10_subtitle")}</p>
          <div className="space-y-3">
            {sorted.slice(0, 10).map((ev, i) => {
              const pct = (ev.deathsEstimate / sorted[0].deathsEstimate) * 100;
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-slate-600 font-mono text-sm w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <Link
                        href={`/pandemic/${ev.id}`}
                        className="text-sm font-semibold hover:underline truncate cursor-pointer"
                        style={{ color: ev.color }}
                      >
                        {lang === "es" ? ev.nameEs : ev.name}
                      </Link>
                      <span className="font-mono font-bold text-sm flex-shrink-0" style={{ color: ev.color }}>
                        {formatDeaths(ev.deathsEstimate)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: i * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: ev.color, opacity: 0.8 }}
                      />
                    </div>
                  </div>
                  <span className="text-slate-600 text-xs font-mono flex-shrink-0 w-12 text-right">
                    {ev.startYear}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category donut */}
          <div className="card p-6">
            <h2 className="section-title text-lg mb-4">{t("stats_by_category")}</h2>
            <CategoryDonut />
          </div>

          {/* All events bar comparison */}
          <div className="card p-6">
            <h2 className="section-title text-lg mb-1">All Events Comparison</h2>
            <p className="section-sub mb-4">Death toll across all {EVENTS.length} documented events</p>
            <ComparisonChart events={sorted} />
          </div>
        </div>

        {/* Full event grid */}
        <div className="card p-6">
          <h2 className="section-title text-lg mb-6">All Documented Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EVENTS.map((ev) => (
              <Link
                key={ev.id}
                href={`/pandemic/${ev.id}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-border/40 hover:bg-white/5 hover:border-border/80 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ev.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-300 group-hover:text-white truncate transition-colors duration-200">
                    {lang === "es" ? ev.nameEs : ev.name}
                  </p>
                  <p className="text-xs text-slate-600 font-mono">
                    {ev.startYear}{ev.endYear ? `–${ev.endYear}` : "–now"} · {ev.category}
                  </p>
                </div>
                <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: ev.color }}>
                  {formatDeaths(ev.deathsEstimate)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
