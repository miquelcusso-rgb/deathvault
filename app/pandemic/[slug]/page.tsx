import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, Skull, Users, Calendar,
  MapPin, Bug, ChevronDown, AlertCircle,
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { getEventById, EVENTS, formatDeaths } from "@/data/events";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import { localizedHref } from "@/lib/locale";
// ssr:false dynamic imports must live in a "use client" file — not allowed in RSC
import { TimelineChart } from "@/components/PandemicClientParts";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PandemicPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventById(slug);

  if (!event) notFound();

  const lang = await getServerLang();
  const t = await getServerT();
  const isEs = lang === "es";

  // ── Localised content helpers ─────────────────────────────────────────────
  const evName        = isEs ? event.nameEs        : event.name;
  const evDescription = isEs ? event.descriptionEs : event.descriptionEn;
  // Long description: use ES version if available, fall back to EN
  const evLongDesc    = isEs
    ? ((event as any).longDescriptionEs ?? event.longDescriptionEn)
    : event.longDescriptionEn;
  const evSymptoms    = isEs ? event.symptomsEs    : event.symptomsEn;
  const evFaqs        = (isEs ? (event.faqsEs ?? event.faqs) : event.faqs) ?? [];
  const evPresent     = t("ev_present");
  const evCategory    = t(event.category as any);

  const relatedEvents = EVENTS
    .filter((e) => e.category === event.category && e.id !== event.id)
    .sort((a, b) => b.deathsEstimate - a.deathsEstimate)
    .slice(0, 3);

  // Pillar deep-dive pages that exist as root routes (/black-death, /cholera…).
  // This indexed event page links to its pillar to pass discovery + link equity
  // (fixes pillars showing "URL is unknown to Google" — 2026-06-01).
  const PILLAR_SLUGS = new Set(["black-death", "spanish-flu", "bubonic-plague", "cholera"]);
  const hasPillar = PILLAR_SLUGS.has(event.id);

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 pt-24 pb-16">

        {/* Back */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href={localizedHref("/", lang)}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div
            className="card p-8 relative overflow-hidden"
            style={{
              borderColor: event.color + "40",
              boxShadow: `0 0 60px ${event.color}10`,
            }}
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{ background: `radial-gradient(circle at top right, ${event.color}, transparent 60%)` }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: event.color }} />
                    <span
                      className="text-xs font-mono font-semibold uppercase tracking-wider"
                      style={{ color: event.color }}
                    >
                      {evCategory}
                    </span>
                  </div>
                  <h1 className="font-display font-black text-4xl text-white mb-1">{evName}</h1>
                  {event.pathogen && (
                    <p className="text-slate-500 font-mono text-sm">{event.pathogen}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-mono font-black text-4xl" style={{ color: event.color }}>
                    {formatDeaths(event.deathsEstimate)}
                  </p>
                  <p className="text-slate-500 text-xs font-mono mt-0.5">{t("ev_est_deaths")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            {
              label: t("period"),
              value: `${event.startYear}–${event.endYear ?? t("ongoing")}`,
              icon: <Calendar className="w-4 h-4" />,
            },
            {
              label: t("origin"),
              value: event.originCountry,
              icon: <MapPin className="w-4 h-4" />,
            },
            {
              label: t("ev_death_range"),
              value: `${formatDeaths(event.deathsMin)}–${formatDeaths(event.deathsMax)}`,
              icon: <Skull className="w-4 h-4" />,
            },
            event.infectedEstimate
              ? {
                  label: t("infected"),
                  value: formatDeaths(event.infectedEstimate),
                  icon: <Users className="w-4 h-4" />,
                }
              : {
                  label: t("ev_regions_label"),
                  value: `${event.regions.length} ${t("ev_regions_count")}`,
                  icon: <MapPin className="w-4 h-4" />,
                },
          ].map((stat) => (
            <div key={stat.label} className="card p-4">
              <div className="flex items-center gap-1.5 mb-1.5" style={{ color: event.color }}>
                {stat.icon}
                <span className="text-xs font-mono text-slate-500 uppercase">{stat.label}</span>
              </div>
              <p className="font-mono font-bold text-white text-sm">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Pillar deep-dive CTA — links the indexed event page to its in-depth guide */}
        {hasPillar && (
          <Link
            href={localizedHref("/" + event.id, lang)}
            className="card p-5 mb-6 flex items-center justify-between gap-4 group transition-colors"
            style={{ borderColor: event.color + "40" }}
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: event.color }}>
                {isEs ? "Guía completa" : "In-depth guide"}
              </p>
              <p className="text-white font-display font-bold">
                {isEs
                  ? `${evName}: síntomas, causa, tratamiento e historia`
                  : `${evName}: symptoms, cause, treatment & history`}
              </p>
            </div>
            <ArrowLeft className="w-5 h-5 rotate-180 shrink-0 text-slate-400 group-hover:text-white transition-colors" />
          </Link>
        )}

        {/* Overview */}
        <div className="card p-6 mb-6">
          <h2 className="font-display font-bold text-white text-xl mb-4">{t("ev_overview")}</h2>
          <p className="text-slate-300 leading-relaxed">{evDescription}</p>
        </div>

        {/* Full History */}
        {evLongDesc && (
          <div className="card p-6 mb-6">
            <h2 className="font-display font-bold text-white text-xl mb-4">{t("ev_full_history")}</h2>
            <div className="space-y-4">
              {evLongDesc.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="text-slate-300 leading-relaxed">{para.trim()}</p>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="card p-6 mb-6">
          <h2 className="font-display font-bold text-white text-xl mb-4">{t("ev_timeline_label")}</h2>
          <TimelineChart event={event} />
          <div className="mt-4 space-y-2">
            {event.timeline.filter((tp) => tp.label).map((tp, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-slate-500 w-12 flex-shrink-0">{tp.year}</span>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                <span className="text-slate-400">{tp.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms / Effects */}
        {evSymptoms.length > 0 && (
          <div className="card p-6 mb-6">
            <h2 className="font-display font-bold text-white text-xl mb-4">{t("ev_symptoms_effects")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {evSymptoms.map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-2 p-3 rounded-xl border text-sm"
                  style={{ borderColor: event.color + "30", backgroundColor: event.color + "08" }}
                >
                  <Bug className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: event.color }} />
                  <span className="text-slate-300">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affected Regions */}
        <div className="card p-6 mb-6">
          <h2 className="font-display font-bold text-white text-xl mb-4">{t("ev_affected_regions")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {event.regions.map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-2 p-2.5 rounded-xl border"
                style={{ borderColor: event.color + "30", backgroundColor: event.color + "08" }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: event.color, opacity: 0.4 + r.intensity * 0.6 }}
                />
                <span className="text-slate-400 text-xs">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion — native <details> works without JS */}
        {evFaqs.length > 0 && (
          <div className="card p-6 mb-6">
            <h2 className="font-display font-bold text-white text-xl mb-4">
              {t("ev_faq")}
            </h2>
            <div className="space-y-2">
              {evFaqs.map(({ q, a }, i) => (
                <details
                  key={i}
                  className="group rounded-xl border overflow-hidden"
                  style={{ borderColor: event.color + "30" }}
                >
                  <summary
                    className="flex items-center justify-between gap-3 p-4 cursor-pointer select-none hover:bg-white/5 transition-colors duration-150"
                    style={{ backgroundColor: event.color + "08" }}
                  >
                    <span className="text-slate-200 text-sm font-medium leading-snug">{q}</span>
                    <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-4 pb-4 pt-2">
                    <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        <div className="card p-6 mb-8">
          <h2 className="font-display font-bold text-white text-xl mb-4">{t("ev_sources")}</h2>
          <div className="space-y-2">
            {event.references.map((ref) => (
              <a
                key={ref.url}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border/40 hover:bg-white/5 hover:border-border/80 transition-all duration-200 cursor-pointer group"
              >
                <div>
                  <p className="text-slate-300 text-sm group-hover:text-white transition-colors duration-200">
                    {ref.title}
                  </p>
                  <p className="text-slate-600 text-xs font-mono mt-0.5">{ref.source}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Data Reliability Note */}
        {event.dataReliabilityLevel && (
          <div className="card p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-500" />
            <p className="text-xs text-slate-500 leading-relaxed">
              {event.dataReliabilityNote ?? t(`ev_data_${event.dataReliabilityLevel}` as any)}
            </p>
          </div>
        )}

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="card p-6 mb-8">
            <h2 className="font-display font-bold text-white text-xl mb-4">{t("ev_related")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedEvents.map((rel) => {
                const relName = isEs ? rel.nameEs : rel.name;
                return (
                  <Link
                    key={rel.id}
                    href={localizedHref(`/pandemic/${rel.id}`, lang)}
                    className="flex flex-col gap-2 p-4 rounded-xl border hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                    style={{ borderColor: rel.color + "40" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: rel.color }} />
                      <span className="text-xs font-mono text-slate-500 uppercase">
                        {rel.endYear ? `${rel.startYear}–${rel.endYear}` : `${rel.startYear}–${evPresent}`}
                      </span>
                    </div>
                    <p className="text-slate-200 text-sm font-semibold group-hover:text-white transition-colors duration-150">
                      {relName}
                    </p>
                    <p className="text-xs font-mono font-bold" style={{ color: rel.color }}>
                      {formatDeaths(rel.deathsEstimate)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
