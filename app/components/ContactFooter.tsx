"use client";

import { useEffect, useRef } from "react";
import HlsVideo from "./HlsVideo";

const MARQUEE_TEXT = "BUILDING THE FUTURE • ";
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rafaqat-hussain-5615483a9/" },
  { label: "Twitter",  href: "https://x.com/ZehanxTech" },
  { label: "GitHub",   href: "https://github.com/AhmedIbrahimofficial" },
  { label: "ZehanxTech", href: "https://zehanxtech.com" },
];

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;
    const init = async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        if (marqueeRef.current) {
          gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        }
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden pt-16 md:pt-20 pb-8 md:pb-12"
      style={{ background: "#0a0a0a", isolation: "isolate" }}>
      <HlsVideo overlayOpacity="bg-black/70" style={{ transform: "scaleY(-1)" }} />

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-12 md:mb-16" style={{ maxWidth: "100vw" }}>
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}
                className="font-display italic flex-shrink-0 pr-8 select-none"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  color: i % 2 === 0 ? "rgba(255,255,255,0.08)" : "rgba(137,170,204,0.15)",
                  letterSpacing: "0.02em",
                }}>
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 font-bold" style={{ color: "#aaaaaa" }}>
            Get in touch
          </p>
          <h2 className="font-display italic mb-10 font-normal"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", fontFamily: "'Instrument Serif', serif", color: "#ffffff", lineHeight: 1.1 }}>
            Let&apos;s build something{" "}
            <em style={{ color: "#89AACC" }}>great</em>
          </h2>

          <a href="https://mail.google.com/mail/?view=cm&to=funandentertainmentwithus@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full text-sm px-8 py-4 font-bold border transition-all duration-200 hover:scale-105"
            style={{ borderColor: "#444", color: "#ffffff", background: "#161616" }}>
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", zIndex: -1 }} />
            <span className="relative z-10 flex items-center gap-2 rounded-full px-8 py-4 -mx-8 -my-4"
              style={{ background: "#161616" }}>
              funandentertainmentwithus@gmail.com ↗
            </span>
          </a>
        </div>

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderColor: "#2a2a2a" }}>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold transition-colors duration-200 hover:text-white"
                style={{ color: "#aaaaaa" }}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            <span className="text-xs font-bold" style={{ color: "#cccccc" }}>Available for projects</span>
          </div>
          <p className="text-xs font-medium" style={{ color: "#666666" }}>© 2025 Ahmed Ibrahim</p>
        </div>
      </div>
    </footer>
  );
}
