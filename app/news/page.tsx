import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";
import { headers } from "next/headers";
import { getServerT, getServerLang } from "@/lib/i18n-server";
import { localizedHref } from "@/lib/locale";
import { detectBrand, BRAND_CATEGORIES } from "@/lib/brand";
import { EVENTS } from "@/data/events";
import { dedupeNews, displayHeadline } from "@/lib/news";
import newsFeedRaw from "@/data/news-feed.json";
import { ExternalLink, AlertTriangle, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  eventId: string;
  date: string;
  headline: string;
  headlineEn?: string;
  headlineEs?: string;
  source: string;
  url: string;
  urgent?: boolean;
}

interface NewsFeed {
  lastUpdated: string;
  items: NewsItem[];
}

// Category color lookup
const CATEGORY_COLORS: Record<string, string> = {
  pandemic: "#ef4444",
  war:      "#f97316",
  nuclear:  "#eab308",
  famine:   "#a78bfa",
};

function formatDate(iso: string, lang: "en" | "es") {
  return new Date(iso).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const host = (await headers()).get("host") ?? "";
  const brand = detectBrand(host);
  const allowedCategories = BRAND_CATEGORIES[brand];
  const t = await getServerT();
  const lang = await getServerLang();
  const isDV = brand === "deathvault";

  const feed = newsFeedRaw as NewsFeed;

  // Filter by allowed event categories for this brand
  const allowedEventIds = new Set(
    EVENTS
      .filter((e) => allowedCategories.includes(e.category))
      .map((e) => e.id)
  );

  const items = dedupeNews(
    feed.items.filter((item) => allowedEventIds.has(item.eventId)),
    lang,
  );

  // Group by eventId for section headers
  const eventMap = new Map(EVENTS.map((e) => [e.id, e]));
  const grouped = new Map<string, NewsItem[]>();
  for (const item of items) {
    if (!grouped.has(item.eventId)) grouped.set(item.eventId, []);
    grouped.get(item.eventId)!.push(item);
  }

  // Sort groups: urgent items first, then by most recent date
  const sortedGroups = Array.from(grouped.entries()).sort(([, aItems], [, bItems]) => {
    const aUrgent = aItems.some((i) => i.urgent) ? 1 : 0;
    const bUrgent = bItems.some((i) => i.urgent) ? 1 : 0;
    if (bUrgent !== aUrgent) return bUrgent - aUrgent;
    return new Date(bItems[0].date).getTime() - new Date(aItems[0].date).getTime();
  });

  const urgentCount = items.filter((i) => i.urgent).length;

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono text-red-400 uppercase tracking-widest font-semibold">
              {t("news_live_feed")}
            </span>
          </div>
          <h1 className="font-display font-black text-4xl text-white mb-3">
            {isDV ? t("news_title_dv") : t("news_title_pa")}
          </h1>
          <p className="text-slate-400 leading-relaxed max-w-2xl">
            {t("news_intro")}
            {urgentCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 text-red-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                {urgentCount} {urgentCount > 1 ? t("news_alert_many") : t("news_alert_one")}
              </span>
            )}
          </p>
          <p className="text-slate-600 text-xs font-mono mt-3 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {t("news_last_updated")} {formatDate(feed.lastUpdated, lang)}
          </p>
        </div>

        {/* News groups */}
        <div className="space-y-8">
          {sortedGroups.map(([eventId, groupItems]) => {
            const event = eventMap.get(eventId);
            if (!event) return null;
            const color = event.color ?? CATEGORY_COLORS[event.category] ?? "#6b7280";
            const hasUrgent = groupItems.some((i) => i.urgent);

            return (
              <section key={eventId} aria-label={event.name}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-1 h-6 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <Link
                    href={localizedHref(`/pandemic/${event.id}`, lang)}
                    className="font-display font-bold text-white text-lg hover:underline underline-offset-4"
                    style={{ color }}
                  >
                    {lang === "es" ? event.nameEs : event.name}
                  </Link>
                  {hasUrgent && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-xs font-mono font-semibold border border-red-500/30">
                      <AlertTriangle className="w-3 h-3" />
                      {t("news_urgent")}
                    </span>
                  )}
                </div>

                {/* News items */}
                <div className="space-y-2">
                  {groupItems
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 p-4 rounded-xl border border-border/30 transition-all duration-200 group cursor-pointer hover:bg-white/5"
                        style={item.urgent ? {
                          borderColor: color + "50",
                          backgroundColor: color + "08",
                        } : {}}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            {item.urgent && (
                              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-red-400" />
                            )}
                            <span
                              className="text-xs font-mono font-semibold uppercase tracking-wide"
                              style={{ color: item.urgent ? "#f87171" : "#64748b" }}
                            >
                              {item.source}
                            </span>
                            <span className="text-xs font-mono text-slate-600">·</span>
                            <time
                              dateTime={item.date}
                              className="text-xs font-mono text-slate-600"
                            >
                              {formatDate(item.date, lang)}
                            </time>
                          </div>
                          <p className="text-slate-200 text-sm leading-snug group-hover:text-white transition-colors duration-150">
                            {displayHeadline(item, lang)}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 flex-shrink-0 text-slate-600 group-hover:text-slate-400 mt-0.5 transition-colors duration-150" />
                      </a>
                    ))}
                </div>
              </section>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="card p-12 text-center">
            <p className="text-slate-500 font-mono text-sm">{t("news_empty")}</p>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-slate-600 text-xs font-mono">
            {t("news_footer")}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
