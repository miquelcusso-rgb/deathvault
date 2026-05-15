import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { detectBrand } from "@/lib/brand";
import { getEventById, formatDeaths } from "@/data/events";

export const dynamic = "force-dynamic";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventById(slug);
  return [{ id: slug, alt: event ? event.name : "Historical Event" }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
  id: string;
}) {
  const { slug } = await params;
  const event = getEventById(slug);

  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const isPlagueAtlas = brand === "plagueatlas";
  const urlText = isPlagueAtlas ? "plagueatlas.com" : "deathvault.app";

  // Fallback if event not found
  if (!event) {
    const fallbackAccent = "#DC2626";
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            background: "#05080F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{
            color: fallbackAccent,
            fontSize: 60,
            fontWeight: 900,
            display: "flex",
          }}>
            Event Not Found
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const accent = event.color;
  // Convert hex to rgb for rgba usage
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  };
  const accentRgb = hexToRgb(accent);

  const categoryLabel = event.category.charAt(0).toUpperCase() + event.category.slice(1);
  const period = event.endYear ? `${event.startYear}–${event.endYear}` : `${event.startYear}–present`;
  const deathFormatted = formatDeaths(event.deathsEstimate);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#04060C",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Full-bleed radial glow from event color */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${accentRgb},0.08) 0%, transparent 65%)`,
        }} />

        {/* Left ambient large circle */}
        <div style={{
          position: "absolute",
          top: -100,
          left: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${accentRgb},0.08) 0%, transparent 70%)`,
        }} />

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

        {/* Left color strip */}
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 6,
          background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
        }} />

        {/* ─── TOP LEFT — Category badge ─── */}
        <div style={{
          position: "absolute",
          top: 50,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: accent,
          }} />
          <div style={{
            background: `rgba(${accentRgb},0.15)`,
            border: `1px solid rgba(${accentRgb},0.5)`,
            borderRadius: 20,
            padding: "5px 16px",
            color: accent,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            display: "flex",
          }}>
            {categoryLabel}
          </div>
        </div>

        {/* ─── CENTER — main content ─── */}
        <div style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          {/* Event name */}
          <div style={{
            fontSize: 88,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 0.95,
            marginBottom: 28,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            {event.name}
          </div>

          {/* Death count */}
          <div style={{
            fontSize: 52,
            fontWeight: 900,
            color: accent,
            lineHeight: 1,
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            {deathFormatted}
            <span style={{
              fontSize: 16,
              color: "#64748B",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}>
              deaths
            </span>
          </div>

          {/* Period */}
          <div style={{
            fontSize: 22,
            color: "#64748B",
            fontWeight: 600,
            fontFamily: "monospace",
            letterSpacing: 3,
            display: "flex",
          }}>
            {period}
          </div>
        </div>

        {/* Bottom grid lines SVG accent */}
        <svg
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", height: 80, opacity: 0.15 }}
          viewBox="0 0 1200 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={i} x1={i * 100} y1={0} x2={i * 100} y2={80} stroke={accent} strokeWidth="0.5" />
          ))}
          <line x1={0} y1={40} x2={1200} y2={40} stroke={accent} strokeWidth="0.5" />
        </svg>

        {/* Bottom gradient bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accent} 40%, ${accent} 60%, transparent)`,
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
