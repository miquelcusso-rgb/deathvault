import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "./providers";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { AddToHomeBanner } from "@/components/ui/AddToHomeBanner";
import { detectBrand, BRAND_META } from "@/lib/brand";
import { JsonLd } from "@/components/ui/JsonLd";

const fontSpace = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});
const fontInter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

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
    alternates: {
      canonical: m.canonical,
      languages: { "en": m.url, "x-default": m.url },
    },
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
    "sameAs": [
      "https://furiosa.studio",
      brand === "plagueatlas"
        ? "https://twitter.com/plagueatlas"
        : "https://twitter.com/deathvaultapp",
    ],
  };

  return (
    <html lang="en" data-brand={brand} suppressHydrationWarning
      className={`${fontSpace.variable} ${fontMono.variable} ${fontInter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* PWA / Add to Home Screen */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={m.name} />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd data={[websiteSchema, orgSchema]} />
        {/* GTM Consent Mode v2 — must run BEFORE GTM loads */}
        <Script
          id="gtm-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500,
              });
              // Restore granted consent if user already accepted
              try {
                var c = localStorage.getItem('cookie_consent');
                if (c === 'accepted') {
                  gtag('consent', 'update', {
                    analytics_storage: 'granted',
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                  });
                }
              } catch(e) {}
            `,
          }}
        />
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${brand === "plagueatlas" ? "GTM-5XWCZFN6" : "GTM-PCBW2RMX"}');`,
          }}
        />
        {/* AdSense — lazyOnload, consent-gated */}
        <Script
          id="adsense"
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6498215334315959"
          crossOrigin="anonymous"
        />
        {/* GA4 is managed via GTM — no direct script needed here */}
      </head>
      <body className="min-h-screen bg-void antialiased">
        {/* Skip-to-content — WCAG 2.4.1 bypass block (Level A) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${brand === "plagueatlas" ? "GTM-5XWCZFN6" : "GTM-PCBW2RMX"}`} height="0" width="0" style={{display:'none',visibility:'hidden'}} />
        </noscript>
        <Providers brand={brand}>
          {children}
          <AddToHomeBanner />
        </Providers>
        <CookieBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}
