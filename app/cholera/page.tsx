import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META, PLAGUE_CANONICAL_BASE } from "@/lib/brand";

type Lang = "en" | "es";

const T = {
  en: {
    title: "Cholera — Cause, Symptoms, Treatment & the 7 Pandemics",
    desc: "Cholera is an acute diarrhoeal infection caused by Vibrio cholerae in contaminated water. It can kill within hours untreated, yet rehydration saves 99% of patients. Symptoms, transmission, the seven pandemics, and where it still kills today.",
    ogTitle: "Cholera — Cause, Symptoms, Treatment & the 7 Pandemics",
    ogDesc: "Caused by Vibrio cholerae in dirty water. Can kill in hours — but rehydration saves 99%. Full guide.",
    eyebrow: "Vibrio cholerae · 7 pandemics",
    h1: "Cholera",
    lede: "A disease that can kill a healthy adult in hours — yet a glass of salt-and-sugar water saves 99% of patients. The cause, the symptoms, the seven pandemics, and why it still kills tens of thousands a year.",
    shortLabel: "Short answer",
    short: 'Cholera is an acute infection caused by <strong><em>Vibrio cholerae</em></strong> swallowed in <strong>contaminated water</strong>. It causes violent watery diarrhoea and can kill through dehydration within hours. Yet <strong>oral rehydration therapy saves about 99%</strong> of patients. The WHO estimates 1.3–4 million cases and up to 143,000 deaths a year — entirely a disease of unsafe water and poor sanitation.',
    factsH: "Key facts",
    stats: [["hours–5d","Onset"],["~50%","Untreated fatality (severe)"],["~1%","With rehydration"],["7","Pandemics since 1817"]],
    whyH: "Why it kills so fast — and why it's so easy to treat",
    whyP: "The <em>Vibrio cholerae</em> toxin makes the small intestine pump water and salts out of the body — a severe case can lose <strong>up to a litre of fluid an hour</strong>, until blood pressure collapses. But because the body is simply losing fluid and salts, replacing them works almost magically: <strong>oral rehydration solution</strong> (clean water + salt + sugar) lets the gut reabsorb fluid faster than the toxin expels it. Cheap, no electricity needed, saves around 99%.",
    pandH: "The seven cholera pandemics",
    pandHead: ["#", "Years", "Note"],
    closeP: "We are still living in the <strong>seventh pandemic</strong>, which began in 1961 and has never fully ended — a reminder that cholera is controlled by infrastructure, not by medicine alone.",
    faqH: "Frequently asked questions",
    relH: "Related",
    rel: [["/black-death","The Black Death — 75–200M dead","History"],["/spanish-flu","Spanish Flu 1918 — 50M dead","Pandemic"],["/bubonic-plague","Bubonic plague — symptoms & cases","Disease"],["/","{brand} home — interactive map","Tool"]],
    disclaimer: "Informational only — not medical advice. For symptoms, contact a healthcare professional.",
  },
  es: {
    title: "Cólera — Causa, Síntomas, Tratamiento y las 7 Pandemias",
    desc: "El cólera es una infección diarreica aguda causada por Vibrio cholerae en agua contaminada. Sin tratar puede matar en horas, pero la rehidratación salva al 99% de los pacientes. Síntomas, transmisión, las siete pandemias y dónde aún mata hoy.",
    ogTitle: "Cólera — Causa, Síntomas, Tratamiento y las 7 Pandemias",
    ogDesc: "Causado por Vibrio cholerae en agua sucia. Puede matar en horas — pero la rehidratación salva al 99%.",
    eyebrow: "Vibrio cholerae · 7 pandemias",
    h1: "El Cólera",
    lede: "Una enfermedad que puede matar a un adulto sano en horas — pero un vaso de agua con sal y azúcar salva al 99% de los pacientes. La causa, los síntomas, las siete pandemias y por qué aún mata a decenas de miles al año.",
    shortLabel: "Respuesta corta",
    short: 'El cólera es una infección aguda causada por <strong><em>Vibrio cholerae</em></strong> ingerida en <strong>agua contaminada</strong>. Provoca diarrea acuosa violenta y puede matar por deshidratación en horas. Aun así, la <strong>terapia de rehidratación oral salva a un 99%</strong> de los pacientes. La OMS estima 1,3–4 millones de casos y hasta 143.000 muertes al año — enteramente una enfermedad de agua insalubre y mal saneamiento.',
    factsH: "Datos clave",
    stats: [["horas–5d","Inicio"],["~50%","Letalidad sin tratar (grave)"],["~1%","Con rehidratación"],["7","Pandemias desde 1817"]],
    whyH: "Por qué mata tan rápido — y por qué es tan fácil de tratar",
    whyP: "La toxina de <em>Vibrio cholerae</em> hace que el intestino delgado bombee agua y sales fuera del cuerpo — un caso grave puede perder <strong>hasta un litro de fluido por hora</strong>, hasta que la presión arterial colapsa. Pero como el cuerpo solo pierde fluido y sales, reponerlos funciona casi por arte de magia: la <strong>solución de rehidratación oral</strong> (agua limpia + sal + azúcar) permite al intestino reabsorber líquido más rápido de lo que la toxina lo expulsa. Barata, sin electricidad, salva a un 99%.",
    pandH: "Las siete pandemias de cólera",
    pandHead: ["#", "Años", "Nota"],
    closeP: "Aún vivimos en la <strong>séptima pandemia</strong>, que empezó en 1961 y nunca terminó del todo — un recordatorio de que el cólera se controla con infraestructura, no solo con medicina.",
    faqH: "Preguntas frecuentes",
    relH: "Relacionado",
    rel: [["/black-death","La Peste Negra — 75–200M muertos","Historia"],["/spanish-flu","Gripe Española 1918 — 50M muertos","Pandemia"],["/bubonic-plague","Peste bubónica — síntomas y casos","Enfermedad"],["/","{brand} — mapa interactivo","Herramienta"]],
    disclaimer: "Solo informativo — no es consejo médico. Ante síntomas, acude a un profesional sanitario.",
  },
} as const;

const PANDEMICS = {
  en: [
    ["1st", "1817–1824", "Begins in the Ganges delta; spreads across Asia."],
    ["2nd", "1829–1837", "Reaches Europe and North America for the first time."],
    ["3rd", "1846–1860", "Deadliest. John Snow's 1854 Broad Street investigation."],
    ["4th", "1863–1875", "Spreads via pilgrimage and expanding rail/shipping."],
    ["5th", "1881–1896", "Koch identifies Vibrio cholerae (1883)."],
    ["6th", "1899–1923", "Heavy toll in India, Middle East, Russia."],
    ["7th", "1961–present", "El Tor biotype; still ongoing today."],
  ],
  es: [
    ["1ª", "1817–1824", "Empieza en el delta del Ganges; se extiende por Asia."],
    ["2ª", "1829–1837", "Llega a Europa y Norteamérica por primera vez."],
    ["3ª", "1846–1860", "La más mortal. Investigación de John Snow en Broad Street (1854)."],
    ["4ª", "1863–1875", "Se propaga por peregrinaciones y la expansión del tren/barco."],
    ["5ª", "1881–1896", "Koch identifica Vibrio cholerae (1883)."],
    ["6ª", "1899–1923", "Gran impacto en India, Oriente Medio, Rusia."],
    ["7ª", "1961–presente", "Biotipo El Tor; aún en curso hoy."],
  ],
} as const;

const FAQ = {
  en: [
    ["What causes cholera?", "The bacterium Vibrio cholerae, swallowed in food or water contaminated by the faeces of an infected person. Its toxin triggers massive watery diarrhoea. It is fundamentally a disease of unsafe water and poor sanitation."],
    ["What are the symptoms?", "Most infections are mild. Severe cases: profuse 'rice-water' diarrhoea, vomiting, and rapid dehydration within hours to 5 days. Untreated, severe cholera can kill within hours through fluid loss and shock."],
    ["How is cholera treated?", "Rehydration. Oral rehydration solution (clean water with salts and sugar) saves ~99% of patients. Severe cases need IV fluids. Antibiotics shorten illness but are secondary to fluids."],
    ["How does cholera spread?", "Faecal-oral: ingesting water or food contaminated with infected faeces. It spreads explosively where sewage mixes with drinking water — refugee camps, slums, flood/war zones. Not by casual contact."],
    ["How many cholera pandemics have there been?", "Seven. The first began in 1817; the third (1846–1860) prompted John Snow's famous 1854 study, a founding moment of epidemiology. The seventh began in 1961 and is still ongoing."],
    ["Is cholera still a problem today?", "Yes — the WHO estimates 1.3–4 million cases and 21,000–143,000 deaths a year. Major recent outbreaks: Haiti (2010), Yemen (the largest ever, 2.5M+ suspected cases), sub-Saharan Africa."],
    ["Who was John Snow and why does he matter?", "A London physician who, in the 1854 Broad Street outbreak, mapped deaths to a single contaminated water pump — disproving the 'bad air' theory and founding modern epidemiology."],
  ],
  es: [
    ["¿Qué causa el cólera?", "La bacteria Vibrio cholerae, ingerida en comida o agua contaminada por las heces de una persona infectada. Su toxina provoca diarrea acuosa masiva. Es fundamentalmente una enfermedad de agua insalubre y mal saneamiento."],
    ["¿Cuáles son los síntomas?", "La mayoría de infecciones son leves. Casos graves: diarrea profusa en 'agua de arroz', vómitos y deshidratación rápida en horas a 5 días. Sin tratar, el cólera grave puede matar en horas por pérdida de fluidos y shock."],
    ["¿Cómo se trata el cólera?", "Rehidratación. La solución de rehidratación oral (agua limpia con sales y azúcar) salva a ~99% de los pacientes. Los casos graves necesitan fluidos intravenosos. Los antibióticos acortan la enfermedad pero son secundarios."],
    ["¿Cómo se propaga el cólera?", "Vía fecal-oral: al ingerir agua o comida contaminada con heces infectadas. Se propaga explosivamente donde las aguas residuales se mezclan con el agua potable — campos de refugiados, suburbios, zonas de inundación/guerra. No por contacto casual."],
    ["¿Cuántas pandemias de cólera ha habido?", "Siete. La primera empezó en 1817; la tercera (1846–1860) impulsó el famoso estudio de John Snow en 1854, momento fundacional de la epidemiología. La séptima empezó en 1961 y sigue en curso."],
    ["¿Sigue siendo el cólera un problema hoy?", "Sí — la OMS estima 1,3–4 millones de casos y 21.000–143.000 muertes al año. Grandes brotes recientes: Haití (2010), Yemen (el mayor de la historia, 2,5M+ casos sospechosos), África subsahariana."],
    ["¿Quién fue John Snow y por qué importa?", "Un médico de Londres que, en el brote de Broad Street de 1854, mapeó las muertes hasta una única bomba de agua contaminada — refutando la teoría del 'aire malo' y fundando la epidemiología moderna."],
  ],
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const m = BRAND_META[detectBrand(h.get("host") ?? "")];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const enUrl = `${PLAGUE_CANONICAL_BASE}/cholera`, esUrl = `${PLAGUE_CANONICAL_BASE}/es/cholera`;
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
const articleSchema = (url: string, t: (typeof T)[Lang], lang: Lang) => ({ "@context": "https://schema.org", "@type": "Article", headline: t.title, description: t.desc, inLanguage: lang, datePublished: "2026-05-30", dateModified: "2026-05-31", author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" }, publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" }, mainEntityOfPage: url, image: `${url.replace(/\/(es\/)?cholera$/, "")}/og-default.png` });

export default async function CholeraPage() {
  const h = await headers();
  const m = BRAND_META[detectBrand(h.get("host") ?? "")];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const prefix = lang === "es" ? "/es" : "";
  const canonical = `${PLAGUE_CANONICAL_BASE}${prefix}/cholera`;
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
        <h2 className="mb-3 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.factsH}</h2>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.stats.map((s, i) => (<div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center"><p className="font-mono text-lg text-rose-300">{s[0]}</p><p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s[1]}</p></div>))}
        </div>
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.whyH}</h2>
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.whyP }} />
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.pandH}</h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-slate-800"><table className="w-full text-sm">
          <thead className="bg-slate-900/60"><tr>{t.pandHead.map((hd, i) => (<th key={i} className="px-4 py-2 text-left text-[0.6rem] font-medium uppercase tracking-[0.2em] text-slate-400">{hd}</th>))}</tr></thead>
          <tbody className="divide-y divide-slate-800/60">{PANDEMICS[lang].map((r, i) => (<tr key={i}><td className="px-4 py-2.5 font-mono text-rose-300/90">{r[0]}</td><td className="whitespace-nowrap px-4 py-2.5 text-slate-200">{r[1]}</td><td className="px-4 py-2.5 text-slate-400">{r[2]}</td></tr>))}</tbody>
        </table></div>
        <p className="text-slate-400" dangerouslySetInnerHTML={{ __html: t.closeP }} />
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
