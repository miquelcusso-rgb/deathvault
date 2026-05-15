"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PlagueAtlas GlobalError]", error);
  }, [error]);

  return (
    <html>
      <body style={{ background: "#05080F", margin: 0, fontFamily: "monospace" }}>
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          justifyContent: "center", padding: "2rem"
        }}>
          <div style={{
            maxWidth: 700, width: "100%",
            border: "1px solid #7f1d1d",
            background: "rgba(127,29,29,0.1)",
            borderRadius: 16, padding: "2rem"
          }}>
            <h1 style={{ color: "#f87171", fontSize: 18, marginBottom: 16 }}>
              Global Application Error
            </h1>
            <pre style={{
              color: "#fca5a5", fontSize: 12, whiteSpace: "pre-wrap",
              wordBreak: "break-all", background: "rgba(0,0,0,0.4)",
              padding: 16, borderRadius: 8, maxHeight: 300,
              overflow: "auto", marginBottom: 16
            }}>
              {error?.message}{"\n\n"}{error?.stack}
            </pre>
            <button
              onClick={reset}
              style={{
                padding: "8px 24px", background: "rgba(127,29,29,0.4)",
                border: "1px solid #991b1b", color: "#fca5a5",
                borderRadius: 8, cursor: "pointer", fontSize: 13
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
