"use client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useBrand } from "@/app/providers";
import { BRAND_META } from "@/lib/brand";
import { localizedHref } from "@/lib/locale";
import { motion } from "framer-motion";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6 mb-4">
      <h2 className="font-display font-bold text-white text-lg mb-3">{title}</h2>
      <div className="text-slate-400 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function CookiesPage() {
  const { t, lang } = useI18n();
  const brand = useBrand();
  const meta = BRAND_META[brand];

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("cookies_title")}</h1>
          <p className="text-slate-600 text-xs font-mono mb-8">{t("cookies_last_updated")} {meta.name}</p>

          <Section title={t("cookies_what_title")}>
            <p>{t("cookies_what_p")}</p>
            <p>{meta.name} {t("cookies_intro")}</p>
          </Section>

          <Section title={t("cookies_types_title")}>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-slate-300">{t("cookies_essential_strong")}</strong> {t("cookies_essential_text")}</li>
              <li><strong className="text-slate-300">{t("cookies_analytics_strong")}</strong> {t("cookies_analytics_text")}</li>
              <li><strong className="text-slate-300">{t("cookies_ads_strong")}</strong> {t("cookies_ads_text_before")} <code className="text-xs bg-black/30 px-1 rounded">DSID</code>, <code className="text-xs bg-black/30 px-1 rounded">IDE</code>{t("cookies_ads_text_after")}</li>
            </ul>
          </Section>

          <Section title={t("cookies_consent_title")}>
            <p>{t("cookies_consent_p")}</p>
          </Section>

          <Section title={t("cookies_manage_title")}>
            <p>{t("cookies_manage_p1")}</p>
            <p className="mt-2">
              {t("cookies_manage_p2_before")}{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">google.com/settings/ads</a>{" "}
              {t("cookies_manage_p2_mid")}{" "}
              <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">youronlinechoices.com</a>.
            </p>
          </Section>

          <Section title={t("cookies_more_title")}>
            <p>
              {t("cookies_more_p_before")}{" "}
              <Link href={localizedHref("/privacy", lang)} className="text-cyan-light hover:underline">{t("cookies_more_link")}</Link>.
            </p>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
