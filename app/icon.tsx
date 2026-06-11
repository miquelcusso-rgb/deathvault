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
          // Sealed-pulse mark for DeathVault (dark flatline on the amber vault)
          <svg width="22" height="22" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 52 H42 L49 30 L57 72 L64 52 H80" fill="none" stroke="#0A0905" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="20" cy="52" r="5" fill="#0A0905" />
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
