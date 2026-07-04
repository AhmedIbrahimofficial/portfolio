import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { PROJECTS } from "../lib/projects";

export default function ProjectsPage() {
  return (
    <div style={{ background: "hsl(0 0% 4%)", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "hsl(0 0% 12%)" }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: "hsl(0 0% 53%)" }}>
              All Work
            </span>
          </div>
          <h1
            className="font-display italic leading-[0.95] tracking-tight mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "hsl(0 0% 96%)", fontFamily: "'Instrument Serif', serif" }}
          >
            Featured <em>projects</em>
          </h1>
          <p className="text-base max-w-lg" style={{ color: "hsl(0 0% 53%)" }}>
            A curated selection of work spanning AI platforms, brand identities, web applications, business systems, and high-converting digital products — 80+ projects delivered.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative block rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-[#89AACC]/30"
              style={{ border: "1px solid hsl(0 0% 12%)" }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />

                {/* Year badge */}
                <span
                  className="absolute top-4 right-4 text-xs rounded-full px-3 py-1 border"
                  style={{ background: "hsl(0 0% 8% / 0.8)", borderColor: "hsl(0 0% 20%)", color: "hsl(0 0% 60%)", backdropFilter: "blur(8px)" }}
                >
                  {project.year}
                </span>
              </div>

              {/* Info */}
              <div className="p-6" style={{ background: "hsl(0 0% 7%)" }}>
                <span
                  className="text-xs rounded-full px-3 py-1 border inline-block mb-3"
                  style={{ background: "hsl(0 0% 5%)", borderColor: "hsl(0 0% 14%)", color: project.accentColor }}
                >
                  {project.tag}
                </span>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors" style={{ color: "hsl(0 0% 90%)" }}>
                  {project.title}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(0 0% 50%)" }}>
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] rounded-full px-2.5 py-1 border"
                        style={{ background: "hsl(0 0% 5%)", borderColor: "hsl(0 0% 14%)", color: "hsl(0 0% 45%)" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "#89AACC" }}
                  >
                    View project →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
