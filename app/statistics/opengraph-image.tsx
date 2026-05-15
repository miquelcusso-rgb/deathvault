import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "History's Deadliest Events — Ranked";

const BAR_DATA = [
  { label: "Black Death",   color: "#DC2626", pct: 100 },
  { label: "WWII",          color: "#F59E0B", pct: 72  },
  { label: "Spanish Flu",   color: "#06B6D4", pct: 58  },
  { label: "WWI",           color: "#10B981", pct: 38  },
  { label: "COVID-19",      color: "#8B5CF6", pct: 22  },
];

export default async function OGImage() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];

  const isPlagueAtlas = brand === "plagueatlas";
  const accent = isPlagueAtlas ? "#DC2626" : "#F59E0B";
  const accentRgb = isPlagueAtlas ? "220,38,38" : "245,158,11";
  const bg = isPlagueAtlas ? "#05080F" : "#07090D";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: bg,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid background */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }}
          viewBox="0 0 1200 630"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={630} stroke={accent} strokeWidth="0.5" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 50} x2={1200} y2={i * 50} stroke={accent} strokeWidth="0.5" />
          ))}
        </svg>

        {/* Ambient glow top-left */}
        <div style={{
          position: "absolute", top: -100, left: -80,
          width: 480, height: 480,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${accentRgb},0.1) 0%, transparent 70%)`,
        }} />
        {/* Ambient glow bottom-right */}
        <div style={{
          position: "absolute", bottom: -80, right: -60,
          width: 380, height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }} />

        {/* ─── LEFT SIDE — bar chart ─── */}
        <div style={{
          width: 450,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 60,
          paddingRight: 30,
          gap: 0,
        }}>
          {/* Rank label */}
          <div style={{
            color: "#475569",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 20,
            display: "flex",
          }}>
            Top 5 by death toll
          </div>

          {BAR_DATA.map((item, i) => (
            <div key={item.label} style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    color: "#475569",
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "monospace",
                    width: 20,
                    display: "flex",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: item.color, fontSize: 14, fontWeight: 700 }}>
                    {item.label}
                  </span>
                </div>
              </div>
              {/* Bar */}
              <div style={{
                height: 12,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 6,
                overflow: "hidden",
                marginLeft: 28,
              }}>
                <div style={{
                  width: `${item.pct}%`,
                  height: "100%",
                  borderRadius: 6,
                  background: item.color,
                  opacity: 0.85,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Vertical divider ─── */}
        <div style={{
          width: 1,
          height: "60%",
          alignSelf: "center",
          background: `linear-gradient(180deg, transparent, rgba(${accentRgb},0.4), transparent)`,
        }} />

        {/* ─── RIGHT SIDE — text ─── */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 50,
          paddingRight: 60,
        }}>
          {/* Brand badge */}
          <div style={{
            display: "flex",
            marginBottom: 24,
          }}>
            <div style={{
              background: `rgba(${accentRgb},0.15)`,
              border: `1px solid rgba(${accentRgb},0.4)`,
              borderRadius: 20,
              padding: "4px 14px",
              color: accent,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              display: "flex",
            }}>
              {meta.name}
            </div>
          </div>

          {/* Title */}
          <div style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.05,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
          }}>
            <span>History's</span>
            <span>Deadliest Events</span>
            <span style={{ color: accent }}>— Ranked</span>
          </div>

          {/* Divider */}
          <div style={{
            width: 50, height: 3,
            background: `linear-gradient(90deg, ${accent}, transparent)`,
            borderRadius: 2,
            marginBottom: 20,
          }} />

          {/* Subtitle */}
          <div style={{
            fontSize: 18,
            color: "#94A3B8",
            lineHeight: 1.5,
            display: "flex",
            maxWidth: 380,
          }}>
            Interactive charts and statistics across 813M+ deaths
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accent} 40%, #06B6D4 70%, transparent)`,
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
          {isPlagueAtlas ? "plagueatlas.com" : "deathvault.app"}
        </div>
      </div>
    ),
    { ...size }
  );
}
