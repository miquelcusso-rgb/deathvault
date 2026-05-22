import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { buildAlternates } from "@/lib/locale";
import type { Lang } from "@/lib/translations";
import { JsonLd } from "@/components/ui/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const locale: Lang = h.get("x-locale") === "es" ? "es" : "en";
  const invariantPath = h.get("x-invariant-path") || "/";
  const isEs = locale === "es";
  const alt = buildAlternates(m.url, invariantPath, locale);

  const title = isEs
    ? `Los patógenos más mortíferos — Virus, bacterias y parásitos explicados | ${m.name}`
    : `Deadliest Pathogens — Viruses, Bacteria & Parasites Explained | ${m.name}`;
  const description = isEs
    ? "¿Qué es más letal, el Ébola o el COVID-19? Explora la biología, letalidad y transmisión de los patógenos más peligrosos de la historia — virus, bacterias, parásitos, priones y hongos — con perfiles de amenaza interactivos."
    : "How deadly is Ebola vs COVID-19? Explore the biology, lethality, and transmission of history's most dangerous pathogens — viruses, bacteria, parasites, prions, and fungi — with interactive threat profiles.";

  return {
    title,
    description,
    keywords: [
      "deadliest pathogens in history",
      "most dangerous viruses",
      "ebola vs covid lethality",
      "hantavirus biology",
      "black death bacterium",
      "how does malaria spread",
      "pathogen threat levels",
      "infectious disease biology",
      "virus vs bacteria vs parasite",
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title, description, url: alt.canonical, type: "website",
      locale: isEs ? "es_ES" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default async function PathogensLayout({ children }: { children: React.ReactNode }) {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const m = BRAND_META[brand];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Pathogen Archive — Viruses, Bacteria & Parasites",
    "description": "Interactive archive of the world's deadliest pathogens with biology, transmission, and lethality data.",
    "url": `${m.url}/pathogens`,
    "isPartOf": { "@type": "WebSite", "name": m.name, "url": m.url },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": m.url },
      { "@type": "ListItem", "position": 2, "name": "Pathogens", "item": `${m.url}/pathogens` },
    ],
  };

  return (
    <>
      <JsonLd data={[schema, breadcrumb]} />
      {children}
    </>
  );
}
