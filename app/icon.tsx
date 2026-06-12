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
          // Sealed-pulse shield for DeathVault (dark shield + amber flatline)
          <svg width="26" height="26" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 16 L82 27 L82 54 Q82 78 50 91 Q18 78 18 54 L18 27 Z" fill="#0A0905" />
            <path d="M28 54 H45 L50 41 L56 67 L61 54 H75" fill="none" stroke={bg} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="28" cy="54" r="4.5" fill={bg} />
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
