"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PlagueAtlas Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#05080F] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full border border-red-900/50 bg-red-950/20 rounded-2xl p-8">
        <h1 className="text-red-400 font-mono font-bold text-xl mb-4">
          Application Error
        </h1>
        <pre className="text-red-300 text-sm font-mono whitespace-pre-wrap break-all mb-6 bg-black/40 p-4 rounded-xl overflow-auto max-h-64">
          {error?.message || "Unknown error"}
          {"\n\n"}
          {error?.stack || ""}
        </pre>
        <button
          onClick={reset}
          className="px-6 py-2 bg-red-900/40 border border-red-700/50 text-red-300 rounded-xl font-mono text-sm hover:bg-red-900/60 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
