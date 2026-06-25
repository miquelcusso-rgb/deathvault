import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { detectBrand, BRAND_META, PLAGUE_CANONICAL_BASE } from "@/lib/brand";

type Lang = "en" | "es";

const T = {
  en: {
    title: "Bubonic Plague — Symptoms, Cause, Treatment & Is It Still Around?",
    desc: "Bubonic plague is a bacterial infection caused by Yersinia pestis, spread by flea bites. Symptoms, transmission, modern treatment, and the 1,000–2,000 cases still reported worldwide every year.",
    ogTitle: "Bubonic Plague — Symptoms, Cause, Treatment",
    ogDesc: "Caused by Yersinia pestis, spread by fleas. Symptoms, modern treatment, and why it still exists today.",
    eyebrow: "Yersinia pestis · Still active today",
    h1: "Bubonic Plague",
    lede: "The disease behind the Black Death is not history — it still infects 1,000–2,000 people a year. What it is, how it spreads, the symptoms, and why modern antibiotics make it survivable.",
    shortLabel: "Short answer",
    short: 'Bubonic plague is a bacterial infection caused by <strong><em>Yersinia pestis</em></strong>, spread mainly by <strong>flea bites</strong> from infected rodents. It causes fever and painful swollen lymph nodes (<strong>buboes</strong>). Untreated it kills 30–60%; with early antibiotics most people recover. It still causes about <strong>1,000–2,000 cases a year</strong> worldwide, mainly in Madagascar, the DR Congo and Peru.',
    factsH: "Key facts",
    stats: [["2–8 days","Incubation"],["30–60%","Untreated fatality"],["~10%","Treated fatality"],["1–2K/yr","Cases worldwide"]],
    formsH: "The three forms of plague",
    forms: [
      ["Bubonic","the classic form. Flea bite → swollen, painful lymph nodes (buboes). 30–60% fatal untreated."],
      ["Septicemic","the bacteria multiply in the bloodstream, blackening fingers and toes (origin of the name “Black” Death). Near-universally fatal untreated."],
      ["Pneumonic","infection of the lungs, the only form that spreads person-to-person by airborne droplets. Fatal within 2–3 days untreated."],
    ],
    spreadH: "How it spreads",
    spreadP: "The classic cycle runs <strong>rodent → flea → human</strong>. A flea feeds on an infected rodent, the bacteria block its gut, and when the starving flea bites a human it regurgitates <em>Yersinia pestis</em> into the wound. Bubonic plague on its own is <strong>not contagious between people</strong> — the fear comes from its ability to progress to pneumonic plague, which is.",
    treatH: "Treatment today",
    treatP: "Modern antibiotics make plague survivable when caught early: <strong>gentamicin</strong>, the fluoroquinolones (<strong>ciprofloxacin, levofloxacin</strong>) and doxycycline. Treatment started within <strong>24 hours</strong> cuts mortality dramatically. The key risk is delay — plague is rare enough that doctors may not consider it quickly.",
    faqH: "Frequently asked questions",
    relH: "Related",
    rel: [["/black-death","The Black Death — the 1346 pandemic","History"],["/spanish-flu","Spanish Flu 1918 — 50M dead","Pandemic"],["/cholera","Cholera — cause & the 7 pandemics","Disease"],["/","{brand} home — interactive map","Tool"]],
    disclaimer: "Informational only — not medical advice. For symptoms, contact a healthcare professional.",
  },
  es: {
    title: "Peste Bubónica — Síntomas, Causa, Tratamiento y ¿Sigue Existiendo?",
    desc: "La peste bubónica es una infección bacteriana causada por Yersinia pestis, transmitida por picaduras de pulga. Síntomas, transmisión, tratamiento moderno y los 1.000–2.000 casos que aún se reportan cada año.",
    ogTitle: "Peste Bubónica — Síntomas, Causa, Tratamiento",
    ogDesc: "Causada por Yersinia pestis, transmitida por pulgas. Síntomas, tratamiento moderno y por qué aún existe.",
    eyebrow: "Yersinia pestis · Aún activa hoy",
    h1: "La Peste Bubónica",
    lede: "La enfermedad tras la Peste Negra no es historia — aún infecta a 1.000–2.000 personas al año. Qué es, cómo se transmite, los síntomas y por qué los antibióticos modernos la hacen superable.",
    shortLabel: "Respuesta corta",
    short: 'La peste bubónica es una infección bacteriana causada por <strong><em>Yersinia pestis</em></strong>, transmitida sobre todo por <strong>picaduras de pulga</strong> de roedores infectados. Provoca fiebre y ganglios linfáticos hinchados y dolorosos (<strong>bubones</strong>). Sin tratar mata al 30–60%; con antibióticos tempranos la mayoría se recupera. Aún causa unos <strong>1.000–2.000 casos al año</strong> en el mundo, sobre todo en Madagascar, RD del Congo y Perú.',
    factsH: "Datos clave",
    stats: [["2–8 días","Incubación"],["30–60%","Letalidad sin tratar"],["~10%","Letalidad tratada"],["1–2K/año","Casos mundiales"]],
    formsH: "Las tres formas de peste",
    forms: [
      ["Bubónica","la forma clásica. Picadura de pulga → ganglios hinchados y dolorosos (bubones). 30–60% letal sin tratar."],
      ["Septicémica","la bacteria se multiplica en la sangre, ennegreciendo dedos de manos y pies (origen del nombre “Negra”). Casi siempre letal sin tratar."],
      ["Neumónica","infección de los pulmones, la única forma que se transmite de persona a persona por gotículas en el aire. Letal en 2–3 días sin tratar."],
    ],
    spreadH: "Cómo se transmite",
    spreadP: "El ciclo clásico es <strong>roedor → pulga → humano</strong>. Una pulga se alimenta de un roedor infectado, las bacterias bloquean su tracto digestivo, y cuando la pulga hambrienta pica a un humano regurgita <em>Yersinia pestis</em> en la herida. La peste bubónica por sí sola <strong>no es contagiosa entre personas</strong> — el miedo viene de su capacidad de progresar a peste neumónica, que sí lo es.",
    treatH: "Tratamiento hoy",
    treatP: "Los antibióticos modernos hacen la peste superable si se detecta pronto: <strong>gentamicina</strong>, las fluoroquinolonas (<strong>ciprofloxacino, levofloxacino</strong>) y doxiciclina. Empezar el tratamiento en <strong>24 horas</strong> reduce drásticamente la mortalidad. El riesgo clave es el retraso — la peste es tan rara que los médicos pueden no considerarla rápido.",
    faqH: "Preguntas frecuentes",
    relH: "Relacionado",
    rel: [["/black-death","La Peste Negra — la pandemia de 1346","Historia"],["/spanish-flu","Gripe Española 1918 — 50M muertos","Pandemia"],["/cholera","Cólera — causa y las 7 pandemias","Enfermedad"],["/","{brand} — mapa interactivo","Herramienta"]],
    disclaimer: "Solo informativo — no es consejo médico. Ante síntomas, acude a un profesional sanitario.",
  },
} as const;

const FAQ = {
  en: [
    ["What is bubonic plague?", "A serious bacterial infection caused by Yersinia pestis, named for the painful swollen lymph nodes (buboes) it produces. Usually transmitted by infected flea bites. Untreated it kills 30–60%; with prompt antibiotics most recover."],
    ["What are the symptoms?", "2–8 days after infection: sudden fever, chills, headache, weakness, then one or more swollen, extremely painful lymph nodes (buboes), often in the groin or armpit. Untreated it can spread to blood (septicemic) or lungs (pneumonic)."],
    ["How is it transmitted?", "Mostly by the bite of a flea that fed on an infected rodent. People can also catch it handling infected animal tissue. Bubonic plague does not spread person-to-person — but pneumonic plague can, via respiratory droplets."],
    ["Is bubonic plague still around today?", "Yes — the WHO records roughly 1,000–2,000 human cases a year, mainly in Madagascar, the DR Congo and Peru. The US averages about 7 cases a year in the rural Southwest."],
    ["Can bubonic plague be cured?", "Yes, with antibiotics (gentamicin, ciprofloxacin, doxycycline), especially within 24 hours of symptoms. Early treatment drops mortality from 30–60% to around 10%."],
    ["What is the difference between bubonic plague and the Black Death?", "Same bacterium, Yersinia pestis. 'Bubonic plague' is the disease that still occurs today; the 'Black Death' was the 1346–1353 pandemic that killed 75–200 million people."],
    ["How can you prevent plague?", "Reduce rodent and flea exposure: flea-control on pets, avoid dead/sick rodents, use repellent in endemic areas, rodent-proof homes. No vaccine is widely available for the public."],
  ],
  es: [
    ["¿Qué es la peste bubónica?", "Una infección bacteriana grave causada por Yersinia pestis, llamada así por los ganglios linfáticos hinchados y dolorosos (bubones) que produce. Suele transmitirse por picaduras de pulga infectada. Sin tratar mata al 30–60%; con antibióticos rápidos la mayoría se recupera."],
    ["¿Cuáles son los síntomas?", "2–8 días tras la infección: fiebre repentina, escalofríos, dolor de cabeza, debilidad, y luego uno o más ganglios hinchados y muy dolorosos (bubones), a menudo en ingle o axila. Sin tratar puede pasar a la sangre (septicémica) o los pulmones (neumónica)."],
    ["¿Cómo se transmite?", "Sobre todo por la picadura de una pulga que se alimentó de un roedor infectado. También al manipular tejido de animales infectados. La bubónica no se transmite entre personas — pero la neumónica sí, por gotículas respiratorias."],
    ["¿Sigue existiendo la peste bubónica hoy?", "Sí — la OMS registra unos 1.000–2.000 casos humanos al año, sobre todo en Madagascar, RD del Congo y Perú. EEUU promedia unos 7 casos al año en el suroeste rural."],
    ["¿Tiene cura la peste bubónica?", "Sí, con antibióticos (gentamicina, ciprofloxacino, doxiciclina), especialmente en las primeras 24 horas. El tratamiento temprano baja la mortalidad del 30–60% a alrededor del 10%."],
    ["¿Cuál es la diferencia entre peste bubónica y Peste Negra?", "La misma bacteria, Yersinia pestis. 'Peste bubónica' es la enfermedad que aún ocurre hoy; la 'Peste Negra' fue la pandemia de 1346–1353 que mató a 75–200 millones de personas."],
    ["¿Cómo se previene la peste?", "Reduciendo la exposición a roedores y pulgas: antiparasitarios en mascotas, evitar roedores muertos/enfermos, repelente en zonas endémicas, sellar la casa. No hay vacuna ampliamente disponible para el público."],
  ],
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const m = BRAND_META[detectBrand(h.get("host") ?? "")];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const enUrl = `${PLAGUE_CANONICAL_BASE}/bubonic-plague`, esUrl = `${PLAGUE_CANONICAL_BASE}/es/bubonic-plague`;
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
const articleSchema = (url: string, t: (typeof T)[Lang], lang: Lang) => ({ "@context": "https://schema.org", "@type": "Article", headline: t.title, description: t.desc, inLanguage: lang, datePublished: "2026-05-30", dateModified: "2026-05-31", author: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" }, publisher: { "@type": "Organization", name: "Furiosa Studio", url: "https://furiosadata.com" }, mainEntityOfPage: url, image: `${url.replace(/\/(es\/)?bubonic-plague$/, "")}/og-default.png` });

export default async function BubonicPlaguePage() {
  const h = await headers();
  const m = BRAND_META[detectBrand(h.get("host") ?? "")];
  const lang = (h.get("x-locale") === "es" ? "es" : "en") as Lang;
  const t = T[lang];
  const prefix = lang === "es" ? "/es" : "";
  const canonical = `${PLAGUE_CANONICAL_BASE}${prefix}/bubonic-plague`;
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
          {t.stats.map((s, i) => (<div key={i} className="rounded-md border border-slate-800 bg-slate-900/40 p-3 text-center"><p className="font-mono text-xl text-rose-300">{s[0]}</p><p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">{s[1]}</p></div>))}
        </div>
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.formsH}</h2>
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-400">{t.forms.map(([k, v], i) => (<li key={i}><strong className="text-slate-200">{k}</strong> — {v}</li>))}</ul>
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.spreadH}</h2>
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.spreadP }} />
        <hr className="my-10 border-slate-800" />
        <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-300">{t.treatH}</h2>
        <p className="mb-4 text-slate-400" dangerouslySetInnerHTML={{ __html: t.treatP }} />
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
