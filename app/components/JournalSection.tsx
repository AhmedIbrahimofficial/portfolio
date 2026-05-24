"use client";

import { motion, type Variants } from "framer-motion";

const ENTRIES = [
  { id: 1, title: "Building AI-Powered Web Platforms in 2025", tag: "AI & Dev",  readTime: "5 min read", date: "May 2025", emoji: "🤖" },
  { id: 2, title: "Why Every Business Needs a Custom Digital Identity", tag: "Design",   readTime: "4 min read", date: "Apr 2025", emoji: "🎨" },
  { id: 3, title: "From Idea to Launch: My Full-Stack Workflow",        tag: "Process",  readTime: "6 min read", date: "Mar 2025", emoji: "⚙️" },
  { id: 4, title: "Cybersecurity Basics Every Developer Should Know",   tag: "Security", readTime: "7 min read", date: "Feb 2025", emoji: "🔒" },
];

const inView: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function JournalSection() {
  return (
    <section id="journal" className="py-16 md:py-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div variants={inView} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px" style={{ background: "#333" }} />
              <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Journal</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: "#ffffff" }}>
              Recent{" "}
              <em className="font-display not-italic italic" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
                thoughts
              </em>
            </h2>
            <p className="text-sm mt-3 max-w-sm font-medium" style={{ color: "#cccccc" }}>
              Ideas, learnings, and perspectives from the field.
            </p>
          </div>

          <a href="#" className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 border font-bold transition-all duration-200 hover:scale-105 flex-shrink-0"
            style={{ borderColor: "#444", color: "#ffffff", background: "#0a0a0a" }}>
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", zIndex: -1 }} />
            <span className="relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 -mx-5 -my-2.5"
              style={{ background: "#0a0a0a" }}>
              View all →
            </span>
          </a>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-3">
          {ENTRIES.map((entry, i) => (
            <motion.a key={entry.id} href="#"
              className="group flex items-center gap-4 sm:gap-6 p-4 rounded-[40px] sm:rounded-full border transition-all duration-300"
              style={{ background: "#141414", borderColor: "#2a2a2a" }}
              variants={inView} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }}
              whileHover={{ borderColor: "#444" }}>

              {/* Emoji */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
                style={{ background: "#222222" }} suppressHydrationWarning>
                <span suppressHydrationWarning aria-hidden>{entry.emoji}</span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: "#ffffff" }}>{entry.title}</p>
                <p className="text-xs mt-0.5 font-semibold" style={{ color: "#aaaaaa" }}>{entry.tag}</p>
              </div>

              {/* Meta */}
              <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                <span className="text-xs font-semibold" style={{ color: "#aaaaaa" }}>{entry.readTime}</span>
                <span className="text-xs rounded-full px-3 py-1 border font-semibold"
                  style={{ background: "#0a0a0a", borderColor: "#333", color: "#dddddd" }}>
                  {entry.date}
                </span>
              </div>

              <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 font-bold"
                style={{ color: "#89AACC" }}>→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
