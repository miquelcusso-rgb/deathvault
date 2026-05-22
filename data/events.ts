export type EventCategory = "pandemic" | "war" | "nuclear" | "famine" | "genocide";

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
  longDescriptionEn?: string;
  symptomsEn: string[];
  symptomsEs: string[];
  originCountry: string;
  originLat: number;
  originLng: number;
  references: Reference[];
  tags: string[];
  faqs?: Array<{ q: string; a: string }>;
  /** Shown as a footnote on the event page to indicate source reliability */
  dataReliabilityLevel?: "high" | "moderate" | "low";
  dataReliabilityNote?: string;
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
    longDescriptionEn: `The Plague of Justinian stands as the first pandemic in recorded history to shake a major empire to its foundations. Named after the Byzantine Emperor Justinian I who himself contracted the disease and narrowly survived, the outbreak began around 541 CE in the Egyptian port of Pelusium, almost certainly arriving via grain ships from Ethiopia or Central Asia. The pathogen was Yersinia pestis — the same bacterium that would return eight centuries later as the Black Death — confirming through ancient DNA analysis that bubonic plague has been humanity's recurring nemesis across the millennia.

From Egypt, the disease moved with terrifying speed along the Byzantine Empire's trade networks. It reached Constantinople — the most important city in the world at the time, home to roughly half a million people — by 542 CE. The Byzantine historian Procopius left a harrowing eyewitness account: the city's dead piled up in the streets, burial became impossible, and Emperor Justinian ordered mass graves dug outside the city walls. At the height of the epidemic, Constantinople was reportedly losing 10,000 people per day. Modern estimates suggest the city lost between one-third and one-half of its entire population within a single year.

The disease spread via three routes: bubonic (flea bites creating painful swollen lymph nodes called buboes), septicemic (direct bloodstream infection), and pneumonic (airborne transmission from lung infections). The bubonic form was dominant, but all three forms carried catastrophic mortality rates in the absence of any antibiotics. Victims typically developed high fever, delirium, and grotesque swellings in the groin, armpits, and neck within days of exposure, followed by blackening of the extremities from gangrene.

Geographically, the Plague of Justinian devastated the Mediterranean world from its Nile Delta origin point outward. The Eastern Roman (Byzantine) Empire bore the heaviest losses, but the plague also swept through Persia, the Arabian Peninsula, the western Mediterranean, and deep into Europe. It arrived in Britain by the 560s. Modern demographic modeling suggests between 25 and 50 million deaths — perhaps 25 to 50 percent of the entire population of Europe and the Near East.

The consequences for history were enormous. Justinian's ambitious project to reconquer the western territories of the old Roman Empire — already partially successful in North Africa and Italy — was fatally undermined. Armies could not be maintained, tax revenues collapsed, and the populations of once-great cities shrank. The reduced labor force disrupted agriculture, causing secondary famines. Many historians argue the Plague of Justinian was one of the pivotal events explaining why the full restoration of the Roman Empire never materialized.

The outbreak did not end cleanly. Plague returned in recurring waves for roughly two centuries, with outbreaks documented in 558, 573, 586, 599, and beyond, each resurgence finding new populations with reduced immunity. The pandemic finally subsided around 750 CE, possibly because the rat populations that sustained the flea-plague cycle collapsed or because survivors had built partial immunity. By then, the Byzantine Empire had permanently lost its position as the dominant Mediterranean power, and the stage was set for the rapid rise of Islam across territories devastated and depopulated by centuries of plague.`,
    faqs: [
      { q: "How many people died from the Plague of Justinian?", a: "Estimates range from 25 to 50 million deaths, making it one of the deadliest pandemics of the ancient world. Some demographers believe it may have killed 25–50% of the population of Europe and the Near East." },
      { q: "What caused the Plague of Justinian?", a: "It was caused by Yersinia pestis, the same bacterium responsible for the Black Death. This was confirmed through ancient DNA analysis of skeletal remains from burial sites across Europe." },
      { q: "Where did the Plague of Justinian originate?", a: "The outbreak began around 541 CE in Pelusium, a port city in Egypt, likely arriving via grain ships from Ethiopia or Central Asia. It then spread rapidly to Constantinople and across the Mediterranean." },
      { q: "How did the Plague of Justinian spread?", a: "It spread primarily through flea bites from infected rats (bubonic form), but also through direct blood contact (septicemic) and airborne respiratory droplets (pneumonic). Trade routes and military movements accelerated its geographic spread." },
      { q: "When did the Plague of Justinian end?", a: "The initial wave ended around 549 CE, but plague returned in recurring waves for roughly two centuries. The pandemic finally subsided around 750 CE, approximately 200 years after it began." },
      { q: "How did the Plague of Justinian affect the Byzantine Empire?", a: "It was catastrophic for the Empire. Justinian's campaigns to reconquer western Roman territory were undermined, tax revenues collapsed, army recruitment failed, and many cities lost half their populations. It contributed significantly to the empire's long-term decline." },
    ],
    tags: ["bubonic", "ancient", "bacteria", "byzantine", "justinianic plague", "first pandemic in history", "Yersinia pestis", "byzantine empire plague", "541 AD pandemic", "eastern roman empire", "roman plague", "plague history"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Ancient records are sparse. Estimates rely on Byzantine chronicles, archeological evidence, and retrospective demographic modeling. The 30–50M range reflects genuine scholarly uncertainty.",
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
    longDescriptionEn: `The Black Death remains the most catastrophic single pandemic in human history — a mortality event so severe that its demographic, economic, and cultural shockwaves reshaped Western civilization. Between 1347 and 1353, the disease killed an estimated 75 to 200 million people worldwide, with the most widely accepted central estimate around 120 million. In Europe alone, it eliminated between 30 and 60 percent of the entire population. Some regions lost two-thirds of their people. Villages were abandoned. Entire family lines vanished.

The pathogen was Yersinia pestis, the same bacterium behind the Plague of Justinian eight centuries earlier. Genetic evidence places its evolutionary origin in the Tian Shan mountain region of Central Asia, where it had been circulating in rodent populations for decades before the catastrophic outbreak of the 1340s. The trigger that sent it westward was likely a combination of climate instability, rodent population booms, and the extraordinary connectivity of the Mongol-era Silk Road trade network. The outbreak reached the Crimean port of Caffa in 1346, where besieging Mongol forces reportedly catapulted plague-infested corpses over the city walls — one of history's earliest recorded instances of biological warfare. Genoese ships fleeing Caffa carried infected rats and their fleas to Sicily in October 1347.

From Sicily, the disease spread with ruthless efficiency. By 1348 it had devastated Italy, France, and Spain. By 1349 it had reached Germany, the Low Countries, and England. By 1350 it struck Scandinavia and Eastern Europe. The speed of spread — hundreds of miles per year — reflected both the mobility of medieval trade and the multiple transmission routes of the pathogen. Bubonic plague (spread by fleas) was the dominant form, producing the disease's characteristic buboes: painful, swollen lymph nodes in the groin, armpits, or neck, often the size of eggs. Pneumonic plague (airborne, spread by coughing) was faster-killing and spread person to person with devastating efficiency. Septicemic plague caused rapid blood poisoning that turned the skin black — giving rise to the name "Black Death."

The social consequences were immediate and permanent. With labor suddenly scarce, surviving peasants could demand higher wages, accelerating the collapse of feudal serfdom. The Church, unable to explain or halt the catastrophe, suffered lasting credibility damage. Mass death on this scale produced profound psychological trauma, visible in the era's art (the danse macabre tradition), literature (Boccaccio's Decameron was written in its shadow), and theology. Flagellant movements emerged across Europe, with people publicly whipping themselves to atone for sins they believed had caused the plague. Jewish communities were systematically massacred in the false belief they had poisoned wells.

The Black Death did not end in 1353. Plague continued to return to Europe in waves for three centuries — the Great Plague of London of 1665 was one of its last major European visitations. The mechanism of persistence was the reservoir of infected rat populations across Eurasia from which new outbreaks could ignite. It was only in the late 19th century, with Alexandre Yersin's 1894 identification of the bacterium and the subsequent understanding that fleas on rats were the vector, that humanity finally understood what it had been fighting. Today, plague still exists in rodent reservoirs in parts of the American West, Central Asia, and Africa, but antibiotics make it easily treatable when identified early.`,
    faqs: [
      { q: "How many people died from the Black Death?", a: "The Black Death killed an estimated 120 million people globally between 1347 and 1353, with estimates ranging from 75 to 200 million. In Europe, it eliminated 30–60% of the entire population — some regions lost two-thirds of their people." },
      { q: "What caused the Black Death?", a: "The Black Death was caused by the bacterium Yersinia pestis. It was primarily spread by fleas living on rats (bubonic plague), but also transmitted person-to-person through respiratory droplets (pneumonic plague) and through direct bloodstream infection (septicemic plague)." },
      { q: "Where did the Black Death originate?", a: "Genetic evidence places its origin in the Tian Shan mountains of Central Asia. It spread westward along Silk Road trade routes and reached Europe via Crimea in 1346, entering Sicily by ship in October 1347." },
      { q: "How did the Black Death spread across Europe?", a: "It spread via infected fleas on rats carried by merchant ships and overland trade caravans. Starting in Sicily in 1347, it swept through Italy, France, Spain, England, Germany, and Scandinavia within three years, following major trade routes." },
      { q: "When did the Black Death end?", a: "The initial pandemic wave ended around 1353, but plague returned in recurring waves for three more centuries in Europe. The last major European outbreak was the Great Plague of London in 1665." },
      { q: "How did the Black Death change European society?", a: "It permanently altered European society: feudalism weakened as labor became scarce, the Church lost authority, art and literature were transformed by mass death, and the demographic recovery took nearly 200 years. Many historians see the Black Death as a trigger for the Renaissance." },
      { q: "Is bubonic plague still a threat today?", a: "Yersinia pestis still exists in rodent populations in parts of Central Asia, Africa, and the American Southwest. A handful of human cases occur globally each year, but modern antibiotics cure it effectively when diagnosed promptly." },
    ],
    tags: ["bubonic", "medieval", "bacteria", "europe", "plague"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Medieval parish records and chronicles exist for parts of Europe; data for Asia and the Middle East is far less complete. Modern estimates use demographic reconstruction from regional sources.",
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
    longDescriptionEn: `Smallpox stands alone in human history as the only infectious disease that humanity has successfully eradicated — and as one of the deadliest killers our species ever faced. Caused by the Variola virus, smallpox infected humans for at least 3,000 years, with evidence of characteristic pustules found on the mummified remains of Egyptian pharaohs. In the 20th century alone — after vaccine technology existed — it killed an estimated 300 to 500 million people, more than all of the century's wars combined.

The Variola virus spread through respiratory droplets and direct contact with skin lesions. Unlike many pathogens, it infected only humans and had no animal reservoir, a biological fact that ultimately made eradication possible. The disease began with fever, headache, and severe back pain before the defining rash appeared — first flat red spots that progressed to raised bumps, then fluid-filled blisters, then pustules that covered the entire body including the palms, soles, and inside the mouth and throat. The pustular stage was agonizing; survivors were often left permanently scarred, and roughly one-third of those who survived were blinded. Overall case fatality rates averaged 20–30% in unvaccinated populations, rising to 80% or higher in some indigenous American populations encountering the disease for the first time after European contact.

Smallpox was the greatest biological weapon of colonialism. When Spanish conquistadors arrived in the Americas in the early 16th century, they carried Variola to populations with zero immunity. In Mexico, the Aztec population fell from an estimated 25 million to under 2 million within a century, with smallpox doing most of the killing. Similar devastation occurred across North and South America, the Pacific Islands, and Australia when European carriers made contact with isolated populations.

In Europe and Asia, smallpox was endemic — meaning it circulated constantly, killing primarily children. European royalty was not exempt: Queen Mary II of England, Emperor Joseph I of Austria, and Tsar Peter II of Russia all died of smallpox. The search for protection was urgent. In 1796, the English physician Edward Jenner demonstrated that inoculation with the milder cowpox virus conferred immunity against smallpox — the world's first vaccine. Vaccination campaigns gradually reduced smallpox deaths in industrialized nations through the 19th and early 20th centuries, but the disease continued raging in Asia, Africa, and South America.

The decisive moment came in 1967, when the World Health Organization launched an unprecedented global eradication campaign. The strategy combined mass vaccination with aggressive case detection and contact tracing — a concept called "surveillance and containment" that would later be applied to Ebola outbreaks. The last naturally occurring case of smallpox anywhere in the world was Ali Maow Maalin, a hospital cook in Merka, Somalia, in October 1977. On May 8, 1980, the World Health Assembly formally declared smallpox eradicated — the first and still only human infectious disease to achieve that status.

Today, live Variola virus exists in only two officially sanctioned repositories: the CDC in Atlanta and the VECTOR Institute in Russia. The ongoing debate about whether these stocks should be destroyed reflects the unique position smallpox holds in history — simultaneously humanity's greatest viral enemy and potentially its most useful research tool for understanding poxvirus biology and preparing for future threats.`,
    faqs: [
      { q: "How many people died from smallpox in the 20th century?", a: "Smallpox killed an estimated 300 to 500 million people in the 20th century alone, despite vaccines existing. It killed more people in the 1900s than all of that century's wars combined." },
      { q: "What caused smallpox?", a: "Smallpox was caused by the Variola virus (Variola major and Variola minor). It spread through respiratory droplets and contact with skin lesions, and infected only humans — it had no animal reservoir." },
      { q: "When was smallpox eradicated?", a: "The World Health Organization declared smallpox officially eradicated on May 8, 1980. The last naturally occurring case was recorded in Somalia in October 1977. It remains the only human infectious disease to have been completely eradicated." },
      { q: "How was smallpox eradicated?", a: "The WHO launched a global eradication campaign in 1967 combining mass vaccination with surveillance and containment — rapidly identifying cases and vaccinating everyone in close contact. The campaign succeeded in 13 years." },
      { q: "What were the symptoms of smallpox?", a: "Smallpox began with high fever, headache, and severe back pain, followed by a distinctive rash that progressed from flat spots to raised pustules covering the entire body. The case fatality rate averaged 20–30%; survivors were often scarred or blinded." },
      { q: "Does smallpox still exist?", a: "The Variola virus no longer circulates in the wild. Live samples exist only in two officially authorized laboratories: the CDC in Atlanta, USA, and the VECTOR Institute in Russia." },
    ],
    tags: ["virus", "eradicated", "vaccine", "global"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "WHO-led global eradication campaign (1967–1980) produced extensive modern surveillance data. Historical mortality is well-documented from the 19th century onward; earlier centuries use demographic reconstruction.",
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
      { lat: -15.0, lng: -58.0, radius: 3.5, intensity: 0.7, label: "South America" },
      { lat: -28.0, lng: 25.0, radius: 3.5, intensity: 0.75, label: "Southern Africa" },
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
    longDescriptionEn: `The 1918 Spanish Flu was the deadliest pandemic of the modern era and one of the most lethal in all of recorded history. In just two years, it infected approximately 500 million people — roughly one-third of the entire global population at the time — and killed an estimated 50 to 100 million, with most researchers settling on 75 million as a central estimate. To put this in perspective, the First World War, then raging simultaneously, killed approximately 20 million people over four years. The Spanish Flu killed more in a single autumn season.

The pandemic was caused by an H1N1 influenza A virus. Its precise origin remains debated: military camps in Kansas, USA are frequently cited as the site of the documented first wave in March 1918, but alternative hypotheses point to earlier activity in France or China. The misleading name "Spanish Flu" arose not because Spain was the point of origin but because Spain, as a neutral nation in World War I, had no wartime censorship of its press. When King Alfonso XIII fell ill and Spanish newspapers reported it freely, the world's media — which could not acknowledge outbreaks in their own censored countries — inadvertently associated the disease with Spain.

The pandemic unfolded in three distinct waves. The first wave in spring 1918 was relatively mild. The second wave, which struck in the autumn of 1918, was extraordinarily deadly — some communities reported mortality rates that wiped out 5–10% of their entire population within weeks. This fall wave killed with horrifying speed; some victims died within hours of first symptoms, turning blue from lack of oxygen (cyanosis) as their lungs filled with fluid. The third wave in early 1919, while less severe than the second, still claimed millions of lives.

What made the 1918 flu uniquely deadly compared to typical seasonal influenza was its unusual age-mortality curve. Typical flu kills primarily the very young and very old. The 1918 variant killed disproportionately in the 20–40 age bracket — young, healthy adults who would normally survive influenza easily. The most widely accepted explanation involves cytokine storms: the virus triggered an overactive immune response, causing the immune system to damage the body's own lung tissue. The stronger the immune system, the more damaging the storm — making robust young adults paradoxically more vulnerable.

The virus spread with extraordinary efficiency through the overcrowded conditions of World War I. Military trenches, troop ships, and training camps were breeding grounds. Allied troops carried the pathogen across the Atlantic and across multiple continents. Remote communities in Alaska and the Pacific Islands that had escaped previous influenza waves were devastated when the pandemic finally arrived, with some villages losing 50–90% of their population in weeks. In India, then under British colonial rule, casualties were catastrophic — an estimated 12 to 17 million deaths, possibly more.

The Spanish Flu ended gradually during 1919 and early 1920 as the virus mutated toward less lethal strains and herd immunity built in surviving populations. It left a profound mark on demographic history: the average human life expectancy in the United States fell by 12 years between 1917 and 1918. Its lessons about pandemic preparedness, the dangers of censoring outbreak information, and the vulnerability of high-density populations to respiratory pathogens directly shaped how public health institutions later responded to COVID-19 more than a century later.`,
    faqs: [
      { q: "How many people died from the Spanish Flu?", a: "The Spanish Flu killed an estimated 50 to 100 million people worldwide between 1918 and 1920, with 75 million as the most widely accepted estimate. It infected roughly 500 million people — one-third of the global population at the time." },
      { q: "Where did the Spanish Flu originate?", a: "The first documented wave appeared in military camps in Kansas, USA in March 1918, though some researchers point to France or China as earlier origin points. It was called 'Spanish' only because Spain's uncensored press reported it freely during WWI." },
      { q: "Why was the Spanish Flu so deadly?", a: "Uniquely, it killed healthy young adults aged 20–40 disproportionately, likely through cytokine storms — immune system overreaction that caused the body to damage its own lung tissue. The simultaneous overcrowding of WWI military movements accelerated spread." },
      { q: "What caused the Spanish Flu?", a: "The Spanish Flu was caused by an H1N1 influenza A virus. The same H1N1 subtype returned in the 2009 swine flu pandemic, though with much lower mortality." },
      { q: "How long did the Spanish Flu last?", a: "The pandemic lasted from spring 1918 to early 1920, unfolding in three waves. The second wave in autumn 1918 was by far the deadliest, killing millions in just a few months." },
      { q: "How did the Spanish Flu compare to COVID-19?", a: "The Spanish Flu killed far more people in absolute terms (50–100M vs ~7M officially for COVID-19, though excess mortality estimates for COVID reach 15–20M). Both spread globally via respiratory transmission. The 1918 flu killed far more young adults; COVID-19 disproportionately killed the elderly." },
    ],
    tags: ["influenza", "virus", "wwi", "h1n1", "respiratory"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "WWI-era censorship suppressed reporting in many countries. Modern estimates use demographic excess-mortality analysis. Revised upward significantly from original estimates; scholarly consensus now 50–100M.",
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
      { lat: 5.0, lng: 22.0, radius: 5.5, intensity: 0.9, label: "Sub-Saharan Africa" },
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
    longDescriptionEn: `HIV/AIDS represents one of the most destructive and socially complex pandemics of the 20th and 21st centuries. Since the first clinical cases were identified in 1981, the Human Immunodeficiency Virus has infected an estimated 85 million people and killed approximately 42 million — a death toll that continues to grow, because HIV/AIDS remains an ongoing pandemic with no cure and no vaccine. As of 2024, roughly 39 million people are living with HIV worldwide.

The virus's origin lies in the zoonotic transmission of a closely related chimpanzee virus (SIVcpz) to humans in the Congo Basin of west-central Africa, most likely in the 1920s. Genetic phylogenetics traces the global pandemic strain back to Kinshasa (then Léopoldville) in the Democratic Republic of Congo, where early urban growth, increased sexual networks, and large-scale colonial medical campaigns using unsterilized needles may have enabled the virus to establish itself in the human population. It remained largely undetected for decades, spreading slowly across Africa and eventually reaching Haiti and the United States through migrant workers and blood transfusions in the 1970s.

HIV attacks CD4+ T cells, the white blood cells that coordinate the human immune response. As the virus progressively destroys the immune system over years or decades, the infected person becomes unable to fight off opportunistic infections — diseases like tuberculosis, Pneumocystis pneumonia, toxoplasmosis, and Kaposi's sarcoma that a healthy immune system would suppress easily. This advanced stage of HIV infection is called AIDS (Acquired Immunodeficiency Syndrome). Without treatment, the median time from HIV infection to AIDS is roughly 10 years; from AIDS to death, another 1–3 years.

The virus is transmitted through specific bodily fluids: blood, semen, vaginal fluids, rectal fluids, and breast milk. It cannot be transmitted through casual contact. In the early epidemic, four main transmission routes dominated in different populations: unprotected sexual intercourse, sharing of injection drug needles, blood transfusions from infected donors, and mother-to-child transmission during birth or breastfeeding. The geography of transmission varied enormously: in Sub-Saharan Africa, heterosexual transmission drove the epidemic and infected entire communities; in Western nations, the early epidemic was concentrated among men who have sex with men and intravenous drug users, a pattern that shaped — and distorted — early public health responses.

The epicenter of the global epidemic is Sub-Saharan Africa, which bears nearly 70% of global HIV infections. Countries in southern Africa have been hardest hit: at the epidemic's peak in the late 1990s and early 2000s, Botswana, Lesotho, Eswatini, and Zimbabwe had adult HIV prevalence rates of 20–38%. The AIDS epidemic in Africa dismantled social structures, orphaned millions of children, devastated healthcare systems, and reversed decades of life expectancy gains.

The transformation came with antiretroviral therapy (ART). Early antiretroviral drugs arrived in the late 1980s, but the pivotal breakthrough was Highly Active Antiretroviral Therapy (HAART) introduced in 1996. By combining three or more drugs from different classes, HAART could suppress viral replication to undetectable levels, preventing immune system damage and rendering the patient unable to transmit the virus. HIV became a manageable chronic condition. Today, people diagnosed with HIV who access treatment promptly have near-normal life expectancy. The challenge is access: in low-income countries, millions still lack consistent access to ART, with funding shortfalls, stigma, and weak health systems as persistent barriers. The pandemic will not end without solving the equity problem.`,
    faqs: [
      { q: "How many people have died from HIV/AIDS?", a: "HIV/AIDS has killed approximately 42 million people since the pandemic began in the early 1980s. Roughly 39 million people are currently living with HIV worldwide, and approximately 630,000 people still die from AIDS-related illnesses each year." },
      { q: "What caused HIV/AIDS?", a: "HIV/AIDS is caused by the Human Immunodeficiency Virus (HIV), which originated from zoonotic transmission of a chimpanzee virus (SIVcpz) to humans in Central Africa, most likely in the 1920s in the region of present-day Democratic Republic of Congo." },
      { q: "How does HIV spread?", a: "HIV is transmitted through specific bodily fluids — blood, semen, vaginal fluids, rectal fluids, and breast milk. The main routes are unprotected sexual contact, shared injection needles, contaminated blood transfusions, and mother-to-child transmission during birth or breastfeeding." },
      { q: "Is HIV/AIDS still a pandemic today?", a: "Yes. HIV/AIDS remains an active global pandemic. In 2023, approximately 1.3 million new HIV infections occurred worldwide and about 630,000 people died from AIDS-related illnesses, mostly in Sub-Saharan Africa." },
      { q: "Is there a cure for HIV?", a: "There is no cure or vaccine for HIV, but antiretroviral therapy (ART) can suppress the virus to undetectable levels, preventing AIDS and eliminating transmission risk. People on effective ART have near-normal life expectancy." },
      { q: "Which countries are most affected by HIV/AIDS?", a: "Sub-Saharan Africa bears nearly 70% of global HIV infections. Southern African countries — Eswatini, Lesotho, Botswana, and Zimbabwe — have the highest prevalence rates, with 10–27% of adults living with HIV." },
    ],
    tags: ["virus", "retrovirus", "ongoing", "africa", "sexual-transmission"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "UNAIDS publishes annual surveillance data with confidence intervals. Historical figures since 1981 are well-documented. Ongoing pandemic with strong global monitoring infrastructure.",
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
      { lat: 5.0, lng: 18.0, radius: 4, intensity: 0.65, label: "Africa" },
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
    longDescriptionEn: `COVID-19 is the defining public health catastrophe of the early 21st century — a pandemic that demonstrated how rapidly a novel pathogen could circle the globe in an era of mass air travel, and how profoundly a respiratory virus could disrupt every aspect of human civilization. The disease is caused by SARS-CoV-2, a betacoronavirus that was first identified in December 2019 in Wuhan, a city of 11 million in central China's Hubei province. Within three months, it had reached every continent. By March 11, 2020, the World Health Organization declared COVID-19 a pandemic — the first such declaration since the 2009 H1N1 swine flu.

The virus belongs to the coronavirus family, which includes the pathogens behind SARS (2002–2003) and MERS. SARS-CoV-2 binds to ACE2 receptors found abundantly in the lungs, heart, kidneys, and gut, explaining the disease's wide range of potential complications. The most likely origin is zoonotic spillover from bats, possibly through an intermediate animal host, in or around Wuhan — though the precise details of its emergence remain a subject of scientific and geopolitical debate, with a laboratory-origin hypothesis never fully ruled out by international investigators.

The clinical picture of COVID-19 ranges from completely asymptomatic to immediately fatal. In most people — particularly younger, healthier individuals — infection causes mild to moderate symptoms: fever, cough, fatigue, and the distinctive loss of smell and taste (anosmia) that became a near-pathognomonic feature. In older adults and those with underlying conditions such as diabetes, heart disease, obesity, or compromised immunity, the infection could progress to severe pneumonia, acute respiratory distress syndrome (ARDS), multi-organ failure, and death. The global infection fatality rate averaged roughly 0.5–1%, but this masked enormous variation by age: the fatality rate was below 0.002% in children and exceeded 10% in those over 80.

The pandemic unfolded through a series of waves driven by viral evolution. The original Wuhan strain gave way to the Alpha variant in late 2020, which was followed by Delta in mid-2021 — significantly more transmissible and more likely to cause severe disease. Omicron, which emerged in late November 2021, represented a major shift: dramatically more transmissible than all previous variants (R0 of 8–15, compared to 2–3 for the original strain), but also causing less severe disease on average, partly because of widespread population immunity from vaccination and prior infection. Omicron's emergence effectively ended the acute emergency phase of the pandemic, though the virus continues to circulate and evolve.

The societal response to COVID-19 was unprecedented in modern history. Governments worldwide imposed lockdowns, school closures, mask mandates, and travel restrictions at a scale never before attempted. Global GDP contracted by 3.5% in 2020, the sharpest peacetime economic decline since the Great Depression. Supply chains fractured. Mental health crises intensified. Vaccines were developed, tested, and authorized at record speed — the mRNA vaccines from Pfizer/BioNTech and Moderna were developed and rolled out within a year of the pandemic's start, a scientific achievement with no historical precedent that saved an estimated 20 million lives in 2021 alone.

Official COVID-19 death counts reached approximately 7 million as reported to the WHO, but excess mortality analysis — comparing actual deaths against historical averages — suggests the true pandemic death toll is 15–20 million, with underreporting most severe in lower-income nations. The WHO ended the COVID-19 global health emergency on May 5, 2023, but the virus remains endemic worldwide, continuing to cause significant illness and thousands of deaths each month. Long COVID — a syndrome of persistent symptoms lasting months or years after acute infection — affects an estimated 10% of those infected and represents one of the pandemic's most significant ongoing public health burdens.`,
    faqs: [
      { q: "How many people have died from COVID-19?", a: "Official WHO figures record approximately 7 million COVID-19 deaths, but excess mortality analyses estimate the true pandemic death toll at 15–20 million when accounting for deaths not attributed to COVID-19 in official records." },
      { q: "What caused COVID-19?", a: "COVID-19 is caused by SARS-CoV-2, a betacoronavirus. Its most likely origin is zoonotic spillover from bats to humans, possibly through an intermediate animal host, in or near Wuhan, China in late 2019." },
      { q: "Is COVID-19 still happening today?", a: "Yes. COVID-19 remains endemic globally. While the WHO ended the global health emergency in May 2023, the virus continues to circulate, new variants continue to emerge, and thousands of deaths are still recorded monthly worldwide. Long COVID affects millions of survivors." },
      { q: "When did COVID-19 become a pandemic?", a: "The WHO declared COVID-19 a pandemic on March 11, 2020 — approximately three months after the first cases were identified in Wuhan, China in December 2019." },
      { q: "How did COVID-19 spread so fast?", a: "SARS-CoV-2 spread primarily through respiratory droplets and aerosols in enclosed spaces. The Omicron variant had an estimated R0 of 8–15, meaning each infected person spread the virus to 8–15 others on average, and global air travel accelerated intercontinental spread in weeks." },
      { q: "How effective were COVID-19 vaccines?", a: "mRNA vaccines (Pfizer/BioNTech, Moderna) showed 90–95% efficacy against severe disease from the original strain. Effectiveness against Omicron was lower for infection but remained high for preventing death and hospitalization. Vaccination is estimated to have saved 20 million lives in 2021 alone." },
    ],
    tags: ["coronavirus", "virus", "respiratory", "modern", "vaccine"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "Extensive modern surveillance. Official death counts exist for nearly all countries; excess mortality studies (The Economist, WHO) provide independent cross-checks. The 7M+ figure is an undercount; excess mortality estimates range 18–27M.",
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
      { lat: 5.0, lng: 18.0, radius: 7, intensity: 1.0, label: "Sub-Saharan Africa" },
      { lat: 20.0, lng: 78.0, radius: 5, intensity: 0.7, label: "South Asia" },
      { lat: 12.0, lng: 104.0, radius: 4.5, intensity: 0.65, label: "Southeast Asia" },
      { lat: -8.0, lng: -60.0, radius: 4, intensity: 0.5, label: "Amazon Basin" },
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
    longDescriptionEn: `Malaria is arguably the disease that has killed more human beings than any other in all of history. For thousands of years — from ancient Egypt and Greece to the malaria-riddled trenches of World War I and the villages of sub-Saharan Africa today — Plasmodium parasites transmitted by female Anopheles mosquitoes have been humanity's most persistent biological enemy. By some estimates, half of all humans who have ever lived have died from malaria. Even restricting analysis to the 20th and 21st centuries, malaria has killed an estimated 70 million people while infecting billions more.

The disease is caused not by a single pathogen but by five species of Plasmodium parasite, of which Plasmodium falciparum is responsible for the vast majority of deaths. The parasite's lifecycle is elegantly lethal: it travels from mosquito saliva into the human bloodstream, invades liver cells where it multiplies invisibly, then erupts into the red blood cells — causing the classic cyclical fever pattern as waves of parasites are released every 48 to 72 hours. In severe cases, particularly in young children and pregnant women, parasites invade the brain (cerebral malaria), cause severe anaemia, or trigger multi-organ failure. Without treatment, severe malaria kills within days.

The geographic toll is brutally unequal. Sub-Saharan Africa bears roughly 95% of global malaria deaths, with children under five accounting for about 80% of fatalities on the continent. The reason is partly biological — adults in high-transmission areas develop partial immunity through repeated infection — and partly structural: the poorest communities lack access to insecticide-treated bed nets, indoor spraying, and anti-malarial medications. Countries like Nigeria, the Democratic Republic of Congo, Niger, Tanzania, and Mozambique each record hundreds of thousands of cases annually.

The 20th century saw dramatic swings in the fight against malaria. DDT-based eradication campaigns in the 1950s and 1960s eliminated malaria from Europe, North America, and much of South America and Asia. But in tropical Africa, where the Anopheles mosquito density is far higher and transmission occurs year-round, eradication proved impossible. The emergence of chloroquine-resistant Plasmodium falciparum in the 1970s and 1980s reversed hard-won gains, and deaths climbed sharply through the 1990s and early 2000s before a massive global response — funded largely by the Global Fund and the US President's Malaria Initiative — began to turn the tide.

Between 2000 and 2023, the global malaria death rate fell by roughly 60%, saving an estimated 12 million lives. But progress has stalled: since 2015, annual death counts have plateaued at around 600,000 per year, with COVID-19 disruptions pushing deaths back above 600,000 in 2020 and 2021. The development of the RTS,S/AS01 (Mosquirix) vaccine — approved by the WHO in 2021 after 30 years of development — and the more effective R21/Matrix-M vaccine (approved in 2023) offer new hope. But coverage remains limited, and climate change is expanding the range of Anopheles mosquitoes into higher altitudes and previously malaria-free regions. Malaria is not going away.`,
    faqs: [
      { q: "How many people die from malaria each year?", a: "Approximately 600,000 people die from malaria annually, according to WHO data. In 2022, the WHO estimated 619,000 deaths, with about 80% occurring in children under five in Sub-Saharan Africa." },
      { q: "What causes malaria?", a: "Malaria is caused by Plasmodium parasites — primarily Plasmodium falciparum — transmitted through the bites of infected female Anopheles mosquitoes. It is not contagious between humans." },
      { q: "Is malaria still happening today?", a: "Yes. Malaria is an ongoing global health crisis. In 2022, there were an estimated 249 million cases worldwide. Sub-Saharan Africa accounts for about 95% of all deaths." },
      { q: "Where is malaria most common?", a: "Sub-Saharan Africa has the highest burden, but malaria also occurs in parts of South Asia, Southeast Asia, the Amazon basin, and parts of Oceania. Roughly 50 countries are classified as endemic." },
      { q: "Is there a vaccine for malaria?", a: "Yes. The RTS,S/AS01 (Mosquirix) vaccine was approved by the WHO in 2021 and is now being deployed in parts of Africa. The more effective R21/Matrix-M vaccine received WHO approval in 2023. Neither provides complete protection." },
    ],
    tags: ["parasite", "mosquito", "tropical", "ongoing", "africa"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "WHO publishes annual World Malaria Reports with country-level data. Historical estimates use demographic modeling. One of the most rigorously monitored infectious diseases globally.",
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
    longDescriptionEn: `The 2014–2016 West African Ebola epidemic was not the first outbreak of Ebola virus disease, but it was by far the largest and most geographically widespread in the pathogen's known history. Earlier Ebola outbreaks — beginning with the first identified cases in 1976 near the Ebola River in what is now the Democratic Republic of Congo — had been contained relatively quickly, usually in remote rural areas where the virus burned through small populations before running out of hosts. The 2014 outbreak was different. It began in the forests of southeastern Guinea in December 2013, went unrecognized for months, and then spread into densely populated urban areas and across international borders.

Ebola virus disease is caused by Ebola virus (EBOV), a member of the filovirus family. It spreads through direct contact with the blood, body fluids, or organs of infected people — not through the air. The virus is not contagious before symptoms appear, which theoretically makes it controllable. But its symptoms are dramatic and its mortality rate is terrifying: untreated Ebola kills between 25% and 90% of those infected depending on the outbreak, virus strain, and available care. The 2014 West African outbreak had a case fatality rate of approximately 40%.

The virus likely originated in fruit bats, which are thought to be the natural reservoir host. The initial human case in Guinea — a two-year-old child who died in December 2013 — probably contracted the virus through contact with infected bats in or near the village of Meliandou. From there, the virus spread through family clusters, funeral practices (during which mourners came into contact with the bodies of the deceased), and increasingly through overwhelmed healthcare systems where protective equipment was scarce and infection-control protocols were minimal.

The toll was 11,325 confirmed deaths from 28,600 reported cases across Guinea, Liberia, and Sierra Leone. These numbers, grim as they are, understate the true impact. Healthcare systems in all three countries — already among the weakest in the world — were overwhelmed and effectively collapsed. Routine care for malaria, TB, HIV, and maternal complications stopped. The secondary death toll from disrupted healthcare services likely exceeded the Ebola death count itself. A pregnant woman in Liberia during the epidemic was more likely to die in childbirth in 2015 than she had been in 2013, because qualified staff had died, fled, or were occupied with Ebola response.

The outbreak prompted the fastest vaccine development effort in history for the disease. The rVSV-ZEBOV (Ervebo) vaccine, developed by the Public Health Agency of Canada and Merck, showed 97.5% efficacy in ring vaccination trials conducted during the epidemic and has since been approved by the FDA and EMA. A second vaccine (Ad26.ZEBOV/MVA-BN-Filo) is now used in preventive programs in endemic regions. The 2014–2016 epidemic fundamentally changed global pandemic preparedness frameworks, directly contributing to the establishment of the WHO Health Emergencies Programme and CEPI (the Coalition for Epidemic Preparedness Innovations).`,
    faqs: [
      { q: "How many people died from the 2014–2016 Ebola outbreak?", a: "The 2014–2016 West African Ebola epidemic killed 11,325 people from 28,600 reported cases, primarily in Guinea, Liberia, and Sierra Leone. It was the largest Ebola outbreak in history." },
      { q: "How does Ebola spread?", a: "Ebola spreads through direct contact with blood, body fluids, or organs of infected people or animals. It does not spread through the air. Transmission most commonly occurs through caring for sick patients or handling bodies during burial without proper protective equipment." },
      { q: "What is the death rate of Ebola?", a: "The Ebola fatality rate ranges from 25% to 90% depending on the strain and available medical care. The 2014–2016 West African outbreak had approximately a 40% case fatality rate. Earlier outbreaks of more lethal strains reached 88–90%." },
      { q: "Is there a vaccine for Ebola?", a: "Yes. The rVSV-ZEBOV vaccine (Ervebo) was approved by the FDA in 2019 and showed 97.5% efficacy in trials. A second vaccine, Ad26.ZEBOV/MVA-BN-Filo, has also been approved and is now used in at-risk populations in the DRC and neighboring countries." },
      { q: "Where does Ebola come from?", a: "Ebola's natural reservoir is believed to be fruit bats in Central and West Africa. Humans are infected through contact with infected animals (bats, apes, or other wildlife), and then the virus spreads person-to-person through direct contact with bodily fluids." },
    ],
    tags: ["virus", "hemorrhagic", "africa", "contained"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "Each outbreak is individually tracked by WHO and CDC with case counts and outcomes documented. The 2014–16 West African epidemic is the most studied; smaller outbreaks have complete records.",
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
    longDescriptionEn: `Hantavirus occupies a unique position in the landscape of infectious diseases: it is simultaneously rare and terrifying, with mortality rates that rival Ebola, a mode of transmission that makes it nearly impossible to fully prevent, and a global distribution that ensures sporadic outbreaks on every inhabited continent. The virus was formally identified in 1993 during an outbreak in the Four Corners region of the American Southwest — where Arizona, Colorado, New Mexico, and Utah meet — but genetic evidence shows that hantaviruses have been infecting humans for centuries, circulating silently in rodent populations worldwide.

The pathogen is not a single virus but a family of related viruses, each associated with a specific rodent reservoir. In the Americas, the Sin Nombre virus (carried by deer mice) causes Hantavirus Pulmonary Syndrome (HPS), a respiratory illness with approximately 35% mortality — one of the highest case fatality rates of any disease circulating in North America. In South America, Andes virus — notable as the only hantavirus known to transmit between humans, not just from rodent to human — causes a similar syndrome and has been responsible for outbreaks in Argentina and Chile, including the 2026 MV Hondius cruise ship cluster that linked cases across multiple countries.

In Europe and Asia, different hantavirus strains cause Hemorrhagic Fever with Renal Syndrome (HFRS), a distinct disease characterized by kidney failure rather than lung damage. The Hantaan virus (Korea, China) and Puumala virus (Scandinavia, Western Europe) are the main culprits, causing tens of thousands of HFRS cases annually, primarily in agricultural workers who come into contact with rodent excreta in fields and forests.

Transmission occurs when humans inhale aerosolized particles from infected rodent urine, feces, or saliva — or when they handle contaminated material without respiratory protection. There is no person-to-person transmission for most strains (the Andes virus being the exception), which limits epidemic potential. The risk is highest during activities that disturb rodent habitats: cleaning out sheds and barns, camping in rodent-infested areas, harvesting crops by hand, or — as demonstrated aboard the MV Hondius — inhabiting enclosed spaces with rodent infestations.

The 2026 MV Hondius outbreak marked a significant moment in hantavirus epidemiology. The cruise ship, which had departed from Ushuaia, Argentina, recorded multiple cases of Andes hantavirus among passengers from at least five countries. With 11 confirmed cases and 3 deaths — and the Andes virus's known person-to-person transmission capability — health authorities in the UK, Spain, France, the United States, Argentina, and Chile activated quarantine and monitoring protocols. The WHO issued Disease Outbreak News (DON601) confirming the cluster. This international dimension was unprecedented for hantavirus and underscored the risk that rodent-borne diseases pose in an era of global travel.

There is no specific antiviral treatment for any hantavirus infection, and no approved vaccine outside of China (where a killed whole-virus vaccine for HFRS has been in use since the 1990s). Management is supportive: mechanical ventilation for HPS, dialysis for severe HFRS. Early recognition is critical and difficult, because initial symptoms — fever, muscle aches, fatigue — are indistinguishable from influenza.`,
    faqs: [
      { q: "How is hantavirus transmitted to humans?", a: "Hantavirus is primarily transmitted by inhaling aerosolized particles from infected rodent urine, feces, or saliva. Most strains do not spread person-to-person, but the Andes virus (South America) is a notable exception and can transmit between humans." },
      { q: "What is the death rate of hantavirus?", a: "Hantavirus Pulmonary Syndrome (HPS), caused by Sin Nombre and Andes viruses in the Americas, has a case fatality rate of approximately 35%. Hemorrhagic Fever with Renal Syndrome (HFRS), caused by Asian and European strains, has a lower fatality rate of 1–15%." },
      { q: "Is hantavirus still happening in 2026?", a: "Yes. In May 2026, a cluster of Andes hantavirus cases was confirmed among passengers of the cruise ship MV Hondius, which had sailed from Ushuaia, Argentina. The WHO issued Disease Outbreak News (DON601) confirming 11 cases and 3 deaths across passengers from the UK, France, Spain, the USA, Argentina, and Chile." },
      { q: "Where is hantavirus most common?", a: "Different hantavirus strains circulate worldwide. In the Americas, HPS is most common in the US Southwest, Argentina, Chile, and Brazil. In Asia, HFRS is endemic in China, Korea, and Russia. In Europe, Puumala virus causes mild HFRS cases particularly in Scandinavia and Finland." },
      { q: "Is there a treatment or vaccine for hantavirus?", a: "There is no approved antiviral treatment for hantavirus infection in most countries. Treatment is supportive, focusing on mechanical ventilation (for HPS) or dialysis (for HFRS). China has an approved killed whole-virus vaccine for HFRS, but no global vaccine is available." },
    ],
    tags: ["virus", "rodent-borne", "respiratory", "americas"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "Relatively rare disease with individual cases tracked by national health authorities. The 2026 MV Hondius cluster is being monitored in real time. Historical case fatality rates well-established at 38%.",
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
      { lat: 5.0, lng: 20.0, radius: 4.5, intensity: 0.8, label: "Africa" },
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
    longDescriptionEn: `Cholera is the disease that taught humanity epidemiology. When Dr. John Snow removed the handle from the Broad Street water pump in London in 1854, he did not know what caused cholera — the bacterium Vibrio cholerae would not be identified for another three decades — but he correctly deduced that contaminated water was responsible, pioneering the science of epidemiological investigation. That insight, born during cholera's third pandemic, eventually made the disease one of the most preventable infections in the world. Yet more than 170 years later, cholera still kills an estimated 100,000 people annually and infects between 1.3 and 4 million more, the seventh pandemic still active after six decades.

Cholera's origin is the Ganges Delta of India and Bangladesh, where the warm, nutrient-rich estuarine waters provide ideal conditions for Vibrio cholerae to persist year-round. The bacterium produces a powerful toxin that binds to intestinal cells, causing them to pump chloride ions into the gut lumen at a catastrophic rate. The body follows the chloride with water, producing the disease's most characteristic and deadly feature: profuse, watery "rice-water" diarrhea that can amount to 20 liters per day. An adult can lose enough fluids to die within hours of symptom onset if not treated.

Seven distinct pandemic waves have swept the world since 1817. The first three — 1817, 1829, and 1852 — followed British trade and military routes from India across Asia, the Middle East, Europe, and eventually the Americas. The third pandemic killed approximately one million people in Europe alone and prompted the public health reforms — sewage systems, clean water infrastructure — that eventually made cholera rare in industrialized nations. The seventh pandemic, which began in 1961 in Indonesia with a new biotype (El Tor), is still ongoing and has been the most geographically persistent, spreading to Africa in 1970 and entrenching itself as an endemic disease in countries where water and sanitation infrastructure remains inadequate.

Today, cholera is overwhelmingly a disease of poverty, displacement, and infrastructure failure. It flares predictably in the aftermath of disasters — floods, earthquakes, wars — that disrupt water supplies and overwhelm sanitation. The 2010 Haiti earthquake-linked outbreak, introduced by UN peacekeepers from Nepal, killed over 10,000 people and infected 800,000 in a country with essentially no clean water infrastructure. In 2023, Sudan, the DRC, Ethiopia, Somalia, and Haiti collectively accounted for the majority of global cases, all in the context of armed conflict or humanitarian collapse. Yemen's cholera crisis, beginning in 2016 amid civil war, became the largest cholera outbreak ever recorded, with over 2.5 million suspected cases.

Oral rehydration therapy (ORT) — a simple solution of water, salt, and sugar — when administered early, reduces cholera mortality from 50% to under 1%. It is inexpensive, effective, and requires no medical equipment. The tragedy of cholera is not that we lack the tools to prevent and treat it, but that the populations most at risk have the least access to safe water, sanitation, and healthcare.`,
    faqs: [
      { q: "How many people die from cholera each year?", a: "The WHO estimates 21,000–143,000 deaths from cholera annually, with a central estimate of approximately 100,000. In major outbreak years (such as 2022–2023), reported deaths can exceed these figures due to crisis conditions in Yemen, Syria, the DRC, and Sudan." },
      { q: "What causes cholera?", a: "Cholera is caused by the bacterium Vibrio cholerae, which produces a toxin that triggers massive fluid loss through the intestines. It spreads through water or food contaminated with infected feces — most commonly through inadequate sanitation and unsafe drinking water." },
      { q: "Is cholera still happening today?", a: "Yes. The 7th cholera pandemic, ongoing since 1961, continues to affect dozens of countries. In 2022–2023, the WHO reported the highest number of cholera cases in nearly a decade, driven by outbreaks in Yemen, Syria, the DRC, Ethiopia, and Haiti." },
      { q: "How deadly is cholera without treatment?", a: "Untreated cholera kills 25–50% of those infected, with death occurring from dehydration within hours to days. With prompt oral rehydration therapy, the fatality rate drops below 1%. Intravenous fluids are used for severe cases." },
      { q: "How was John Snow connected to cholera?", a: "During London's 1854 cholera outbreak, Dr. John Snow mapped cases and identified a contaminated water pump on Broad Street as the source. By convincing authorities to remove the pump handle, he helped end the local outbreak. His work is considered the founding act of modern epidemiology." },
    ],
    tags: ["bacteria", "waterborne", "sanitation", "historical"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Historical pandemics (1817–1923) rely on incomplete records from colonized regions. Modern WHO surveillance is comprehensive. The ongoing 7th pandemic (1961–present) is well-monitored but under-reported in conflict zones.",
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
    longDescriptionEn: `World War I — known to those who lived through it simply as "The Great War" — began with a single assassination in Sarajevo on June 28, 1914, and ended with the deaths of an estimated 17 to 22 million people and the collapse of four empires. It was the first conflict in history to be described as a world war not as hyperbole but as sober fact: fighting occurred on the Western Front in France and Belgium, the Eastern Front across Russia and Ukraine, the Italian Front, the Mesopotamian and Palestinian campaigns, and at sea across the globe. In four years, it killed more people than any previous conflict in European history.

The war's defining characteristic was the catastrophic mismatch between 19th-century military tactics and 20th-century industrial weapons. Generals on all sides initially planned for mobile, decisive campaigns — the German Schlieffen Plan, for instance, called for defeating France in six weeks and then turning east against Russia. Instead, the Western Front stabilized into 700 kilometers of trenches by late 1914, and would barely move for the next three years. The reason was firepower. Machine guns could fire 600 rounds per minute, making frontal infantry assaults suicidal. Artillery had become capable of destroying entire landscapes — the Battle of the Somme opened with a week-long artillery barrage that fired 1.5 million shells, yet failed to destroy the German defenses. The first day of the Somme, July 1, 1916, saw 57,470 British casualties including 19,240 killed — the bloodiest single day in the history of the British Army.

Both sides introduced new weapons in desperate attempts to break the stalemate. Poison gas — first used at scale by Germany at Ypres in April 1915 — caused agonizing deaths from chlorine and mustard gas exposure, and left survivors with lifelong respiratory damage. Tanks, introduced by the British in 1916, promised mobility but were mechanically unreliable. Aircraft evolved from reconnaissance platforms to fighters and bombers within four years. Submarines threatened to starve Britain by sinking merchant shipping and ultimately brought the United States into the war when Germany's unrestricted submarine warfare sank American vessels.

The human cost was distributed across all belligerents. France lost approximately 1.4 million soldiers killed; Germany, 2 million; Russia, 1.8 million before its revolution and withdrawal in 1917; Austria-Hungary, 1.5 million; Britain and its Empire, 900,000; the Ottoman Empire, roughly 800,000. Total civilian deaths — from bombardment, famine, disease, and the Armenian Genocide — added millions more. The Spanish Flu, which erupted in the final year of the war and was accelerated by the movement of troops across the globe, killed more people than the fighting itself.

The war's political consequences reshaped the world. The Austro-Hungarian, Russian, German, and Ottoman empires all collapsed. The Treaty of Versailles imposed punishing reparations on Germany that economists like John Maynard Keynes predicted would destabilize Europe — a prophecy fulfilled when the humiliation and economic chaos helped bring Adolf Hitler to power 14 years later. The League of Nations, created to prevent future wars, lacked enforcement mechanisms. World War I did not end wars; it made World War II almost inevitable.`,
    faqs: [
      { q: "How many people died in World War I?", a: "World War I killed approximately 17–22 million people in total, including both military and civilian deaths. Military deaths across all nations numbered roughly 10 million, with an additional 7–12 million civilian deaths from bombardment, famine, and disease." },
      { q: "What caused World War I?", a: "WWI was triggered by the assassination of Archduke Franz Ferdinand of Austria-Hungary on June 28, 1914, but underlying causes included entangling alliances, imperial rivalries, militarism, and nationalist tensions in the Balkans. The alliance system quickly drew most of Europe into war." },
      { q: "When did World War I start and end?", a: "World War I began on July 28, 1914 when Austria-Hungary declared war on Serbia, and ended on November 11, 1918 with the Armistice at Compiègne. Fighting occurred across Europe, the Middle East, Africa, and at sea for over four years." },
      { q: "What countries fought in World War I?", a: "The Allied Powers (France, UK, Russia, Italy from 1915, USA from 1917, and others) fought against the Central Powers (Germany, Austria-Hungary, Ottoman Empire, and Bulgaria). Over 30 nations were ultimately involved." },
      { q: "Why were casualties so high in WWI?", a: "Casualties were catastrophically high because industrial-age weapons — machine guns, artillery, poison gas — combined with outdated 19th-century tactics of massed infantry assaults. The result was trench warfare stalemate where offensives cost tens of thousands of lives for minimal territorial gain." },
    ],
    tags: ["war", "europe", "industrial", "trenches"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "Extensive national military archives for all major combatants. War graves commissions documented military casualties. Civilian deaths less complete but well-studied. The 20M figure is the established scholarly consensus.",
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
    longDescriptionEn: `World War II (1939–1945) was the deadliest military conflict in human history and the defining catastrophe of the 20th century. An estimated 70 to 85 million people died — approximately 3% of the world's entire population at the time — making it the single largest loss of human life in any conflict before or since. Unlike World War I, where military casualties dominated, WWII killed more civilians than soldiers: bombing campaigns, deliberate genocide, famine, forced labor, and population displacement drove the civilian death toll above 50 million.

The war had two distinct but linked theaters. In Europe, Nazi Germany under Adolf Hitler systematically conquered most of the continent between 1939 and 1942. The invasion of Poland on September 1, 1939 triggered war with Britain and France. The fall of France in June 1940 left Britain isolated. Operation Barbarossa — Germany's invasion of the Soviet Union beginning June 22, 1941 — opened the war's most destructive front. The Eastern Front alone killed approximately 30 million people, combining military losses from both sides with the Nazi program of deliberate starvation, execution, and slave labor of Soviet civilians. Stalingrad, fought between August 1942 and February 1943, became the turning point: the Soviet victory broke the Wehrmacht's offensive capacity and began the long German retreat.

Parallel to the European theater, Japan pursued its own empire-building across East and Southeast Asia and the Pacific. Japan's invasion of China beginning in 1937 — technically before the world war's official start — killed an estimated 15 to 20 million Chinese civilians and combatants through combat, the systematic mass murder of the Nanjing Massacre, deliberate famine, and biological warfare experiments conducted by Unit 731. Japan's attack on Pearl Harbor on December 7, 1941 brought the United States into the war, transforming an already global conflict into a truly worldwide industrial war.

The Holocaust — Nazi Germany's systematic genocide of Jewish people and other minorities — stands as the most documented atrocity of the war and the clearest example of state-organized mass murder in human history. Between 1941 and 1945, approximately 6 million Jewish people (two-thirds of European Jewry) were murdered in gas chambers, mass shootings, and concentration camps. An additional 6 million Romani, disabled people, Soviet prisoners, and others were killed in the same apparatus. The Holocaust demanded and produced entirely new legal frameworks: international humanitarian law, the Genocide Convention, the Universal Declaration of Human Rights.

The war ended with the unconditional surrender of Germany on May 8, 1945 (V-E Day) and Japan on September 2, 1945 (V-J Day), following the atomic bombings of Hiroshima and Nagasaki — the first and only combat use of nuclear weapons. The postwar order produced the United Nations, the Nuremberg Trials (establishing individual criminal accountability for war crimes), the Marshall Plan's reconstruction of Europe, and the Cold War division of the world between American and Soviet spheres. No event in history has more completely reshaped global politics, international law, and the human conception of war's limits.`,
    faqs: [
      { q: "How many people died in World War II?", a: "World War II killed an estimated 70–85 million people, making it the deadliest conflict in human history. This includes approximately 30 million military deaths and 50+ million civilian deaths from bombing, genocide, famine, and disease. The Soviet Union suffered the most with roughly 27 million deaths." },
      { q: "When did World War II start and end?", a: "WWII is generally dated from September 1, 1939 (Germany's invasion of Poland) to September 2, 1945 (Japan's formal surrender). Germany surrendered on May 8, 1945 (V-E Day). Some historians extend the start to Japan's invasion of China in 1937." },
      { q: "What countries had the most deaths in WWII?", a: "The Soviet Union suffered the most deaths (approximately 27 million), followed by China (15–20 million), Germany (7–9 million), Poland (6 million), Japan (3 million), and Yugoslavia (1 million). The USA lost approximately 420,000." },
      { q: "How many Jewish people died in the Holocaust?", a: "Approximately 6 million Jewish people were murdered in the Holocaust — about two-thirds of Europe's pre-war Jewish population. An additional 6 million Romani, disabled people, Soviet POWs, and others were also killed in the Nazi genocide apparatus." },
      { q: "Why did the US drop atomic bombs on Japan?", a: "The US dropped atomic bombs on Hiroshima (August 6, 1945) and Nagasaki (August 9, 1945) to force Japan's surrender and avoid a land invasion of Japan, which military planners estimated would cost hundreds of thousands of American and millions of Japanese lives. Japan surrendered on August 15, 1945." },
    ],
    tags: ["war", "global", "holocaust", "nuclear", "deadliest"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "The most thoroughly documented war in history: Nuremberg Trials, national archives, census records, Holocaust documentation. Civilian casualties less precise but well-bounded. The 70–85M range reflects genuine variation in methodology.",
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
    longDescriptionEn: `The Mongol Conquests represent the largest land empire ever assembled by military force and one of the most destructive episodes in human history. Between 1206, when Temüjin united the fractious Mongol tribes and took the title Genghis Khan ("Universal Ruler"), and 1368, when the Mongol Yuan dynasty was expelled from China, Mongol armies killed an estimated 30 to 50 million people — approximately 10% of the entire global population of the 13th century. In some regions the demographic collapse was even more catastrophic: Iran and Iraq may have lost 50–75% of their populations; China's population fell by 30–40% during the Mongol conquest.

Mongol military success rested on a combination of factors that no contemporary force could match. The steppe cavalry were among the finest mounted archers in history, capable of shooting accurately at full gallop — a skill developed from birth in a society where horsemanship and hunting were survival skills. Mongol armies operated with extraordinary logistical discipline, communicating across vast distances through relay networks and living off the land and captured supplies. They also rapidly adopted and improved the siege technologies of the peoples they conquered: Chinese engineers, Persian artisans, and captured craftsmen built their trebuchets and siege towers.

The psychological dimension of Mongol warfare was equally important. Genghis Khan established a consistent policy: cities that surrendered immediately were generally spared; cities that resisted were destroyed utterly. The sacking of Samarkand, Merv, Nishapur, and Baghdad were not just military victories but deliberate demonstrations designed to terrify subsequent targets into surrender. The accounts are harrowing — mass executions, entire populations enslaved or killed, the infrastructure of irrigation and agriculture destroyed, libraries burned. The sack of Baghdad in 1258, in which the last Abbasid Caliph was executed and the great library of Baghdad (the "House of Wisdom") was destroyed, is remembered as one of the most catastrophic cultural losses in Islamic history.

The Mongol Empire was not monolithic in its effects. Genghis Khan and his successors also created the conditions for the Pax Mongolica — a period of relative stability and open trade across Eurasia that facilitated the exchange of goods, ideas, technologies, and diseases along the Silk Road. The same networks that moved silk, spices, and gold also moved bubonic plague, which Mongol armies may have helped carry westward, contributing to the Black Death that devastated Europe beginning in 1347. Whether the Mongols "caused" the Black Death is debated, but the connection is epidemiologically plausible.

By the mid-14th century, the empire fragmented into successor states: the Yuan dynasty in China, the Ilkhanate in Persia, the Chagatai Khanate in Central Asia, and the Golden Horde across Russia. Each followed different trajectories, some integrating with local cultures and converting to Islam, others maintaining Mongolian traditions. The Ming dynasty expelled the Yuan from China in 1368, and the other khanates gradually dissolved or were absorbed. But the demographic and cultural damage was permanent: entire civilizations — the sophisticated urban culture of Khorasan, the agricultural societies of the Fergana Valley — never fully recovered.`,
    faqs: [
      { q: "How many people did the Mongols kill?", a: "Estimates of deaths from the Mongol Conquests range from 30 to 50 million people. Some historians place the figure higher. As a proportion of global population, this may represent 10% of all humans alive in the 13th century, making it one of the deadliest genocides in history relative to world population." },
      { q: "How did Genghis Khan conquer such a large empire?", a: "Genghis Khan unified Mongol tribes through military prowess and political genius, then built an army of expert mounted archers with unprecedented strategic mobility. He combined psychological warfare (offering mercy to cities that surrendered, total destruction to those that resisted), advanced siege technology learned from conquered peoples, and a meritocratic military command structure." },
      { q: "What was the Mongol Empire's largest extent?", a: "At its peak under Kublai Khan in the 1270s–1280s, the Mongol Empire stretched from Korea and China in the east to Hungary and Poland in the west — approximately 24 million square kilometers, making it the largest contiguous land empire in history." },
      { q: "Did the Mongols cause the Black Death?", a: "It is epidemiologically plausible. The bubonic plague bacterium (Yersinia pestis) existed in rodent populations of Central Asia — Mongol heartland. Mongol trade networks and troop movements along the Silk Road may have facilitated the westward spread of plague, which appeared in Crimea in 1346 and then swept Europe as the Black Death." },
      { q: "What was the Pax Mongolica?", a: "The Pax Mongolica ('Mongol Peace') refers to a period of roughly a century (c.1260–1360) during which Mongol control of the Silk Road trade routes created relative stability and enabled unprecedented commercial and cultural exchange across Eurasia, connecting China, the Islamic world, and Europe." },
    ],
    tags: ["war", "conquest", "medieval", "empire"],
    dataReliabilityLevel: "low",
    dataReliabilityNote: "Medieval sources are limited, often from court historians with agendas. Demographic estimates are extrapolated from regional population data before and after conquest. The 40M figure is a widely cited estimate but uncertainty is very high.",
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
    longDescriptionEn: `The Taiping Rebellion (1850–1864) is one of the most consequential and least-known conflicts in modern history. A civil war in southern China that blended Christian millenarianism, Han nationalism, and peasant revolt, it resulted in an estimated 20 to 30 million deaths — placing it among the deadliest conflicts in human history and comparable in scale to World War I, which occurred half a century later with all the industrial killing machines of the 20th century. Yet the Taiping Rebellion is rarely taught outside China and remains largely absent from Western historical consciousness.

The rebellion began with Hong Xiuquan, a failed Confucian examination candidate who, after repeated failures to pass the imperial examinations that gatekept social advancement in Qing dynasty China, experienced a visionary illness in 1837. He later interpreted his visions through Christian literature obtained from Protestant missionaries: he had, he concluded, met God the Father, who had revealed that Hong was Jesus Christ's younger brother sent to China to drive out evil. This remarkable synthesis of Protestant Christianity and Chinese messianism became the ideological foundation of the Taiping Heavenly Kingdom (Taiping Tianguo — "Heavenly Kingdom of Great Peace").

Hong gathered followers in the marginalized Hakka community of Guangdong province — a group that had long faced discrimination from the dominant Han population — and by 1851 launched an open rebellion. The Taiping armies moved with remarkable speed, capturing Nanjing in 1853 and establishing it as their capital, which they renamed Tianjing ("Heavenly Capital"). At its height, the Taiping Heavenly Kingdom controlled a territory in southern and eastern China containing roughly 30 million people, with its own government, legal system, and social reforms — including, notably, the abolition of foot binding and an assertion of gender equality that was radical by the standards of any civilization of the time.

The Qing dynasty's response was initially ineffective: the banner armies that had conquered China two centuries earlier had atrophied into hollow institutions. The turning point came with the creation of new regional armies — most importantly the Xiang Army under Zeng Guofan and later the Huai Army under Li Hongzhang — which combined traditional Chinese military organization with Western weapons and tactics. Foreign mercenary forces, including the famous "Ever Victorious Army" commanded successively by Frederick Townsend Ward and Charles Gordon (later "Chinese Gordon" of Khartoum fame), also played a role in key engagements around Shanghai.

The death toll came not primarily from combat but from the catastrophic disruption of agriculture, trade, and governance across China's most productive region — the Yangtze River Delta, which generated a disproportionate share of the Qing dynasty's tax revenue. Sieges of cities like Nanjing and Suzhou lasted years, during which populations starved. Armies on both sides recruited by force and plundered civilian populations. Bubonic plague and cholera spread through devastated communities. The final siege and recapture of Nanjing in 1864, following Hong Xiuquan's death by suicide or illness, ended the rebellion but not the suffering.`,
    faqs: [
      { q: "How many people died in the Taiping Rebellion?", a: "Estimates range from 20 to 30 million deaths, making it one of the deadliest conflicts in history. Most deaths came not from combat but from famine, disease, and the general disruption of agriculture and trade across the Yangtze River Delta region of China." },
      { q: "What caused the Taiping Rebellion?", a: "The rebellion was sparked by Hong Xiuquan, who believed he was the younger brother of Jesus Christ sent to cleanse China of evil. It drew on widespread discontent with Qing dynasty corruption, poverty, and inequality — particularly among the Hakka minority community in southern China." },
      { q: "How long did the Taiping Rebellion last?", a: "The Taiping Rebellion lasted from 1850 to 1864 — fourteen years. The Taiping Heavenly Kingdom was established in 1851 and captured Nanjing in 1853, where they established their capital until its fall in 1864." },
      { q: "Who won the Taiping Rebellion?", a: "The Qing dynasty ultimately suppressed the rebellion with the help of new regional armies (Xiang Army under Zeng Guofan) and Western-led mercenary forces. Nanjing fell in July 1864 after a prolonged siege, and Hong Xiuquan died shortly before the city's fall." },
      { q: "Why is the Taiping Rebellion not well known?", a: "The Taiping Rebellion is little known outside China partly because it occurred simultaneously with the American Civil War and European colonial expansion, diverting Western attention. It was also inconvenient for multiple political narratives: too Christian for Communist historiography, too heterodox for traditional Chinese historiography." },
    ],
    tags: ["war", "civil-war", "china", "19th-century"],
    dataReliabilityLevel: "low",
    dataReliabilityNote: "Limited Western documentation; Chinese records from this period are incomplete. Population data from Qing dynasty census records is imprecise. Estimates range enormously (10–30M); the 20M figure is a commonly cited midpoint.",
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
    longDescriptionEn: `On the morning of August 6, 1945, at 8:15 AM local time, the United States Army Air Forces B-29 bomber Enola Gay dropped "Little Boy" — a uranium gun-type atomic bomb with the explosive force of approximately 15 kilotons of TNT — over the center of Hiroshima, Japan. The bomb detonated at 600 meters altitude to maximize the blast radius. Within a second, a fireball with a surface temperature exceeding the sun's reached the ground at speeds of 900 meters per second. Everything within approximately 1.6 kilometers of the hypocenter was instantly destroyed. People close to the explosion were vaporized; those slightly farther away were incinerated or crushed under collapsing buildings; those farther still were killed by the shockwave, the firestorm that followed, or the radiation. Between 70,000 and 80,000 people died on August 6 alone.

Three days later, on August 9, a plutonium implosion bomb called "Fat Man" — more powerful at approximately 21 kilotons — was dropped on Nagasaki. The city's hilly terrain somewhat contained the blast, but 40,000 to 50,000 people died immediately. By the end of 1945, acute deaths from both bombs combined reached approximately 110,000 to 210,000. The broader death toll including radiation-related cancers and long-term health effects over subsequent decades is estimated at 200,000 or higher.

The experience of survivors — the hibakusha ("explosion-affected people") — became some of the most important testimony in human history. Those within 2 kilometers who survived the initial blast faced Acute Radiation Syndrome: hair loss, severe bleeding, immune collapse, and death within days to weeks from radiation exposure equivalent to standing next to an active nuclear reactor with no shielding. Those who survived the acute phase faced elevated cancer rates — particularly leukemia, thyroid cancer, and breast cancer — that persisted for decades. The children of hibakusha feared genetic damage to their offspring, though studies have shown less heritable genetic harm than initially feared.

The bombings achieved their immediate military objective: Japan surrendered on August 15, 1945, formally ending World War II in the Pacific. Emperor Hirohito cited the "new and most cruel bomb" in his surrender announcement. Whether the bombings were necessary to end the war without a land invasion of Japan — which American planners estimated could cost hundreds of thousands of American and millions of Japanese lives — remains one of the most debated questions in modern history. The alternative of a Soviet entry into the Pacific war (which occurred on August 8, 1945, between the two bombings) may also have been decisive.

Hiroshima and Nagasaki remain the only instances in history when nuclear weapons have been used in warfare. Their legacy shaped the entire postwar world: the nuclear deterrence doctrine, the Cold War arms race, the Non-Proliferation Treaty, and humanity's understanding that it now possessed the means to destroy itself. The Doomsday Clock — maintained by atomic scientists since 1947 as a metaphor for global nuclear risk — has stood at 90 seconds to midnight since 2023, the closest to catastrophe it has ever been.`,
    faqs: [
      { q: "How many people died in Hiroshima and Nagasaki?", a: "Immediate deaths from both atomic bombings totaled approximately 110,000–210,000 people. Hiroshima lost 70,000–80,000 on August 6, 1945, and Nagasaki lost 40,000–50,000 on August 9, 1945. Long-term radiation-related deaths bring estimates higher, possibly to 200,000 or more by 1950." },
      { q: "Why did the US drop the atomic bomb on Japan?", a: "The US dropped atomic bombs on Hiroshima and Nagasaki to force Japan's unconditional surrender and avoid a land invasion of Japan, which military planners estimated could cost hundreds of thousands of American lives and millions of Japanese. Japan surrendered on August 15, 1945, six days after Nagasaki." },
      { q: "What was the difference between the Hiroshima and Nagasaki bombs?", a: "Little Boy (Hiroshima) was a uranium gun-type bomb with a yield of approximately 15 kilotons. Fat Man (Nagasaki) was a plutonium implosion bomb with a yield of about 21 kilotons. Despite being more powerful, Fat Man caused fewer immediate deaths because Nagasaki's hilly terrain limited the blast radius." },
      { q: "Are there any survivors of Hiroshima and Nagasaki still alive?", a: "Yes, though their numbers are rapidly declining. As of 2024, the Japanese government recognized approximately 113,000 living hibakusha (atomic bomb survivors), with an average age over 85. Some have given testimony around the world advocating for nuclear disarmament." },
      { q: "Have nuclear weapons been used in war since 1945?", a: "No. Hiroshima and Nagasaki remain the only instances of nuclear weapons use in armed conflict in history. However, approximately 12,500 nuclear warheads remain in the world's arsenals as of 2024, held by nine countries." },
    ],
    tags: ["nuclear", "wwii", "atomic-bomb", "japan", "radiation"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "Extensively documented by US military, Japanese government, and medical researchers. Atomic Bomb Casualty Commission studied survivors for decades. Immediate deaths well-established; long-term radiation deaths remain subject to ongoing research.",
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
    longDescriptionEn: `At 1:23 AM on April 26, 1986, Reactor No. 4 at the Chernobyl Nuclear Power Plant — located near the city of Pripyat in Soviet Ukraine, 130 kilometers north of Kyiv — underwent a catastrophic steam explosion during a safety test. The explosion destroyed the reactor core, blew off the 1,000-ton reactor lid, and ignited a graphite fire that burned for ten days, releasing radioactive material into the atmosphere in quantities the IAEA later estimated at 400 times the radioactivity of the Hiroshima atomic bomb. It remains the worst nuclear power plant accident in history and one of only two events ever classified at the maximum Level 7 on the International Nuclear Event Scale (the other being the 2011 Fukushima disaster in Japan).

The immediate human cost was deceptively small: 31 people died in the acute phase, including 2 from the initial explosion and 28 from Acute Radiation Syndrome among the first responders — firefighters and plant workers who were sent to the scene without adequate knowledge of what they were facing. The true scale of the disaster unfolded slowly. Approximately 350,000 people were permanently evacuated from the 30-kilometer exclusion zone around the plant, including the entire population of the city of Pripyat (approximately 50,000 residents), who were given 36 hours notice and told to bring only essentials. Most never returned.

The long-term death toll is deeply contested and politically charged. The official Soviet and then Ukrainian/Belarussian government position, broadly endorsed by the WHO and IAEA in their 2005 Chernobyl Forum report, estimates approximately 4,000 long-term cancer deaths among the most highly exposed populations (emergency workers and evacuees). Independent researchers and organizations like Greenpeace have challenged this figure, suggesting totals of 60,000 or higher when accounting for the wider European population exposed to fallout. The scientific difficulty is that cancer is common in the general population, and attributing a specific cancer to Chernobyl radiation exposure — as opposed to other causes — is statistically complex. The most solidly established radiation-linked cancer is thyroid cancer in children who drank contaminated milk in the immediate aftermath; approximately 6,000 cases were diagnosed, of which about 15 proved fatal.

The radioactive plume from Chernobyl drifted across most of Europe, depositing cesium-137 and other isotopes over Ukraine, Belarus, Russia, Scandinavia, and Western Europe. Sweden first detected abnormal radiation levels on April 28 — from contaminated Swedish nuclear workers, not from official Soviet communications — which forced the USSR to acknowledge the accident to the outside world. The Soviet government's initial reluctance to inform its own population or neighboring countries about the scale of the disaster became a symbol of totalitarian information suppression and is widely cited as one of the events that accelerated Mikhail Gorbachev's glasnost reforms and, indirectly, the dissolution of the Soviet Union.

The Chernobyl Exclusion Zone — still in place today — has become an involuntary nature reserve where wildlife, freed from human pressure, has flourished despite background radiation levels that would be concerning for permanent human habitation. Brown bears, wolves, lynx, and endangered Przewalski's horses have colonized the abandoned city of Pripyat. Scientists debate whether the wildlife population benefits of human absence outweigh the radiation effects — the consensus is that they do, at least for most species at current radiation levels. The zone has also become a major tourist destination, attracting hundreds of thousands of visitors per year before the Russian invasion of Ukraine in 2022 temporarily closed it.`,
    faqs: [
      { q: "How many people died from Chernobyl?", a: "Immediate deaths from the 1986 explosion and acute radiation syndrome totaled 31. Long-term cancer deaths are estimated at 4,000 by the WHO/IAEA Chernobyl Forum, but independent researchers dispute this, with some estimates exceeding 60,000 when accounting for the broader European population exposed to fallout." },
      { q: "How much radiation did Chernobyl release?", a: "The Chernobyl explosion released approximately 400 times the radioactivity of the Hiroshima atomic bomb, according to IAEA estimates. About 5% of the reactor core was expelled, including radioactive isotopes of iodine, cesium, strontium, and plutonium. The radioactive plume spread across most of Europe." },
      { q: "Is Chernobyl still radioactive today?", a: "Yes. Chernobyl and the surrounding 30km Exclusion Zone remain contaminated with long-lived radioactive isotopes, particularly cesium-137 (half-life 30 years) and strontium-90 (half-life 29 years). The area will not be safe for permanent human habitation for hundreds to thousands of years, depending on location." },
      { q: "What caused the Chernobyl disaster?", a: "The accident was caused by a combination of reactor design flaws (the RBMK reactor had a dangerous positive void coefficient) and human errors during a safety test on April 25–26, 1986. Operators disabled safety systems and ran the reactor at an unstable low power level, triggering an uncontrolled chain reaction and steam explosion." },
      { q: "What happened to the city of Pripyat after Chernobyl?", a: "Pripyat, a purpose-built Soviet city of approximately 50,000 residents adjacent to the plant, was evacuated on April 27, 1986 — 36 hours after the explosion. Residents were told to bring only essentials for a temporary evacuation. They never returned. The city remains abandoned and is now a major tourist site within the Exclusion Zone." },
    ],
    tags: ["nuclear", "accident", "ukraine", "soviet", "radiation"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Immediate deaths well-documented. Long-term cancer mortality is the subject of ongoing scientific debate — WHO estimates 4,000 excess deaths; Greenpeace and TORCH report project higher figures (60,000+). Soviet-era suppression of data complicates early estimates.",
  },

  // ── MODERN WARS ────────────────────────────────────────────────────────────
  {
    id: "korean-war",
    name: "Korean War",
    nameEs: "Guerra de Corea",
    category: "war",
    startYear: 1950,
    endYear: 1953,
    deathsMin: 1_200_000,
    deathsMax: 4_500_000,
    deathsEstimate: 2_500_000,
    color: "#3b82f6",
    glowColor: "rgba(59,130,246,0.5)",
    icon: "Sword",
    originCountry: "North Korea",
    originLat: 39.0,
    originLng: 125.8,
    regions: [
      { lat: 37.5, lng: 127.5, radius: 4, intensity: 0.95, label: "Korean Peninsula" },
      { lat: 40.0, lng: 124.5, radius: 2.5, intensity: 0.6, label: "China–Korea border" },
      { lat: 35.7, lng: 139.7, radius: 1.5, intensity: 0.3, label: "Japan (UN command)" },
    ],
    timeline: [
      { year: 1950, deaths: 500_000, label: "North Korea invades South — June 25" },
      { year: 1951, deaths: 1_200_000, label: "China enters; front stabilizes at 38th parallel" },
      { year: 1952, deaths: 2_000_000 },
      { year: 1953, deaths: 2_500_000, label: "Armistice signed — July 27" },
    ],
    descriptionEn: "The Korean War (1950–1953) pitted US-led UN forces supporting South Korea against North Korea backed by China and the Soviet Union. Fought with brutal intensity across the peninsula, it ended in an armistice — not a peace treaty — leaving Korea divided at the 38th parallel to this day. Often called 'The Forgotten War', it killed an estimated 2–4.5 million people.",
    descriptionEs: "La Guerra de Corea (1950–1953) enfrentó fuerzas de la ONU lideradas por EE.UU. apoyando a Corea del Sur contra Corea del Norte respaldada por China y la URSS. Terminó en un armisticio —no un tratado de paz— dejando Corea dividida en el paralelo 38.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Korean War — often called "The Forgotten War" because it fell between the narrative clarity of World War II and the cultural explosion of Vietnam — was one of the 20th century's most devastating conflicts. In three years, it killed an estimated 2.5 million people, wounded millions more, and left the Korean peninsula divided along essentially the same line where the fighting began.

The war began on June 25, 1950, when North Korean forces, equipped with Soviet-supplied tanks and trained by Soviet advisors, launched a massive invasion across the 38th parallel into South Korea. Within three days they had captured Seoul. The United States, which had demobilized rapidly after WWII and maintained only a small garrison force in Korea, scrambled to respond. President Truman secured a UN Security Council resolution authorizing a military response (the USSR was boycotting the council at the time, preventing a Soviet veto). A multinational UN force, roughly 90% American, was assembled.

The war went through several dramatic reversals. US General Douglas MacArthur's amphibious landing at Inchon in September 1950 was a strategic masterstroke that cut off North Korean supply lines and caused the rapid collapse of the invasion. UN forces swept north toward the Chinese border at the Yalu River. China, alarmed by the approach of hostile forces to its border, entered the war in October 1950 with over 300,000 troops. The shock Chinese offensive drove UN forces back south of Seoul in what became the longest retreat in US military history. After brutal fighting, the front stabilized roughly at the 38th parallel by mid-1951.

The final two years of the war were a grinding stalemate punctuated by fierce battles for hills with no strategic value — names like Heartbreak Ridge and Pork Chop Hill became synonymous with futile sacrifice. Armistice negotiations dragged on for two years, stalled primarily over the repatriation of prisoners of war. The armistice was finally signed on July 27, 1953, creating the Korean Demilitarized Zone (DMZ) — the most heavily fortified border on Earth — which remains in place today.

The human cost was catastrophic. South Korea lost approximately 137,000–415,000 soldiers; North Korea, roughly 215,000–406,000; China, officially 183,000 (US estimates suggest 400,000–500,000). US dead numbered 36,574. Civilian casualties were enormous — an estimated 2–3 million Korean civilians died from combat, bombardment, famine, and disease. US strategic bombing destroyed approximately 75% of North Korea's built environment. The war's legacy shaped the Cold War, demonstrated the credibility of US alliance commitments, and created the frozen conflict that still defines the Korean peninsula today.`,
    faqs: [
      { q: "How many people died in the Korean War?", a: "The Korean War killed an estimated 1.2–4.5 million people total. The consensus figure is approximately 2.5 million, including around 600,000–900,000 Korean military casualties (both sides), 180,000–500,000 Chinese military dead, 36,574 US deaths, and an estimated 2–3 million Korean civilian deaths." },
      { q: "Why is the Korean War called 'The Forgotten War'?", a: "The Korean War earned this label because it occurred between two more culturally prominent conflicts — WWII (1939–1945) and Vietnam (1955–1975) — and received relatively little attention in American media and public memory despite its enormous casualties and strategic importance." },
      { q: "Is the Korean War technically still happening?", a: "Yes. The 1953 armistice was a ceasefire agreement, not a peace treaty. North and South Korea remain technically at war. The Korean Demilitarized Zone (DMZ) created by the armistice is still the most heavily fortified border in the world." },
      { q: "Who won the Korean War?", a: "The Korean War ended in a military stalemate. The armistice of July 1953 restored the pre-war boundary near the 38th parallel, meaning neither side achieved its war aims. North Korea failed to unify the peninsula by force; the US/UN coalition failed to liberate North Korea." },
    ],
    references: [
      { title: "Korean War — History.com", url: "https://www.history.com/topics/korea/korean-war", source: "History" },
      { title: "Korean War — US Department of Defense", url: "https://www.defense.gov/Spotlights/korean-war/", source: "US DoD" },
    ],
    tags: ["cold war", "korea", "usa", "china", "armistice", "forgotten war"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "US and South Korean casualties well-documented. North Korean and Chinese military casualties estimated from intelligence sources. North Korean civilian deaths are particularly uncertain given the closed nature of the regime.",
  },
  {
    id: "vietnam-war",
    name: "Vietnam War",
    nameEs: "Guerra de Vietnam",
    category: "war",
    startYear: 1955,
    endYear: 1975,
    deathsMin: 1_300_000,
    deathsMax: 3_500_000,
    deathsEstimate: 2_000_000,
    color: "#22c55e",
    glowColor: "rgba(34,197,94,0.5)",
    icon: "Sword",
    originCountry: "Vietnam",
    originLat: 16.0,
    originLng: 108.0,
    regions: [
      { lat: 10.8, lng: 106.7, radius: 3.5, intensity: 0.9, label: "South Vietnam (Saigon)" },
      { lat: 21.0, lng: 105.8, radius: 3, intensity: 0.85, label: "North Vietnam (Hanoi)" },
      { lat: 16.5, lng: 107.6, radius: 2.5, intensity: 0.8, label: "DMZ / Central Vietnam" },
      { lat: 11.6, lng: 104.9, radius: 2, intensity: 0.65, label: "Cambodia" },
      { lat: 17.9, lng: 102.6, radius: 1.5, intensity: 0.5, label: "Laos" },
    ],
    timeline: [
      { year: 1955, deaths: 10_000, label: "US military advisors arrive" },
      { year: 1965, deaths: 200_000, label: "US combat troops deployed" },
      { year: 1968, deaths: 600_000, label: "Tet Offensive — turning point" },
      { year: 1973, deaths: 1_600_000, label: "US withdrawal — Paris Accords" },
      { year: 1975, deaths: 2_000_000, label: "Fall of Saigon — April 30" },
    ],
    descriptionEn: "The Vietnam War (1955–1975) was a Cold War proxy conflict pitting communist North Vietnam and the Viet Cong against US-backed South Vietnam. Two decades of fighting, US bombing campaigns across Indochina, and 58,000 American deaths failed to prevent North Vietnam's victory and the unification of the country under communist rule. It killed an estimated 2–3.5 million people.",
    descriptionEs: "La Guerra de Vietnam (1955–1975) fue un conflicto proxy de la Guerra Fría entre Vietnam del Norte comunista y Vietnam del Sur respaldado por EE.UU. Dos décadas de combates terminaron con la victoria del Norte y la reunificación del país bajo el comunismo.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Vietnam War — known in Vietnam as the American War — was the defining military catastrophe of the Cold War era for the United States, a 20-year conflict that consumed 58,220 American lives, killed an estimated 2 million Vietnamese people, and ended in complete US defeat. It reshaped American foreign policy, domestic politics, and culture in ways that are still felt today.

The roots of the conflict lay in the 1954 Geneva Accords, which temporarily divided Vietnam at the 17th parallel after the French colonial power was defeated by the communist Viet Minh at Dien Bien Phu. The accords called for reunification elections in 1956, but the US and South Vietnamese government blocked them, fearing a communist victory. A North Vietnamese-backed insurgency in the South — the National Liberation Front, or Viet Cong — grew steadily through the late 1950s and early 1960s, fighting a guerrilla campaign against the South Vietnamese government.

US involvement escalated dramatically under President Lyndon Johnson following the Gulf of Tonkin Incident in August 1964 — later revealed to have been partly fabricated — which provided congressional authorization for military force. By 1968, over 500,000 US troops were deployed in Vietnam. Despite massive firepower advantages — the US dropped more bombs on Indochina than were dropped by all sides in all of World War II — the guerrilla nature of the conflict made conventional military metrics meaningless. The Viet Cong and North Vietnamese Army fought from tunnels, jungle, and among civilian populations. The strategy of "body count" as a measure of progress created perverse incentives and contributed to atrocities like the 1968 My Lai massacre.

The Tet Offensive of January 1968 was the decisive turning point. The Viet Cong launched simultaneous attacks on over 100 South Vietnamese cities, including a dramatic assault on the US Embassy in Saigon. Though militarily a defeat for the Viet Cong, who suffered enormous casualties, Tet shattered American public confidence in official optimism about the war's progress. Television images of the fighting inside the US Embassy compound undermined the Johnson administration's claim that the war was nearly won. Support for the war collapsed among the American public.

President Nixon pursued "Vietnamization" — training South Vietnamese forces to take over the fighting — while secretly expanding the war into Cambodia and Laos with bombing campaigns intended to destroy North Vietnamese supply routes. The 1973 Paris Peace Accords led to US troop withdrawal but not to peace. North Vietnam resumed large-scale conventional operations in 1975, and South Vietnam collapsed within weeks. Saigon fell on April 30, 1975. The war's full death toll, including Vietnamese civilian deaths from bombing, Agent Orange (a defoliant linked to cancers and birth defects affecting generations), and post-war reprisals, may never be precisely known.`,
    faqs: [
      { q: "How many people died in the Vietnam War?", a: "The Vietnam War killed an estimated 2–3.5 million people total. This includes approximately 1.1 million North Vietnamese Army and Viet Cong fighters, 250,000–300,000 South Vietnamese soldiers, 58,220 US military personnel, and an estimated 627,000–2 million Vietnamese civilians. The total including Laos and Cambodia is significantly higher." },
      { q: "Why did the US lose the Vietnam War?", a: "The US failed to achieve its objectives due to the inherent difficulty of counterinsurgency warfare, North Vietnam's determination and external support (from China and the USSR), declining domestic American support after the Tet Offensive, and strategic miscalculations including overreliance on body counts as a metric of progress." },
      { q: "What was Agent Orange in Vietnam?", a: "Agent Orange was a defoliant herbicide used by the US military to destroy jungle cover and crops used by the Viet Cong. It contained dioxin, a highly toxic compound linked to cancer, neurological damage, and birth defects. It affected an estimated 4 million Vietnamese and has caused generational health problems." },
      { q: "When did the Vietnam War end?", a: "The Vietnam War ended on April 30, 1975 when North Vietnamese forces captured Saigon, the capital of South Vietnam, which became Ho Chi Minh City. The US had withdrawn combat troops in 1973 following the Paris Peace Accords, but fighting continued until the final collapse of the South Vietnamese government." },
    ],
    references: [
      { title: "Vietnam War — National Archives", url: "https://www.archives.gov/research/military/vietnam-war", source: "US Archives" },
      { title: "Vietnam War Casualties — VFW", url: "https://www.vfw.org/", source: "VFW" },
    ],
    tags: ["cold war", "vietnam", "usa", "indochina", "guerrilla", "agent orange"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "US military casualties precisely recorded. South Vietnamese and North Vietnamese military casualties estimated from multiple sources. Civilian deaths in North Vietnam and Laos/Cambodia are the least certain component of the total.",
  },
  {
    id: "rwandan-genocide",
    name: "Rwandan Genocide",
    nameEs: "Genocidio de Ruanda",
    category: "war",
    startYear: 1994,
    endYear: 1994,
    deathsMin: 500_000,
    deathsMax: 800_000,
    deathsEstimate: 800_000,
    color: "#f43f5e",
    glowColor: "rgba(244,63,94,0.5)",
    icon: "Sword",
    originCountry: "Rwanda",
    originLat: -1.9,
    originLng: 29.9,
    regions: [
      { lat: -1.95, lng: 30.06, radius: 2.5, intensity: 1.0, label: "Kigali" },
      { lat: -2.1, lng: 29.7, radius: 3, intensity: 0.9, label: "Rwanda" },
      { lat: -1.5, lng: 29.5, radius: 2, intensity: 0.6, label: "Kibuye / Western Rwanda" },
      { lat: -2.6, lng: 30.5, radius: 1.5, intensity: 0.5, label: "Burundi (refugee)" },
    ],
    timeline: [
      { year: 1994, deaths: 800_000, label: "~800,000 killed in 100 days (Apr–Jul 1994)" },
    ],
    descriptionEn: "In 100 days between April and July 1994, Hutu extremist militias systematically massacred an estimated 800,000 Tutsi and moderate Hutu in Rwanda — roughly 10,000 people per day. It is one of the fastest genocides in history. Despite clear warning signs, the international community and UN failed to intervene, a moral failure that defined post-Cold War international relations.",
    descriptionEs: "En 100 días entre abril y julio de 1994, milicias extremistas hutus masacraron sistemáticamente a unas 800.000 personas tutsis y hutus moderados en Ruanda. La comunidad internacional y la ONU no intervinieron, uno de los mayores fracasos morales de la historia reciente.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `In 100 days between April 6 and mid-July 1994, Hutu extremist militias and government forces systematically killed an estimated 800,000 people in Rwanda — roughly 75% of the Tutsi population. The killing rate of approximately 8,000 people per day exceeded even the industrialized murder of the Nazi Holocaust. It was the fastest genocide in recorded history.

The roots of the genocide lay in the colonial legacy of Belgian rule, which had hardened informal social distinctions between Hutu and Tutsi into legal racial categories, issuing identity cards that would prove lethal. After independence, intermittent waves of anti-Tutsi violence drove hundreds of thousands into exile. The Rwandan Patriotic Front (RPF), a Tutsi rebel army formed from exiles in Uganda, invaded Rwanda in 1990, sparking a civil war. The 1993 Arusha Accords negotiated a ceasefire and power-sharing agreement, but Hutu Power extremists, who controlled the military and state media (particularly Radio Mille Collines, which broadcast Tutsi kill lists), had been planning mass killing for months.

The trigger came on April 6, 1994, when the plane carrying President Juvénal Habyarimana was shot down over Kigali. Within hours — and with a speed and organization that demonstrated prior planning — army units and Interahamwe militia began systematically killing Tutsis and moderate Hutus. Roadblocks were set up across the country. Identity cards determined who lived and who died. Neighbors killed neighbors. Churches and schools where Tutsis sought sanctuary became massacre sites. The radio continued to broadcast calls for killing, referring to Tutsis as "inyenzi" (cockroaches).

The international community's response was a catastrophe of inaction. The UN peacekeeping mission in Rwanda (UNAMIR) had 2,500 troops under Canadian General Roméo Dallaire, who had sent a famous fax to UN headquarters in January 1994 warning of the genocide plans and requesting permission to seize militia weapons. Permission was denied. When the killing began, the US government instructed its officials to avoid using the word "genocide" — which would have triggered legal obligations to act. Belgium, France, and the US evacuated their nationals while leaving Rwandans to die. The Security Council actually voted to reduce UNAMIR's force to just 270 troops.

The genocide ended not through international intervention but when the RPF's military advance captured Kigali on July 4, 1994, causing the genocidal government to flee. The aftermath produced a refugee crisis as up to 2 million Hutus, fearing RPF reprisals, fled to Zaire and other neighboring countries, creating camps that became bases for further regional conflict — seeds of the Second Congo War.`,
    faqs: [
      { q: "How many people died in the Rwandan Genocide?", a: "Approximately 800,000 people were killed during the 1994 Rwandan Genocide, primarily Tutsi and moderate Hutu. The killings took place over approximately 100 days, representing roughly 75% of Rwanda's Tutsi population." },
      { q: "Why did the international community not stop the Rwandan Genocide?", a: "The UN and Western powers failed to intervene due to a combination of political will failures, institutional inertia, and deliberate avoidance of the word 'genocide' (which would have triggered legal intervention obligations). The US in particular feared another Somalia after the 1993 Black Hawk Down incident." },
      { q: "Who carried out the Rwandan Genocide?", a: "The genocide was carried out by Hutu extremist militias (Interahamwe) and Rwandan Armed Forces, organized by the Hutu Power political movement. It was systematic and pre-planned, with kill lists, identity card checkpoints, and incitement through state radio (Radio Mille Collines)." },
      { q: "How did the Rwandan Genocide end?", a: "The genocide ended when the Rwandan Patriotic Front (RPF), a Tutsi rebel army, captured Kigali on July 4, 1994 and drove the genocidal government into exile — not through international intervention. Rwanda has since pursued a policy of ethnic reconciliation and banned the use of Hutu/Tutsi labels in public discourse." },
    ],
    references: [
      { title: "Rwanda Genocide — United Nations", url: "https://www.un.org/en/preventgenocide/rwanda/", source: "UN" },
      { title: "Rwandan Genocide — Human Rights Watch", url: "https://www.hrw.org/reports/1999/rwanda/", source: "HRW" },
    ],
    tags: ["genocide", "africa", "rwanda", "hutu", "tutsi", "un failure", "1994"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "International Criminal Tribunal for Rwanda, Human Rights Watch, and survivor testimony provide strong documentation. The 100-day timeframe and geographic concentration made enumeration possible. Population census data cross-confirms the demographic impact.",
  },
  {
    id: "second-congo-war",
    name: "Second Congo War",
    nameEs: "Segunda Guerra del Congo",
    category: "war",
    startYear: 1998,
    endYear: 2003,
    deathsMin: 2_700_000,
    deathsMax: 5_400_000,
    deathsEstimate: 3_800_000,
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.5)",
    icon: "Sword",
    originCountry: "Democratic Republic of Congo",
    originLat: -2.0,
    originLng: 28.5,
    regions: [
      { lat: -0.5, lng: 29.5, radius: 4, intensity: 0.95, label: "Eastern DRC (North Kivu)" },
      { lat: -4.3, lng: 15.3, radius: 2.5, intensity: 0.5, label: "Kinshasa" },
      { lat: -1.9, lng: 29.9, radius: 2.5, intensity: 0.7, label: "Rwanda" },
      { lat: 1.4, lng: 32.3, radius: 2, intensity: 0.5, label: "Uganda" },
      { lat: -11.7, lng: 27.5, radius: 2, intensity: 0.5, label: "Southern DRC" },
    ],
    timeline: [
      { year: 1998, deaths: 200_000, label: "Rebellion begins — August; 9 nations involved" },
      { year: 2000, deaths: 1_500_000 },
      { year: 2001, deaths: 2_500_000 },
      { year: 2002, deaths: 3_200_000, label: "Pretoria peace accords signed" },
      { year: 2003, deaths: 3_800_000, label: "Transitional government formed" },
    ],
    descriptionEn: "The Second Congo War (1998–2003), known as 'Africa's World War', involved 9 countries and dozens of armed groups fighting over the DRC's vast mineral wealth. With an estimated 3.8 million deaths — mostly from disease and famine caused by war — it is the deadliest conflict since World War II. The eastern DRC has never fully returned to peace.",
    descriptionEs: "La Segunda Guerra del Congo (1998–2003), conocida como 'La Guerra Mundial de África', involucró a 9 países y decenas de grupos armados. Con unos 3,8 millones de muertos —la mayoría por enfermedades y hambre derivadas de la guerra— es el conflicto más mortal desde la Segunda Guerra Mundial.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Second Congo War — often called "Africa's World War" — is the deadliest armed conflict since World War II, yet it remains largely unknown to Western audiences despite killing an estimated 3.8 million people between 1998 and 2003. Nine African nations and dozens of armed militia groups fought across the vast territory of the Democratic Republic of Congo (DRC), with the mineral wealth of eastern Congo — coltan, gold, diamonds, cassiterite — driving much of the conflict's persistence.

The war grew directly from the 1994 Rwandan Genocide. When the RPF ended the genocide and took power in Rwanda, approximately 2 million Hutu refugees fled into eastern Zaire (as the DRC was then known), including tens of thousands of Interahamwe genocide perpetrators. Rwanda and Uganda, wanting to pursue these killers and concerned about the instability on their borders, backed a rebellion by Laurent-Désiré Kabila that overthrew the 32-year kleptocracy of Mobutu Sese Seko in 1997 and renamed the country the Democratic Republic of Congo. However, Kabila quickly turned against his former backers, and in August 1998 Rwanda and Uganda backed a new rebellion against him. What followed drew in Angola, Zimbabwe, Namibia, Chad, Sudan, and various Congolese factions on different sides.

The distinctive and horrifying feature of the Second Congo War is that direct combat deaths represent only a fraction of the total toll. The International Rescue Committee's mortality surveys, published between 2000 and 2007, estimated that the vast majority of deaths — approximately 5.4 million total including the post-formal-war period — resulted from disease and malnutrition among populations displaced by fighting. In eastern Congo, fighting disrupted food production, destroyed health infrastructure, and drove millions of people into the bush where they died from malaria, diarrhea, pneumonia, and malnutrition at rates far above baseline. Entire hospitals were looted and left non-functional. The under-five mortality rate in eastern Congo reached catastrophic levels.

Sexual violence was weaponized systematically by multiple armed groups. Eastern Congo became known internationally for extraordinarily high rates of rape, with the UN calling it "the rape capital of the world." Hundreds of thousands of women and girls were assaulted, with cases continuing long after the formal war ended. The conflict also drove massive exploitation of minerals: mobile phone components depend on coltan mined by armed groups in eastern Congo, creating a direct link between global consumer electronics and the conflict's persistence.

The formal Second Congo War ended with the Pretoria Agreement in 2002 and the formation of a transitional government in 2003. But peace never fully returned to eastern Congo. Armed groups continue to operate in North and South Kivu, and periodic outbreaks of major violence — including the M23 rebellion — have continued killing tens of thousands per year.`,
    faqs: [
      { q: "Why is the Second Congo War called 'Africa's World War'?", a: "The Second Congo War involved nine African nations (Rwanda, Uganda, Angola, Zimbabwe, Namibia, Chad, Sudan, DRC, and later others) and dozens of armed groups, making it a continental-scale conflict similar in multiparty complexity to a world war, even if largely confined geographically." },
      { q: "How many countries were involved in the Second Congo War?", a: "Nine countries participated: the DRC plus Rwanda and Uganda (initially supporting the rebellion), and Angola, Zimbabwe, Namibia, Chad, and Sudan (supporting the Congolese government). Numerous proxy militias further complicated the conflict." },
      { q: "Why did the Second Congo War kill so many people?", a: "The vast majority of deaths — estimated at 80%+ — resulted from disease and malnutrition rather than direct combat. War displaced millions of people, destroyed healthcare infrastructure, and disrupted food production in eastern Congo, causing mass preventable deaths from malaria, diarrhea, and starvation." },
      { q: "Is the Congo War still happening?", a: "The formal Second Congo War ended in 2003, but eastern DRC has never returned to full peace. Armed groups including the M23 (backed by Rwanda) continue to operate, and the region has seen ongoing cycles of violence killing tens of thousands per year. The conflict is sometimes described as never truly ending." },
    ],
    references: [
      { title: "DR Congo — International Rescue Committee mortality surveys", url: "https://www.rescue.org/country/democratic-republic-congo", source: "IRC" },
      { title: "Congo War — Global Witness", url: "https://www.globalwitness.org/en/campaigns/democratic-republic-congo/", source: "Global Witness" },
    ],
    tags: ["africa", "drc", "congo", "rwanda", "minerals", "famine", "africa world war"],
    dataReliabilityLevel: "low",
    dataReliabilityNote: "Most deaths were from disease and famine in inaccessible areas of eastern DRC. The IRC's 2004 mortality survey extrapolated from household surveys. Independent verification is extremely limited. Wide uncertainty range (1–5.4M) reflects genuine data scarcity.",
  },
  {
    id: "syrian-civil-war",
    name: "Syrian Civil War",
    nameEs: "Guerra Civil Siria",
    category: "war",
    startYear: 2011,
    endYear: 2024,
    deathsMin: 300_000,
    deathsMax: 600_000,
    deathsEstimate: 500_000,
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.5)",
    icon: "Sword",
    originCountry: "Syria",
    originLat: 34.8,
    originLng: 38.9,
    regions: [
      { lat: 36.2, lng: 37.2, radius: 3.5, intensity: 0.95, label: "Aleppo" },
      { lat: 33.5, lng: 36.3, radius: 3, intensity: 0.85, label: "Damascus" },
      { lat: 35.9, lng: 39.0, radius: 2.5, intensity: 0.8, label: "Raqqa (ISIS capital)" },
      { lat: 35.3, lng: 40.1, radius: 2, intensity: 0.7, label: "Deir ez-Zor" },
      { lat: 34.9, lng: 35.9, radius: 2, intensity: 0.6, label: "Homs" },
    ],
    timeline: [
      { year: 2011, deaths: 5_000, label: "Arab Spring protests → uprising" },
      { year: 2013, deaths: 100_000 },
      { year: 2014, deaths: 200_000, label: "ISIS declares caliphate" },
      { year: 2016, deaths: 350_000, label: "Battle of Aleppo — decisive Assad victory" },
      { year: 2019, deaths: 450_000, label: "ISIS territorial defeat" },
      { year: 2024, deaths: 500_000, label: "Assad falls; rebels take Damascus — Dec" },
    ],
    descriptionEn: "Beginning as an Arab Spring protest in 2011, Syria's civil war became the defining humanitarian catastrophe of the 2010s — a proxy war involving Russia, Iran, Turkey, the US, and dozens of factions including ISIS. Over 500,000 killed and 13 million displaced by 2024. Assad's government fell in December 2024 when rebel forces captured Damascus.",
    descriptionEs: "Comenzando como una protesta de la Primavera Árabe en 2011, la guerra civil siria se convirtió en la catástrofe humanitaria de la década. Una guerra por delegación que involucró a Rusia, Irán, Turquía y EE.UU. Más de 500.000 muertos y 13 millones de desplazados. El gobierno de Assad cayó en diciembre de 2024.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Syrian Civil War began in March 2011 when peaceful Arab Spring protests against the government of President Bashar al-Assad were met with violent crackdowns that transformed demonstrations into an armed rebellion. What followed was 13 years of devastating multi-sided conflict that killed an estimated 500,000 people, displaced more than 13 million — over half the pre-war population — and produced the largest refugee crisis since World War II. The war drew in virtually every major regional and global power as a proxy battleground, and culminated in the stunning fall of the Assad regime in December 2024.

Assad's family had ruled Syria since 1971 through a combination of Ba'athist ideology, sectarian loyalty networks (the Assad family is Alawite, a Shia-affiliated minority), and brutal repression. When protests inspired by successful uprisings in Tunisia and Egypt erupted in the southern city of Deraa in March 2011, security forces opened fire on demonstrators. Protests spread; defecting soldiers formed the Free Syrian Army; and by mid-2011 the country was in civil war.

The conflict quickly fragmented. Dozens of armed factions emerged with incompatible goals: secular rebels, Islamist groups, Kurdish forces (the YPG/SDF), and most devastatingly the Islamic State (ISIS), which in 2014 declared a caliphate across northeastern Syria and western Iraq and engaged in mass atrocities including beheadings, sexual slavery, and the cultural destruction of ancient sites like Palmyra. The Assad government, backed by Russia (which intervened militarily in 2015) and Iran (which provided ground forces through Hezbollah), used barrel bombs, chemical weapons, and siege starvation tactics against civilian populations. The US, Turkey, Saudi Arabia, and Qatar supported various opposition factions, often working at cross-purposes.

The siege and fall of Aleppo — Syria's largest city — in December 2016 marked a turning point toward Assad's eventual military victory. Russian air power was decisive. By 2019, ISIS had lost its territorial caliphate, and the Assad government controlled most of western Syria. A frozen conflict persisted in the northeast (under US-backed Kurdish control) and northwest (under Turkish influence and Islamist factions). Then, in a stunning reversal, rebel forces launched a rapid offensive in late November 2024. Aleppo fell within days. Damascus fell on December 8, 2024. Assad fled to Russia. A conflict that had seemed frozen ended with an unexpected political transformation — though Syria's future remained deeply uncertain.`,
    faqs: [
      { q: "How many people died in the Syrian Civil War?", a: "Approximately 500,000 people were killed in the Syrian Civil War between 2011 and 2024, according to the Syrian Observatory for Human Rights and UN estimates. The death toll includes Syrian military forces, opposition fighters, ISIS militants, and an estimated 100,000+ civilians." },
      { q: "When did the Syrian Civil War end?", a: "The Syrian Civil War effectively ended in December 2024 when rebel forces rapidly captured Aleppo and Damascus, causing President Bashar al-Assad to flee to Russia. Assad's government, which had ruled Syria since 2000 (and his father since 1971), collapsed after 13 years of civil war." },
      { q: "Did Assad use chemical weapons in Syria?", a: "Yes. Multiple verified uses of chemical weapons — including sarin and chlorine — were attributed to Assad government forces by the UN and Organisation for the Prohibition of Chemical Weapons (OPCW). The most notorious attack killed over 1,400 people in Ghouta in August 2013." },
      { q: "How many Syrian refugees are there?", a: "The Syrian Civil War produced approximately 6.6 million refugees abroad (the largest displaced population in the world as of 2024) and an estimated 6–7 million internally displaced persons. Major host countries include Turkey (3.2M+), Lebanon, Jordan, and Germany." },
    ],
    references: [
      { title: "Syria — UNHCR", url: "https://www.unhcr.org/countries/syria", source: "UNHCR" },
      { title: "Syrian Observatory for Human Rights", url: "https://www.syriahr.com/en/", source: "SOHR" },
    ],
    tags: ["middle east", "syria", "isis", "russia", "proxy war", "refugees", "arab spring", "chemical weapons"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Multiple monitoring organizations (SNHR, SOHR, UN) track casualties, but access restrictions limit verification. The conflict's complexity and fragmentation make comprehensive counting extremely difficult. The 500,000 figure is a commonly cited estimate.",
  },
  {
    id: "ukraine-war",
    name: "Russia–Ukraine War",
    nameEs: "Guerra Rusia–Ucrania",
    category: "war",
    startYear: 2022,
    endYear: null,
    deathsMin: 150_000,
    deathsMax: 500_000,
    deathsEstimate: 300_000,
    color: "#60a5fa",
    glowColor: "rgba(96,165,250,0.5)",
    icon: "Sword",
    originCountry: "Russia",
    originLat: 50.5,
    originLng: 37.0,
    regions: [
      { lat: 48.0, lng: 37.8, radius: 3.5, intensity: 0.95, label: "Donbas (Donetsk/Luhansk)" },
      { lat: 47.1, lng: 37.5, radius: 2.5, intensity: 0.9, label: "Mariupol" },
      { lat: 49.5, lng: 36.2, radius: 2.5, intensity: 0.8, label: "Kharkiv" },
      { lat: 50.4, lng: 30.5, radius: 2, intensity: 0.6, label: "Kyiv (initial assault)" },
      { lat: 46.6, lng: 32.6, radius: 2.5, intensity: 0.8, label: "Kherson / South front" },
      { lat: 46.7, lng: 35.0, radius: 2, intensity: 0.75, label: "Zaporizhzhia" },
    ],
    timeline: [
      { year: 2022, deaths: 100_000, label: "Full-scale invasion — February 24" },
      { year: 2023, deaths: 200_000 },
      { year: 2024, deaths: 280_000 },
      { year: 2025, deaths: 300_000 },
    ],
    descriptionEn: "Russia launched a full-scale invasion of Ukraine on February 24, 2022, the largest land war in Europe since WWII. Fighting has concentrated in eastern Ukraine (Donbas) and the south. Estimated 300,000+ total deaths (military + civilian) by 2026, with both sides suffering catastrophic losses. The conflict has reshaped European security and global energy markets.",
    descriptionEs: "Rusia lanzó una invasión a gran escala de Ucrania el 24 de febrero de 2022, la mayor guerra terrestre en Europa desde la Segunda Guerra Mundial. Se estiman más de 300.000 muertos totales (militares + civiles) hasta 2026.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `On February 24, 2022, Russia launched a full-scale invasion of Ukraine with the stated aims of "denazification" and "demilitarization" — objectives that masked what Ukrainian and Western governments characterized as an attempt to eliminate Ukraine as an independent state. The invasion was the largest military offensive in Europe since World War II and triggered the most significant rearrangement of European security since the Cold War.

Russia had occupied Ukraine's Crimean peninsula since 2014 and had supported armed separatists in the Donbas region (Donetsk and Luhansk oblasts) since the same year. The 2022 invasion was qualitatively different: a multi-axis assault by approximately 190,000 troops aimed at capturing Kyiv and decapitating the Ukrainian government, occupying the south to link Crimea with Russia, and overrunning the east. The initial assault on Kyiv failed within weeks due to fierce Ukrainian resistance, logistical failures, and intelligence miscalculations. Russia withdrew from northern Ukraine in late March 2022 and refocused on the Donbas and south, where fighting settled into grinding attritional warfare resembling, in some respects, the trench warfare of World War I.

The human cost has been enormous and difficult to verify. The UK Ministry of Defense, US intelligence estimates, and independent analysts suggest Russian military deaths between 150,000–200,000, with a comparable number wounded — representing catastrophic losses for what was considered one of the world's foremost military powers. Ukraine's military casualties are less publicly known but estimated in a similar range. UN-verified Ukrainian civilian deaths exceed 12,000 confirmed, though actual figures are likely several times higher. The devastation of cities like Mariupol — which was reduced to rubble after a nearly three-month siege — and Bakhmut have been compared to WWII urban warfare.

The war has had global consequences far beyond the battlefield. It triggered a European energy crisis as countries scrambled to replace Russian gas. It prompted NATO expansion (Finland joined in 2023, Sweden in 2024). It accelerated Western defense spending commitments. It created one of Europe's largest refugee crises since WWII, with over 6 million Ukrainians fleeing abroad and millions more internally displaced. The war has also tested the durability of Western support for Ukraine over a multi-year attritional conflict — a test that continued into 2026 with no clear resolution in sight.`,
    faqs: [
      { q: "How many people have died in the Ukraine war?", a: "Estimates of total deaths in the Russia-Ukraine War vary widely due to limited transparency on both sides. As of 2026, Western estimates suggest Russian military deaths of 150,000–200,000+, Ukrainian military deaths of 50,000–100,000+, and Ukrainian civilian deaths of 12,000+ verified (likely much higher). Total deaths across all categories are estimated at 250,000–400,000." },
      { q: "Why did Russia invade Ukraine in 2022?", a: "Russia cited 'denazification' and 'demilitarization' of Ukraine as stated objectives, along with opposition to NATO expansion toward Russia's borders. Ukraine and Western governments characterize the invasion as an illegal attempt to reabsorb Ukraine into a Russian sphere of influence and eliminate its sovereignty." },
      { q: "Is the Ukraine war still ongoing in 2026?", a: "Yes. As of 2026, fighting continues primarily in eastern Ukraine (Donbas) and along a roughly 1,200km front line. The war has become a grinding attritional conflict with no clear military breakthrough by either side." },
      { q: "What has the Ukraine war done to European security?", a: "The war fundamentally reshared European security. Finland and Sweden joined NATO in 2023–2024, ending decades of neutrality. European defense spending increased dramatically. The EU cut Russian energy imports. The war also revealed significant weaknesses in Russia's conventional military capabilities." },
    ],
    references: [
      { title: "Ukraine conflict — OHCHR", url: "https://www.ohchr.org/en/ukraine", source: "UN Human Rights" },
      { title: "Ukraine war losses — Oryx", url: "https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-equipment.html", source: "Oryx" },
    ],
    tags: ["ukraine", "russia", "europe", "nato", "war 2022", "donbas", "ongoing"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Ukrainian government and UN monitor civilian casualties. Military casualties (especially Russian) are not officially disclosed and are estimated from open-source intelligence. The conflict is ongoing; figures will require significant revision.",
  },

  // ── WARS (HISTORICAL) ──────────────────────────────────────────────────────
  {
    id: "thirty-years-war",
    name: "Thirty Years' War",
    nameEs: "Guerra de los Treinta Años",
    category: "war",
    startYear: 1618,
    endYear: 1648,
    deathsMin: 5_000_000,
    deathsMax: 12_000_000,
    deathsEstimate: 8_000_000,
    color: "#64748B",
    glowColor: "rgba(100,116,139,0.5)",
    icon: "Sword",
    originCountry: "Holy Roman Empire",
    originLat: 50.1,
    originLng: 14.4,
    regions: [
      { lat: 51.2, lng: 10.4, radius: 5, intensity: 1.0, label: "Germany (Holy Roman Empire)" },
      { lat: 49.8, lng: 15.5, radius: 3.5, intensity: 0.8, label: "Bohemia / Moravia" },
      { lat: 48.2, lng: 16.4, radius: 3, intensity: 0.7, label: "Austria" },
      { lat: 46.8, lng: 8.2, radius: 2.5, intensity: 0.5, label: "Swiss Confederation" },
      { lat: 52.4, lng: 4.9, radius: 2.5, intensity: 0.6, label: "Spanish Netherlands" },
    ],
    timeline: [
      { year: 1618, deaths: 0, label: "Defenestration of Prague — war begins" },
      { year: 1625, deaths: 1_000_000, label: "Danish phase — plague & famine ravage Germany" },
      { year: 1631, deaths: 3_000_000, label: "Sack of Magdeburg — 20,000 civilians killed" },
      { year: 1635, deaths: 5_500_000, label: "French intervention escalates conflict" },
      { year: 1648, deaths: 8_000_000, label: "Peace of Westphalia — war ends" },
    ],
    descriptionEn: "The Thirty Years' War (1618–1648) was one of Europe's most devastating conflicts, fought primarily in the Holy Roman Empire (modern Germany). What began as a religious dispute between Catholics and Protestants escalated into a continent-wide power struggle. Germany lost an estimated 25–40% of its population — a demographic catastrophe not surpassed until World War II.",
    descriptionEs: "La Guerra de los Treinta Años (1618–1648) fue uno de los conflictos más devastadores de Europa, principalmente en el Sacro Imperio Romano Germánico. Alemania perdió entre el 25 y el 40% de su población.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Thirty Years' War, fought between 1618 and 1648, stands as one of the most destructive conflicts in European history prior to the World Wars. It began as a religious confrontation between Catholic and Protestant princes within the Holy Roman Empire — triggered on May 23, 1618, when Protestant Bohemian nobles threw two Catholic imperial governors out of a window in Prague (the "Defenestration of Prague"). What started as a localized rebellion quickly drew in every major European power, transforming into a struggle for territorial dominance, religious supremacy, and the future political order of Europe.

The war progressed through four overlapping phases: the Bohemian phase (1618–1625), the Danish phase (1625–1629), the Swedish phase (1630–1635), and the French phase (1635–1648). Each escalation brought new foreign armies into German territory, which became the primary battleground. Imperial forces under Wallenstein, Swedish armies under Gustavus Adolphus, French forces under Condé and Turenne — all traversed and pillaged the same exhausted German territories for three decades.

The human cost was catastrophic, and much of it came not from battle but from the war's secondary effects. Armies of the era lived off the land, systematically looting food, livestock, and grain from civilian populations. When armies moved through a region, they left famine in their wake. This food insecurity triggered epidemic diseases: plague, typhus, and dysentery spread through malnourished populations with lethal efficiency. The Sack of Magdeburg in 1631 — where imperial troops killed roughly 20,000 of the city's 25,000 civilians and burned it to the ground — became the defining atrocity of the conflict.

Demographic estimates for Germany suggest the country lost between 25% and 40% of its total population over the three decades. Some regions were even more severely affected: Württemberg lost 75% of its population; Pomerania lost roughly two-thirds. Entire villages were abandoned. Trade collapsed. Agricultural land went fallow for decades. Germany would not recover its pre-war population levels until the mid-18th century — nearly 100 years later.

The war concluded with the Peace of Westphalia in 1648, a landmark settlement that established the modern concept of national sovereignty and religious tolerance in international relations. The principle that rulers could not intervene in the internal religious affairs of other sovereign states — *cuius regio, eius religio* evolved into genuine toleration — became the foundation of modern international law.`,
    faqs: [
      { q: "How many people died in the Thirty Years' War?", a: "Estimates range from 5 to 12 million deaths, with 8 million being the most common scholarly consensus. The majority died not from combat but from famine and epidemic diseases — plague, typhus, and dysentery — caused by the war's systematic devastation of agricultural regions." },
      { q: "Why was the Thirty Years' War so deadly for Germany?", a: "Germany (the Holy Roman Empire) was the primary battleground for 30 years. Multiple foreign armies — Swedish, French, Spanish, Danish — repeatedly looted the same territories. Famine followed every army's passage; disease followed famine. Some German regions lost over 60–75% of their populations." },
      { q: "What ended the Thirty Years' War?", a: "The Peace of Westphalia in 1648, actually two simultaneous peace treaties signed in Osnabrück and Münster. It established the modern concept of sovereign statehood and became the foundation of international relations. France and Sweden gained territory; German princes gained autonomy from the Holy Roman Emperor." },
      { q: "Was the Thirty Years' War a religious war?", a: "It began as one, but evolved into a complex geopolitical conflict. By the later phases, Catholic France was funding Protestant Sweden against the Catholic Habsburg Empire — power politics consistently overrode religious solidarity. The final settlement guaranteed legal equality between Catholics and Lutherans in the Empire." },
    ],
    references: [
      { title: "The Thirty Years War — C.V. Wedgwood (1938)", url: "https://www.google.com/books/edition/The_Thirty_Years_War/", source: "Academic" },
      { title: "Demographic consequences of the Thirty Years' War — Eugen Weber", url: "https://www.jstor.org", source: "JSTOR" },
    ],
    tags: ["europe", "germany", "holy roman empire", "religious war", "17th century", "famine", "plague"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Pre-statistical era. Estimates based on parish records, tax registers, and regional studies. Ranges vary significantly (5–12M) depending on methodology. The 8M figure represents a scholarly midpoint.",
  },
  {
    id: "napoleonic-wars",
    name: "Napoleonic Wars",
    nameEs: "Guerras Napoleónicas",
    category: "war",
    startYear: 1803,
    endYear: 1815,
    deathsMin: 3_500_000,
    deathsMax: 6_000_000,
    deathsEstimate: 5_000_000,
    color: "#1D4ED8",
    glowColor: "rgba(29,78,216,0.5)",
    icon: "Sword",
    originCountry: "France",
    originLat: 48.8,
    originLng: 2.3,
    regions: [
      { lat: 48.8, lng: 2.3, radius: 3, intensity: 0.7, label: "France" },
      { lat: 51.2, lng: 10.4, radius: 4, intensity: 0.9, label: "German States" },
      { lat: 52.2, lng: 21.0, radius: 4, intensity: 0.95, label: "Russia / Poland" },
      { lat: 40.4, lng: -3.7, radius: 3.5, intensity: 0.8, label: "Iberian Peninsula" },
      { lat: 41.9, lng: 12.5, radius: 3, intensity: 0.6, label: "Italy" },
    ],
    timeline: [
      { year: 1803, deaths: 0, label: "War of the Third Coalition begins" },
      { year: 1807, deaths: 500_000, label: "Height of French Empire dominance" },
      { year: 1812, deaths: 2_500_000, label: "Russian campaign — 400,000 Grande Armée lost" },
      { year: 1813, deaths: 4_000_000, label: "Battle of Leipzig — largest battle before WWI" },
      { year: 1815, deaths: 5_000_000, label: "Waterloo — Napoleon exiled, wars end" },
    ],
    descriptionEn: "The Napoleonic Wars (1803–1815) engulfed virtually all of Europe in a series of conflicts stemming from the French Revolutionary Wars. Napoleon Bonaparte's Grande Armée reshaped the continent's borders, but at a cost of 3.5–6 million lives — military and civilian — including the catastrophic Russian campaign of 1812 in which Napoleon lost over 400,000 men.",
    descriptionEs: "Las Guerras Napoleónicas (1803–1815) envolvieron a casi toda Europa. La campaña rusa de 1812 costó más de 400.000 soldados. El coste total fue de entre 3,5 y 6 millones de vidas.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Napoleonic Wars represent the first truly continental conflict in European history — a series of interlocking wars in which Napoleon Bonaparte's French Empire fought shifting coalitions of nearly every major European power from 1803 to 1815. They emerged directly from the French Revolutionary Wars and Napoleon's ambition to establish French hegemony over the continent.

The conflicts ranged across Europe from the Iberian Peninsula (the brutal Peninsular War, 1808–1814, which Wellington called the "Spanish Ulcer") to Egypt, from Prussia to Russia. Napoleon's military genius produced stunning victories — Austerlitz (1805), Jena (1806), Wagram (1809) — that temporarily gave France dominance over much of Europe. At its peak, the French Empire directly controlled or influenced territories from Spain to Warsaw.

The turning point came in 1812. Napoleon invaded Russia with approximately 600,000 soldiers — the largest army ever assembled to that point. The Russian strategy of retreat and scorched earth, followed by the brutal Russian winter, destroyed the Grande Armée. Only about 100,000 men survived to recross the border. The psychological and material blow was irreversible. By 1813, a revived coalition defeated Napoleon at the Battle of Leipzig (the "Battle of Nations") — the largest battle in history before World War I, involving over 600,000 soldiers. Napoleon was exiled, escaped, raised a new army, and was finally defeated at Waterloo in June 1815.

Military deaths are relatively well-documented for the period; civilian casualties are harder to quantify but were enormous. The Peninsular War in Spain involved systematic guerrilla warfare and French reprisals that killed hundreds of thousands of Spanish civilians — Francisco Goya documented the atrocities in his series "The Disasters of War." Disease, particularly typhus, killed more soldiers than combat throughout the campaigns. The Russian campaign's retreat through winter killed via exposure, starvation, and Cossack raids as much as by battle.

The wars transformed Europe. The Congress of Vienna (1815) redrew the map and established a balance of power that — with interruptions — kept Europe largely at peace for nearly a century. Nationalism, awakened by the wars, would drive 19th-century politics. The Napoleonic legal reforms (Code Napoléon) permanently reshaped civil law across much of Europe and its former colonies.`,
    faqs: [
      { q: "How many died in the Napoleonic Wars?", a: "Estimates range from 3.5 to 6 million total deaths, including both military personnel and civilians. France alone lost approximately 900,000 soldiers; Russia lost a similar number. Disease — particularly typhus — killed more soldiers than combat in most campaigns." },
      { q: "What was Napoleon's greatest military disaster?", a: "The Russian campaign of 1812. Napoleon invaded with roughly 600,000 men; only about 100,000 returned. Causes included Russian scorched-earth tactics, the burning of Moscow, the catastrophic winter retreat, and disease. It effectively broke the Grande Armée and began Napoleon's downfall." },
      { q: "Why did the Napoleonic Wars end?", a: "After the catastrophic Russian campaign, a new coalition of Britain, Austria, Prussia, Russia, and Sweden defeated Napoleon at Leipzig in 1813. He was exiled to Elba, returned for the Hundred Days, and was definitively defeated at Waterloo in June 1815. He was then exiled to Saint Helena, where he died in 1821." },
      { q: "What was the long-term impact of the Napoleonic Wars?", a: "They fundamentally reshaped Europe. The Congress of Vienna created a conservative international order that lasted until WWI. Nationalism, spread by Napoleon's conquests, became the dominant political force of the 19th century. The Code Napoléon reformed civil law across much of Europe and its colonies. The wars also hastened the decline of the old dynastic order." },
    ],
    references: [
      { title: "Napoleon: A Biography — Frank McLynn", url: "https://www.google.com/books/", source: "Academic" },
      { title: "The Napoleonic Wars: A Global History — Alexander Mikaberidze", url: "https://global.oup.com/", source: "Oxford University Press" },
    ],
    tags: ["napoleon", "france", "europe", "russia", "waterloo", "19th century", "coalition"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Military records exist for most major powers but vary in completeness. Civilian deaths and disease mortality are estimated from regional records. Scholarly consensus ranges 3.5–6M.",
  },
  {
    id: "russian-civil-war",
    name: "Russian Civil War",
    nameEs: "Guerra Civil Rusa",
    category: "war",
    startYear: 1917,
    endYear: 1922,
    deathsMin: 5_000_000,
    deathsMax: 9_000_000,
    deathsEstimate: 7_000_000,
    color: "#B91C1C",
    glowColor: "rgba(185,28,28,0.5)",
    icon: "Sword",
    originCountry: "Russia",
    originLat: 55.8,
    originLng: 49.1,
    regions: [
      { lat: 55.75, lng: 37.6, radius: 4, intensity: 0.8, label: "Central Russia / Moscow" },
      { lat: 48.5, lng: 34.9, radius: 4.5, intensity: 0.9, label: "Ukraine (famine zone)" },
      { lat: 51.7, lng: 39.2, radius: 3.5, intensity: 0.8, label: "Volga Region" },
      { lat: 43.1, lng: 44.5, radius: 3, intensity: 0.7, label: "Caucasus" },
      { lat: 56.8, lng: 53.2, radius: 3, intensity: 0.6, label: "Ural / Siberia" },
    ],
    timeline: [
      { year: 1917, deaths: 0, label: "October Revolution — Bolsheviks seize power" },
      { year: 1918, deaths: 1_000_000, label: "Civil war begins; Red Terror launched" },
      { year: 1920, deaths: 4_000_000, label: "Famine and typhus epidemic peak" },
      { year: 1921, deaths: 6_500_000, label: "Volga famine kills 5M+" },
      { year: 1922, deaths: 7_000_000, label: "Soviet victory; USSR established" },
    ],
    descriptionEn: "The Russian Civil War (1917–1922) followed the Bolshevik Revolution and pitted the Red Army against a fragmented coalition of White armies, foreign interventionists, and nationalist movements. The conflict killed an estimated 5–9 million people — mostly through famine and disease rather than combat. The 1921–22 Volga famine alone, caused partly by war disruption, killed 5 million.",
    descriptionEs: "La Guerra Civil Rusa (1917–1922) causó entre 5 y 9 millones de muertos, principalmente por hambre y epidemias. El Ejército Rojo venció a las fuerzas Blancas y a los intervencionistas extranjeros. La hambruna del Volga de 1921–22 mató a 5 millones de personas.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Russian Civil War erupted in the wake of the October 1917 Bolshevik Revolution, when Lenin's forces seized power in Petrograd and began dismantling the provisional government. The ensuing conflict lasted until 1922 and involved not just two sides but a chaotic multiplicity of factions: the Bolshevik Red Army, the counter-revolutionary White Armies (backed by Britain, France, the United States, and Japan), nationalist movements in Ukraine, the Caucasus, and the Baltic states, anarchist forces under Nestor Makhno, and peasant armies responding to forced grain requisition.

The Red Army, reorganized by Leon Trotsky, ultimately prevailed through superior centralization, control of Russia's industrial heartland and railway network, and the ideological cohesion of Bolshevik leadership. The Whites were fatally divided — monarchists, liberals, and nationalists who could agree on little beyond opposing Bolshevism — and were further weakened by the withdrawal of foreign support after 1920. The last major White forces were evacuated from Crimea in November 1920.

The human cost was staggering, but the majority of deaths came not from combat but from the war's secondary catastrophes. The Red Terror and White Terror together killed hundreds of thousands through summary executions and political violence. Epidemic disease — typhus, cholera, and influenza — swept through a population weakened by years of World War I followed by civil war. The Bolshevik policy of "War Communism," which included forced grain requisitions from peasants, destroyed agricultural production. This triggered the catastrophic Volga famine of 1921–22, which killed approximately 5 million people and required a massive international relief effort led by Herbert Hoover's American Relief Administration.

International intervention complicated the conflict further. Allied forces occupied Murmansk, Archangel, Vladivostok, and other strategic points — partly to keep Russia in WWI, partly to strangle Bolshevism. Japanese forces occupied parts of Siberia until 1922. This foreign presence inflamed Russian nationalism and, paradoxically, helped the Bolsheviks portray their struggle as one of national survival against imperialist invasion.

The war's conclusion established the Soviet Union, formally proclaimed in December 1922. But the scars ran deep: a population devastated by seven years of world war and civil war, an economy in ruins, and a political culture shaped by violence, emergency rule, and the suppression of all opposition. These conditions laid the groundwork for Stalin's later consolidation of absolute power.`,
    faqs: [
      { q: "How many people died in the Russian Civil War?", a: "Estimates range from 5 to 9 million deaths, with 7 million being the most cited figure. The majority died not in battle but from the 1921–22 Volga famine (5 million dead), typhus and cholera epidemics, and political violence (Red and White Terrors combined killed hundreds of thousands)." },
      { q: "Who were the main factions in the Russian Civil War?", a: "The primary combatants were the Bolshevik Red Army versus the White Armies (a coalition of monarchists, liberals, and nationalists backed by Britain, France, the US, and Japan). Additional actors included Ukrainian nationalists, anarchists (Makhno's Black Army), various separatist movements, and peasant armies opposing grain requisitions." },
      { q: "Why did the Bolsheviks win?", a: "The Reds had several decisive advantages: control of Russia's industrial heartland and railway network, a centralized military command under Trotsky, ideological cohesion, and the ability to conscript and arm a large force. The Whites were fatally divided among themselves and were geographically separated into different theaters with poor coordination." },
      { q: "What caused the Volga famine of 1921–22?", a: "Multiple overlapping causes: the war had devastated agricultural regions; Bolshevik War Communism policies forced peasants to hand over grain surpluses, destroying incentives to grow food; a severe drought struck the Volga region in 1921. The result was mass starvation killing approximately 5 million people. International aid, particularly from the American Relief Administration, saved millions more." },
    ],
    references: [
      { title: "A People's Tragedy: The Russian Revolution — Orlando Figes", url: "https://www.google.com/books/", source: "Academic" },
      { title: "The Russian Civil War — W. Bruce Lincoln", url: "https://www.simonandschuster.com/", source: "Simon & Schuster" },
    ],
    tags: ["russia", "bolshevik", "revolution", "famine", "typhus", "red army", "white army", "20th century"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Soviet-era records were incomplete and sometimes suppressed. Modern Russian historical research has improved estimates, but the chaos of the period makes precision impossible. The 7M figure is a widely cited scholarly estimate.",
  },
  {
    id: "second-sino-japanese-war",
    name: "Second Sino-Japanese War",
    nameEs: "Segunda Guerra Sino-Japonesa",
    category: "war",
    startYear: 1937,
    endYear: 1945,
    deathsMin: 8_000_000,
    deathsMax: 22_000_000,
    deathsEstimate: 14_000_000,
    color: "#0891B2",
    glowColor: "rgba(8,145,178,0.5)",
    icon: "Sword",
    originCountry: "China",
    originLat: 39.9,
    originLng: 116.4,
    regions: [
      { lat: 32.1, lng: 118.8, radius: 5, intensity: 1.0, label: "Nanking (Massacre)" },
      { lat: 31.2, lng: 121.5, radius: 4.5, intensity: 0.9, label: "Shanghai" },
      { lat: 39.9, lng: 116.4, radius: 4, intensity: 0.85, label: "North China Plain" },
      { lat: 29.6, lng: 106.6, radius: 3.5, intensity: 0.7, label: "Chongqing (wartime capital)" },
      { lat: 23.1, lng: 113.3, radius: 3, intensity: 0.6, label: "Canton / South China" },
    ],
    timeline: [
      { year: 1937, deaths: 500_000, label: "Marco Polo Bridge Incident — full-scale war; Nanjing Massacre" },
      { year: 1939, deaths: 3_000_000, label: "Japanese control most coastal cities; Yellow River flood" },
      { year: 1941, deaths: 7_000_000, label: "War merges with WWII after Pearl Harbor" },
      { year: 1943, deaths: 11_000_000, label: "Henan famine (2–3M dead)" },
      { year: 1945, deaths: 14_000_000, label: "Japan surrenders; war ends August 15" },
    ],
    descriptionEn: "The Second Sino-Japanese War (1937–1945) was the largest Asian war of the 20th century, killing an estimated 8–22 million people — the majority of them Chinese civilians. Japan's invasion involved systematic atrocities including the Nanjing Massacre (300,000+ killed in 6 weeks), biological warfare (Unit 731), mass aerial bombing of cities, and deliberate famine. It merged into WWII in 1941.",
    descriptionEs: "La Segunda Guerra Sino-Japonesa (1937–1945) fue la guerra asiática más grande del siglo XX, con 8–22 millones de muertos, en su mayoría civiles chinos. Incluye la Masacre de Nanjing (300.000+ muertos) y la guerra biológica del Ejército Imperial Japonés.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Second Sino-Japanese War began on July 7, 1937 with the Marco Polo Bridge Incident near Beijing — a minor military skirmish that escalated into full-scale invasion as Japan sought to extend its control over China following its 1931 seizure of Manchuria. What followed was eight years of catastrophic warfare that killed between 8 and 22 million people, making it the deadliest conflict in Asian history and one of the most lethal of the 20th century.

Japan's military strategy combined overwhelming conventional force with deliberate terrorization of civilians. The fall of the Chinese capital Nanjing in December 1937 was followed by the Nanjing Massacre — six weeks of organized killing, rape, and looting in which Japanese soldiers murdered an estimated 200,000 to 300,000 Chinese civilians and prisoners of war. The massacre was documented by foreign witnesses in the city, including Nazi Party member John Rabe, and by subsequent war crimes tribunals. It remains a defining atrocity of modern warfare and a major point of historical contention between China and Japan.

Japan's military conducted biological warfare through Unit 731, a covert research unit that experimented on live prisoners and released plague, cholera, and anthrax agents on Chinese cities. Estimates of deaths from biological attacks range from tens of thousands to hundreds of thousands. The Japanese Air Force conducted sustained bombing of Chongqing and other cities, in campaigns that preceded the German bombing of Guernica and London by months or years.

The war created catastrophic humanitarian conditions across occupied China. The Yellow River flood of 1938 — caused by Nationalist Chinese forces deliberately breaking the Huayuankou dike to slow Japanese advance — inundated thousands of square kilometers, destroying harvests and killing an estimated 500,000 to 900,000 people. The 1942–43 Henan famine, exacerbated by wartime disruption, Japanese grain seizures, and Nationalist mismanagement, killed 2–3 million people. Disease spread through refugee populations fleeing the fighting.

After Pearl Harbor in December 1941, the conflict merged with the broader Pacific War. China received Allied assistance through the Burma Road and "The Hump" air route over the Himalayas. The war ended on August 15, 1945, with Japan's surrender following the atomic bombings of Hiroshima and Nagasaki. China emerged devastated but unified — though the civil war between Nationalists and Communists immediately resumed, leading to another 5 million deaths by 1949.`,
    faqs: [
      { q: "How many people died in the Second Sino-Japanese War?", a: "Estimates range from 8 to 22 million deaths, with 14 million being a commonly cited figure. The wide range reflects the difficulty of counting deaths across eight years of conflict spanning an enormous geographic area, including deaths from combat, the Nanjing Massacre, biological warfare, deliberate flooding, and famine." },
      { q: "What was the Nanjing Massacre?", a: "Following the fall of China's capital Nanjing in December 1937, Japanese soldiers conducted six weeks of mass killing, rape, and looting. Chinese and international estimates put the death toll at 200,000–300,000 civilians and prisoners. It was documented by foreign witnesses and confirmed at the Tokyo War Crimes Tribunal, though exact figures remain disputed between Chinese and Japanese historians." },
      { q: "What was Unit 731?", a: "A covert Japanese biological and chemical warfare research unit that conducted lethal experiments on Chinese, Soviet, Korean, and Allied prisoners. It also weaponized plague, cholera, anthrax, and other pathogens for deployment against Chinese cities. After the war, the US granted immunity to Unit 731 researchers in exchange for their experimental data, meaning none faced prosecution." },
      { q: "How did the Second Sino-Japanese War relate to WWII?", a: "The war began in 1937 — two years before Germany invaded Poland — and merged with WWII following Japan's attack on Pearl Harbor in December 1941. China's resistance tied down over a million Japanese troops throughout the war, significantly constraining Japan's ability to project force elsewhere in the Pacific theater." },
    ],
    references: [
      { title: "The Rape of Nanking — Iris Chang (1997)", url: "https://www.google.com/books/", source: "Academic" },
      { title: "China's War with Japan, 1937–1945 — Rana Mitter", url: "https://www.penguinrandomhouse.com/", source: "Penguin" },
    ],
    tags: ["japan", "china", "asia", "nanjing", "wwii", "unit 731", "biological warfare", "20th century"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Death toll estimates vary enormously (8–22M) due to the geographic scale, duration, and lack of comprehensive records for civilian deaths in occupied territories. The Nanjing Massacre toll specifically is contested between Chinese (300K+) and some Japanese historians (lower estimates). The 14M figure represents a mainstream scholarly estimate.",
  },
  {
    id: "chinese-civil-war",
    name: "Chinese Civil War",
    nameEs: "Guerra Civil China",
    category: "war",
    startYear: 1927,
    endYear: 1949,
    deathsMin: 2_000_000,
    deathsMax: 8_000_000,
    deathsEstimate: 5_000_000,
    color: "#B45309",
    glowColor: "rgba(180,83,9,0.5)",
    icon: "Sword",
    originCountry: "China",
    originLat: 31.2,
    originLng: 121.5,
    regions: [
      { lat: 39.9, lng: 116.4, radius: 5, intensity: 0.9, label: "Manchuria / North China" },
      { lat: 31.2, lng: 121.5, radius: 4, intensity: 0.85, label: "Central China" },
      { lat: 29.6, lng: 106.6, radius: 3.5, intensity: 0.7, label: "Sichuan / Southwest" },
      { lat: 22.3, lng: 114.2, radius: 3, intensity: 0.6, label: "South China" },
    ],
    timeline: [
      { year: 1927, deaths: 0, label: "Shanghai Massacre — KMT turns on CCP; civil war begins" },
      { year: 1934, deaths: 500_000, label: "Long March — CCP forced retreat" },
      { year: 1945, deaths: 1_500_000, label: "Japan surrenders; full civil war resumes" },
      { year: 1948, deaths: 4_000_000, label: "Decisive Huaihai Campaign — PLA defeats KMT" },
      { year: 1949, deaths: 5_000_000, label: "People's Republic proclaimed; KMT retreats to Taiwan" },
    ],
    descriptionEn: "The Chinese Civil War (1927–1949) between the Nationalist Kuomintang (KMT) and the Communist Party (CCP) killed an estimated 2–8 million people across two phases separated by the Second Sino-Japanese War. Mao Zedong's People's Liberation Army ultimately defeated Chiang Kai-shek's forces, establishing the People's Republic of China on October 1, 1949.",
    descriptionEs: "La Guerra Civil China (1927–1949) entre el Kuomintang y el Partido Comunista mató entre 2 y 8 millones de personas. El Ejército de Liberación Popular de Mao Zedong derrotó a Chiang Kai-shek, fundando la República Popular China el 1 de octubre de 1949.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Chinese Civil War unfolded in two phases across more than two decades, punctuated by the Second Sino-Japanese War. Its origins lie in the revolutionary alliance between the Chinese Nationalist Party (Kuomintang/KMT) under Chiang Kai-shek and the Chinese Communist Party (CCP) under Mao Zedong, which collapsed violently in 1927 when Chiang ordered the massacre of Communist organizers and trade unionists in Shanghai and other cities in what became known as the White Terror.

The first phase (1927–1937) saw the KMT's National Revolutionary Army conducting successive "Encirclement Campaigns" against Communist base areas. The CCP, driven from its southern strongholds, undertook the legendary Long March in 1934–35 — a 9,000-kilometer retreat to Yan'an in the northwest that became the founding myth of Chinese Communism. Despite enormous losses (roughly 100,000 marchers set out; fewer than 10,000 arrived), the Long March allowed the CCP to survive and regroup.

The Japanese invasion in 1937 forced a temporary KMT-CCP United Front, but cooperation was limited and both sides preserved their forces for the anticipated post-war confrontation. The Communists in particular used the period to expand their base areas, organize peasants, and build the People's Liberation Army into a formidable force.

When Japan surrendered in August 1945, civil war immediately resumed at full scale. Despite initial American attempts to broker a peace (the Marshall Mission of 1945–46), negotiations collapsed. The military balance shifted decisively after 1947. The KMT held cities and railroads but had alienated the rural population through corruption, inflation, and brutal counterinsurgency. The CCP's land reform policies won massive peasant support. In the decisive Huaihai Campaign of 1948–49, the PLA encircled and destroyed KMT forces numbering over 500,000 men in a 65-day engagement.

On October 1, 1949, Mao Zedong proclaimed the People's Republic of China in Beijing's Tiananmen Square. Chiang Kai-shek and approximately 2 million Nationalist soldiers, officials, and civilians retreated to Taiwan, where the Republic of China government continues to exist today. The Communist victory set the course for the remainder of the 20th century in Asia.`,
    faqs: [
      { q: "How many people died in the Chinese Civil War?", a: "Estimates range from 2 to 8 million deaths across the entire conflict (1927–1949), with 5 million being the most commonly cited figure. Deaths came from combat, political executions (both KMT and CCP conducted mass killings), famine associated with wartime disruption, and disease." },
      { q: "What was the Long March?", a: "A strategic retreat by the Chinese Communist Party in 1934–35, fleeing KMT encirclement campaigns. Approximately 100,000 people began the 9,000-kilometer march to Yan'an in northwestern China; fewer than 10,000 survived. Despite the catastrophic losses, it became the foundational mythology of Chinese Communism and allowed Mao Zedong to consolidate leadership of the CCP." },
      { q: "Why did the Communists win?", a: "Multiple factors: the CCP's land reform policies won enormous peasant support; the KMT government was crippled by hyperinflation and corruption; KMT military commanders were often incompetent or disloyal; the PLA captured massive stocks of Japanese weapons after WWII; and US support for the KMT was insufficient to offset these disadvantages. The Huaihai Campaign of 1948–49 sealed the KMT's defeat." },
      { q: "What happened to the KMT after losing?", a: "Chiang Kai-shek and approximately 2 million soldiers, officials, and civilians retreated to Taiwan in 1949, establishing the Republic of China government there. Backed by the US (especially after the Korean War began in 1950), Taiwan maintained its separate existence. The question of Taiwan's status — officially claimed by both Beijing and Taipei — remains one of Asia's most critical geopolitical tensions." },
    ],
    references: [
      { title: "The Battle for China: Essays on the Military History of the Sino-Japanese War — Mark Peattie et al.", url: "https://www.sup.org/books/", source: "Stanford University Press" },
      { title: "China's Civil War — Diana Lary", url: "https://www.cambridge.org/", source: "Cambridge University Press" },
    ],
    tags: ["china", "mao", "kuomintang", "communist", "long march", "taiwan", "20th century"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Casualty figures are disputed. Chinese government records were politicized during the Maoist era. The wide range (2–8M) reflects genuine scholarly disagreement over the boundary between civil war deaths and deaths from the overlapping Sino-Japanese War period.",
  },
  {
    id: "nigerian-civil-war",
    name: "Nigerian Civil War (Biafra)",
    nameEs: "Guerra Civil de Nigeria (Biafra)",
    category: "war",
    startYear: 1967,
    endYear: 1970,
    deathsMin: 1_000_000,
    deathsMax: 3_000_000,
    deathsEstimate: 2_000_000,
    color: "#16A34A",
    glowColor: "rgba(22,163,74,0.5)",
    icon: "Sword",
    originCountry: "Nigeria",
    originLat: 6.5,
    originLng: 3.4,
    regions: [
      { lat: 5.5, lng: 7.0, radius: 4.5, intensity: 1.0, label: "Biafra (Eastern Nigeria)" },
      { lat: 6.5, lng: 7.5, radius: 3.5, intensity: 0.9, label: "Ibo heartland" },
      { lat: 4.8, lng: 7.0, radius: 3, intensity: 0.85, label: "Port Harcourt area" },
      { lat: 6.3, lng: 6.9, radius: 2.5, intensity: 0.8, label: "Enugu" },
    ],
    timeline: [
      { year: 1967, deaths: 0, label: "Biafra declares independence (May 30)" },
      { year: 1968, deaths: 500_000, label: "Nigerian blockade causes mass famine — children starving on global TV" },
      { year: 1969, deaths: 1_500_000, label: "Famine at peak; 8,000–10,000 deaths/day estimated" },
      { year: 1970, deaths: 2_000_000, label: "Biafra surrenders (January 15)" },
    ],
    descriptionEn: "The Nigerian Civil War (1967–1970) began when the predominantly Igbo eastern region of Nigeria declared independence as the Republic of Biafra. The federal government's military response included a blockade that caused one of the 20th century's most visible famines — images of starving Biafran children shocked the world. An estimated 1–3 million people died, the majority from starvation.",
    descriptionEs: "La Guerra Civil de Nigeria (1967–1970) comenzó cuando la región oriental declaró su independencia como República de Biafra. El bloqueo federal causó una hambruna masiva. Las imágenes de niños biafrianos desnutridos conmocionaron al mundo. Murieron entre 1 y 3 millones de personas, la mayoría de hambre.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Nigerian Civil War emerged from the ethnic and political tensions that followed Nigerian independence from Britain in 1960. Nigeria's colonial borders had lumped together hundreds of ethnic groups, with three dominant ones: the Hausa-Fulani (predominantly Muslim, dominant in the north), the Yoruba (southwest), and the Igbo (southeast). After two military coups in 1966 — the second specifically targeting Igbo officers — and a wave of anti-Igbo pogroms in the north that killed 10,000–30,000 people and displaced over a million, the military governor of the Eastern Region, Odumegwu Ojukwu, declared independence as the Republic of Biafra on May 30, 1967.

The federal government, led by General Yakubu Gowon, declared war to preserve Nigerian unity. What followed was a brutal three-year conflict in which federal forces, backed by the Soviet Union and Britain, gradually encircled and compressed the secessionist territory. Military operations were accompanied by a naval blockade cutting off Biafra from food and medical supplies — a strategic choice that would produce one of the century's defining humanitarian catastrophes.

The famine that resulted from the blockade became the most televised in history to that point. Red Cross and aid organizations documented Igbo children with the distended bellies and orange-tinted hair of kwashiorkor — severe protein deficiency. Photographs and film footage circulated globally, generating massive international pressure for humanitarian access. The Irish charity CONCERN was founded specifically in response to the Biafra crisis; it was also a formative event for Médecins Sans Frontières (MSF), whose founders broke from the Red Cross over the question of whether to speak publicly about atrocities witnessed.

Estimates of total deaths range from 1 to 3 million, with the majority dying from starvation and related disease rather than combat. Airlift operations — flown at night to evade federal aircraft — brought in some food and medicine but were wholly insufficient. Biafra surrendered on January 15, 1970. Despite dire predictions, the post-war period was notable for a relatively conciliatory "No victor, no vanquished" policy by Gowon, and Nigeria avoided the worst post-war reprisals — though full political reconciliation has remained incomplete.`,
    faqs: [
      { q: "How many people died in the Biafran War?", a: "Estimates range from 1 to 3 million deaths, with approximately 2 million being the most cited figure. The crucial fact is that the great majority — perhaps 90% — died from starvation and disease caused by the federal blockade, not from combat. The famine killed approximately 8,000–10,000 people per day at its peak in 1968–69." },
      { q: "Why did Biafra secede?", a: "Following two military coups in 1966 and organized massacres of Igbo people in northern Nigeria (killing 10,000–30,000), the Igbo-dominated Eastern Region felt it had no future within Nigeria. Governor Ojukwu declared independence as Biafra on May 30, 1967, with the backing of most Igbo people who feared genocide if they remained within the federation." },
      { q: "Who supported each side?", a: "The federal Nigerian government was backed by the Soviet Union (weapons) and Britain (political and material support). Biafra received covert support from France (weapons through Côte d'Ivoire and Gabon) and some humanitarian support from international NGOs. The US officially remained neutral but tacitly backed the federal government. Many African states supported Nigeria's territorial integrity." },
      { q: "What was the long-term impact of the Biafra war?", a: "The war shaped modern humanitarian intervention: it catalyzed the founding of Médecins Sans Frontières (MSF) and strengthened Red Cross humanitarian law. Within Nigeria, the war created ethnic tensions that persist today, with periodic calls for Biafran independence. Economically, the discovery of oil in the Niger Delta — in former Biafran territory — has remained a source of conflict and grievance." },
    ],
    references: [
      { title: "There Was a Country — Chinua Achebe (2012)", url: "https://www.penguinrandomhouse.com/", source: "Penguin" },
      { title: "The Biafran War and Postcolonial Humanitarianism — Charlotte Lydia Riley", url: "https://www.cambridge.org/", source: "Cambridge University Press" },
    ],
    tags: ["nigeria", "biafra", "africa", "famine", "igbo", "blockade", "20th century", "humanitarian"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Death toll is heavily debated. The range 1–3M reflects genuine uncertainty; most deaths were from famine with no reliable enumeration. The 2M figure is widely cited but contested. Igbo nationalist sources tend toward higher estimates; Nigerian federal sources lower.",
  },
  {
    id: "war-of-triple-alliance",
    name: "War of the Triple Alliance",
    nameEs: "Guerra de la Triple Alianza",
    category: "war",
    startYear: 1864,
    endYear: 1870,
    deathsMin: 400_000,
    deathsMax: 1_200_000,
    deathsEstimate: 800_000,
    color: "#7C3AED",
    glowColor: "rgba(124,58,237,0.5)",
    icon: "Sword",
    originCountry: "Paraguay",
    originLat: -23.4,
    originLng: -58.4,
    regions: [
      { lat: -23.4, lng: -58.4, radius: 5, intensity: 1.0, label: "Paraguay (catastrophic losses)" },
      { lat: -34.6, lng: -58.4, radius: 3, intensity: 0.5, label: "Argentina" },
      { lat: -30.0, lng: -51.2, radius: 2.5, intensity: 0.4, label: "Brazil" },
      { lat: -34.9, lng: -56.2, radius: 2, intensity: 0.3, label: "Uruguay" },
    ],
    timeline: [
      { year: 1864, deaths: 0, label: "Paraguay invades Brazil (Mato Grosso) and Argentina" },
      { year: 1866, deaths: 150_000, label: "Alliance counterattacks into Paraguay" },
      { year: 1868, deaths: 400_000, label: "Battle of Lomas Valentinas — Paraguayan army destroyed" },
      { year: 1870, deaths: 800_000, label: "Lopez killed; war ends. Paraguay loses 60–70% of population" },
    ],
    descriptionEn: "The War of the Triple Alliance (1864–1870) pitted Paraguay against the combined forces of Brazil, Argentina, and Uruguay. It was the most destructive war in Latin American history. Paraguay under dictator Francisco Solano López lost an estimated 60–70% of its total population — making it proportionally one of the most devastating national catastrophes in modern history.",
    descriptionEs: "La Guerra de la Triple Alianza (1864–1870) enfrentó a Paraguay contra Brasil, Argentina y Uruguay. Paraguay perdió entre el 60 y el 70% de su población total — proporcionalmente, una de las mayores catástrofes nacionales de la historia moderna.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The War of the Triple Alliance stands as the deadliest interstate conflict in Latin American history and one of the most demographically catastrophic wars in recorded history. Its cause lies in the geopolitical ambitions of Paraguayan dictator Francisco Solano López, who in 1864 intervened in a Uruguayan civil war and — when denied passage through Argentine territory — declared war on both Argentina and Brazil, triggering a defensive alliance of the three neighboring nations.

Paraguay in 1864 was an unusual state: an isolated, largely self-sufficient nation that had pursued a developmental model quite unlike the export-oriented economies of its neighbors. Under Francisco Solano López and his father before him, Paraguay had built railways, established industries, and trained a professional army, all largely independent of foreign capital. This relative independence was both the source of López's confidence in going to war and the foundation that allowed Paraguay to sustain the fight far longer than any outside observer predicted.

The war's first phase saw Paraguayan forces invade Mato Grosso (Brazil) and Corrientes province (Argentina) simultaneously. The allied response was slow to organize but overwhelming in eventual size: Brazil alone mobilized a force of over 100,000 men, backed by its ironclad fleet on the Paraná and Paraguay rivers. The Battle of Tuiutí in May 1866 — the largest land battle in South American history — saw the Paraguayan army repulsed with catastrophic losses.

By 1868, the Allied forces had penetrated Paraguayan territory. López, refusing to accept defeat or negotiate, ordered the mobilization of literally every available man — then women, children, and elderly — in a last-ditch defense. Mass graves from this period contain skeletal remains confirming combatants as young as 12 and 13. Disease, particularly cholera, killed more Paraguayan soldiers than enemy fire. The Brazilian navy bombarded Asunción. López continued fighting a guerrilla campaign until he was killed on March 1, 1870, reportedly shouting "I die with my country."

What was left of Paraguay was devastating to behold. Pre-war estimates put the population at approximately 450,000; post-war censuses found perhaps 150,000 survivors, of whom roughly 90% were women, children, and elderly men. Adult males had been virtually annihilated as a demographic group. Brazil occupied Paraguay until 1876. The country did not recover its pre-war population level until well into the 20th century.`,
    faqs: [
      { q: "How many people died in the War of the Triple Alliance?", a: "Estimates range from 400,000 to over 1.2 million deaths, with 800,000 being a commonly cited figure. Paraguay's losses were proportionally catastrophic: the country lost an estimated 60–70% of its total pre-war population of approximately 450,000, including roughly 90% of its adult male population." },
      { q: "Why did Paraguay lose so catastrophically?", a: "Dictator Francisco Solano López refused any peace settlement even as defeat became inevitable, mobilizing women, children, and old men as soldiers in the war's final phases. Disease (especially cholera) killed more than combat. The combined military and industrial power of Brazil, Argentina, and Uruguay was simply overwhelming. López's intransigence turned a military defeat into a national catastrophe." },
      { q: "What caused the War of the Triple Alliance?", a: "Paraguayan dictator Francisco Solano López intervened in a Uruguayan civil war in 1864 and requested passage through Argentine territory to reach Brazil. When Argentina refused, López declared war on both, triggering a defensive alliance. Underlying causes included López's expansionist ambitions, regional geopolitical rivalries, and Brazilian imperial interests in the Rio de la Plata region." },
      { q: "How did Paraguay recover?", a: "Recovery was agonizingly slow. Brazil occupied Paraguay until 1876. The country had to import labor and accept mass immigration to repopulate. Paraguay did not recover its pre-war population until approximately 1950 — 80 years after the war's end. The political instability caused by the war's aftermath contributed to Paraguay's underdevelopment throughout the 19th and early 20th centuries." },
    ],
    references: [
      { title: "The Paraguayan War — Thomas Whigham", url: "https://www.nebraskapress.unl.edu/", source: "University of Nebraska Press" },
      { title: "Genocide in Paraguay — Richard Arens (ed.)", url: "https://www.google.com/books/", source: "Temple University Press" },
    ],
    tags: ["paraguay", "brazil", "argentina", "latin america", "19th century", "demographic catastrophe"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Pre-war Paraguayan population is itself uncertain (estimates range 400K–800K), making percentage loss calculations imprecise. Post-war census data is more reliable. The specific death toll range (400K–1.2M) reflects genuine scholarly debate.",
  },

  // ── GENOCIDES ──────────────────────────────────────────────────────────────
  {
    id: "holocaust",
    name: "The Holocaust",
    nameEs: "El Holocausto",
    category: "genocide",
    startYear: 1941,
    endYear: 1945,
    deathsMin: 9_000_000,
    deathsMax: 11_000_000,
    deathsEstimate: 11_000_000,
    color: "#EC4899",
    glowColor: "rgba(236,72,153,0.5)",
    icon: "Skull",
    originCountry: "Germany",
    originLat: 52.5,
    originLng: 13.4,
    regions: [
      { lat: 50.1, lng: 19.9, radius: 4.5, intensity: 1.0, label: "Auschwitz-Birkenau (Poland)" },
      { lat: 51.2, lng: 23.1, radius: 4, intensity: 0.95, label: "Treblinka / Sobibor / Belzec (Poland)" },
      { lat: 52.5, lng: 13.4, radius: 3, intensity: 0.7, label: "Germany" },
      { lat: 52.2, lng: 20.9, radius: 3.5, intensity: 0.9, label: "Warsaw Ghetto" },
      { lat: 48.5, lng: 34.9, radius: 3.5, intensity: 0.85, label: "Ukraine / Babi Yar" },
    ],
    timeline: [
      { year: 1933, deaths: 0, label: "Nazis come to power — anti-Jewish laws begin" },
      { year: 1938, deaths: 100_000, label: "Kristallnacht; mass deportations begin" },
      { year: 1941, deaths: 500_000, label: "Einsatzgruppen begin mass shootings; death camps planned" },
      { year: 1942, deaths: 4_000_000, label: "Operation Reinhard — Treblinka, Sobibor, Belzec operational" },
      { year: 1944, deaths: 9_500_000, label: "Hungarian Jews deported to Auschwitz (400K+ in 8 weeks)" },
      { year: 1945, deaths: 11_000_000, label: "Liberation of camps; war ends in Europe" },
    ],
    descriptionEn: "The Holocaust was the state-sponsored, systematic murder of six million Jews and five million others (Roma, disabled people, Soviet POWs, homosexuals, political prisoners) by Nazi Germany and its collaborators between 1941 and 1945. It was the most meticulously documented genocide in history, carried out through shooting massacres, gas vans, and six purpose-built extermination camps in occupied Poland.",
    descriptionEs: "El Holocausto fue el asesinato sistemático de seis millones de judíos y cinco millones de otras personas por parte de la Alemania nazi entre 1941 y 1945. Es el genocidio mejor documentado de la historia, llevado a cabo mediante fusilamientos masivos y seis campos de exterminio en Polonia.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Holocaust — known in Hebrew as the Shoah ("catastrophe") — was the systematic, state-organized murder of approximately six million Jews and five million others by the Nazi regime and its collaborators. It stands as the most thoroughly documented genocide in history, unique in that it was not the incidental byproduct of war but a deliberate policy objective pursued with industrial efficiency even when it diverted resources from the military effort.

The path to genocide was incremental. After Adolf Hitler and the Nazi Party came to power in Germany in 1933, a cascade of legal discrimination stripped German Jews of citizenship (Nuremberg Laws, 1935), confined them to ghettos, and made emigration nearly impossible through property confiscation. Kristallnacht (November 1938) — a coordinated nationwide pogrom that destroyed thousands of synagogues and Jewish businesses and killed approximately 100 Jews — marked the transition from legal persecution to mass violence.

The decision to pursue total extermination crystallized with the invasion of the Soviet Union in June 1941. Mobile killing units (Einsatzgruppen) followed the advancing German army, shooting Jewish communities en masse. The largest single massacre was Babi Yar, near Kyiv, where 33,771 Jews were shot in two days (September 29–30, 1941). The Wannsee Conference of January 1942 coordinated the "Final Solution to the Jewish Question" — the bureaucratic euphemism for a program to murder every Jew in Europe.

Six purpose-built extermination camps were constructed in occupied Poland: Auschwitz-Birkenau, Treblinka, Sobibor, Belzec, Chelmno, and Majdanek. Auschwitz alone killed approximately 1.1 million people, overwhelmingly Jews. The camps used Zyklon B gas (Auschwitz) or carbon monoxide (the Operation Reinhard camps) in chambers disguised as shower rooms. Corpses were cremated to destroy evidence. The system killed at its peak rate approximately 6,000 people per day.

Non-Jewish victims included an estimated 220,000–500,000 Roma; 200,000–250,000 disabled persons murdered in the Aktion T4 euthanasia program; 3 million Soviet POWs (deliberately starved in violation of the Geneva Convention); hundreds of thousands of Soviet civilians; 1.8–1.9 million non-Jewish Poles; and tens of thousands of homosexuals and political prisoners. The total non-Jewish death toll thus equals or exceeds Jewish losses.

The Holocaust was liberated piecemeal as Allied forces advanced. Soviet troops reached Auschwitz on January 27, 1945 — now commemorated as International Holocaust Remembrance Day. The Nuremberg Trials (1945–46) established the legal concept of crimes against humanity. The Holocaust directly motivated the 1948 UN Genocide Convention and the Universal Declaration of Human Rights.`,
    faqs: [
      { q: "How many people died in the Holocaust?", a: "Approximately 6 million Jews were murdered — representing about two-thirds of European Jewry. An additional 5 million non-Jews were also systematically killed: Roma (220,000–500,000), disabled persons (200,000+), Soviet POWs (3 million), non-Jewish Poles (1.8M), and others. Total Holocaust victims are estimated at 11 million." },
      { q: "What were the main extermination camps?", a: "Six extermination camps were built in occupied Poland: Auschwitz-Birkenau (1.1M killed), Treblinka (700,000–900,000), Belzec (430,000–500,000), Sobibor (170,000–250,000), Chelmno (150,000–340,000), and Majdanek (60,000–80,000). These are distinct from concentration camps — the extermination camps existed specifically to kill, not to imprison." },
      { q: "When did the Holocaust begin?", a: "Legal persecution began immediately after the Nazis came to power in 1933. Mass murder began with the Einsatzgruppen shootings in the USSR in summer 1941. Systematic death camp operations began in 1942 with Operation Reinhard. The Holocaust is thus both a process (1933–1945) and a specific industrial extermination campaign (1941–1945)." },
      { q: "How was the Holocaust documented?", a: "The Nazis kept meticulous records — transport lists, camp registers, internal memos, photographs, and film. The Nuremberg Trials compiled documentary evidence. Survivor testimonies have been systematically collected (the USC Shoah Foundation alone has recorded 55,000 testimonies). Demographic studies comparing pre- and post-war Jewish population census data provide independent confirmation of the death toll." },
    ],
    references: [
      { title: "The Holocaust: A History — Deborah Dwork & Robert Jan van Pelt", url: "https://www.google.com/books/", source: "Academic" },
      { title: "Yad Vashem — The World Holocaust Remembrance Center", url: "https://www.yadvashem.org/", source: "Yad Vashem" },
      { title: "United States Holocaust Memorial Museum", url: "https://www.ushmm.org/", source: "USHMM" },
    ],
    tags: ["holocaust", "shoah", "nazis", "jewish", "auschwitz", "genocide", "wwii", "germany"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "The Holocaust is the most thoroughly documented genocide in history. Nazi bureaucratic records, survivor testimony, demographic analysis, and post-war tribunal evidence all converge on approximately 6 million Jewish victims. The 11M total including non-Jews is also well-supported by documentary and demographic evidence.",
  },
  {
    id: "cambodian-genocide",
    name: "Cambodian Genocide",
    nameEs: "Genocidio Camboyano",
    category: "genocide",
    startYear: 1975,
    endYear: 1979,
    deathsMin: 1_500_000,
    deathsMax: 2_000_000,
    deathsEstimate: 1_700_000,
    color: "#DC2626",
    glowColor: "rgba(220,38,38,0.5)",
    icon: "Skull",
    originCountry: "Cambodia",
    originLat: 11.6,
    originLng: 104.9,
    regions: [
      { lat: 11.6, lng: 104.9, radius: 4.5, intensity: 1.0, label: "Phnom Penh and surroundings" },
      { lat: 13.4, lng: 103.9, radius: 3.5, intensity: 0.85, label: "Siem Reap / NW Cambodia" },
      { lat: 11.0, lng: 104.2, radius: 3, intensity: 0.8, label: "Kampot / Southwest" },
      { lat: 12.5, lng: 105.0, radius: 3, intensity: 0.75, label: "Eastern Zones" },
    ],
    timeline: [
      { year: 1975, deaths: 0, label: "Khmer Rouge seizes Phnom Penh (April 17) — Year Zero declared" },
      { year: 1975, deaths: 300_000, label: "Forced evacuation of Phnom Penh (2M people, days)" },
      { year: 1977, deaths: 1_000_000, label: "Internal purges accelerate; Eastern Zone massacre" },
      { year: 1978, deaths: 1_500_000, label: "Peak killing; famine in forced labor zones" },
      { year: 1979, deaths: 1_700_000, label: "Vietnam invades; Khmer Rouge driven from power" },
    ],
    descriptionEn: "The Cambodian Genocide (1975–1979) was carried out by the Khmer Rouge under Pol Pot, who sought to create an agrarian utopia by evacuating cities, abolishing money and religion, and eliminating 'enemies' — intellectuals, ethnic minorities, Buddhist monks, and perceived class enemies. Between 1.5 and 2 million people died, representing 25% of Cambodia's entire population.",
    descriptionEs: "El Genocidio Camboyano (1975–1979) fue perpetrado por los Jemeres Rojos bajo Pol Pot. Entre 1,5 y 2 millones de personas murieron, el 25% de la población total de Camboya, en campos de trabajo, ejecuciones y hambrunas deliberadas.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Cambodian Genocide was one of the most extreme episodes of state-organized mass murder in the 20th century. Under the Khmer Rouge (Communist Party of Kampuchea) government of Pol Pot, which ruled Cambodia from April 1975 to January 1979, an estimated 1.5 to 2 million people died — representing approximately 25% of Cambodia's pre-war population of around 7 million.

The Khmer Rouge captured Phnom Penh on April 17, 1975 after a five-year civil war supported by US bombing campaigns (1969–1973) that had killed tens of thousands of Cambodians and destabilized the country. Within days of seizing power, Pol Pot's regime declared "Year Zero" — the starting point of a revolutionary new order that sought to erase all existing social structures and create a purely agrarian communist utopia. The entire urban population of Phnom Penh — approximately 2 million people — was forcibly marched into the countryside within days, on pain of death. Hospitals were emptied; patients on intravenous drips were pushed into the streets.

The new regime abolished money, markets, schools, hospitals, religion, and private property. Wearing glasses or speaking a foreign language could be grounds for execution on suspicion of being an "intellectual." Buddhist monks — approximately 60,000 of them — were defrocked and either executed or forced to labor; the vast majority of Cambodia's temples were destroyed or converted to prisons. Ethnic Chinese, Vietnamese, and Cham Muslims were targeted for elimination. Urban Cambodians were classified as "new people" — unreliable — and subjected to systematic discrimination, forced labor, starvation, and killing.

The killing apparatus centered on a network of prisons and execution sites. The most notorious was S-21 (Tuol Sleng) in Phnom Penh, where an estimated 17,000 people were tortured and executed; only a handful survived. The "killing fields" — Choeung Ek being the most famous — were execution sites where prisoners were brought by truck at night and killed to save bullets (with farming implements, bamboo poles, or sharp palm fronds), then thrown into mass graves. Forensic excavations have uncovered hundreds of mass grave sites across Cambodia.

The regime was brought down in January 1979 when Vietnamese forces — responding to repeated Khmer Rouge border attacks on Vietnam — invaded and captured Phnom Penh in two weeks. Pol Pot and the Khmer Rouge fled to the jungle near the Thai border, where they continued as an insurgency for nearly two decades, inexplicably retaining Cambodia's UN seat until 1982. Pol Pot died in 1998, having never faced international justice. The Extraordinary Chambers in the Courts of Cambodia (ECCC) — a hybrid Cambodian-international tribunal — finally began trials in 2009; senior Khmer Rouge leaders Nuon Chea and Khieu Samphan were convicted of genocide in 2018.`,
    faqs: [
      { q: "How many people died in the Cambodian Genocide?", a: "Between 1.5 and 2 million people, with 1.7 million being the most widely cited estimate. This represents approximately 25% of Cambodia's entire pre-war population. Deaths came from execution, starvation in forced labor camps, disease, and the brutal forced evacuation of cities." },
      { q: "Who were the Khmer Rouge?", a: "A Maoist-inspired communist revolutionary movement led by Pol Pot (Saloth Sar), who had studied in Paris and was influenced by French communist intellectuals. The movement drew its name from the Khmer ethnic majority of Cambodia. After years of insurgency (backed partly by China), they seized power in 1975 and ruled until 1979." },
      { q: "Why did the Khmer Rouge kill so many of their own people?", a: "Pol Pot's ideology sought to create a classless agrarian utopia by eliminating all 'class enemies' — defined to include urban dwellers, intellectuals, professionals, ethnic minorities, and religious practitioners. Internal paranoia also drove constant purges of the party itself; no one was safe. The Eastern Zone massacre of 1977–78, in which the regime killed hundreds of thousands of its own cadres suspected of pro-Vietnamese sympathies, killed more Cambodians than many entire wars." },
      { q: "Was anyone held accountable for the Cambodian Genocide?", a: "Justice came very late. The Extraordinary Chambers in the Courts of Cambodia (ECCC) — established in 2006 — convicted Kaing Guek Eav ('Duch'), the S-21 prison commandant, in 2010. Senior leaders Nuon Chea and Khieu Samphan were convicted of genocide in 2018. Pol Pot himself died in 1998 without facing trial. Many perpetrators lived freely for decades." },
    ],
    references: [
      { title: "When the War Was Over — Elizabeth Becker (1986)", url: "https://www.google.com/books/", source: "Public Affairs" },
      { title: "The Killing Fields — Documentation Center of Cambodia", url: "https://www.d.dccam.org/", source: "DC-Cam" },
      { title: "Extraordinary Chambers in the Courts of Cambodia", url: "https://www.eccc.gov.kh/", source: "ECCC" },
    ],
    tags: ["cambodia", "khmer rouge", "pol pot", "genocide", "killing fields", "year zero", "asia", "20th century"],
    dataReliabilityLevel: "high",
    dataReliabilityNote: "Forensic excavations of mass grave sites, documentation by the Documentation Center of Cambodia (DC-Cam), demographic analysis, and survivor testimony provide strong evidence for the 1.5–2M range. The Cambodian Genocide Documentation Project cross-referenced multiple data sources.",
  },
  {
    id: "atlantic-slave-trade",
    name: "Atlantic Slave Trade",
    nameEs: "Trata Atlántica de Esclavos",
    category: "genocide",
    startYear: 1500,
    endYear: 1900,
    deathsMin: 1_800_000,
    deathsMax: 4_000_000,
    deathsEstimate: 2_000_000,
    color: "#9D174D",
    glowColor: "rgba(157,23,77,0.5)",
    icon: "Skull",
    originCountry: "West Africa",
    originLat: 5.6,
    originLng: -0.2,
    regions: [
      { lat: 6.4, lng: 2.4, radius: 5, intensity: 1.0, label: "West Africa (Slave Coast)" },
      { lat: -8.8, lng: 13.2, radius: 4.5, intensity: 0.9, label: "Central Africa (Angola / Congo)" },
      { lat: 14.7, lng: -17.4, radius: 4, intensity: 0.85, label: "Senegambia / Upper Guinea" },
      { lat: 10.0, lng: -15.0, radius: 3.5, intensity: 0.7, label: "Lower Guinea" },
      { lat: -25.0, lng: -43.2, radius: 3, intensity: 0.5, label: "Brazil (destination)" },
    ],
    timeline: [
      { year: 1500, deaths: 0, label: "Portuguese establish first slave trading posts in West Africa" },
      { year: 1600, deaths: 200_000, label: "Trade accelerates; ~300,000 enslaved people shipped per decade" },
      { year: 1700, deaths: 600_000, label: "Peak of British slave trade; ~60,000 per year crossing Atlantic" },
      { year: 1780, deaths: 1_200_000, label: "All-time peak — ~80,000/year; abolitionist movement begins" },
      { year: 1850, deaths: 1_800_000, label: "Trade officially abolished by most powers but continues illegally" },
      { year: 1900, deaths: 2_000_000, label: "End of transatlantic slave trade" },
    ],
    descriptionEn: "The Atlantic Slave Trade (c.1500–1900) forcibly transported approximately 12.5 million Africans across the Atlantic to the Americas. An estimated 1.8–4 million people died during the Middle Passage alone — the brutal ocean crossing — from disease, violence, and inhumane conditions. This figure does not include the millions killed in African wars and raids specifically conducted to obtain enslaved people for European buyers.",
    descriptionEs: "La Trata Atlántica de Esclavos (c.1500–1900) transportó forzosamente a unos 12,5 millones de africanos a América. Entre 1,8 y 4 millones murieron solo durante el Paso Intermedio (Middle Passage) por enfermedad, violencia y condiciones inhumanas.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Atlantic Slave Trade represents one of the largest forced migrations and sustained atrocities in human history. Between approximately 1500 and 1900, an estimated 12.5 million African men, women, and children were captured, sold, and transported across the Atlantic Ocean to work as enslaved people in the Americas — primarily in Brazil, the Caribbean, and North America. The Trans-Atlantic Slave Trade Database, compiled by scholars over decades, provides the most authoritative quantification.

The death toll presented here reflects only direct mortality during the Middle Passage — the ocean crossing itself. Conditions were deliberately designed for profit, not survival: enslaved people were packed into ship holds with roughly 60 centimeters of space per person, chained in place for weeks or months. Disease — particularly dysentery (the "bloody flux"), smallpox, and scurvy — spread rapidly through the densely packed holds. Mortality rates on individual voyages ranged from a few percent to over 25%. Averaging across the trade's history, approximately 10–15% of those who embarked died before reaching land — producing the 1.8–4 million death range for the Middle Passage alone.

This figure dramatically understates the system's total human cost. Before the Middle Passage came the violent capture and forced march to coastal slave depots (barracoons), during which additional mortality occurred. The wars and raids conducted within Africa specifically to supply European demand for enslaved people — destabilizing entire regions for generations — caused additional deaths that are essentially uncountable. After arrival, the brutality of plantation slavery in the Americas — worked to death, separated from families, forbidden education — caused further mortality beyond normal demographic loss.

The countries most involved in the trade were Portugal/Brazil (responsible for approximately 5 million enslaved people transported), Britain (3.1 million), France (1.4 million), Spain (1.1 million), the Netherlands (500,000), and the United States (400,000). The primary African regions of origin were West-Central Africa (Congo/Angola), the Slave Coast (modern Benin/Nigeria), the Gold Coast (modern Ghana), and Senegambia.

Abolition came gradually. Britain abolished the slave trade in 1807 and slavery throughout its empire in 1833. The United States abolished the trade in 1808 (though slavery persisted until 1865). Brazil — the largest single destination, absorbing roughly 40% of all enslaved people transported — did not abolish slavery until 1888. The trade continued illegally after official abolition by various powers; the Royal Navy's West Africa Squadron intercepted illegal slave ships for decades.

The Atlantic Slave Trade's legacy shaped the demographics, economies, and racial structures of the entire Atlantic world. It directly caused the underdevelopment of West and Central Africa through population loss and political destabilization. The racial hierarchies it created persist in the Americas centuries later.`,
    faqs: [
      { q: "How many people died in the Atlantic Slave Trade?", a: "Approximately 1.8 to 4 million people died during the Middle Passage — the ocean crossing — alone. This represents roughly 10–15% of the 12.5 million people who were transported. The total human cost, including deaths during capture, transport to the coast, and from the conditions of plantation slavery, was substantially higher." },
      { q: "How many people were enslaved in total?", a: "The Trans-Atlantic Slave Trade Database documents approximately 12.5 million enslaved people embarked on slave ships between roughly 1500 and 1900. Of these, approximately 10.7 million survived the Middle Passage to reach the Americas. Brazil received by far the largest number (approximately 40%), followed by the Caribbean colonies of various European powers." },
      { q: "Which countries were most responsible for the slave trade?", a: "Portugal and Brazil were responsible for approximately 5 million enslaved people transported (40% of the total). Britain transported approximately 3.1 million (25%) before abolishing the trade in 1807. France transported 1.4 million, Spain 1.1 million, the Netherlands 500,000, and the United States approximately 400,000." },
      { q: "When was the Atlantic Slave Trade abolished?", a: "Abolition was gradual: Denmark abolished the trade in 1792; Britain in 1807 (and slavery empire-wide in 1833); the US banned the trade in 1808 (slavery ended in 1865); France abolished slavery in its colonies in 1848; Brazil, the largest destination, finally abolished slavery in 1888. Despite official abolition, illegal slave trading continued for decades after, intercepted by naval patrols." },
    ],
    references: [
      { title: "Trans-Atlantic Slave Trade Database (Slave Voyages)", url: "https://www.slavevoyages.org/", source: "SlaveVoyages.org" },
      { title: "The Slave Trade — Hugh Thomas (1997)", url: "https://www.google.com/books/", source: "Simon & Schuster" },
    ],
    tags: ["slavery", "africa", "atlantic", "middle passage", "colonialism", "portugal", "britain", "brazil"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "The Trans-Atlantic Slave Trade Database (slavevoyages.org) provides the most comprehensive data on voyages and passenger numbers. Death toll during the Middle Passage is estimated from voyage records with known mortality rates. Mortality before embarkation in Africa is poorly documented and not included in this figure.",
  },

  // ── FAMINES ────────────────────────────────────────────────────────────────
  {
    id: "great-chinese-famine",
    name: "Great Chinese Famine",
    nameEs: "Gran Hambruna China",
    category: "famine",
    startYear: 1959,
    endYear: 1961,
    deathsMin: 15_000_000,
    deathsMax: 55_000_000,
    deathsEstimate: 30_000_000,
    color: "#F59E0B",
    glowColor: "rgba(245,158,11,0.5)",
    icon: "Flame",
    originCountry: "China",
    originLat: 35.0,
    originLng: 105.0,
    regions: [
      { lat: 33.9, lng: 113.6, radius: 5, intensity: 1.0, label: "Henan (hardest hit)" },
      { lat: 29.6, lng: 106.6, radius: 4.5, intensity: 0.9, label: "Sichuan" },
      { lat: 30.3, lng: 120.2, radius: 4, intensity: 0.8, label: "Anhui" },
      { lat: 26.1, lng: 107.3, radius: 4, intensity: 0.85, label: "Guizhou" },
      { lat: 36.1, lng: 103.8, radius: 3.5, intensity: 0.7, label: "Gansu" },
    ],
    timeline: [
      { year: 1958, deaths: 0, label: "Great Leap Forward launched; collectivization and steel campaign" },
      { year: 1959, deaths: 5_000_000, label: "Famine begins; Mao suppresses reports; grain exports continue" },
      { year: 1960, deaths: 20_000_000, label: "Peak famine; some provinces lose 10–15% of population" },
      { year: 1961, deaths: 30_000_000, label: "Mao adjusts policies; famine begins to ease" },
      { year: 1962, deaths: 30_000_000, label: "Famine declared over; true toll suppressed for decades" },
    ],
    descriptionEn: "The Great Chinese Famine (1959–1961) was the deadliest famine in human history, caused primarily by Mao Zedong's Great Leap Forward — a disastrous attempt to rapidly collectivize agriculture and industrialize China. Estimates range from 15 to 55 million deaths. The Communist Party continued exporting grain even as tens of millions starved, and suppressed all reporting of the catastrophe.",
    descriptionEs: "La Gran Hambruna China (1959–1961) fue la hambruna más mortífera de la historia, causada por el Gran Salto Adelante de Mao Zedong. Murieron entre 15 y 55 millones de personas mientras el Partido Comunista exportaba grano y suprimía toda información.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Great Chinese Famine of 1959–1961 was the deadliest famine in recorded human history and one of the greatest policy-caused disasters of the 20th century. It killed an estimated 15 to 55 million people — the extraordinary range reflecting the difficulty of reconstructing demographic data from a government that actively concealed the catastrophe for decades. The most rigorous scholarly estimates cluster between 30 and 45 million excess deaths.

The famine was not caused by drought or crop failure alone, though poor weather contributed in some regions. It was primarily the result of Mao Zedong's Great Leap Forward — a radical campaign launched in 1958 to transform China from an agrarian society into a communist industrial power in just a few years. The centerpiece was the forced collectivization of agriculture into People's Communes, in which private farming was abolished and agricultural decisions were made by party cadres with no farming knowledge. Simultaneously, the "backyard steel furnace" campaign diverted tens of millions of farmers away from fields to smelt steel — producing low-quality pig iron useless for industry while leaving harvests to rot unharvested.

Local party officials, terrified of being labeled counter-revolutionaries for reporting food shortages, systematically falsified production figures upward. Mao, receiving reports of miraculous harvests, set grain quotas based on fictional numbers — and grain was forcibly extracted from villages at these quotas even when it left nothing for the people who grew it. In some areas, state requisitions took the entire harvest. Peasants caught hiding food or eating crops in the fields were beaten, imprisoned, or killed. While millions starved, China continued exporting grain to the Soviet Union and other countries to maintain political prestige and repay debts.

The geographic distribution of mortality was uneven. Provinces including Anhui, Sichuan, Henan, Guizhou, and Gansu suffered catastrophic losses — some counties lost 20% or more of their population in a single year. Rural areas suffered far more than cities; Communist Party members and urban workers had priority access to food. Entire villages were depopulated. Reports from the period describe people consuming bark, roots, insects, leather, and in documented cases, human flesh.

The famine was not openly acknowledged by the Chinese Communist Party until decades later, and its true scale is still politically sensitive in China today. Scholars like Yang Jisheng (author of "Tombstone") conducted investigations by cross-referencing county-level population data, interviewing survivors, and accessing provincial archives — confirming the macro-scale of the catastrophe even as some specific figures remain disputed.`,
    faqs: [
      { q: "How many people died in the Great Chinese Famine?", a: "Estimates range from 15 to 55 million deaths, with most rigorous scholarly studies clustering between 30 and 45 million excess deaths. The wide range reflects the Chinese government's decades-long suppression of data and the difficulty of reconstructing county-level mortality from incomplete records." },
      { q: "What caused the Great Chinese Famine?", a: "Primarily Mao Zedong's Great Leap Forward policies: forced agricultural collectivization destroyed farming incentives and knowledge; the backyard steel campaign diverted farmers from fields; local officials falsified harvest data upward out of fear; grain was forcibly extracted at impossible quotas; and food was still exported internationally even as millions starved. A poor harvest in some regions worsened but did not cause the famine." },
      { q: "Did the Chinese government know about the famine?", a: "Yes. Reports of starvation reached party leadership from the beginning, but local officials falsified data upward to avoid punishment, and those who reported honestly faced persecution. Peng Dehuai, a senior general who privately told Mao about the famine at the Lushan conference in 1959, was purged. Mao's response to honest reports was often to accuse reporters of 'rightism' and intensify grain requisitions." },
      { q: "Is the Great Chinese Famine acknowledged in China today?", a: "Officially, the Chinese Communist Party acknowledges the famine as a 'mistake' of the Great Leap Forward period, attributing it to policy errors combined with natural disasters. The full death toll and the famine's political causes remain highly sensitive; books like Yang Jisheng's 'Tombstone' are banned in mainland China. Academic discussion is constrained, and official estimates are far lower than scholarly ones." },
    ],
    references: [
      { title: "Tombstone: The Great Chinese Famine — Yang Jisheng (2012)", url: "https://www.google.com/books/", source: "Farrar, Straus and Giroux" },
      { title: "Mao's Great Famine — Frank Dikötter (2010)", url: "https://www.google.com/books/", source: "Walker & Company" },
    ],
    tags: ["china", "mao", "great leap forward", "collectivization", "famine", "communism", "20th century"],
    dataReliabilityLevel: "low",
    dataReliabilityNote: "The Chinese government suppressed famine data for decades and official figures are far lower than scholarly estimates. Research by Yang Jisheng, Frank Dikötter, Judith Banister, and others using provincial archives and demographic modeling yields estimates of 30–45M. The extraordinary range (15–55M) reflects genuine uncertainty due to data suppression.",
  },
  {
    id: "holodomor",
    name: "Holodomor (Soviet Famine 1932–33)",
    nameEs: "Holodomor (Hambruna Soviética 1932–33)",
    category: "famine",
    startYear: 1932,
    endYear: 1933,
    deathsMin: 3_500_000,
    deathsMax: 7_500_000,
    deathsEstimate: 5_000_000,
    color: "#78716C",
    glowColor: "rgba(120,113,108,0.5)",
    icon: "Flame",
    originCountry: "Ukraine",
    originLat: 49.0,
    originLng: 31.5,
    regions: [
      { lat: 49.0, lng: 31.5, radius: 6, intensity: 1.0, label: "Ukraine (entire country)" },
      { lat: 48.5, lng: 35.0, radius: 4, intensity: 0.9, label: "Eastern Ukraine / Donbas" },
      { lat: 50.4, lng: 30.5, radius: 3.5, intensity: 0.8, label: "Kyiv Oblast" },
      { lat: 51.5, lng: 31.3, radius: 3.5, intensity: 0.75, label: "Northern Kazakhstan (also affected)" },
    ],
    timeline: [
      { year: 1932, deaths: 0, label: "Collectivization accelerated; grain quotas imposed on Ukraine" },
      { year: 1932, deaths: 1_000_000, label: "Blacklist decree — entire villages cut off from food supplies" },
      { year: 1933, deaths: 4_000_000, label: "Peak famine: estimated 28,000 deaths per day in January–June 1933" },
      { year: 1933, deaths: 5_000_000, label: "Famine officially ends; USSR denies any famine occurred" },
    ],
    descriptionEn: "The Holodomor ('death by hunger' in Ukrainian) was a man-made famine in Soviet Ukraine in 1932–33 that killed an estimated 3.5–7.5 million Ukrainians. Stalin's regime enforced impossibly high grain quotas, blacklisted villages that couldn't meet them, and sealed Ukrainian borders to prevent the starving population from seeking food elsewhere. 33 countries recognize the Holodomor as genocide.",
    descriptionEs: "El Holodomor ('muerte por hambre') fue una hambruna artificial en Ucrania soviética en 1932–33 que mató entre 3,5 y 7,5 millones de ucranianos. El régimen de Stalin impuso cuotas de grano imposibles y selló las fronteras ucranianas para que la población hambrienta no pudiera buscar alimentos. 33 países reconocen el Holodomor como genocidio.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Holodomor — Ukrainian for "death by hunger" — was a catastrophic famine that swept through Soviet Ukraine in 1932–33, killing an estimated 3.5 to 7.5 million Ukrainians. The word is also used to refer specifically to the deliberate policy measures that caused and sustained the famine — measures that 33 countries have legally recognized as genocide, though this classification remains contested by Russia.

The famine's origins lie in Stalin's forced collectivization drive of 1929–1933, which sought to eliminate independent peasant farmers (kulaks) and replace private agriculture with collective farms (kolkhozy). Ukrainian peasants — who formed one of the Soviet Union's most productive agricultural regions — resisted collectivization with particular determination, slaughtering livestock rather than surrendering them to collectives and hiding grain from requisition brigades. The Soviet regime responded with escalating violence.

In 1932, when grain quotas could not be met from a diminished harvest, the regime's response was to increase pressure rather than provide relief. The "Law of Spikelets" (August 1932) made it a criminal offense punishable by death or ten years' labor camp to take even a handful of grain from collective fields — even for immediate consumption. In November 1932, the "blacklist" policy was introduced: villages that failed to meet quotas were blacklisted, meaning all food items — not just grain but everything, including bread, lard, vegetables, and other foods — were confiscated, and no food could be brought in from outside. Blacklisted villages were, in effect, sealed death zones.

Perhaps most damningly, at the peak of the famine in January–June 1933 — when contemporaneous Soviet internal reports estimated 25,000–28,000 Ukrainians were dying per day — the USSR maintained a military cordon around Ukraine preventing peasants from traveling to cities or other regions to find food, and continued exporting grain internationally. The border restrictions applied specifically and with unique severity to Ukraine, distinguishing the Ukrainian famine from the broader Soviet famine that also affected Kazakhstan and parts of Russia.

The Soviet government denied the famine was happening at all. Foreign journalists in Moscow were pressured to report nothing or to deny eyewitness accounts. Welsh journalist Gareth Jones, who traveled through Ukraine and reported honestly on the mass starvation, was attacked and discredited by Soviet-sympathizing journalists including Walter Duranty of the New York Times, who won a Pulitzer Prize for reports denying the famine. Soviet census data from 1937, which would have shown the demographic catastrophe, was suppressed — and the statisticians who conducted the census were arrested and shot.

The Holodomor was not publicly acknowledged within the Soviet Union until 1990. Ukraine officially recognizes it as genocide; Russia disputes this characterization, arguing it was a tragic but non-intentional famine affecting multiple Soviet nationalities.`,
    faqs: [
      { q: "How many people died in the Holodomor?", a: "Estimates range from 3.5 to 7.5 million deaths in Ukraine alone, with 5 million being a frequently cited figure. A broader Soviet famine in the same period killed additional millions in Kazakhstan (~1.5M) and parts of Russia. The wide range reflects the suppression of Soviet census data and the difficulty of retrospective demographic reconstruction." },
      { q: "Was the Holodomor a genocide?", a: "33 countries, including Ukraine, the United States, Canada, Australia, and most EU members, have officially recognized the Holodomor as genocide. The argument is that specific Soviet policies — the blacklist decree, border restrictions uniquely applied to Ukraine, continued grain exports during peak starvation — were deliberately targeted at Ukrainians as a national group. Russia disputes this, arguing it was a tragic famine without genocidal intent." },
      { q: "How did the Soviet government respond to the famine?", a: "The USSR denied the famine was occurring. It maintained the blacklist and border restrictions at the peak of mass mortality. It suppressed census data that would have revealed population losses. It pressured foreign journalists to report nothing. Grain continued to be exported. Soviet officials who reported honestly to Moscow about starvation faced punishment for 'defeatism'." },
      { q: "Who was Gareth Jones and why does he matter?", a: "Gareth Jones was a Welsh journalist who traveled through Ukraine in March 1933 and published honest eyewitness reports of mass starvation. He was vigorously attacked by Walter Duranty (NYT Moscow bureau chief), who denied the famine. Jones was vindicated posthumously; Duranty's Pulitzer Prize has been repeatedly called for rescission (it has not been revoked). Jones's story was the basis for the 2019 film 'Mr. Jones'." },
    ],
    references: [
      { title: "Red Famine: Stalin's War on Ukraine — Anne Applebaum (2017)", url: "https://www.google.com/books/", source: "Doubleday" },
      { title: "The Ukrainian Famine of 1932–1933 — Robert Conquest", url: "https://www.google.com/books/", source: "Academic" },
      { title: "Holodomor Research and Education Consortium", url: "https://www.holodomor.ca/", source: "HREC" },
    ],
    tags: ["ukraine", "ussr", "stalin", "collectivization", "holodomor", "genocide", "famine", "1930s"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Soviet census data for the period was suppressed; the 1937 census was destroyed and its compilers shot. Modern demographic reconstruction using retrospective methods yields estimates of 3.5–7.5M for Ukraine. The wide range reflects genuine scholarly debate. Ukrainian government and diaspora sources tend toward higher estimates; Russian sources lower.",
  },
  {
    id: "bengal-famine-1943",
    name: "Bengal Famine 1943",
    nameEs: "Hambruna de Bengala 1943",
    category: "famine",
    startYear: 1943,
    endYear: 1944,
    deathsMin: 2_000_000,
    deathsMax: 3_000_000,
    deathsEstimate: 2_500_000,
    color: "#92400E",
    glowColor: "rgba(146,64,14,0.5)",
    icon: "Flame",
    originCountry: "India (British Bengal)",
    originLat: 22.6,
    originLng: 88.4,
    regions: [
      { lat: 22.6, lng: 88.4, radius: 5, intensity: 1.0, label: "Bengal (Calcutta & rural)" },
      { lat: 23.7, lng: 90.4, radius: 4, intensity: 0.9, label: "East Bengal (now Bangladesh)" },
      { lat: 22.3, lng: 87.3, radius: 3.5, intensity: 0.8, label: "Rural West Bengal" },
      { lat: 24.9, lng: 91.9, radius: 3, intensity: 0.7, label: "Sylhet / Assam border" },
    ],
    timeline: [
      { year: 1942, deaths: 0, label: "Cyclone + Japanese invasion of Burma cuts off rice imports" },
      { year: 1943, deaths: 500_000, label: "Food prices triple; rural famine spreads to cities" },
      { year: 1943, deaths: 2_000_000, label: "Peak mortality: bodies in Calcutta streets; cholera outbreaks" },
      { year: 1944, deaths: 2_500_000, label: "Famine recedes; total death count compiled" },
    ],
    descriptionEn: "The Bengal Famine of 1943 killed an estimated 2–3 million people in British India (modern West Bengal and Bangladesh). A combination of wartime disruption, rice crop failure, British colonial export policies, and Winston Churchill's refusal to authorize emergency food imports — despite urgent requests from Indian and British officials — turned a food shortage into a catastrophic famine. Amartya Sen's foundational famine research began with this event.",
    descriptionEs: "La Hambruna de Bengala de 1943 mató a entre 2 y 3 millones de personas en la India Británica. La combinación de perturbaciones bélicas, malas cosechas y la negativa de Churchill a autorizar importaciones de alimentos de emergencia convirtió una escasez en una catástrofe.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Bengal Famine of 1943 killed an estimated 2 to 3 million people in the Bengal Presidency of British India (encompassing modern West Bengal in India and Bangladesh). It stands as a defining example of famine economics — specifically, of how food shortages caused by policy failure and political indifference kill millions even when food exists elsewhere.

The famine's immediate triggers included a cyclone in October 1942 that destroyed Bengal's rice crop; the Japanese invasion of Burma in 1942 that cut off Bengal's primary rice import supply; and a fungal disease (Helminthosporium oryzae) that damaged the 1942 crop further. These factors produced a genuine food supply shortfall of roughly 10% — insufficient in isolation to cause mass death.

What transformed scarcity into catastrophe was policy. British wartime policy included "denial policies" — the deliberate destruction of boats, rice, and transport infrastructure in coastal Bengal to deny resources to potential Japanese invaders. This simultaneously destroyed the livelihoods of fishing communities and disrupted food distribution. The British Indian government exported rice from Bengal to other war zones even as prices in Bengal tripled. Speculation and hoarding by merchants, enabled by rapid wartime inflation, further concentrated food access among those who could pay.

Most critically, Churchill and the War Cabinet in London repeatedly refused to authorize emergency food shipments to India, despite urgent requests from Viceroy Wavell, Bengal's Lieutenant Governor, and members of Churchill's own cabinet. Churchill's documented statements expressing contempt for Indians ("a beastly people with a beastly religion") have led historians including Madhusree Mukerjee to argue that the famine's political dimension amounted to deliberate neglect. The British government denied the existence of famine publicly for months while people starved on Calcutta's streets — their bodies collected daily by municipal workers.

Amartya Sen's foundational work on famine economics — which won him the Nobel Prize in Economics — began with this event. Sen demonstrated that the Bengal Famine occurred not because food was unavailable in India but because the poor lacked "entitlements" to access it: their purchasing power collapsed relative to food prices, while those with money or political connections ate adequately. This "entitlement approach" transformed how economists understand famine causation.`,
    faqs: [
      { q: "How many people died in the 1943 Bengal Famine?", a: "Estimates range from 2 to 3 million deaths, with 2.5 million being the most commonly cited figure. The Indian government's post-independence Famine Inquiry Commission (1945) estimated approximately 1.5 million, which is widely considered an undercount. Demographic reconstruction studies suggest 2–3 million excess deaths." },
      { q: "What caused the Bengal Famine?", a: "Multiple intersecting causes: a cyclone and fungal disease damaged the 1942 rice crop; the Japanese invasion of Burma cut off Bengal's rice import source; British 'denial policies' destroyed coastal boats and food to prevent Japanese use; rice continued to be exported from Bengal during the famine; wartime inflation destroyed poor people's purchasing power; and Churchill's War Cabinet refused emergency food imports despite urgent requests." },
      { q: "What role did Churchill play in the Bengal Famine?", a: "Churchill's War Cabinet repeatedly refused to authorize emergency food shipments to India, even after Viceroy Wavell made urgent requests and other cabinet members supported intervention. Churchill's documented comments expressing hostility toward Indians — blaming them for 'breeding like rabbits' — have led some historians to characterize British policy as deliberate neglect. The debate over Churchill's moral responsibility for the famine remains live among historians." },
      { q: "What did Amartya Sen learn from the Bengal Famine?", a: "Sen, who was a child in Bengal during the famine, later demonstrated that the famine occurred not from absolute food shortage but from collapse of 'entitlements' — poor people's ability to acquire food. Food was available in Bengal and India; the rural poor simply lacked the purchasing power to buy it as prices tripled. This insight — that famines are political and economic failures, not just natural disasters — became the foundation of modern famine economics and contributed to Sen's 1998 Nobel Prize." },
    ],
    references: [
      { title: "Poverty and Famines — Amartya Sen (1981)", url: "https://global.oup.com/", source: "Oxford University Press" },
      { title: "Churchill's Secret War — Madhusree Mukerjee (2010)", url: "https://www.google.com/books/", source: "Basic Books" },
      { title: "The Bengal Famine — Madhusree Mukerjee", url: "https://www.jstor.org/", source: "Economic and Political Weekly" },
    ],
    tags: ["india", "bengal", "british empire", "wwii", "churchill", "colonialism", "famine", "1940s"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "The 1945 Famine Inquiry Commission estimated 1.5M — widely considered an undercount. Modern demographic reconstruction studies yield 2–3M. British wartime records are partially available in UK National Archives; Indian provincial records are incomplete. The 2.5M figure represents current scholarly consensus.",
  },

  {
    id: "gaza-war",
    name: "Israel–Gaza War",
    nameEs: "Guerra Israel–Gaza",
    category: "genocide",
    startYear: 2023,
    endYear: null,
    deathsMin: 50_000,
    deathsMax: 250_000,
    deathsEstimate: 65_000,
    color: "#d97706",
    glowColor: "rgba(217,119,6,0.5)",
    icon: "Sword",
    originCountry: "Palestine",
    originLat: 31.5,
    originLng: 34.5,
    regions: [
      { lat: 31.35, lng: 34.35, radius: 2.5, intensity: 1.0, label: "Gaza Strip" },
      { lat: 31.5, lng: 34.45, radius: 1.5, intensity: 0.6, label: "Gaza City / North Gaza" },
      { lat: 31.26, lng: 34.27, radius: 1.5, intensity: 0.8, label: "Khan Younis / Rafah" },
      { lat: 31.9, lng: 35.2, radius: 1.5, intensity: 0.5, label: "West Bank" },
    ],
    timeline: [
      { year: 2023, deaths: 22_000, label: "Hamas attack Oct 7 (~1,200 killed); IDF ground offensive begins" },
      { year: 2024, deaths: 50_000 },
      { year: 2025, deaths: 60_000 },
      { year: 2026, deaths: 65_000 },
    ],
    descriptionEn: "The Israel–Gaza War began on October 7, 2023 when Hamas launched the deadliest attack on Jews since the Holocaust, killing ~1,200 Israelis. Israel's military response has killed 65,000+ Gazans (Gaza MoH, 2026) in one of the most intense urban bombing campaigns of the 21st century. The Lancet estimated 186,000+ excess deaths including indirect causes by mid-2024.",
    descriptionEs: "La Guerra Israel–Gaza comenzó el 7 de octubre de 2023 con el ataque de Hamás, el más mortal para judíos desde el Holocausto (~1.200 muertos). La respuesta militar israelí ha matado a más de 65.000 gazatíes (MS Gaza, 2026) en una de las campañas de bombardeo urbano más intensas del siglo XXI.",
    symptomsEn: [],
    symptomsEs: [],
    longDescriptionEn: `The Israel–Gaza War began at 6:29 AM on October 7, 2023, when Hamas — the Islamist militant group that has governed the Gaza Strip since 2007 — launched a massive, coordinated assault on southern Israel, breaching the heavily fortified border fence at multiple points. Approximately 3,000 fighters infiltrated Israeli territory, killing around 1,200 people (mostly civilians) in kibbutzim, a music festival (the Nova festival massacre, where ~360 were killed), and military bases. Some 250 hostages were taken back to Gaza. It was the deadliest attack on Jews since the Holocaust.

Israel declared war within hours. The Israeli Defense Forces (IDF) launched an air campaign of unprecedented intensity against Gaza — a densely populated territory of approximately 2.3 million people, 365 square kilometers, with no ability to flee to a safe country. Within the first weeks, Israel dropped more bombs on Gaza than the US dropped on Afghanistan in the entire first year after 9/11. Over the following months, major population centers including Gaza City, Jabalia, Khan Younis, and Rafah were systematically bombarded and subjected to ground invasion.

The humanitarian consequences have been catastrophic. The Gaza Ministry of Health documented over 65,000 deaths through 2026, with the UN noting that the ministry's figures have historically been reliable and cross-checked against hospital and civil registration records. The Lancet, in a letter published in July 2024, estimated that when accounting for indirect deaths — from lack of medical care for chronic conditions, malnutrition, dehydration, and disease outbreaks caused by the destruction of water and sanitation infrastructure — excess deaths through June 2024 alone could exceed 186,000. UNRWA reported that virtually the entire population of Gaza (2.3 million) has been displaced at least once; over 70% of housing has been damaged or destroyed.

The war has generated intense international legal scrutiny. South Africa filed a genocide case against Israel at the International Court of Justice in January 2024; the ICJ issued provisional measures ordering Israel to prevent acts of genocide and allow humanitarian aid. The International Criminal Court's chief prosecutor sought arrest warrants for both Israeli Prime Minister Netanyahu and Hamas leaders. The conflict has deepened existing divisions in the UN Security Council, where the US has repeatedly used its veto to block resolutions calling for ceasefire. The death toll, the scale of destruction, and the legal proceedings have made the Israel-Gaza War one of the most intensely debated conflicts in modern international law.`,
    faqs: [
      { q: "How many people have died in the Gaza war?", a: "As of 2026, the Gaza Ministry of Health has documented over 65,000 deaths in Gaza since October 7, 2023. The Lancet estimated 186,000+ excess deaths through June 2024 when including indirect deaths from collapsed healthcare, malnutrition, and disease. Israeli deaths from the October 7 attack were approximately 1,200." },
      { q: "What started the Israel–Gaza War?", a: "The war began on October 7, 2023 when Hamas launched a large-scale assault on southern Israel, killing approximately 1,200 people — mostly civilians — at kibbutzim and the Nova music festival, and taking ~250 hostages. Israel declared war and launched an extensive military campaign in response." },
      { q: "Is there a genocide case against Israel?", a: "Yes. South Africa filed a case against Israel at the International Court of Justice in January 2024 alleging violations of the Genocide Convention. The ICJ issued provisional measures ordering Israel to prevent acts of genocide and ensure humanitarian aid access. The case remains ongoing, with other countries joining the proceedings." },
      { q: "How much of Gaza has been destroyed?", a: "As of 2026, satellite analysis and UN assessments suggest that over 70% of buildings in Gaza have been damaged or destroyed. The majority of hospitals have been put out of service, the water and sanitation infrastructure has been severely damaged, and virtually the entire 2.3 million population has been displaced at least once." },
    ],
    references: [
      { title: "Gaza Health Ministry reports", url: "https://www.moh.gov.ps/en/", source: "Gaza MoH" },
      { title: "ICJ — South Africa v. Israel", url: "https://www.icj-cij.org/case/192", source: "ICJ" },
    ],
    tags: ["middle east", "israel", "gaza", "hamas", "palestine", "icj", "ongoing", "2023"],
    dataReliabilityLevel: "moderate",
    dataReliabilityNote: "Gaza Ministry of Health figures are the primary source; the UN has assessed these as reliable based on historical cross-checking. Some governments dispute the methodology. Indirect deaths (collapsed healthcare, malnutrition) are harder to quantify but documented by The Lancet and UN agencies.",
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
