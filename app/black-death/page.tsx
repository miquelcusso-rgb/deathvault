import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/black-death`;
  return {
    title: "Black Death — Complete History, Death Toll, Timeline 1346–1353",
    description:
      "The Black Death killed an estimated 75 to 200 million people across Eurasia between 1346 and 1353 — up to 60% of Europe's population. Full timeline, cause, spread map and modern science of the deadliest pandemic in recorded history.",
    alternates: {
      canonical,
      languages: {
        en: canonical,
        es: `${m.url}/es/black-death`,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: "Black Death — The Deadliest Pandemic in History",
      description:
        "75–200 million deaths · 1346–1353 · Yersinia pestis · Complete history, timeline and spread map.",
      url: canonical,
      type: "article",
      images: [{ url: `${m.url}/og-default.png`, width: 1200, height: 630, alt: "Black Death" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Black Death — The Deadliest Pandemic in History",
      description: "75–200 million deaths · 1346–1353 · Complete history.",
      images: [`${m.url}/og-default.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

const articleSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Black Death — The Deadliest Pandemic in Recorded History",
  description:
    "Comprehensive guide to the Black Death (1346–1353): cause, death toll, geographic spread, social impact and modern scientific understanding of Yersinia pestis.",
  datePublished: "2026-05-30",
  dateModified: "2026-05-30",
  author: {
    "@type": "Organization",
    name: "Furiosa Studio",
    url: "https://furiosadata.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Furiosa Studio",
    url: "https://furiosadata.com",
  },
  mainEntityOfPage: url,
  image: `${url.replace("/black-death", "")}/og-default.png`,
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many people died in the Black Death?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern estimates put the Black Death death toll at 75 to 200 million people across Eurasia and North Africa between 1346 and 1353 — roughly 30 to 60% of Europe's pre-plague population. It remains the deadliest single pandemic event ever documented in absolute population share, though COVID-19 has surpassed it in raw deaths.",
      },
    },
    {
      "@type": "Question",
      name: "What caused the Black Death?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Black Death was caused by the bacterium Yersinia pestis, confirmed by 21st-century DNA analysis of victims' remains. The bacterium was carried by fleas living on black rats; humans became infected through flea bites (bubonic plague) or by inhaling droplets from infected lungs (pneumonic plague). The pneumonic form transmitted person-to-person and is what made the outbreak spread so fast.",
      },
    },
    {
      "@type": "Question",
      name: "When did the Black Death start and end?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The pandemic's European phase ran from 1346 to 1353. It first appeared on the Crimean coast in October 1346, reached Constantinople in summer 1347, Marseille and Genoa by autumn 1347, Paris by June 1348, London by November 1348, and Scandinavia and Russia by 1351. Local outbreaks continued for centuries — the last major European epidemic was the 1665–1666 Great Plague of London.",
      },
    },
    {
      "@type": "Question",
      name: "Where did the Black Death come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The strain that caused the European pandemic originated in the Tian Shan mountains of present-day Kyrgyzstan in the 1330s, confirmed in 2022 by ancient-DNA studies of medieval gravesites. From Central Asia it spread west along the Silk Road, reached the Crimea by 1346, and from there spread by ship around the Mediterranean.",
      },
    },
    {
      "@type": "Question",
      name: "How did people survive the Black Death?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Survival mostly came down to luck. There was no effective medical treatment. People who fled crowded cities for the countryside fared better. A small fraction of the European population carries the CCR5-Δ32 gene variant, which research published in 2022 linked to enhanced survival against Yersinia pestis — the strongest natural-selection event ever measured in humans. The bacterium also varies in lethality, and pneumonic plague had near-100% mortality untreated, while bubonic was 30–75%.",
      },
    },
    {
      "@type": "Question",
      name: "Can the Black Death happen again?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yersinia pestis still exists. The CDC records about 1,000 to 2,000 human cases per year worldwide, mostly bubonic, mostly in Madagascar, the Democratic Republic of Congo and Peru. The United States averages around 7 cases per year, mainly in the rural Southwest. Modern antibiotics (gentamicin, doxycycline) are highly effective when treatment starts within 24 hours. A pandemic at medieval scale is essentially impossible given current public-health systems — but small outbreaks happen every year.",
      },
    },
    {
      "@type": "Question",
      name: "What was the social impact of the Black Death?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The labour shortage that followed the pandemic broke the feudal economic order across Europe. Peasants — who suddenly had bargaining power — saw real wages rise 30–100% in the following decades. The Church's authority was permanently damaged by its inability to explain or stop the disease. Persecutions of Jews and other minorities exploded. Art shifted toward macabre themes (the Danse Macabre). Many historians mark the Black Death as the end of the medieval period.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Black Death compare to COVID-19?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mortality rate: Black Death untreated was 30–75% (bubonic) or near-100% (pneumonic); COVID-19 case-fatality rate hovered around 0.5–2% depending on age and variant. Absolute deaths: COVID-19 has officially passed 7 million, with WHO excess-mortality estimates between 15 and 20 million — surpassing the Black Death in raw numbers. Population share: the Black Death killed roughly 1 in 3 people in its region in 7 years; COVID-19 killed roughly 1 in 400 globally over 3 years. By every share-of-population metric the Black Death remains incomparably deadlier.",
      },
    },
  ],
};

const timeline: { year: string; event: string }[] = [
  { year: "1331–1334", event: "First plague outbreaks recorded in Yuan-dynasty China (Hopei, Shanxi)." },
  { year: "Oct 1346", event: "Pestilence reaches the Crimean port of Caffa (now Feodosia)." },
  { year: "1347", event: "Genoese ships carry the disease to Messina, Sicily. From there to Marseille and Genoa within weeks." },
  { year: "Jun 1348", event: "Black Death reaches Paris; mortality 800/day at peak." },
  { year: "Nov 1348", event: "London hit. Up to 60,000 dead by spring 1349 — half the city." },
  { year: "1349", event: "Reaches Norway via a ghost ship at Bergen; Iceland and Greenland follow within months." },
  { year: "1350", event: "Sweden and northern Germany. Norwegian population drops ~50%." },
  { year: "1351", event: "Reaches Moscow. Russian principalities lose ~25% of population." },
  { year: "1353", event: "European phase ends. Outbreaks continue in waves for the next 300 years." },
  { year: "1665–1666", event: "Last major European epidemic: the Great Plague of London (~100,000 deaths)." },
  { year: "1894", event: "Alexandre Yersin identifies Yersinia pestis in Hong Kong during the third plague pandemic." },
  { year: "2011", event: "Ancient-DNA analysis confirms Y. pestis in 14th-century London graves." },
  { year: "2022", event: "Gravesites in Kyrgyzstan dated 1338–1339 confirmed as the pandemic's origin." },
];

export default async function BlackDeathPage() {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const canonical = `${m.url}/black-death`;
  const article = articleSchema(canonical);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500"
        >
          <Link href="/" className="hover:text-slate-300">
            {m.name}
          </Link>{" "}
          / Black Death
        </nav>

        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-rose-400/70">
          1346–1353 · Yersinia pestis
        </p>
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
          The Black Death
        </h1>
        <p className="mb-8 max-w-2xl text-lg italic text-slate-400">
          75 to 200 million dead across Eurasia in seven years — the deadliest
          pandemic ever recorded by share of population. A complete history of
          where it came from, how it spread, and what we now know happened.
        </p>

        <section
          aria-label="Featured answer"
          className="mb-10 rounded-md border-l-2 border-rose-400/60 bg-rose-400/5 p-5"
        >
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-rose-400/80">
            Short answer
          </p>
          <p className="text-base leading-relaxed text-slate-200">
            The Black Death killed an estimated{" "}
            <strong className="text-white">
              75 to 200 million people
            </strong>{" "}
            between 1346 and 1353 — roughly{" "}
            <strong className="text-white">30 to 60% of Europe&apos;s population</strong>.
            It was caused by the bacterium <em>Yersinia pestis</em>, transmitted
            by fleas on black rats and (in its pneumonic form) by airborne
            droplets between humans. It originated in Central Asia in the 1330s
            and reached Europe via the Silk Road and the Crimea.
          </p>
        </section>

        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          The death toll
        </h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "75–200M", l: "Total deaths (Eurasia)" },
            { v: "30–60%", l: "Europe's population" },
            { v: "7 years", l: "Peak phase" },
            { v: "≈ 1 in 3", l: "Europeans died" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center"
            >
              <p className="font-mono text-xl text-rose-300">{s.v}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
                {s.l}
              </p>
            </div>
          ))}
        </div>
        <p className="text-slate-400">
          The estimates have wide ranges because medieval record-keeping was
          patchy and the bacterium killed entire communities before anything
          could be written down. Modern demographic modelling (Benedictow 2004,
          Spyrou et al. 2022) converges on{" "}
          <strong className="text-slate-200">~50 million deaths in Europe alone</strong>{" "}
          and a similar number across the Middle East, North Africa and Asia.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          Where it came from
        </h2>
        <p className="mb-4 text-slate-400">
          Until 2022, the geographic origin of the pandemic was disputed. That
          year, a multi-institution team led by Maria Spyrou published
          ancient-DNA analysis of skeletons from two cemeteries in the Tian Shan
          foothills of Kyrgyzstan, dated 1338–1339. The genomes contained the
          ancestor of every later <em>Yersinia pestis</em> strain — the
          &quot;Big Bang&quot; from which all medieval and modern plague
          descends.
        </p>
        <p className="mb-4 text-slate-400">
          From Central Asia the disease moved west along Silk Road caravan
          routes. By October 1346 it had reached the Genoese trading colony at
          Caffa on the Black Sea. Mongol forces besieging the city — themselves
          infected — were said to have catapulted plague corpses over the walls
          in one of the earliest documented uses of biological warfare. Genoese
          galleys fleeing the siege carried the disease to Messina, Sicily, and
          from there to the rest of Mediterranean Europe.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          Timeline of the pandemic
        </h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60">
              <tr>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Year
                </th>
                <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Event
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {timeline.map((t, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-rose-300/90">
                    {t.year}
                  </td>
                  <td className="px-4 py-2.5 text-slate-300">{t.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          The pathogen
        </h2>
        <p className="mb-4 text-slate-400">
          <em>Yersinia pestis</em> is a gram-negative, rod-shaped bacterium
          first isolated by Alexandre Yersin in 1894 during the Hong Kong plague
          outbreak. It has three clinical forms:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-400">
          <li>
            <strong className="text-slate-200">Bubonic plague</strong> — flea
            bite → swollen lymph nodes (&quot;buboes&quot;), fever, gangrene.
            30–75% mortality untreated. Most common medieval form.
          </li>
          <li>
            <strong className="text-slate-200">Pneumonic plague</strong> — lung
            infection, airborne transmission between humans. Near-100% mortality
            within 2–3 days untreated. The fast-killing form that powered the
            14th-century outbreak.
          </li>
          <li>
            <strong className="text-slate-200">Septicemic plague</strong> —
            bloodstream infection, blackening of fingers and toes (origin of the
            name &quot;Black&quot; Death). Universally fatal untreated.
          </li>
        </ul>
        <p className="mb-4 text-slate-400">
          The bacterium still exists. Modern antibiotics — gentamicin,
          ciprofloxacin, doxycycline — are highly effective when treatment
          begins within 24 hours. Without treatment, mortality remains close to
          medieval levels.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          Social aftermath
        </h2>
        <p className="mb-4 text-slate-400">
          The pandemic broke the feudal economic order across western Europe.
          With a third of the labour force gone, the surviving peasants
          discovered they had bargaining power for the first time. Real wages
          rose 30–100% over the following decades. Attempts to legally cap
          wages (England&apos;s 1351 Statute of Labourers) largely failed.
          Within two generations the manorial system was effectively dead.
        </p>
        <p className="mb-4 text-slate-400">
          The Church&apos;s authority took a permanent blow. Clergy died at
          higher rates than the general population (they administered to the
          sick), and the visible failure of prayer, processions and relics to
          stop the disease pushed many survivors toward private devotion,
          mysticism, and later the Reformation.
        </p>
        <p className="mb-4 text-slate-400">
          Persecution of Jews, lepers and other minorities accelerated. The 1348
          Strasbourg massacre — in which roughly 2,000 Jews were burned alive on
          a single day — was one of dozens of pogroms blaming the disease on
          well-poisoning conspiracies. Art took a macabre turn: the Danse
          Macabre, memento-mori imagery, the &quot;triumph of Death&quot;
          motif.
        </p>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {faqSchema.mainEntity.map((q, i) => (
            <div key={i} className="py-5">
              <p className="mb-2 font-medium text-slate-100">{q.name}</p>
              <p className="text-slate-400">{q.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <hr className="my-10 border-slate-800" />

        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">
          Related
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { href: "/", label: `${m.name} home — interactive map`, tag: "Tool" },
            { href: "/events", label: "All historical events", tag: "Database" },
            { href: "/compare", label: "Compare pandemics side by side", tag: "Tool" },
            { href: "/statistics", label: "Aggregate death statistics", tag: "Data" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-md border border-slate-800 p-4 transition hover:border-rose-400/40"
            >
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-rose-400/70">
                {c.tag}
              </p>
              <p className="mt-1 italic text-slate-200">{c.label}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-slate-600">
          © 2026 Furiosa Studio · Part of the{" "}
          <a
            href="https://furiosadata.com"
            rel="dofollow"
            className="underline"
          >
            Furiosa Data Tools Network
          </a>
        </p>
      </article>
    </main>
  );
}
