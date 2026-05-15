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
import { X } from "lucide-react";
import type { HistoricalEvent } from "@/data/events";
import { formatDeaths } from "@/data/events";
import { useAppStore } from "@/lib/store";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Props {
  event: HistoricalEvent | null;
  allEvents: HistoricalEvent[];
  onEventClick?: (event: HistoricalEvent) => void;
}

interface CountryInfo {
  name: string;
  events: HistoricalEvent[];
}

/** Simple matching: check if a country name overlaps with event regions / origin */
function getEventsForCountry(name: string, events: HistoricalEvent[]): HistoricalEvent[] {
  const q = name.toLowerCase();
  return events.filter((ev) => {
    const originMatch = ev.originCountry?.toLowerCase().includes(q) || q.includes(ev.originCountry?.toLowerCase() ?? "___");
    const regionMatch = ev.regions.some((r) =>
      r.label?.toLowerCase().includes(q) || q.includes(r.label?.toLowerCase() ?? "___")
    );
    // Also match broad region labels
    const broadMatch = ev.regions.some((r) => {
      const rl = r.label?.toLowerCase() ?? "";
      if (rl.includes("europe") && ["france","germany","italy","spain","poland","russia","ukraine","netherlands","belgium","austria","hungary","romania","czech","sweden","norway","denmark","portugal","greece","switzerland"].some(c => q.includes(c))) return true;
      if (rl.includes("asia") && ["china","japan","korea","india","vietnam","thailand","cambodia","myanmar","indonesia","malaysia","philippines","pakistan","afghanistan","iraq","iran","saudi"].some(c => q.includes(c))) return true;
      if (rl.includes("africa") && ["nigeria","ethiopia","kenya","ghana","egypt","morocco","algeria","congo","tanzania","south africa","angola","mozambique"].some(c => q.includes(c))) return true;
      if (rl.includes("america") && ["united states","canada","mexico","brazil","argentina","colombia","peru","chile","venezuela"].some(c => q.includes(c))) return true;
      return false;
    });
    return originMatch || regionMatch || broadMatch;
  });
}

export function FlatMap({ event, allEvents, onEventClick }: Props) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 15]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null);
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const darkMode = useAppStore((s) => s.darkMode);

  const handleZoomIn  = () => setZoom((z) => Math.min(z * 1.5, 8));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.5, 1));
  const handleReset   = () => { setZoom(1); setCenter([0, 15]); };

  // Theme-aware colours
  const mapBg      = darkMode ? "#060E1E" : "#dbeafe";
  const landFill   = darkMode ? "#0F1F38" : "#bfdbfe";
  const landStroke = darkMode ? "#1E3A5F" : "#93c5fd";
  const landHover  = darkMode ? "#1a3560" : "#93c5fd";
  const originDot  = darkMode ? "#FFFFFF" : "#1e3a8a";

  const allRegions = allEvents.flatMap((ev) =>
    ev.regions.map((r) => ({ ...r, eventId: ev.id, eventName: ev.name, color: ev.color }))
  );

  const handleCountryClick = (geo: any) => {
    const name: string = geo.properties?.name ?? "Unknown territory";
    const matched = getEventsForCountry(name, allEvents);
    setCountryInfo({ name, events: matched });
  };

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
        projection="geoNaturalEarth1"
        className="w-full h-full"
        projectionConfig={{ scale: 165, center: [0, 10] }}
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
                    hover:   { fill: landHover, outline: "none", cursor: "pointer" },
                    pressed: { fill: landHover, outline: "none" },
                  }}
                  onMouseEnter={(e: any) => {
                    const name = geo.properties?.name ?? "";
                    if (name) setTooltip({ x: e.clientX, y: e.clientY, label: name });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => handleCountryClick(geo)}
                />
              ))
            }
          </Geographies>

          {/* Background rings — all events */}
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

          {/* Active event regions */}
          {event &&
            event.regions.map((r, i) => (
              <Marker key={`active-${i}`} coordinates={[r.lng, r.lat]}>
                <circle r={r.radius * 5 * r.intensity} fill={`${event.color}12`} stroke={event.color} strokeWidth={0.8} strokeOpacity={0.5} />
                <circle r={r.radius * 2.5 * r.intensity} fill={`${event.color}25`} stroke={event.color} strokeWidth={1} strokeOpacity={0.7} />
                <circle r={r.radius * 0.8} fill={event.color} fillOpacity={0.9} />
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

          {/* Origin marker */}
          {event && (
            <Marker coordinates={[event.originLng, event.originLat]}>
              <circle r={2.5} fill={originDot} opacity={0.9} />
              <circle r={5} fill="none" stroke={originDot} strokeWidth={0.8} strokeOpacity={0.5} />
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none bg-surface/90 border border-border/60 px-3 py-1.5 rounded-lg text-xs text-slate-300 font-mono z-50"
            style={{ left: tooltip.x + 12, top: tooltip.y - 32 }}
          >
            {tooltip.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Country info panel */}
      <AnimatePresence>
        {countryInfo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={`absolute bottom-4 left-4 right-4 sm:right-auto sm:w-72 rounded-xl p-4 backdrop-blur-sm border z-20 ${
              darkMode ? "bg-surface/90 border-border/60" : "bg-white/95 border-slate-200"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className={`text-xs font-mono uppercase tracking-wider mb-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>Country</p>
                <p className={`font-display font-bold text-base ${darkMode ? "text-white" : "text-slate-900"}`}>{countryInfo.name}</p>
              </div>
              <button
                onClick={() => setCountryInfo(null)}
                className="text-slate-500 hover:text-slate-300 cursor-pointer mt-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {countryInfo.events.length > 0 ? (
              <div className="space-y-2">
                <p className={`text-xs font-mono uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                  {countryInfo.events.length} event{countryInfo.events.length > 1 ? "s" : ""} affected this region
                </p>
                {countryInfo.events.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => { onEventClick?.(ev); setCountryInfo(null); }}
                    className={`w-full flex items-center justify-between gap-2 p-2 rounded-lg transition-colors cursor-pointer ${
                      darkMode ? "hover:bg-white/5" : "hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ev.color }} />
                      <span className={`text-xs font-semibold truncate ${darkMode ? "text-slate-300" : "text-slate-700"}`}>{ev.name}</span>
                    </div>
                    <span className="text-xs font-mono flex-shrink-0" style={{ color: ev.color }}>
                      {formatDeaths(ev.deathsEstimate)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                No tracked events for this territory
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active event legend */}
      {event && !countryInfo && (
        <div className={`absolute bottom-4 left-4 rounded-xl p-3 backdrop-blur-sm border ${
          darkMode ? "bg-surface/80 border-border/60" : "bg-white/90 border-slate-200"
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: event.color }} />
            <span className={`text-xs font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>{event.name}</span>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
            {event.startYear}–{event.endYear ?? "present"}
          </p>
        </div>
      )}
    </div>
  );
}
