"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home",       href: "/",           section: null },
  { label: "Work",       href: "/#work",       section: "work" },
  { label: "About",      href: "/about",       section: null },
  { label: "Skills",     href: "/skills",      section: null },
  { label: "Experience", href: "/experience",  section: null },
  { label: "Education",  href: "/education",   section: null },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (link: (typeof NAV_LINKS)[0]) => {
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href.replace("/#work", "")) && link.href !== "/#work"
      ? true
      : pathname === "/" && link.href === "/#work"
      ? false
      : pathname === link.href;
  };

  const handleClick = (link: (typeof NAV_LINKS)[0]) => {
    setMenuOpen(false);
    if (link.section && pathname === "/") {
      document.getElementById(link.section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 px-2 py-2 gap-0.5 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/30" : ""
        }`}
        style={{ background: "hsl(0 0% 8%)" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group relative flex-shrink-0 w-9 h-9 rounded-full transition-transform duration-200 hover:scale-110 mr-1"
          aria-label="Home"
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #89AACC 0%, #4E85BF 100%)",
              padding: "1.5px",
            }}
          />
          <span
            className="absolute inset-[1.5px] rounded-full flex items-center justify-center"
            style={{ background: "hsl(0 0% 4%)" }}
          >
            <span
              className="font-display italic text-[13px] leading-none select-none"
              style={{ color: "hsl(0 0% 96%)", fontFamily: "'Instrument Serif', serif" }}
            >
              AI
            </span>
          </span>
        </Link>

        {/* Divider */}
        <span className="hidden lg:block w-px h-5 mx-1" style={{ background: "hsl(0 0% 12%)" }} />

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleClick(link)}
                className="text-xs rounded-full px-3 py-1.5 transition-all duration-200 hover:text-white whitespace-nowrap"
                style={{
                  color: active ? "hsl(0 0% 96%)" : "hsl(0 0% 53%)",
                  background: active ? "hsl(0 0% 12% / 0.5)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <span className="hidden lg:block w-px h-5 mx-1" style={{ background: "hsl(0 0% 12%)" }} />

        {/* Say hi button */}
        <a
          href="https://mail.google.com/mail/?view=cm&to=funandentertainmentwithus@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative text-xs rounded-full px-3 py-1.5 transition-all duration-200 hidden lg:flex items-center gap-1"
          style={{ color: "hsl(0 0% 96%)" }}
        >
          <span
            className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", zIndex: -1 }}
          />
          <span
            className="relative z-10 flex items-center gap-1 rounded-full px-3 py-1.5 backdrop-blur-md"
            style={{ background: "hsl(0 0% 8%)" }}
          >
            Say hi <span aria-hidden>↗</span>
          </span>
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full ml-1"
          style={{ color: "hsl(0 0% 53%)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="absolute top-16 left-4 right-4 rounded-2xl border p-3 flex flex-col gap-1 lg:hidden"
          style={{ background: "hsl(0 0% 8% / 0.97)", borderColor: "hsl(0 0% 14%)", backdropFilter: "blur(16px)" }}
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleClick(link)}
                className="text-sm rounded-xl px-4 py-2.5 transition-all duration-200 hover:text-white"
                style={{
                  color: active ? "hsl(0 0% 96%)" : "hsl(0 0% 53%)",
                  background: active ? "hsl(0 0% 12%)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://mail.google.com/mail/?view=cm&to=funandentertainmentwithus@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm rounded-xl px-4 py-2.5 mt-1 text-center font-medium"
            style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", color: "hsl(0 0% 4%)" }}
            onClick={() => setMenuOpen(false)}
          >
            Say hi ↗
          </a>
        </div>
      )}
    </header>
  );
}
