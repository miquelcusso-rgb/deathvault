import { headers } from "next/headers";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HomeClient } from "@/components/HomeClient";
import { EVENTS, formatDeaths } from "@/data/events";
import { detectBrand, BRAND_CATEGORIES, BRAND_META } from "@/lib/brand";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";

export default async function HomePage() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const isDV = brand === "deathvault";
  const t = await getServerT();
  const isEs = (await getServerLang()) === "es";

  const allowedCats = BRAND_CATEGORIES[brand];
  const brandEvents = EVENTS.filter((e) => allowedCats.includes(e.category));
  const TOTAL_DEATHS = brandEvents.reduce((sum, e) => sum + e.deathsEstimate, 0);
  const TOTAL_EVENTS = brandEvents.length;

  const meta = BRAND_META[brand];
  const accentColor = isDV ? "text-amber-400" : "text-crimson-light";
  const accentNeon  = isDV ? "" : "neon-red";

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

      {/* Hero strip — server-rendered, fully indexable by Google */}
      <div className="pt-20 pb-0">
        <div className={cn("max-w-[1350px] mx-auto px-4 pt-4")}>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 mb-3">
            <div>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-white">
                {isDV
                  ? <>Death<span className={accentColor}>Vault</span></>
                  : <>Plague<span className={accentColor}>Atlas</span></>
                }
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">{isEs ? ((meta as { taglineEs?: string }).taglineEs ?? meta.tagline) : meta.tagline}</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className={cn("font-mono font-black text-4xl sm:text-5xl leading-none", accentColor, accentNeon)}>
                  {formatDeaths(TOTAL_DEATHS)}
                </p>
                <p className="text-slate-500 text-xs mt-1 font-mono uppercase tracking-wider">{t("home_deaths_label")}</p>
              </div>
              <div className="w-px h-12 bg-border/40" />
              <div className="text-center">
                <p className="font-mono font-black text-4xl sm:text-5xl leading-none text-cyan-light">
                  {TOTAL_EVENTS}
                </p>
                <p className="text-slate-500 text-xs mt-1 font-mono uppercase tracking-wider">{t("home_events_label")}</p>
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
      </div>

      {/* Interactive section — client component (globe, selector, counters) */}
      <HomeClient brandEvents={brandEvents} />

      <Footer />
    </div>
  );
}
