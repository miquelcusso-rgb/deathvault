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
    title: `About ${meta.name} — Interactive Pandemic History Map`,
    description:
      `${meta.name} is an independent educational project mapping history's deadliest events. Data sourced from WHO, CDC, IAEA, and peer-reviewed research.`,
    alternates: {
      canonical: `${baseUrl}/about`,
      languages: { "en": `${baseUrl}/about`, "x-default": `${baseUrl}/about` },
    },
    openGraph: {
      title: `About ${meta.name}`,
      description:
        `An independent, educational data visualization of history's deadliest pandemics, wars, and nuclear events.`,
      url: `${baseUrl}/about`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `About ${meta.name}`,
      description: `An independent, educational data visualization of history's deadliest pandemics, wars, and nuclear events.`,
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
