import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { detectBrand } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const alt = "PlagueAtlas / DeathVault — Interactive Pandemic & Death Map";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);

  const isPlagueAtlas = brand === "plagueatlas";
  const accent = isPlagueAtlas ? "#DC2626" : "#F59E0B";
  const accentRgb = isPlagueAtlas ? "220,38,38" : "245,158,11";
  const bg = isPlagueAtlas ? "#05080F" : "#07090D";
  const secondGlow = isPlagueAtlas ? "rgba(6,182,212,0.12)" : "rgba(245,158,11,0.08)";
  const gridColor = isPlagueAtlas ? "#4FC3DC" : "#F59E0B";
  const urlText = isPlagueAtlas ? "plagueatlas.com" : "deathvault.app";

  const wordA = isPlagueAtlas ? "Plague" : "Death";
  const wordB = isPlagueAtlas ? "Atlas" : "Vault";
  const badge = isPlagueAtlas ? "INTERACTIVE DEATH MAP" : "CLASSIFIED ARCHIVE";
  const subtitle = isPlagueAtlas
    ? "Interactive epidemic & disease history map"
    : "Every mass death event in recorded history";
  const stats = isPlagueAtlas
    ? [
        { value: "813M+", label: "Deaths tracked", color: accent },
        { value: "16", label: "Events", color: "#06B6D4" },
        { value: "1,500yr", label: "Time span", color: "#10B981" },
      ]
    : [
        { value: "813M+", label: "Deaths tracked", color: accent },
        { value: "16", label: "Events", color: "#06B6D4" },
        { value: "wars · nuclear", label: "Categories", color: "#8B5CF6" },
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

        {/* ─── GLOBE + SKULL logo, left side ─── */}
        <div style={{
          position: "absolute",
          left: 80,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="280" height="280" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">
            {/* Outer glow ring */}
            <circle cx="140" cy="155" r="108" fill="none" stroke={`rgba(${accentRgb},0.2)`} strokeWidth="12" />
            <circle cx="140" cy="155" r="95" fill="none" stroke={`rgba(${accentRgb},0.12)`} strokeWidth="20" />

            {/* Globe body */}
            <circle cx="140" cy="155" r="90" fill="#0A1E3D" stroke="#1E4A7A" strokeWidth="1.5" />

            {/* Globe latitude lines */}
            <ellipse cx="140" cy="155" rx="90" ry="25" fill="none" stroke="#1E5A8A" strokeWidth="1" opacity="0.7" />
            <ellipse cx="140" cy="120" rx="80" ry="18" fill="none" stroke="#1E5A8A" strokeWidth="0.8" opacity="0.5" />
            <ellipse cx="140" cy="190" rx="80" ry="18" fill="none" stroke="#1E5A8A" strokeWidth="0.8" opacity="0.5" />
            <ellipse cx="140" cy="85" rx="55" ry="12" fill="none" stroke="#1E5A8A" strokeWidth="0.7" opacity="0.4" />
            <ellipse cx="140" cy="225" rx="55" ry="12" fill="none" stroke="#1E5A8A" strokeWidth="0.7" opacity="0.4" />

            {/* Globe vertical meridian */}
            <path d="M140 65 Q170 105 170 155 Q170 205 140 245" fill="none" stroke="#1E5A8A" strokeWidth="1" opacity="0.6" />
            <path d="M140 65 Q110 105 110 155 Q110 205 140 245" fill="none" stroke="#1E5A8A" strokeWidth="1" opacity="0.6" />
            <line x1="140" y1="65" x2="140" y2="245" stroke="#1E5A8A" strokeWidth="1" opacity="0.5" />

            {/* Globe shimmer */}
            <circle cx="110" cy="110" r="20" fill="rgba(78,180,220,0.06)" />

            {/* Globe outer ring */}
            <circle cx="140" cy="155" r="90" fill="none" stroke="#2A6A9A" strokeWidth="1.5" />

            {/* Skull shadow/glow behind */}
            <circle cx="140" cy="80" r="46" fill={`rgba(${accentRgb},0.15)`} />
            <circle cx="140" cy="80" r="38" fill={`rgba(${accentRgb},0.08)`} />

            {/* Skull cranium */}
            <ellipse cx="140" cy="72" rx="34" ry="32" fill="#1A0A0A" stroke={accent} strokeWidth="2" />

            {/* Skull cheekbone base */}
            <rect x="110" y="92" width="60" height="18" rx="4" fill="#1A0A0A" stroke={accent} strokeWidth="1.5" />

            {/* Eye sockets */}
            <ellipse cx="126" cy="70" rx="11" ry="12" fill={accent} opacity="0.9" />
            <ellipse cx="154" cy="70" rx="11" ry="12" fill={accent} opacity="0.9" />

            {/* Eye inner dark */}
            <ellipse cx="126" cy="70" rx="8" ry="9" fill="#050810" />
            <ellipse cx="154" cy="70" rx="8" ry="9" fill="#050810" />

            {/* Eye glow */}
            <ellipse cx="126" cy="68" rx="4" ry="4" fill={`rgba(${accentRgb},0.6)`} />
            <ellipse cx="154" cy="68" rx="4" ry="4" fill={`rgba(${accentRgb},0.6)`} />

            {/* Nose cavity */}
            <path d="M136 82 L140 76 L144 82 Z" fill="#050810" />

            {/* Teeth */}
            <rect x="114" y="98" width="9" height="11" rx="2" fill="#050810" stroke={accent} strokeWidth="1" />
            <rect x="126" y="98" width="9" height="13" rx="2" fill="#050810" stroke={accent} strokeWidth="1" />
            <rect x="138" y="98" width="9" height="13" rx="2" fill="#050810" stroke={accent} strokeWidth="1" />
            <rect x="150" y="98" width="9" height="11" rx="2" fill="#050810" stroke={accent} strokeWidth="1" />

            {/* Skull crack detail */}
            <path d="M140 42 L138 52 L143 58 L140 68" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />

            {/* Pulsing dots */}
            <circle cx="160" cy="145" r="4" fill={accent} opacity="0.9" />
            <circle cx="160" cy="145" r="8" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
            <circle cx="115" cy="170" r="3" fill="#06B6D4" opacity="0.8" />
            <circle cx="115" cy="170" r="6" fill="none" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
          </svg>
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
          background: `linear-gradient(90deg, transparent, ${accent} 30%, #06B6D4 70%, transparent)`,
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
