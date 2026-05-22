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
  const maintained = new Date("2026-05-23");

  // Each entry's canonical loc is the English URL, with reciprocal hreflang
  // alternates pointing crawlers at the Spanish (/es) version of the same page.
  const altOf = (path: string) => {
    const p = path === "/" ? "" : path;
    return { languages: { en: `${base}${p}`, es: `${base}/es${p}` } };
  };

  const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/",           changeFrequency: "daily",   priority: 1.0 },
    { path: "/events",     changeFrequency: "weekly",  priority: 0.95 },
    { path: "/news",       changeFrequency: "daily",   priority: 0.9 },
    { path: "/pathogens",  changeFrequency: "monthly", priority: 0.85 },
    { path: "/compare",    changeFrequency: "monthly", priority: 0.8 },
    { path: "/statistics", changeFrequency: "weekly",  priority: 0.8 },
    { path: "/about",      changeFrequency: "yearly",  priority: 0.4 },
    { path: "/support",    changeFrequency: "yearly",  priority: 0.3 },
    { path: "/privacy",    changeFrequency: "yearly",  priority: 0.2 },
    { path: "/terms",      changeFrequency: "yearly",  priority: 0.2 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: maintained,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: altOf(r.path),
  }));

  // Event pages — highest priority
  // lastModified = when the PAGE was last updated (not when the historical event ended)
  // Ancient event endYears (e.g. 430 AD) would produce invalid ISO dates for Google
  const eventPages: MetadataRoute.Sitemap = brandEvents.map((ev) => ({
    url: `${base}/pandemic/${ev.id}`,
    lastModified: maintained,
    changeFrequency: (ev.endYear === null ? "weekly" : "yearly") as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: ev.endYear === null ? 0.95 : 0.9,
    alternates: altOf(`/pandemic/${ev.id}`),
  }));

  return [...staticPages, ...eventPages];
}
