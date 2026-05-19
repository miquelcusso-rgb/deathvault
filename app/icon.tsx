import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { detectBrand } from "@/lib/brand";

export const dynamic = "force-dynamic";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const isDV = brand === "deathvault";

  const bg = isDV ? "#F59E0B" : "#DC2626";
  const bg2 = isDV ? "#D97706" : "#B91C1C";

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: `linear-gradient(135deg, ${bg} 0%, ${bg2} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isDV ? (
          // Skull icon for DeathVault
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="10" cy="8.5" rx="7" ry="6.5" fill="#07090D" />
            <rect x="4.5" y="13" width="11" height="3.5" rx="1.5" fill="#07090D" />
            <ellipse cx="7" cy="8.5" rx="2.2" ry="2.4" fill={bg} opacity="0.9" />
            <ellipse cx="13" cy="8.5" rx="2.2" ry="2.4" fill={bg} opacity="0.9" />
            <ellipse cx="7" cy="8.5" rx="1.5" ry="1.7" fill="#07090D" />
            <ellipse cx="13" cy="8.5" rx="1.5" ry="1.7" fill="#07090D" />
            <rect x="5" y="14" width="2.2" height="2.5" rx="0.5" fill="#07090D" />
            <rect x="8.9" y="14" width="2.2" height="2.5" rx="0.5" fill="#07090D" />
            <rect x="12.8" y="14" width="2.2" height="2.5" rx="0.5" fill="#07090D" />
          </svg>
        ) : (
          // Virus/globe icon for PlagueAtlas
          <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="7" fill="#05080F" stroke="white" strokeWidth="0.8" strokeOpacity="0.6" />
            <ellipse cx="10" cy="10" rx="7" ry="2.5" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
            <ellipse cx="10" cy="10" rx="2.5" ry="7" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
            <circle cx="10" cy="10" r="2" fill={bg} opacity="0.9" />
            <circle cx="10" cy="10" r="3.5" fill="none" stroke={bg} strokeWidth="0.8" strokeOpacity="0.5" />
          </svg>
        )}
      </div>
    ),
    { ...size }
  );
}
