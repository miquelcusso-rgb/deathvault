import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { getEventById } from "@/data/events";

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

  const title = `${event.name} — ${deathFormatted} Deaths (${period})`;
  const description = `${event.name}: ${deathFormatted} estimated deaths between ${period}. ${event.descriptionEn.slice(0, 120)}...`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/pandemic/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/pandemic/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
