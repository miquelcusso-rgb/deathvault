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
  const locale: Lang = h.get("x-locale") === "es" ? "es" : "en";
  const invariantPath = h.get("x-invariant-path") || "/";
  const isEs = locale === "es";
  const alt = buildAlternates(meta.url, invariantPath, locale);

  const title = isEs
    ? `Acerca de ${meta.name} — Mapa interactivo de la historia de las pandemias`
    : `About ${meta.name} — Interactive Pandemic History Map`;
  const description = isEs
    ? `${meta.name} es un proyecto educativo independiente que cartografía los eventos más mortíferos de la historia. Datos procedentes de la OMS, los CDC, el OIEA e investigación revisada por pares.`
    : `${meta.name} is an independent educational project mapping history's deadliest events. Data sourced from WHO, CDC, IAEA, and peer-reviewed research.`;
  const ogTitle = isEs ? `Acerca de ${meta.name}` : `About ${meta.name}`;
  const ogDescription = isEs
    ? `Una visualización de datos educativa e independiente de las pandemias, guerras y eventos nucleares más mortíferos de la historia.`
    : `An independent, educational data visualization of history's deadliest pandemics, wars, and nuclear events.`;

  return {
    title,
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
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": meta.url },
      { "@type": "ListItem", "position": 2, "name": "About", "item": `${meta.url}/about` },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      {children}
    </>
  );
}
