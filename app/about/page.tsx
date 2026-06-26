"use client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useBrand } from "@/app/providers";
import { BRAND_META } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";
import { localizedHref } from "@/lib/locale";
import { motion } from "framer-motion";
import { Activity, Database, Globe, Shield, Scale, BookOpen, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { t, lang } = useI18n();
  const brand = useBrand();
  const meta = BRAND_META[brand];
  const isDV = brand === "deathvault";

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("about_title")} {meta.name}</h1>

          <div className="space-y-6 mt-8">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-5 h-5 text-crimson-light" />
                <h2 className="font-display font-bold text-white text-lg">{t("about_what_is")} {meta.name}?</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                {isDV ? t("about_desc_dv") : t("about_desc_pa")}
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-5 h-5 text-cyan-light" />
                <h2 className="font-display font-bold text-white text-lg">{t("about_data_sources")}</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm mb-4">
                {t("about_data_intro")}
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                {[
                  t("about_source_who"),
                  t("about_source_cdc"),
                  t("about_source_unaids"),
                  t("about_source_iaea"),
                  t("about_source_britannica"),
                  t("about_source_journals"),
                  t("about_source_museums"),
                ].map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 text-xs mt-4">
                {t("about_data_vary")}
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Scale className="w-5 h-5 text-amber-light" />
                <h2 className="font-display font-bold text-white text-lg">{t("about_methodology")}</h2>
              </div>
              <div className="text-slate-400 leading-relaxed text-sm space-y-3">
                <p>{t("about_methodology_p1")}</p>
                <p>{t("about_methodology_p2")}</p>
                <p>{t("about_methodology_p3")}</p>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-cyan-light" />
                <h2 className="font-display font-bold text-white text-lg">{t("about_editorial")}</h2>
              </div>
              <div className="text-slate-400 leading-relaxed text-sm space-y-3">
                <p>{t("about_editorial_p1")}</p>
                <p>{t("about_editorial_p2")}</p>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-emerald-light" />
                <h2 className="font-display font-bold text-white text-lg">{t("about_authorship")}</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                {meta.name} {t("about_authorship_p")}
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-emerald-light" />
                <h2 className="font-display font-bold text-white text-lg">{t("about_technology")}</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                {t("about_technology_text")}
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-amber-light" />
                <h2 className="font-display font-bold text-white text-lg">{t("about_disclaimer")}</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                {meta.name} {t("about_disclaimer_text_a")}
              </p>
            </div>

            <div className="card p-6 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-slate-500 text-sm">
                {t("about_built_by")}{" "}
                <span className="text-slate-300 font-semibold">Furiosa Studio</span>
              </p>
              <Link href={localizedHref("/support", lang)} className="btn-primary">
                {t("about_support_project")}
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
