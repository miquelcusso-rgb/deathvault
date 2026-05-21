"use client";
/**
 * Client-side dynamic imports for the pandemic/[slug] Server Component page.
 * next/dynamic with ssr:false is only allowed inside "use client" files.
 */
import dynamic from "next/dynamic";

export const ShareButton = dynamic(
  () => import("@/components/ui/ShareButton").then((m) => m.ShareButton),
  { ssr: false },
);

export const TimelineChart = dynamic(
  () => import("@/components/charts/TimelineChart").then((m) => m.TimelineChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 flex items-center justify-center text-slate-600 text-sm font-mono">
        Loading chart…
      </div>
    ),
  },
);
