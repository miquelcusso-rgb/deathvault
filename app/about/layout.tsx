import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PlagueAtlas — Interactive Pandemic History Map",
  description:
    "PlagueAtlas is an independent educational project mapping history's deadliest events. Data sourced from WHO, CDC, IAEA, and peer-reviewed research.",
  alternates: {
    canonical: "https://www.plagueatlas.com/about",
  },
  openGraph: {
    title: "About PlagueAtlas",
    description:
      "An independent, educational data visualization of history's deadliest pandemics, wars, and nuclear events.",
    url: "https://www.plagueatlas.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
