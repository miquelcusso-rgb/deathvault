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
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("terms_title")}</h1>
          <p className="text-slate-600 text-xs font-mono mb-8">Last updated: May 2025 · {meta.name}</p>

          <Section title="1. Acceptance of Terms">
            <p>By accessing {meta.name}, you agree to these terms of service. If you disagree with any part, please discontinue use of this site.</p>
          </Section>

          <Section title="2. Educational Purpose">
            <p>{meta.name} is an educational resource providing historical data visualisations. All content is intended for informational and educational purposes only. It does not constitute medical, legal, or professional advice of any kind.</p>
          </Section>

          <Section title="3. Data Accuracy">
            <p>While we strive for accuracy, historical death toll estimates vary significantly between sources and scholarly consensus may evolve. We present widely-cited estimates and note ranges where available. {meta.name} is not liable for decisions made based on this data.</p>
          </Section>

          <Section title="4. Advertising">
            <p>This site displays advertisements served by Google AdSense. We are not responsible for the content of third-party advertisements. Ad content is controlled by Google and its advertising partners.</p>
            <p>By using this site, you acknowledge that advertisements may be displayed. You may opt out of personalised ads via your Google Ad Settings.</p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>The {meta.name} design, code, and original content are protected by copyright. Historical data is sourced from public domain and open-access sources (WHO, CDC, UNAIDS, IAEA, Britannica), appropriately attributed.</p>
            <p>You may share links to {meta.name} pages. You may not reproduce the site's design, code, or original content without written permission.</p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>{meta.name} is provided "as is" without any warranties, express or implied. We are not liable for any damages arising from use of this site, including but not limited to errors in historical data presented or interruptions in service.</p>
          </Section>

          <Section title="7. External Links">
            <p>We link to external sources (WHO, CDC, Britannica, etc.) for reference. We are not responsible for the content, accuracy, or privacy practices of external sites.</p>
          </Section>

          <Section title="8. Changes to Terms">
            <p>We may update these terms at any time without prior notice. Continued use of {meta.name} after any changes constitutes acceptance of the updated terms.</p>
          </Section>

          <Section title="9. Governing Law">
            <p>These terms are governed by the laws of Spain. Any disputes shall be subject to the exclusive jurisdiction of the courts of Spain.</p>
          </Section>

          <Section title="10. Contact">
            <p>Questions about these terms: <a href={`mailto:${brand === "deathvault" ? "hello@deathvault.app" : "hello@plagueatlas.com"}`} className="text-cyan-light font-mono hover:underline">{brand === "deathvault" ? "hello@deathvault.app" : "hello@plagueatlas.com"}</a></p>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
