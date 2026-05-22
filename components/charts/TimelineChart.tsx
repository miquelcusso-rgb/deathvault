"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDeaths } from "@/data/events";
import type { HistoricalEvent } from "@/data/events";
import { useI18n } from "@/lib/i18n";

interface Props {
  event: HistoricalEvent;
}

const CustomTooltip = ({ active, payload, label, yearLabel, deathsLabel }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl p-3 shadow-panel backdrop-blur-sm"
      style={{ backgroundColor: "rgba(10,14,23,0.97)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <p className="text-xs font-mono mb-1" style={{ color: "#94a3b8" }}>{yearLabel} {label}</p>
      <p className="font-mono font-bold" style={{ color: "#f8fafc" }}>{formatDeaths(payload[0].value)} {deathsLabel}</p>
      {payload[0].payload.label && (
        <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>{payload[0].payload.label}</p>
      )}
    </div>
  );
};

export function TimelineChart({ event }: Props) {
  const { t } = useI18n();
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={event.timeline} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#64748B", fontSize: 10, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatDeaths(v)}
            tick={{ fill: "#64748B", fontSize: 10, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip yearLabel={t("chart_year")} deathsLabel={t("deaths")} />} />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke={event.color}
            strokeWidth={2.5}
            dot={{ fill: event.color, r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: event.color, stroke: "#ffffff40", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
