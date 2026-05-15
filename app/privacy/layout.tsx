import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const meta = BRAND_META[brand];
  const baseUrl = meta.url;

  return {
    title: `Privacy Policy | ${meta.name}`,
    description: `Privacy policy for ${meta.name}. Learn how we handle cookies, analytics, and advertising data.`,
    alternates: { canonical: `${baseUrl}/privacy` },
    openGraph: {
      title: `Privacy Policy | ${meta.name}`,
      description: `Privacy policy for ${meta.name}. Learn how we handle cookies, analytics, and advertising data.`,
      url: `${baseUrl}/privacy`,
    },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
