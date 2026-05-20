import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HistoricalEvent } from "@/data/events";

interface AppState {
  // Theme
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  toggleDarkMode: () => void;

  // Map view
  mapView: "globe" | "flat";
  setMapView: (v: "globe" | "flat") => void;
  toggleMapView: () => void;

  // Selected event
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;

  // Category filter
  categoryFilter: "all" | "pandemic" | "war" | "nuclear" | "famine";
  setCategoryFilter: (c: AppState["categoryFilter"]) => void;

  // Compare
  compareEventIds: [string | null, string | null];
  setCompareEventA: (id: string | null) => void;
  setCompareEventB: (id: string | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      setDarkMode: (v) => set({ darkMode: v }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

      mapView: "flat",
      setMapView: (v) => set({ mapView: v }),
      toggleMapView: () =>
        set((s) => ({ mapView: s.mapView === "globe" ? "flat" : "globe" })),

      selectedEventId: null,
      setSelectedEventId: (id) => set({ selectedEventId: id }),

      categoryFilter: "all",
      setCategoryFilter: (c) => set({ categoryFilter: c }),

      compareEventIds: [null, null],
      setCompareEventA: (id) =>
        set((s) => ({ compareEventIds: [id, s.compareEventIds[1]] })),
      setCompareEventB: (id) =>
        set((s) => ({ compareEventIds: [s.compareEventIds[0], id] })),

      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: "pw-store-v2",
      // skipHydration: server and client both start with initial state,
      // then Providers calls rehydrate() after mount — prevents React #418
      skipHydration: true,
      partialize: (s) => ({
        darkMode: s.darkMode,
        mapView: s.mapView,
        compareEventIds: s.compareEventIds,
      }),
    }
  )
);
