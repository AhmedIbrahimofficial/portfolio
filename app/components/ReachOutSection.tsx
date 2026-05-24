"use client";

import { motion, type Variants } from "framer-motion";

const CONTACTS = [
  {
    id: 1,
    label: "LinkedIn",
    handle: "@rafaqat-hussain",
    desc: "Connect professionally",
    href: "https://www.linkedin.com/in/rafaqat-hussain-5615483a9/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.12)",
    border: "rgba(10,102,194,0.3)",
  },
  {
    id: 2,
    label: "Twitter / X",
    handle: "@ZehanxTech",
    desc: "Follow for updates",
    href: "https://x.com/ZehanxTech",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: "#ffffff",
    bg: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.2)",
  },
  {
    id: 3,
    label: "GitHub",
    handle: "@AhmedIbrahimofficial",
    desc: "See my code & projects",
    href: "https://github.com/AhmedIbrahimofficial",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: "#ffffff",
    bg: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.2)",
  },
  {
    id: 4,
    label: "Gmail",
    handle: "funandentertainmentwithus",
    desc: "Send me an email",
    href: "https://mail.google.com/mail/?view=cm&to=funandentertainmentwithus@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
    color: "#EA4335",
    bg: "rgba(234,67,53,0.12)",
    border: "rgba(234,67,53,0.3)",
  },
  {
    id: 5,
    label: "ZehanxTech",
    handle: "zehanxtech.com",
    desc: "Visit our agency website",
    href: "https://zehanxtech.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    color: "#89AACC",
    bg: "rgba(137,170,204,0.12)",
    border: "rgba(137,170,204,0.3)",
  },
  {
    id: 6,
    label: "WhatsApp",
    handle: "+92 306 7060074",
    desc: "Chat with me directly",
    href: "https://wa.me/923067060074",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: "#25D366",
    bg: "rgba(37,211,102,0.12)",
    border: "rgba(37,211,102,0.3)",
  },
];

const inView: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ReachOutSection() {
  return (
    <section id="reach-out" className="py-16 md:py-24" style={{ background: "#0d0d0d" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div variants={inView} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>
              Connect
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-3" style={{ color: "#ffffff" }}>
            Reach out{" "}
            <em className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
              to me
            </em>
          </h2>
          <p className="text-sm md:text-base font-medium max-w-lg" style={{ color: "#cccccc" }}>
            Whether you have a project in mind, want to collaborate, or just want to say hello — I&apos;m always open to a conversation.
          </p>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTACTS.map((contact, i) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={inView}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "#141414",
                borderColor: "#2a2a2a",
              }}
              whileHover={{ borderColor: contact.border }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: contact.bg, border: `1px solid ${contact.border}`, color: contact.color }}
              >
                {contact.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: "#ffffff" }}>{contact.label}</p>
                <p className="text-xs font-semibold truncate" style={{ color: contact.color }}>{contact.handle}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: "#888888" }}>{contact.desc}</p>
              </div>

              {/* Arrow */}
              <span
                className="text-base opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0 group-hover:translate-x-1"
                style={{ color: contact.color }}
              >
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
