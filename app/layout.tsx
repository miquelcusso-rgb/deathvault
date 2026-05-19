import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { AddToHomeBanner } from "@/components/ui/AddToHomeBanner";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { JsonLd } from "@/components/ui/JsonLd";

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
    authors: [{ name: "Furiosa Studio" }],
    creator: "Furiosa Studio",
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
  const m = BRAND_META[brand];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": m.name,
    "url": m.url,
    "description": m.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${m.url}/events?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": m.name,
    "url": m.url,
    "logo": `${m.url}/opengraph-image`,
    "sameAs": [],
  };

  return (
    <html lang="en" data-brand={brand} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* PWA / Add to Home Screen */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={m.name} />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd data={[websiteSchema, orgSchema]} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6498215334315959"
          crossOrigin="anonymous"
        />
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${brand === "plagueatlas" ? "GTM-5XWCZFN6" : "GTM-PCBW2RMX"}');`,
          }}
        />
        {/* GA4 is managed via GTM — no direct script needed here */}
      </head>
      <body className="min-h-screen bg-void antialiased">
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${brand === "plagueatlas" ? "GTM-5XWCZFN6" : "GTM-PCBW2RMX"}`} height="0" width="0" style={{display:'none',visibility:'hidden'}} />
        </noscript>
        <Providers brand={brand}>
          {children}
          <AddToHomeBanner />
        </Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
