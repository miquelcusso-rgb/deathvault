"use client";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useI18n } from "@/lib/i18n";
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
  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("privacy_title")}</h1>
          <p className="text-slate-600 text-xs font-mono mb-8">Last updated: January 2025</p>

          <Section title="1. Information We Collect">
            <p>PlagueAtlas does not collect personal information. We do not require account creation, login, or any form of registration.</p>
            <p>We may collect anonymous, aggregated usage statistics (page views, bounce rate) through privacy-respecting analytics tools. No personally identifiable information is ever collected or stored.</p>
          </Section>

          <Section title="2. Cookies">
            <p>We use only essential cookies required for the website to function (e.g., storing your dark mode preference and language selection). These cookies are stored locally in your browser and contain no personally identifiable information.</p>
            <p>We do not use advertising cookies, tracking cookies, or third-party analytics cookies.</p>
          </Section>

          <Section title="3. Third-Party Services">
            <p>The 3D globe visualization loads map textures from a CDN (unpkg.com). The flat map uses world atlas data from cdn.jsdelivr.net. These are static assets and do not track users.</p>
            <p>Google Fonts may be loaded for typography. This involves requests to Google servers, subject to Google's privacy policy.</p>
          </Section>

          <Section title="4. Data Retention">
            <p>We do not store any user data on our servers. All preferences (dark mode, language) are stored exclusively in your browser's local storage and can be cleared at any time.</p>
          </Section>

          <Section title="5. Your Rights">
            <p>Since we collect no personal data, there is no data to access, correct, or delete. You can clear your browser's local storage at any time to remove all site preferences.</p>
          </Section>

          <Section title="6. Contact">
            <p>For privacy-related questions, contact us at: <span className="text-cyan-light font-mono">miquelcusso@gmail.com</span></p>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
