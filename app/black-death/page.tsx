import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META } from "@/lib/brand";

type Lang = "en" | "es";
async function getLang(): Promise<Lang> {
  const h = await headers();
  return h.get("x-locale") === "es" ? "es" : "en";
}

const T = {
  en: {
    title: "Black Death — Complete History, Death Toll, Timeline 1346–1353",
    desc: "The Black Death killed an estimated 75 to 200 million people across Eurasia between 1346 and 1353 — up to 60% of Europe's population. Full timeline, cause, spread map and modern science of the deadliest pandemic in recorded history.",
    ogTitle: "Black Death — The Deadliest Pandemic in History",
    ogDesc: "75–200 million deaths · 1346–1353 · Yersinia pestis · Complete history, timeline and spread map.",
    eyebrow: "1346–1353 · Yersinia pestis",
    h1: "The Black Death",
    lede: "75 to 200 million dead across Eurasia in seven years — the deadliest pandemic ever recorded by share of population. A complete history of where it came from, how it spread, and what we now know happened.",
    shortLabel: "Short answer",
    short: 'The Black Death killed an estimated <strong>75 to 200 million people</strong> between 1346 and 1353 — roughly <strong>30 to 60% of Europe’s population</strong>. It was caused by the bacterium <em>Yersinia pestis</em>, transmitted by fleas on black rats and (in its pneumonic form) by airborne droplets between humans. It originated in Central Asia in the 1330s and reached Europe via the Silk Road and the Crimea.',
    tollH: "The death toll",
    stats: [["75–200M","Total deaths (Eurasia)"],["30–60%","Europe's population"],["7 years","Peak phase"],["≈ 1 in 3","Europeans died"]],
    tollP: "The estimates have wide ranges because medieval record-keeping was patchy and the bacterium killed entire communities before anything could be written down. Modern demographic modelling (Benedictow 2004, Spyrou et al. 2022) converges on <strong>~50 million deaths in Europe alone</strong> and a similar number across the Middle East, North Africa and Asia.",
    originH: "Where it came from",
    originP1: "Until 2022, the geographic origin of the pandemic was disputed. That year, a multi-institution team led by Maria Spyrou published ancient-DNA analysis of skeletons from two cemeteries in the Tian Shan foothills of Kyrgyzstan, dated 1338–1339. The genomes contained the ancestor of every later <em>Yersinia pestis</em> strain — the “Big Bang” from which all medieval and modern plague descends.",
    originP2: "From Central Asia the disease moved west along Silk Road caravan routes. By October 1346 it had reached the Genoese trading colony at Caffa on the Black Sea. Genoese galleys fleeing the siege carried the disease to Messina, Sicily, and from there to the rest of Mediterranean Europe.",
    tlH: "Timeline of the pandemic",
    tlHead: ["Year","Event"],
    socialH: "Social aftermath",
    socialP: "The pandemic broke the feudal economic order across western Europe. With a third of the labour force gone, surviving peasants gained bargaining power for the first time; real wages rose 30–100% over the following decades. The Church's authority took a permanent blow, and persecutions of minorities accelerated. Many historians mark the Black Death as the end of the medieval period.",
    faqH: "Frequently asked questions",
    relH: "Related",
    rel: [
      ["/spanish-flu","Spanish Flu 1918 — 50M dead","Pandemic"],
      ["/bubonic-plague","Bubonic plague — symptoms & cases","Disease"],
      ["/cholera","Cholera — cause, symptoms, 7 pandemics","Disease"],
      ["/","{brand} home — interactive map","Tool"],
    ],
    disclaimer: "Informational only — not medical advice.",
  },
  es: {
    title: "La Peste Negra — Historia, Muertes y Cronología 1346–1353",
    desc: "La Peste Negra mató a entre 75 y 200 millones de personas en Eurasia entre 1346 y 1353 — hasta el 60% de la población de Europa. Cronología completa, causa, mapa de propagación y la ciencia moderna de la pandemia más mortífera de la historia.",
    ogTitle: "La Peste Negra — La Pandemia Más Mortífera de la Historia",
    ogDesc: "75–200 millones de muertes · 1346–1353 · Yersinia pestis · Historia completa, cronología y mapa.",
    eyebrow: "1346–1353 · Yersinia pestis",
    h1: "La Peste Negra",
    lede: "De 75 a 200 millones de muertos en Eurasia en siete años — la pandemia más mortífera jamás registrada por proporción de población. Una historia completa de su origen, cómo se propagó y qué sabemos hoy que ocurrió.",
    shortLabel: "Respuesta corta",
    short: 'La Peste Negra mató a unos <strong>75 a 200 millones de personas</strong> entre 1346 y 1353 — aproximadamente el <strong>30 a 60% de la población de Europa</strong>. La causó la bacteria <em>Yersinia pestis</em>, transmitida por las pulgas de las ratas negras y (en su forma neumónica) por gotículas en el aire entre humanos. Se originó en Asia Central en la década de 1330 y llegó a Europa por la Ruta de la Seda y Crimea.',
    tollH: "El número de muertes",
    stats: [["75–200M","Muertes totales (Eurasia)"],["30–60%","Población de Europa"],["7 años","Fase álgida"],["≈ 1 de 3","Europeos murieron"]],
    tollP: "Las estimaciones tienen rangos amplios porque los registros medievales eran irregulares y la bacteria arrasaba comunidades enteras antes de que se pudiera anotar nada. El modelado demográfico moderno (Benedictow 2004, Spyrou et al. 2022) converge en <strong>~50 millones de muertes solo en Europa</strong> y una cifra similar en Oriente Medio, el norte de África y Asia.",
    originH: "De dónde vino",
    originP1: "Hasta 2022, el origen geográfico de la pandemia era discutido. Ese año, un equipo liderado por Maria Spyrou publicó el análisis de ADN antiguo de esqueletos de dos cementerios en las estribaciones del Tian Shan, en Kirguistán, datados en 1338–1339. Los genomas contenían el ancestro de todas las cepas posteriores de <em>Yersinia pestis</em> — el “Big Bang” del que desciende toda la peste medieval y moderna.",
    originP2: "Desde Asia Central la enfermedad avanzó al oeste por las rutas de caravanas de la Ruta de la Seda. En octubre de 1346 había llegado a la colonia comercial genovesa de Caffa, en el mar Negro. Las galeras genovesas que huían del asedio llevaron la enfermedad a Mesina (Sicilia) y de ahí al resto de la Europa mediterránea.",
    tlH: "Cronología de la pandemia",
    tlHead: ["Año","Acontecimiento"],
    socialH: "Consecuencias sociales",
    socialP: "La pandemia rompió el orden económico feudal en Europa occidental. Con un tercio de la mano de obra desaparecida, los campesinos supervivientes ganaron poder de negociación por primera vez; los salarios reales subieron un 30–100% en las décadas siguientes. La autoridad de la Iglesia sufrió un golpe permanente y se aceleraron las persecuciones de minorías. Muchos historiadores marcan la Peste Negra como el fin del periodo medieval.",
    faqH: "Preguntas frecuentes",
    relH: "Relacionado",
    rel: [
      ["/spanish-flu","Gripe Española 1918 — 50M muertos","Pandemia"],
      ["/bubonic-plague","Peste bubónica — síntomas y casos","Enfermedad"],
      ["/cholera","Cólera — causa, síntomas, 7 pandemias","Enfermedad"],
      ["/","{brand} — mapa interactivo","Herramienta"],
    ],
    disclaimer: "Solo informativo — no es consejo médico.",
  },
} as const;

const TIMELINE = {
  en: [
    ["1331–1334", "First plague outbreaks recorded in Yuan-dynasty China."],
    ["Oct 1346", "Pestilence reaches the Crimean port of Caffa (now Feodosia)."],
    ["1347", "Genoese ships carry the disease to Messina, Sicily, then Marseille and Genoa."],
    ["Jun 1348", "Black Death reaches Paris; mortality 800/day at peak."],
    ["Nov 1348", "London hit. Up to 60,000 dead by spring 1349 — half the city."],
    ["1349–1351", "Norway, Sweden, northern Germany, then Moscow. Whole regions lose 25–50%."],
    ["1353", "European phase ends. Outbreaks continue in waves for 300 years."],
    ["2022", "Gravesites in Kyrgyzstan dated 1338–1339 confirmed as the pandemic's origin."],
  ],
  es: [
    ["1331–1334", "Primeros brotes de peste registrados en la China de la dinastía Yuan."],
    ["Oct 1346", "La pestilencia llega al puerto crimeo de Caffa (hoy Feodosia)."],
    ["1347", "Barcos genoveses llevan la enfermedad a Mesina (Sicilia), luego Marsella y Génova."],
    ["Jun 1348", "La Peste Negra llega a París; mortalidad de 800/día en el pico."],
    ["Nov 1348", "Golpea Londres. Hasta 60.000 muertos para la primavera de 1349 — media ciudad."],
    ["1349–1351", "Noruega, Suecia, norte de Alemania, luego Moscú. Regiones enteras pierden 25–50%."],
    ["1353", "Termina la fase europea. Los brotes continúan en oleadas durante 300 años."],
    ["2022", "Tumbas en Kirguistán datadas en 1338–1339 confirmadas como origen de la pandemia."],
  ],
} as const;

const FAQ = {
  en: [
    ["How many people died in the Black Death?", "Modern estimates put the Black Death death toll at 75 to 200 million people across Eurasia and North Africa between 1346 and 1353 — roughly 30 to 60% of Europe's pre-plague population."],
    ["What caused the Black Death?", "The bacterium Yersinia pestis, confirmed by 21st-century DNA analysis. It was carried by fleas on black rats; humans were infected through flea bites (bubonic) or by inhaling droplets from infected lungs (pneumonic)."],
    ["When did the Black Death start and end?", "The European phase ran from 1346 to 1353. It reached Constantinople in 1347, Paris by June 1348, London by November 1348, and Scandinavia and Russia by 1351."],
    ["Where did the Black Death come from?", "The strain originated in the Tian Shan mountains of present-day Kyrgyzstan in the 1330s, confirmed in 2022 by ancient-DNA studies. It spread west along the Silk Road."],
    ["Can the Black Death happen again?", "Yersinia pestis still exists; the CDC records 1,000–2,000 human plague cases a year worldwide. Modern antibiotics are highly effective. A medieval-scale pandemic is essentially impossible today."],
    ["How does the Black Death compare to COVID-19?", "By population share the Black Death remains incomparably deadlier: it killed roughly 1 in 3 people in its region in 7 years; COVID-19 killed roughly 1 in 400 globally over 3 years."],
  ],
  es: [
    ["¿Cuántas personas murieron en la Peste Negra?", "Las estimaciones modernas sitúan las muertes de la Peste Negra entre 75 y 200 millones de personas en Eurasia y el norte de África entre 1346 y 1353 — aproximadamente el 30 a 60% de la población europea anterior a la peste."],
    ["¿Qué causó la Peste Negra?", "La bacteria Yersinia pestis, confirmada por análisis de ADN del siglo XXI. La transmitían las pulgas de las ratas negras; los humanos se infectaban por picaduras (bubónica) o al inhalar gotículas de pulmones infectados (neumónica)."],
    ["¿Cuándo empezó y terminó la Peste Negra?", "La fase europea fue de 1346 a 1353. Llegó a Constantinopla en 1347, a París en junio de 1348, a Londres en noviembre de 1348 y a Escandinavia y Rusia hacia 1351."],
    ["¿De dónde vino la Peste Negra?", "La cepa se originó en las montañas Tian Shan del actual Kirguistán en la década de 1330, confirmado en 2022 por estudios de ADN antiguo. Se propagó al oeste por la Ruta de la Seda."],
    ["¿Puede volver a ocurrir la Peste Negra?", "Yersinia pestis aún existe; los CDC registran 1.000–2.000 casos humanos de peste al año en el mundo. Los antibióticos modernos son muy eficaces. Una pandemia de escala medieval es hoy esencialmente imposible."],
    ["¿Cómo se compara la Peste Negra con la COVID-19?", "Por proporción de población la Peste Negra sigue siendo incomparablemente más mortífera: mató a 1 de cada 3 personas de su región en 7 años; la COVID-19 mató a ~1 de cada 400 a nivel global en 3 años."],
  ],
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const lang = h.get("x-locale") === "es" ? "es" : "en";
  const t = T[lang];
  const enUrl = `${m.url}/black-death`;
  const esUrl = `${m.url}/es/black-death`;
  const canonical = lang === "es" ? esUrl : enUrl;
  return {
    title: t.title,
    description: t.desc,
    alternates: { canonical, languages: { en: enUrl, es: esUrl, "x-default": enUrl } },
    openGraph: {
      title: t.ogTitle, description: t.ogDesc, url: canonical, type: "article",
      locale: lang === "es" ? "es_ES" : "en_US",
      images: [{ url: `${m.url}/og-default.png`, width: 1200, height: 630, alt: t.h1 }],
    },
    twitter: { card: "summary_large_image", title: t.ogTitle, description: t.ogDesc, images: [`${m.url}/og-default.png`] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

const articleSchema = (url: string, t: (typeof T)[Lang], lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: t.title,
  description: t.desc,
  inLanguage: lang === "es" ? "es" : "en",
  datePublished: "2026-05-30",
  dateModified: "2026-05-31",
  author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" },
  mainEntityOfPage: url,
  image: `${url.replace(/\/(es\/)?black-death$/, "")}/og-default.png`,
});

const faqSchema = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ[lang].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export default async function BlackDeathPage() {
  const h = await headers();
  const brand = detectBrand(h.get("host") ?? "");
  const m = BRAND_META[brand];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const prefix = lang === "es" ? "/es" : "";
  const canonical = lang === "es" ? `${m.url}/es/black-death` : `${m.url}/black-death`;

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

        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.tollH}</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.stats.map((s, i) => (
            <div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center">
              <p className="font-mono text-xl text-rose-300">{s[0]}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s[1]}</p>
            </div>
          ))}
        </div>
        <p className="text-slate-400" dangerouslySetInnerHTML={{ __html: t.tollP }} />

        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.originH}</h2>
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.originP1 }} />
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.originP2 }} />

        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.tlH}</h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60"><tr>
              <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">{t.tlHead[0]}</th>
              <th className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">{t.tlHead[1]}</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-800/60">
              {TIMELINE[lang].map((r, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-rose-300/90">{r[0]}</td>
                  <td className="px-4 py-2.5 text-slate-300">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.socialH}</h2>
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.socialP }} />

        <hr className="my-10 border-slate-800" />
        <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.faqH}</h2>
        <div className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {FAQ[lang].map(([q, a], i) => (
            <div key={i} className="py-5">
              <p className="mb-2 font-medium text-slate-100">{q}</p>
              <p className="text-slate-400">{a}</p>
            </div>
          ))}
        </div>

        <hr className="my-10 border-slate-800" />
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.relH}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {t.rel.map((c, i) => (
            <Link key={i} href={prefix + c[0]} className="block rounded-md border border-slate-800 p-4 transition hover:border-rose-400/40">
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-rose-400/70">{c[2]}</p>
              <p className="mt-1 italic text-slate-200">{c[1].replace("{brand}", m.name)}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.25em] text-slate-600">
          © 2026 Furiosa Studio · Part of the{" "}
          <a href="https://furiosadata.com" rel="dofollow" className="underline">Furiosa Data Tools Network</a>
        </p>
        <p className="mt-3 text-center text-[0.65rem] text-slate-600">{t.disclaimer}</p>
      </article>
    </main>
  );
}
