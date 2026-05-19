import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const baseUrl = meta.url;

  return {
    title: `Terms of Service | ${meta.name}`,
    description: `Terms of service for ${meta.name}. Educational use only. Data sourced from WHO, CDC, and peer-reviewed academic sources.`,
    alternates: { canonical: `${baseUrl}/terms` },
    openGraph: {
      title: `Terms of Service | ${meta.name}`,
      description: `Terms of service for ${meta.name}. Educational use only.`,
      url: `${baseUrl}/terms`,
    },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
