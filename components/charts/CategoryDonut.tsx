"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { EVENTS, formatDeaths } from "@/data/events";
import { useI18n } from "@/lib/i18n";

const CATEGORY_CONFIG = {
  pandemic: { color: "#10B981", label: "Pandemics" },
  war:      { color: "#94A3B8", label: "Wars" },
  nuclear:  { color: "#FBBF24", label: "Nuclear" },
  famine:   { color: "#F97316", label: "Famines" },
  genocide: { color: "#f43f5e", label: "Genocides" },
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface/95 border border-border/60 rounded-xl p-3 backdrop-blur-sm">
      <p className="text-white text-sm font-semibold">{payload[0].name}</p>
      <p className="text-slate-300 text-xs font-mono mt-1">
        {formatDeaths(payload[0].value)} deaths
      </p>
    </div>
  );
};

export function CategoryDonut() {
  const { t } = useI18n();

  const data = Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => {
    const total = EVENTS.filter((e) => e.category === cat).reduce(
      (sum, e) => sum + e.deathsEstimate,
      0
    );
    return { name: cfg.label, value: total, color: cfg.color };
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
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => (
            <span style={{ color: "#94A3B8", fontSize: 12, fontFamily: "monospace" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
