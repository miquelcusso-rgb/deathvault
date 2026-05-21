"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useAppStore } from "@/lib/store";
import { useBrand } from "@/app/providers";
import { EVENTS } from "@/data/events";
import { BRAND_CATEGORIES } from "@/lib/brand";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { ChevronRight, Zap, Droplets, Wind, Bug, AlertTriangle, Shield, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// ── Pathogen type definitions ─────────────────────────────────────────────────

interface PathogenType {
  id: string;
  name: string;
  nameEs: string;
  latin: string;
  color: string;
  icon: string;
  infectivity: number;   // 0-100
  severity: number;
  lethality: number;
  mutability: number;
  drugResistance: number;
  description: string;
  descriptionEs: string;
  mechanism: string;
  mechanismEs: string;
  size: string;
  transmission: string[];
  transmissionEs: string[];
  famous: string[];
  famousEs: string[];
  defenses: string[];
  defensesEs: string[];
  radarLabel: string;
}

const PATHOGEN_TYPES: PathogenType[] = [
  {
    id: "virus",
    name: "Virus",
    nameEs: "Virus",
    latin: "Virion",
    color: "#DC2626",
    icon: "🦠",
    infectivity: 90,
    severity: 72,
    lethality: 58,
    mutability: 95,
    drugResistance: 80,
    description:
      "Viruses are the ultimate minimalist parasites — stripped-down genetic code (DNA or RNA) wrapped in a protein shell called a capsid. They cannot reproduce independently; they hijack living host cells, forcing them to manufacture thousands of viral copies. This makes them immune to antibiotics and extremely difficult to treat. Their rapid mutation rate allows them to evolve resistance and cross species barriers, triggering pandemics.",
    descriptionEs:
      "Los virus son los parásitos minimalistas por excelencia: código genético simplificado (ADN o ARN) envuelto en una cápsula proteica llamada cápside. No pueden reproducirse de forma independiente; secuestran células huésped vivas, forzándolas a fabricar miles de copias virales. Esto los hace inmunes a los antibióticos y extremadamente difíciles de tratar. Su rápida tasa de mutación les permite evolucionar resistencia y cruzar barreras entre especies, desencadenando pandemias.",
    mechanism:
      "A virus binds to specific receptors on a host cell, injects its genetic material, and reprograms cellular machinery to replicate itself. New virions are assembled and released — often destroying the host cell in the process.",
    mechanismEs:
      "Un virus se une a receptores específicos de una célula huésped, inyecta su material genético y reprograma la maquinaria celular para replicarse. Los nuevos viriones se ensamblan y liberan, a menudo destruyendo la célula huésped en el proceso.",
    size: "20 – 300 nm",
    transmission: ["Airborne droplets", "Direct contact", "Bodily fluids", "Vector-borne", "Fomite surfaces"],
    transmissionEs: ["Gotas aerotransportadas", "Contacto directo", "Fluidos corporales", "Transmitido por vectores", "Superficies contaminadas"],
    famous: ["SARS-CoV-2 (COVID-19)", "HIV/AIDS", "Influenza A H1N1", "Variola (Smallpox)", "Ebola", "Hantavirus"],
    famousEs: ["SARS-CoV-2 (COVID-19)", "VIH/SIDA", "Gripe A H1N1", "Variola (Viruela)", "Ébola", "Hantavirus"],
    defenses: ["Vaccines", "Antivirals (limited)", "Quarantine", "Personal protective equipment"],
    defensesEs: ["Vacunas", "Antivirales (limitados)", "Cuarentena", "Equipo de protección personal"],
    radarLabel: "Virus",
  },
  {
    id: "bacteria",
    name: "Bacteria",
    nameEs: "Bacteria",
    latin: "Prokaryota",
    color: "#8B5CF6",
    icon: "🔬",
    infectivity: 70,
    severity: 65,
    lethality: 45,
    mutability: 60,
    drugResistance: 75,
    description:
      "Bacteria are single-celled organisms — far more complex than viruses — capable of independent reproduction. While the vast majority are harmless or beneficial, pathogenic bacteria produce toxins and enzymes that damage tissues. Unlike viruses, many bacterial infections can be treated with antibiotics, though antibiotic resistance is a growing crisis. Bacteria were responsible for many of history's deadliest pandemics, including the Black Death.",
    descriptionEs:
      "Las bacterias son organismos unicelulares, mucho más complejos que los virus, capaces de reproducirse de forma independiente. Aunque la gran mayoría son inofensivas o beneficiosas, las bacterias patógenas producen toxinas y enzimas que dañan los tejidos. A diferencia de los virus, muchas infecciones bacterianas pueden tratarse con antibióticos, aunque la resistencia antibiótica es una crisis creciente. Las bacterias fueron responsables de muchas de las pandemias más mortales de la historia, incluida la Peste Negra.",
    mechanism:
      "Pathogenic bacteria colonise host tissues, evade immune responses, and produce exotoxins or endotoxins that disrupt cellular function. Some form biofilms to resist treatment. Reproduction is rapid — doubling every 20 minutes under ideal conditions.",
    mechanismEs:
      "Las bacterias patógenas colonizan los tejidos del huésped, evaden las respuestas inmunitarias y producen exotoxinas o endotoxinas que interrumpen la función celular. Algunas forman biopelículas para resistir el tratamiento. La reproducción es rápida: se duplican cada 20 minutos en condiciones ideales.",
    size: "0.5 – 10 μm",
    transmission: ["Contaminated water/food", "Direct contact", "Respiratory droplets", "Insect vectors (fleas, ticks)", "Wounds"],
    transmissionEs: ["Agua/alimentos contaminados", "Contacto directo", "Gotas respiratorias", "Vectores de insectos (pulgas, garrapatas)", "Heridas"],
    famous: ["Yersinia pestis (Black Death)", "Vibrio cholerae (Cholera)", "Mycobacterium tuberculosis (TB)", "Salmonella typhi (Typhoid)"],
    famousEs: ["Yersinia pestis (Peste Negra)", "Vibrio cholerae (Cólera)", "Mycobacterium tuberculosis (TB)", "Salmonella typhi (Tifoidea)"],
    defenses: ["Antibiotics", "Vaccines (some)", "Water sanitation", "Hygiene"],
    defensesEs: ["Antibióticos", "Vacunas (algunas)", "Saneamiento del agua", "Higiene"],
    radarLabel: "Bacteria",
  },
  {
    id: "parasite",
    name: "Parasite",
    nameEs: "Parásito",
    latin: "Parasita",
    color: "#10B981",
    icon: "🪱",
    infectivity: 65,
    severity: 60,
    lethality: 35,
    mutability: 30,
    drugResistance: 45,
    description:
      "Parasites are organisms that live on or within a host, deriving nutrients at the host's expense. They range from microscopic protozoa (like Plasmodium, which causes malaria) to macroscopic worms. Parasitic diseases disproportionately affect tropical and low-income regions. Malaria alone — caused by the protozoan Plasmodium transmitted by Anopheles mosquitoes — kills over 600,000 people per year, predominantly children under 5.",
    descriptionEs:
      "Los parásitos son organismos que viven sobre o dentro de un huésped, obteniendo nutrientes a expensas del mismo. Van desde protozoos microscópicos (como Plasmodium, causante de la malaria) hasta gusanos macroscópicos. Las enfermedades parasitarias afectan desproporcionadamente a las regiones tropicales y de bajos ingresos. Solo la malaria, causada por el protozoo Plasmodium transmitido por mosquitos Anopheles, mata más de 600.000 personas al año, principalmente niños menores de 5 años.",
    mechanism:
      "Parasites have evolved highly sophisticated immune evasion strategies. Plasmodium, for example, hides inside red blood cells, periodically bursting out to infect new cells — causing the characteristic fever cycles of malaria. Many have complex multi-host life cycles.",
    mechanismEs:
      "Los parásitos han desarrollado estrategias muy sofisticadas de evasión inmunológica. Plasmodium, por ejemplo, se oculta dentro de los glóbulos rojos, estallando periódicamente para infectar nuevas células, provocando los característicos ciclos de fiebre de la malaria. Muchos tienen ciclos de vida complejos con múltiples huéspedes.",
    size: "1 μm – several metres",
    transmission: ["Mosquito bites (malaria)", "Contaminated water (Giardia)", "Undercooked meat", "Soil contact", "Sandfly bites"],
    transmissionEs: ["Picaduras de mosquito (malaria)", "Agua contaminada (Giardia)", "Carne poco cocida", "Contacto con el suelo", "Picaduras de flebótomos"],
    famous: ["Plasmodium falciparum (Malaria)", "Trypanosoma brucei (Sleeping sickness)", "Leishmania", "Toxoplasma gondii"],
    famousEs: ["Plasmodium falciparum (Malaria)", "Trypanosoma brucei (Enfermedad del sueño)", "Leishmania", "Toxoplasma gondii"],
    defenses: ["Antimalarial drugs", "Insecticide-treated nets", "Vaccines (limited)", "Water treatment"],
    defensesEs: ["Antipalúdicos", "Mosquiteros tratados con insecticida", "Vacunas (limitadas)", "Tratamiento del agua"],
    radarLabel: "Parasite",
  },
  {
    id: "prion",
    name: "Prion",
    nameEs: "Prión",
    latin: "Prionica",
    color: "#F59E0B",
    icon: "⚡",
    infectivity: 30,
    severity: 100,
    lethality: 100,
    mutability: 5,
    drugResistance: 100,
    description:
      "Prions are the most terrifying pathogens known to science — they are not living organisms at all. A prion is simply a misfolded version of a normal protein (PrP). When it contacts a healthy protein, it causes it to misfold too, triggering an unstoppable chain reaction of neurological destruction. There is no treatment, no cure, and no known immune response. All prion diseases are 100% fatal. They also survive extreme heat, UV, and chemical disinfection.",
    descriptionEs:
      "Los priones son los patógenos más aterradores conocidos por la ciencia: no son organismos vivos en absoluto. Un prión es simplemente una versión mal plegada de una proteína normal (PrP). Cuando entra en contacto con una proteína sana, hace que también se pliegue mal, desencadenando una reacción en cadena imparable de destrucción neurológica. No hay tratamiento, no hay cura y no existe respuesta inmune conocida. Todas las enfermedades por priones son 100% fatales. Además, sobreviven al calor extremo, la radiación UV y la desinfección química.",
    mechanism:
      "Misfolded prion proteins convert normal PrP^C proteins into pathological PrP^Sc conformations. These accumulate in the brain, forming amyloid plaques that destroy neurons, creating spongiform (sponge-like) lesions. Death typically follows within months of symptom onset.",
    mechanismEs:
      "Las proteínas priónicas mal plegadas convierten las proteínas PrP^C normales en conformaciones patológicas PrP^Sc. Estas se acumulan en el cerebro, formando placas amiloides que destruyen neuronas y crean lesiones espongiformes. La muerte suele producirse en meses desde la aparición de los síntomas.",
    size: "< 1 nm (protein)",
    transmission: ["Consumption of infected tissue", "Surgical instruments (iatrogenic)", "Inherited mutations", "Corneal/dura mater transplants"],
    transmissionEs: ["Consumo de tejido infectado", "Instrumentos quirúrgicos (iatrogénico)", "Mutaciones hereditarias", "Trasplantes de córnea/duramadre"],
    famous: ["CJD (Creutzfeldt-Jakob disease)", "vCJD (BSE / Mad Cow)", "Kuru (ritual cannibalism)", "Scrapie (sheep)", "Fatal Familial Insomnia"],
    famousEs: ["ECJ (Creutzfeldt-Jakob)", "ECJv (BSE / Vaca Loca)", "Kuru (canibalismo ritual)", "Scrapie (ovejas)", "Insomnio Fatal Familiar"],
    defenses: ["Avoiding infected tissue", "Surgical instrument decontamination (autoclave + NaOH)", "Blood screening", "No vaccine exists"],
    defensesEs: ["Evitar tejido infectado", "Descontaminación de instrumental (autoclave + NaOH)", "Cribado de sangre", "No existe vacuna"],
    radarLabel: "Prion",
  },
  {
    id: "fungus",
    name: "Fungus",
    nameEs: "Hongo",
    latin: "Fungi",
    color: "#06B6D4",
    icon: "🍄",
    infectivity: 40,
    severity: 55,
    lethality: 40,
    mutability: 25,
    drugResistance: 65,
    description:
      "Fungi are eukaryotic organisms — more closely related to animals than to bacteria — which makes treating fungal infections challenging without harming the host. Most healthy people are resistant, but immunocompromised individuals (HIV patients, transplant recipients, cancer patients) are extremely vulnerable. Candida auris, a recently emerged drug-resistant fungus, is raising global alarm. The WHO added fungi to its priority pathogen list in 2022.",
    descriptionEs:
      "Los hongos son organismos eucariotas, más cercanos a los animales que a las bacterias, lo que hace que tratar las infecciones fúngicas sea difícil sin dañar al huésped. La mayoría de las personas sanas son resistentes, pero los individuos inmunocomprometidos (pacientes con VIH, trasplantados, pacientes con cáncer) son extremadamente vulnerables. Candida auris, un hongo resistente a los fármacos de reciente aparición, genera alarma mundial. La OMS incluyó los hongos en su lista de patógenos prioritarios en 2022.",
    mechanism:
      "Pathogenic fungi colonize tissues by evading immune cells (often by surviving inside macrophages), releasing enzymes that break down host tissue, and forming persistent biofilms. Some produce toxins (mycotoxins) that damage organs.",
    mechanismEs:
      "Los hongos patógenos colonizan los tejidos evadiendo las células inmunes (a menudo sobreviviendo dentro de los macrófagos), liberando enzimas que degradan el tejido del huésped y formando biopelículas persistentes. Algunos producen toxinas (micotoxinas) que dañan los órganos.",
    size: "2 – 10 μm (spores)",
    transmission: ["Inhaled spores (Aspergillus, Cryptococcus)", "Direct skin contact", "Healthcare settings (Candida auris)", "Soil contact"],
    transmissionEs: ["Esporas inhaladas (Aspergillus, Cryptococcus)", "Contacto directo con la piel", "Entornos sanitarios (Candida auris)", "Contacto con el suelo"],
    famous: ["Candida auris (drug-resistant)", "Aspergillus fumigatus (Aspergillosis)", "Cryptococcus neoformans", "Coccidioides (Valley Fever)"],
    famousEs: ["Candida auris (resistente a fármacos)", "Aspergillus fumigatus (Aspergilosis)", "Cryptococcus neoformans", "Coccidioides (Fiebre del Valle)"],
    defenses: ["Antifungal drugs (limited classes)", "Immunosuppression management", "Environmental controls", "Hygiene in clinical settings"],
    defensesEs: ["Antifúngicos (clases limitadas)", "Manejo de la inmunosupresión", "Controles ambientales", "Higiene en entornos clínicos"],
    radarLabel: "Fungus",
  },
];

// ── Linked events per pathogen type ──────────────────────────────────────────

const PATHOGEN_EVENT_MAP: Record<string, string[]> = {
  virus:    ["hiv-aids", "covid-19", "smallpox-20th", "spanish-flu", "ebola-2014", "hantavirus"],
  bacteria: ["plague-of-justinian", "black-death", "cholera"],
  parasite: ["malaria"],
  prion:    [],
  fungus:   [],
};

// ── Bar chart data ────────────────────────────────────────────────────────────

const MORTALITY_DATA = [
  { name: "Ebola", rate: 50, color: "#EF4444" },
  { name: "Hantavirus HPS", rate: 35, color: "#FBBF24" },
  { name: "Black Death", rate: 30, color: "#A855F7" },
  { name: "Smallpox", rate: 28, color: "#F97316" },
  { name: "HIV (untreated)", rate: 80, color: "#EC4899" },
  { name: "Spanish Flu", rate: 2.5, color: "#06B6D4" },
  { name: "COVID-19", rate: 1.4, color: "#8B5CF6" },
  { name: "Malaria", rate: 0.3, color: "#10B981" },
  { name: "Cholera", rate: 25, color: "#60A5FA" },
].sort((a, b) => b.rate - a.rate);

// ── SVG pathogen visuals ──────────────────────────────────────────────────────

function VirusGlyph({ color }: { color: string }) {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-2xl">
      {/* Outer glow */}
      <circle cx="110" cy="110" r="100" fill={`${color}08`} />
      <circle cx="110" cy="110" r="80" fill={`${color}10`} />
      {/* Body */}
      <circle cx="110" cy="110" r="62" fill="#0A1628" stroke={color} strokeWidth="2" />
      {/* Surface proteins (spikes) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 110 + Math.cos(angle) * 62;
        const y1 = 110 + Math.sin(angle) * 62;
        const x2 = 110 + Math.cos(angle) * 82;
        const y2 = 110 + Math.sin(angle) * 82;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" />
            <circle cx={x2} cy={y2} r="5" fill={color} opacity="0.8" />
          </g>
        );
      })}
      {/* Inner RNA helix suggest */}
      <circle cx="110" cy="110" r="30" fill="none" stroke={`${color}40`} strokeWidth="12" strokeDasharray="8 6" />
      <circle cx="110" cy="110" r="12" fill={color} opacity="0.7" />
      {/* Pulsing ring */}
      <circle cx="110" cy="110" r="95" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="4 8" />
    </svg>
  );
}

function BacteriaGlyph({ color }: { color: string }) {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-2xl">
      <ellipse cx="110" cy="110" rx="55" ry="85" fill="#0A1628" stroke={color} strokeWidth="2" />
      <ellipse cx="110" cy="110" rx="40" ry="70" fill="none" stroke={`${color}30`} strokeWidth="1" />
      {/* Flagellum */}
      <path d="M110 25 Q140 10 150 -10 Q160 -30 145 -45" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M110 195 Q80 210 70 230 Q60 250 75 265" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      {/* Cell wall details */}
      {[-40, -20, 0, 20, 40].map((y, i) => (
        <line key={i} x1={57} y1={110 + y} x2={163} y2={110 + y} stroke={`${color}20`} strokeWidth="1" />
      ))}
      {/* Nucleus */}
      <ellipse cx="110" cy="110" rx="22" ry="32" fill={color} opacity="0.6" />
      <ellipse cx="110" cy="110" rx="10" ry="15" fill="#0A1628" />
      {/* Pili */}
      {[-35, 35].map((dx, i) => (
        <g key={i}>
          <line x1={110 + dx} y1="60" x2={110 + dx * 1.6} y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
          <line x1={110 + dx} y1="160" x2={110 + dx * 1.6} y2="190" stroke={color} strokeWidth="1.5" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

function ParasiteGlyph({ color }: { color: string }) {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-2xl">
      {/* Red blood cell */}
      <ellipse cx="110" cy="115" rx="70" ry="55" fill="#1a0505" stroke="#DC2626" strokeWidth="1" opacity="0.4" />
      <ellipse cx="110" cy="115" rx="50" ry="38" fill="#0A1628" stroke="#DC2626" strokeWidth="0.5" opacity="0.3" />
      {/* Plasmodium (ring stage) inside cell */}
      <circle cx="95" cy="105" r="22" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="95" cy="105" r="4" fill={color} opacity="0.9" />
      {/* Merozoites */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 140 + Math.cos(rad) * 30;
        const cy = 120 + Math.sin(rad) * 30;
        return <circle key={i} cx={cx} cy={cy} r="5" fill={color} opacity="0.7" />;
      })}
      {/* Mosquito silhouette hint */}
      <path d="M30 50 Q55 40 80 55 Q55 48 30 50Z" fill={`${color}40`} />
      <line x1="55" y1="50" x2="55" y2="20" stroke={`${color}60`} strokeWidth="1.5" />
      {/* Glow */}
      <circle cx="110" cy="110" r="95" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" strokeDasharray="3 9" />
    </svg>
  );
}

function PrionGlyph({ color }: { color: string }) {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-2xl">
      {/* Misfolded protein visualization */}
      <path
        d="M60 160 C70 120 50 100 80 80 C110 60 90 40 110 30 C130 20 150 50 140 80 C130 110 160 120 150 150 C140 180 110 190 90 170 C70 150 50 200 60 160Z"
        fill="#0A1628"
        stroke={color}
        strokeWidth="2"
      />
      {/* Normal protein ghost */}
      <path
        d="M60 160 C65 130 70 100 90 90 C110 80 110 60 110 40 C110 60 130 70 140 90 C150 110 145 140 140 160"
        fill="none"
        stroke={`${color}30`}
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      {/* Amyloid fibrils */}
      {[-20, 0, 20].map((dx, i) => (
        <line key={i} x1={90 + dx} y1="100" x2={130 + dx} y2="140" stroke={color} strokeWidth="1.5" opacity={0.3 + i * 0.2} />
      ))}
      {/* Danger marker */}
      <circle cx="110" cy="185" r="12" fill={color} opacity="0.9" />
      <text x="110" y="190" textAnchor="middle" fill="#000" fontSize="14" fontWeight="900">!</text>
      {/* Chains */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={50 + i * 26} cy="50" r="5" fill={color} opacity={0.3 + i * 0.1} />
      ))}
    </svg>
  );
}

function FungusGlyph({ color }: { color: string }) {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-2xl">
      {/* Hyphae network */}
      <path d="M110 180 L110 130 L80 100 L60 80 L50 55" fill="none" stroke={color} strokeWidth="3" opacity="0.8" />
      <path d="M110 130 L140 105 L165 85 L175 60" fill="none" stroke={color} strokeWidth="3" opacity="0.8" />
      <path d="M80 100 L55 120 L40 145" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M140 105 L165 125 L180 150" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M110 155 L85 160 L70 175" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M110 155 L135 162 L150 178" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Spore head */}
      <circle cx="110" cy="120" r="28" fill="#0A1628" stroke={color} strokeWidth="2" />
      {/* Spores */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 110 + Math.cos(rad) * 38;
        const cy = 120 + Math.sin(rad) * 38;
        return <circle key={i} cx={cx} cy={cy} r="6" fill={color} opacity="0.7" />;
      })}
      <circle cx="110" cy="120" r="12" fill={color} opacity="0.5" />
      <circle cx="110" cy="120" r="5" fill={color} />
    </svg>
  );
}

const GLYPHS: Record<string, (color: string) => React.ReactNode> = {
  virus:    (c) => <VirusGlyph color={c} />,
  bacteria: (c) => <BacteriaGlyph color={c} />,
  parasite: (c) => <ParasiteGlyph color={c} />,
  prion:    (c) => <PrionGlyph color={c} />,
  fungus:   (c) => <FungusGlyph color={c} />,
};

// ── Stat bar ─────────────────────────────────────────────────────────────────

function StatBar({ label, value, color, darkMode }: { label: string; value: number; color: string; darkMode: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-mono text-slate-500">{label}</span>
        <span className="text-xs font-mono font-bold" style={{ color }}>{value}/100</span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.10)" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color, animation: "bar-grow 0.7s ease-out both" }}
        />
      </div>
    </div>
  );
}

// ── Custom tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, cfr_label }: any) {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs font-mono" style={{ backgroundColor: "rgba(10,14,23,0.97)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="font-bold mb-0.5" style={{ color: "#f1f5f9" }}>{payload[0].payload.name}</p>
        <p style={{ color: "#94a3b8" }}>{cfr_label ?? "Case fatality rate:"} <span style={{ color: "#f8fafc" }}>{payload[0].value}%</span></p>
      </div>
    );
  }
  return null;
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PathogensPage() {
  const darkMode = useAppStore((s) => s.darkMode);
  const brand = useBrand();
  const isDV = brand === "deathvault";
  const allowedCats = BRAND_CATEGORIES[brand];
  const { t, lang } = useI18n();
  const isEs = lang === "es";
  const [selected, setSelected] = useState<PathogenType>(PATHOGEN_TYPES[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "transmission" | "symptoms" | "history">("overview");

  const linkedEvents = EVENTS.filter(
    (e) => PATHOGEN_EVENT_MAP[selected.id]?.includes(e.id) && allowedCats.includes(e.category)
  );

  const radarData = [
    { subject: "Infectivity",    value: selected.infectivity },
    { subject: "Severity",       value: selected.severity },
    { subject: "Lethality",      value: selected.lethality },
    { subject: "Mutation",       value: selected.mutability },
    { subject: "Drug Resist.",   value: selected.drugResistance },
  ];

  const accentColor = isDV ? "#F59E0B" : selected.color;

  return (
    <div className="min-h-screen bg-void bg-grid">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
              style={{ color: accentColor, borderColor: accentColor + "40", backgroundColor: accentColor + "12" }}
            >
              {t("path_archive")}
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-border/60 to-transparent" />
          </div>
          <h1 className={cn("font-display font-black text-4xl sm:text-5xl mb-2", darkMode ? "text-white" : "text-slate-900")}>
            {t("path_hero_title_main")} <span style={{ color: accentColor }}>{t("path_hero_title_accent")}</span>
          </h1>
          <p className={cn("text-base max-w-2xl", darkMode ? "text-slate-400" : "text-slate-600")}>
            {t("path_hero_subtitle")}
          </p>
        </motion.div>

        {/* ── Pathogen type selector ── */}
        <div className="flex gap-2 flex-wrap mb-6">
          {PATHOGEN_TYPES.map((pt) => (
            <button
              key={pt.id}
              onClick={() => { setSelected(pt); setActiveTab("overview"); }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer",
                selected.id === pt.id
                  ? "text-white"
                  : darkMode ? "border-border/40 text-slate-400 hover:text-white hover:border-border/80" : "border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300"
              )}
              style={selected.id === pt.id ? {
                backgroundColor: pt.color + "20",
                borderColor: pt.color + "70",
                color: pt.color,
              } : {}}
            >
              <span>{pt.icon}</span>
              {isEs ? pt.nameEs : pt.name}
            </button>
          ))}
        </div>

        {/* ── Main two-column card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "rounded-2xl border overflow-hidden mb-6",
              darkMode ? "bg-surface/80 border-border/60" : "bg-white/90 border-slate-200"
            )}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">

              {/* Left: visual + radar ── */}
              <div
                className="flex flex-col items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-border/30 relative overflow-hidden"
                style={{ background: `radial-gradient(ellipse at center, ${selected.color}10 0%, transparent 70%)` }}
              >
                {/* Background grid lines */}
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `linear-gradient(${selected.color} 1px, transparent 1px), linear-gradient(90deg, ${selected.color} 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />
                {/* Glyph */}
                <div className="relative z-10 mb-6">
                  {GLYPHS[selected.id]?.(selected.color)}
                </div>

                {/* Name + latin */}
                <div className="text-center mb-6 relative z-10">
                  <p className="font-display font-black text-2xl" style={{ color: selected.color }}>{isEs ? selected.nameEs : selected.name}</p>
                  <p className="text-slate-600 text-xs font-mono italic">{selected.latin}</p>
                  <p className="text-slate-500 text-xs mt-1 font-mono">{t("path_size")}: {selected.size}</p>
                </div>

                {/* Radar chart */}
                <div className="w-full max-w-[260px] relative z-10">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 text-center mb-2">{t("path_threat_profile")}</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={radarData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                      <PolarGrid stroke={selected.color + "25"} />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#64748B", fontSize: 9, fontFamily: "monospace" }}
                      />
                      <Radar
                        name={selected.name}
                        dataKey="value"
                        stroke={selected.color}
                        fill={selected.color}
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right: info tabs ── */}
              <div className="flex flex-col">
                {/* Tab bar */}
                <div className={cn("flex border-b", darkMode ? "border-border/40" : "border-slate-200")}>
                  {(["overview", "transmission", "symptoms", "history"] as const).map((tab) => {
                    const tabLabels = {
                      overview: t("path_tab_overview"),
                      transmission: t("path_tab_transmission"),
                      symptoms: t("path_tab_symptoms"),
                      history: t("path_tab_history"),
                    };
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 cursor-pointer capitalize",
                          activeTab === tab
                            ? "border-b-2 -mb-px"
                            : darkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"
                        )}
                        style={activeTab === tab ? { borderColor: selected.color, color: selected.color } : {}}
                      >
                        {tabLabels[tab]}
                      </button>
                    );
                  })}
                </div>

                {/* Tab content */}
                <div className="p-6 flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === "overview" && (
                        <div className="space-y-6">
                          <p className={cn("text-sm leading-relaxed", darkMode ? "text-slate-300" : "text-slate-700")}>
                            {isEs ? selected.descriptionEs : selected.description}
                          </p>

                          {/* Stat bars */}
                          <div className="space-y-3">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{t("path_threat_metrics")}</p>
                            <StatBar label={t("path_infectivity")}    value={selected.infectivity}   color={selected.color} darkMode={darkMode} />
                            <StatBar label={t("path_severity")}       value={selected.severity}       color={selected.color} darkMode={darkMode} />
                            <StatBar label={t("path_lethality")}      value={selected.lethality}      color={selected.color} darkMode={darkMode} />
                            <StatBar label={t("path_mutation_rate")}  value={selected.mutability}     color={selected.color} darkMode={darkMode} />
                            <StatBar label={t("path_drug_resistance")} value={selected.drugResistance} color={selected.color} darkMode={darkMode} />
                          </div>

                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">{t("path_mechanism")}</p>
                            <p className={cn("text-sm leading-relaxed", darkMode ? "text-slate-400" : "text-slate-600")}>
                              {isEs ? selected.mechanismEs : selected.mechanism}
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === "transmission" && (
                        <div className="space-y-6">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">{t("path_transmission_routes")}</p>
                            <div className="space-y-2">
                              {(isEs ? selected.transmissionEs : selected.transmission).map((route, i) => (
                                <div key={i} className={cn(
                                  "flex items-center gap-3 p-3 rounded-xl border",
                                  darkMode ? "border-border/30 bg-white/3" : "border-slate-100 bg-slate-50"
                                )}>
                                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: selected.color + "20" }}>
                                    {i === 0 && <Wind className="w-3 h-3" style={{ color: selected.color }} />}
                                    {i === 1 && <Zap className="w-3 h-3" style={{ color: selected.color }} />}
                                    {i === 2 && <Droplets className="w-3 h-3" style={{ color: selected.color }} />}
                                    {i >= 3 && <Bug className="w-3 h-3" style={{ color: selected.color }} />}
                                  </div>
                                  <span className={cn("text-sm", darkMode ? "text-slate-300" : "text-slate-700")}>{route}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">{t("path_defenses")}</p>
                            <div className="space-y-2">
                              {(isEs ? selected.defensesEs : selected.defenses).map((d, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                  <span className={cn("text-sm", darkMode ? "text-slate-300" : "text-slate-700")}>{d}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "symptoms" && (
                        <div className="space-y-4">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                            {t("path_clinical_note")}
                          </p>
                          {/* Generic symptom progression based on type */}
                          {[
                            { phaseKey: "path_phase_early" as const, daysKey: "path_days_early" as const, symptoms: selected.id === "prion" ? (isEs ? ["Lagunas de memoria", "Cambios de personalidad", "Problemas de coordinación"] : ["Memory lapses", "Personality changes", "Coordination problems"]) : selected.id === "fungus" ? (isEs ? ["Tos persistente", "Fiebre", "Fatiga"] : ["Persistent cough", "Fever", "Fatigue"]) : (isEs ? ["Fiebre y escalofríos", "Fatiga", "Dolor de cabeza"] : ["Fever & chills", "Fatigue", "Headache"]), color: "#F59E0B" },
                            { phaseKey: "path_phase_middle" as const, daysKey: "path_days_middle" as const, symptoms: selected.id === "prion" ? (isEs ? ["Deterioro cognitivo rápido", "Espasmos musculares", "Problemas de visión"] : ["Rapid cognitive decline", "Muscle twitching", "Vision problems"]) : selected.id === "virus" ? (isEs ? ["Dificultad respiratoria", "Activación inmune", "Inflamación sistémica"] : ["Respiratory distress", "Immune activation", "Systemic inflammation"]) : (isEs ? ["Estrés orgánico", "Deshidratación", "Dolor"] : ["Organ stress", "Dehydration", "Pain"]), color: "#F97316" },
                            { phaseKey: "path_phase_severe" as const, daysKey: "path_days_severe" as const, symptoms: selected.id === "prion" ? (isEs ? ["Demencia completa", "Coma", "Muerte (invariable)"] : ["Complete dementia", "Coma", "Death (invariable)"]) : (isEs ? ["Riesgo de fallo orgánico", "Shock séptico", "Requiere UCI"] : ["Organ failure risk", "Septic shock", "Requires ICU care"]), color: "#DC2626" },
                          ].map((phase) => (
                            <div key={phase.phaseKey} className={cn(
                              "p-4 rounded-xl border",
                              darkMode ? "border-border/30 bg-white/3" : "border-slate-100 bg-slate-50"
                            )}>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
                                <span className="text-xs font-bold" style={{ color: phase.color }}>{t(phase.phaseKey)}</span>
                                <span className="text-xs text-slate-500 font-mono">{t(phase.daysKey)}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {phase.symptoms.map((s) => (
                                  <span key={s} className={cn(
                                    "text-xs px-2 py-0.5 rounded-md",
                                    darkMode ? "bg-white/5 text-slate-300" : "bg-slate-100 text-slate-700"
                                  )}>{s}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                          {selected.id === "prion" && (
                            <div className="flex items-start gap-2 p-3 rounded-xl border border-red-500/30 bg-red-500/5">
                              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-red-300">{t("path_prion_warning")}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === "history" && (
                        <div className="space-y-4">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">{t("path_notable_pathogens")} — {isEs ? selected.nameEs : selected.name}</p>
                          <div className="space-y-2">
                            {(isEs ? selected.famousEs : selected.famous).map((f, i) => (
                              <div key={i} className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border",
                                darkMode ? "border-border/30" : "border-slate-100"
                              )}>
                                <span className="text-slate-600 font-mono text-xs w-6">{String(i + 1).padStart(2, "0")}</span>
                                <span className={cn("text-sm font-medium", darkMode ? "text-slate-200" : "text-slate-800")}>{f}</span>
                              </div>
                            ))}
                          </div>

                          {linkedEvents.length > 0 && (
                            <div className="mt-4">
                              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">{t("path_in_archive")}</p>
                              <div className="space-y-2">
                                {linkedEvents.map((ev) => (
                                  <Link
                                    key={ev.id}
                                    href={`/pandemic/${ev.id}`}
                                    className={cn(
                                      "flex items-center gap-3 p-3 rounded-xl border transition-colors duration-150 cursor-pointer group",
                                      darkMode ? "border-border/30 hover:border-border/60" : "border-slate-100 hover:border-slate-200"
                                    )}
                                  >
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ev.color }} />
                                    <div className="flex-1 min-w-0">
                                      <p className={cn("text-sm font-semibold", darkMode ? "text-slate-200" : "text-slate-800")}>{ev.name}</p>
                                      <p className="text-xs text-slate-500">{ev.pathogen}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Charts row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

          {/* Mortality rate chart */}
          <div className={cn("rounded-2xl border p-6", darkMode ? "bg-surface/80 border-border/60" : "bg-white/90 border-slate-200")}>
            <div className="flex items-center gap-2 mb-1">
              <p className={cn("font-display font-bold text-base", darkMode ? "text-white" : "text-slate-900")}>
                {t("path_cfr_title")}
              </p>
              <Info className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <p className="text-xs text-slate-500 mb-5">{t("path_cfr_subtitle")}</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={MORTALITY_DATA} layout="vertical" margin={{ top: 0, right: 40, bottom: 0, left: 80 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9, fill: "#64748B", fontFamily: "monospace" }} tickFormatter={(v) => v + "%"} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<CustomTooltip cfr_label={t("path_cfr_axis_label")} />} />
                <Bar dataKey="rate" radius={[0, 4, 4, 0]} maxBarSize={14}>
                  {MORTALITY_DATA.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pathogen comparison radar */}
          <div className={cn("rounded-2xl border p-6", darkMode ? "bg-surface/80 border-border/60" : "bg-white/90 border-slate-200")}>
            <p className={cn("font-display font-bold text-base mb-1", darkMode ? "text-white" : "text-slate-900")}>
              {t("path_all_types_title")}
            </p>
            <p className="text-xs text-slate-500 mb-4">{t("path_all_types_subtitle")}</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart
                data={[
                  { subject: "Infectivity",   virus: 90, bacteria: 70, parasite: 65, prion: 30, fungus: 40 },
                  { subject: "Severity",      virus: 72, bacteria: 65, parasite: 60, prion: 100, fungus: 55 },
                  { subject: "Lethality",     virus: 58, bacteria: 45, parasite: 35, prion: 100, fungus: 40 },
                  { subject: "Mutation",      virus: 95, bacteria: 60, parasite: 30, prion: 5,   fungus: 25 },
                  { subject: "Drug Resist.",  virus: 80, bacteria: 75, parasite: 45, prion: 100, fungus: 65 },
                ]}
              >
                <PolarGrid stroke="#1E3A5F" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748B", fontSize: 10, fontFamily: "monospace" }} />
                {PATHOGEN_TYPES.map((pt) => (
                  <Radar
                    key={pt.id}
                    name={pt.name}
                    dataKey={pt.id}
                    stroke={pt.color}
                    fill={pt.color}
                    fillOpacity={0.08}
                    strokeWidth={selected.id === pt.id ? 2.5 : 1}
                    strokeOpacity={selected.id === pt.id ? 1 : 0.4}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {PATHOGEN_TYPES.map((pt) => (
                <button key={pt.id} onClick={() => setSelected(pt)} className="flex items-center gap-1.5 cursor-pointer opacity-80 hover:opacity-100">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pt.color }} />
                  <span className="text-[10px] font-mono text-slate-400">{isEs ? pt.nameEs : pt.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info strip ── */}
        <div className={cn(
          "rounded-2xl border p-5 flex items-center gap-4",
          darkMode ? "bg-surface/60 border-border/40" : "bg-white/80 border-slate-200"
        )}>
          <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
          <p className={cn("text-xs leading-relaxed", darkMode ? "text-slate-400" : "text-slate-600")}>
            <span className="font-semibold" style={{ color: accentColor }}>{t("path_data_note")} </span>
            {t("path_data_text")}
          </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
