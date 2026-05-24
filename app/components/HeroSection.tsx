"use client";

import { useEffect, useRef, useState } from "react";
import HlsVideo from "./HlsVideo";

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];
const TAGLINES = [
  "Building the Future",
  "Turning Ideas into Digital Reality",
  "Engineering Intelligence into Products",
  "Shipping Real Products, Fast",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex]   = useState(0);
  const [tagline, setTagline]       = useState("");
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [typing, setTyping]         = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const blurRefs   = useRef<(HTMLElement | null)[]>([]);

  /* ── Role cycling ── */
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(id);
  }, []);

  /* ── Typing effect ── */
  useEffect(() => {
    const full = TAGLINES[taglineIdx];
    if (typing) {
      if (tagline.length < full.length) {
        const t = setTimeout(() => setTagline(full.slice(0, tagline.length + 1)), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (tagline.length > 0) {
        const t = setTimeout(() => setTagline(tagline.slice(0, -1)), 22);
        return () => clearTimeout(t);
      } else {
        setTaglineIdx((i) => (i + 1) % TAGLINES.length);
        setTyping(true);
      }
    }
  }, [tagline, typing, taglineIdx]);

  /* ── GSAP entrance ── */
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;
    const init = async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (nameRef.current) {
          tl.fromTo(nameRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.2 });
        }
        const els = blurRefs.current.filter(Boolean);
        if (els.length) {
          tl.fromTo(els,
            { opacity: 0, y: 20, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.2 },
            "<0.3"
          );
        }
      }, sectionRef);
    };
    init();
    return () => ctx?.revert();
  }, []);

  const addRef = (el: HTMLElement | null, i: number) => { blurRefs.current[i] = el; };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* HLS video background */}
      <HlsVideo overlayOpacity="bg-black/40" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }} />

      {/* Available badge — top left */}
      <div
        ref={(el) => addRef(el, 0)}
        className="absolute top-24 left-6 md:left-10 z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border"
        style={{
          background: "rgba(0,0,0,0.5)",
          borderColor: "rgba(255,255,255,0.15)",
          color: "#ffffff",
          backdropFilter: "blur(8px)",
          opacity: 0,
        }}
      >
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
        Available for projects
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <p ref={(el) => addRef(el, 1)}
          className="text-xs uppercase tracking-[0.3em] mb-8 font-semibold"
          style={{ color: "#aaaaaa", opacity: 0 }}>
          Portfolio &apos;26
        </p>

        {/* Name */}
        <h1 ref={nameRef}
          className="font-display italic leading-[0.9] tracking-tight mb-4"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            color: "#ffffff",
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            opacity: 0,
          }}>
          Ahmed Ibrahim
        </h1>

        {/* Subtitle */}
        <div ref={(el) => addRef(el, 2)}
          className="flex flex-wrap items-center justify-center gap-2 mb-5"
          style={{ opacity: 0 }}>
          <span className="text-base md:text-xl font-black uppercase tracking-wider" style={{ color: "#89AACC" }}>
            AI Innovator
          </span>
          <span className="text-base md:text-xl font-thin" style={{ color: "rgba(255,255,255,0.4)" }}>&amp;</span>
          <span className="text-base md:text-xl font-black uppercase tracking-wider" style={{ color: "#ffffff" }}>
            Full Stack Developer
          </span>
        </div>

        {/* Description */}
        <p ref={(el) => addRef(el, 3)}
          className="text-sm md:text-base font-medium mb-3 max-w-lg text-center"
          style={{ color: "rgba(255,255,255,0.6)", opacity: 0, lineHeight: 1.7 }}>
          I build AI-powered web apps and design brands that convert — based in Gujranwala, Pakistan.
        </p>

        {/* Location */}
        <p ref={(el) => addRef(el as HTMLElement | null, 6)}
          className="text-xs font-medium mb-8"
          style={{ color: "rgba(255,255,255,0.35)", opacity: 0 }}>
          📍 Gujranwala, Pakistan · ZehanxTech
        </p>

        {/* Typing tagline */}
        <div ref={(el) => addRef(el, 4)}
          className="text-sm md:text-lg font-medium mb-12 h-7 flex items-center justify-center"
          style={{ color: "rgba(200,220,255,0.8)", opacity: 0 }}>
          <span>{tagline}</span>
          <span className="ml-0.5 inline-block w-0.5 h-5 align-middle"
            style={{ background: "#89AACC", animation: "blink 1s step-end infinite" }} />
        </div>

        {/* CTA Buttons */}
        <div ref={(el) => addRef(el as HTMLElement | null, 5)}
          className="inline-flex gap-4 flex-wrap justify-center"
          style={{ opacity: 0 }}>

          {/* See My Work */}
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative rounded-full text-sm px-8 py-4 font-bold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #89AACC, #4E85BF)",
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(137,170,204,0.4), 0 0 40px rgba(137,170,204,0.2)",
              animation: "neonPulse 2.5s ease-in-out infinite",
            }}>
            See My Work ↓
          </button>

          {/* Download CV */}
          <a href="/Ahmed-Ibrahim-CV.pdf"
            download
            className="group relative rounded-full text-sm px-8 py-4 font-bold border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "rgba(255,255,255,0.25)",
              color: "#ffffff",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
            }}>
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(137,170,204,0.15)", boxShadow: "0 0 20px rgba(137,170,204,0.3)" }} />
            <span className="relative z-10">Download CV ↓</span>
          </a>

          {/* Let's Talk — WhatsApp */}
          <a href="https://wa.me/923067060074"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-full text-sm px-8 py-4 font-bold border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "#ffffff",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}>
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(137,170,204,0.1)", boxShadow: "0 0 20px rgba(137,170,204,0.2)" }} />
            <span className="relative z-10">Let&apos;s Talk 💬</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>
          Scroll
        </span>
        <div style={{ color: "#89AACC", animation: "bounceArrow 1.8s ease-in-out infinite", fontSize: "1.2rem" }}>
          ↓
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(137,170,204,0.4), 0 0 40px rgba(137,170,204,0.2); }
          50%       { box-shadow: 0 0 35px rgba(137,170,204,0.7), 0 0 70px rgba(137,170,204,0.35); }
        }
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
