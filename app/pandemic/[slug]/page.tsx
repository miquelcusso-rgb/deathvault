"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Skull, Users, Calendar, MapPin, Bug, ChevronDown, Info, AlertCircle, ShieldAlert } from "lucide-react";
import { ShareButton } from "@/components/ui/ShareButton";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { TimelineChart } from "@/components/charts/TimelineChart";
import { getEventById, EVENTS, formatDeaths } from "@/data/events";
import { useI18n } from "@/lib/i18n";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function PandemicPage({ params }: Props) {
  const { slug } = use(params);
  const { t, lang } = useI18n();
  const event = getEventById(slug);

  if (!event) notFound();

  const name = lang === "es" ? event.nameEs : event.name;
  const description = lang === "es" ? event.descriptionEs : event.descriptionEn;
  const symptoms = lang === "es" ? event.symptomsEs : event.symptomsEn;

  // Related events: same category, exclude self, top 3 by death toll
  const relatedEvents = EVENTS
    .filter((e) => e.category === event.category && e.id !== event.id)
    .sort((a, b) => b.deathsEstimate - a.deathsEstimate)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-12 pb-16">
        {/* Back */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </Link>
          <ShareButton
            title={name}
            text={`${formatDeaths(event.deathsEstimate)} deaths · ${event.startYear}–${event.endYear ?? "present"}`}
          />
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            className="card p-8 relative overflow-hidden"
            style={{
              borderColor: event.color + "40",
              boxShadow: `0 0 60px ${event.color}10`,
            }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                background: `radial-gradient(circle at top right, ${event.color}, transparent 60%)`,
              }}
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
                      {t(event.category as "pandemic" | "war" | "nuclear" | "famine" | "genocide")}
                    </span>
                  </div>
                  <h1 className="font-display font-black text-4xl text-white mb-1">{name}</h1>
                  {event.pathogen && (
                    <p className="text-slate-500 font-mono text-sm">{event.pathogen}</p>
                  )}
                </div>
                <div className="text-right">
                  <p
                    className="font-mono font-black text-4xl"
                    style={{ color: event.color }}
                  >
                    {formatDeaths(event.deathsEstimate)}
                  </p>
                  <p className="text-slate-500 text-xs font-mono mt-0.5">estimated deaths</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
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
              label: "Death range",
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
                  label: "Regions",
                  value: `${event.regions.length} areas`,
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

        {/* Description */}
        <div className="card p-6 mb-6">
          <h2 className="font-display font-bold text-white text-xl mb-4">Overview</h2>
          <p className="text-slate-300 leading-relaxed">{description}</p>
        </div>

        {/* Long Description — full historical article */}
        {event.longDescriptionEn && (
          <div className="card p-6 mb-6">
            <h2 className="font-display font-bold text-white text-xl mb-4">Full History</h2>
            <div className="space-y-4">
              {event.longDescriptionEn.split("\n\n").map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed">{para.trim()}</p>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="card p-6 mb-6">
          <h2 className="font-display font-bold text-white text-xl mb-4">{t("stats_timeline")}</h2>
          <TimelineChart event={event} />
          <div className="mt-4 space-y-2">
            {event.timeline.filter((t) => t.label).map((tp, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-slate-500 w-12 flex-shrink-0">{tp.year}</span>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                <span className="text-slate-400">{tp.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        {symptoms.length > 0 && (
          <div className="card p-6 mb-6">
            <h2 className="font-display font-bold text-white text-xl mb-4">{t("symptoms")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {symptoms.map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-2 p-3 rounded-xl border text-sm"
                  style={{
                    borderColor: event.color + "30",
                    backgroundColor: event.color + "08",
                  }}
                >
                  <Bug className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: event.color }} />
                  <span className="text-slate-300">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affected regions */}
        <div className="card p-6 mb-6">
          <h2 className="font-display font-bold text-white text-xl mb-4">Affected Regions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {event.regions.map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-2 p-2.5 rounded-xl border"
                style={{ borderColor: event.color + "30", backgroundColor: event.color + "08" }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: event.color,
                    opacity: 0.4 + r.intensity * 0.6,
                  }}
                />
                <span className="text-slate-400 text-xs">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* References */}
        <div className="card p-6 mb-8">
          <h2 className="font-display font-bold text-white text-xl mb-4">{t("sources")}</h2>
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

        {/* FAQ Accordion */}
        {event.faqs && event.faqs.length > 0 && (
          <div className="card p-6 mb-6">
            <h2 className="font-display font-bold text-white text-xl mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {event.faqs.map(({ q, a }, i) => (
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
                    <ChevronDown
                      className="w-4 h-4 flex-shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-4 pb-4 pt-2">
                    <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="card p-6 mb-8">
            <h2 className="font-display font-bold text-white text-xl mb-4">Related Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedEvents.map((rel) => {
                const relName = lang === "es" ? rel.nameEs : rel.name;
                const relPeriod = rel.endYear
                  ? `${rel.startYear}–${rel.endYear}`
                  : `${rel.startYear}–present`;
                return (
                  <Link
                    key={rel.id}
                    href={`/pandemic/${rel.id}`}
                    className="flex flex-col gap-2 p-4 rounded-xl border hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                    style={{ borderColor: rel.color + "40" }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: rel.color }} />
                      <span className="text-xs font-mono text-slate-500 uppercase">{relPeriod}</span>
                    </div>
                    <p className="text-slate-200 text-sm font-semibold group-hover:text-white transition-colors duration-150">
                      {relName}
                    </p>
                    <p className="font-mono text-xs font-bold" style={{ color: rel.color }}>
                      {formatDeaths(rel.deathsEstimate)} deaths
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Compare CTA */}
        <div className="card p-6 text-center" style={{ borderColor: event.color + "30" }}>
          <p className="text-slate-400 text-sm mb-3">
            Compare {name} with other events
          </p>
          <Link href="/compare" className="btn-primary">
            Open Comparison Tool
          </Link>
        </div>

        {/* Data reliability footnote */}
        {event.dataReliabilityNote && (
          <div className={`mt-6 flex items-start gap-3 px-4 py-3 rounded-xl border text-xs font-mono ${
            event.dataReliabilityLevel === "high"
              ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400/80"
              : event.dataReliabilityLevel === "moderate"
              ? "border-amber-500/20 bg-amber-500/5 text-amber-400/80"
              : "border-red-500/20 bg-red-500/5 text-red-400/80"
          }`}>
            {event.dataReliabilityLevel === "high"
              ? <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              : event.dataReliabilityLevel === "moderate"
              ? <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              : <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            }
            <span>
              <strong className="uppercase tracking-wider mr-1">
                {event.dataReliabilityLevel === "high" ? "Data confidence: High" : event.dataReliabilityLevel === "moderate" ? "Data confidence: Moderate" : "Data confidence: Low"}
              </strong>
              — {event.dataReliabilityNote}
            </span>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
