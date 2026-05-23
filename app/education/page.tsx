import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const subjects = [
  { name: "Cybersecurity",         icon: "🔒", desc: "Network security, ethical hacking, and secure coding practices" },
  { name: "Web Development",       icon: "🌐", desc: "Full-stack development, modern frameworks, and deployment" },
  { name: "Artificial Intelligence", icon: "🤖", desc: "Machine learning fundamentals, AI applications, and neural networks" },
  { name: "Database Systems",      icon: "🗄️", desc: "Relational databases, SQL, and data modeling" },
  { name: "Software Engineering",  icon: "⚙️", desc: "SDLC, agile methodologies, and software architecture" },
  { name: "Computer Networks",     icon: "📡", desc: "Networking protocols, TCP/IP, and network administration" },
];

const selfLearning = [
  { topic: "React.js & Next.js",          source: "Online Courses & Documentation",    year: "2021" },
  { topic: "AI & Machine Learning",        source: "Coursera, YouTube, Research Papers", year: "2022" },
  { topic: "Cybersecurity Fundamentals",   source: "TryHackMe, HackTheBox",             year: "2023" },
  { topic: "UI/UX Design",                 source: "Figma Academy, Design Courses",      year: "2020" },
  { topic: "TypeScript",                   source: "Official Docs & Projects",           year: "2023" },
  { topic: "SaaS Architecture",            source: "Industry Blogs & Projects",          year: "2024" },
];

export default function EducationPage() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Education</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display italic leading-[0.95] tracking-tight mb-6"
            style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Academic <em>Background</em>
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed font-medium" style={{ color: "#cccccc" }}>
            Formal education combined with continuous self-learning — always staying ahead of the curve in technology and design.
          </p>
        </div>
      </section>

      {/* Main Education Card */}
      <section className="py-16 px-6" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Formal Education</span>
          </div>
          <div className="rounded-2xl border p-8 relative overflow-hidden" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #89AACC, transparent)" }} />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-4 border font-semibold"
                  style={{ background: "rgba(137,170,204,0.1)", borderColor: "rgba(137,170,204,0.3)", color: "#89AACC" }}>
                  🎓 Diploma
                </div>
                <h2 className="text-2xl md:text-3xl font-display italic mb-2"
                  style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif" }}>
                  High School Diploma
                </h2>
                <p className="text-base font-bold mb-1" style={{ color: "#89AACC" }}>Army Public School (APSACS)</p>
                <p className="text-sm mb-4 font-medium" style={{ color: "#cccccc" }}>
                  Field of Study: <span style={{ color: "#ffffff", fontWeight: 700 }}>Artificial Intelligence</span>
                </p>
                <p className="text-sm leading-relaxed font-medium" style={{ color: "#cccccc" }}>
                  Completed a comprehensive High School Diploma with a focus on Artificial Intelligence at Army Public School (APSACS) — one of Pakistan&apos;s premier educational institutions. The program covered cutting-edge topics including cybersecurity, web development, and AI fundamentals.
                </p>
              </div>
              <div className="space-y-4">
                {[{ label: "Duration", value: "May 2024 – May 2025" }, { label: "Grade", value: "Grade 8" }, { label: "Institution", value: "APSACS" }, { label: "Field", value: "Artificial Intelligence" }].map((item) => (
                  <div key={item.label}>
                    <span className="text-[10px] uppercase tracking-[0.2em] block mb-1 font-bold" style={{ color: "#666666" }}>{item.label}</span>
                    <span className="text-sm font-semibold" style={{ color: "#ffffff" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
            Core <span className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>Curriculum</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((subject) => (
              <div key={subject.name} className="p-6 rounded-2xl border transition-all duration-300 hover:border-[#89AACC]/50 hover:-translate-y-1"
                style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                <div className="text-2xl mb-3" suppressHydrationWarning aria-hidden>{subject.icon}</div>
                <h3 className="text-sm font-bold mb-2" style={{ color: "#ffffff" }}>{subject.name}</h3>
                <p className="text-xs leading-relaxed font-medium" style={{ color: "#cccccc" }}>{subject.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self Learning */}
      <section className="py-16 px-6" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
            Self-taught <span className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>expertise</span>
          </h2>
          <div className="space-y-3">
            {selfLearning.map((item, idx) => (
              <div key={item.topic} className="flex items-center justify-between p-5 rounded-xl border transition-all duration-200 hover:border-[#89AACC]/50"
                style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono w-6 text-right font-bold" style={{ color: "#555555" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#ffffff" }}>{item.topic}</p>
                    <p className="text-xs mt-0.5 font-medium" style={{ color: "#aaaaaa" }}>{item.source}</p>
                  </div>
                </div>
                <span className="text-xs rounded-full px-3 py-1 border flex-shrink-0 font-semibold"
                  style={{ background: "#0a0a0a", borderColor: "#333", color: "#dddddd" }}>
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border p-8 md:p-12 text-center relative overflow-hidden" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, #89AACC, transparent 70%)" }} />
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-display italic leading-relaxed max-w-2xl mx-auto"
                style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif" }}>
                &ldquo;Education never stops. Every project is a classroom, every problem is a lesson.&rdquo;
              </p>
              <p className="text-sm mt-6 font-semibold" style={{ color: "#aaaaaa" }}>— Ahmed Ibrahim</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
