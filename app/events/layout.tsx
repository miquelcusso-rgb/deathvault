import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META, BRAND_CATEGORIES } from "@/lib/brand";
import { EVENTS } from "@/data/events";
import { JsonLd } from "@/components/ui/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const isPA = brand === "plagueatlas";

  const title = isPA
    ? "Deadliest Pandemics & Epidemics in History — Event Archive | PlagueAtlas"
    : "Deadliest Events in Human History — Pandemics, Wars & Disasters | DeathVault";

  const description = isPA
    ? "Full archive of history's deadliest pandemics and epidemics — Black Death, Spanish Flu, HIV/AIDS, COVID-19 and more. Interactive death tolls, timelines and maps."
    : "Complete archive of history's deadliest events — pandemics, world wars, nuclear disasters and famines. 813M+ deaths documented across 16 events with interactive visualisations.";

  return {
    title,
    description,
    keywords: isPA
      ? ["deadliest pandemics history", "list of pandemics", "pandemic death tolls", "epidemic history", "black death", "spanish flu", "cholera pandemics"]
      : ["deadliest events human history", "war casualties list", "pandemic deaths", "nuclear disasters deaths", "historical death tolls", "wwii deaths", "chernobyl deaths"],
    alternates: { canonical: `${meta.url}/events` },
    openGraph: {
      title,
      description,
      url: `${meta.url}/events`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function EventsLayout({ children }: { children: React.ReactNode }) {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const isPA = brand === "plagueatlas";
  const brandEvents = EVENTS.filter((e) => BRAND_CATEGORIES[brand].includes(e.category))
    .sort((a, b) => b.deathsEstimate - a.deathsEstimate);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": isPA ? "Deadliest Pandemics & Epidemics in History" : "Deadliest Events in Human History",
    "description": isPA
      ? "Interactive archive of history's deadliest pandemics and epidemics with death tolls, timelines, and maps."
      : "Interactive archive of history's deadliest pandemics, wars, nuclear events, and famines with death tolls and maps.",
    "url": `${meta.url}/events`,
    "isPartOf": { "@type": "WebSite", "name": meta.name, "url": meta.url },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": isPA ? "Deadliest Pandemics in History" : "Deadliest Events in Human History",
    "numberOfItems": brandEvents.length,
    "itemListElement": brandEvents.slice(0, 20).map((ev, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": ev.name,
      "url": `${meta.url}/pandemic/${ev.id}`,
      "description": ev.descriptionEn.slice(0, 150),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": meta.url },
      { "@type": "ListItem", "position": 2, "name": "Event Archive", "item": `${meta.url}/events` },
    ],
  };

  return (
    <>
      <JsonLd data={[collectionSchema, itemListSchema, breadcrumbSchema]} />
      {children}
    </>
  );
}
