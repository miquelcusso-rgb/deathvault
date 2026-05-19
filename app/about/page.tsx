"use client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useBrand } from "@/app/providers";
import { BRAND_META } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Activity, Database, Globe, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useI18n();
  const brand = useBrand();
  const meta = BRAND_META[brand];
  const isDV = brand === "deathvault";

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("about_title")}</h1>

          <div className="space-y-6 mt-8">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-5 h-5 text-crimson-light" />
                <h2 className="font-display font-bold text-white text-lg">What is {meta.name}?</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                {isDV
                  ? "DeathVault is an independent educational archive documenting every major mass-death event in recorded history — pandemics, world wars, famines, and nuclear disasters. Our goal is to make historical mortality data accessible, accurate, and context-rich, helping people grasp the true scale of humanity's greatest catastrophes."
                  : "PlagueAtlas is an independent educational data visualization project mapping the deadliest pandemics and famines in human history. Our goal is to make historical mortality data accessible, engaging, and context-rich — helping people understand the scale and impact of humanity's greatest disease crises."}
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-5 h-5 text-cyan-light" />
                <h2 className="font-display font-bold text-white text-lg">Data Sources</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm mb-4">
                All data is sourced from reputable academic and institutional sources including:
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                {[
                  "World Health Organization (WHO)",
                  "Centers for Disease Control (CDC)",
                  "UNAIDS Global Statistics",
                  "International Atomic Energy Agency (IAEA)",
                  "Encyclopaedia Britannica",
                  "Peer-reviewed academic journals",
                  "National museums and historical archives",
                ].map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 text-xs mt-4">
                Death toll estimates vary significantly between sources. We present the most
                widely-cited estimates along with ranges where available.
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-emerald-light" />
                <h2 className="font-display font-bold text-white text-lg">Technology</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                Built with Next.js 15, TypeScript, Tailwind CSS, Three.js (3D globe), and Recharts.
                Hosted on Vercel. No personal data is collected beyond standard anonymized analytics.
              </p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-amber-light" />
                <h2 className="font-display font-bold text-white text-lg">Disclaimer</h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                {meta.name} is an educational resource only. The data presented reflects historical
                estimates that may vary between scholarly sources. This site is not affiliated with
                any government, health organization, or research institution. For medical advice,
                consult qualified healthcare professionals.
              </p>
            </div>

            <div className="card p-6 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-slate-500 text-sm">
                Built by{" "}
                <span className="text-slate-300 font-semibold">Furiosa Studio</span>
              </p>
              <Link href="/support" className="btn-primary">
                Support the Project
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
