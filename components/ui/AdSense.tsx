"use client";

/**
 * AdSense loading moved to the document <head> (see layout.tsx) as an
 * always-present next/script, so Google can reliably detect and verify the ad
 * code. Privacy is handled by Consent Mode v2 (default-denied in <head>):
 * ad_storage stays denied until the visitor accepts, so no personalized ads
 * fire pre-consent — Google's recommended pattern. Kept as a no-op so existing
 * import sites don't break.
 */
export function AdSense() {
  return null;
}
