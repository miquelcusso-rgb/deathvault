import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark base
        void: "#030712",
        abyss: "#060E1E",
        surface: "#0A1628",
        panel: "#0F1F38",
        border: "#1E3A5F",
        // Accent palette
        crimson: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
          glow: "#FF2D2D",
          muted: "#7F1D1D",
        },
        amber: {
          DEFAULT: "#F97316",
          light: "#FB923C",
          glow: "#FF7A1A",
          muted: "#7C2D12",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
          glow: "#00E5FF",
          muted: "#164E63",
        },
        emerald: {
          DEFAULT: "#10B981",
          light: "#34D399",
          glow: "#00FF9D",
          muted: "#064E3B",
        },
        violet: {
          DEFAULT: "#7C3AED",
          light: "#8B5CF6",
          glow: "#A855F7",
          muted: "#3B0764",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
      },
      backgroundImage: {
        "grid-dark": "radial-gradient(circle, #1E3A5F22 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        flicker: "flicker 0.15s infinite",
        "counter-up": "counterUp 0.3s ease-out",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.7", filter: "brightness(1.5)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        counterUp: {
          "0%": { transform: "translateY(4px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        "glow-red": "0 0 20px rgba(220, 38, 38, 0.4), 0 0 60px rgba(220, 38, 38, 0.1)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.1)",
        "glow-amber": "0 0 20px rgba(249, 115, 22, 0.4), 0 0 60px rgba(249, 115, 22, 0.1)",
        "glow-violet": "0 0 20px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.1)",
        "panel": "0 0 0 1px rgba(30, 58, 95, 0.6), 0 4px 32px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
