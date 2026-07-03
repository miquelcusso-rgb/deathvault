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

  // DeathVault canonicalizes its plague/pandemic pages to PlagueAtlas (it owns
  // the topic cross-domain). Those pages stay live for users, but they must NOT
  // appear in DeathVault's sitemap — a sitemap of only its original (non-pandemic)
  // pages is a clean "original site" signal for AdSense. PlagueAtlas lists all.
  const isDV = brand === "deathvault";
  const PLAGUE_PILLARS = ["/black-death", "/spanish-flu", "/bubonic-plague", "/cholera"];
  // Pillars que SOLO existen en DeathVault (guerra/nuclear/etc) → fuera del sitemap de PlagueAtlas (si no, 404).
  const DV_ONLY_PILLARS = ["/world-war-2-deaths"];

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
    { path: "/black-death", changeFrequency: "monthly", priority: 0.95 },
    { path: "/spanish-flu", changeFrequency: "monthly", priority: 0.95 },
    { path: "/bubonic-plague", changeFrequency: "monthly", priority: 0.95 },
    { path: "/cholera", changeFrequency: "monthly", priority: 0.95 },
    { path: "/world-war-2-deaths", changeFrequency: "monthly", priority: 0.95 },
    { path: "/about",      changeFrequency: "yearly",  priority: 0.4 },
    { path: "/support",    changeFrequency: "yearly",  priority: 0.3 },
    { path: "/privacy",    changeFrequency: "yearly",  priority: 0.2 },
    { path: "/terms",      changeFrequency: "yearly",  priority: 0.2 },
    { path: "/cookies",    changeFrequency: "yearly",  priority: 0.2 },
    { path: "/contact",    changeFrequency: "yearly",  priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes
    .filter((r) => !(isDV && PLAGUE_PILLARS.includes(r.path)) && !(!isDV && DV_ONLY_PILLARS.includes(r.path)))
    .map((r) => ({
    url: `${base}${r.path === "/" ? "" : r.path}`,
    lastModified: maintained,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: altOf(r.path),
  }));

  // Event pages — highest priority
  // lastModified = when the PAGE was last updated (not when the historical event ended)
  // Ancient event endYears (e.g. 430 AD) would produce invalid ISO dates for Google
  const eventPages: MetadataRoute.Sitemap = brandEvents
    .filter((ev) => !(isDV && ev.category === "pandemic"))
    .map((ev) => ({
    url: `${base}/pandemic/${ev.id}`,
    lastModified: maintained,
    changeFrequency: (ev.endYear === null ? "weekly" : "yearly") as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: ev.endYear === null ? 0.95 : 0.9,
    alternates: altOf(`/pandemic/${ev.id}`),
  }));

  return [...staticPages, ...eventPages];
}
