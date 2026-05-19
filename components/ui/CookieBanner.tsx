"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 right-4 z-[999] max-w-2xl mx-auto"
        >
          <div className="card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-panel border-border/80">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Cookie className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-400 text-xs leading-relaxed">
                We use cookies to serve ads via{" "}
                <strong className="text-slate-300">Google AdSense</strong> and store your
                preferences. By clicking "Accept" you consent to our use of cookies as
                described in our{" "}
                <Link href="/privacy" className="text-cyan-light hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-border/60 text-slate-500 hover:text-slate-300 hover:border-border text-xs font-medium transition-all duration-200 cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none btn-primary text-xs py-1.5 px-4"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
