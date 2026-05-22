import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META, BRAND_CATEGORIES } from "@/lib/brand";
import { buildAlternates } from "@/lib/locale";
import type { Lang } from "@/lib/translations";
import { EVENTS } from "@/data/events";
import { JsonLd } from "@/components/ui/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const meta = BRAND_META[brand];
  const locale: Lang = h.get("x-locale") === "es" ? "es" : "en";
  const invariantPath = h.get("x-invariant-path") || "/";
  const isEs = locale === "es";
  const alt = buildAlternates(meta.url, invariantPath, locale);

  const title = isEs ? `${meta.name} — Estadísticas históricas de mortalidad` : `${meta.name} — Historical Death Statistics`;
  const description = isEs
    ? `Estadísticas basadas en datos sobre las pandemias, guerras y eventos nucleares más mortíferos en ${meta.name}. Cifras de muertes clasificadas, desgloses por categoría y gráficos interactivos que comparan más de 813M de muertes en 16 eventos históricos.`
    : `Data-driven statistics on the deadliest pandemics, wars, and nuclear events on ${meta.name}. Ranked death tolls, category breakdowns, and interactive charts comparing 813M+ deaths across 16 historical events.`;
  const ogTitle = isEs ? `Estadísticas históricas de mortalidad | ${meta.name}` : `Historical Death Statistics | ${meta.name}`;
  const ogDescription = isEs
    ? "Comparaciones clasificadas de las pandemias, guerras y eventos nucleares más mortíferos de la historia. Gráficos interactivos y visualizaciones de datos."
    : "Ranked comparisons of history's deadliest pandemics, wars, and nuclear events. Interactive charts and data visualizations.";

  return {
    title,
    description,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: alt.canonical,
      locale: isEs ? "es_ES" : "en_US",
      images: [{ url: "/statistics/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/statistics/opengraph-image"],
    },
  };
}

export default async function StatisticsLayout({ children }: { children: React.ReactNode }) {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const brandEvents = EVENTS.filter((e) => BRAND_CATEGORIES[brand].includes(e.category))
    .sort((a, b) => b.deathsEstimate - a.deathsEstimate);
  const totalDeaths = brandEvents.reduce((s, e) => s + e.deathsEstimate, 0);

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${meta.name} — Historical Death Statistics`,
    "description": `Ranked death toll statistics for ${brandEvents.length} historical events covering ${(totalDeaths / 1_000_000).toFixed(0)}M+ deaths. Includes pandemics, wars, famines, and nuclear disasters.`,
    "url": `${meta.url}/statistics`,
    "creator": { "@type": "Organization", "name": meta.name, "url": meta.url },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "variableMeasured": "Death toll estimates",
    "measurementTechnique": "Aggregated from WHO, CDC, academic research, and peer-reviewed historical studies",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": meta.url },
      { "@type": "ListItem", "position": 2, "name": "Statistics", "item": `${meta.url}/statistics` },
    ],
  };

  return (
    <>
      <JsonLd data={[datasetSchema, breadcrumbSchema]} />
      {children}
    </>
  );
}
