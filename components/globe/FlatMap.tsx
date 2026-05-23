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
import { useI18n } from "@/lib/i18n";

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

// ── Organic blob marker (background / dimmed) ──────────────────────────────

interface BlobProps {
  r: number;          // base radius (SVG units)
  color: string;
  intensity?: number;
  opacity?: number;   // multiplier on all alphas (for dimmed state)
  seed?: number;      // deterministic variation offset
  onClick?: () => void;
}

function BlobMarker({ r, color, intensity = 1, opacity = 1, seed = 0, onClick }: BlobProps) {
  // Deterministic offsets so blobs look organic without being random
  const ox = [0.8, -0.7, 0.2, -0.4][seed % 4] * r * 0.9;
  const oy = [0.5, -0.6, 0.9, -0.3][seed % 4] * r * 0.9;

  return (
    <>
      {/* Blurred organic fill */}
      <g style={{ filter: "blur(2.5px)", pointerEvents: "none" }}>
        {/* Wide diffuse halo */}
        <circle r={r * 7 * intensity} fill={color} fillOpacity={0.04 * opacity} />
        {/* Mid halo */}
        <circle r={r * 4 * intensity} fill={color} fillOpacity={0.09 * opacity} />
        {/* Offset blob A */}
        <circle cx={ox} cy={oy} r={r * 2.5 * intensity} fill={color} fillOpacity={0.08 * opacity} />
        {/* Offset blob B */}
        <circle cx={-ox * 0.6} cy={-oy * 0.7} r={r * 2 * intensity} fill={color} fillOpacity={0.07 * opacity} />
        {/* Inner glow */}
        <circle r={r * 1.4 * intensity} fill={color} fillOpacity={0.22 * opacity} />
        {/* Soft core — no hard dot */}
        <circle r={r * 0.6 * intensity} fill={color} fillOpacity={0.50 * opacity} />
      </g>
      {/* Transparent click target over the blob */}
      {onClick && (
        <circle
          r={r * 5 * intensity}
          fill="transparent"
          style={{ cursor: "pointer" }}
          onClick={onClick}
        />
      )}
    </>
  );
}

// ── Active-event blob marker ───────────────────────────────────────────────

interface ActiveBlobProps {
  r: number;
  intensity: number;
  color: string;
  label: string;
  seed?: number;
  zoom: number;
}

function ActiveBlobMarker({ r, intensity, color, label, seed = 0, zoom }: ActiveBlobProps) {
  const ox = [1.1, -0.8, 0.3, -0.5][seed % 4] * r * intensity;
  const oy = [0.6, -0.9, 0.8, -0.4][seed % 4] * r * intensity;

  const labelOffset = r * 3.5 * intensity + 2;
  const fontSize = Math.max(2, 3.5 / zoom);

  return (
    <>
      {/* Blurred blob layers */}
      <g style={{ filter: "blur(3px)", pointerEvents: "none" }}>
        {/* Outermost diffuse zone */}
        <circle r={r * 11 * intensity} fill={color} fillOpacity={0.03} />
        {/* Wide halo */}
        <circle r={r * 7 * intensity} fill={color} fillOpacity={0.06} />
        {/* Organic offset blobs */}
        <circle cx={ox} cy={oy} r={r * 5 * intensity} fill={color} fillOpacity={0.05} />
        <circle cx={-ox * 0.7} cy={-oy * 0.8} r={r * 4 * intensity} fill={color} fillOpacity={0.05} />
        {/* Mid glow */}
        <circle r={r * 3 * intensity} fill={color} fillOpacity={0.14} />
        {/* Inner glow */}
        <circle r={r * 1.6 * intensity} fill={color} fillOpacity={0.30} />
        {/* Soft bright core — no hard exact dot */}
        <circle r={r * 0.7} fill={color} fillOpacity={0.65} />
      </g>
      {/* Label sits above the blur group (so it stays sharp) */}
      <text
        textAnchor="middle"
        y={-labelOffset}
        fill={color}
        fontSize={fontSize}
        fontFamily="monospace"
        fontWeight="700"
        style={{ pointerEvents: "none", textShadow: `0 0 6px ${color}` }}
      >
        {label}
      </text>
    </>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function FlatMap({ event, allEvents, onEventClick }: Props) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 5]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null);
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const darkMode = useAppStore((s) => s.darkMode);
  const { t, lang } = useI18n();
  const evName = (ev: HistoricalEvent) => (lang === "es" ? ev.nameEs : ev.name);

  const handleZoomIn  = () => setZoom((z) => Math.min(z * 1.5, 8));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.5, 1));
  const handleReset   = () => { setZoom(1); setCenter([0, 5]); };

  // Theme colours
  const mapBg      = darkMode ? "#060E1E" : "#dbeafe";
  const landFill   = darkMode ? "#0F1F38" : "#bfdbfe";
  const landStroke = darkMode ? "#1E3A5F" : "#93c5fd";
  const landHover  = darkMode ? "#1a3560" : "#93c5fd";

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
        width={800}
        height={600}
        className="w-full h-full"
        projectionConfig={{ scale: 210, center: [0, 5] }}
        style={{ overflow: "hidden" }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          minZoom={1}
          maxZoom={8}
          // Constrain live panning to the map's own box so the viewport is
          // never dragged onto blank background.
          translateExtent={[[0, 0], [800, 600]]}
          onMoveEnd={(pos: any) => {
            const nextZoom = Math.max(1, Math.min(8, pos.zoom));
            const [lng, lat] = pos.coordinates as [number, number];
            // Keep the frame 100% covered by map: at zoom 1 the map fits exactly
            // so the centre locks to [0,5]; the pannable room grows with zoom.
            const k = 1 - 1 / nextZoom;        // 0 at z=1 → 0.875 at z=8
            const maxLng = 178 * k;
            const maxLat = 70 * k;
            setCenter([
              Math.max(-maxLng, Math.min(maxLng, lng)),
              Math.max(5 - maxLat, Math.min(5 + maxLat, lat)),
            ]);
            setZoom(nextZoom);
          }}
        >
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

          {/* ── BACKGROUND MODE: all events as soft blobs ── */}
          {!event &&
            allRegions.map((r, i) => (
              <Marker key={`bg-${i}`} coordinates={[r.lng, r.lat]}>
                <BlobMarker
                  r={r.radius}
                  color={r.color}
                  intensity={r.intensity}
                  seed={i}
                  onClick={() => {
                    const ev = allEvents.find((e) => e.id === r.eventId);
                    if (ev && onEventClick) onEventClick(ev);
                  }}
                />
              </Marker>
            ))}

          {/* ── SELECTION MODE: dimmed background events ── */}
          {event &&
            allRegions
              .filter((r) => r.eventId !== event.id)
              .map((r, i) => (
                <Marker key={`dim-${i}`} coordinates={[r.lng, r.lat]}>
                  <BlobMarker
                    r={r.radius}
                    color={r.color}
                    intensity={r.intensity * 0.5}
                    opacity={0.3}
                    seed={i}
                  />
                </Marker>
              ))}

          {/* ── SELECTION MODE: active event regions ── */}
          {event &&
            event.regions.map((r, i) => (
              <Marker key={`active-${i}`} coordinates={[r.lng, r.lat]}>
                <ActiveBlobMarker
                  r={r.radius}
                  intensity={r.intensity}
                  color={event.color}
                  label={r.label}
                  seed={i}
                  zoom={zoom}
                />
              </Marker>
            ))}

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
                <p className={`text-xs font-mono uppercase tracking-wider mb-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{t("ev_country_label")}</p>
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
                  {countryInfo.events.length} {t("ev_events_affected")}
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
                      <span className={`text-xs font-semibold truncate ${darkMode ? "text-slate-300" : "text-slate-700"}`}>{evName(ev)}</span>
                    </div>
                    <span className="text-xs font-mono flex-shrink-0" style={{ color: ev.color }}>
                      {formatDeaths(ev.deathsEstimate)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                {t("ev_no_events_territory")}
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
            <span className={`text-xs font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>{evName(event)}</span>
          </div>
          <p className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
            {event.startYear}–{event.endYear ?? t("ev_present")}
          </p>
        </div>
      )}
    </div>
  );
}
