import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META, BRAND_CATEGORIES } from "@/lib/brand";
import { EVENTS } from "@/data/events";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const base = BRAND_META[brand].url;
  const allowedCats = BRAND_CATEGORIES[brand];
  const brandEvents = EVENTS.filter((e) => allowedCats.includes(e.category));

  // Use a fixed recent date so Google knows content is actively maintained
  const maintained = new Date("2026-05-17");

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                    lastModified: maintained, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/events`,        lastModified: maintained, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/news`,          lastModified: maintained, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/pathogens`,     lastModified: maintained, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/compare`,       lastModified: maintained, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/statistics`,    lastModified: maintained, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/about`,         lastModified: maintained, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/support`,       lastModified: maintained, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/privacy`,       lastModified: maintained, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${base}/terms`,         lastModified: maintained, changeFrequency: "yearly",  priority: 0.2 },
  ];

  // Event pages — highest priority, dated by last-known endYear or ongoing
  const eventPages: MetadataRoute.Sitemap = brandEvents.map((ev) => ({
    url: `${base}/pandemic/${ev.id}`,
    // Ongoing events change more frequently; historical ones are stable
    lastModified: ev.endYear === null ? maintained : new Date(`${ev.endYear}-12-31`),
    changeFrequency: (ev.endYear === null ? "weekly" : "yearly") as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: ev.endYear === null ? 0.95 : 0.9, // ongoing events ranked slightly higher
  }));

  return [...staticPages, ...eventPages];
}
