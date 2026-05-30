import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/spanish-flu`;
  return {
    title: "Spanish Flu (1918) — Death Toll, Timeline & Why It Was So Deadly",
    description:
      "The 1918 Spanish flu killed an estimated 50 million people worldwide — more than World War I. Full timeline, death toll by country, why it targeted healthy young adults, and how it ended.",
    alternates: {
      canonical,
      languages: { en: canonical, es: `${m.url}/es/spanish-flu`, "x-default": canonical },
    },
    openGraph: {
      title: "Spanish Flu 1918 — The Deadliest Pandemic of the 20th Century",
      description:
        "50 million deaths · 1918–1920 · H1N1 · Why it killed healthy young adults and how it ended.",
      url: canonical,
      type: "article",
      images: [{ url: `${m.url}/og-default.png`, width: 1200, height: 630, alt: "Spanish Flu 1918" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Spanish Flu 1918 — The Deadliest Pandemic of the 20th Century",
      description: "50 million deaths · 1918–1920 · Complete history.",
      images: [`${m.url}/og-default.png`],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

const articleSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Spanish Flu (1918) — The Deadliest Pandemic of the 20th Century",
  description:
    "Comprehensive guide to the 1918 Spanish flu pandemic: death toll, geographic spread, the W-shaped mortality curve, the cytokine-storm hypothesis, and how the pandemic ended.",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  mainEntityOfPage: url,
  image: `${url.replace("/spanish-flu", "")}/og-default.png`,
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many people died in the Spanish flu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 1918 Spanish flu killed an estimated 50 million people worldwide between 1918 and 1920, with credible academic estimates ranging from 17 million to 100 million. It infected roughly 500 million people — about a third of the world's population at the time. It killed more people than the First World War.",
      },
    },
    {
      "@type": "Question",
      name: "Why was it called the Spanish flu if it didn't start in Spain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The name is a historical accident of wartime censorship. In 1918 the combatant nations (USA, UK, France, Germany) suppressed news of the outbreak to protect morale. Spain was neutral in World War I, so its press reported freely on the epidemic — including the illness of King Alfonso XIII. Because Spanish coverage was the most visible, the world wrongly assumed the disease originated there. Its true origin is still debated (Kansas, France and China are the leading candidates).",
      },
    },
    {
      "@type": "Question",
      name: "What caused the Spanish flu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An H1N1 influenza A virus of avian origin. The complete genome was reconstructed in 2005 from a victim preserved in Alaskan permafrost and from preserved US Army autopsy tissue, confirming it as an unusually aggressive H1N1 strain. Modern seasonal H1N1 flu (including the 2009 'swine flu') descends from it.",
      },
    },
    {
      "@type": "Question",
      name: "Why did the Spanish flu kill healthy young adults?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike normal flu, which kills mostly the very young and very old, the 1918 strain produced a 'W-shaped' mortality curve with a huge spike among healthy 20–40 year-olds. The leading explanation is a cytokine storm — the strong immune systems of young adults overreacted to the virus, flooding the lungs with immune cells and fluid until victims effectively drowned. Weaker immune systems, paradoxically, were less likely to trigger this fatal overreaction.",
      },
    },
    {
      "@type": "Question",
      name: "When did the Spanish flu start and end?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It came in three to four waves. The first (spring 1918) was relatively mild. The second wave (autumn 1918) was catastrophically deadly and caused the bulk of the deaths. A third wave hit in early 1919, and some regions saw a fourth in 1920. By 1920 the virus had mutated toward lower lethality and enough of the population had immunity that it faded into ordinary seasonal flu.",
      },
    },
    {
      "@type": "Question",
      name: "How did the Spanish flu end?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There was no vaccine and no antiviral — the influenza virus wasn't even identified until 1933. The pandemic ended through a combination of herd immunity (so many people had been infected that the virus ran out of new hosts) and natural attenuation (the virus mutated toward less lethal forms, because killing hosts too fast limits spread). Non-pharmaceutical measures — quarantine, mask mandates, closing schools and theatres — measurably slowed it where applied early.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Spanish flu compare to COVID-19?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Death toll: Spanish flu ~50 million, COVID-19 ~7 million confirmed (15–20 million by excess-mortality estimates). Age profile: Spanish flu uniquely killed healthy young adults; COVID-19 killed disproportionately the elderly. Population share: Spanish flu killed roughly 2.5% of the entire world population; COVID-19 around 0.1%. The 1918 pandemic remains far deadlier by share of population, but COVID-19 unfolded in a world with antibiotics, ventilators and vaccines developed within a year.",
      },
    },
    {
      "@type": "Question",
      name: "Could a Spanish flu-level pandemic happen again?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A novel influenza strain with pandemic potential is considered one of the highest-probability global health threats. The defences that did not exist in 1918 now do: rapid genome sequencing, antiviral drugs, mRNA vaccine platforms that can be retargeted in weeks, and global surveillance networks. But a sufficiently transmissible and lethal strain could still cause enormous harm before defences scale — which is why influenza pandemic preparedness remains a WHO priority.",
      },
    },
  ],
};

const timeline: { date: string; event: string }[] = [
  { date: "Mar 1918", event: "First documented cases at Camp Funston, Fort Riley, Kansas — among the leading origin candidates." },
  { date: "Apr–May 1918", event: "First wave spreads through US troop movements to Europe. Relatively mild; often mistaken for ordinary flu." },
  { date: "May 1918", event: "Reaches Spain. Neutral Spanish press reports freely — giving the pandemic its misleading name." },
  { date: "Aug 1918", event: "Second wave erupts almost simultaneously in Brest (France), Freetown (Sierra Leone) and Boston (USA). Far deadlier." },
  { date: "Oct 1918", event: "Deadliest month in US history: ~195,000 Americans die in October alone." },
  { date: "Nov 1918", event: "Armistice celebrations and troop demobilisation accelerate spread worldwide." },
  { date: "1919", event: "Third wave. Among its victims, the Versailles peace conference is disrupted; US President Wilson falls gravely ill." },
  { date: "1920", event: "Fourth wave in some regions. Virus attenuates; pandemic fades into seasonal flu." },
  { date: "1933", event: "Influenza virus first isolated — 15 years after the pandemic." },
  { date: "2005", event: "Full 1918 H1N1 genome reconstructed from permafrost-preserved and archived autopsy tissue." },
];

export default async function SpanishFluPage() {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/spanish-flu`;
  const article = articleSchema(canonical);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          <Link href="/" className="hover:text-slate-300">{m.name}</Link> / Spanish Flu
        </nav>

        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-rose-400/70">1918–1920 · H1N1 influenza</p>
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">The Spanish Flu of 1918</h1>
        <p className="mb-8 max-w-2xl text-lg italic text-slate-400">
          About 50 million dead in two years — more than the First World War. The deadliest pandemic of
          the 20th century, and the one that uniquely killed healthy young adults. Here is the full story.
        </p>

        <section aria-label="Featured answer" className="mb-10 rounded-md border-l-2 border-rose-400/60 bg-rose-400/5 p-5">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-rose-400/80">Short answer</p>
          <p className="text-base leading-relaxed text-slate-200">
            The 1918 Spanish flu killed an estimated{" "}
            <strong className="text-white">50 million people worldwide</strong> (academic range 17–100M),
            infecting roughly <strong className="text-white">a third of humanity</strong>. It was caused by
            an <em>H1N1 influenza A</em> virus, came in three to four waves, and was named after Spain only
            because neutral Spanish newspapers reported it freely while wartime censors elsewhere hid it.
          </p>
        </section>

        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">The death toll</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "~50M", l: "Deaths worldwide" },
            { v: "~500M", l: "Infected (⅓ of humanity)" },
            { v: "2.5%", l: "Of world population" },
            { v: "675K", l: "US deaths" },
          ].map((s, i) => (
            <div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center">
              <p className="font-mono text-xl text-rose-300">{s.v}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-400">
          For comparison, World War I killed about 20 million. The Spanish flu killed more than twice that
          in a fraction of the time. India alone lost an estimated 12–17 million people — the heaviest
          national toll of the pandemic.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">Why young adults died</h2>
        <p className="mb-4 text-slate-400">
          Normal influenza kills a U-shaped distribution of victims: the very young and the very old. The
          1918 strain produced a <strong className="text-slate-200">W-shaped curve</strong> with a third,
          catastrophic peak among healthy <strong className="text-slate-200">20-to-40-year-olds</strong>.
        </p>
        <p className="mb-4 text-slate-400">
          The leading explanation is the <strong className="text-slate-200">cytokine storm</strong>: the
          robust immune systems of young adults overreacted to the virus, flooding the lungs with immune
          cells and fluid until the victim drowned in their own secretions, often within days. Weaker
          immune systems — paradoxically — were less likely to mount the fatal overreaction. This is the
          opposite of how almost every other respiratory disease behaves, and it is why the 1918 pandemic
          orphaned so many children and gutted the working-age population.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">Timeline</h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60">
              <tr>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">When</th>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">Event</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {timeline.map((t, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-rose-300/90">{t.date}</td>
                  <td className="px-4 py-2.5 text-slate-300">{t.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          The three waves
        </h2>
        <p className="mb-4 text-slate-400">
          The pandemic&apos;s defining feature was its waves. The{" "}
          <strong className="text-slate-200">first wave (spring 1918)</strong> was mild enough to be
          mistaken for ordinary seasonal flu. The{" "}
          <strong className="text-slate-200">second wave (autumn 1918)</strong> was the killer — a mutated,
          far more lethal form that caused the overwhelming majority of deaths in just a few months. A{" "}
          <strong className="text-slate-200">third wave (early 1919)</strong> and, regionally, a{" "}
          <strong className="text-slate-200">fourth (1920)</strong> followed before the virus attenuated.
          The lesson public-health authorities drew — that a mild first wave can precede a deadly second —
          directly shaped the response to later pandemics including COVID-19.
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
            { href: "/black-death", label: "The Black Death — 75–200M dead", tag: "Pandemic" },
            { href: "/", label: `${m.name} home — interactive map`, tag: "Tool" },
            { href: "/compare", label: "Compare pandemics side by side", tag: "Tool" },
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
      </article>
    </main>
  );
}
