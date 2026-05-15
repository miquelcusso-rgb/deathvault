"use client";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import { I18nProvider } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import type { Brand } from "@/lib/brand";

// ── Brand context ─────────────────────────────────────────────────────────────
const BrandContext = createContext<Brand>("deathvault");

export function useBrand(): Brand {
  return useContext(BrandContext);
}

// ── Theme sync ────────────────────────────────────────────────────────────────
function ThemeSync({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const darkMode = useAppStore((s) => s.darkMode);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [darkMode, mounted]);

  return <div suppressHydrationWarning>{children}</div>;
}

// ── Root providers ────────────────────────────────────────────────────────────
export function Providers({ children, brand }: { children: ReactNode; brand: Brand }) {
  return (
    <BrandContext.Provider value={brand}>
      <I18nProvider>
        <ThemeSync>{children}</ThemeSync>
      </I18nProvider>
    </BrandContext.Provider>
  );
}
