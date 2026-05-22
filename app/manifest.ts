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
    // Icons: use the OG image endpoint until dedicated PWA icons are created
    icons: [
      {
        src: "/opengraph-image",
        sizes: "1200x630",
        type: "image/png",
      },
    ],
    categories: ["education", "news"],
    lang: "en",
    dir: "ltr",
  };
}
