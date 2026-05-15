"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { formatDeaths } from "@/data/events";
import type { HistoricalEvent } from "@/data/events";
import { useI18n } from "@/lib/i18n";

interface Props {
  events: HistoricalEvent[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface/95 border border-border/60 rounded-xl p-3 shadow-panel backdrop-blur-sm">
      <p className="text-white text-sm font-semibold mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-slate-400 capitalize">{p.dataKey}:</span>
          <span className="text-white font-mono font-semibold">
            {formatDeaths(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export function ComparisonChart({ events }: Props) {
  const { t, lang } = useI18n();

  const data = events.map((e) => ({
    name: lang === "es" ? e.nameEs : e.name,
    name_short:
      (lang === "es" ? e.nameEs : e.name).length > 14
        ? (lang === "es" ? e.nameEs : e.name).slice(0, 12) + "…"
        : lang === "es"
        ? e.nameEs
        : e.name,
    deaths: e.deathsEstimate,
    min: e.deathsMin,
    max: e.deathsMax,
    color: e.color,
  }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" vertical={false} />
          <XAxis
            dataKey="name_short"
            tick={{ fill: "#64748B", fontSize: 11, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatDeaths(v)}
            tick={{ fill: "#64748B", fontSize: 10, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="deaths" radius={[6, 6, 0, 0]} maxBarSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
