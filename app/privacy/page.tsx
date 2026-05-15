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
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title mb-2">{t("privacy_title")}</h1>
          <p className="text-slate-600 text-xs font-mono mb-8">Last updated: May 2025 · {meta.name}</p>

          <Section title="1. Information We Collect">
            <p>{meta.name} does not collect personal information directly. We do not require account creation, login, or any form of registration.</p>
            <p>We may collect anonymous, aggregated usage statistics (page views, bounce rate) through privacy-respecting analytics tools. No personally identifiable information is ever collected or stored by us.</p>
          </Section>

          <Section title="2. Cookies &amp; Advertising">
            <p>We use essential cookies to store your preferences (dark/light mode, language selection). These contain no personally identifiable information.</p>
            <p>We use <strong className="text-slate-300">Google AdSense</strong> to display advertisements. Google AdSense uses cookies and similar tracking technologies to serve personalised ads based on your browsing activity across sites. This may include:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Advertising cookies set by Google (e.g. <code className="text-xs bg-black/30 px-1 rounded">DSID</code>, <code className="text-xs bg-black/30 px-1 rounded">IDE</code>)</li>
              <li>Interest-based advertising profiles</li>
              <li>Conversion tracking</li>
            </ul>
            <p className="mt-2">You can opt out of personalised advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">google.com/settings/ads</a> or via <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">youronlinechoices.com</a>. Google's privacy policy is available at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">policies.google.com/privacy</a>.</p>
          </Section>

          <Section title="3. Third-Party Services">
            <p>The 3D globe loads map textures from <code className="text-xs bg-black/30 px-1 rounded">cdn.jsdelivr.net</code>. These are static assets and do not track users.</p>
            <p>Google Fonts are loaded for typography, involving requests to Google servers subject to Google's privacy policy.</p>
            <p>Google AdSense (advertising) and potentially Google Analytics (anonymous analytics) are used as described above.</p>
          </Section>

          <Section title="4. Your Rights (GDPR)">
            <p>If you are located in the European Economic Area, you have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong className="text-slate-300">Right to access</strong> — request a copy of data held about you</li>
              <li><strong className="text-slate-300">Right to erasure</strong> — request deletion of your data</li>
              <li><strong className="text-slate-300">Right to object</strong> — object to processing for direct marketing</li>
              <li><strong className="text-slate-300">Right to withdraw consent</strong> — withdraw cookie consent at any time</li>
            </ul>
            <p className="mt-2">Since {meta.name} holds no personal data directly, most requests should be directed to Google for advertising data. You can clear all site preferences by clearing your browser's local storage.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We do not store any user data on our servers. All preferences are stored exclusively in your browser's local storage and can be cleared at any time via your browser settings or our cookie banner.</p>
          </Section>

          <Section title="6. Legal Basis (GDPR)">
            <p>For essential cookies: <strong className="text-slate-300">Legitimate interests</strong> — required for the site to function.</p>
            <p>For advertising cookies (Google AdSense): <strong className="text-slate-300">Consent</strong> — we ask for your consent via the cookie banner before enabling personalised advertising.</p>
          </Section>

          <Section title="7. Contact &amp; Complaints">
            <p>For privacy-related questions: <span className="text-cyan-light font-mono">miquelcusso@gmail.com</span></p>
            <p>If you believe your rights have not been respected, you may lodge a complaint with the Spanish data protection authority: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-cyan-light hover:underline">AEPD (aepd.es)</a>.</p>
          </Section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
