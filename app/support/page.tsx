"use client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Heart, ExternalLink, Check } from "lucide-react";

// Payment links — create at dashboard.stripe.com → Payment Links → New
const TIERS = [
  { amount: "2€",  label: "Supporter",   link: "https://buy.stripe.com/fZuaEZeyme634Oj4MM9R601" },
  { amount: "5€",  label: "Contributor", link: "https://buy.stripe.com/3cIcN7fCqe63cgLenm9R602" },
  { amount: "10€", label: "Patron",      link: "https://buy.stripe.com/14A7sN9e21jh2Gbcfe9R603" },
  { amount: "25€", label: "Champion",    link: "https://buy.stripe.com/aFa6oJ1LAd1Z80v7YY9R604" },
];

const PERKS = [
  "Fund ongoing data research and updates",
  "Support new pandemic events being added",
  "Cover server and infrastructure costs",
  "Enable new features (timeline animations, mobile app)",
];

export default function SupportPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-crimson/15 border border-crimson/30 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-crimson-light" />
          </div>
          <h1 className="section-title text-3xl mb-2">{t("support_title")}</h1>
          <p className="text-slate-400 text-base">{t("support_subtitle")}</p>
        </motion.div>

        <div className="space-y-4">
          {/* Why support card */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-white text-lg mb-4">{t("support_why")}</h2>
            <p className="text-slate-400 text-sm mb-5">{t("support_why_text")}</p>
            <div className="space-y-2.5">
              {PERKS.map((perk) => (
                <div key={perk} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-emerald-light flex-shrink-0 mt-0.5" />
                  {perk}
                </div>
              ))}
            </div>
          </div>

          {/* Donation options */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-white text-lg mb-5">Choose your support</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {TIERS.map(({ amount, label, link }) => (
                <a
                  key={amount}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/60 hover:border-crimson/40 hover:bg-crimson/5 transition-all duration-200 cursor-pointer group"
                >
                  <span className="font-mono font-black text-2xl text-white group-hover:text-crimson-light transition-colors duration-200">
                    {amount}
                  </span>
                  <span className="text-slate-500 text-xs text-center">{label}</span>
                </a>
              ))}
            </div>

            <p className="text-slate-600 text-xs text-center mt-3 flex items-center justify-center gap-1.5">
              <ExternalLink className="w-3 h-3" />
              Secured by Stripe · All major cards accepted
            </p>
          </div>

          <p className="text-center text-slate-600 text-xs">
            PlagueAtlas is not a registered charity. Donations support project costs only.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
