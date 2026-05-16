import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
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

  return (
    <html lang="en" data-brand={brand} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PCBW2RMX');`,
          }}
        />
        <Script
          id="ga4"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var gid=location.hostname.includes('plagueatlas')?'G-2YG6S6XX2K':'G-K1PQJCJHF8';
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());gtag('config',gid);
            `,
          }}
        />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-K1PQJCJHF8" />
      </head>
      <body className="min-h-screen bg-void antialiased">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PCBW2RMX" height="0" width="0" style={{display:'none',visibility:'hidden'}} />
        </noscript>
        <Providers brand={brand}>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
