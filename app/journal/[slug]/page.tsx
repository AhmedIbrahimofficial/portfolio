import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getEntryBySlug, JOURNAL_ENTRIES } from "../../lib/journal";

export function generateStaticParams() {
  return JOURNAL_ENTRIES.map((e) => ({ slug: e.slug }));
}

export default async function JournalArticlePage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();

  const idx  = JOURNAL_ENTRIES.findIndex((e) => e.slug === slug);
  const prev = JOURNAL_ENTRIES[idx - 1] ?? null;
  const next = JOURNAL_ENTRIES[idx + 1] ?? null;

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero image */}
      <section className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <Image src={entry.imageUrl} alt={entry.imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(10,10,10,0.95))" }} />

        {/* Back */}
        <div className="absolute top-24 left-6 md:left-10 z-10">
          <Link href="/journal"
            className="inline-flex items-center gap-2 rounded-full text-xs px-4 py-2 border font-bold transition-all duration-200 hover:scale-105"
            style={{ background: "rgba(0,0,0,0.7)", borderColor: "#444", color: "#ffffff", backdropFilter: "blur(8px)" }}>
            ← Back to Journal
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10 z-10">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-xs rounded-full px-3 py-1 border font-bold"
              style={{ background: "rgba(137,170,204,0.15)", borderColor: "rgba(137,170,204,0.4)", color: "#89AACC" }}>
              {entry.tag}
            </span>
            <span className="text-xs font-semibold" style={{ color: "#aaaaaa" }}>{entry.date} · {entry.readTime}</span>
          </div>
          <h1 className="font-display italic leading-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", color: "#ffffff", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            {entry.title}
          </h1>
        </div>
      </section>

      {/* Article content */}
      <section className="py-12 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">

          {/* Intro */}
          <p className="text-base md:text-lg leading-relaxed mb-12 font-medium"
            style={{ color: "#dddddd", borderLeft: "3px solid #89AACC", paddingLeft: "1.25rem" }}>
            {entry.intro}
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {entry.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: "#ffffff" }}>
                  {section.heading}
                </h2>
                <p className="text-sm md:text-base leading-relaxed font-medium" style={{ color: "#cccccc", lineHeight: 1.85 }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="mt-12 p-6 rounded-2xl border" style={{ background: "#141414", borderColor: "#2a2a2a" }}>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#aaaaaa" }}>
              Where I use this
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {entry.useCases.map((uc) => (
                <div key={uc} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#89AACC" }} />
                  <span className="text-sm font-semibold" style={{ color: "#dddddd" }}>{uc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#aaaaaa" }}>
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {entry.tools.map((tool) => (
                <span key={tool} className="text-xs rounded-full px-4 py-2 border font-semibold"
                  style={{ background: "#141414", borderColor: "#333", color: "#dddddd" }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t flex items-center gap-4" style={{ borderColor: "#2a2a2a" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #89AACC, #4E85BF)" }}>
              <span className="font-display italic text-sm font-normal" style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif" }}>AI</span>
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "#ffffff" }}>Ahmed Ibrahim</p>
              <p className="text-xs font-medium" style={{ color: "#aaaaaa" }}>AI Innovator · Full Stack Developer · ZehanxTech</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-10 px-6 md:px-10 border-t" style={{ borderColor: "#2a2a2a" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {prev ? (
            <Link href={`/journal/${prev.slug}`}
              className="group flex items-center gap-3 transition-all duration-200 hover:-translate-x-1">
              <span style={{ color: "#555" }}>←</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-0.5 font-bold" style={{ color: "#555" }}>Previous</p>
                <p className="text-sm font-bold group-hover:text-[#89AACC] transition-colors" style={{ color: "#aaaaaa" }}>{prev.title}</p>
              </div>
            </Link>
          ) : <div />}

          <Link href="/journal" className="text-xs rounded-full px-4 py-2 border font-bold transition-all duration-200 hover:text-white"
            style={{ borderColor: "#2a2a2a", color: "#aaaaaa" }}>
            All Articles
          </Link>

          {next ? (
            <Link href={`/journal/${next.slug}`}
              className="group flex items-center gap-3 text-right transition-all duration-200 hover:translate-x-1">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-0.5 font-bold" style={{ color: "#555" }}>Next</p>
                <p className="text-sm font-bold group-hover:text-[#89AACC] transition-colors" style={{ color: "#aaaaaa" }}>{next.title}</p>
              </div>
              <span style={{ color: "#555" }}>→</span>
            </Link>
          ) : <div />}
        </div>
      </section>

      <Footer />
    </div>
  );
}
