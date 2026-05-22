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

  const title = isEs ? `Apoya a ${meta.name} — Mantenlo gratis` : `Support ${meta.name} — Keep it Free`;
  const description = isEs
    ? `Ayuda a mantener ${meta.name} gratis y actualizado. Tu apoyo cubre los costes de servidor, la investigación de datos y nuevas funciones.`
    : `Help keep ${meta.name} free and up to date. Your support covers server costs, data research, and new features.`;
  const ogTitle = isEs ? `Apoya a ${meta.name}` : `Support ${meta.name}`;
  const ogDescription = isEs
    ? `Ayuda a mantener ${meta.name} gratis y actualizado. Cubre los costes de servidor y la investigación de datos continua.`
    : `Help keep ${meta.name} free and up to date. Cover server costs and ongoing data research.`;

  return {
    title,
    description,
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: { title: ogTitle, description: ogDescription, url: alt.canonical, locale: isEs ? "es_ES" : "en_US" },
  };
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
