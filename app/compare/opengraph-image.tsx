import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Compare History's Deadliest Events";

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
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
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

        {/* Ambient glow left */}
        <div style={{
          position: "absolute", top: -80, left: -60,
          width: 500, height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${accentRgb},0.12) 0%, transparent 70%)`,
        }} />

        {/* Ambient glow right */}
        <div style={{
          position: "absolute", bottom: -80, right: -60,
          width: 400, height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)`,
        }} />

        {/* ─── LEFT SIDE — VS boxes ─── */}
        <div style={{
          width: 420,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          paddingLeft: 60,
          paddingRight: 20,
          position: "relative",
        }}>
          {/* Event box A */}
          <div style={{
            width: 280,
            height: 160,
            borderRadius: 16,
            border: `2px solid rgba(${accentRgb},0.5)`,
            background: `rgba(${accentRgb},0.08)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}>
            {/* Abstract event silhouette bars */}
            <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
              {[40, 60, 80, 55, 35].map((h, i) => (
                <div key={i} style={{
                  width: 18,
                  height: h,
                  borderRadius: 4,
                  background: `rgba(${accentRgb},${0.4 + i * 0.1})`,
                }} />
              ))}
            </div>
            <span style={{ color: accent, fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
              Event A
            </span>
          </div>

          {/* VS badge */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `rgba(${accentRgb},0.15)`,
            border: `2px solid rgba(${accentRgb},0.6)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "14px 0",
          }}>
            <span style={{ color: accent, fontSize: 18, fontWeight: 900 }}>VS</span>
          </div>

          {/* Event box B */}
          <div style={{
            width: 280,
            height: 160,
            borderRadius: 16,
            border: "2px solid rgba(6,182,212,0.4)",
            background: "rgba(6,182,212,0.06)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}>
            <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
              {[70, 45, 90, 60, 30].map((h, i) => (
                <div key={i} style={{
                  width: 18,
                  height: h,
                  borderRadius: 4,
                  background: `rgba(6,182,212,${0.4 + i * 0.08})`,
                }} />
              ))}
            </div>
            <span style={{ color: "#06B6D4", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
              Event B
            </span>
          </div>
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
          {/* Badge */}
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
            fontSize: 58,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.05,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
          }}>
            <span>Compare</span>
            <span>History's</span>
            <span style={{ color: accent }}>Deadliest Events</span>
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
            Side-by-side death tolls, timelines, and geographic impact
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
