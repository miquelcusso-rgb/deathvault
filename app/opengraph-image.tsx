import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { detectBrand, BRAND_CATEGORIES } from "@/lib/brand";
import { BroteMark } from "@/lib/brote-mark";
import { EVENTS } from "@/data/events";

export const dynamic = "force-dynamic";

export const alt = "Interactive map of history's deadliest events";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function formatBigDeaths(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B+";
  if (n >= 1_000_000) return Math.round(n / 1_000_000) + "M+";
  if (n >= 1_000) return Math.round(n / 1_000) + "K+";
  return String(n);
}

export default async function OGImage() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const isPlagueAtlas = brand === "plagueatlas";

  // Real, brand-filtered totals (computed live from the dataset)
  const brandEvents = EVENTS.filter((e) => BRAND_CATEGORIES[brand].includes(e.category));
  const totalDeaths = brandEvents.reduce((s, e) => s + e.deathsEstimate, 0);
  const eventCount = brandEvents.length;
  const categoryCount = new Set(brandEvents.map((e) => e.category)).size;
  const earliestYear = brandEvents.reduce((m, e) => Math.min(m, e.startYear), Infinity);
  const yearsSpan = new Date().getFullYear() - earliestYear;

  const accent = isPlagueAtlas ? "#DC2626" : "#F59E0B";
  const accentRgb = isPlagueAtlas ? "220,38,38" : "245,158,11";
  const bg = isPlagueAtlas ? "#05080F" : "#0A0905";
  const secondGlow = isPlagueAtlas ? "rgba(124,58,237,0.14)" : "rgba(217,119,6,0.18)";
  const gridColor = isPlagueAtlas ? "#8B5CF6" : "#F59E0B";
  const secondAccent = isPlagueAtlas ? "#8B5CF6" : "#06B6D4";
  const urlText = isPlagueAtlas ? "plagueatlas.com" : "deathvault.app";

  const wordA = isPlagueAtlas ? "Plague" : "Death";
  const wordB = isPlagueAtlas ? "Atlas" : "Vault";
  const badge = isPlagueAtlas ? "DISEASE ARCHIVE" : "DEATH ARCHIVE";
  const subtitle = isPlagueAtlas
    ? "Interactive epidemic & disease history map"
    : "Every mass death event in recorded history";

  // Stats: real numbers + a third metric that's distinct per brand
  const stats = isPlagueAtlas
    ? [
        { value: formatBigDeaths(totalDeaths), label: "Pandemic deaths", color: accent },
        { value: String(eventCount), label: "Pandemics", color: "#A78BFA" },
        { value: `${Math.round(yearsSpan / 100) * 100}yr`, label: "Of history", color: "#10B981" },
      ]
    : [
        { value: formatBigDeaths(totalDeaths), label: "Deaths documented", color: accent },
        { value: String(eventCount), label: "Mass-death events", color: "#F472B6" },
        { value: String(categoryCount), label: "Categories", color: "#8B5CF6" },
      ];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: bg,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid background */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
          viewBox="0 0 1200 630"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={630} stroke={gridColor} strokeWidth="0.5" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 50} x2={1200} y2={i * 50} stroke={gridColor} strokeWidth="0.5" />
          ))}
        </svg>

        {/* Ambient accent glow top-right */}
        <div style={{
          position: "absolute", top: -120, right: -80,
          width: 500, height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${accentRgb},0.18) 0%, transparent 70%)`,
        }} />

        {/* Ambient cyan/secondary glow bottom-left */}
        <div style={{
          position: "absolute", bottom: -100, left: -60,
          width: 400, height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${secondGlow} 0%, transparent 70%)`,
        }} />

        {/* ─── Brand mark, left side — shield+pulse (DV) / outbreak virion (PA) ─── */}
        <div style={{
          position: "absolute",
          left: 80,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {isPlagueAtlas ? (
          <div style={{
            position: "relative",
            width: 310,
            height: 310,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Iridescent bio glow: red halo + violet/magenta core */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: 310, height: 310,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${accentRgb},0.16) 0%, transparent 70%)`,
            }} />
            <div style={{
              position: "absolute", top: 45, left: 45,
              width: 220, height: 220,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(192,38,211,0.15) 50%, transparent 72%)",
            }} />
            <BroteMark size={300} body="#0B1220" line={accent} outline={accent} />
          </div>
          ) : (
          <svg width="290" height="290" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
            {/* Glow halo */}
            <circle cx="140" cy="140" r="112" fill="none" stroke={`rgba(${accentRgb},0.16)`} strokeWidth="14" />
            <circle cx="140" cy="140" r="94" fill="none" stroke={`rgba(${accentRgb},0.09)`} strokeWidth="26" />
            {/* Shield */}
            <path d="M140 48 L216 74 L216 140 Q216 198 140 230 Q64 198 64 140 L64 74 Z" fill="#140A06" stroke={accent} strokeWidth="4" />
            {/* Flatline pulse — one beat, then flat */}
            <path d="M86 142 H124 L135 110 L149 172 L160 142 H196" fill="none" stroke={accent} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="86" cy="142" r="7" fill={accent} />
          </svg>
          )}
        </div>

        {/* ─── RIGHT side — text content ─── */}
        <div style={{
          position: "absolute",
          left: 400,
          top: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: 60,
        }}>
          {/* Badge chip */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
          }}>
            <div style={{
              background: `rgba(${accentRgb},0.15)`,
              border: `1px solid rgba(${accentRgb},0.4)`,
              borderRadius: 20,
              padding: "4px 14px",
              color: accent,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
            }}>
              {badge}
            </div>
          </div>

          {/* Main title */}
          <div style={{
            fontSize: 82,
            fontWeight: 900,
            lineHeight: 0.95,
            display: "flex",
            marginBottom: 18,
          }}>
            <span style={{ color: "#FFFFFF" }}>{wordA}</span>
            <span style={{ color: accent }}>{wordB}</span>
          </div>

          {/* Divider */}
          <div style={{
            width: 60, height: 3,
            background: `linear-gradient(90deg, ${accent}, transparent)`,
            borderRadius: 2,
            marginBottom: 22,
          }} />

          {/* Tagline */}
          <div style={{
            fontSize: 22,
            color: "#94A3B8",
            lineHeight: 1.4,
            marginBottom: 36,
            maxWidth: 480,
            display: "flex",
          }}>
            {subtitle}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 24 }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${stat.color}30`,
                borderRadius: 12,
                padding: "12px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}>
                <span style={{ color: stat.color, fontSize: 26, fontWeight: 900, lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span style={{ color: "#475569", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accent} 30%, ${secondAccent} 70%, transparent)`,
        }} />

        {/* URL watermark */}
        <div style={{
          position: "absolute",
          bottom: 18, right: 30,
          color: "#1E3A5F",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 1,
          display: "flex",
        }}>
          {urlText}
        </div>
      </div>
    ),
    { ...size }
  );
}
