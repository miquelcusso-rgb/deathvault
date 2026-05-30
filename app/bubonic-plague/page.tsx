import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/bubonic-plague`;
  return {
    title: "Bubonic Plague — Symptoms, Cause, Treatment & Is It Still Around?",
    description:
      "Bubonic plague is a bacterial infection caused by Yersinia pestis, spread by flea bites. Symptoms, transmission, modern treatment, and the 1,000–2,000 cases still reported worldwide every year.",
    alternates: {
      canonical,
      languages: { en: canonical, es: `${m.url}/es/bubonic-plague`, "x-default": canonical },
    },
    openGraph: {
      title: "Bubonic Plague — Symptoms, Cause, Treatment",
      description:
        "Caused by Yersinia pestis, spread by fleas. Symptoms, modern treatment, and why it still exists today.",
      url: canonical,
      type: "article",
      images: [{ url: `${m.url}/og-default.png`, width: 1200, height: 630, alt: "Bubonic plague" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bubonic Plague — Symptoms, Cause, Treatment",
      description: "Caused by Yersinia pestis, spread by fleas. Still ~1,000–2,000 cases/year worldwide.",
      images: [`${m.url}/og-default.png`],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

const articleSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Bubonic Plague — Symptoms, Cause, Treatment and Modern Cases",
  description:
    "A clear medical and historical guide to bubonic plague: the Yersinia pestis bacterium, how it spreads, its three clinical forms, modern antibiotic treatment, and where cases still occur today.",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  mainEntityOfPage: url,
  image: `${url.replace("/bubonic-plague", "")}/og-default.png`,
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is bubonic plague?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bubonic plague is a serious bacterial infection caused by Yersinia pestis. It is the most common form of plague and is named for the painful, swollen lymph nodes — called buboes — that appear in the groin, armpit or neck. It is usually transmitted by the bite of an infected flea. Untreated, it kills 30–60% of those infected; with prompt antibiotics, most people recover.",
      },
    },
    {
      "@type": "Question",
      name: "What are the symptoms of bubonic plague?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Symptoms appear 2–8 days after infection: sudden fever, chills, headache, weakness and muscle aches, followed by one or more swollen, extremely painful lymph nodes (buboes), often in the groin or armpit near the flea bite. Without treatment the infection can spread to the blood (septicemic plague) or lungs (pneumonic plague), both of which are far more dangerous.",
      },
    },
    {
      "@type": "Question",
      name: "How is bubonic plague transmitted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most cases come from the bite of a flea that has fed on an infected rodent (rats, prairie dogs, ground squirrels). People can also catch it by handling an infected animal's tissue or fluids. Bubonic plague itself does not spread person-to-person — but if it progresses to pneumonic (lung) plague, that form can spread through respiratory droplets between humans.",
      },
    },
    {
      "@type": "Question",
      name: "Is bubonic plague still around today?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The WHO records roughly 1,000 to 2,000 human plague cases worldwide each year, though the true number is likely higher. The most affected countries are Madagascar, the Democratic Republic of the Congo and Peru. The United States averages about 7 cases per year, mostly in rural areas of New Mexico, Arizona, Colorado and California.",
      },
    },
    {
      "@type": "Question",
      name: "Can bubonic plague be cured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Bubonic plague is curable with antibiotics — gentamicin, ciprofloxacin, levofloxacin or doxycycline — especially when treatment begins within 24 hours of symptoms. Early treatment drops mortality from 30–60% to around 10% or less. Delay is the single biggest risk factor, which is why prompt diagnosis is critical in plague-endemic regions.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between bubonic plague and the Black Death?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They are caused by the same bacterium, Yersinia pestis. 'Bubonic plague' is the disease (the medical condition that still occurs today). The 'Black Death' is the specific historical pandemic of 1346–1353 that killed an estimated 75–200 million people across Eurasia — the deadliest outbreak of that disease in history.",
      },
    },
    {
      "@type": "Question",
      name: "How deadly is bubonic plague?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Untreated bubonic plague has a fatality rate of 30–60%. If it progresses to septicemic or pneumonic plague, untreated fatality approaches 100%. With modern antibiotics started early, overall mortality falls to roughly 10%. The disease is dangerous primarily when it is misdiagnosed or treatment is delayed.",
      },
    },
    {
      "@type": "Question",
      name: "How can you prevent plague?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no widely available plague vaccine for the general public. Prevention focuses on reducing rodent and flea exposure: flea-control products on pets, avoiding contact with dead or sick rodents, using insect repellent in endemic areas, and rodent-proofing homes. Healthcare workers use standard precautions, plus respiratory isolation for suspected pneumonic cases.",
      },
    },
  ],
};

export default async function BubonicPlaguePage() {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/bubonic-plague`;
  const article = articleSchema(canonical);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          <Link href="/" className="hover:text-slate-300">{m.name}</Link> / Bubonic Plague
        </nav>

        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-rose-400/70">Yersinia pestis · Still active today</p>
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">Bubonic Plague</h1>
        <p className="mb-8 max-w-2xl text-lg italic text-slate-400">
          The disease behind the Black Death is not history — it still infects 1,000–2,000 people a year.
          What it is, how it spreads, the symptoms, and why modern antibiotics make it survivable.
        </p>

        <section aria-label="Featured answer" className="mb-10 rounded-md border-l-2 border-rose-400/60 bg-rose-400/5 p-5">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-rose-400/80">Short answer</p>
          <p className="text-base leading-relaxed text-slate-200">
            Bubonic plague is a bacterial infection caused by{" "}
            <strong className="text-white"><em>Yersinia pestis</em></strong>, spread mainly by{" "}
            <strong className="text-white">flea bites</strong> from infected rodents. It causes fever and
            painful swollen lymph nodes (<strong className="text-white">buboes</strong>). Untreated it kills
            30–60%; with early antibiotics most people recover. It still causes about{" "}
            <strong className="text-white">1,000–2,000 cases a year</strong> worldwide, mainly in Madagascar,
            the DR Congo and Peru.
          </p>
        </section>

        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">Key facts</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "2–8 days", l: "Incubation" },
            { v: "30–60%", l: "Untreated fatality" },
            { v: "~10%", l: "Treated fatality" },
            { v: "1–2K/yr", l: "Cases worldwide" },
          ].map((s, i) => (
            <div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center">
              <p className="font-mono text-xl text-rose-300">{s.v}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">The three forms of plague</h2>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-400">
          <li>
            <strong className="text-slate-200">Bubonic</strong> — the classic form. Flea bite → swollen,
            painful lymph nodes (buboes). 30–60% fatal untreated.
          </li>
          <li>
            <strong className="text-slate-200">Septicemic</strong> — the bacteria multiply in the
            bloodstream, causing tissue death and blackening of fingers and toes (the origin of the name
            &quot;Black&quot; Death). Near-universally fatal untreated.
          </li>
          <li>
            <strong className="text-slate-200">Pneumonic</strong> — infection of the lungs, the only form
            that spreads person-to-person through airborne droplets. Fatal within 2–3 days untreated, and the
            most dangerous from a public-health standpoint.
          </li>
        </ul>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">How it spreads</h2>
        <p className="mb-4 text-slate-400">
          The classic cycle runs <strong className="text-slate-200">rodent → flea → human</strong>. A flea
          feeds on an infected rat or other rodent, the bacteria multiply and block the flea&apos;s gut, and
          when the starving flea bites a human it regurgitates <em>Yersinia pestis</em> into the wound.
          Humans can also be infected by handling infected animal tissue (hunters, herders) or — in the
          pneumonic form — by inhaling droplets from an infected person or animal coughing nearby.
        </p>
        <p className="mb-4 text-slate-400">
          Bubonic plague on its own is <strong className="text-slate-200">not contagious between people</strong>.
          The fear factor comes from its ability to progress to pneumonic plague, which is.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">Treatment today</h2>
        <p className="mb-4 text-slate-400">
          Modern antibiotics make plague survivable when caught early. First-line drugs are{" "}
          <strong className="text-slate-200">gentamicin</strong> and the fluoroquinolones (
          <strong className="text-slate-200">ciprofloxacin, levofloxacin</strong>); doxycycline is also
          effective. Treatment started within <strong className="text-slate-200">24 hours</strong> of symptom
          onset cuts mortality dramatically. Patients with suspected pneumonic plague are isolated, and close
          contacts may receive preventive antibiotics. The key risk is delay — plague is rare enough in most
          countries that doctors may not consider it quickly.
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
            { href: "/black-death", label: "The Black Death — the 1346 pandemic", tag: "History" },
            { href: "/spanish-flu", label: "Spanish Flu 1918 — 50M dead", tag: "Pandemic" },
            { href: "/", label: `${m.name} home — interactive map`, tag: "Tool" },
            { href: "/statistics", label: "Aggregate death statistics", tag: "Data" },
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
