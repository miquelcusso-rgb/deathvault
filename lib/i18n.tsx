"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "es";

const translations = {
  en: {
    // Nav
    nav_home: "Map",
    nav_events: "Events",
    nav_news: "News",
    nav_pathogens: "Pathogens",
    nav_compare: "Compare",
    nav_statistics: "Statistics",
    nav_about: "About",
    nav_support: "Support",
    // Hero
    hero_title: "PlagueAtlas",
    hero_subtitle: "Visualize the deadliest pandemics, wars, and nuclear events in human history.",
    hero_deaths: "Total deaths tracked",
    hero_events: "Historical events",
    // Map
    map_title: "Interactive World Map",
    map_3d: "3D Globe",
    map_flat: "Flat Map",
    map_select_event: "Select an event to visualize its spread",
    map_deaths_label: "Deaths",
    map_infected_label: "Infected",
    map_period_label: "Period",
    map_origin_label: "Origin",
    // Selector
    selector_all: "All Events",
    selector_pandemics: "Pandemics",
    selector_wars: "Wars",
    selector_nuclear: "Nuclear",
    selector_famines: "Famines",
    selector_genocides: "Genocides",
    selector_search: "Search events...",
    // Counter
    counter_estimated: "Est. deaths",
    counter_range: "Range",
    counter_infected: "Infected",
    // Compare
    compare_title: "Compare Events",
    compare_subtitle: "Select two or more events to compare their impact",
    compare_select_a: "Select Event A",
    compare_select_b: "Select Event B",
    compare_deaths: "Death Toll",
    compare_duration: "Duration (years)",
    compare_infected: "Infected",
    compare_period: "Time Period",
    // Statistics
    stats_title: "Global Statistics",
    stats_subtitle: "Data-driven insights into humanity's greatest catastrophes",
    stats_by_category: "Deaths by Category",
    stats_timeline: "Historical Timeline",
    stats_top_10: "Top 10 Deadliest Events",
    stats_top_10_subtitle: "Ranked by estimated death toll",
    // Pages
    about_title: "About PlagueAtlas",
    privacy_title: "Privacy Policy",
    terms_title: "Terms of Service",
    support_title: "Support the Project",
    support_subtitle: "Help keep this educational resource free and up to date",
    support_donate: "Donate via Stripe",
    support_why: "Why support?",
    support_why_text: "An independent, non-commercial educational project. Your support helps cover server costs and ongoing data research.",
    // Footer
    footer_description: "An educational data visualization project tracking humanity's greatest health crises and conflicts.",
    footer_legal: "Legal",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_about: "About",
    footer_support: "Support Us",
    footer_disclaimer: "Data sourced from WHO, CDC, and peer-reviewed academic sources. Death toll estimates may vary across sources.",
    footer_rights: "All rights reserved.",
    // General
    read_more: "Read more",
    view_on_map: "View on map",
    sources: "Sources & References",
    symptoms: "Symptoms",
    pathogen: "Pathogen",
    category: "Category",
    origin: "Origin",
    period: "Period",
    deaths: "Deaths",
    infected: "Infected",
    learn_more: "Learn More",
    back: "Back",
    loading: "Loading...",
    pandemic: "Pandemic",
    war: "War",
    nuclear: "Nuclear Event",
    famine: "Famine",
    genocide: "Genocide",
    ongoing: "Ongoing",
    // Pathogens page
    path_archive: "PATHOGEN ARCHIVE",
    path_hero_title_main: "Know Your",
    path_hero_title_accent: "Enemy",
    path_hero_subtitle: "The microorganisms that have shaped human history — their biology, transmission mechanisms, and the catastrophes they've caused. Select a pathogen class to explore.",
    path_size: "Size",
    path_threat_profile: "Threat Profile",
    path_threat_metrics: "Threat metrics",
    path_infectivity: "Infectivity",
    path_severity: "Severity",
    path_lethality: "Lethality",
    path_mutation_rate: "Mutation Rate",
    path_drug_resistance: "Drug Resistance",
    path_mechanism: "Mechanism",
    path_tab_overview: "Overview",
    path_tab_transmission: "Transmission",
    path_tab_symptoms: "Symptoms",
    path_tab_history: "History",
    path_transmission_routes: "Transmission routes",
    path_defenses: "Known defenses",
    path_clinical_note: "Common clinical presentation varies by species. General indicators:",
    path_phase_early: "Early",
    path_phase_middle: "Middle",
    path_phase_severe: "Severe",
    path_days_early: "1-3 days",
    path_days_middle: "4-10 days",
    path_days_severe: "10+ days",
    path_prion_warning: "Prion diseases are always fatal. No treatment exists. Incubation can be years or decades before symptoms appear.",
    path_notable_pathogens: "Notable pathogens",
    path_in_archive: "In our archive",
    path_cfr_title: "Case Fatality Rate",
    path_cfr_subtitle: "% of infected who die — untreated or worst case",
    path_all_types_title: "All Types — Threat Comparison",
    path_all_types_subtitle: "Relative danger profile per pathogen class",
    path_data_note: "Data note:",
    path_data_text: "Threat metrics are relative estimates based on historical outbreaks and peer-reviewed literature. Case fatality rates vary significantly by strain, healthcare access, and treatment availability. Source: WHO, CDC, UNAIDS, IAEA.",
    path_cfr_axis_label: "Case fatality rate:",
    // Dark mode
    dark_mode: "Dark Mode",
    light_mode: "Light Mode",
  },
  es: {
    // Nav
    nav_home: "Mapa",
    nav_events: "Eventos",
    nav_news: "Noticias",
    nav_pathogens: "Patógenos",
    nav_compare: "Comparar",
    nav_statistics: "Estadísticas",
    nav_about: "Acerca de",
    nav_support: "Apoyo",
    // Hero
    hero_title: "PlagueAtlas",
    hero_subtitle: "Visualiza las pandemias, guerras y eventos nucleares más mortíferos de la historia.",
    hero_deaths: "Total de muertes registradas",
    hero_events: "Eventos históricos",
    // Map
    map_title: "Mapa Mundial Interactivo",
    map_3d: "Globo 3D",
    map_flat: "Mapa Plano",
    map_select_event: "Selecciona un evento para visualizar su propagación",
    map_deaths_label: "Muertes",
    map_infected_label: "Infectados",
    map_period_label: "Período",
    map_origin_label: "Origen",
    // Selector
    selector_all: "Todos",
    selector_pandemics: "Pandemias",
    selector_wars: "Guerras",
    selector_nuclear: "Nuclear",
    selector_famines: "Hambrunas",
    selector_genocides: "Genocidios",
    selector_search: "Buscar eventos...",
    // Counter
    counter_estimated: "Muertes est.",
    counter_range: "Rango",
    counter_infected: "Infectados",
    // Compare
    compare_title: "Comparar Eventos",
    compare_subtitle: "Selecciona dos o más eventos para comparar su impacto",
    compare_select_a: "Seleccionar Evento A",
    compare_select_b: "Seleccionar Evento B",
    compare_deaths: "Número de Muertes",
    compare_duration: "Duración (años)",
    compare_infected: "Infectados",
    compare_period: "Período",
    // Statistics
    stats_title: "Estadísticas Globales",
    stats_subtitle: "Análisis de las mayores catástrofes de la humanidad",
    stats_by_category: "Muertes por Categoría",
    stats_timeline: "Línea de Tiempo Histórica",
    stats_top_10: "Top 10 Eventos Más Mortíferos",
    stats_top_10_subtitle: "Ordenados por número estimado de muertes",
    // Pages
    about_title: "Sobre PlagueAtlas",
    privacy_title: "Política de Privacidad",
    terms_title: "Términos de Servicio",
    support_title: "Apoya el Proyecto",
    support_subtitle: "Ayuda a mantener este recurso educativo gratuito y actualizado",
    support_donate: "Donar con Stripe",
    support_why: "¿Por qué apoyar?",
    support_why_text: "PlagueAtlas es un proyecto educativo independiente y sin ánimo de lucro. Tu apoyo ayuda a cubrir costos del servidor, investigación de datos y mantener el sitio sin publicidad.",
    // Footer
    footer_description: "Un proyecto de visualización de datos educativo que rastrea las mayores crisis sanitarias y conflictos de la humanidad.",
    footer_legal: "Legal",
    footer_privacy: "Política de Privacidad",
    footer_terms: "Términos de Servicio",
    footer_about: "Acerca de",
    footer_support: "Apóyanos",
    footer_disclaimer: "Datos obtenidos de OMS, CDC y fuentes académicas revisadas. Las estimaciones pueden variar según la fuente.",
    footer_rights: "Todos los derechos reservados.",
    // General
    read_more: "Leer más",
    view_on_map: "Ver en el mapa",
    sources: "Fuentes y Referencias",
    symptoms: "Síntomas",
    pathogen: "Patógeno",
    category: "Categoría",
    origin: "Origen",
    period: "Período",
    deaths: "Muertes",
    infected: "Infectados",
    learn_more: "Saber Más",
    back: "Volver",
    loading: "Cargando...",
    pandemic: "Pandemia",
    war: "Guerra",
    nuclear: "Evento Nuclear",
    famine: "Hambruna",
    genocide: "Genocidio",
    ongoing: "En Curso",
    // Pathogens page
    path_archive: "ARCHIVO DE PATÓGENOS",
    path_hero_title_main: "Conoce a tu",
    path_hero_title_accent: "Enemigo",
    path_hero_subtitle: "Los microorganismos que han marcado la historia de la humanidad: su biología, mecanismos de transmisión y las catástrofes que han provocado. Selecciona una clase de patógeno para explorar.",
    path_size: "Tamaño",
    path_threat_profile: "Perfil de Amenaza",
    path_threat_metrics: "Métricas de amenaza",
    path_infectivity: "Infectividad",
    path_severity: "Gravedad",
    path_lethality: "Letalidad",
    path_mutation_rate: "Tasa de Mutación",
    path_drug_resistance: "Resistencia a Fármacos",
    path_mechanism: "Mecanismo",
    path_tab_overview: "Resumen",
    path_tab_transmission: "Transmisión",
    path_tab_symptoms: "Síntomas",
    path_tab_history: "Historia",
    path_transmission_routes: "Rutas de transmisión",
    path_defenses: "Defensas conocidas",
    path_clinical_note: "La presentación clínica varía según la especie. Indicadores generales:",
    path_phase_early: "Temprana",
    path_phase_middle: "Media",
    path_phase_severe: "Grave",
    path_days_early: "1-3 días",
    path_days_middle: "4-10 días",
    path_days_severe: "10+ días",
    path_prion_warning: "Las enfermedades por priones son siempre fatales. No existe tratamiento. La incubación puede durar años o décadas antes de que aparezcan los síntomas.",
    path_notable_pathogens: "Patógenos notables",
    path_in_archive: "En nuestro archivo",
    path_cfr_title: "Tasa de Mortalidad",
    path_cfr_subtitle: "% de infectados que mueren — sin tratamiento o en el peor caso",
    path_all_types_title: "Todos los tipos — Comparación de amenaza",
    path_all_types_subtitle: "Perfil de peligro relativo por clase de patógeno",
    path_data_note: "Nota sobre datos:",
    path_data_text: "Las métricas de amenaza son estimaciones relativas basadas en brotes históricos y literatura revisada por pares. Las tasas de mortalidad varían significativamente según la cepa, el acceso sanitario y los tratamientos disponibles. Fuente: OMS, CDC, ONUSIDA, OIEA.",
    path_cfr_axis_label: "Tasa de mortalidad:",
    // Dark mode
    dark_mode: "Modo Oscuro",
    light_mode: "Modo Claro",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: TranslationKey): string => translations[lang][key] ?? translations.en[key] ?? key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
