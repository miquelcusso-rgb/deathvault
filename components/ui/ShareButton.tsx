"use client";
import { useState, useEffect, useRef } from "react";
import { Share2, Copy, Check, Facebook, Linkedin, MessageCircle } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getUrl = () => url ?? (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    const shareUrl = getUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // User cancelled or not supported — fall through to dropdown
        setOpen(true);
      }
    } else {
      setOpen((prev) => !prev);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent */
    }
  };

  const shareToTwitter = () => {
    const encoded = encodeURIComponent(`${title} — ${text} ${getUrl()}`);
    window.open(`https://x.com/intent/tweet?text=${encoded}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const shareToWhatsApp = () => {
    const encoded = encodeURIComponent(`${title} — ${text} ${getUrl()}`);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const shareToLinkedIn = () => {
    const encoded = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const shareToFacebook = () => {
    const encoded = encodeURIComponent(getUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encoded}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const options = [
    {
      label: copied ? "Copied!" : "Copy link",
      icon: copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />,
      onClick: handleCopy,
    },
    {
      label: "Twitter / X",
      icon: <XIcon />,
      onClick: shareToTwitter,
    },
    {
      label: "WhatsApp",
      icon: <MessageCircle className="w-4 h-4" />,
      onClick: shareToWhatsApp,
    },
    {
      label: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      onClick: shareToLinkedIn,
    },
    {
      label: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      onClick: shareToFacebook,
    },
  ];

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={handleShare}
        className={`btn-secondary text-xs py-2 cursor-pointer ${className ?? ""}`}
      >
        <Share2 className="w-3.5 h-3.5" />
        Share
      </button>

      {open && (
        <>
          {/* Overlay to capture outside clicks */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
          />
          <div
            className="bg-surface border border-border/60 rounded-xl shadow-panel"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              zIndex: 50,
              minWidth: 170,
              overflow: "hidden",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.label}
                onClick={opt.onClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors duration-150 cursor-pointer"
              >
                <span className="text-slate-400">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
