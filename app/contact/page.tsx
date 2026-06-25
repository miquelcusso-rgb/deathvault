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

export default function ContactPage() {
  const { t, lang } = useI18n();
  const brand = useBrand();
  const meta = BRAND_META[brand];
  const email = brand === "deathvault" ? "hello@deathvault.app" : "hello@plagueatlas.com";

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("contact_title")}</h1>
          <p className="text-slate-500 text-sm mb-8 max-w-xl">{meta.name} {t("contact_intro")}</p>

          <Section title={t("contact_email_title")}>
            <p>{t("contact_email_p")}</p>
            <p className="mt-2">
              <a href={`mailto:${email}`} className="text-cyan-light font-mono text-base hover:underline">{email}</a>
            </p>
          </Section>

          <Section title={t("contact_topics_title")}>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-slate-300">{t("contact_topics_li1_strong")}</strong> {t("contact_topics_li1_text")}</li>
              <li><strong className="text-slate-300">{t("contact_topics_li2_strong")}</strong> {t("contact_topics_li2_text")}</li>
              <li><strong className="text-slate-300">{t("contact_topics_li3_strong")}</strong> {t("contact_topics_li3_text")}</li>
            </ul>
          </Section>

          <Section title={t("contact_response_title")}>
            <p>{t("contact_response_p")}</p>
          </Section>

          <Section title={t("contact_about_title")}>
            <p>
              {t("contact_about_p_before")}{" "}
              <Link href={localizedHref("/about", lang)} className="text-cyan-light hover:underline">{t("contact_about_link")}</Link>{" "}
              {t("contact_about_p_after")}
            </p>
            <p className="mt-2 text-slate-500">
              {meta.name} {t("contact_publisher")} <a href="https://furiosa.studio" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:underline">Furiosa Studio</a>.
            </p>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
