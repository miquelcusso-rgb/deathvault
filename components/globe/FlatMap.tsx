"use client";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import type { HistoricalEvent } from "@/data/events";
import { useAppStore } from "@/lib/store";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Props {
  event: HistoricalEvent | null;
  allEvents: HistoricalEvent[];
  onEventClick?: (event: HistoricalEvent) => void;
}

export function FlatMap({ event, allEvents, onEventClick }: Props) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null);
  const darkMode = useAppStore((s) => s.darkMode);

  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.5, 8));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.5, 1));
  const handleReset = () => { setZoom(1); setCenter([0, 20]); };

  // Theme-aware colours
  const mapBg      = darkMode ? "#060E1E"  : "#dbeafe";   // ocean
  const landFill   = darkMode ? "#0F1F38"  : "#bfdbfe";   // continent fill
  const landStroke = darkMode ? "#1E3A5F"  : "#93c5fd";   // border stroke
  const landHover  = darkMode ? "#162B50"  : "#93c5fd";   // hover
  const originDot  = darkMode ? "#FFFFFF"  : "#1e3a8a";

  // Collect all regions
  const allRegions = allEvents.flatMap((ev) =>
    ev.regions.map((r) => ({ ...r, eventId: ev.id, eventName: ev.name, color: ev.color }))
  );

  return (
    <div
      className="w-full h-full relative rounded-xl overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: mapBg }}
    >
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
        {[
          { label: "+", action: handleZoomIn },
          { label: "−", action: handleZoomOut },
          { label: "⟳", action: handleReset },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={action}
            className="w-8 h-8 rounded-lg bg-surface/80 border border-border/60 text-slate-300 hover:text-white hover:bg-surface text-sm font-mono flex items-center justify-center transition-colors duration-200 cursor-pointer"
          >
            {label}
          </button>
        ))}
      </div>

      <ComposableMap
        projection="geoMercator"
        className="w-full h-full"
        projectionConfig={{ scale: 130 }}
      >
        <ZoomableGroup zoom={zoom} center={center} onMoveEnd={(pos: any) => {
          setCenter(pos.coordinates as [number, number]);
          setZoom(pos.zoom);
        }}>
          <Geographies geography={GEO_URL}>
            {({ geographies }: any) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={landFill}
                  stroke={landStroke}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: landHover, outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Background rings — all events (dimmed when none selected) */}
          {!event &&
            allRegions.map((r, i) => (
              <Marker key={`bg-${i}`} coordinates={[r.lng, r.lat]}>
                <circle
                  r={r.radius * 3}
                  fill={`${r.color}18`}
                  stroke={r.color}
                  strokeWidth={0.5}
                  strokeOpacity={0.4}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const ev = allEvents.find((e) => e.id === r.eventId);
                    if (ev && onEventClick) onEventClick(ev);
                  }}
                />
                <circle r={r.radius * 0.8} fill={r.color} fillOpacity={0.55} />
              </Marker>
            ))}

          {/* Dimmed markers when an event IS selected */}
          {event &&
            allRegions
              .filter((r) => r.eventId !== event.id)
              .map((r, i) => (
                <Marker key={`dim-${i}`} coordinates={[r.lng, r.lat]}>
                  <circle r={r.radius * 0.8} fill={r.color} fillOpacity={0.18} />
                </Marker>
              ))}

          {/* Active event regions — emphasized */}
          {event &&
            event.regions.map((r, i) => (
              <Marker key={`active-${i}`} coordinates={[r.lng, r.lat]}>
                {/* Outer glow ring */}
                <circle
                  r={r.radius * 5 * r.intensity}
                  fill={`${event.color}12`}
                  stroke={event.color}
                  strokeWidth={0.8}
                  strokeOpacity={0.5}
                />
                {/* Mid ring */}
                <circle
                  r={r.radius * 2.5 * r.intensity}
                  fill={`${event.color}25`}
                  stroke={event.color}
                  strokeWidth={1}
                  strokeOpacity={0.7}
                />
                {/* Core dot */}
                <circle r={r.radius * 0.8} fill={event.color} fillOpacity={0.9} />
                {/* Label */}
                <text
                  textAnchor="middle"
                  y={-r.radius * 1.5 * r.intensity - 1}
                  fill={event.color}
                  fontSize={2.8 / zoom}
                  fontFamily="monospace"
                  fontWeight="700"
                  style={{ pointerEvents: "none", textShadow: darkMode ? `0 0 4px ${event.color}` : "none" }}
                >
                  {r.label}
                </text>
              </Marker>
            ))}

          {/* Origin star marker */}
          {event && (
            <Marker coordinates={[event.originLng, event.originLat]}>
              <circle r={2.5} fill={originDot} opacity={0.9} />
              <circle r={5} fill="none" stroke={originDot} strokeWidth={0.8} strokeOpacity={0.5} />
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none bg-surface/90 border border-border/60 px-3 py-1.5 rounded-lg text-xs text-slate-300 font-mono"
            style={{ left: tooltip.x + 12, top: tooltip.y - 32 }}
          >
            {tooltip.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend for active event */}
      {event && (
        <div className={`absolute bottom-4 left-4 rounded-xl p-3 backdrop-blur-sm border ${
          darkMode
            ? "bg-surface/80 border-border/60"
            : "bg-white/90 border-slate-200"
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: event.color }} />
            <span className={`text-xs font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>
              {event.name}
            </span>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
            {event.startYear}–{event.endYear ?? "present"}
          </p>
        </div>
      )}
    </div>
  );
}
