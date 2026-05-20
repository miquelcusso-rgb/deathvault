import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { EVENTS, getEventById } from "@/data/events";
import { JsonLd } from "@/components/ui/JsonLd";

// Pre-render all 36 event pages at build time (ISR: revalidate every hour)
export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.id }));
}
export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventById(slug);

  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const baseUrl = meta.url;

  if (!event) {
    return { title: "Event Not Found" };
  }

  const deathFormatted =
    event.deathsEstimate >= 1_000_000
      ? `${(event.deathsEstimate / 1_000_000).toFixed(0)}M`
      : `${(event.deathsEstimate / 1_000).toFixed(0)}K`;

  const period = event.endYear
    ? `${event.startYear}–${event.endYear}`
    : `${event.startYear}–present`;

  // Keyword-rich title: "Black Death — 120M Deaths (1347–1353) | PlagueAtlas"
  const title = `${event.name} — ${deathFormatted} Deaths (${period})`;

  // Full description: max 160 chars for SERP snippet
  const descBase = `${event.name}: ${deathFormatted} estimated deaths (${period}). ${event.descriptionEn.slice(0, 100)}`;
  const description = descBase.length > 158 ? descBase.slice(0, 155) + "…" : descBase;

  return {
    title,
    description,
    keywords: [
      event.name,
      `${event.name} deaths`,
      `${event.name} death toll`,
      `${event.name} history`,
      ...(event.pathogen ? [event.pathogen] : []),
      ...event.tags,
      `${event.startYear} ${event.name.toLowerCase()}`,
      meta.name,
    ],
    alternates: {
      canonical: `${baseUrl}/pandemic/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/pandemic/${slug}`,
      type: "article",
      images: [{ url: `/pandemic/${slug}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/pandemic/${slug}/opengraph-image`],
    },
  };
}

export default async function EventLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventById(slug);

  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const baseUrl = meta.url;

  if (!event) return <>{children}</>;

  const deathFormatted =
    event.deathsEstimate >= 1_000_000
      ? `${(event.deathsEstimate / 1_000_000).toFixed(0)}M`
      : `${(event.deathsEstimate / 1_000).toFixed(0)}K`;

  const period = event.endYear
    ? `${event.startYear}–${event.endYear}`
    : `${event.startYear}–present`;

  const pageTitle = `${event.name} — ${deathFormatted} Deaths (${period})`;

  // ── JSON-LD schemas ────────────────────────────────────────────────────────

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": event.descriptionEn,
    "url": `${baseUrl}/pandemic/${slug}`,
    "datePublished": "2025-01-01",  // date this site/content was first published
    "dateModified": "2026-05-20",   // date content was last updated

    "author": {
      "@type": "Organization",
      "name": meta.name,
      "url": baseUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": meta.name,
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/opengraph-image`,
      },
    },
    "image": `${baseUrl}/pandemic/${slug}/opengraph-image`,
    "about": {
      "@type": "Thing",
      "name": event.name,
      "description": event.descriptionEn,
    },
    "keywords": [...event.tags, event.name, ...(event.pathogen ? [event.pathogen] : [])].join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Event Archive",
        "item": `${baseUrl}/events`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": event.name,
        "item": `${baseUrl}/pandemic/${slug}`,
      },
    ],
  };

  // FAQPage schema — enables Google featured snippets / People Also Ask
  const faqSchema = event.faqs && event.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": event.faqs.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": a,
          },
        })),
      }
    : null;

  // Dataset schema — communicates that this is structured data about a historical event
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${event.name} — Historical Death Toll Data`,
    "description": `Death toll estimates, timeline, and geographic spread data for ${event.name} (${period}). Source: WHO, CDC, academic research.`,
    "url": `${baseUrl}/pandemic/${slug}`,
    "creator": {
      "@type": "Organization",
      "name": meta.name,
    },
    "variableMeasured": "Deaths",
    "measurementTechnique": "Epidemiological estimates from WHO, CDC, and peer-reviewed sources",
    "temporalCoverage": period,
    "spatialCoverage": event.originCountry,
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema, datasetSchema, ...(faqSchema ? [faqSchema] : [])]} />
      {children}
    </>
  );
}
