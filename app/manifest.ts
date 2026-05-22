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
    theme_color: isDV ? "#F59E0B" : "#EC4899",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["education", "news"],
    lang: "en",
    dir: "ltr",
  };
}
