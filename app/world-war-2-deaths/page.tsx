import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/world-war-2-deaths`;
  return {
    title: "World War 2 Deaths — How Many People Died in WWII (by Country)",
    description:
      "An estimated 70–85 million people died in World War 2 — about 3% of the world's population. Full breakdown of WWII deaths by country, military vs civilian, the Holocaust, and how the toll was counted.",
    alternates: {
      canonical,
      languages: { en: canonical, es: `${m.url}/es/world-war-2-deaths`, "x-default": canonical },
    },
    openGraph: {
      title: "World War 2 Deaths — How Many People Died in WWII",
      description:
        "70–85 million deaths · ~3% of humanity · full breakdown by country, military vs civilian, the Holocaust.",
      url: canonical,
      type: "article",
      images: [{ url: `${m.url}/og-default.png`, width: 1200, height: 630, alt: "World War 2 deaths" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "World War 2 Deaths — How Many People Died in WWII",
      description: "70–85 million deaths · ~3% of humanity · full breakdown by country.",
      images: [`${m.url}/og-default.png`],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

const articleSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "World War 2 Deaths — How Many People Died in WWII, by Country",
  description:
    "A data-driven breakdown of World War 2 deaths: the 70–85 million total, the split between military and civilian deaths, the country-by-country toll, the Holocaust, and how historians arrive at the numbers.",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  mainEntityOfPage: url,
  image: `${url.replace("/world-war-2-deaths", "")}/og-default.png`,
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many people died in World War 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An estimated 70 to 85 million people died in World War 2 (1939–1945) — roughly 3% of the world's 1940 population of about 2.3 billion. The wide range reflects uncertainty in civilian, famine and disease deaths, especially in China and the Soviet Union. It is the deadliest conflict in human history by absolute numbers.",
      },
    },
    {
      "@type": "Question",
      name: "Which country lost the most people in WWII?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Soviet Union, by a wide margin: an estimated 24–27 million deaths, military and civilian combined. China was second with 15–20 million. Germany lost 6.6–8.8 million and Poland about 5.7 million (the highest proportion of any country, around 17% of its pre-war population).",
      },
    },
    {
      "@type": "Question",
      name: "How many soldiers vs civilians died in WWII?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Of the ~70–85 million total, roughly 21–25 million were military deaths and 50–55 million were civilian deaths — including those killed by genocide, famine, disease and strategic bombing. WWII was unusual in that civilian deaths far outnumbered military ones, driven by deliberate mass killing and war-induced famine.",
      },
    },
    {
      "@type": "Question",
      name: "How many people died in the Holocaust?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "About 6 million Jews were murdered in the Holocaust — roughly two-thirds of Europe's pre-war Jewish population. Nazi Germany and its collaborators also killed millions of others, including Roma, Soviet prisoners of war, disabled people, Polish civilians and political prisoners, bringing the total number of Nazi genocide and mass-killing victims to roughly 11 million.",
      },
    },
    {
      "@type": "Question",
      name: "How many Americans died in World War 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The United States suffered about 419,000 deaths in WWII, overwhelmingly military (around 416,000) with relatively few civilian deaths because the war was not fought on the US mainland. This was a small fraction of the war's total but a defining national loss.",
      },
    },
    {
      "@type": "Question",
      name: "How does WWII compare to WWI in deaths?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "World War 1 (1914–1918) killed about 17–20 million people. World War 2 killed 70–85 million — roughly four times as many — largely because of the scale of civilian deaths, genocide, and famine in WWII. WWII remains the deadliest war ever; WWI is among the top five.",
      },
    },
    {
      "@type": "Question",
      name: "How are WWII death tolls calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Historians combine military records, census comparisons (population before vs after the war), demographic modelling of 'excess deaths', and archival research. Military deaths are relatively well documented; civilian deaths from famine, disease and displacement are far harder to count, which is why totals for China and the USSR carry ranges of several million.",
      },
    },
  ],
};

const byCountry = [
  { c: "Soviet Union", deaths: "24–27M", note: "Highest absolute toll; ~13% of population" },
  { c: "China", deaths: "15–20M", note: "Second-highest; war + famine + occupation" },
  { c: "Germany", deaths: "6.6–8.8M", note: "Military + civilian + bombing" },
  { c: "Poland", deaths: "~5.7M", note: "Highest proportion: ~17% of population" },
  { c: "Dutch East Indies", deaths: "~3–4M", note: "Mostly famine under occupation" },
  { c: "Japan", deaths: "2.5–3.1M", note: "Incl. Hiroshima & Nagasaki (~200K)" },
  { c: "India (Bengal famine)", deaths: "2–3M", note: "War-induced famine, 1943" },
  { c: "Yugoslavia", deaths: "~1.0–1.7M", note: "Occupation + civil conflict" },
  { c: "France", deaths: "~600K", note: "Military + civilian" },
  { c: "United Kingdom", deaths: "~450K", note: "Incl. ~67K civilians from bombing" },
  { c: "United States", deaths: "~419K", note: "Almost entirely military" },
];

export default async function WW2DeathsPage() {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/world-war-2-deaths`;
  const article = articleSchema(canonical);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          <Link href="/" className="hover:text-slate-300">{m.name}</Link> / World War 2 Deaths
        </nav>

        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-rose-400/70">1939–1945 · Deadliest conflict in history</p>
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">World War 2 Deaths</h1>
        <p className="mb-8 max-w-2xl text-lg italic text-slate-400">
          Between 70 and 85 million people died — about 3% of everyone alive. Where they died, the split
          between soldiers and civilians, and how historians count a number this large.
        </p>

        <section aria-label="Featured answer" className="mb-10 rounded-md border-l-2 border-rose-400/60 bg-rose-400/5 p-5">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-rose-400/80">Short answer</p>
          <p className="text-base leading-relaxed text-slate-200">
            An estimated <strong className="text-white">70 to 85 million people</strong> died in World War 2 —
            about <strong className="text-white">3% of the world&apos;s population</strong>. Roughly{" "}
            <strong className="text-white">21–25 million were military</strong> and{" "}
            <strong className="text-white">50–55 million were civilian</strong> deaths. The{" "}
            <strong className="text-white">Soviet Union</strong> lost the most (24–27M), followed by{" "}
            <strong className="text-white">China</strong> (15–20M). It is the deadliest conflict in human history.
          </p>
        </section>

        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">The numbers</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "70–85M", l: "Total deaths" },
            { v: "~3%", l: "Of world population" },
            { v: "50–55M", l: "Civilian" },
            { v: "21–25M", l: "Military" },
          ].map((s, i) => (
            <div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center">
              <p className="font-mono text-xl text-rose-300">{s.v}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-400">
          WWII broke a grim historical pattern: for the first time in a major war, <strong className="text-slate-200">far
          more civilians died than soldiers</strong> — through genocide, famine, disease, forced labour and the
          bombing of cities. That is why the totals carry such wide ranges: military deaths are documented,
          but civilian deaths in China, the USSR and occupied territories can only be estimated.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">Deaths by country</h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60">
              <tr>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">Country</th>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">Deaths</th>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {byCountry.map((r, i) => (
                <tr key={i} className={i < 2 ? "bg-rose-400/5" : ""}>
                  <td className="px-4 py-2.5 text-slate-200">{r.c}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-rose-300/90">{r.deaths}</td>
                  <td className="px-4 py-2.5 text-slate-400">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-400">
          Poland lost the largest <em>share</em> of its people — around 17% — while the Soviet Union lost the
          largest absolute number. The United States, fighting away from its own soil, lost about 419,000,
          almost all military.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">The Holocaust</h2>
        <p className="mb-4 text-slate-400">
          About <strong className="text-slate-200">6 million Jews</strong> were murdered by Nazi Germany and
          its collaborators — roughly two-thirds of Europe&apos;s pre-war Jewish population. Counting other
          targeted groups — Roma, Soviet POWs, disabled people, Polish and Slavic civilians, political and
          religious prisoners — the total number of victims of Nazi genocide and mass killing reaches about{" "}
          <strong className="text-slate-200">11 million</strong>. These deaths are included within the war&apos;s
          civilian toll above.
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
            { href: "/", label: `${m.name} home — interactive map`, tag: "Tool" },
            { href: "/events", label: "All mass-death events", tag: "Database" },
            { href: "/black-death", label: "The Black Death — 75–200M dead", tag: "Pandemic" },
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
