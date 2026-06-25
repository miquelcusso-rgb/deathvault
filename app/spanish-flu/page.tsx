import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META, PLAGUE_CANONICAL_BASE } from "@/lib/brand";

type Lang = "en" | "es";

const T = {
  en: {
    title: "Spanish Flu (1918) — Death Toll, Timeline & Why It Was So Deadly",
    desc: "The 1918 Spanish flu killed an estimated 50 million people worldwide — more than World War I. Full timeline, death toll by country, why it targeted healthy young adults, and how it ended.",
    ogTitle: "Spanish Flu 1918 — The Deadliest Pandemic of the 20th Century",
    ogDesc: "50 million deaths · 1918–1920 · H1N1 · Why it killed healthy young adults and how it ended.",
    eyebrow: "1918–1920 · H1N1 influenza",
    h1: "The Spanish Flu of 1918",
    lede: "About 50 million dead in two years — more than the First World War. The deadliest pandemic of the 20th century, and the one that uniquely killed healthy young adults.",
    shortLabel: "Short answer",
    short: 'The 1918 Spanish flu killed an estimated <strong>50 million people worldwide</strong> (academic range 17–100M), infecting roughly <strong>a third of humanity</strong>. It was caused by an <em>H1N1 influenza A</em> virus, came in three to four waves, and was named after Spain only because neutral Spanish newspapers reported it freely while wartime censors elsewhere hid it.',
    tollH: "The death toll",
    stats: [["~50M","Deaths worldwide"],["~500M","Infected (⅓ of humanity)"],["2.5%","Of world population"],["675K","US deaths"]],
    tollP: "For comparison, World War I killed about 20 million. The Spanish flu killed more than twice that in a fraction of the time. India alone lost an estimated 12–17 million people — the heaviest national toll of the pandemic.",
    youngH: "Why young adults died",
    youngP: "Normal influenza kills a U-shaped distribution: the very young and the very old. The 1918 strain produced a <strong>W-shaped curve</strong> with a third, catastrophic peak among healthy <strong>20-to-40-year-olds</strong>. The leading explanation is a <strong>cytokine storm</strong>: the robust immune systems of young adults overreacted, flooding the lungs with fluid until victims drowned within days. Weaker immune systems were paradoxically less likely to mount the fatal overreaction.",
    tlH: "Timeline",
    tlHead: ["When", "Event"],
    wavesH: "The three waves",
    wavesP: "The <strong>first wave (spring 1918)</strong> was mild enough to be mistaken for seasonal flu. The <strong>second wave (autumn 1918)</strong> was the killer — a mutated, far more lethal form that caused most of the deaths in a few months. A <strong>third wave (early 1919)</strong> and, regionally, a fourth (1920) followed before the virus attenuated. The lesson — that a mild first wave can precede a deadly second — shaped the response to later pandemics including COVID-19.",
    faqH: "Frequently asked questions",
    relH: "Related",
    rel: [["/black-death","The Black Death — 75–200M dead","History"],["/bubonic-plague","Bubonic plague — symptoms & cases","Disease"],["/cholera","Cholera — cause & the 7 pandemics","Disease"],["/","{brand} home — interactive map","Tool"]],
    disclaimer: "Informational only — not medical advice.",
  },
  es: {
    title: "Gripe Española (1918) — Muertes, Cronología y Por Qué Fue Tan Mortal",
    desc: "La gripe española de 1918 mató a unos 50 millones de personas en el mundo — más que la Primera Guerra Mundial. Cronología, muertes por país, por qué atacó a adultos jóvenes sanos y cómo terminó.",
    ogTitle: "Gripe Española 1918 — La Pandemia Más Mortífera del Siglo XX",
    ogDesc: "50 millones de muertes · 1918–1920 · H1N1 · Por qué mató a adultos jóvenes sanos y cómo terminó.",
    eyebrow: "1918–1920 · Gripe H1N1",
    h1: "La Gripe Española de 1918",
    lede: "Unos 50 millones de muertos en dos años — más que la Primera Guerra Mundial. La pandemia más mortífera del siglo XX, y la única que mató sobre todo a adultos jóvenes sanos.",
    shortLabel: "Respuesta corta",
    short: 'La gripe española de 1918 mató a unos <strong>50 millones de personas en el mundo</strong> (rango académico 17–100M), infectando aproximadamente a <strong>un tercio de la humanidad</strong>. La causó un virus de la <em>gripe A H1N1</em>, llegó en tres o cuatro oleadas, y se llamó “española” solo porque la prensa neutral de España la cubrió libremente mientras la censura de guerra la ocultaba en el resto.',
    tollH: "El número de muertes",
    stats: [["~50M","Muertes mundiales"],["~500M","Infectados (⅓ de la humanidad)"],["2,5%","De la población mundial"],["675K","Muertes en EEUU"]],
    tollP: "Para comparar, la Primera Guerra Mundial mató a unos 20 millones. La gripe española mató más del doble en una fracción del tiempo. Solo India perdió unos 12–17 millones de personas — el mayor número nacional de la pandemia.",
    youngH: "Por qué murieron los adultos jóvenes",
    youngP: "La gripe normal mata con una distribución en U: los muy jóvenes y los muy mayores. La cepa de 1918 produjo una <strong>curva en W</strong> con un tercer pico catastrófico entre <strong>adultos de 20 a 40 años</strong> sanos. La explicación principal es una <strong>tormenta de citoquinas</strong>: los sistemas inmunitarios robustos de los jóvenes reaccionaban en exceso, inundando los pulmones de fluido hasta ahogar a la víctima en días. Los sistemas inmunitarios más débiles, paradójicamente, eran menos propensos a la sobrerreacción fatal.",
    tlH: "Cronología",
    tlHead: ["Cuándo", "Acontecimiento"],
    wavesH: "Las tres oleadas",
    wavesP: "La <strong>primera oleada (primavera 1918)</strong> fue lo bastante leve para confundirse con gripe estacional. La <strong>segunda oleada (otoño 1918)</strong> fue la asesina — una forma mutada y mucho más letal que causó la mayoría de las muertes en pocos meses. Una <strong>tercera oleada (principios de 1919)</strong> y, en algunas regiones, una cuarta (1920) siguieron antes de que el virus se atenuara. La lección — que una primera oleada leve puede preceder a una segunda mortal — moldeó la respuesta a pandemias posteriores, incluida la COVID-19.",
    faqH: "Preguntas frecuentes",
    relH: "Relacionado",
    rel: [["/black-death","La Peste Negra — 75–200M muertos","Historia"],["/bubonic-plague","Peste bubónica — síntomas y casos","Enfermedad"],["/cholera","Cólera — causa y las 7 pandemias","Enfermedad"],["/","{brand} — mapa interactivo","Herramienta"]],
    disclaimer: "Solo informativo — no es consejo médico.",
  },
} as const;

const TIMELINE = {
  en: [
    ["Mar 1918", "First documented cases at Camp Funston, Kansas — a leading origin candidate."],
    ["Apr–May 1918", "First wave spreads via US troop movements to Europe. Relatively mild."],
    ["May 1918", "Reaches Spain. Neutral Spanish press reports freely — giving the pandemic its misleading name."],
    ["Aug 1918", "Second wave erupts in Brest, Freetown and Boston almost simultaneously. Far deadlier."],
    ["Oct 1918", "Deadliest month in US history: ~195,000 Americans die in October alone."],
    ["1919", "Third wave. US President Wilson falls gravely ill during the Versailles conference."],
    ["1920", "Fourth wave in some regions. Virus attenuates; fades into seasonal flu."],
    ["2005", "Full 1918 H1N1 genome reconstructed from permafrost-preserved tissue."],
  ],
  es: [
    ["Mar 1918", "Primeros casos documentados en Camp Funston, Kansas — candidato principal a origen."],
    ["Abr–May 1918", "La primera oleada se propaga con los movimientos de tropas de EEUU a Europa. Relativamente leve."],
    ["May 1918", "Llega a España. La prensa neutral española informa libremente — dándole el nombre engañoso."],
    ["Ago 1918", "La segunda oleada estalla casi a la vez en Brest, Freetown y Boston. Mucho más mortal."],
    ["Oct 1918", "El mes más mortífero de la historia de EEUU: ~195.000 estadounidenses mueren solo en octubre."],
    ["1919", "Tercera oleada. El presidente de EEUU, Wilson, enferma gravemente durante la conferencia de Versalles."],
    ["1920", "Cuarta oleada en algunas regiones. El virus se atenúa; pasa a gripe estacional."],
    ["2005", "Se reconstruye el genoma completo del H1N1 de 1918 a partir de tejido conservado en permafrost."],
  ],
} as const;

const FAQ = {
  en: [
    ["How many people died in the Spanish flu?", "An estimated 50 million people worldwide between 1918 and 1920 (credible range 17–100M), infecting roughly 500 million — about a third of the world's population. It killed more people than the First World War."],
    ["Why was it called the Spanish flu if it didn't start in Spain?", "Wartime censorship. Combatant nations suppressed news to protect morale; neutral Spain reported freely — including King Alfonso XIII's illness — so the world wrongly assumed it started there. Its true origin (Kansas, France, China) is still debated."],
    ["What caused the Spanish flu?", "An H1N1 influenza A virus of avian origin. The genome was reconstructed in 2005 from preserved tissue, confirming it as an unusually aggressive H1N1 strain. Modern seasonal H1N1 descends from it."],
    ["Why did the Spanish flu kill healthy young adults?", "Unlike normal flu, the 1918 strain produced a 'W-shaped' mortality curve with a huge spike among 20–40 year-olds, likely from a cytokine storm — strong immune systems overreacted and flooded the lungs with fluid."],
    ["When did the Spanish flu start and end?", "Three to four waves. The first (spring 1918) was mild; the second (autumn 1918) was catastrophically deadly; a third hit in 1919 and a fourth in 1920. By 1920 it had attenuated into ordinary seasonal flu."],
    ["How did the Spanish flu end?", "Through herd immunity (so many were infected the virus ran out of hosts) and natural attenuation (it mutated toward less lethal forms). There was no vaccine — the influenza virus wasn't even identified until 1933."],
    ["How does the Spanish flu compare to COVID-19?", "Spanish flu killed ~50 million (~2.5% of the world); COVID-19 ~7 million confirmed (~0.1%). The Spanish flu uniquely killed healthy young adults; COVID-19 hit the elderly hardest. By population share the 1918 pandemic was far deadlier."],
    ["Could a Spanish flu-level pandemic happen again?", "A novel influenza strain is among the highest-probability global health threats. But defences that didn't exist in 1918 now do: rapid sequencing, antivirals, mRNA vaccines retargetable in weeks, and global surveillance."],
  ],
  es: [
    ["¿Cuántas personas murieron en la gripe española?", "Unos 50 millones en el mundo entre 1918 y 1920 (rango creíble 17–100M), infectando a unos 500 millones — cerca de un tercio de la población mundial. Mató a más gente que la Primera Guerra Mundial."],
    ["¿Por qué se llamó gripe española si no empezó en España?", "Por la censura de guerra. Las naciones en guerra ocultaban las noticias para no minar la moral; la España neutral informaba libremente — incluida la enfermedad del rey Alfonso XIII — así que el mundo creyó por error que había empezado allí. Su origen real (Kansas, Francia, China) sigue debatiéndose."],
    ["¿Qué causó la gripe española?", "Un virus de la gripe A H1N1 de origen aviar. El genoma se reconstruyó en 2005 a partir de tejido conservado, confirmándolo como una cepa H1N1 inusualmente agresiva. La H1N1 estacional moderna desciende de ella."],
    ["¿Por qué la gripe española mató a adultos jóvenes sanos?", "A diferencia de la gripe normal, la cepa de 1918 produjo una curva de mortalidad en 'W' con un enorme pico entre los 20 y 40 años, probablemente por una tormenta de citoquinas — los sistemas inmunitarios fuertes reaccionaban en exceso e inundaban los pulmones de fluido."],
    ["¿Cuándo empezó y terminó la gripe española?", "Tres o cuatro oleadas. La primera (primavera 1918) fue leve; la segunda (otoño 1918) catastróficamente mortal; una tercera en 1919 y una cuarta en 1920. Hacia 1920 se había atenuado en gripe estacional normal."],
    ["¿Cómo terminó la gripe española?", "Por inmunidad de grupo (tantos infectados que el virus se quedó sin huéspedes) y atenuación natural (mutó hacia formas menos letales). No hubo vacuna — el virus de la gripe ni siquiera se identificó hasta 1933."],
    ["¿Cómo se compara la gripe española con la COVID-19?", "La gripe española mató a ~50 millones (~2,5% del mundo); la COVID-19 a ~7 millones confirmados (~0,1%). La española mató sobre todo a adultos jóvenes sanos; la COVID-19 golpeó más a los mayores. Por proporción de población, la de 1918 fue mucho más mortal."],
    ["¿Podría volver a ocurrir una pandemia como la gripe española?", "Una nueva cepa de gripe está entre las amenazas sanitarias globales más probables. Pero hoy existen defensas que no había en 1918: secuenciación rápida, antivirales, vacunas de ARNm reorientables en semanas y vigilancia global."],
  ],
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const m = BRAND_META[detectBrand(h.get("host") ?? "")];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const enUrl = `${PLAGUE_CANONICAL_BASE}/spanish-flu`, esUrl = `${PLAGUE_CANONICAL_BASE}/es/spanish-flu`;
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
const articleSchema = (url: string, t: (typeof T)[Lang], lang: Lang) => ({ "@context": "https://schema.org", "@type": "Article", headline: t.title, description: t.desc, inLanguage: lang, datePublished: "2026-05-30", dateModified: "2026-05-31", author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" }, publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" }, mainEntityOfPage: url, image: `${url.replace(/\/(es\/)?spanish-flu$/, "")}/og-default.png` });

export default async function SpanishFluPage() {
  const h = await headers();
  const m = BRAND_META[detectBrand(h.get("host") ?? "")];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const prefix = lang === "es" ? "/es" : "";
  const canonical = `${PLAGUE_CANONICAL_BASE}${prefix}/spanish-flu`;
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
        <section className="mb-10 rounded-md border-l-2 border-rose-400/60 bg-rose-400/5 p-5">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-rose-400/80">{t.shortLabel}</p>
          <p className="text-base leading-relaxed text-slate-200" dangerouslySetInnerHTML={{ __html: t.short }} />
        </section>
        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.tollH}</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.stats.map((s, i) => (<div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center"><p className="font-mono text-xl text-rose-300">{s[0]}</p><p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s[1]}</p></div>))}
        </div>
        <p className="text-slate-400">{t.tollP}</p>
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.youngH}</h2>
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.youngP }} />
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.tlH}</h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-slate-800"><table className="w-full text-sm">
          <thead className="bg-slate-900/60"><tr><th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">{t.tlHead[0]}</th><th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">{t.tlHead[1]}</th></tr></thead>
          <tbody className="divide-y divide-slate-800/60">{TIMELINE[lang].map((r, i) => (<tr key={i}><td className="whitespace-nowrap px-4 py-2.5 font-mono text-rose-300/90">{r[0]}</td><td className="px-4 py-2.5 text-slate-300">{r[1]}</td></tr>))}</tbody>
        </table></div>
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.wavesH}</h2>
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.wavesP }} />
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.faqH}</h2>
        <div className="divide-y divide-slate-800/60 border-y border-slate-800/60">{FAQ[lang].map(([q, a], i) => (<div key={i} className="py-5"><p className="mb-2 font-medium text-slate-100">{q}</p><p className="text-slate-400">{a}</p></div>))}</div>
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.relH}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{t.rel.map((c, i) => (<Link key={i} href={prefix + c[0]} className="block rounded-md border border-slate-800 p-4 transition hover:border-rose-400/40"><p className="text-[0.6rem] uppercase tracking-[0.28em] text-rose-400/70">{c[2]}</p><p className="mt-1 italic text-slate-200">{c[1].replace("{brand}", m.name)}</p></Link>))}</div>
        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-slate-600">© 2026 Furiosa Studio · Part of the <a href="https://furiosadata.com" rel="dofollow" className="underline">Furiosa Data Tools Network</a></p>
        <p className="mt-3 text-center text-[0.65rem] text-slate-600">{t.disclaimer}</p>
      </article>
    </main>
  );
}
