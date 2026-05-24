import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { JOURNAL_ENTRIES } from "../lib/journal";

export default function JournalPage() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>Journal</span>
          </div>
          <h1 className="font-display italic leading-[0.95] tracking-tight mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#ffffff", fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>
            Recent <em>thoughts</em>
          </h1>
          <p className="text-base max-w-lg font-medium" style={{ color: "#cccccc" }}>
            Ideas, learnings, and perspectives from 6+ years of building digital products.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {JOURNAL_ENTRIES.map((entry) => (
            <Link key={entry.id} href={`/journal/${entry.slug}`}
              className="group flex items-center gap-5 p-4 rounded-2xl border transition-all duration-300 hover:border-[#89AACC]/40 hover:-translate-y-0.5"
              style={{ background: "#141414", borderColor: "#2a2a2a" }}>

              {/* Image */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: "#333" }}>
                <Image src={entry.imageUrl} alt={entry.imageAlt} width={64} height={64}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] rounded-full px-2.5 py-0.5 border font-bold"
                    style={{ background: "#0a0a0a", borderColor: "#333", color: "#89AACC" }}>
                    {entry.tag}
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: "#666" }}>{entry.date} · {entry.readTime}</span>
                </div>
                <p className="text-base font-bold group-hover:text-[#89AACC] transition-colors duration-200 truncate"
                  style={{ color: "#ffffff" }}>{entry.title}</p>
                <p className="text-xs mt-1 font-medium line-clamp-1" style={{ color: "#aaaaaa" }}>{entry.intro}</p>
              </div>

              <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 font-bold"
                style={{ color: "#89AACC" }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
