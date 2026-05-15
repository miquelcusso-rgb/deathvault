import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Pandemics & Wars — Side-by-Side Death Toll",
  description:
    "Compare any two historical events side by side. Deaths, timelines, and geographic spread — Black Death vs WWII, Spanish Flu vs COVID-19, and more.",
  alternates: {
    canonical: "https://www.plagueatlas.com/compare",
  },
  openGraph: {
    title: "Compare Historical Events | PlagueAtlas",
    description:
      "Side-by-side comparison of pandemics, wars, and nuclear events. Death tolls, timelines, and geographic impact.",
    url: "https://www.plagueatlas.com/compare",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
