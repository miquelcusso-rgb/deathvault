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
        ? "Noticias de pandemias y brotes — Actualizaciones en vivo | PlagueAtlas"
        : "Noticias de brotes y desastres — Actualizaciones en vivo | DeathVault")
    : (isPA
        ? "Pandemic & Outbreak News — Live Updates | PlagueAtlas"
        : "Disease Outbreak & Disaster News — Live Updates | DeathVault");

  const description = isEs
    ? (isPA
        ? "Últimas alertas de brotes de pandemias y epidemias — OMS, CDC, ECDC, OPS. Hantavirus, COVID, cólera, malaria y más. Actualizado a diario."
        : "Noticias de última hora sobre pandemias, brotes, guerras y desastres — alertas de OMS, CDC, ECDC. Actualizado a diario con la última inteligencia sanitaria y de crisis global.")
    : (isPA
        ? "Latest pandemic and epidemic outbreak alerts — WHO, CDC, ECDC, PAHO. Hantavirus, COVID, cholera, malaria and more. Updated daily."
        : "Breaking news on pandemics, outbreaks, wars, and disasters — WHO, CDC, ECDC alerts. Updated daily with the latest global health and crisis intelligence.");

  return {
    title: { absolute: title },
    description,
    keywords: isPA
      ? ["pandemic news 2026", "outbreak alerts", "who disease outbreak news", "epidemic updates", "hantavirus 2026", "cholera outbreak", "covid variant 2026"]
      : ["disaster news 2026", "pandemic alerts", "war casualties update", "global crisis news", "who outbreak alerts", "disease surveillance"],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title, description, url: alt.canonical, type: "website",
      locale: isEs ? "es_ES" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default async function NewsLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const meta = BRAND_META[brand];
  const isEs = h.get("x-locale") === "es";
  const base = isEs ? `${meta.url}/es` : meta.url;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "inLanguage": isEs ? "es" : "en",
    "name": isEs ? "Noticias de brotes y pandemias" : "Outbreak & Pandemic News",
    "description": isEs
      ? "Últimas alertas de brotes de enfermedades de la OMS, CDC y ECDC, y actualizaciones de pandemias."
      : "Latest WHO, CDC, ECDC disease outbreak alerts and pandemic updates.",
    "url": `${base}/news`,
    "isPartOf": { "@type": "WebSite", "name": meta.name, "url": base },
    "dateModified": new Date().toISOString().slice(0, 10),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isEs ? "Inicio" : "Home", "item": base },
      { "@type": "ListItem", "position": 2, "name": isEs ? "Noticias" : "News", "item": `${base}/news` },
    ],
  };

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      {children}
    </>
  );
}
