import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META, BRAND_CATEGORIES } from "@/lib/brand";
import { EVENTS } from "@/data/events";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const base = BRAND_META[brand].url;
  const allowedCats = BRAND_CATEGORIES[brand];
  const brandEventSlugs = EVENTS
    .filter((e) => allowedCats.includes(e.category))
    .map((e) => e.id);

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/compare`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/statistics`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/support`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/privacy`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const eventPages: MetadataRoute.Sitemap = brandEventSlugs.map((slug) => ({
    url: `${base}/pandemic/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...eventPages];
}
