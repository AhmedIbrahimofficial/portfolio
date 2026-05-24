"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HexBackground from "../components/HexBackground";

const experiences = [
  {
    id: 1, role: "Full Stack Engineer", company: "ZehanxTech", type: "Full-time",
    duration: "January 2020 – Present", period: "6 years 5 months", location: "Remote", current: true,
    description: "Leading full-stack web development projects at ZehanxTech — building business websites, custom platforms, admin dashboards, and high-converting landing pages for clients across various industries.",
    responsibilities: ["Architecting and developing full-stack web applications", "Building custom admin dashboards and CMS platforms", "Integrating third-party APIs and services", "Ensuring mobile-first, responsive, SEO-optimized delivery", "Managing client relationships and project timelines"],
    skills: ["React.js", "Next.js", "PHP", "JavaScript", "MySQL", "REST APIs"],
  },
  {
    id: 2, role: "Artificial Intelligence Engineer", company: "ZehanxTech", type: "Part-time",
    duration: "January 2020 – Present", period: "6 years 5 months", location: "Remote", current: true,
    description: "Developing AI-powered features and platforms, integrating machine learning capabilities into web applications, and building intelligent automation solutions.",
    responsibilities: ["Designing and building AI-driven web platforms", "Integrating AI APIs and language models into products", "Developing chatbots and intelligent assistant experiences", "Prompt engineering and AI workflow optimization", "Research and implementation of emerging AI technologies"],
    skills: ["AI Integration", "Prompt Engineering", "Chatbot Dev", "Python", "API Design"],
  },
  {
    id: 3, role: "Full Stack Developer", company: "Danish Kada", type: "Part-time",
    duration: "March 2024 – April 2025", period: "1 year 2 months", location: "Gujranwala, Punjab, Pakistan (Remote)", current: false,
    description: "Worked as a Full Stack Developer and Graphic Designer, building web applications and creating visual assets for the business.",
    responsibilities: ["Developing and maintaining web applications", "Creating brand identity and graphic design assets", "Building responsive UI/UX interfaces", "Collaborating with the team on product features"],
    skills: ["Web Development", "Graphic Design", "UI/UX", "JavaScript", "PHP"],
  },
];

export default function ExperiencePage() {
  return (
    <div style={{ background: "#020818", minHeight: "100vh", position: "relative" }}>
      <HexBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Work Experience</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display italic leading-[0.95] tracking-tight mb-6"
            style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            My <em>Journey</em>
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed font-medium" style={{ color: "#cccccc" }}>
            6+ years of professional experience building digital products, leading development teams, and delivering results for clients worldwide.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6" style={{ background: "rgba(0,0,0,0.0)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[{ value: "6+", label: "Years Experience" }, { value: "3", label: "Roles Held" }, { value: "2", label: "Companies" }, { value: "100%", label: "Remote Capable" }].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-display italic" style={{ fontFamily: "'Instrument Serif', serif", background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {stat.value}
              </span>
              <span className="text-xs font-bold" style={{ color: "#cccccc" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px hidden sm:block" style={{ background: "#2a2a2a" }} />
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative sm:pl-16">
                  <div className="absolute left-2 md:left-4 top-6 w-4 h-4 rounded-full border-2 hidden sm:flex items-center justify-center"
                    style={{ background: exp.current ? "linear-gradient(135deg, #89AACC, #4E85BF)" : "#141414", borderColor: exp.current ? "#89AACC" : "#333" }}>
                    {exp.current && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </div>

                  <div className="rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:border-[#89AACC]/40"
                    style={{ background: "rgba(5,10,30,0.55)", backdropFilter: "blur(12px)", borderColor: "rgba(137,170,204,0.15)" }}>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg font-bold" style={{ color: "#ffffff" }}>{exp.role}</h3>
                          {exp.current && (
                            <span className="text-[10px] rounded-full px-2 py-0.5 font-bold"
                              style={{ background: "rgba(137,170,204,0.15)", color: "#89AACC", border: "1px solid rgba(137,170,204,0.3)" }}>
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold" style={{ color: "#89AACC" }}>{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs mb-1 font-semibold" style={{ color: "#cccccc" }}>{exp.duration}</p>
                        <p className="text-xs font-medium" style={{ color: "#aaaaaa" }}>{exp.period} · {exp.type}</p>
                      </div>
                    </div>

                    <p className="text-xs font-semibold mb-4" style={{ color: "#aaaaaa" }}>📍 {exp.location}</p>
                    <p className="text-sm leading-relaxed mb-5 font-medium" style={{ color: "#dddddd" }}>{exp.description}</p>

                    <h4 className="text-xs uppercase tracking-[0.15em] mb-3 font-bold" style={{ color: "#aaaaaa" }}>Key Responsibilities</h4>
                    <ul className="space-y-2 mb-5">
                      {exp.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#89AACC" }} />
                          <span className="text-xs leading-relaxed font-medium" style={{ color: "#dddddd" }}>{r}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="text-xs rounded-full px-3 py-1 border font-semibold"
                          style={{ background: "rgba(137,170,204,0.08)", borderColor: "rgba(137,170,204,0.2)", color: "#89AACC" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
