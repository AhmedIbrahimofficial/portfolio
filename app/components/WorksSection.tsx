"use client";

import { motion, type Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PROJECTS } from "../lib/projects";

// Show only first 8 featured projects on homepage
const FEATURED = PROJECTS.slice(0, 8);

const CATEGORIES = ["All", ...Array.from(new Set(FEATURED.map((p) => p.tag)))];

const inView: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.07 },
  }),
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.3 } },
};

export default function WorksSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? FEATURED
    : FEATURED.filter((p) => p.tag === activeCategory);

  return (
    <section id="work" className="py-12 md:py-20" style={{ background: "#0a0a0a" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div variants={inView} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ background: "#333" }} />
              <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: "#ffffff" }}>
              Featured{" "}
              <em className="font-display not-italic italic" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                projects
              </em>
            </h2>
            <p className="text-sm mt-3 max-w-sm font-medium" style={{ color: "#cccccc" }}>
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          <Link href="/projects"
            className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 border font-bold transition-all duration-200 hover:scale-105 flex-shrink-0"
            style={{ borderColor: "#444", color: "#ffffff", background: "#0a0a0a" }}>
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", zIndex: -1 }} />
            <span className="relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 -mx-5 -my-2.5"
              style={{ background: "#0a0a0a" }}>
              View all work →
            </span>
          </Link>
        </motion.div>

        {/* Category filter pills */}
        <motion.div variants={inView} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs rounded-full px-4 py-2 font-bold border transition-all duration-200"
              style={{
                background: activeCategory === cat
                  ? "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)"
                  : "#141414",
                borderColor: activeCategory === cat ? "transparent" : "#2a2a2a",
                color: activeCategory === cat ? "#ffffff" : "#aaaaaa",
                transform: activeCategory === cat ? "scale(1.04)" : "scale(1)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Equal-size grid with AnimatePresence transitions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                  style={{ border: "1px solid #2a2a2a", background: "#111111" }}
                >
                  {/* Image — fixed aspect ratio so all cards are same size */}
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} opacity-50 group-hover:opacity-30 transition-opacity duration-300`} />

                    {/* Year badge */}
                    <span className="absolute top-3 right-3 text-[10px] rounded-full px-2.5 py-1 font-bold border"
                      style={{ background: "rgba(0,0,0,0.75)", borderColor: "rgba(255,255,255,0.12)", color: "#aaaaaa", backdropFilter: "blur(8px)" }}>
                      {project.year}
                    </span>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.65)" }}>
                      <span className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold"
                        style={{ background: "#ffffff", color: "#0a0a0a" }}>
                        View project →
                      </span>
                    </div>
                  </div>

                  {/* Info — fixed height so all cards are uniform */}
                  <div className="p-4 flex flex-col gap-2" style={{ minHeight: "110px" }}>
                    {/* Tag */}
                    <span className="text-[10px] font-bold rounded-full px-2.5 py-0.5 self-start"
                      style={{ background: `${project.accentColor}18`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}>
                      {project.tag}
                    </span>

                    {/* Title */}
                    <p className="text-sm font-bold leading-snug" style={{ color: "#ffffff" }}>
                      {project.title}
                    </p>

                    {/* Stack pills */}
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[9px] rounded-full px-2 py-0.5 font-semibold"
                          style={{ background: "rgba(137,170,204,0.12)", color: "#89AACC", border: "1px solid rgba(137,170,204,0.2)" }}>
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="text-[9px] rounded-full px-2 py-0.5 font-semibold"
                          style={{ background: "rgba(255,255,255,0.06)", color: "#666", border: "1px solid rgba(255,255,255,0.1)" }}>
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile — view all link */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/projects"
            className="inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 border font-bold"
            style={{ borderColor: "#333", color: "#aaaaaa" }}>
            View all work →
          </Link>
        </div>

      </div>
    </section>
  );
}
