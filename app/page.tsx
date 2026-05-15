"use client";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { Globe, Map, BarChart3, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PandemicSelector } from "@/components/PandemicSelector";
import { DeathCounter } from "@/components/DeathCounter";
import { EVENTS, formatDeaths, getEventById } from "@/data/events";
import { useI18n } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { useBrand } from "@/app/providers";
import { BRAND_CATEGORIES, BRAND_META } from "@/lib/brand";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Dynamic import to avoid SSR issues with Three.js/WebGL
const GlobeView = dynamic(
  () => import("@/components/globe/GlobeView").then((m) => m.GlobeView),
  { ssr: false, loading: () => <GlobeLoader /> }
);
const FlatMap = dynamic(
  () => import("@/components/globe/FlatMap").then((m) => m.FlatMap),
  { ssr: false, loading: () => <GlobeLoader /> }
);

function GlobeLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-DEFAULT/30 border-t-cyan-DEFAULT animate-spin" />
        <span className="text-slate-500 text-sm font-mono">Loading visualization...</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useI18n();
  const brand = useBrand();
  const isDV = brand === "deathvault";
  const mapView = useAppStore((s) => s.mapView);
  const setMapView = useAppStore((s) => s.setMapView);
  const selectedEventId = useAppStore((s) => s.selectedEventId);
  const setSelectedEventId = useAppStore((s) => s.setSelectedEventId);
  const selectedEvent = selectedEventId ? getEventById(selectedEventId) ?? null : null;

  // Filter events per brand
  const allowedCats = BRAND_CATEGORIES[brand];
  const brandEvents = EVENTS.filter((e) => allowedCats.includes(e.category));
  const TOTAL_DEATHS = brandEvents.reduce((sum, e) => sum + e.deathsEstimate, 0);
  const TOTAL_EVENTS = brandEvents.length;

  const meta = BRAND_META[brand];
  const accentColor = isDV ? "text-amber-400" : "text-crimson-light";
  const accentNeon  = isDV ? "" : "neon-red";

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />

      {/* Hero strip */}
      <div className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 pt-6">
          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
                {isDV
                  ? <>Death<span className={accentColor}>Vault</span></>
                  : <>Plague<span className={accentColor}>Atlas</span></>
                }
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">{meta.tagline}</p>
            </div>
            <div className="flex-1" />
            <div className="flex gap-4">
              <div className="text-center">
                <p className={cn("font-mono font-black text-2xl", accentColor, accentNeon)}>
                  {formatDeaths(TOTAL_DEATHS)}
                </p>
                <p className="text-slate-600 text-xs">{t("hero_deaths")}</p>
              </div>
              <div className="w-px bg-border/40" />
              <div className="text-center">
                <p className="font-mono font-black text-2xl text-cyan-light">
                  {TOTAL_EVENTS}
                </p>
                <p className="text-slate-600 text-xs">{t("hero_events")}</p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <Link href="/compare" className="btn-secondary text-xs py-2">
              <BarChart3 className="w-3.5 h-3.5" />
              {t("nav_compare")}
            </Link>
            <Link href="/statistics" className="btn-secondary text-xs py-2">
              <Zap className="w-3.5 h-3.5" />
              {t("nav_statistics")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-4">
          {/* Left — Selector */}
          <div className="card p-4 h-[calc(100vh-220px)] min-h-[500px] flex flex-col overflow-hidden order-2 lg:order-1">
            <h2 className="text-white font-display font-semibold text-sm mb-3 flex items-center gap-2">
              <div className="w-1.5 h-4 rounded-full bg-crimson-light" />
              Events
            </h2>
            <PandemicSelector
              selectedId={selectedEventId}
              onSelect={setSelectedEventId}
            />
          </div>

          {/* Center — Globe / Map */}
          <div className="card overflow-hidden h-[calc(100vh-220px)] min-h-[500px] relative order-1 lg:order-2">
            {/* View toggle */}
            <div className="absolute top-4 left-4 z-10 flex gap-1 bg-black/40 border border-border/50 backdrop-blur-sm rounded-xl p-1">
              <button
                onClick={() => setMapView("globe")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
                  mapView === "globe"
                    ? "bg-cyan-DEFAULT/20 text-cyan-light border border-cyan-DEFAULT/40"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Globe className="w-3.5 h-3.5" />
                {t("map_3d")}
              </button>
              <button
                onClick={() => setMapView("flat")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
                  mapView === "flat"
                    ? "bg-cyan-DEFAULT/20 text-cyan-light border border-cyan-DEFAULT/40"
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Map className="w-3.5 h-3.5" />
                {t("map_flat")}
              </button>
            </div>

            <div className="globe-wrapper w-full h-full">
              <AnimatePresence mode="wait">
                {mapView === "globe" ? (
                  <motion.div
                    key="globe"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <GlobeView
                      event={selectedEvent}
                      allEvents={brandEvents}
                      onEventClick={(ev) => setSelectedEventId(ev.id)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="flat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <FlatMap
                      event={selectedEvent}
                      allEvents={brandEvents}
                      onEventClick={(ev) => setSelectedEventId(ev.id)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right — Info panel */}
          <div className="card p-4 h-[calc(100vh-220px)] min-h-[500px] overflow-y-auto scrollbar-thin order-3">
            <DeathCounter event={selectedEvent} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
