import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { JsonLd } from "@/components/ui/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const isPA = brand === "plagueatlas";

  const title = isPA
    ? "Pandemic & Outbreak News — Live Updates | PlagueAtlas"
    : "Disease Outbreak & Disaster News — Live Updates | DeathVault";

  const description = isPA
    ? "Latest pandemic and epidemic outbreak alerts — WHO, CDC, ECDC, PAHO. Hantavirus, COVID, cholera, malaria and more. Updated daily."
    : "Breaking news on pandemics, outbreaks, wars, and disasters — WHO, CDC, ECDC alerts. Updated daily with the latest global health and crisis intelligence.";

  return {
    title,
    description,
    keywords: isPA
      ? ["pandemic news 2026", "outbreak alerts", "who disease outbreak news", "epidemic updates", "hantavirus 2026", "cholera outbreak", "covid variant 2026"]
      : ["disaster news 2026", "pandemic alerts", "war casualties update", "global crisis news", "who outbreak alerts", "disease surveillance"],
    alternates: {
      canonical: `${meta.url}/news`,
      languages: { "en": `${meta.url}/news`, "x-default": `${meta.url}/news` },
    },
    openGraph: {
      title, description, url: `${meta.url}/news`, type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default async function NewsLayout({ children }: { children: React.ReactNode }) {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Outbreak & Pandemic News",
    "description": "Latest WHO, CDC, ECDC disease outbreak alerts and pandemic updates.",
    "url": `${meta.url}/news`,
    "isPartOf": { "@type": "WebSite", "name": meta.name, "url": meta.url },
    "dateModified": new Date().toISOString().slice(0, 10),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": meta.url },
      { "@type": "ListItem", "position": 2, "name": "News", "item": `${meta.url}/news` },
    ],
  };

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      {children}
    </>
  );
}
