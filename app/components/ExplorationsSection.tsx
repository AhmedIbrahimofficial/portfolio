"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { id: 1, emoji: "🌐", label: "Web Platform", color: "from-[#0a1628] to-[#1a2a4a]", rotate: "-2deg" },
  { id: 2, emoji: "🎨", label: "Brand Design", color: "from-[#0d1a0d] to-[#1a3a1a]", rotate: "1.5deg" },
  { id: 3, emoji: "🤖", label: "AI Interface", color: "from-[#1a0d1a] to-[#2a1a3a]", rotate: "-1deg" },
  { id: 4, emoji: "📱", label: "Mobile App", color: "from-[#1a1a0d] to-[#3a3a1a]", rotate: "2deg" },
  { id: 5, emoji: "🔒", label: "Security UI", color: "from-[#1a0d0d] to-[#3a1a1a]", rotate: "-1.5deg" },
  { id: 6, emoji: "⚙️", label: "Dashboard", color: "from-[#0d0d1a] to-[#1a1a3a]", rotate: "1deg" },
];

const COL_A = ITEMS.slice(0, 3);
const COL_B = ITEMS.slice(3, 6);

export default function ExplorationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<(typeof ITEMS)[0] | null>(null);

  useEffect(() => {
    let ctx: import("gsap").Context | undefined;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* Pin the center content */
        if (contentRef.current && sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: contentRef.current,
            pinSpacing: false,
          });
        }

        /* Parallax column A — moves up */
        if (colARef.current) {
          gsap.fromTo(
            colARef.current,
            { y: 120 },
            {
              y: -120,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }

        /* Parallax column B — moves down */
        if (colBRef.current) {
          gsap.fromTo(
            colBRef.current,
            { y: -120 },
            {
              y: 120,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="explorations"
        className="relative"
        style={{ minHeight: "300vh", background: "hsl(0 0% 4%)" }}
      >
        {/* Layer 1 — Pinned center text (z-10) */}
        <div
          ref={contentRef}
          className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-8 h-px" style={{ background: "hsl(0 0% 12%)" }} />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "hsl(0 0% 53%)" }}
            >
              Explorations
            </span>
            <div className="w-8 h-px" style={{ background: "hsl(0 0% 12%)" }} />
          </div>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-4"
            style={{ color: "hsl(0 0% 96%)" }}
          >
            Visual{" "}
            <em
              className="font-display italic not-italic"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              playground
            </em>
          </h2>
          <p className="text-sm max-w-xs mb-8" style={{ color: "hsl(0 0% 53%)" }}>
            A collection of visual experiments and creative explorations.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto group relative inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: "hsl(0 0% 12%)",
              color: "hsl(0 0% 96%)",
              background: "hsl(0 0% 8%)",
            }}
          >
            <span
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
                zIndex: -1,
              }}
            />
            <span
              className="relative z-10 flex items-center gap-2 rounded-full px-6 py-3 -mx-6 -my-3"
              style={{ background: "hsl(0 0% 8%)" }}
            >
              View on Dribbble ↗
            </span>
          </a>
        </div>

        {/* Layer 2 — Parallax columns (z-20, absolute) */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div className="max-w-[1400px] mx-auto h-full flex items-center px-6 md:px-16">
            <div className="grid grid-cols-2 gap-12 md:gap-40 w-full">
              {/* Column A */}
              <div ref={colARef} className="flex flex-col gap-8 items-end">
                {COL_A.map((item) => (
                  <button
                    key={item.id}
                    className="pointer-events-auto group relative aspect-square w-full max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                    style={{ border: "1px solid hsl(0 0% 12%)" }}
                    onClick={() => setLightbox(item)}
                    aria-label={`View ${item.label}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-5xl md:text-7xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 select-none"
                        suppressHydrationWarning
                        aria-hidden
                      >
                        {item.emoji}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="text-xs rounded-full px-3 py-1"
                        style={{ background: "hsl(0 0% 4% / 0.8)", color: "hsl(0 0% 70%)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Column B */}
              <div ref={colBRef} className="flex flex-col gap-8 items-start mt-32">
                {COL_B.map((item) => (
                  <button
                    key={item.id}
                    className="pointer-events-auto group relative aspect-square w-full max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                    style={{ border: "1px solid hsl(0 0% 12%)" }}
                    onClick={() => setLightbox(item)}
                    aria-label={`View ${item.label}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-5xl md:text-7xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 select-none"
                        suppressHydrationWarning
                        aria-hidden
                      >
                        {item.emoji}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="text-xs rounded-full px-3 py-1"
                        style={{ background: "hsl(0 0% 4% / 0.8)", color: "hsl(0 0% 70%)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "hsl(0 0% 4% / 0.95)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className={`relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${lightbox.color}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="text-8xl" suppressHydrationWarning aria-hidden>{lightbox.emoji}</span>
              <p className="text-lg font-medium" style={{ color: "hsl(0 0% 90%)" }}>
                {lightbox.label}
              </p>
            </div>
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-200"
              style={{ background: "hsl(0 0% 12%)", color: "hsl(0 0% 70%)" }}
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
