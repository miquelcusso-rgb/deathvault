"use client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useI18n } from "@/lib/i18n";
import { useBrand } from "@/app/providers";
import { BRAND_META } from "@/lib/brand";
import { motion } from "framer-motion";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6 mb-4">
      <h2 className="font-display font-bold text-white text-lg mb-3">{title}</h2>
      <div className="text-slate-400 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  const { t } = useI18n();
  const brand = useBrand();
  const meta = BRAND_META[brand];

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("terms_title")}</h1>
          <p className="text-slate-600 text-xs font-mono mb-8">{t("terms_last_updated")} {meta.name}</p>

          <Section title={t("terms_s1_title")}>
            <p>{t("terms_s1_p1_before")} {meta.name}{t("terms_s1_p1_after")}</p>
          </Section>

          <Section title={t("terms_s2_title")}>
            <p>{meta.name} {t("terms_s2_p1_a")}</p>
          </Section>

          <Section title={t("terms_s3_title")}>
            <p>{t("terms_s3_p1_before")} {meta.name} {t("terms_s3_p1_after")}</p>
          </Section>

          <Section title={t("terms_s4_title")}>
            <p>{t("terms_s4_p1")}</p>
            <p>{t("terms_s4_p2")}</p>
          </Section>

          <Section title={t("terms_s5_title")}>
            <p>{t("terms_s5_p1_before")} {meta.name} {t("terms_s5_p1_after")}</p>
            <p>{t("terms_s5_p2_before")} {meta.name}{t("terms_s5_p2_after")}</p>
          </Section>

          <Section title={t("terms_s6_title")}>
            <p>{meta.name} {t("terms_s6_p1_before")}</p>
          </Section>

          <Section title={t("terms_s7_title")}>
            <p>{t("terms_s7_p1")}</p>
          </Section>

          <Section title={t("terms_s8_title")}>
            <p>{t("terms_s8_p1_before")} {meta.name} {t("terms_s8_p1_after")}</p>
          </Section>

          <Section title={t("terms_s9_title")}>
            <p>{t("terms_s9_p1")}</p>
          </Section>

          <Section title={t("terms_s10_title")}>
            <p>{t("terms_s10_p1")} <a href={`mailto:${brand === "deathvault" ? "hello@deathvault.app" : "hello@plagueatlas.com"}`} className="text-cyan-light font-mono hover:underline">{brand === "deathvault" ? "hello@deathvault.app" : "hello@plagueatlas.com"}</a></p>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
