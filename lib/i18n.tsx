"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "es";

const translations = {
  en: {
    // Nav
    nav_home: "Map",
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
    support_why_text: "PlagueAtlas is an independent, non-commercial educational project. Your support helps cover server costs, data research, and keeps the site ad-free.",
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
    ongoing: "Ongoing",
    // Dark mode
    dark_mode: "Dark Mode",
    light_mode: "Light Mode",
  },
  es: {
    // Nav
    nav_home: "Mapa",
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
    ongoing: "En Curso",
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
