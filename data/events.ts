export type EventCategory = "pandemic" | "war" | "nuclear" | "famine";

export interface GeoRegion {
  lat: number;
  lng: number;
  radius: number; // visual spread radius
  intensity: number; // 0-1
  label: string;
}

export interface TimelinePoint {
  year: number;
  deaths: number;
  label?: string;
}

export interface Reference {
  title: string;
  url: string;
  source: string;
}

export interface HistoricalEvent {
  id: string;
  name: string;
  nameEs: string;
  category: EventCategory;
  pathogen?: string;
  startYear: number;
  endYear: number | null;
  deathsMin: number;
  deathsMax: number;
  deathsEstimate: number;
  infectedEstimate?: number;
  color: string;
  glowColor: string;
  icon: string; // lucide icon name
  regions: GeoRegion[];
  timeline: TimelinePoint[];
  descriptionEn: string;
  descriptionEs: string;
  symptomsEn: string[];
  symptomsEs: string[];
  originCountry: string;
  originLat: number;
  originLng: number;
  references: Reference[];
  tags: string[];
}

export const EVENTS: HistoricalEvent[] = [
  // ── PANDEMICS ──────────────────────────────────────────────────────────────
  {
    id: "plague-of-justinian",
    name: "Plague of Justinian",
    nameEs: "Plaga de Justiniano",
    category: "pandemic",
    pathogen: "Yersinia pestis",
    startYear: 541,
    endYear: 549,
    deathsMin: 25_000_000,
    deathsMax: 50_000_000,
    deathsEstimate: 30_000_000,
    infectedEstimate: 80_000_000,
    color: "#A855F7",
    glowColor: "rgba(168,85,247,0.5)",
    icon: "Bug",
    originCountry: "Egypt",
    originLat: 26.8,
    originLng: 30.8,
    regions: [
      { lat: 41.0, lng: 29.0, radius: 4, intensity: 0.9, label: "Constantinople" },
      { lat: 41.9, lng: 12.5, radius: 3.5, intensity: 0.8, label: "Rome" },
      { lat: 36.8, lng: 30.8, radius: 3, intensity: 0.7, label: "Eastern Mediterranean" },
      { lat: 31.0, lng: 31.2, radius: 3, intensity: 0.85, label: "Egypt" },
    ],
    timeline: [
      { year: 541, deaths: 5_000_000, label: "Outbreak begins in Egypt" },
      { year: 542, deaths: 10_000_000, label: "Reaches Constantinople" },
      { year: 544, deaths: 20_000_000, label: "Peak mortality" },
      { year: 549, deaths: 30_000_000, label: "End of first wave" },
    ],
    descriptionEn:
      "The Plague of Justinian was the first major pandemic recorded in history, striking the Byzantine Empire and surrounding regions. Caused by Yersinia pestis — the same bacterium behind the Black Death — it killed between 25 and 50 million people, possibly half the population of Europe. It devastated Constantinople, killing thousands per day at its peak, and contributed to the decline of the Eastern Roman Empire.",
    descriptionEs:
      "La Plaga de Justiniano fue la primera gran pandemia registrada en la historia, que azotó el Imperio Bizantino y las regiones circundantes. Causada por Yersinia pestis — la misma bacteria de la Peste Negra — mató entre 25 y 50 millones de personas, posiblemente la mitad de la población de Europa. Devastó Constantinopla, matando miles de personas al día en su punto álgido.",
    symptomsEn: ["Buboes (swollen lymph nodes)", "High fever", "Gangrene of extremities", "Delirium", "Vomiting blood"],
    symptomsEs: ["Bubones (ganglios linfáticos inflamados)", "Fiebre alta", "Gangrena de extremidades", "Delirio", "Vómitos de sangre"],
    references: [
      { title: "Plague of Justinian — WHO Historical Records", url: "https://www.who.int", source: "WHO" },
      { title: "The Justinianic Plague — Science Advances", url: "https://www.science.org", source: "Science Advances" },
    ],
    tags: ["bubonic", "ancient", "bacteria", "byzantine"],
  },
  {
    id: "black-death",
    name: "Black Death",
    nameEs: "Peste Negra",
    category: "pandemic",
    pathogen: "Yersinia pestis",
    startYear: 1347,
    endYear: 1353,
    deathsMin: 75_000_000,
    deathsMax: 200_000_000,
    deathsEstimate: 120_000_000,
    infectedEstimate: 300_000_000,
    color: "#7C3AED",
    glowColor: "rgba(124,58,237,0.5)",
    icon: "Skull",
    originCountry: "Central Asia",
    originLat: 42.0,
    originLng: 75.0,
    regions: [
      { lat: 48.8, lng: 2.3, radius: 5, intensity: 0.9, label: "France" },
      { lat: 51.5, lng: -0.1, radius: 4.5, intensity: 0.85, label: "England" },
      { lat: 41.9, lng: 12.5, radius: 4.5, intensity: 0.9, label: "Italy" },
      { lat: 52.5, lng: 13.4, radius: 4, intensity: 0.8, label: "Germany" },
      { lat: 40.4, lng: -3.7, radius: 4, intensity: 0.75, label: "Spain" },
      { lat: 55.7, lng: 37.6, radius: 3.5, intensity: 0.7, label: "Russia" },
      { lat: 31.0, lng: 31.2, radius: 3.5, intensity: 0.8, label: "Egypt" },
    ],
    timeline: [
      { year: 1347, deaths: 5_000_000, label: "Enters Europe via Crimea" },
      { year: 1348, deaths: 40_000_000, label: "Ravages Italy, France, Spain" },
      { year: 1349, deaths: 80_000_000, label: "Peak across Europe" },
      { year: 1350, deaths: 110_000_000, label: "Reaches Scandinavia" },
      { year: 1353, deaths: 120_000_000, label: "First major wave ends" },
    ],
    descriptionEn:
      "The Black Death was the most devastating pandemic in human history, wiping out an estimated 30–60% of Europe's population in just six years. Caused by the bacterium Yersinia pestis and spread primarily by fleas on rats, it originated in Central Asia and spread westward along trade routes. It fundamentally transformed European society — labor became scarce, feudalism weakened, and the Renaissance followed partly as a result.",
    descriptionEs:
      "La Peste Negra fue la pandemia más devastadora de la historia humana, eliminando entre el 30-60% de la población europea en seis años. Causada por la bacteria Yersinia pestis y propagada principalmente por pulgas en ratas, originó en Asia Central y se extendió hacia el oeste por rutas comerciales. Transformó fundamentalmente la sociedad europea.",
    symptomsEn: ["Painful swollen lymph nodes (buboes)", "Black skin patches", "High fever", "Vomiting blood", "Rapid death within days"],
    symptomsEs: ["Ganglios linfáticos inflamados dolorosos (bubones)", "Manchas negras en la piel", "Fiebre alta", "Vómitos de sangre", "Muerte rápida en días"],
    references: [
      { title: "Black Death — CDC", url: "https://www.cdc.gov", source: "CDC" },
      { title: "The Black Death 1348 — British Library", url: "https://www.bl.uk", source: "British Library" },
    ],
    tags: ["bubonic", "medieval", "bacteria", "europe", "plague"],
  },
  {
    id: "smallpox",
    name: "Smallpox (20th century)",
    nameEs: "Viruela (siglo XX)",
    category: "pandemic",
    pathogen: "Variola virus",
    startYear: 1900,
    endYear: 1980,
    deathsMin: 300_000_000,
    deathsMax: 500_000_000,
    deathsEstimate: 300_000_000,
    infectedEstimate: 1_000_000_000,
    color: "#EF4444",
    glowColor: "rgba(239,68,68,0.5)",
    icon: "Biohazard",
    originCountry: "Global (ancient)",
    originLat: 20.0,
    originLng: 78.0,
    regions: [
      { lat: 20.0, lng: 78.0, radius: 6, intensity: 1.0, label: "India" },
      { lat: 9.1, lng: 40.5, radius: 5.5, intensity: 0.9, label: "Africa" },
      { lat: -14.2, lng: -51.9, radius: 4.5, intensity: 0.8, label: "Brazil" },
      { lat: 35.9, lng: 104.2, radius: 5, intensity: 0.85, label: "China" },
      { lat: 51.5, lng: -0.1, radius: 3.5, intensity: 0.6, label: "Europe (early 1900s)" },
    ],
    timeline: [
      { year: 1900, deaths: 50_000_000 },
      { year: 1920, deaths: 120_000_000 },
      { year: 1940, deaths: 200_000_000 },
      { year: 1960, deaths: 270_000_000 },
      { year: 1967, deaths: 296_000_000, label: "WHO eradication campaign begins" },
      { year: 1980, deaths: 300_000_000, label: "Officially eradicated" },
    ],
    descriptionEn:
      "Smallpox is considered one of the deadliest diseases in human history. In the 20th century alone, it killed an estimated 300–500 million people before being eradicated through a global vaccination campaign led by the WHO. The last natural case was recorded in 1977. It remains the only human infectious disease to have been completely eradicated.",
    descriptionEs:
      "La viruela es considerada una de las enfermedades más mortíferas de la historia. Solo en el siglo XX mató aproximadamente 300-500 millones de personas antes de ser erradicada mediante una campaña global de vacunación de la OMS. El último caso natural fue en 1977. Sigue siendo la única enfermedad infecciosa humana completamente erradicada.",
    symptomsEn: ["Distinctive skin rash with fluid-filled blisters", "High fever", "Headache", "Severe back pain", "Blindness (in survivors)"],
    symptomsEs: ["Erupción cutánea característica con ampollas", "Fiebre alta", "Dolor de cabeza", "Dolor de espalda severo", "Ceguera (en sobrevivientes)"],
    references: [
      { title: "Smallpox Eradication — WHO", url: "https://www.who.int/news-room/feature-stories/detail/the-eradication-of-smallpox", source: "WHO" },
      { title: "CDC Smallpox History", url: "https://www.cdc.gov/smallpox", source: "CDC" },
    ],
    tags: ["virus", "eradicated", "vaccine", "global"],
  },
  {
    id: "spanish-flu",
    name: "Spanish Flu",
    nameEs: "Gripe Española",
    category: "pandemic",
    pathogen: "Influenza A H1N1",
    startYear: 1918,
    endYear: 1920,
    deathsMin: 50_000_000,
    deathsMax: 100_000_000,
    deathsEstimate: 75_000_000,
    infectedEstimate: 500_000_000,
    color: "#F97316",
    glowColor: "rgba(249,115,22,0.5)",
    icon: "Wind",
    originCountry: "United States (Kansas)",
    originLat: 38.7,
    originLng: -98.0,
    regions: [
      { lat: 38.7, lng: -98.0, radius: 5, intensity: 0.9, label: "USA" },
      { lat: 51.5, lng: -0.1, radius: 4.5, intensity: 0.85, label: "UK" },
      { lat: 48.8, lng: 2.3, radius: 4.5, intensity: 0.85, label: "France (trenches)" },
      { lat: 40.4, lng: -3.7, radius: 4, intensity: 0.9, label: "Spain" },
      { lat: 20.0, lng: 78.0, radius: 5.5, intensity: 0.95, label: "India" },
      { lat: -25.3, lng: -57.6, radius: 3.5, intensity: 0.7, label: "South America" },
      { lat: -33.9, lng: 18.4, radius: 3.5, intensity: 0.75, label: "South Africa" },
    ],
    timeline: [
      { year: 1918, deaths: 15_000_000, label: "First wave — spring" },
      { year: 1918, deaths: 50_000_000, label: "Second wave — fall (deadliest)" },
      { year: 1919, deaths: 70_000_000, label: "Third wave" },
      { year: 1920, deaths: 75_000_000, label: "Pandemic ends" },
    ],
    descriptionEn:
      "The 1918 Spanish Flu was the most severe pandemic in modern history. Unlike typical flu, it disproportionately killed young healthy adults (ages 20–40), likely due to a cytokine storm immune response. It infected about 500 million people worldwide — one-third of the global population — and killed an estimated 50–100 million. It spread rapidly through WWI troop movements and overcrowded conditions.",
    descriptionEs:
      "La Gripe Española de 1918 fue la pandemia más grave de la historia moderna. A diferencia de la gripe típica, mató desproporcionadamente a adultos jóvenes y sanos (20-40 años), probablemente debido a una tormenta de citocinas. Infectó a unos 500 millones de personas — un tercio de la población mundial.",
    symptomsEn: ["Rapid pneumonia onset", "Cyanosis (blue skin)", "Hemorrhagic complications", "High fever", "Extreme fatigue"],
    symptomsEs: ["Aparición rápida de neumonía", "Cianosis (piel azul)", "Complicaciones hemorrágicas", "Fiebre alta", "Fatiga extrema"],
    references: [
      { title: "1918 Pandemic (H1N1 virus) — CDC", url: "https://www.cdc.gov/flu/pandemic-resources/1918-pandemic-h1n1.html", source: "CDC" },
      { title: "Spanish Flu — History.com", url: "https://www.history.com/topics/world-war-i/1918-flu-pandemic", source: "History.com" },
    ],
    tags: ["influenza", "virus", "wwi", "h1n1", "respiratory"],
  },
  {
    id: "hiv-aids",
    name: "HIV/AIDS",
    nameEs: "VIH/SIDA",
    category: "pandemic",
    pathogen: "Human Immunodeficiency Virus (HIV)",
    startYear: 1981,
    endYear: null,
    deathsMin: 40_000_000,
    deathsMax: 45_000_000,
    deathsEstimate: 42_000_000,
    infectedEstimate: 85_000_000,
    color: "#EC4899",
    glowColor: "rgba(236,72,153,0.5)",
    icon: "Activity",
    originCountry: "Democratic Republic of Congo",
    originLat: -4.0,
    originLng: 21.8,
    regions: [
      { lat: -26.3, lng: 28.0, radius: 6, intensity: 1.0, label: "Southern Africa (epicentre)" },
      { lat: 9.1, lng: 40.5, radius: 5.5, intensity: 0.9, label: "Sub-Saharan Africa" },
      { lat: 40.7, lng: -74.0, radius: 4.5, intensity: 0.75, label: "USA" },
      { lat: -14.2, lng: -51.9, radius: 4, intensity: 0.7, label: "Brazil" },
      { lat: 20.0, lng: 78.0, radius: 4.5, intensity: 0.75, label: "India" },
      { lat: 35.9, lng: 104.2, radius: 3.5, intensity: 0.55, label: "China" },
    ],
    timeline: [
      { year: 1981, deaths: 1_000, label: "First cases identified (USA)" },
      { year: 1985, deaths: 20_000 },
      { year: 1990, deaths: 500_000 },
      { year: 1995, deaths: 3_000_000, label: "Peak deaths before ARVs" },
      { year: 2000, deaths: 10_000_000 },
      { year: 2005, deaths: 20_000_000 },
      { year: 2010, deaths: 30_000_000 },
      { year: 2020, deaths: 40_000_000, label: "Ongoing — ~38M living with HIV" },
    ],
    descriptionEn:
      "HIV/AIDS emerged in the early 1980s and became one of the most destructive pandemics in history. The virus attacks the immune system, leaving the body vulnerable to opportunistic infections. Sub-Saharan Africa has been hardest hit, with some countries seeing 25–30% adult infection rates. Antiretroviral therapy (ART) has transformed HIV from a death sentence to a manageable chronic condition, but the pandemic continues with ~38 million people currently living with the virus.",
    descriptionEs:
      "El VIH/SIDA surgió a principios de los años 80 y se convirtió en una de las pandemias más destructivas de la historia. El virus ataca el sistema inmunológico. África subsahariana ha sido la más afectada. La terapia antirretroviral (TAR) ha transformado el VIH de sentencia de muerte a condición crónica manejable, pero la pandemia continúa con ~38 millones viviendo con el virus.",
    symptomsEn: ["Rapid weight loss", "Recurring fever", "Night sweats", "Swollen lymph nodes", "Opportunistic infections (TB, pneumonia)"],
    symptomsEs: ["Pérdida de peso rápida", "Fiebre recurrente", "Sudores nocturnos", "Ganglios linfáticos inflamados", "Infecciones oportunistas"],
    references: [
      { title: "HIV/AIDS — UNAIDS Global Statistics", url: "https://www.unaids.org/en/resources/fact-sheet", source: "UNAIDS" },
      { title: "HIV Basics — CDC", url: "https://www.cdc.gov/hiv/basics", source: "CDC" },
    ],
    tags: ["virus", "retrovirus", "ongoing", "africa", "sexual-transmission"],
  },
  {
    id: "covid-19",
    name: "COVID-19",
    nameEs: "COVID-19",
    category: "pandemic",
    pathogen: "SARS-CoV-2",
    startYear: 2019,
    endYear: null,
    deathsMin: 7_000_000,
    deathsMax: 20_000_000,
    deathsEstimate: 7_000_000,
    infectedEstimate: 770_000_000,
    color: "#06B6D4",
    glowColor: "rgba(6,182,212,0.5)",
    icon: "Virus",
    originCountry: "China (Wuhan)",
    originLat: 30.6,
    originLng: 114.3,
    regions: [
      { lat: 30.6, lng: 114.3, radius: 4, intensity: 0.9, label: "Wuhan, China" },
      { lat: 41.9, lng: 12.5, radius: 5, intensity: 0.95, label: "Italy (early epicentre)" },
      { lat: 40.7, lng: -74.0, radius: 5.5, intensity: 1.0, label: "USA" },
      { lat: -14.2, lng: -51.9, radius: 5, intensity: 0.9, label: "Brazil" },
      { lat: 20.0, lng: 78.0, radius: 5.5, intensity: 0.95, label: "India" },
      { lat: 55.7, lng: 37.6, radius: 4.5, intensity: 0.8, label: "Russia" },
      { lat: 48.8, lng: 2.3, radius: 4, intensity: 0.75, label: "France" },
      { lat: 51.5, lng: -0.1, radius: 4, intensity: 0.75, label: "UK" },
      { lat: 4.2, lng: 15.8, radius: 4, intensity: 0.65, label: "Africa" },
    ],
    timeline: [
      { year: 2019, deaths: 1_000, label: "First outbreak — Wuhan" },
      { year: 2020, deaths: 1_800_000, label: "WHO declares pandemic (March)" },
      { year: 2021, deaths: 5_400_000, label: "Delta variant" },
      { year: 2022, deaths: 6_800_000, label: "Omicron variant" },
      { year: 2023, deaths: 7_000_000, label: "WHO ends global emergency" },
    ],
    descriptionEn:
      "COVID-19 is caused by the SARS-CoV-2 coronavirus, first identified in Wuhan, China in December 2019. It spread globally within months, prompting the first worldwide pandemic declaration since 1918. The pandemic caused unprecedented disruption — global lockdowns, economic collapse, and a race to develop vaccines in record time. Over 770 million confirmed cases and at least 7 million official deaths (with excess mortality estimates suggesting 15–20 million).",
    descriptionEs:
      "COVID-19 está causada por el coronavirus SARS-CoV-2, identificado por primera vez en Wuhan (China) en diciembre de 2019. Se propagó globalmente en meses, provocando la primera declaración de pandemia mundial desde 1918. Causó una disrupción sin precedentes — confinamientos globales, colapso económico y una carrera para desarrollar vacunas en tiempo récord.",
    symptomsEn: ["Fever and chills", "Cough and shortness of breath", "Loss of taste/smell", "Fatigue", "Long COVID (chronic symptoms)"],
    symptomsEs: ["Fiebre y escalofríos", "Tos y dificultad para respirar", "Pérdida de gusto/olfato", "Fatiga", "COVID largo (síntomas crónicos)"],
    references: [
      { title: "COVID-19 Dashboard — WHO", url: "https://covid19.who.int", source: "WHO" },
      { title: "COVID Data Tracker — CDC", url: "https://covid.cdc.gov/covid-data-tracker", source: "CDC" },
    ],
    tags: ["coronavirus", "virus", "respiratory", "modern", "vaccine"],
  },
  {
    id: "malaria",
    name: "Malaria (ongoing)",
    nameEs: "Malaria (en curso)",
    category: "pandemic",
    pathogen: "Plasmodium falciparum",
    startYear: 1900,
    endYear: null,
    deathsMin: 60_000_000,
    deathsMax: 80_000_000,
    deathsEstimate: 70_000_000,
    infectedEstimate: 2_000_000_000,
    color: "#10B981",
    glowColor: "rgba(16,185,129,0.5)",
    icon: "Droplets",
    originCountry: "Sub-Saharan Africa",
    originLat: 0.0,
    originLng: 20.0,
    regions: [
      { lat: 9.1, lng: 40.5, radius: 7, intensity: 1.0, label: "Sub-Saharan Africa" },
      { lat: 20.0, lng: 78.0, radius: 5, intensity: 0.7, label: "South Asia" },
      { lat: 12.0, lng: 104.0, radius: 4.5, intensity: 0.65, label: "Southeast Asia" },
      { lat: -14.2, lng: -51.9, radius: 4, intensity: 0.5, label: "Amazon Basin" },
    ],
    timeline: [
      { year: 1900, deaths: 1_000_000 },
      { year: 1950, deaths: 20_000_000 },
      { year: 1970, deaths: 40_000_000 },
      { year: 2000, deaths: 60_000_000 },
      { year: 2023, deaths: 70_000_000, label: "~600K deaths/year ongoing" },
    ],
    descriptionEn:
      "Malaria is a mosquito-borne infectious disease that has plagued humanity for millennia. Caused by Plasmodium parasites transmitted by female Anopheles mosquitoes, it kills approximately 600,000 people per year, predominantly children under 5 in Sub-Saharan Africa. In the 20th and 21st centuries combined, it has killed an estimated 50–100 million people. A vaccine (RTS,S/AS01) was approved in 2021.",
    descriptionEs:
      "La malaria es una enfermedad infecciosa transmitida por mosquitos que ha afectado a la humanidad durante milenios. Causada por parásitos Plasmodium transmitidos por mosquitos Anopheles hembra, mata aproximadamente 600.000 personas al año, predominantemente niños menores de 5 años en África subsahariana.",
    symptomsEn: ["Cyclical fever and chills", "Severe headache", "Vomiting", "Jaundice", "Seizures (cerebral malaria)"],
    symptomsEs: ["Fiebre y escalofríos cíclicos", "Dolor de cabeza severo", "Vómitos", "Ictericia", "Convulsiones (malaria cerebral)"],
    references: [
      { title: "World Malaria Report — WHO 2023", url: "https://www.who.int/teams/global-malaria-programme/reports/world-malaria-report-2023", source: "WHO" },
    ],
    tags: ["parasite", "mosquito", "tropical", "ongoing", "africa"],
  },
  {
    id: "ebola",
    name: "Ebola (2014–2016)",
    nameEs: "Ébola (2014–2016)",
    category: "pandemic",
    pathogen: "Ebola virus (EBOV)",
    startYear: 2014,
    endYear: 2016,
    deathsMin: 11_000,
    deathsMax: 11_325,
    deathsEstimate: 11_325,
    infectedEstimate: 28_600,
    color: "#84CC16",
    glowColor: "rgba(132,204,22,0.5)",
    icon: "Zap",
    originCountry: "Guinea",
    originLat: 9.9,
    originLng: -11.4,
    regions: [
      { lat: 9.9, lng: -11.4, radius: 3.5, intensity: 1.0, label: "Guinea (origin)" },
      { lat: 6.4, lng: -9.4, radius: 3.5, intensity: 0.95, label: "Liberia" },
      { lat: 8.5, lng: -13.2, radius: 3, intensity: 0.9, label: "Sierra Leone" },
      { lat: 40.7, lng: -74.0, radius: 1.5, intensity: 0.2, label: "USA (imported)" },
    ],
    timeline: [
      { year: 2014, deaths: 5_000, label: "West Africa outbreak begins" },
      { year: 2015, deaths: 10_000, label: "Peak epidemic" },
      { year: 2016, deaths: 11_325, label: "WHO declares end of epidemic" },
    ],
    descriptionEn:
      "The 2014–2016 West African Ebola epidemic was the largest Ebola outbreak in history, primarily affecting Guinea, Liberia, and Sierra Leone. The virus spreads through direct contact with bodily fluids of infected people and has a fatality rate of 25–90%. Though relatively contained numerically, it caused massive fear and healthcare system collapse in affected countries.",
    descriptionEs:
      "La epidemia de Ébola en África Occidental de 2014-2016 fue el mayor brote de ébola de la historia, afectando principalmente a Guinea, Liberia y Sierra Leona. El virus se transmite por contacto directo con fluidos corporales y tiene una tasa de mortalidad del 25-90%.",
    symptomsEn: ["Sudden fever", "Severe headache", "Muscle pain", "Hemorrhaging", "Organ failure"],
    symptomsEs: ["Fiebre repentina", "Dolor de cabeza severo", "Dolor muscular", "Hemorragias", "Fallo orgánico"],
    references: [
      { title: "2014-2016 Ebola Outbreak — CDC", url: "https://www.cdc.gov/vhf/ebola/history/2014-2016-outbreak", source: "CDC" },
    ],
    tags: ["virus", "hemorrhagic", "africa", "contained"],
  },
  {
    id: "hantavirus",
    name: "Hantavirus (ongoing)",
    nameEs: "Hantavirus (en curso)",
    category: "pandemic",
    pathogen: "Hantavirus (multiple species)",
    startYear: 1993,
    endYear: null,
    deathsMin: 3_000,
    deathsMax: 5_000,
    deathsEstimate: 4_000,
    infectedEstimate: 10_000,
    color: "#FBBF24",
    glowColor: "rgba(251,191,36,0.5)",
    icon: "Rat",
    originCountry: "United States (Four Corners)",
    originLat: 36.9,
    originLng: -109.0,
    regions: [
      { lat: 36.9, lng: -109.0, radius: 3, intensity: 0.9, label: "Four Corners, USA" },
      { lat: -38.4, lng: -63.6, radius: 3, intensity: 0.85, label: "Argentina/Chile" },
      { lat: -14.2, lng: -51.9, radius: 2.5, intensity: 0.7, label: "Brazil" },
      { lat: 55.7, lng: 37.6, radius: 2, intensity: 0.5, label: "Russia" },
      { lat: 35.9, lng: 104.2, radius: 2, intensity: 0.6, label: "China" },
    ],
    timeline: [
      { year: 1993, deaths: 13, label: "First identified — Four Corners USA" },
      { year: 2000, deaths: 500 },
      { year: 2010, deaths: 1_500 },
      { year: 2023, deaths: 4_000, label: "Sporadic cases worldwide" },
    ],
    descriptionEn:
      "Hantavirus was first recognized in 1993 in the Four Corners region of the United States. It is transmitted through contact with infected rodent droppings, urine, or saliva. Two main syndromes: Hantavirus Pulmonary Syndrome (HPS) in the Americas with ~35% mortality, and Hemorrhagic Fever with Renal Syndrome (HFRS) in Europe and Asia. No specific treatment exists.",
    descriptionEs:
      "El hantavirus fue reconocido por primera vez en 1993 en la región de las Cuatro Esquinas (EE.UU.). Se transmite por contacto con excrementos, orina o saliva de roedores infectados. Dos síndromes principales: Síndrome Pulmonar por Hantavirus (SPH) en las Américas con ~35% de mortalidad.",
    symptomsEn: ["Fever and muscle aches", "Severe respiratory distress", "Fluid in lungs", "Kidney failure", "Rapid progression"],
    symptomsEs: ["Fiebre y dolores musculares", "Dificultad respiratoria severa", "Líquido en pulmones", "Insuficiencia renal", "Progresión rápida"],
    references: [
      { title: "Hantavirus — CDC", url: "https://www.cdc.gov/hantavirus", source: "CDC" },
    ],
    tags: ["virus", "rodent-borne", "respiratory", "americas"],
  },
  {
    id: "cholera",
    name: "Cholera (7 pandemics)",
    nameEs: "Cólera (7 pandemias)",
    category: "pandemic",
    pathogen: "Vibrio cholerae",
    startYear: 1817,
    endYear: null,
    deathsMin: 3_000_000,
    deathsMax: 5_000_000,
    deathsEstimate: 4_000_000,
    infectedEstimate: 100_000_000,
    color: "#60A5FA",
    glowColor: "rgba(96,165,250,0.5)",
    icon: "Droplet",
    originCountry: "India (Ganges Delta)",
    originLat: 22.5,
    originLng: 88.4,
    regions: [
      { lat: 22.5, lng: 88.4, radius: 5, intensity: 0.95, label: "India (origin)" },
      { lat: 23.7, lng: 90.4, radius: 4, intensity: 0.85, label: "Bangladesh" },
      { lat: 9.1, lng: 40.5, radius: 4.5, intensity: 0.8, label: "Africa" },
      { lat: 18.0, lng: -72.3, radius: 3.5, intensity: 0.75, label: "Haiti (2010 outbreak)" },
    ],
    timeline: [
      { year: 1817, deaths: 100_000, label: "1st pandemic — India" },
      { year: 1829, deaths: 500_000, label: "2nd pandemic — reaches Europe" },
      { year: 1852, deaths: 1_000_000, label: "3rd pandemic — global spread" },
      { year: 2010, deaths: 10_000, label: "Haiti outbreak" },
      { year: 2023, deaths: 4_000_000, label: "7th pandemic ongoing" },
    ],
    descriptionEn:
      "Cholera has caused seven documented pandemics since 1817, all originating in the Ganges Delta of India. Caused by the bacterium Vibrio cholerae, it spreads through contaminated water and causes severe diarrhea leading to rapid dehydration and death within hours if untreated. John Snow's mapping of the 1854 London outbreak pioneered modern epidemiology.",
    descriptionEs:
      "El cólera ha causado siete pandemias documentadas desde 1817, todas originadas en el Delta del Ganges (India). Causado por la bacteria Vibrio cholerae, se transmite por agua contaminada y causa diarrea severa que lleva a deshidratación rápida.",
    symptomsEn: ["Profuse watery diarrhea ('rice-water')", "Rapid dehydration", "Muscle cramps", "Vomiting", "Death within hours if untreated"],
    symptomsEs: ["Diarrea acuosa profusa ('agua de arroz')", "Deshidratación rápida", "Calambres musculares", "Vómitos", "Muerte en horas sin tratamiento"],
    references: [
      { title: "Cholera — WHO Fact Sheet", url: "https://www.who.int/news-room/fact-sheets/detail/cholera", source: "WHO" },
    ],
    tags: ["bacteria", "waterborne", "sanitation", "historical"],
  },

  // ── WARS ───────────────────────────────────────────────────────────────────
  {
    id: "wwi",
    name: "World War I",
    nameEs: "Primera Guerra Mundial",
    category: "war",
    startYear: 1914,
    endYear: 1918,
    deathsMin: 17_000_000,
    deathsMax: 22_000_000,
    deathsEstimate: 20_000_000,
    color: "#94A3B8",
    glowColor: "rgba(148,163,184,0.5)",
    icon: "Sword",
    originCountry: "Europe",
    originLat: 48.0,
    originLng: 15.0,
    regions: [
      { lat: 48.8, lng: 2.3, radius: 5, intensity: 0.95, label: "Western Front (France)" },
      { lat: 52.5, lng: 13.4, radius: 4.5, intensity: 0.9, label: "Germany" },
      { lat: 50.4, lng: 30.5, radius: 4, intensity: 0.85, label: "Eastern Front (Russia/Ukraine)" },
      { lat: 41.0, lng: 29.0, radius: 3.5, intensity: 0.8, label: "Ottoman Empire" },
      { lat: 41.9, lng: 12.5, radius: 3.5, intensity: 0.75, label: "Italy" },
      { lat: 31.0, lng: 31.2, radius: 3, intensity: 0.6, label: "Middle East" },
    ],
    timeline: [
      { year: 1914, deaths: 1_000_000, label: "War begins — July" },
      { year: 1915, deaths: 5_000_000 },
      { year: 1916, deaths: 11_000_000, label: "Battle of the Somme / Verdun" },
      { year: 1917, deaths: 16_000_000 },
      { year: 1918, deaths: 20_000_000, label: "Armistice — November 11" },
    ],
    descriptionEn:
      "World War I (1914–1918) was the first truly global armed conflict, involving most of Europe's major powers plus nations worldwide. Also called 'The Great War', it introduced industrial-scale warfare: machine guns, poison gas, tanks, and aerial bombing. The Western Front became a brutal stalemate with millions dying in trenches. The war killed 17–22 million people (civilian + military) and set the stage for WWII.",
    descriptionEs:
      "La Primera Guerra Mundial (1914–1918) fue el primer conflicto armado verdaderamente global. También llamada 'La Gran Guerra', introdujo la guerra a escala industrial: ametralladoras, gas venenoso, tanques y bombardeo aéreo. El Frente Occidental fue un brutal punto muerto con millones muriendo en trincheras.",
    symptomsEn: [],
    symptomsEs: [],
    references: [
      { title: "World War I — Imperial War Museums", url: "https://www.iwm.org.uk/history/first-world-war", source: "IWM" },
    ],
    tags: ["war", "europe", "industrial", "trenches"],
  },
  {
    id: "wwii",
    name: "World War II",
    nameEs: "Segunda Guerra Mundial",
    category: "war",
    startYear: 1939,
    endYear: 1945,
    deathsMin: 70_000_000,
    deathsMax: 85_000_000,
    deathsEstimate: 75_000_000,
    color: "#EF4444",
    glowColor: "rgba(239,68,68,0.5)",
    icon: "Flame",
    originCountry: "Europe / Pacific",
    originLat: 52.5,
    originLng: 13.4,
    regions: [
      { lat: 52.5, lng: 13.4, radius: 5.5, intensity: 1.0, label: "Germany / Central Europe" },
      { lat: 55.7, lng: 37.6, radius: 5.5, intensity: 0.95, label: "Soviet Union (27M deaths)" },
      { lat: 35.9, lng: 104.2, radius: 5.5, intensity: 0.9, label: "China (15M+ deaths)" },
      { lat: 35.7, lng: 139.7, radius: 4, intensity: 0.75, label: "Japan (Pacific Theater)" },
      { lat: 51.5, lng: -0.1, radius: 4, intensity: 0.7, label: "UK" },
      { lat: 48.8, lng: 2.3, radius: 4.5, intensity: 0.85, label: "France / Western Europe" },
      { lat: 31.0, lng: 31.2, radius: 3, intensity: 0.55, label: "North Africa" },
    ],
    timeline: [
      { year: 1939, deaths: 1_000_000, label: "Invasion of Poland" },
      { year: 1941, deaths: 10_000_000, label: "Operation Barbarossa" },
      { year: 1942, deaths: 25_000_000, label: "Holocaust intensifies; Pacific war" },
      { year: 1943, deaths: 45_000_000, label: "Stalingrad, Allied turning point" },
      { year: 1944, deaths: 65_000_000, label: "D-Day; firebombing campaigns" },
      { year: 1945, deaths: 75_000_000, label: "VE Day / VJ Day — war ends" },
    ],
    descriptionEn:
      "World War II (1939–1945) was the deadliest conflict in human history, killing an estimated 70–85 million people — about 3% of the world's population. It involved virtually every nation and was characterized by mass civilian casualties, the Holocaust (6M Jewish victims), strategic bombing of cities, and culminated with the first use of nuclear weapons. The Soviet Union suffered the most with ~27 million deaths.",
    descriptionEs:
      "La Segunda Guerra Mundial (1939–1945) fue el conflicto más mortífero de la historia humana, matando aproximadamente 70-85 millones de personas — el 3% de la población mundial. Involucró prácticamente a todas las naciones y se caracterizó por bajas civiles masivas, el Holocausto (6M víctimas judías) y culminó con el primer uso de armas nucleares.",
    symptomsEn: [],
    symptomsEs: [],
    references: [
      { title: "World War II — Imperial War Museums", url: "https://www.iwm.org.uk/history/second-world-war", source: "IWM" },
      { title: "WWII Casualties — National WWII Museum", url: "https://www.nationalww2museum.org", source: "National WWII Museum" },
    ],
    tags: ["war", "global", "holocaust", "nuclear", "deadliest"],
  },
  {
    id: "mongol-conquests",
    name: "Mongol Conquests",
    nameEs: "Conquistas Mongolas",
    category: "war",
    startYear: 1206,
    endYear: 1368,
    deathsMin: 30_000_000,
    deathsMax: 50_000_000,
    deathsEstimate: 40_000_000,
    color: "#F59E0B",
    glowColor: "rgba(245,158,11,0.5)",
    icon: "Sword",
    originCountry: "Mongolia",
    originLat: 46.8,
    originLng: 103.8,
    regions: [
      { lat: 46.8, lng: 103.8, radius: 3, intensity: 0.8, label: "Mongolia (origin)" },
      { lat: 35.9, lng: 104.2, radius: 5.5, intensity: 0.95, label: "China (Jin/Song dynasties)" },
      { lat: 41.0, lng: 69.3, radius: 5, intensity: 0.9, label: "Central Asia" },
      { lat: 32.4, lng: 53.7, radius: 5, intensity: 0.95, label: "Persia/Iran" },
      { lat: 55.7, lng: 37.6, radius: 4.5, intensity: 0.85, label: "Russia" },
      { lat: 48.0, lng: 20.0, radius: 4, intensity: 0.75, label: "Eastern Europe" },
    ],
    timeline: [
      { year: 1206, deaths: 0, label: "Genghis Khan unites Mongol tribes" },
      { year: 1215, deaths: 5_000_000, label: "Conquest of China begins" },
      { year: 1241, deaths: 15_000_000, label: "Mongols reach Poland/Hungary" },
      { year: 1258, deaths: 25_000_000, label: "Sack of Baghdad" },
      { year: 1368, deaths: 40_000_000, label: "End of Mongol Empire" },
    ],
    descriptionEn:
      "The Mongol Conquests (1206–1368) under Genghis Khan and his successors created the largest contiguous land empire in history and resulted in the deaths of an estimated 30–50 million people — possibly 10% of the world's population at the time. The destruction of Baghdad in 1258, the conquest of China, Persia, and Central Asia, combined with plague spread by Mongol armies, made these conquests uniquely devastating.",
    descriptionEs:
      "Las Conquistas Mongolas (1206–1368) bajo Gengis Kan y sus sucesores crearon el mayor imperio territorial contiguo de la historia y resultaron en la muerte de 30-50 millones de personas — posiblemente el 10% de la población mundial de entonces.",
    symptomsEn: [],
    symptomsEs: [],
    references: [
      { title: "Mongol Empire — Encyclopaedia Britannica", url: "https://www.britannica.com/topic/Mongol-Empire", source: "Britannica" },
    ],
    tags: ["war", "conquest", "medieval", "empire"],
  },
  {
    id: "taiping-rebellion",
    name: "Taiping Rebellion",
    nameEs: "Rebelión Taiping",
    category: "war",
    startYear: 1850,
    endYear: 1864,
    deathsMin: 20_000_000,
    deathsMax: 40_000_000,
    deathsEstimate: 30_000_000,
    color: "#F472B6",
    glowColor: "rgba(244,114,182,0.5)",
    icon: "Swords",
    originCountry: "China",
    originLat: 23.1,
    originLng: 113.3,
    regions: [
      { lat: 30.2, lng: 120.2, radius: 6, intensity: 1.0, label: "Eastern China (Yangtze Delta)" },
      { lat: 23.1, lng: 113.3, radius: 5, intensity: 0.85, label: "Southern China" },
      { lat: 32.0, lng: 118.8, radius: 4.5, intensity: 0.9, label: "Nanjing (capital)" },
    ],
    timeline: [
      { year: 1850, deaths: 0, label: "Rebellion begins" },
      { year: 1853, deaths: 5_000_000, label: "Nanjing captured" },
      { year: 1858, deaths: 15_000_000 },
      { year: 1864, deaths: 30_000_000, label: "Rebellion crushed" },
    ],
    descriptionEn:
      "The Taiping Rebellion (1850–1864) was a massive civil war in southern China, led by Hong Xiuquan who claimed to be the younger brother of Jesus Christ. It resulted in an estimated 20–30 million deaths, making it one of the deadliest civil wars in history. The conflict devastated China's most prosperous region and contributed to the weakening of the Qing Dynasty.",
    descriptionEs:
      "La Rebelión Taiping (1850–1864) fue una masiva guerra civil en el sur de China, liderada por Hong Xiuquan quien se proclamó hermano menor de Jesucristo. Resultó en 20-30 millones de muertes estimadas, siendo una de las guerras civiles más mortíferas de la historia.",
    symptomsEn: [],
    symptomsEs: [],
    references: [
      { title: "Taiping Rebellion — Britannica", url: "https://www.britannica.com/event/Taiping-Rebellion", source: "Britannica" },
    ],
    tags: ["war", "civil-war", "china", "19th-century"],
  },

  // ── NUCLEAR ────────────────────────────────────────────────────────────────
  {
    id: "hiroshima-nagasaki",
    name: "Hiroshima & Nagasaki",
    nameEs: "Hiroshima y Nagasaki",
    category: "nuclear",
    startYear: 1945,
    endYear: 1945,
    deathsMin: 110_000,
    deathsMax: 210_000,
    deathsEstimate: 160_000,
    infectedEstimate: 340_000,
    color: "#FBBF24",
    glowColor: "rgba(251,191,36,0.8)",
    icon: "Radiation",
    originCountry: "United States (dropped on Japan)",
    originLat: 34.4,
    originLng: 132.5,
    regions: [
      { lat: 34.4, lng: 132.5, radius: 2.5, intensity: 1.0, label: "Hiroshima (Aug 6, 1945)" },
      { lat: 32.7, lng: 129.9, radius: 2, intensity: 0.9, label: "Nagasaki (Aug 9, 1945)" },
    ],
    timeline: [
      { year: 1945, deaths: 110_000, label: "Immediate deaths — both cities" },
      { year: 1950, deaths: 160_000, label: "Deaths including radiation sickness" },
      { year: 1990, deaths: 200_000, label: "Long-term radiation deaths estimated" },
    ],
    descriptionEn:
      "On August 6 and 9, 1945, the United States dropped atomic bombs on the Japanese cities of Hiroshima and Nagasaki. 'Little Boy' killed 70,000–80,000 immediately in Hiroshima; 'Fat Man' killed 40,000–50,000 in Nagasaki. Total deaths including radiation exposure reached 110,000–210,000. These remain the only uses of nuclear weapons in armed conflict in history and prompted Japan's surrender, ending WWII.",
    descriptionEs:
      "El 6 y 9 de agosto de 1945, Estados Unidos lanzó bombas atómicas sobre las ciudades japonesas de Hiroshima y Nagasaki. 'Little Boy' mató 70.000-80.000 de inmediato en Hiroshima; 'Fat Man' mató 40.000-50.000 en Nagasaki. Siguen siendo los únicos usos de armas nucleares en conflictos armados.",
    symptomsEn: ["Instantaneous vaporization (near epicenter)", "Severe burns", "Radiation sickness (nausea, hair loss)", "Long-term cancers", "Genetic effects in survivors"],
    symptomsEs: ["Vaporización instantánea (cerca del epicentro)", "Quemaduras severas", "Enfermedad por radiación (náuseas, pérdida de cabello)", "Cánceres a largo plazo", "Efectos genéticos en supervivientes"],
    references: [
      { title: "Hiroshima & Nagasaki — Atomic Archive", url: "https://www.atomicarchive.com", source: "Atomic Archive" },
      { title: "Atomic Bomb Casualty Commission Studies", url: "https://www.rerf.or.jp/en/", source: "RERF" },
    ],
    tags: ["nuclear", "wwii", "atomic-bomb", "japan", "radiation"],
  },
  {
    id: "chernobyl",
    name: "Chernobyl Disaster",
    nameEs: "Desastre de Chernóbil",
    category: "nuclear",
    startYear: 1986,
    endYear: 1986,
    deathsMin: 4_000,
    deathsMax: 60_000,
    deathsEstimate: 30_000,
    infectedEstimate: 600_000,
    color: "#A3E635",
    glowColor: "rgba(163,230,53,0.6)",
    icon: "Radiation",
    originCountry: "Soviet Union (Ukraine)",
    originLat: 51.4,
    originLng: 30.1,
    regions: [
      { lat: 51.4, lng: 30.1, radius: 2.5, intensity: 1.0, label: "Chernobyl Reactor" },
      { lat: 50.4, lng: 30.5, radius: 3, intensity: 0.7, label: "Kyiv (Ukraine)" },
      { lat: 53.9, lng: 27.6, radius: 2.5, intensity: 0.65, label: "Belarus" },
      { lat: 60.0, lng: 20.0, radius: 2, intensity: 0.3, label: "Scandinavia (fallout)" },
    ],
    timeline: [
      { year: 1986, deaths: 31, label: "Immediate deaths — April 26" },
      { year: 1987, deaths: 4_000, label: "Acute Radiation Syndrome deaths" },
      { year: 2006, deaths: 30_000, label: "WHO/IARC long-term cancer estimate" },
    ],
    descriptionEn:
      "On April 26, 1986, Reactor No. 4 at the Chernobyl Nuclear Power Plant in Soviet Ukraine exploded during a safety test, releasing 400 times more radiation than the Hiroshima bomb. Immediate deaths were just 31, but estimates for long-term cancer deaths range from 4,000 (WHO) to 60,000+ (independent researchers). About 350,000 people were permanently evacuated. The disaster contributed to the fall of the Soviet Union.",
    descriptionEs:
      "El 26 de abril de 1986, el Reactor N°4 de la central nuclear de Chernóbil explotó durante una prueba de seguridad, liberando 400 veces más radiación que la bomba de Hiroshima. Las muertes inmediatas fueron solo 31, pero las estimaciones de muertes por cáncer a largo plazo van de 4.000 a 60.000+.",
    symptomsEn: ["Acute Radiation Syndrome (ARS)", "Severe burns", "Thyroid cancer (iodine-131 exposure)", "Leukemia", "Psychological trauma"],
    symptomsEs: ["Síndrome de Radiación Aguda (SRA)", "Quemaduras severas", "Cáncer de tiroides", "Leucemia", "Trauma psicológico"],
    references: [
      { title: "Chernobyl — IAEA", url: "https://www.iaea.org/topics/chernobyl", source: "IAEA" },
      { title: "Chernobyl Forum Report — WHO", url: "https://www.who.int/news/item/05-09-2005-chernobyl-the-true-scale-of-the-accident", source: "WHO" },
    ],
    tags: ["nuclear", "accident", "ukraine", "soviet", "radiation"],
  },
];

export const getEventById = (id: string): HistoricalEvent | undefined =>
  EVENTS.find((e) => e.id === id);

export const getEventsByCategory = (category: EventCategory): HistoricalEvent[] =>
  EVENTS.filter((e) => e.category === category);

export const formatDeaths = (n: number): string => {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
};

export const formatDeathsFull = (n: number): string =>
  n.toLocaleString("en-US");
