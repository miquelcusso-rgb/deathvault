"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { EVENTS, formatDeaths, type HistoricalEvent } from "@/data/events";
import { useI18n } from "@/lib/i18n";

const CATEGORY_CONFIG = {
  pandemic: { color: "#10B981", labelKey: "selector_pandemics" },
  war:      { color: "#94A3B8", labelKey: "selector_wars" },
  nuclear:  { color: "#FBBF24", labelKey: "selector_nuclear" },
  famine:   { color: "#F97316", labelKey: "selector_famines" },
  genocide: { color: "#f43f5e", labelKey: "selector_genocides" },
} as const;

const CustomTooltip = ({ active, payload, deathsLabel }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 backdrop-blur-sm" style={{ backgroundColor: "rgba(10,14,23,0.97)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-sm font-semibold" style={{ color: "#f8fafc" }}>{payload[0].name}</p>
      <p className="text-xs font-mono mt-1" style={{ color: "#94a3b8" }}>
        {formatDeaths(payload[0].value)} {deathsLabel}
      </p>
    </div>
  );
};

interface Props {
  /** Brand-filtered events. Falls back to all events for backwards-compat. */
  events?: HistoricalEvent[];
}

export function CategoryDonut({ events = EVENTS }: Props) {
  const { t } = useI18n();

  const data = Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => {
    const total = events.filter((e) => e.category === cat).reduce(
      (sum, e) => sum + e.deathsEstimate,
      0
    );
    return { name: t(cfg.labelKey as any), value: total, color: cfg.color };
  }).filter((d) => d.value > 0);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} opacity={0.85} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip deathsLabel={t("deaths")} />} />
        <Legend
          formatter={(value) => (
            <span style={{ color: "#94A3B8", fontSize: 12, fontFamily: "monospace" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
