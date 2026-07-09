import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { detectBrand } from "@/lib/brand";
import { BroteMark } from "@/lib/brote-mark";

export const dynamic = "force-dynamic";

export async function GET() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const isDV = brand === "deathvault";

  const bg = isDV ? "#F59E0B" : "#DC2626";
  const bg2 = isDV ? "#D97706" : "#B91C1C";
  const dark = isDV ? "#07090D" : "#05080F";

  return new ImageResponse(
    (
      <div
        style={{
          width: 192,
          height: 192,
          borderRadius: 38,
          background: `linear-gradient(135deg, ${bg} 0%, ${bg2} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isDV ? (
          <svg width="120" height="120" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="55" cy="46" rx="38" ry="35" fill={dark} />
            <rect x="22" y="70" width="66" height="22" rx="8" fill={dark} />
            <ellipse cx="38" cy="46" rx="12" ry="13" fill={bg} opacity="0.9" />
            <ellipse cx="72" cy="46" rx="12" ry="13" fill={bg} opacity="0.9" />
            <ellipse cx="38" cy="46" rx="8" ry="9" fill={dark} />
            <ellipse cx="72" cy="46" rx="8" ry="9" fill={dark} />
            <rect x="24" y="72" width="14" height="18" rx="3" fill={dark} />
            <rect x="48" y="72" width="14" height="18" rx="3" fill={dark} />
            <rect x="72" y="72" width="14" height="18" rx="3" fill={dark} />
          </svg>
        ) : (
          // Outbreak virion ("Brote") for PlagueAtlas
          <BroteMark size={158} body={dark} line={dark} core={bg} />
        )}
      </div>
    ),
    { width: 192, height: 192 }
  );
}
