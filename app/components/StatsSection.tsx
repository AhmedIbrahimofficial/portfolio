"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "6+",   label: "Years Experience",  sub: "Since 2020" },
  { value: "95+",  label: "Projects Done",      sub: "Across industries" },
  { value: "100%", label: "Satisfied Clients",  sub: "Every single one" },
];

const inView = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.15 },
  }),
};

export default function StatsSection() {
  return (
    <section id="stats" className="py-16 md:py-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="w-full h-px mb-16" style={{ background: "#2a2a2a" }} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-6 text-center sm:text-left">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} custom={i} variants={inView} initial="hidden"
              whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col items-center sm:items-start gap-2">
              <span className="font-display italic" style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontFamily: "'Instrument Serif', serif",
                background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}>
                {stat.value}
              </span>
              <p className="text-base font-bold" style={{ color: "#ffffff" }}>{stat.label}</p>
              <p className="text-sm font-medium" style={{ color: "#aaaaaa" }}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-px mt-16" style={{ background: "#2a2a2a" }} />
      </div>
    </section>
  );
}
