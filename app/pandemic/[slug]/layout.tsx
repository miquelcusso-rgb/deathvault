import type { Metadata } from "next";
import { getEventById } from "@/data/events";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventById(slug);

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
      canonical: `https://www.plagueatlas.com/pandemic/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.plagueatlas.com/pandemic/${slug}`,
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
