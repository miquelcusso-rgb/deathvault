import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const m = BRAND_META[brand];
  const isDV = brand === "deathvault";

  return {
    name: m.name,
    short_name: m.name,
    description: m.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080C10",
    theme_color: isDV ? "#F59E0B" : "#DC2626",
    orientation: "portrait",
    // Square PWA icons — brand mark on the amber/crimson field
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["education", "news"],
    lang: "en",
    dir: "ltr",
  };
}
