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
          <svg width="320" height="320" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 16 L82 27 L82 54 Q82 78 50 91 Q18 78 18 54 L18 27 Z" fill={dark} />
            <path d="M28 54 H45 L50 41 L56 67 L61 54 H75" fill="none" stroke={bg} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="28" cy="54" r="4" fill={bg} />
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
