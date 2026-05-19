"use client";
import { useState, useEffect } from "react";
import { X, Share2, Plus, Bug, Shield } from "lucide-react";
import { useBrand } from "@/app/providers";
import { BRAND_META } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BannerState = "idle" | "ios" | "android";

export function AddToHomeBanner() {
  const brand = useBrand();
  const isDV = brand === "deathvault";
  const meta = BRAND_META[brand];
  const storageKey = `pwa-dismissed-${brand}`;

  const [state, setState] = useState<BannerState>("idle");
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Already dismissed
    if (localStorage.getItem(storageKey)) return;
    // Already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if ((window.navigator as unknown as { standalone?: boolean }).standalone === true) return;
    // Only on mobile
    const ua = navigator.userAgent;
    if (!/iPhone|iPad|iPod|Android/i.test(ua)) return;

    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isIOS) {
      const t = setTimeout(() => setState("ios"), 2500);
      return () => clearTimeout(t);
    }

    // Android / Chrome PWA install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setState("android"), 2500);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [storageKey]);

  const dismiss = () => {
    setState("idle");
    localStorage.setItem(storageKey, "1");
  };

  const install = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as unknown as { prompt: () => void; userChoice: Promise<{ outcome: string }> }).prompt();
    await (deferredPrompt as unknown as { userChoice: Promise<{ outcome: string }> }).userChoice;
    dismiss();
  };

  if (state === "idle") return null;

  const accentBtn = isDV
    ? "border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
    : "border-rose-500/40 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25";

  const accentIcon = isDV
    ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
    : "border-rose-500/30 bg-rose-500/10 text-rose-400";

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[200] md:hidden",
        "animate-in slide-in-from-bottom-4 duration-300 ease-out",
      )}
      role="banner"
      aria-label="Add to Home Screen"
    >
      <div className="m-3 bg-[#0d1117]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Subtle brand gradient top border */}
        <div
          className="h-[2px] w-full"
          style={{
            background: isDV
              ? "linear-gradient(90deg, transparent, #f59e0b80, transparent)"
              : "linear-gradient(90deg, transparent, #f43f5e80, transparent)",
          }}
        />

        <div className="flex items-center gap-3 px-4 py-3.5">
          {/* Brand icon */}
          <div className={cn("w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0", accentIcon)}>
            {isDV
              ? <Shield className="w-5 h-5" />
              : <Bug className="w-5 h-5" />
            }
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold leading-tight">{meta.name}</p>
            {state === "ios" ? (
              <p className="text-slate-400 text-xs leading-snug mt-0.5">
                Tap{" "}
                <span className="inline-flex items-center gap-0.5 mx-0.5 px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px] font-medium">
                  <Share2 className="w-2.5 h-2.5" />
                  Share
                </span>{" "}
                then{" "}
                <strong className="text-white font-semibold">Add to Home Screen</strong>
              </p>
            ) : (
              <p className="text-slate-400 text-xs mt-0.5">
                Install for quick access — works offline
              </p>
            )}
          </div>

          {/* Install button (Android only) */}
          {state === "android" && (
            <button
              onClick={install}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold",
                "cursor-pointer transition-all duration-150 active:scale-95 whitespace-nowrap flex-shrink-0",
                accentBtn,
              )}
            >
              <Plus className="w-3.5 h-3.5" />
              Install
            </button>
          )}

          {/* Dismiss */}
          <button
            onClick={dismiss}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/8 transition-colors duration-150 cursor-pointer flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
