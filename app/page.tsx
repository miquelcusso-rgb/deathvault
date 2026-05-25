import { headers } from "next/headers";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HomeClient } from "@/components/HomeClient";
import { EVENTS, formatDeaths } from "@/data/events";
import { detectBrand, BRAND_CATEGORIES, BRAND_META } from "@/lib/brand";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import { cn } from "@/lib/utils";

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

  return (
    <div className="min-h-screen bg-void bg-grid">
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
