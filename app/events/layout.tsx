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

  const title = isEs
    ? (isPA
        ? "Las pandemias y epidemias más mortíferas de la historia — Archivo | PlagueAtlas"
        : "Los eventos más mortíferos de la historia — Pandemias, Guerras y Desastres | DeathVault")
    : (isPA
        ? "Deadliest Pandemics & Epidemics in History — Event Archive | PlagueAtlas"
        : "Deadliest Events in Human History — Pandemics, Wars & Disasters | DeathVault");

  const description = isEs
    ? (isPA
        ? "Archivo completo de las pandemias y epidemias más mortíferas de la historia — Peste Negra, Gripe Española, VIH/SIDA, COVID-19 y más. Cifras de muertes, cronologías y mapas interactivos."
        : "Archivo completo de los eventos más mortíferos de la historia — pandemias, guerras mundiales, desastres nucleares y hambrunas. Más de 813M de muertes documentadas con visualizaciones interactivas.")
    : (isPA
        ? "Full archive of history's deadliest pandemics and epidemics — Black Death, Spanish Flu, HIV/AIDS, COVID-19 and more. Interactive death tolls, timelines and maps."
        : "Complete archive of history's deadliest events — pandemics, world wars, nuclear disasters and famines. 813M+ deaths documented across 16 events with interactive visualisations.");

  return {
    title,
    description,
    keywords: isPA
      ? ["deadliest pandemics history", "list of pandemics", "pandemic death tolls", "epidemic history", "black death", "spanish flu", "cholera pandemics"]
      : ["deadliest events human history", "war casualties list", "pandemic deaths", "nuclear disasters deaths", "historical death tolls", "wwii deaths", "chernobyl deaths"],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title, description, url: alt.canonical, type: "website",
      locale: isEs ? "es_ES" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default async function EventsLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const meta = BRAND_META[brand];
  const isPA = brand === "plagueatlas";
  const isEs = h.get("x-locale") === "es";
  const base = isEs ? `${meta.url}/es` : meta.url;
  const brandEvents = EVENTS.filter((e) => BRAND_CATEGORIES[brand].includes(e.category))
    .sort((a, b) => b.deathsEstimate - a.deathsEstimate);

  const collectionName = isEs
    ? (isPA ? "Las pandemias y epidemias más mortíferas de la historia" : "Los eventos más mortíferos de la historia")
    : (isPA ? "Deadliest Pandemics & Epidemics in History" : "Deadliest Events in Human History");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "inLanguage": isEs ? "es" : "en",
    "name": collectionName,
    "description": isEs
      ? (isPA
          ? "Archivo interactivo de las pandemias y epidemias más mortíferas de la historia con cifras de muertes, cronologías y mapas."
          : "Archivo interactivo de las pandemias, guerras, eventos nucleares y hambrunas más mortíferos de la historia con cifras de muertes y mapas.")
      : (isPA
          ? "Interactive archive of history's deadliest pandemics and epidemics with death tolls, timelines, and maps."
          : "Interactive archive of history's deadliest pandemics, wars, nuclear events, and famines with death tolls and maps."),
    "url": `${base}/events`,
    "isPartOf": { "@type": "WebSite", "name": meta.name, "url": base },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": collectionName,
    "numberOfItems": brandEvents.length,
    "itemListElement": brandEvents.map((ev, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": isEs ? ev.nameEs : ev.name,
      "url": `${base}/pandemic/${ev.id}`,
      "description": (isEs ? ev.descriptionEs : ev.descriptionEn).slice(0, 150),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isEs ? "Inicio" : "Home", "item": base },
      { "@type": "ListItem", "position": 2, "name": isEs ? "Archivo de eventos" : "Event Archive", "item": `${base}/events` },
    ],
  };

  return (
    <>
      <JsonLd data={[collectionSchema, itemListSchema, breadcrumbSchema]} />
      {children}
    </>
  );
}
