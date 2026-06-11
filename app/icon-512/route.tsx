import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { detectBrand } from "@/lib/brand";

export const dynamic = "force-dynamic";

// 512×512 maskable PWA icon. Content sits within the central safe zone so it
// survives the platform's maskable crop.
export async function GET() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const isDV = brand === "deathvault";

  const bg = isDV ? "#F59E0B" : "#DC2626";
  const bg2 = isDV ? "#D97706" : "#B91C1C";
  const dark = isDV ? "#0A0905" : "#05080F";

  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          background: `linear-gradient(135deg, ${bg} 0%, ${bg2} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isDV ? (
          <svg width="300" height="300" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="16" width="68" height="68" rx="20" fill="none" stroke={dark} strokeWidth="6" strokeOpacity="0.35" />
            <path d="M26 50 H42 L48 33 L55 67 L61 50 H74" fill="none" stroke={dark} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="26" cy="50" r="4.2" fill={dark} />
          </svg>
        ) : (
          <svg width="300" height="300" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
            <circle cx="55" cy="55" r="42" fill={dark} stroke="white" strokeWidth="3" strokeOpacity="0.5" />
            <ellipse cx="55" cy="55" rx="42" ry="14" fill="none" stroke="white" strokeWidth="2.5" strokeOpacity="0.4" />
            <ellipse cx="55" cy="55" rx="14" ry="42" fill="none" stroke="white" strokeWidth="2.5" strokeOpacity="0.4" />
            <circle cx="55" cy="55" r="12" fill={bg} opacity="0.9" />
          </svg>
        )}
      </div>
    ),
    { width: 512, height: 512 }
  );
}
