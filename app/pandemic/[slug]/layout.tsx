import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { detectBrand, BRAND_META, BRAND_CATEGORIES } from "@/lib/brand";
import { buildAlternates } from "@/lib/locale";
import type { Lang } from "@/lib/translations";
import { EVENTS, getEventById } from "@/data/events";
import { JsonLd } from "@/components/ui/JsonLd";

// Pre-render all event pages at build time (ISR: revalidate every hour)
// Both brands share the same build — brand filtering happens at request time below
export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.id }));
}
export const revalidate = 3600;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventById(slug);

  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const meta = BRAND_META[brand];
  const locale: Lang = h.get("x-locale") === "es" ? "es" : "en";
  const invariantPath = h.get("x-invariant-path") || `/pandemic/${slug}`;
  const isEs = locale === "es";
  const alt = buildAlternates(meta.url, invariantPath, locale);

  if (!event) {
    return { title: isEs ? "Evento no encontrado" : "Event Not Found" };
  }

  const evName = isEs ? event.nameEs : event.name;
  const evDesc = isEs ? event.descriptionEs : event.descriptionEn;

  const deathFormatted =
    event.deathsEstimate >= 1_000_000
      ? `${(event.deathsEstimate / 1_000_000).toFixed(0)}M`
      : `${(event.deathsEstimate / 1_000).toFixed(0)}K`;

  const period = event.endYear
    ? `${event.startYear}–${event.endYear}`
    : `${event.startYear}–${isEs ? "actualidad" : "present"}`;

  // Keyword-rich title: "Black Death — 120M Deaths (1347–1353)"
  const title = isEs
    ? `${evName} — ${deathFormatted} muertes (${period})`
    : `${evName} — ${deathFormatted} Deaths (${period})`;

  // Full description: max ~160 chars for SERP snippet
  const descBase = isEs
    ? `${evName}: ${deathFormatted} muertes estimadas (${period}). ${evDesc.slice(0, 100)}`
    : `${evName}: ${deathFormatted} estimated deaths (${period}). ${evDesc.slice(0, 100)}`;
  const description = descBase.length > 158 ? descBase.slice(0, 155) + "…" : descBase;

  return {
    title: { absolute: title },
    description,
    keywords: [
      evName,
      `${evName} ${isEs ? "muertes" : "deaths"}`,
      `${evName} ${isEs ? "número de muertes" : "death toll"}`,
      `${evName} ${isEs ? "historia" : "history"}`,
      ...(event.pathogen ? [event.pathogen] : []),
      ...event.tags,
      `${event.startYear} ${evName.toLowerCase()}`,
      meta.name,
    ],
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      title,
      description,
      url: alt.canonical,
      type: "article",
      locale: isEs ? "es_ES" : "en_US",
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

  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const meta = BRAND_META[brand];
  const baseUrl = meta.url;
  const locale: Lang = h.get("x-locale") === "es" ? "es" : "en";
  const isEs = locale === "es";
  const pageUrl = isEs ? `${baseUrl}/es/pandemic/${slug}` : `${baseUrl}/pandemic/${slug}`;

  // Brand guard: PlagueAtlas only shows pandemics; DeathVault shows all categories
  const allowedCats = BRAND_CATEGORIES[brand];
  if (!event || !allowedCats.includes(event.category)) notFound();

  const evName = isEs ? event.nameEs : event.name;
  const evDesc = isEs ? event.descriptionEs : event.descriptionEn;

  const deathFormatted =
    event.deathsEstimate >= 1_000_000
      ? `${(event.deathsEstimate / 1_000_000).toFixed(0)}M`
      : `${(event.deathsEstimate / 1_000).toFixed(0)}K`;

  const period = event.endYear
    ? `${event.startYear}–${event.endYear}`
    : `${event.startYear}–${isEs ? "actualidad" : "present"}`;

  const pageTitle = isEs
    ? `${evName} — ${deathFormatted} muertes (${period})`
    : `${evName} — ${deathFormatted} Deaths (${period})`;

  // ── JSON-LD schemas ────────────────────────────────────────────────────────

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": evDesc,
    "inLanguage": isEs ? "es" : "en",
    "url": pageUrl,
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
      "name": evName,
      "description": evDesc,
    },
    "keywords": [...event.tags, evName, ...(event.pathogen ? [event.pathogen] : [])].join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isEs ? "Inicio" : "Home",
        "item": isEs ? `${baseUrl}/es` : baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isEs ? "Archivo de eventos" : "Event Archive",
        "item": isEs ? `${baseUrl}/es/events` : `${baseUrl}/events`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": evName,
        "item": pageUrl,
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
    "inLanguage": isEs ? "es" : "en",
    "name": isEs ? `${evName} — Datos del número de muertes` : `${evName} — Historical Death Toll Data`,
    "description": isEs
      ? `Estimaciones del número de muertes, cronología y propagación geográfica de ${evName} (${period}). Fuente: OMS, CDC, investigación académica.`
      : `Death toll estimates, timeline, and geographic spread data for ${evName} (${period}). Source: WHO, CDC, academic research.`,
    "url": pageUrl,
    "creator": {
      "@type": "Organization",
      "name": meta.name,
    },
    "variableMeasured": "Deaths",
    "measurementTechnique": "Epidemiological estimates from WHO, CDC, and peer-reviewed sources",
    "temporalCoverage": period,
    "spatialCoverage": event.originCountry,
    "license": "https://creativecommons.org/licenses/by/4.0/",
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema, datasetSchema, ...(faqSchema ? [faqSchema] : [])]} />
      {children}
    </>
  );
}
