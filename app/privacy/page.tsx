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

export default function PrivacyPage() {
  const { t } = useI18n();
  const brand = useBrand();
  const meta = BRAND_META[brand];

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("privacy_title")}</h1>
          <p className="text-slate-600 text-xs font-mono mb-8">{t("privacy_last_updated")} {meta.name}</p>

          <Section title={t("privacy_s1_title")}>
            <p>{meta.name} {t("privacy_s1_p1_a")}</p>
            <p>{t("privacy_s1_p2")}</p>
          </Section>

          <Section title={t("privacy_s2_title")}>
            <p>{t("privacy_s2_p1")}</p>
            <p>{t("privacy_s2_p2_before")} <strong className="text-slate-300">Google AdSense</strong> {t("privacy_s2_p2_after")}</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>{t("privacy_s2_li1_before")} <code className="text-xs bg-black/30 px-1 rounded">DSID</code>, <code className="text-xs bg-black/30 px-1 rounded">IDE</code>{t("privacy_s2_li1_after")}</li>
              <li>{t("privacy_s2_li2")}</li>
              <li>{t("privacy_s2_li3")}</li>
            </ul>
            <p className="mt-2">{t("privacy_s2_p3_a")} <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">google.com/settings/ads</a> {t("privacy_s2_p3_b")} <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">youronlinechoices.com</a>. {t("privacy_s2_p3_c")} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">policies.google.com/privacy</a>.</p>
          </Section>

          <Section title={t("privacy_s3_title")}>
            <p>{t("privacy_s3_p1_before")} <code className="text-xs bg-black/30 px-1 rounded">cdn.jsdelivr.net</code>{t("privacy_s3_p1_after")}</p>
            <p>{t("privacy_s3_p2")}</p>
            <p>{t("privacy_s3_p3")}</p>
          </Section>

          <Section title={t("privacy_s4_title")}>
            <p>{t("privacy_s4_p1")}</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-slate-300">{t("privacy_s4_li1_strong")}</strong> {t("privacy_s4_li1_text")}</li>
              <li><strong className="text-slate-300">{t("privacy_s4_li2_strong")}</strong> {t("privacy_s4_li2_text")}</li>
              <li><strong className="text-slate-300">{t("privacy_s4_li3_strong")}</strong> {t("privacy_s4_li3_text")}</li>
              <li><strong className="text-slate-300">{t("privacy_s4_li4_strong")}</strong> {t("privacy_s4_li4_text")}</li>
            </ul>
            <p className="mt-2">{t("privacy_s4_p2_before")} {meta.name} {t("privacy_s4_p2_after")}</p>
          </Section>

          <Section title={t("privacy_s5_title")}>
            <p>{t("privacy_s5_p1")}</p>
          </Section>

          <Section title={t("privacy_s6_title")}>
            <p>{t("privacy_s6_p1_before")} <strong className="text-slate-300">{t("privacy_s6_p1_strong")}</strong> {t("privacy_s6_p1_after")}</p>
            <p>{t("privacy_s6_p2_before")} <strong className="text-slate-300">{t("privacy_s6_p2_strong")}</strong> {t("privacy_s6_p2_after")}</p>
          </Section>

          <Section title={t("privacy_s7_title")}>
            <p>{t("privacy_s7_p1")} <a href={`mailto:${brand === "deathvault" ? "hello@deathvault.app" : "hello@plagueatlas.com"}`} className="text-cyan-light font-mono hover:underline">{brand === "deathvault" ? "hello@deathvault.app" : "hello@plagueatlas.com"}</a></p>
            <p>{t("privacy_s7_p2_before")} <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">AEPD (aepd.es)</a>.</p>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
