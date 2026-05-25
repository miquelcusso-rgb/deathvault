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
    ? (isPA
        ? `Acerca de ${meta.name} — Mapa interactivo de la historia de las pandemias`
        : `Acerca de ${meta.name} — Archivo interactivo de los eventos más mortíferos`)
    : (isPA
        ? `About ${meta.name} — Interactive Pandemic History Map`
        : `About ${meta.name} — Interactive Archive of History's Deadliest Events`);
  const description = isEs
    ? (isPA
        ? `${meta.name} es un proyecto educativo independiente que cartografía las pandemias y epidemias más mortíferas de la historia. Datos procedentes de la OMS, los CDC e investigación revisada por pares.`
        : `${meta.name} es un proyecto educativo independiente que cartografía los eventos más mortíferos de la historia. Datos procedentes de la OMS, los CDC, el OIEA e investigación revisada por pares.`)
    : (isPA
        ? `${meta.name} is an independent educational project mapping history's deadliest pandemics and epidemics. Data sourced from WHO, CDC, and peer-reviewed research.`
        : `${meta.name} is an independent educational project mapping history's deadliest events. Data sourced from WHO, CDC, IAEA, and peer-reviewed research.`);
  const ogTitle = isEs ? `Acerca de ${meta.name}` : `About ${meta.name}`;
  const ogDescription = isEs
    ? (isPA
        ? `Una visualización de datos educativa e independiente de las pandemias y epidemias más mortíferas de la historia.`
        : `Una visualización de datos educativa e independiente de las pandemias, guerras y eventos nucleares más mortíferos de la historia.`)
    : (isPA
        ? `An independent, educational data visualization of history's deadliest pandemics and epidemics.`
        : `An independent, educational data visualization of history's deadliest pandemics, wars, and nuclear events.`);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: alt.canonical,
      locale: isEs ? "es_ES" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function AboutLayout({ children }: { children: React.ReactNode }) {
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
      { "@type": "ListItem", "position": 2, "name": isEs ? "Acerca de" : "About", "item": `${base}/about` },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      {children}
    </>
  );
}
