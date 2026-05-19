import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const base = BRAND_META[brand].url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
