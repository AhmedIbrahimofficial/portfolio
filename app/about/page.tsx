import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>About Me</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display italic leading-[0.95] tracking-tight mb-8"
            style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Ahmed Ibrahim
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Bio */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs mb-6 border font-semibold"
                style={{ background: "#161616", borderColor: "#333", color: "#cccccc" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
                Open to Work · Hybrid &amp; Remote
              </div>
              <p className="text-base md:text-lg leading-relaxed mb-5 font-medium" style={{ color: "#dddddd" }}>
                I&apos;m an <strong style={{ color: "#ffffff" }}>AI Innovator</strong> and{" "}
                <strong style={{ color: "#ffffff" }}>Full Stack Web Developer</strong> based in
                Gujranwala, Punjab, Pakistan — with 6+ years of professional experience in the digital services industry.
              </p>
              <p className="text-base leading-relaxed mb-5 font-medium" style={{ color: "#cccccc" }}>
                I&apos;ve worked with startups, small businesses, and growing organizations to build
                digital products that actually work. My approach: understand the business first, then
                build something custom — not generic.
              </p>
              <p className="text-base leading-relaxed font-medium" style={{ color: "#cccccc" }}>
                I use AI-assisted tools to stay efficient, and I manage projects from start to finish —
                from the first wireframe to the final deployment.
              </p>
            </div>

            {/* Info card */}
            <div className="rounded-2xl border p-6 space-y-5" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
              {[
                { label: "Name",        value: "Ahmed Ibrahim" },
                { label: "Title",       value: "AI Innovator | Full Stack Web Developer" },
                { label: "Location",    value: "Gujranwala, Punjab, Pakistan" },
                { label: "Company",     value: "ZehanxTech" },
                { label: "Email",       value: "funandentertainmentwithus@gmail.com", isLink: true },
                { label: "Work Mode",   value: "Hybrid & Remote" },
                { label: "Connections", value: "411 LinkedIn · 425 Followers" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: "#666666" }}>{item.label}</span>
                  {item.isLink ? (
                    <a href="https://mail.google.com/mail/?view=cm&to=funandentertainmentwithus@gmail.com"
                      target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold hover:text-[#89AACC] transition-colors"
                      style={{ color: "#ffffff" }}>{item.value}</a>
                  ) : (
                    <span className="text-sm font-semibold" style={{ color: "#ffffff" }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Web Dev Expertise */}
      <section className="py-16 px-6" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
            Web Development <span className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>Expertise</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Business & corporate websites",
              "Portfolio websites",
              "Custom web platforms with admin dashboards",
              "High-converting landing pages",
              "API integrations & third-party services",
              "Mobile-first, responsive, SEO-optimized websites",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl border"
                style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                <span className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", color: "#0a0a0a" }}>✓</span>
                <span className="text-sm font-semibold" style={{ color: "#dddddd" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZehanxTech Services */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#ffffff" }}>
            ZehanxTech <span className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>Services</span>
          </h2>
          <p className="text-sm mb-8 max-w-xl font-medium" style={{ color: "#cccccc" }}>
            Not just developers — a technical partner for founders, shipping real products fast.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: "🔧", title: "Core Engineering", items: ["Web application development (custom websites & SaaS)", "Mobile app development (Android / iOS)", "Full-stack software engineering (backend + frontend)", "Automation systems for businesses"] },
              { icon: "🤖", title: "AI & Advanced Tech", items: ["AI-powered chatbots & automation systems", "Machine learning model integration", "Business intelligence dashboards", "AI-first SaaS product development"] },
              { icon: "🏢", title: "Business Solutions", items: ["E-commerce platforms", "School / hospital / logistics management systems", "CRM & internal business tools", "Workflow automation for companies"] },
              { icon: "🚀", title: "Product & Startup Building", items: ["MVP development in ~21-day build cycles", "SaaS product engineering for founders", "Startup idea → prototype → deployment", "Long-term technical partnership"] },
            ].map((cat) => (
              <div key={cat.title} className="p-6 rounded-2xl border" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl" suppressHydrationWarning aria-hidden>{cat.icon}</span>
                  <h3 className="text-sm font-bold" style={{ color: "#ffffff" }}>{cat.title}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1 w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold"
                        style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)", color: "#0a0a0a" }}>✓</span>
                      <span className="text-xs leading-relaxed font-semibold" style={{ color: "#dddddd" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="py-16 px-6" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
            How I <span className="font-display italic font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>work</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Understand", desc: "First I understand the client's business model and target audience deeply." },
              { step: "02", title: "Customize",  desc: "No generic solutions — I build customized digital products tailored to your needs." },
              { step: "03", title: "Deliver",    desc: "I manage projects from start to finish, using AI tools for maximum efficiency." },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl border" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
                <span className="text-3xl font-display italic block mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif", background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {item.step}
                </span>
                <h3 className="text-sm font-bold mb-2" style={{ color: "#ffffff" }}>{item.title}</h3>
                <p className="text-xs leading-relaxed font-medium" style={{ color: "#cccccc" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Featured Project</span>
          </div>
          <div className="rounded-2xl border p-8 relative overflow-hidden" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, #89AACC, transparent)" }} />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-4 border font-semibold"
                style={{ background: "#0a0a0a", borderColor: "#333", color: "#aaaaaa" }}>
                🚀 AI Platform
              </div>
              <h3 className="text-2xl md:text-3xl font-display italic mb-3"
                style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif" }}>Connect AI</h3>
              <p className="text-sm leading-relaxed mb-6 max-w-xl font-medium" style={{ color: "#cccccc" }}>
                An AI-based modern web platform — an interactive AI companion/assistant experience
                with AI-driven communication, personalized digital assistant experience, and a
                user-friendly interface for AI engagement.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Front-End Development", "Cybersecurity", "AI Integration", "UX Design"].map((tag) => (
                  <span key={tag} className="text-xs rounded-full px-3 py-1 border font-semibold"
                    style={{ background: "#0a0a0a", borderColor: "#333", color: "#dddddd" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/projects/connect-ai"
                className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-[#89AACC]"
                style={{ color: "#ffffff" }}>
                View project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
