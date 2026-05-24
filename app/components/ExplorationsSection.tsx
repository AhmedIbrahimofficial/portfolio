"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    id: 1,
    label: "Web Platform",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    imageAlt: "Web development platform with code on screen",
    color: "from-[#0a1628] to-[#1a2a4a]",
  },
  {
    id: 2,
    label: "Brand Design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    imageAlt: "Brand design with color swatches and logo",
    color: "from-[#0d1a0d] to-[#1a3a1a]",
  },
  {
    id: 3,
    label: "AI Interface",
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    imageAlt: "AI interface with neural network visualization",
    color: "from-[#1a0d1a] to-[#2a1a3a]",
  },
  {
    id: 4,
    label: "Mobile App",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    imageAlt: "Mobile app development on smartphone",
    color: "from-[#1a1a0d] to-[#3a3a1a]",
  },
  {
    id: 5,
    label: "Security UI",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    imageAlt: "Cybersecurity interface with lock and shield",
    color: "from-[#1a0d0d] to-[#3a1a1a]",
  },
  {
    id: 6,
    label: "Dashboard",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    imageAlt: "Analytics dashboard with charts and graphs",
    color: "from-[#0d0d1a] to-[#1a1a3a]",
  },
];

const COL_A = ITEMS.slice(0, 3);
const COL_B = ITEMS.slice(3, 6);

export default function ExplorationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colARef    = useRef<HTMLDivElement>(null);
  const colBRef    = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<(typeof ITEMS)[0] | null>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["default"]["context"]> | undefined;

    const init = async () => {
      const { gsap }        = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (contentRef.current && sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: contentRef.current,
            pinSpacing: false,
          });
        }
        if (colARef.current) {
          gsap.fromTo(colARef.current, { y: 120 }, {
            y: -120, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
        }
        if (colBRef.current) {
          gsap.fromTo(colBRef.current, { y: -120 }, {
            y: 120, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
        }
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="explorations" className="relative"
        style={{ minHeight: "300vh", background: "#0a0a0a", isolation: "isolate" }}>

        {/* Layer 1 — Pinned center text */}
        <div ref={contentRef}
          className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Explorations</span>
            <div className="w-8 h-px" style={{ background: "#333" }} />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4" style={{ color: "#ffffff" }}>
            Visual{" "}
            <em className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>playground</em>
          </h2>
          <p className="text-sm max-w-xs mb-8 font-medium" style={{ color: "#cccccc" }}>
            A collection of visual experiments and creative explorations.
          </p>
        </div>

        {/* Layer 2 — Parallax columns */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div className="max-w-[1400px] mx-auto h-full flex items-center px-6 md:px-16">
            <div className="grid grid-cols-2 gap-6 md:gap-20 w-full">

              {/* Column A */}
              <div ref={colARef} className="flex flex-col gap-6 items-end">
                {COL_A.map((item) => (
                  <button key={item.id}
                    className="pointer-events-auto group relative aspect-square w-full max-w-[260px] md:max-w-[300px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                    style={{ border: "1px solid #2a2a2a" }}
                    onClick={() => setLightbox(item)}
                    aria-label={`View ${item.label}`}>
                    <Image src={item.imageUrl} alt={item.imageAlt} fill
                      sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs rounded-full px-3 py-1 font-bold"
                        style={{ background: "rgba(0,0,0,0.75)", color: "#ffffff", backdropFilter: "blur(4px)" }}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Column B */}
              <div ref={colBRef} className="flex flex-col gap-6 items-start mt-32">
                {COL_B.map((item) => (
                  <button key={item.id}
                    className="pointer-events-auto group relative aspect-square w-full max-w-[260px] md:max-w-[300px] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                    style={{ border: "1px solid #2a2a2a" }}
                    onClick={() => setLightbox(item)}
                    aria-label={`View ${item.label}`}>
                    <Image src={item.imageUrl} alt={item.imageAlt} fill
                      sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-40 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs rounded-full px-3 py-1 font-bold"
                        style={{ background: "rgba(0,0,0,0.75)", color: "#ffffff", backdropFilter: "blur(4px)" }}>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightbox(null)}>
          <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden"
            style={{ border: "1px solid #333" }}
            onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox.imageUrl} alt={lightbox.imageAlt} fill
              sizes="600px" className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-5"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
              <p className="text-base font-bold" style={{ color: "#ffffff" }}>{lightbox.label}</p>
            </div>
            <button className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200"
              style={{ background: "rgba(0,0,0,0.7)", color: "#ffffff", border: "1px solid #444" }}
              onClick={() => setLightbox(null)} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
