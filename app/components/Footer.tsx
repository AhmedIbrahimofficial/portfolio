import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-10 px-6" style={{ background: "#0a0a0a", borderColor: "#2a2a2a" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 flex-wrap">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #89AACC 0%, #4E85BF 100%)", padding: "2px" }}>
            <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: "#0a0a0a" }}>
              <span className="font-display italic text-[10px] font-normal"
                style={{ color: "#ffffff", fontFamily: "'Instrument Serif', serif" }}>AI</span>
            </div>
          </div>
          <span className="text-sm font-bold" style={{ color: "#ffffff" }}>Ahmed Ibrahim</span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-5 flex-wrap justify-center">
          {[
            { label: "Home",       href: "/" },
            { label: "About",      href: "/about" },
            { label: "Skills",     href: "/skills" },
            { label: "Experience", href: "/experience" },
            { label: "Education",  href: "/education" },
          ].map((link) => (
            <Link key={link.label} href={link.href}
              className="text-xs font-bold transition-colors duration-200 hover:text-white"
              style={{ color: "#aaaaaa" }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div className="flex items-center gap-4">
          {[
            { label: "LinkedIn", href: "https://linkedin.com" },
            { label: "GitHub",   href: "https://github.com/AhmedIbrahimofficial" },
            { label: "Email",    href: "mailto:funandentertainmentwithus@gmail.com" },
          ].map((link) => (
            <a key={link.label} href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-xs font-bold transition-colors duration-200 hover:text-white"
              style={{ color: "#aaaaaa" }}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Available */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
          <span className="text-xs font-bold" style={{ color: "#cccccc" }}>Available for projects</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t text-center" style={{ borderColor: "#2a2a2a" }}>
        <p className="text-xs font-medium" style={{ color: "#555555" }}>
          © 2025 Ahmed Ibrahim · ZehanxTech · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
