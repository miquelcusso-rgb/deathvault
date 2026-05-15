import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

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
    },
    openGraph: {
      title: `About ${meta.name}`,
      description:
        `An independent, educational data visualization of history's deadliest pandemics, wars, and nuclear events.`,
      url: `${baseUrl}/about`,
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
