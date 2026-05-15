import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const baseUrl = meta.url;

  return {
    title: `Support ${meta.name} — Keep it Free`,
    description: `Help keep ${meta.name} free and up to date. Your support covers server costs, data research, and new features.`,
    alternates: { canonical: `${baseUrl}/support` },
    openGraph: {
      title: `Support ${meta.name}`,
      description: `Help keep ${meta.name} free and up to date. Cover server costs and ongoing data research.`,
      url: `${baseUrl}/support`,
    },
  };
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
