"use client";
import dynamic from "next/dynamic";
import { Globe, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PandemicSelector } from "@/components/PandemicSelector";
import { DeathCounter } from "@/components/DeathCounter";
import { NowLive } from "@/components/NowLive";
import { type HistoricalEvent, getEventById } from "@/data/events";
import { useI18n } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

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

interface Props {
  brandEvents: HistoricalEvent[];
}

export function HomeClient({ brandEvents }: Props) {
  const { t } = useI18n();
  const mapView = useAppStore((s) => s.mapView);
  const setMapView = useAppStore((s) => s.setMapView);
  const selectedEventId = useAppStore((s) => s.selectedEventId);
  const setSelectedEventId = useAppStore((s) => s.setSelectedEventId);
  const selectedEvent = selectedEventId ? getEventById(selectedEventId) ?? null : null;

  return (
    <>
      {/* Main interactive layout */}
      <main id="main-content" className="max-w-[1350px] mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] gap-4">
          {/* Left — Event Selector */}
          <div className="card p-4 h-[600px] flex flex-col overflow-hidden order-2 lg:order-1">
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
          <div className="overflow-hidden h-[600px] relative order-1 lg:order-2 rounded-2xl border border-border/60 bg-surface" style={{ isolation: "isolate" }}>
            <div className="absolute top-4 left-4 z-10 flex gap-1 bg-black/40 border border-border/50 backdrop-blur-sm rounded-xl p-1">
              <button
                onClick={() => setMapView("globe")}
                aria-pressed={mapView === "globe"}
                aria-label="Switch to 3D globe view"
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
                aria-pressed={mapView === "flat"}
                aria-label="Switch to flat map view"
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
                  <motion.div key="globe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <GlobeView event={selectedEvent} allEvents={brandEvents} onEventClick={(ev) => setSelectedEventId(ev.id)} />
                  </motion.div>
                ) : (
                  <motion.div key="flat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <FlatMap event={selectedEvent} allEvents={brandEvents} onEventClick={(ev) => setSelectedEventId(ev.id)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right — Death Counter */}
          <div className="card p-4 h-[600px] overflow-y-auto scrollbar-thin order-3">
            <DeathCounter event={selectedEvent} />
          </div>
        </div>

        {/* NOW LIVE */}
        <div className="mt-4">
          <NowLive onEventClick={(ev) => setSelectedEventId(ev.id)} />
        </div>
      </main>
    </>
  );
}
