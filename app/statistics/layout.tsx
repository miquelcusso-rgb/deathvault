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
  const isPA = brand === "plagueatlas";
  const locale: Lang = h.get("x-locale") === "es" ? "es" : "en";
  const invariantPath = h.get("x-invariant-path") || "/";
  const isEs = locale === "es";
  const alt = buildAlternates(meta.url, invariantPath, locale);

  const title = isEs ? `${meta.name} — Estadísticas históricas de mortalidad` : `${meta.name} — Historical Death Statistics`;
  const description = isEs
    ? (isPA
        ? `Estadísticas basadas en datos sobre las pandemias y epidemias más mortíferas en ${meta.name}. Cifras de muertes clasificadas, desgloses por categoría y gráficos interactivos.`
        : `Estadísticas basadas en datos sobre las pandemias, guerras y eventos nucleares más mortíferos en ${meta.name}. Cifras de muertes clasificadas, desgloses por categoría y gráficos interactivos que comparan más de 813M de muertes en 16 eventos históricos.`)
    : (isPA
        ? `Data-driven statistics on the deadliest pandemics and epidemics on ${meta.name}. Ranked death tolls, category breakdowns, and interactive charts.`
        : `Data-driven statistics on the deadliest pandemics, wars, and nuclear events on ${meta.name}. Ranked death tolls, category breakdowns, and interactive charts comparing 813M+ deaths across 16 historical events.`);
  const ogTitle = isEs ? `Estadísticas históricas de mortalidad | ${meta.name}` : `Historical Death Statistics | ${meta.name}`;
  const ogDescription = isEs
    ? (isPA
        ? "Comparaciones clasificadas de las pandemias y epidemias más mortíferas de la historia. Gráficos interactivos y visualizaciones de datos."
        : "Comparaciones clasificadas de las pandemias, guerras y eventos nucleares más mortíferos de la historia. Gráficos interactivos y visualizaciones de datos.")
    : (isPA
        ? "Ranked comparisons of history's deadliest pandemics and epidemics. Interactive charts and data visualizations."
        : "Ranked comparisons of history's deadliest pandemics, wars, and nuclear events. Interactive charts and data visualizations.");

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
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const meta = BRAND_META[brand];
  const isEs = h.get("x-locale") === "es";
  const isPA = brand === "plagueatlas";
  const base = isEs ? `${meta.url}/es` : meta.url;
  const brandEvents = EVENTS.filter((e) => BRAND_CATEGORIES[brand].includes(e.category))
    .sort((a, b) => b.deathsEstimate - a.deathsEstimate);
  const totalDeaths = brandEvents.reduce((s, e) => s + e.deathsEstimate, 0);
  const datasetCoverage = isEs
    ? (isPA ? "Cubre las pandemias y epidemias más mortíferas de la historia." : "Incluye pandemias, guerras, hambrunas y desastres nucleares.")
    : (isPA ? "Covers history's deadliest pandemics and epidemics." : "Includes pandemics, wars, famines, and nuclear disasters.");

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "inLanguage": isEs ? "es" : "en",
    "name": isEs ? `${meta.name} — Estadísticas históricas de mortalidad` : `${meta.name} — Historical Death Statistics`,
    "description": isEs
      ? `Estadísticas de mortalidad clasificadas para ${brandEvents.length} eventos históricos que cubren más de ${(totalDeaths / 1_000_000).toFixed(0)}M de muertes. ${datasetCoverage}`
      : `Ranked death toll statistics for ${brandEvents.length} historical events covering ${(totalDeaths / 1_000_000).toFixed(0)}M+ deaths. ${datasetCoverage}`,
    "url": `${base}/statistics`,
    "creator": { "@type": "Organization", "name": meta.name, "url": base },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "variableMeasured": "Death toll estimates",
    "measurementTechnique": "Aggregated from WHO, CDC, academic research, and peer-reviewed historical studies",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isEs ? "Inicio" : "Home", "item": base },
      { "@type": "ListItem", "position": 2, "name": isEs ? "Estadísticas" : "Statistics", "item": `${base}/statistics` },
    ],
  };

  return (
    <>
      <JsonLd data={[datasetSchema, breadcrumbSchema]} />
      {children}
    </>
  );
}
