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
  plagueatlas: ["pandemic"],
  deathvault:  ["pandemic", "war", "nuclear", "famine", "genocide"],
};

export const BRAND_META = {
  plagueatlas: {
    name:        "PlagueAtlas",
    headline:    "History's Deadliest Pandemics, Mapped",
    tagline:     "Interactive epidemic & disease history map — 1,500 years of data",
    taglineEs:   "Mapa interactivo de la historia de epidemias y enfermedades — 1.500 años de datos",
    description: "How many people died from the Black Death, Spanish Flu, and COVID-19? Interactive 3D map of history's deadliest pandemics with real-time death counters and outbreak news.",
    descriptionEs: "¿Cuántas personas murieron por la Peste Negra, la Gripe Española o el COVID-19? Mapa 3D interactivo de las pandemias más mortíferas de la historia, con contadores de muertes en tiempo real y noticias de brotes.",
    url:         "https://www.plagueatlas.com",
    canonical:   "https://www.plagueatlas.com",
    keywords:    [
      "how many people died from the black death",
      "deadliest pandemics in history",
      "pandemic death toll interactive map",
      "black death deaths",
      "spanish flu deaths",
      "covid-19 death toll",
      "malaria deaths per year",
      "hiv aids deaths",
      "cholera deaths",
      "hantavirus outbreak 2026",
      "history of pandemics",
      "pandemic map",
      "interactive disease map",
      "plagueatlas",
    ],
  },
  deathvault: {
    name:        "DeathVault",
    headline:    "Every Mass Death Event in Recorded History",
    tagline:     "Pandemics · Wars · Famines · Nuclear disasters — 813M+ casualties documented",
    taglineEs:   "Pandemias · Guerras · Hambrunas · Desastres nucleares — Más de 813M de víctimas documentadas",
    description: "How many people died in WWII, the Black Death, or Chernobyl? Interactive archive of history's deadliest events — pandemics, world wars, famines, nuclear disasters. 813M+ deaths documented.",
    descriptionEs: "¿Cuántas personas murieron en la Segunda Guerra Mundial, la Peste Negra o Chernóbil? Archivo interactivo de los eventos más mortíferos de la historia: pandemias, guerras mundiales, hambrunas y desastres nucleares. Más de 813M de muertes documentadas.",
    url:         "https://www.deathvault.app",
    canonical:   "https://www.deathvault.app",
    keywords:    [
      "how many people died in world war 2",
      "deadliest events in human history",
      "war death toll by country",
      "chernobyl deaths",
      "hiroshima deaths",
      "wwii casualties",
      "mongol conquests deaths",
      "black death death toll",
      "historical death toll database",
      "worst disasters in history",
      "mass death events history",
      "interactive history map",
      "deathvault",
    ],
  },
} as const;
