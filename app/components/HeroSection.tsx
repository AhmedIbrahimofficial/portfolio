"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGitHub } from "../lib/useGitHub";

const TAGLINES = [
  "Building the Future",
  "Turning Ideas into Digital Reality",
  "Engineering Intelligence into Products",
  "Shipping Real Products, Fast",
];

const BADGE_STYLE = {
  background: "rgba(0,0,0,0.55)",
  borderColor: "rgba(255,255,255,0.15)",
  color: "#ffffff",
  backdropFilter: "blur(8px)",
  whiteSpace: "nowrap" as const,
};

export default function HeroSection() {
  const [tagline, setTagline]       = useState("");
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [typing, setTyping]         = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const blurRefs   = useRef<(HTMLElement | null)[]>([]);
  const { data: gh } = useGitHub();

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
      {/* ── Hero background — two images stacked: top = procurement, bottom = extension ── */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top image — main hero with faces */}
        <div className="relative w-full" style={{ flex: "0 0 55%" }}>
          <Image
            src="/hero-procurement.png"
            alt="Procurement partnership handshake"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            sizes="100vw"
          />
        </div>
        {/* Bottom image — fills the black area below */}
        <div className="relative w-full" style={{ flex: "1 1 auto" }}>
          <Image
            src="/hero-bg-bottom.png"
            alt="Background extension"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>
        {/* Left gradient overlay for text readability */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.70) 30%, rgba(10,10,10,0.15) 52%, rgba(10,10,10,0.0) 62%)",
          }}
        />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.6), transparent)" }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }} />
        {/* Seam blender between top and bottom image */}
        <div className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "calc(55% - 60px)",
            height: "120px",
            background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.0), transparent)",
          }}
        />
      </div>

      {/* ── Top badges — left aligned on desktop ── */}
      <div className="absolute top-24 left-0 right-0 z-10 flex flex-col items-center gap-2 md:flex-row md:items-start md:justify-between md:px-16">

        {/* Available for projects */}
        <div
          ref={(el) => addRef(el, 0)}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border"
          style={{ ...BADGE_STYLE, opacity: 0 }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
          Available for projects
        </div>

        {/* GitHub stats */}
        {gh && (
          <a
            href="https://github.com/AhmedIbrahimofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full px-4 py-2 text-xs font-bold border transition-all duration-200 hover:border-[#89AACC]"
            style={BADGE_STYLE}
          >
            <span className="flex items-center gap-1" style={{ color: "#aaaaaa" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </span>
            <span className="w-px h-3" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span className="flex items-center gap-1" style={{ color: "#89AACC" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {gh.user.followers} followers
            </span>
          </a>
        )}
      </div>

      {/* Content — left-aligned so image people stay visible on right */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-start text-left pt-24 pb-16">

        <h1 ref={nameRef}
          className="font-display italic leading-[0.9] tracking-tight mb-4 max-w-xl"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            color: "#ffffff",
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            opacity: 0,
          }}>
          Ahmed Ibrahim
        </h1>

        <div ref={(el) => addRef(el, 2)}
          className="flex flex-wrap items-center gap-2 mb-5"
          style={{ opacity: 0 }}>
          <span className="text-base md:text-xl font-black uppercase tracking-wider" style={{ color: "#89AACC" }}>
            AI Innovator
          </span>
          <span className="text-base md:text-xl font-thin" style={{ color: "rgba(255,255,255,0.4)" }}>&amp;</span>
          <span className="text-base md:text-xl font-black uppercase tracking-wider" style={{ color: "#ffffff" }}>
            Full Stack Developer
          </span>
        </div>

        <p ref={(el) => addRef(el, 3)}
          className="text-sm md:text-base font-medium mb-3 max-w-lg text-left"
          style={{ color: "rgba(255,255,255,0.6)", opacity: 0, lineHeight: 1.7 }}>
          I build AI-powered web apps and design brands that convert — based in Gujranwala, Pakistan.
        </p>

        <p ref={(el) => addRef(el as HTMLElement | null, 6)}
          className="text-xs font-medium mb-8"
          style={{ color: "rgba(255,255,255,0.35)", opacity: 0 }}>
          📍 Gujranwala, Pakistan · ZehanxTech
        </p>

        <div ref={(el) => addRef(el, 4)}
          className="text-sm md:text-lg font-medium mb-12 h-7 flex items-center"
          style={{ color: "rgba(200,220,255,0.8)", opacity: 0 }}>
          <span>{tagline}</span>
          <span className="ml-0.5 inline-block w-0.5 h-5 align-middle"
            style={{ background: "#89AACC", animation: "blink 1s step-end infinite" }} />
        </div>

        <div ref={(el) => addRef(el as HTMLElement | null, 5)}
          className="inline-flex gap-4 flex-wrap"
          style={{ opacity: 0 }}>

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
              style={{ background: "rgba(137,170,204,0.1)" }} />
            <span className="relative z-10">Let&apos;s Talk 💬</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-16 z-10 flex flex-col items-start gap-2">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>
          Scroll
        </span>
        <div style={{ color: "#89AACC", animation: "bounceArrow 1.8s ease-in-out infinite", fontSize: "1.2rem" }}>↓</div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes neonPulse {
          0%,100%{box-shadow:0 0 20px rgba(137,170,204,0.4),0 0 40px rgba(137,170,204,0.2)}
          50%{box-shadow:0 0 35px rgba(137,170,204,0.7),0 0 70px rgba(137,170,204,0.35)}
        }
        @keyframes bounceArrow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
      `}</style>
    </section>
  );
}
