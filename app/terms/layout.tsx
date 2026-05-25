import type { Metadata } from "next";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { buildAlternates } from "@/lib/locale";
import type { Lang } from "@/lib/translations";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const meta = BRAND_META[brand];
  const locale: Lang = h.get("x-locale") === "es" ? "es" : "en";
  const invariantPath = h.get("x-invariant-path") || "/";
  const isEs = locale === "es";
  const alt = buildAlternates(meta.url, invariantPath, locale);

  const title = isEs ? `Términos del servicio | ${meta.name}` : `Terms of Service | ${meta.name}`;
  const description = isEs
    ? `Términos del servicio de ${meta.name}. Solo para uso educativo. Datos procedentes de la OMS, los CDC y fuentes académicas revisadas por pares.`
    : `Terms of service for ${meta.name}. Educational use only. Data sourced from WHO, CDC, and peer-reviewed academic sources.`;
  const ogDescription = isEs
    ? `Términos del servicio de ${meta.name}. Solo para uso educativo.`
    : `Terms of service for ${meta.name}. Educational use only.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: { title, description: ogDescription, url: alt.canonical, locale: isEs ? "es_ES" : "en_US" },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
