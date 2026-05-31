import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

type Lang = "en" | "es";

const T = {
  en: {
    title: "World War 2 Deaths — How Many People Died in WWII (by Country)",
    desc: "An estimated 70–85 million people died in World War 2 — about 3% of the world's population. Full breakdown of WWII deaths by country, military vs civilian, the Holocaust, and how the toll was counted.",
    ogTitle: "World War 2 Deaths — How Many People Died in WWII",
    ogDesc: "70–85 million deaths · ~3% of humanity · full breakdown by country, military vs civilian, the Holocaust.",
    eyebrow: "1939–1945 · Deadliest conflict in history",
    h1: "World War 2 Deaths",
    lede: "Between 70 and 85 million people died — about 3% of everyone alive. Where they died, the split between soldiers and civilians, and how historians count a number this large.",
    shortLabel: "Short answer",
    short: 'An estimated <strong class="text-white">70 to 85 million people</strong> died in World War 2 — about <strong class="text-white">3% of the world\'s population</strong>. Roughly <strong class="text-white">21–25 million were military</strong> and <strong class="text-white">50–55 million were civilian</strong> deaths. The <strong class="text-white">Soviet Union</strong> lost the most (24–27M), followed by <strong class="text-white">China</strong> (15–20M). It is the deadliest conflict in human history.',
    numsH: "The numbers",
    stats: [["70–85M","Total deaths"],["~3%","Of world population"],["50–55M","Civilian"],["21–25M","Military"]],
    numsP: "WWII broke a grim historical pattern: for the first time in a major war, <strong class=\"text-slate-200\">far more civilians died than soldiers</strong> — through genocide, famine, disease, forced labour and the bombing of cities. That is why the totals carry such wide ranges: military deaths are documented, but civilian deaths in China, the USSR and occupied territories can only be estimated.",
    countryH: "Deaths by country",
    countryHead: ["Country", "Deaths", "Note"],
    countryP: "Poland lost the largest <em>share</em> of its people — around 17% — while the Soviet Union lost the largest absolute number. The United States, fighting away from its own soil, lost about 419,000, almost all military.",
    holoH: "The Holocaust",
    holoP: 'About <strong class="text-slate-200">6 million Jews</strong> were murdered by Nazi Germany and its collaborators — roughly two-thirds of Europe\'s pre-war Jewish population. Counting other targeted groups — Roma, Soviet POWs, disabled people, Polish and Slavic civilians, political and religious prisoners — the total number of victims of Nazi genocide and mass killing reaches about <strong class="text-slate-200">11 million</strong>. These deaths are included within the war\'s civilian toll above.',
    faqH: "Frequently asked questions",
    relH: "Related",
    rel: [["/","{brand} home — interactive map","Tool"],["/events","All mass-death events","Database"],["/black-death","The Black Death — 75–200M dead","Pandemic"],["/statistics","Aggregate death statistics","Data"]],
  },
  es: {
    title: "Muertes de la Segunda Guerra Mundial — Cuántos Murieron (por País)",
    desc: "Se estima que entre 70 y 85 millones de personas murieron en la Segunda Guerra Mundial — alrededor del 3% de la población mundial. Desglose completo de las muertes por país, militares vs civiles, el Holocausto y cómo se contabilizó.",
    ogTitle: "Muertes de la Segunda Guerra Mundial — Cuántos Murieron",
    ogDesc: "70–85 millones de muertos · ~3% de la humanidad · desglose por país, militares vs civiles, el Holocausto.",
    eyebrow: "1939–1945 · El conflicto más mortal de la historia",
    h1: "Muertes de la Segunda Guerra Mundial",
    lede: "Entre 70 y 85 millones de personas murieron — alrededor del 3% de toda la humanidad. Dónde murieron, el reparto entre soldados y civiles, y cómo los historiadores cuentan una cifra tan enorme.",
    shortLabel: "Respuesta corta",
    short: 'Se estima que <strong class="text-white">entre 70 y 85 millones de personas</strong> murieron en la Segunda Guerra Mundial — alrededor del <strong class="text-white">3% de la población mundial</strong>. Aproximadamente <strong class="text-white">21–25 millones fueron militares</strong> y <strong class="text-white">50–55 millones civiles</strong>. La <strong class="text-white">Unión Soviética</strong> perdió la mayor cifra (24–27M), seguida de <strong class="text-white">China</strong> (15–20M). Es el conflicto más mortal de la historia humana.',
    numsH: "Las cifras",
    stats: [["70–85M","Muertes totales"],["~3%","De la población mundial"],["50–55M","Civiles"],["21–25M","Militares"]],
    numsP: "La SGM rompió un patrón histórico sombrío: por primera vez en una gran guerra, <strong class=\"text-slate-200\">murieron muchos más civiles que soldados</strong> — por genocidio, hambruna, enfermedad, trabajos forzados y el bombardeo de ciudades. Por eso los totales llevan rangos tan amplios: las muertes militares están documentadas, pero las civiles en China, la URSS y los territorios ocupados solo pueden estimarse.",
    countryH: "Muertes por país",
    countryHead: ["País", "Muertes", "Nota"],
    countryP: "Polonia perdió la mayor <em>proporción</em> de su población — alrededor del 17% — mientras que la Unión Soviética perdió la mayor cifra absoluta. Estados Unidos, combatiendo lejos de su territorio, perdió unos 419.000, casi todos militares.",
    holoH: "El Holocausto",
    holoP: 'Alrededor de <strong class="text-slate-200">6 millones de judíos</strong> fueron asesinados por la Alemania nazi y sus colaboradores — unos dos tercios de la población judía europea de antes de la guerra. Contando otros grupos perseguidos — gitanos, prisioneros de guerra soviéticos, personas con discapacidad, civiles polacos y eslavos, presos políticos y religiosos — el número total de víctimas del genocidio y la matanza nazi alcanza unos <strong class="text-slate-200">11 millones</strong>. Estas muertes están incluidas en el cómputo civil anterior.',
    faqH: "Preguntas frecuentes",
    relH: "Relacionado",
    rel: [["/","{brand} — mapa interactivo","Herramienta"],["/events","Todos los eventos de mortalidad masiva","Base de datos"],["/black-death","La Peste Negra — 75–200M muertos","Pandemia"],["/statistics","Estadísticas agregadas de mortalidad","Datos"]],
  },
} as const;

const BY_COUNTRY = {
  en: [
    ["Soviet Union", "24–27M", "Highest absolute toll; ~13% of population"],
    ["China", "15–20M", "Second-highest; war + famine + occupation"],
    ["Germany", "6.6–8.8M", "Military + civilian + bombing"],
    ["Poland", "~5.7M", "Highest proportion: ~17% of population"],
    ["Dutch East Indies", "~3–4M", "Mostly famine under occupation"],
    ["Japan", "2.5–3.1M", "Incl. Hiroshima & Nagasaki (~200K)"],
    ["India (Bengal famine)", "2–3M", "War-induced famine, 1943"],
    ["Yugoslavia", "~1.0–1.7M", "Occupation + civil conflict"],
    ["France", "~600K", "Military + civilian"],
    ["United Kingdom", "~450K", "Incl. ~67K civilians from bombing"],
    ["United States", "~419K", "Almost entirely military"],
  ],
  es: [
    ["Unión Soviética", "24–27M", "Mayor cifra absoluta; ~13% de la población"],
    ["China", "15–20M", "Segunda mayor; guerra + hambruna + ocupación"],
    ["Alemania", "6,6–8,8M", "Militares + civiles + bombardeos"],
    ["Polonia", "~5,7M", "Mayor proporción: ~17% de la población"],
    ["Indias Orientales Neerlandesas", "~3–4M", "Sobre todo hambruna bajo ocupación"],
    ["Japón", "2,5–3,1M", "Incl. Hiroshima y Nagasaki (~200K)"],
    ["India (hambruna de Bengala)", "2–3M", "Hambruna provocada por la guerra, 1943"],
    ["Yugoslavia", "~1,0–1,7M", "Ocupación + conflicto civil"],
    ["Francia", "~600K", "Militares + civiles"],
    ["Reino Unido", "~450K", "Incl. ~67K civiles por bombardeos"],
    ["Estados Unidos", "~419K", "Casi enteramente militares"],
  ],
} as const;

const FAQ = {
  en: [
    ["How many people died in World War 2?", "An estimated 70 to 85 million people died in World War 2 (1939–1945) — roughly 3% of the world's 1940 population of about 2.3 billion. The wide range reflects uncertainty in civilian, famine and disease deaths, especially in China and the Soviet Union. It is the deadliest conflict in human history by absolute numbers."],
    ["Which country lost the most people in WWII?", "The Soviet Union, by a wide margin: an estimated 24–27 million deaths, military and civilian combined. China was second with 15–20 million. Germany lost 6.6–8.8 million and Poland about 5.7 million (the highest proportion of any country, around 17% of its pre-war population)."],
    ["How many soldiers vs civilians died in WWII?", "Of the ~70–85 million total, roughly 21–25 million were military deaths and 50–55 million were civilian deaths — including those killed by genocide, famine, disease and strategic bombing. WWII was unusual in that civilian deaths far outnumbered military ones."],
    ["How many people died in the Holocaust?", "About 6 million Jews were murdered in the Holocaust — roughly two-thirds of Europe's pre-war Jewish population. Nazi Germany and its collaborators also killed millions of others, including Roma, Soviet prisoners of war, disabled people, Polish civilians and political prisoners, bringing the total to roughly 11 million."],
    ["How many Americans died in World War 2?", "The United States suffered about 419,000 deaths in WWII, overwhelmingly military (around 416,000) with relatively few civilian deaths because the war was not fought on the US mainland."],
    ["How does WWII compare to WWI in deaths?", "World War 1 (1914–1918) killed about 17–20 million people. World War 2 killed 70–85 million — roughly four times as many — largely because of the scale of civilian deaths, genocide, and famine in WWII."],
    ["How are WWII death tolls calculated?", "Historians combine military records, census comparisons (population before vs after the war), demographic modelling of 'excess deaths', and archival research. Civilian deaths from famine, disease and displacement are far harder to count, which is why totals for China and the USSR carry ranges of several million."],
  ],
  es: [
    ["¿Cuántas personas murieron en la Segunda Guerra Mundial?", "Se estima que entre 70 y 85 millones de personas murieron en la Segunda Guerra Mundial (1939–1945) — alrededor del 3% de la población mundial de 1940, unos 2.300 millones. El amplio rango refleja la incertidumbre sobre las muertes civiles, por hambruna y por enfermedad, especialmente en China y la Unión Soviética. Es el conflicto más mortal de la historia humana en cifras absolutas."],
    ["¿Qué país perdió más personas en la SGM?", "La Unión Soviética, por amplio margen: unos 24–27 millones de muertes, militares y civiles combinadas. China fue segunda con 15–20 millones. Alemania perdió 6,6–8,8 millones y Polonia unos 5,7 millones (la mayor proporción de cualquier país, alrededor del 17% de su población de antes de la guerra)."],
    ["¿Cuántos soldados vs civiles murieron en la SGM?", "Del total de ~70–85 millones, aproximadamente 21–25 millones fueron muertes militares y 50–55 millones civiles — incluidas las causadas por genocidio, hambruna, enfermedad y bombardeo estratégico. La SGM fue inusual porque las muertes civiles superaron con creces a las militares."],
    ["¿Cuántas personas murieron en el Holocausto?", "Alrededor de 6 millones de judíos fueron asesinados en el Holocausto — unos dos tercios de la población judía europea de antes de la guerra. La Alemania nazi y sus colaboradores también mataron a millones de otros, incluidos gitanos, prisioneros de guerra soviéticos, personas con discapacidad, civiles polacos y presos políticos, llevando el total a unos 11 millones."],
    ["¿Cuántos estadounidenses murieron en la Segunda Guerra Mundial?", "Estados Unidos sufrió unas 419.000 muertes en la SGM, abrumadoramente militares (unas 416.000) con relativamente pocas muertes civiles porque la guerra no se libró en territorio continental estadounidense."],
    ["¿Cómo se compara la SGM con la Primera Guerra Mundial en muertes?", "La Primera Guerra Mundial (1914–1918) mató a unos 17–20 millones de personas. La Segunda mató a 70–85 millones — unas cuatro veces más — en gran parte por la escala de muertes civiles, genocidio y hambruna en la SGM."],
    ["¿Cómo se calculan las cifras de muertos de la SGM?", "Los historiadores combinan registros militares, comparaciones censales (población antes y después de la guerra), modelos demográficos de 'muertes en exceso' e investigación de archivo. Las muertes civiles por hambruna, enfermedad y desplazamiento son mucho más difíciles de contar, por eso los totales de China y la URSS llevan rangos de varios millones."],
  ],
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const m = BRAND_META[detectBrand(h.get("host") ?? "")];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const enUrl = `${m.url}/world-war-2-deaths`, esUrl = `${m.url}/es/world-war-2-deaths`;
  const canonical = lang === "es" ? esUrl : enUrl;
  return {
    title: t.title, description: t.desc,
    alternates: { canonical, languages: { en: enUrl, es: esUrl, "x-default": enUrl } },
    openGraph: { title: t.ogTitle, description: t.ogDesc, url: canonical, type: "article", locale: lang === "es" ? "es_ES" : "en_US", images: [{ url: `${m.url}/og-default.png`, width: 1200, height: 630, alt: t.h1 }] },
    twitter: { card: "summary_large_image", title: t.ogTitle, description: t.ogDesc, images: [`${m.url}/og-default.png`] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

const faqSchema = (lang: Lang) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ[lang].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
const articleSchema = (url: string, t: (typeof T)[Lang], lang: Lang) => ({ "@context": "https://schema.org", "@type": "Article", headline: t.title, description: t.desc, inLanguage: lang, datePublished: "2026-05-30", dateModified: "2026-05-31", author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" }, publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" }, mainEntityOfPage: url, image: `${url.replace(/\/(es\/)?world-war-2-deaths$/, "")}/og-default.png` });

export default async function WW2DeathsPage() {
  const h = await headers();
  const m = BRAND_META[detectBrand(h.get("host") ?? "")];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const prefix = lang === "es" ? "/es" : "";
  const canonical = `${m.url}${prefix}/world-war-2-deaths`;
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(canonical, t, lang)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(lang)) }} />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
          <Link href={prefix + "/"} className="hover:text-slate-300">{m.name}</Link> / {t.h1}
        </nav>
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-rose-400/70">{t.eyebrow}</p>
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">{t.h1}</h1>
        <p className="mb-8 max-w-2xl text-lg italic text-slate-400">{t.lede}</p>
        <section aria-label="Featured answer" className="mb-10 rounded-md border-l-2 border-rose-400/60 bg-rose-400/5 p-5">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-rose-400/80">{t.shortLabel}</p>
          <p className="text-base leading-relaxed text-slate-200" dangerouslySetInnerHTML={{ __html: t.short }} />
        </section>
        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.numsH}</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.stats.map((s, i) => (<div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center"><p className="font-mono text-xl text-rose-300">{s[0]}</p><p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s[1]}</p></div>))}
        </div>
        <p className="text-slate-400" dangerouslySetInnerHTML={{ __html: t.numsP }} />
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.countryH}</h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-slate-800"><table className="w-full text-sm">
          <thead className="bg-slate-900/60"><tr>{t.countryHead.map((hd, i) => (<th key={i} className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">{hd}</th>))}</tr></thead>
          <tbody className="divide-y divide-slate-800/60">{BY_COUNTRY[lang].map((r, i) => (<tr key={i} className={i < 2 ? "bg-rose-400/5" : ""}><td className="px-4 py-2.5 text-slate-200">{r[0]}</td><td className="whitespace-nowrap px-4 py-2.5 font-mono text-rose-300/90">{r[1]}</td><td className="px-4 py-2.5 text-slate-400">{r[2]}</td></tr>))}</tbody>
        </table></div>
        <p className="text-slate-400" dangerouslySetInnerHTML={{ __html: t.countryP }} />
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.holoH}</h2>
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.holoP }} />
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.faqH}</h2>
        <div className="divide-y divide-slate-800/60 border-y border-slate-800/60">{FAQ[lang].map(([q, a], i) => (<div key={i} className="py-5"><p className="mb-2 font-medium text-slate-100">{q}</p><p className="text-slate-400">{a}</p></div>))}</div>
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.relH}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{t.rel.map((c, i) => (<Link key={i} href={prefix + c[0]} className="block rounded-md border border-slate-800 p-4 transition hover:border-rose-400/40"><p className="text-[0.6rem] uppercase tracking-[0.28em] text-rose-400/70">{c[2]}</p><p className="mt-1 italic text-slate-200">{c[1].replace("{brand}", m.name)}</p></Link>))}</div>
        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-slate-600">© 2026 Furiosa Studio · Part of the <a href="https://furiosadata.com" rel="dofollow" className="underline">Furiosa Data Tools Network</a></p>
      </article>
    </main>
  );
}
