"use client";

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CircuitBackground from "../components/CircuitBackground";
import { useGitHub } from "../lib/useGitHub";

const skillCategories = [
  { category: "Frontend Development", icon: "🖥️", skills: [{ name: "HTML5", level: 95 }, { name: "CSS3 / Tailwind", level: 90 }, { name: "JavaScript", level: 92 }, { name: "React.js", level: 88 }, { name: "Next.js", level: 85 }, { name: "TypeScript", level: 80 }] },
  { category: "Backend Development", icon: "⚙️", skills: [{ name: "PHP", level: 85 }, { name: "Node.js", level: 78 }, { name: "REST APIs", level: 88 }, { name: "Database Design", level: 82 }, { name: "Admin Dashboards", level: 85 }] },
  { category: "Artificial Intelligence", icon: "🤖", skills: [{ name: "AI Integration", level: 85 }, { name: "Prompt Engineering", level: 90 }, { name: "AI-Assisted Development", level: 92 }, { name: "Chatbot Development", level: 80 }] },
  { category: "Graphic Design", icon: "🎨", skills: [{ name: "UI/UX Design", level: 88 }, { name: "Social Media Creatives", level: 90 }, { name: "Digital Advertising", level: 82 }] },
  { category: "Cybersecurity", icon: "🔒", skills: [{ name: "Web Security", level: 78 }, { name: "Secure Coding", level: 80 }, { name: "Vulnerability Assessment", level: 72 }] },
  { category: "Other Skills", icon: "🚀", skills: [{ name: "Software Development", level: 88 }, { name: "Mobile App Development", level: 75 }, { name: "SaaS Development", level: 78 }, { name: "Software Testing", level: 72 }, { name: "Android Development", level: 70 }] },
];

const techStack = ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "PHP", "Node.js", "Tailwind CSS", "MySQL", "MongoDB", "Git", "Figma", "Adobe XD", "Photoshop", "REST API", "GraphQL", "Docker", "Linux", "Python"];

// Language color map
const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572A5",
  PHP: "#4F5D95", HTML: "#e34c26", CSS: "#563d7c", "C++": "#f34b7d",
  Java: "#b07219", Dart: "#00B4AB", Swift: "#ffac45", Kotlin: "#A97BFF",
  Go: "#00ADD8", Rust: "#dea584", Ruby: "#701516", Shell: "#89e051",
  Vue: "#41b883", Svelte: "#ff3e00", "C#": "#178600",
};

function AnimatedBar({ percent, color }: { percent: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(percent), 100);
    return () => clearTimeout(t);
  }, [percent]);
  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#2a2a2a" }}>
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, background: color, boxShadow: `0 0 8px ${color}66` }}
      />
    </div>
  );
}

export default function SkillsPage() {
  const { data: gh, loading: ghLoading } = useGitHub();

  return (
    <div style={{ background: "#050810", minHeight: "100vh", position: "relative" }}>
      {/* Animated circuit board background */}
      <CircuitBackground />

      {/* Content above background */}
      <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Skills & Expertise</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display italic leading-[0.95] tracking-tight mb-6"
            style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            My <em>Toolkit</em>
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed font-medium" style={{ color: "#cccccc" }}>
            A comprehensive overview of the technologies, tools, and disciplines I&apos;ve mastered over 6+ years of professional development.
          </p>
        </div>
      </section>

      {/* GitHub Language Stats — Live */}
      <section className="py-12 px-6" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>
              Live from GitHub
            </span>
            <span className="text-[10px] rounded-full px-2 py-0.5 font-bold"
              style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
              ● LIVE
            </span>
          </div>
          <h2 className="text-xl font-bold mb-6" style={{ color: "#ffffff" }}>
            Languages by{" "}
            <em className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
              repository usage
            </em>
          </h2>

          {ghLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 rounded-xl animate-pulse" style={{ background: "#141414" }} />
              ))}
            </div>
          ) : gh?.languages.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gh.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: LANG_COLORS[lang.name] || "#89AACC" }} />
                      <span className="text-xs font-semibold" style={{ color: "#dddddd" }}>{lang.name}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#aaaaaa" }}>{lang.percent}%</span>
                  </div>
                  <AnimatedBar
                    percent={lang.percent}
                    color={LANG_COLORS[lang.name] || "#89AACC"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: "#555" }}>Could not load GitHub language data.</p>
          )}
        </div>
      </section>

      {/* Tech Stack Pills */}
      <section className="py-12 px-6" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.2em] mb-6 font-bold" style={{ color: "#aaaaaa" }}>Technologies I work with</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span key={tech}
                className="text-xs rounded-full px-4 py-2 border font-semibold transition-all duration-200 hover:border-[#89AACC] hover:text-white cursor-default"
                style={{ background: "#141414", borderColor: "#2a2a2a", color: "#dddddd" }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((cat) => (
              <div key={cat.category} className="p-6 rounded-2xl border" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl" suppressHydrationWarning aria-hidden>{cat.icon}</span>
                  <h3 className="text-sm font-bold" style={{ color: "#ffffff" }}>{cat.category}</h3>
                </div>
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold" style={{ color: "#dddddd" }}>{skill.name}</span>
                        <span className="text-xs font-bold" style={{ color: "#aaaaaa" }}>{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#2a2a2a" }}>
                        <div className="h-full rounded-full" style={{
                          width: `${skill.level}%`,
                          background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
                          boxShadow: "0 0 8px rgba(137, 170, 204, 0.4)",
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Services via ZehanxTech</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#ffffff" }}>
            What I can <span className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>build for you</span>
          </h2>
          <p className="text-sm mb-8 max-w-lg font-medium" style={{ color: "#cccccc" }}>
            Technical partner for founders — not just code, but real products shipped fast.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: "🌐", label: "Web Application Development" },
              { icon: "📱", label: "Mobile App Development (Android / iOS)" },
              { icon: "🤖", label: "AI & Machine Learning Solutions" },
              { icon: "⚙️", label: "Automation Systems for Businesses" },
              { icon: "🏗️", label: "Full-Stack Software Engineering" },
              { icon: "💬", label: "AI Chatbots & Intelligent Automation" },
              { icon: "📊", label: "Business Intelligence Dashboards" },
              { icon: "🛒", label: "E-Commerce Platforms" },
              { icon: "🏢", label: "School / Hospital / Logistics Systems" },
              { icon: "🔗", label: "CRM & Internal Business Tools" },
              { icon: "🚀", label: "MVP Development (~21-Day Builds)" },
              { icon: "☁️", label: "SaaS Product Engineering" },
            ].map((service) => (
              <div key={service.label}
                className="flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:border-[#89AACC] hover:-translate-y-0.5"
                style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                <span className="text-base flex-shrink-0" suppressHydrationWarning aria-hidden>{service.icon}</span>
                <span className="text-xs leading-relaxed font-semibold" style={{ color: "#dddddd" }}>{service.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      </div>{/* end content wrapper */}
    </div>
  );
}
