import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics — Deadliest Events in History",
  description:
    "Data-driven statistics on the deadliest pandemics, wars, and nuclear events. Ranked death tolls, category breakdowns, and interactive charts comparing 813M+ deaths across 16 historical events.",
  alternates: {
    canonical: "https://www.plagueatlas.com/statistics",
  },
  openGraph: {
    title: "Historical Death Statistics | PlagueAtlas",
    description:
      "Ranked comparisons of history's deadliest pandemics, wars, and nuclear events. Interactive charts and data visualizations.",
    url: "https://www.plagueatlas.com/statistics",
  },
};

export default function StatisticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
