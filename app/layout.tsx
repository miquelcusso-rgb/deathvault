import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("host") ?? "";
  const brand = detectBrand(host);
  const m = BRAND_META[brand];

  return {
    metadataBase: new URL(m.url),
    title: { default: `${m.name} — ${m.headline}`, template: `%s | ${m.name}` },
    description: m.description,
    keywords: [...m.keywords],
    authors: [{ name: m.name }],
    creator: m.name,
    publisher: m.name,
    alternates: { canonical: m.canonical },
    openGraph: {
      title: `${m.name} — ${m.headline}`,
      description: m.description,
      type: "website",
      url: m.url,
      siteName: m.name,
      locale: "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${m.name} — ${m.headline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${m.name} — ${m.headline}`,
      description: m.description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const host = h.get("host") ?? "";
  const brand = detectBrand(host);

  return (
    <html lang="en" data-brand={brand} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6498215334315959"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-void antialiased">
        <Providers brand={brand}>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
