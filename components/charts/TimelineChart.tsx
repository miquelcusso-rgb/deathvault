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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface/95 border border-border/60 rounded-xl p-3 shadow-panel backdrop-blur-sm">
      <p className="text-slate-400 text-xs font-mono mb-1">Year {label}</p>
      <p className="text-white font-mono font-bold">{formatDeaths(payload[0].value)} deaths</p>
      {payload[0].payload.label && (
        <p className="text-slate-400 text-xs mt-1">{payload[0].payload.label}</p>
      )}
    </div>
  );
};

export function TimelineChart({ event }: Props) {
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
          <Tooltip content={<CustomTooltip />} />
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
