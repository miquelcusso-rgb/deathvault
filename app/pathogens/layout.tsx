import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { JsonLd } from "@/components/ui/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const m = BRAND_META[brand];

  const title = `Deadliest Pathogens — Viruses, Bacteria & Parasites Explained | ${m.name}`;
  const description =
    "How deadly is Ebola vs COVID-19? Explore the biology, lethality, and transmission of history's most dangerous pathogens — viruses, bacteria, parasites, prions, and fungi — with interactive threat profiles.";

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
    alternates: {
      canonical: `${m.url}/pathogens`,
      languages: { "en": `${m.url}/pathogens`, "x-default": `${m.url}/pathogens` },
    },
    openGraph: {
      title, description, url: `${m.url}/pathogens`, type: "website",
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
