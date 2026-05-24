"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 hover:scale-110 hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, #89AACC, #4E85BF)",
        color: "#ffffff",
        boxShadow: "0 4px 20px rgba(137,170,204,0.45)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      ↑
    </button>
  );
}
