import type { EventCategory } from "@/data/events";

export type Brand = "plagueatlas" | "deathvault";

/** Server-side: detect brand from HTTP Host header */
export function detectBrand(host: string): Brand {
  if (host.includes("plagueatlas")) return "plagueatlas";
  if (host.includes("deathvault"))  return "deathvault";
  // Local dev: default to deathvault (new primary brand)
  // Override with NEXT_PUBLIC_BRAND=plagueatlas in .env.local
  if (process.env.NEXT_PUBLIC_BRAND === "plagueatlas") return "plagueatlas";
  return "deathvault";
}

/** Which event categories each brand shows */
export const BRAND_CATEGORIES: Record<Brand, EventCategory[]> = {
  plagueatlas: ["pandemic", "famine"],
  deathvault:  ["pandemic", "war", "nuclear", "famine"],
};

export const BRAND_META = {
  plagueatlas: {
    name:        "PlagueAtlas",
    headline:    "History's Deadliest Diseases",
    tagline:     "Interactive pandemic & famine map — 1,500 years of data",
    description: "Explore and compare the deadliest pandemics and famines in human history. Interactive 3D globe, animated death counters, and data-driven statistics.",
    url:         "https://www.plagueatlas.com",
    canonical:   "https://www.plagueatlas.com",
    keywords:    ["pandemic map","plague atlas","interactive pandemic map","history of pandemics","pandemic death toll","black death map","spanish flu deaths","COVID-19 statistics","deadliest pandemics","disease death counter","plagueatlas"],
  },
  deathvault: {
    name:        "DeathVault",
    headline:    "Every Mass Death Event in Recorded History",
    tagline:     "Pandemics · Wars · Nuclear disasters — 813M+ casualties documented",
    description: "Classified archive of history's deadliest events. Pandemics, world wars, and nuclear disasters visualised on an interactive globe. 813M+ deaths across 16 events.",
    url:         "https://www.deathvault.app",
    canonical:   "https://www.deathvault.app",
    keywords:    ["death vault","deathvault","deadliest events history","war casualties","pandemic deaths","nuclear disaster casualties","historical death toll","WWII deaths","black death","casualty archive","interactive history map"],
  },
} as const;
