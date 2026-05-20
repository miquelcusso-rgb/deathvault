import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { JsonLd } from "@/components/ui/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const baseUrl = meta.url;

  return {
    title: `${meta.name} — Compare History's Deadliest Events`,
    description:
      `Compare any two historical events side by side on ${meta.name}. Deaths, timelines, and geographic spread — Black Death vs WWII, Spanish Flu vs COVID-19, and more.`,
    alternates: {
      canonical: `${baseUrl}/compare`,
      languages: { "en": `${baseUrl}/compare`, "x-default": `${baseUrl}/compare` },
    },
    openGraph: {
      title: `Compare Historical Events | ${meta.name}`,
      description:
        "Side-by-side comparison of pandemics, wars, and nuclear events. Death tolls, timelines, and geographic impact.",
      url: `${baseUrl}/compare`,
      images: [{ url: "/compare/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Compare Historical Events | ${meta.name}`,
      description: "Side-by-side comparison of pandemics, wars, and nuclear events.",
      images: ["/compare/opengraph-image"],
    },
  };
}

export default async function CompareLayout({ children }: { children: React.ReactNode }) {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": meta.url },
      { "@type": "ListItem", "position": 2, "name": "Compare Events", "item": `${meta.url}/compare` },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />
      {children}
    </>
  );
}
