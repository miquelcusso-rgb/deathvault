import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { buildAlternates } from "@/lib/locale";
import type { Lang } from "@/lib/translations";
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

  const title = isEs
    ? `${meta.name} — Compara los eventos más mortíferos de la historia`
    : `${meta.name} — Compare History's Deadliest Events`;
  const description = isEs
    ? (isPA
        ? `Compara dos pandemias o epidemias históricas lado a lado en ${meta.name}. Muertes, cronologías y propagación geográfica — Peste Negra vs Gripe Española, Gripe Española vs COVID-19 y más.`
        : `Compara dos eventos históricos lado a lado en ${meta.name}. Muertes, cronologías y propagación geográfica — Peste Negra vs Segunda Guerra Mundial, Gripe Española vs COVID-19 y más.`)
    : (isPA
        ? `Compare any two historical pandemics side by side on ${meta.name}. Deaths, timelines, and geographic spread — Black Death vs Spanish Flu, Spanish Flu vs COVID-19, and more.`
        : `Compare any two historical events side by side on ${meta.name}. Deaths, timelines, and geographic spread — Black Death vs WWII, Spanish Flu vs COVID-19, and more.`);
  const ogTitle = isEs ? `Comparar eventos históricos | ${meta.name}` : `Compare Historical Events | ${meta.name}`;
  const ogDescription = isEs
    ? (isPA
        ? "Comparación lado a lado de las pandemias y epidemias más mortíferas de la historia. Cifras de muertes, cronologías e impacto geográfico."
        : "Comparación lado a lado de pandemias, guerras y eventos nucleares. Cifras de muertes, cronologías e impacto geográfico.")
    : (isPA
        ? "Side-by-side comparison of history's deadliest pandemics and epidemics. Death tolls, timelines, and geographic impact."
        : "Side-by-side comparison of pandemics, wars, and nuclear events. Death tolls, timelines, and geographic impact.");

  return {
    title,
    description,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: alt.canonical,
      locale: isEs ? "es_ES" : "en_US",
      images: [{ url: "/compare/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/compare/opengraph-image"],
    },
  };
}

export default async function CompareLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const meta = BRAND_META[brand];
  const isEs = h.get("x-locale") === "es";
  const base = isEs ? `${meta.url}/es` : meta.url;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isEs ? "Inicio" : "Home", "item": base },
      { "@type": "ListItem", "position": 2, "name": isEs ? "Comparar eventos" : "Compare Events", "item": `${base}/compare` },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      {children}
    </>
  );
}
