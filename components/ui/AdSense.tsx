"use client";
import { useEffect } from "react";

/**
 * Consent-gated AdSense loader.
 *
 * The adsbygoogle.js script is NOT loaded until the visitor has accepted
 * cookies (localStorage `cookie_consent === "accepted"`). This guarantees no
 * ad request — personalized or otherwise — fires before consent, on top of the
 * Consent Mode v2 default-denied signal already set in the document <head>.
 *
 * It reacts immediately when the user accepts in the same session (the
 * CookieBanner dispatches a `cookie-consent-accepted` event), and also loads on
 * mount for returning visitors who accepted previously.
 */
const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6498215334315959";

export function AdSense() {
  useEffect(() => {
    let injected = false;

    const load = () => {
      if (injected) return;
      try {
        if (localStorage.getItem("cookie_consent") !== "accepted") return;
      } catch {
        return;
      }
      if (document.querySelector('script[data-adsense="1"]')) {
        injected = true;
        return;
      }
      const s = document.createElement("script");
      s.src = ADSENSE_SRC;
      s.async = true;
      s.crossOrigin = "anonymous";
      s.dataset.adsense = "1";
      document.head.appendChild(s);
      injected = true;
    };

    load(); // returning visitors who already consented
    window.addEventListener("cookie-consent-accepted", load);
    return () => window.removeEventListener("cookie-consent-accepted", load);
  }, []);

  return null;
}
