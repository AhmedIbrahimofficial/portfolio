"use client";

import { motion, type Variants } from "framer-motion";

const CONTACTS = [
  {
    id: 1,
    label: "LinkedIn",
    handle: "@rafaqat-hussain",
    desc: "Connect professionally & view my career",
    href: "https://www.linkedin.com/in/rafaqat-hussain-5615483a9/",
    color: "#0A66C2",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 2,
    label: "GitHub",
    handle: "@AhmedIbrahimofficial",
    desc: "Explore my open source projects & code",
    href: "https://github.com/AhmedIbrahimofficial",
    color: "#ffffff",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 3,
    label: "Twitter / X",
    handle: "@ZehanxTech",
    desc: "Follow for tech insights & updates",
    href: "https://x.com/ZehanxTech",
    color: "#ffffff",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    id: 4,
    label: "WhatsApp",
    handle: "+92 306 7060074",
    desc: "Chat directly — fastest response",
    href: "https://wa.me/923067060074",
    color: "#25D366",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    id: 5,
    label: "Gmail",
    handle: "funandentertainmentwithus",
    desc: "Send a detailed project inquiry",
    href: "https://mail.google.com/mail/?view=cm&to=funandentertainmentwithus@gmail.com",
    color: "#EA4335",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
  {
    id: 6,
    label: "ZehanxTech",
    handle: "zehanxtech.com",
    desc: "Visit our agency — we build real products",
    href: "https://zehanxtech.com",
    color: "#00d4ff",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardAnim: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ReachOutSection() {
  return (
    <section id="reach-out" className="py-20 md:py-28 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border mb-6"
            style={{
              background: "rgba(0,212,255,0.06)",
              borderColor: "rgba(0,212,255,0.2)",
              color: "#00d4ff",
              backdropFilter: "blur(8px)",
            }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            Open to work &amp; collaborations
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "#ffffff" }}>
            Let&apos;s{" "}
            <em
              className="font-display not-italic italic font-normal"
              style={{ fontFamily: "'Instrument Serif', serif", color: "#00d4ff" }}
            >
              Connect
            </em>
          </h2>
          <p className="text-base font-medium max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Whether you have a project, want to collaborate, or just want to say hello — pick your preferred platform.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {CONTACTS.map((c) => (
            <motion.a
              key={c.id}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardAnim}
              className="group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              whileHover={{
                y: -4,
                borderColor: c.color,
                boxShadow: `0 8px 32px ${c.color}22`,
                background: "rgba(255,255,255,0.06)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${c.color}15`,
                  border: `1px solid ${c.color}30`,
                  color: c.color,
                }}
              >
                {c.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: "#ffffff" }}>{c.label}</p>
                <p className="text-xs font-semibold truncate" style={{ color: c.color }}>{c.handle}</p>
                <p className="text-xs font-medium mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{c.desc}</p>
              </div>

              {/* Arrow */}
              <span
                className="text-base flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                style={{ color: c.color }}
              >
                ↗
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
