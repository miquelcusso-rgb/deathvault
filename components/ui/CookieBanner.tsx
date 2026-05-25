"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { localizedHref } from "@/lib/locale";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const { t, lang } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    // GTM Consent Mode v2 — update to granted
    try {
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    } catch (e) {}
    // Let the consent-gated AdSense loader fire immediately
    try { window.dispatchEvent(new Event("cookie-consent-accepted")); } catch (e) {}
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    // Consent stays denied (default set in layout.tsx)
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 right-4 z-[999] max-w-2xl mx-auto"
        >
          <div className="card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-panel border-border/80">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Cookie className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-400 text-xs leading-relaxed">
                {t("cookie_before")}{" "}
                <strong className="text-slate-300">Google AdSense</strong> {t("cookie_after")}{" "}
                <Link href={localizedHref("/privacy", lang)} className="text-cyan-light hover:underline">
                  {t("footer_privacy")}
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-border/60 text-slate-500 hover:text-slate-300 hover:border-border text-xs font-medium transition-all duration-200 cursor-pointer"
              >
                {t("cookie_decline")}
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none btn-primary text-xs py-1.5 px-4"
              >
                {t("cookie_accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
