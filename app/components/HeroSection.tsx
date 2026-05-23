"use client";

import { useEffect, useRef, useState } from "react";
import HlsVideo from "./HlsVideo";

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const blurRefs   = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;
    const init = async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (nameRef.current) {
          tl.fromTo(nameRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 });
        }
        const blurEls = blurRefs.current.filter(Boolean);
        if (blurEls.length) {
          tl.fromTo(blurEls,
            { opacity: 0, filter: "blur(8px)", y: 16 },
            { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, stagger: 0.1 },
            "<0.2"
          );
        }
      }, sectionRef);
    };
    init();
    return () => ctx?.revert();
  }, []);

  const addBlurRef = (el: HTMLElement | null, i: number) => { blurRefs.current[i] = el; };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <HlsVideo overlayOpacity="bg-black/40" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, hsl(0 0% 4%), transparent)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Eyebrow */}
        <p ref={(el) => addBlurRef(el, 0)}
          className="text-xs uppercase tracking-[0.3em] mb-8 font-semibold"
          style={{ color: "#aaaaaa" }}>
          COLLECTION &apos;26
        </p>

        {/* Name */}
        <h1 ref={nameRef}
          className="font-display italic leading-[0.9] tracking-tight mb-6"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", color: "#ffffff", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
          Ahmed Ibrahim
        </h1>

        {/* Role line */}
        <p ref={(el) => addBlurRef(el, 1)}
          className="text-base md:text-lg mb-6 font-medium"
          style={{ color: "#dddddd" }}>
          A{" "}
          <span key={roleIndex} className="animate-role-fade-in inline-block font-display italic"
            style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif" }}>
            {ROLES[roleIndex]}
          </span>{" "}
          based in Gujranwala, Pakistan.
        </p>

        {/* Description */}
        <p ref={(el) => addBlurRef(el, 2)}
          className="text-sm md:text-base max-w-md mb-12 font-medium"
          style={{ color: "#cccccc", lineHeight: 1.75 }}>
          Designing seamless digital interactions by focusing on the unique
          nuances which bring systems to life.
        </p>

        {/* CTA Buttons */}
        <div ref={(el) => addBlurRef(el as HTMLElement | null, 3)}
          className="inline-flex gap-4 flex-wrap justify-center">

          {/* See Works */}
          <a href="#work"
            className="group relative rounded-full text-sm px-7 py-3.5 font-bold transition-all duration-200 hover:scale-105"
            style={{ background: "#ffffff", color: "#0a0a0a" }}
            onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", zIndex: -1 }} />
            <span className="relative z-10">See Works</span>
          </a>

          {/* Reach out */}
          <a href="mailto:funandentertainmentwithus@gmail.com"
            className="group relative rounded-full text-sm px-7 py-3.5 font-bold border-2 transition-all duration-200 hover:scale-105"
            style={{ borderColor: "#555555", color: "#ffffff", background: "transparent" }}>
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", zIndex: -1 }} />
            <span className="relative z-10">Reach out...</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#888888" }}>Scroll</span>
        <div className="w-px h-10 overflow-hidden relative" style={{ background: "#333333" }}>
          <div className="absolute top-0 left-0 w-full h-1/2 animate-scroll-down"
            style={{ background: "linear-gradient(180deg, #89AACC, #4E85BF)" }} />
        </div>
      </div>
    </section>
  );
}
