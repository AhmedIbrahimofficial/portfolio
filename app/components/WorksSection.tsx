"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "../lib/projects";

const SPANS: Record<number, string> = { 1: "md:col-span-7", 2: "md:col-span-5", 3: "md:col-span-5", 4: "md:col-span-7" };

const inView = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function WorksSection() {
  return (
    <section id="work" className="py-12 md:py-20" style={{ background: "#0a0a0a" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div variants={inView} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-end justify-between mb-10 md:mb-14">
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div key={project.id} className={`${SPANS[project.id]} aspect-[4/3]`}
              variants={inView} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.1 }}>
              <Link href={`/projects/${project.slug}`}
                className="group relative block w-full h-full rounded-3xl overflow-hidden cursor-pointer"
                style={{ border: "1px solid #2a2a2a" }}>
                <Image src={project.imageUrl} alt={project.imageAlt} fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i < 2} />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} opacity-50 group-hover:opacity-30 transition-opacity duration-300`} />
                <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }} />

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.65)" }}>
                  <div className="relative">
                    <span className="absolute inset-[-2px] rounded-full gradient-border-animated" />
                    <span className="relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold"
                      style={{ background: "#ffffff", color: "#0a0a0a" }}>
                      View —{" "}
                      <em className="font-display italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        {project.title}
                      </em>
                    </span>
                  </div>
                </div>

                {/* Bottom tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs mb-1 font-bold" style={{ color: "#dddddd" }}>{project.tag}</p>
                    <p className="text-sm font-bold" style={{ color: "#ffffff" }}>{project.title}</p>
                  </div>
                  <span className="text-xs rounded-full px-3 py-1 border opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold"
                    style={{ background: "rgba(0,0,0,0.8)", borderColor: "#444", color: "#ffffff" }}>
                    {project.year}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
