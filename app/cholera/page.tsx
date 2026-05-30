import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/cholera`;
  return {
    title: "Cholera — Cause, Symptoms, Treatment & the 7 Pandemics",
    description:
      "Cholera is an acute diarrhoeal infection caused by Vibrio cholerae in contaminated water. It can kill within hours untreated, yet rehydration saves 99% of patients. Symptoms, transmission, the seven pandemics, and where it still kills today.",
    alternates: {
      canonical,
      languages: { en: canonical, es: `${m.url}/es/cholera`, "x-default": canonical },
    },
    openGraph: {
      title: "Cholera — Cause, Symptoms, Treatment & the 7 Pandemics",
      description:
        "Caused by Vibrio cholerae in dirty water. Can kill in hours — but rehydration saves 99%. Full guide.",
      url: canonical,
      type: "article",
      images: [{ url: `${m.url}/og-default.png`, width: 1200, height: 630, alt: "Cholera" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cholera — Cause, Symptoms, Treatment & the 7 Pandemics",
      description: "Caused by Vibrio cholerae. Can kill in hours — rehydration saves 99%.",
      images: [`${m.url}/og-default.png`],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

const articleSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cholera — Cause, Symptoms, Treatment and the Seven Pandemics",
  description:
    "A clear medical and historical guide to cholera: the Vibrio cholerae bacterium, how it spreads through contaminated water, oral rehydration therapy, and the seven cholera pandemics from 1817 to today.",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  mainEntityOfPage: url,
  image: `${url.replace("/cholera", "")}/og-default.png`,
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What causes cholera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cholera is caused by the bacterium Vibrio cholerae, which people swallow in food or water contaminated by the faeces of an infected person. The bacterium produces a toxin in the small intestine that triggers massive watery diarrhoea. It is fundamentally a disease of unsafe water and poor sanitation.",
      },
    },
    {
      "@type": "Question",
      name: "What are the symptoms of cholera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most infections are mild or symptomless. In severe cases, symptoms begin within hours to 5 days: profuse, watery 'rice-water' diarrhoea, vomiting, and rapid dehydration. Untreated, severe cholera can kill within hours through fluid loss, low blood pressure and shock. Warning signs of dangerous dehydration include sunken eyes, intense thirst, and reduced skin elasticity.",
      },
    },
    {
      "@type": "Question",
      name: "How is cholera treated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cornerstone is rehydration. Oral rehydration solution (ORS) — clean water with salts and sugar — saves about 99% of patients when given promptly. Severe cases need intravenous fluids. Antibiotics (doxycycline, azithromycin) shorten the illness and reduce spread but are secondary to fluids. Oral rehydration therapy is one of the highest-impact medical interventions of the 20th century.",
      },
    },
    {
      "@type": "Question",
      name: "How does cholera spread?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through the faecal-oral route: ingesting water or food contaminated with the faeces of an infected person. It spreads explosively where sewage mixes with drinking water — refugee camps, slums, areas hit by floods, war or earthquakes. It does not spread by casual person-to-person contact; the route is almost always contaminated water or food.",
      },
    },
    {
      "@type": "Question",
      name: "How many cholera pandemics have there been?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Seven. The first began in 1817 in the Ganges delta. The third (1846–1860) was the deadliest and prompted John Snow's famous 1854 investigation of London's Broad Street pump — a founding moment of modern epidemiology. The seventh pandemic began in 1961 in Indonesia and, remarkably, is still ongoing today, driven by the El Tor biotype.",
      },
    },
    {
      "@type": "Question",
      name: "Is cholera still a problem today?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The WHO estimates 1.3 to 4 million cases and 21,000 to 143,000 deaths from cholera every year. Major recent outbreaks have hit Haiti (after the 2010 earthquake), Yemen (the largest in recorded history, over 2.5 million suspected cases) and parts of sub-Saharan Africa. It remains entirely a disease of poverty and broken water infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a cholera vaccine?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Oral cholera vaccines (such as Dukoral, Shanchol and Euvichol) give around 65% protection for several years and are used in outbreak response and high-risk areas. They complement — but do not replace — clean water and sanitation, which remain the only permanent solution.",
      },
    },
    {
      "@type": "Question",
      name: "Who was John Snow and why does he matter for cholera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "John Snow was a London physician who, during the 1854 Broad Street outbreak, mapped cholera deaths and traced them to a single contaminated water pump — disproving the prevailing 'bad air' (miasma) theory and demonstrating that cholera spread through water. Removing the pump handle helped end the outbreak. His work is considered the birth of modern epidemiology.",
      },
    },
  ],
};

const pandemics = [
  { n: "1st", years: "1817–1824", note: "Begins in the Ganges delta; spreads across Asia." },
  { n: "2nd", years: "1829–1837", note: "Reaches Europe and North America for the first time." },
  { n: "3rd", years: "1846–1860", note: "Deadliest. John Snow's 1854 Broad Street investigation." },
  { n: "4th", years: "1863–1875", note: "Spreads via pilgrimage and expanding rail/shipping." },
  { n: "5th", years: "1881–1896", note: "Koch identifies Vibrio cholerae (1883)." },
  { n: "6th", years: "1899–1923", note: "Heavy toll in India, Middle East, Russia." },
  { n: "7th", years: "1961–present", note: "El Tor biotype; still ongoing today." },
];

export default async function CholeraPage() {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/cholera`;
  const article = articleSchema(canonical);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          <Link href="/" className="hover:text-slate-300">{m.name}</Link> / Cholera
        </nav>

        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-rose-400/70">Vibrio cholerae · 7 pandemics</p>
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">Cholera</h1>
        <p className="mb-8 max-w-2xl text-lg italic text-slate-400">
          A disease that can kill a healthy adult in hours — yet a glass of salt-and-sugar water saves 99%
          of patients. The cause, the symptoms, the seven pandemics, and why it still kills tens of
          thousands a year.
        </p>

        <section aria-label="Featured answer" className="mb-10 rounded-md border-l-2 border-rose-400/60 bg-rose-400/5 p-5">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-rose-400/80">Short answer</p>
          <p className="text-base leading-relaxed text-slate-200">
            Cholera is an acute infection caused by{" "}
            <strong className="text-white"><em>Vibrio cholerae</em></strong> swallowed in{" "}
            <strong className="text-white">contaminated water</strong>. It causes violent watery diarrhoea
            and can kill through dehydration within hours. Yet{" "}
            <strong className="text-white">oral rehydration therapy saves about 99%</strong> of patients. The
            WHO estimates 1.3–4 million cases and up to 143,000 deaths a year — entirely a disease of unsafe
            water and poor sanitation.
          </p>
        </section>

        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">Key facts</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "hours–5d", l: "Onset" },
            { v: "~50%", l: "Untreated fatality (severe)" },
            { v: "~1%", l: "With rehydration" },
            { v: "7", l: "Pandemics since 1817" },
          ].map((s, i) => (
            <div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center">
              <p className="font-mono text-lg text-rose-300">{s.v}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          Why it kills so fast — and why it&apos;s so easy to treat
        </h2>
        <p className="mb-4 text-slate-400">
          The <em>Vibrio cholerae</em> toxin makes the lining of the small intestine pump water and salts
          out of the body. A severe case can lose <strong className="text-slate-200">up to a litre of fluid
          an hour</strong>, draining the bloodstream until blood pressure collapses and organs fail — death
          can come within hours. But because the body is simply losing fluid and salts, replacing them works
          almost magically: <strong className="text-slate-200">oral rehydration solution</strong> (clean
          water + salt + sugar) lets the gut reabsorb fluid faster than the toxin expels it. It is cheap,
          needs no electricity or trained staff, and saves around 99% of patients.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">The seven cholera pandemics</h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60">
              <tr>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">#</th>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">Years</th>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {pandemics.map((p, i) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 font-mono text-rose-300/90">{p.n}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-200">{p.years}</td>
                  <td className="px-4 py-2.5 text-slate-400">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-400">
          We are still living in the <strong className="text-slate-200">seventh pandemic</strong>, which began
          in 1961 and has never fully ended — a reminder that cholera is controlled by infrastructure, not by
          medicine alone.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">Frequently asked questions</h2>
        <div className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {faqSchema.mainEntity.map((q, i) => (
            <div key={i} className="py-5">
              <p className="mb-2 font-medium text-slate-100">{q.name}</p>
              <p className="text-slate-400">{q.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">Related</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { href: "/black-death", label: "The Black Death — 75–200M dead", tag: "History" },
            { href: "/spanish-flu", label: "Spanish Flu 1918 — 50M dead", tag: "Pandemic" },
            { href: "/bubonic-plague", label: "Bubonic plague — symptoms & cases", tag: "Disease" },
            { href: "/", label: `${m.name} home — interactive map`, tag: "Tool" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="block rounded-md border border-slate-800 p-4 transition hover:border-rose-400/40">
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-rose-400/70">{c.tag}</p>
              <p className="mt-1 italic text-slate-200">{c.label}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-slate-600">
          © 2026 Furiosa Studio · Part of the{" "}
          <a href="https://furiosadata.com" rel="dofollow" className="underline">Furiosa Data Tools Network</a>
        </p>
        <p className="mt-3 text-center text-[0.65rem] text-slate-600">
          Informational only — not medical advice. For symptoms, contact a healthcare professional.
        </p>
      </article>
    </main>
  );
}
