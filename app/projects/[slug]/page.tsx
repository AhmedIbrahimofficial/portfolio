import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import { getProjectBySlug, PROJECTS } from "../../lib/projects";

const C_WHITE  = "hsl(0 0% 96%)";
const C_BODY   = "hsl(0 0% 82%)";
const C_MUTED  = "hsl(0 0% 65%)";
const C_DIM    = "hsl(0 0% 48%)";
const C_CARD   = "hsl(0 0% 9%)";
const C_BORDER = "hsl(0 0% 18%)";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const idx  = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[idx - 1] ?? null;
  const next = PROJECTS[idx + 1] ?? null;

  return (
    <div style={{ background: "hsl(0 0% 4%)", minHeight: "100vh", color: C_WHITE }}>
      <Navbar />

      {/* Hero image */}
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <Image src={project.imageUrl} alt={project.imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} opacity-65`} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(0 0% 4%), transparent)" }} />

        {/* Back */}
        <div className="absolute top-24 left-6 md:left-10 z-10">
          <Link href="/#work"
            className="inline-flex items-center gap-2 rounded-full text-xs px-4 py-2 border font-medium transition-all duration-200 hover:scale-105"
            style={{ background: "hsl(0 0% 10% / 0.85)", borderColor: "hsl(0 0% 28%)", color: C_BODY, backdropFilter: "blur(8px)" }}>
            ← Back to Work
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 z-10">
          <span className="inline-block text-xs rounded-full px-3 py-1 mb-3 border font-semibold"
            style={{ background: "hsl(0 0% 10% / 0.8)", borderColor: "hsl(0 0% 28%)", color: project.accentColor, backdropFilter: "blur(8px)" }}>
            {project.tag}
          </span>
          <h1 className="font-display italic leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: C_WHITE, fontFamily: "'Instrument Serif', serif" }}>
            {project.title}
          </h1>
          <p className="text-sm md:text-base mt-2 max-w-xl font-medium" style={{ color: C_BODY }}>
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Meta bar */}
      <section className="py-8 px-6 md:px-10 border-b" style={{ borderColor: C_BORDER }}>
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: "Year",     value: project.year },
            { label: "Role",     value: project.role },
            { label: "Category", value: project.tag },
            { label: "Stack",    value: project.stack.slice(0, 2).join(", ") + (project.stack.length > 2 ? ` +${project.stack.length - 2}` : "") },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: C_DIM }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: C_WHITE }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: C_BORDER }} />
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C_MUTED }}>Overview</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display italic mb-6"
              style={{ color: C_WHITE, fontFamily: "'Instrument Serif', serif" }}>
              About the project
            </h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: C_BODY, lineHeight: 1.8 }}>
              {project.longDescription}
            </p>
          </div>

          {/* Tech stack card */}
          <div className="rounded-2xl border p-6" style={{ background: C_CARD, borderColor: C_BORDER }}>
            <h3 className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: C_MUTED }}>Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="text-xs rounded-full px-3 py-1.5 border font-medium"
                  style={{ background: "hsl(0 0% 6%)", borderColor: "hsl(0 0% 22%)", color: C_BODY }}>
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t" style={{ borderColor: C_BORDER }}>
              <h3 className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: C_MUTED }}>Outcome</h3>
              <p className="text-sm leading-relaxed" style={{ color: C_BODY }}>{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 md:px-10" style={{ background: "hsl(0 0% 6%)" }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px" style={{ background: C_BORDER }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: C_MUTED }}>Key Features</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {project.features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border transition-all duration-300 hover:border-[#89AACC]/40 hover:-translate-y-0.5"
                style={{ background: C_CARD, borderColor: C_BORDER }}>
                <span className="text-2xl block mb-3" suppressHydrationWarning aria-hidden>{feature.icon}</span>
                <h3 className="text-sm font-semibold mb-2" style={{ color: C_WHITE }}>{feature.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: C_BODY }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second image */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative w-full rounded-3xl overflow-hidden border" style={{ aspectRatio: "16/9", borderColor: C_BORDER }}>
            <Image src={project.imageUrl} alt={project.imageAlt} fill
              sizes="(max-width: 1000px) 100vw, 1000px" className="object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-tr ${project.bg} opacity-25`} />
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-12 px-6 md:px-10 border-t" style={{ borderColor: C_BORDER }}>
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          {prev ? (
            <Link href={`/projects/${prev.slug}`}
              className="group flex items-center gap-3 transition-all duration-200 hover:-translate-x-1">
              <span style={{ color: C_DIM }}>←</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-0.5" style={{ color: C_DIM }}>Previous</p>
                <p className="text-sm font-semibold group-hover:text-white transition-colors" style={{ color: C_MUTED }}>{prev.title}</p>
              </div>
            </Link>
          ) : <div />}

          <Link href="/#work" className="text-xs rounded-full px-4 py-2 border font-medium transition-all duration-200 hover:text-white"
            style={{ borderColor: C_BORDER, color: C_MUTED }}>
            All Projects
          </Link>

          {next ? (
            <Link href={`/projects/${next.slug}`}
              className="group flex items-center gap-3 text-right transition-all duration-200 hover:translate-x-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-0.5" style={{ color: C_DIM }}>Next</p>
                <p className="text-sm font-semibold group-hover:text-white transition-colors" style={{ color: C_MUTED }}>{next.title}</p>
              </div>
              <span style={{ color: C_DIM }}>→</span>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center border-t" style={{ borderColor: C_BORDER }}>
        <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: C_MUTED }}>
          Interested in working together?
        </p>
        <a href="https://mail.google.com/mail/?view=cm&to=funandentertainmentwithus@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 rounded-full text-sm px-7 py-3.5 font-semibold border transition-all duration-200 hover:scale-105"
          style={{ borderColor: C_BORDER, color: C_WHITE, background: C_CARD }}>
          <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", zIndex: -1 }} />
          <span className="relative z-10 flex items-center gap-2 rounded-full px-7 py-3.5 -mx-7 -my-3.5"
            style={{ background: C_CARD }}>
            Get in touch ↗
          </span>
        </a>
      </section>
    </div>
  );
}
