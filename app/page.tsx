import Link from "next/link";
import { headers } from "next/headers";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HomeClient } from "@/components/HomeClient";
import { BrandMark } from "@/components/ui/BrandMark";
import { Activity } from "lucide-react";
import { EVENTS, formatDeaths } from "@/data/events";
import { detectBrand, BRAND_CATEGORIES, BRAND_META } from "@/lib/brand";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import { localizedHref } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";

export default async function HomePage() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const isDV = brand === "deathvault";
  const t = await getServerT();
  const lang = await getServerLang();
  const isEs = lang === "es";

  const allowedCats = BRAND_CATEGORIES[brand];
  const brandEvents = EVENTS.filter((e) => allowedCats.includes(e.category));
  const TOTAL_DEATHS = brandEvents.reduce((sum, e) => sum + e.deathsEstimate, 0);
  const TOTAL_EVENTS = brandEvents.length;
  const TOTAL_CATEGORIES = new Set(brandEvents.map((e) => e.category)).size;
  // PlagueAtlas spans one category (pandemics) — its distinctive third stat is the
  // time range it documents (earliest outbreak → today), rounded to the century.
  const earliestYear = Math.min(...brandEvents.map((e) => e.startYear));
  const yearsCovered = Math.round((new Date().getFullYear() - earliestYear) / 100) * 100;

  const meta = BRAND_META[brand];
  const accentColor = isDV ? "text-amber-400" : "text-crimson-light";
  const accentNeon  = isDV ? "" : "neon-red";
  const accentHex   = isDV ? "#F59E0B" : "#DC2626";
  const headline    = isEs ? ((meta as { headlineEs?: string }).headlineEs ?? meta.headline) : meta.headline;
  const tagline     = isEs ? ((meta as { taglineEs?: string }).taglineEs ?? meta.tagline) : meta.tagline;

  const faqEntries = isDV
    ? [
        ["How many people died in World War II?", "World War II caused an estimated 70–85 million deaths (1939–1945), including both military and civilian casualties — the deadliest conflict in human history."],
        ["What was the deadliest event in human history?", "By total death toll, the deadliest events include World War II (70–85M), the Mongol conquests (estimates up to 40M), the Black Death (75–200M over the 14th century) and the 1918 Spanish flu (~50M). DeathVault documents these across pandemics, wars, famines and disasters."],
        ["How many deaths does DeathVault document?", `DeathVault documents over ${Math.round(TOTAL_DEATHS / 1_000_000)} million casualties across ${TOTAL_EVENTS} events in recorded history, spanning pandemics, wars, famines, nuclear disasters and genocides.`],
        ["How many people died at Chernobyl?", "Direct deaths from the 1986 Chernobyl disaster were 31 (acute radiation and the explosion). Long-term estimates of cancer deaths attributable to the radiation vary widely, from a few thousand (WHO) to higher modelled figures."],
      ]
    : [
        ["How many people died from the Black Death?", "The Black Death (1346–1353) killed an estimated 75–200 million people across Europe, Asia and North Africa — roughly 30–60% of Europe's population at the time."],
        ["How many people died from the Spanish flu?", "The 1918 influenza pandemic ('Spanish flu') killed an estimated 50 million people worldwide, and possibly as many as 100 million, between 1918 and 1920."],
        ["How many people have died from COVID-19?", "Confirmed COVID-19 deaths exceed 7 million worldwide, while excess-mortality estimates put the true toll at 18–28 million since 2020."],
        ["What was the deadliest pandemic in history?", "By total death toll the Black Death is generally considered the deadliest single pandemic event (75–200M). Over a longer span, tuberculosis, malaria and smallpox have each killed far more cumulatively."],
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-void bg-grid">
      <JsonLd data={[faqSchema]} />
      <Navbar />

      {/* ─── Landing hero — server-rendered, fully indexable by Google ─── */}
      <section className="pt-24 pb-2">
        <div className="max-w-[1350px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:items-center mb-4">
            {/* Left: identity + value prop + CTAs */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {isDV ? (
                  <BrandMark size={46} color={accentHex} />
                ) : (
                  <span className="w-[46px] h-[46px] rounded-xl flex items-center justify-center border bg-crimson/20 border-crimson/40">
                    <Activity className="w-6 h-6 text-crimson-light" />
                  </span>
                )}
                <h1 className="font-display font-black text-4xl sm:text-5xl text-white leading-none">
                  {isDV
                    ? <>Death<span className={accentColor}>Vault</span></>
                    : <>Plague<span className={accentColor}>Atlas</span></>
                  }
                </h1>
              </div>
              <p className="text-slate-200 text-xl sm:text-2xl font-display font-semibold leading-snug mb-2 max-w-xl">
                {headline}
              </p>
              <p className="text-slate-500 text-sm mb-6 max-w-xl">{tagline}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={localizedHref("/events", lang)}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer shadow-sm",
                    isDV
                      ? "bg-amber-500 text-[#0A0905] border border-amber-500 hover:bg-amber-400"
                      : "bg-crimson text-white border border-crimson hover:bg-crimson-light",
                  )}
                >
                  {t("home_cta_explore")}
                </Link>
                <Link
                  href={localizedHref("/statistics", lang)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 border border-border/60 hover:border-border hover:bg-white/5 transition-all duration-200 cursor-pointer"
                >
                  {t("home_cta_stats")}
                </Link>
              </div>
            </div>

            {/* Right: headline stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="card p-4 text-center">
                <p className={cn("font-mono font-black text-2xl sm:text-3xl leading-none", accentColor, accentNeon)}>
                  {formatDeaths(TOTAL_DEATHS)}
                </p>
                <p className="text-slate-500 text-[10px] mt-1.5 font-mono uppercase tracking-wider">{t("home_deaths_label")}</p>
              </div>
              <div className="card p-4 text-center">
                <p className="font-mono font-black text-2xl sm:text-3xl leading-none text-cyan-light">{TOTAL_EVENTS}</p>
                <p className="text-slate-500 text-[10px] mt-1.5 font-mono uppercase tracking-wider">{t("home_events_label")}</p>
              </div>
              <div className="card p-4 text-center">
                <p className="font-mono font-black text-2xl sm:text-3xl leading-none" style={{ color: "#8B5CF6" }}>
                  {isDV ? TOTAL_CATEGORIES : `${yearsCovered.toLocaleString("en-US")}+`}
                </p>
                <p className="text-slate-500 text-[10px] mt-1.5 font-mono uppercase tracking-wider">
                  {isDV ? t("home_stat_categories") : t("home_stat_years")}
                </p>
              </div>
            </div>
          </div>

          {/* SSR text content — indexable by Google without JS execution */}
          <p className="sr-only">
            {isEs ? ((meta as { descriptionEs?: string }).descriptionEs ?? meta.description) : meta.description}{" "}
            {isEs ? "Explora" : "Explore"} {TOTAL_EVENTS}{" "}
            {isEs ? "eventos históricos, incluyendo" : "historical events including"}{" "}
            {brandEvents
              .sort((a, b) => b.deathsEstimate - a.deathsEstimate)
              .slice(0, 5)
              .map((e) => (isEs ? e.nameEs : e.name))
              .join(", ")}{" "}
            {isEs
              ? `y más. Muertes totales documentadas: ${formatDeaths(TOTAL_DEATHS)}.`
              : `and more. Total documented deaths: ${formatDeaths(TOTAL_DEATHS)}.`}
          </p>
        </div>
      </section>

      {/* Interactive section — client component (globe, selector, counters) */}
      <HomeClient brandEvents={brandEvents} />

      <Footer />
    </div>
  );
}
