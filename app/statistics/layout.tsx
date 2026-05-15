import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const baseUrl = meta.url;

  return {
    title: `${meta.name} — Historical Death Statistics`,
    description:
      `Data-driven statistics on the deadliest pandemics, wars, and nuclear events on ${meta.name}. Ranked death tolls, category breakdowns, and interactive charts comparing 813M+ deaths across 16 historical events.`,
    alternates: {
      canonical: `${baseUrl}/statistics`,
    },
    openGraph: {
      title: `Historical Death Statistics | ${meta.name}`,
      description:
        "Ranked comparisons of history's deadliest pandemics, wars, and nuclear events. Interactive charts and data visualizations.",
      url: `${baseUrl}/statistics`,
    },
  };
}

export default function StatisticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
