import { NextResponse, type NextRequest } from "next/server";

// English is served at the root (no prefix) to preserve existing indexed URLs.
// Spanish lives under /es/* and is internally rewritten to the same route tree,
// with the locale carried forward via request headers so RSC can read it.
const PREFIXED_LOCALES = ["es"] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  let locale: "en" | "es" = "en";
  let invariantPath = pathname;

  if ((PREFIXED_LOCALES as readonly string[]).includes(maybeLocale)) {
    locale = maybeLocale as "es";
    invariantPath = "/" + segments.slice(2).join("/");
  }
  if (invariantPath === "" ) invariantPath = "/";

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-invariant-path", invariantPath);

  if (locale === "en") {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Strip the /es prefix internally; the browser URL stays /es/... (rewrite, not redirect)
  const url = req.nextUrl.clone();
  url.pathname = invariantPath;
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  // Run on everything except Next internals, API routes, and files with an
  // extension (sitemap.xml, robots.txt, manifest.json, favicon.ico, images…).
  matcher: ["/((?!api/|_next/|.*\\..*).*)"],
};
