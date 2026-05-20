import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void bg-grid flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-12">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-border/40 flex items-center justify-center">
              <SearchX className="w-8 h-8 text-slate-500" />
            </div>
          </div>
          <p className="font-mono text-slate-600 text-sm mb-2 uppercase tracking-widest">404</p>
          <h1 className="font-display font-bold text-2xl text-white mb-3">Page not found</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="btn-primary text-sm px-5 py-2"
            >
              Back to Map
            </Link>
            <Link
              href="/events"
              className="px-5 py-2 rounded-xl border border-border/60 text-slate-400 hover:text-white hover:border-border text-sm font-medium transition-all duration-200"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
