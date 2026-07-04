"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home",       href: "/",           section: null },
  { label: "Work",       href: "/#work",       section: "work" },
  { label: "About",      href: "/about",       section: null },
  { label: "Skills",     href: "/skills",      section: null },
  { label: "Experience", href: "/experience",  section: null },
  { label: "Education",  href: "/education",   section: null },
];

const SCROLL_SECTIONS = ["hero", "work", "journal", "explorations", "reach-out", "stats", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ── Scroll spy ── */
  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      for (const id of [...SCROLL_SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("hero");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") setScrolled(true);
  }, [pathname]);

  /* ── Close menu on outside tap ── */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [menuOpen]);

  /* ── Close menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (link: (typeof NAV_LINKS)[0]) => {
    if (pathname !== "/") return pathname === link.href;
    if (link.href === "/") return activeSection === "hero";
    if (link.href === "/#work") return activeSection === "work";
    return false;
  };

  const handleNavClick = (link: (typeof NAV_LINKS)[0]) => {
    setMenuOpen(false);
    if (link.section && pathname === "/") {
      // Same page scroll
      setTimeout(() => {
        document.getElementById(link.section!)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else if (link.href !== pathname) {
      router.push(link.href);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] flex justify-center pt-4 md:pt-6 px-4">
        <nav
          className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 px-2 py-2 gap-0.5 transition-all duration-300 ${
            scrolled ? "shadow-lg shadow-black/40" : ""
          }`}
          style={{ background: "hsl(0 0% 8%)" }}
        >
          {/* Logo */}
          <Link href="/" className="group relative flex-shrink-0 w-9 h-9 rounded-full transition-transform duration-200 hover:scale-110 mr-1" aria-label="Home">
            <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #89AACC 0%, #4E85BF 100%)", padding: "1.5px" }} />
            <span className="absolute inset-[1.5px] rounded-full flex items-center justify-center" style={{ background: "hsl(0 0% 4%)" }}>
              <span className="font-display italic text-[13px] leading-none select-none" style={{ color: "#fff", fontFamily: "'Instrument Serif', serif" }}>AI</span>
            </span>
          </Link>

          <span className="hidden lg:block w-px h-5 mx-1" style={{ background: "hsl(0 0% 12%)" }} />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <Link key={link.label} href={link.href}
                  onClick={() => handleNavClick(link)}
                  className="text-xs rounded-full px-3 py-1.5 transition-all duration-200 hover:text-white whitespace-nowrap relative"
                  style={{ color: active ? "#fff" : "hsl(0 0% 53%)", background: active ? "hsl(0 0% 14%)" : "transparent" }}>
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#89AACC" }} />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          <span className="hidden lg:block w-px h-5 mx-1" style={{ background: "hsl(0 0% 12%)" }} />

          {/* Say hi — desktop */}
          <a href="https://mail.google.com/mail/?view=cm&to=ahmedibrahimofficials@gmail.com"
            target="_blank" rel="noopener noreferrer"
            className="group relative text-xs rounded-full px-3 py-1.5 transition-all duration-200 hidden lg:flex items-center gap-1"
            style={{ color: "#fff" }}>
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", zIndex: -1 }} />
            <span className="relative z-10 flex items-center gap-1 rounded-full px-3 py-1.5 backdrop-blur-md" style={{ background: "hsl(0 0% 8%)" }}>
              Say hi <span aria-hidden>↗</span>
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full ml-1"
            style={{ color: "hsl(0 0% 53%)" }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
      </header>

      {/* Mobile dropdown — outside header so no pointer-events issues */}
      {menuOpen && (
        <div
          ref={dropdownRef}
          className="fixed top-[72px] left-4 right-4 rounded-2xl border p-3 flex flex-col gap-1 lg:hidden"
          style={{
            background: "rgba(14,14,14,0.98)",
            borderColor: "hsl(0 0% 14%)",
            backdropFilter: "blur(20px)",
            zIndex: 59,
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left text-sm rounded-xl px-4 py-4 transition-all duration-200 font-medium w-full active:scale-[0.98]"
                style={{
                  color:      active ? "#fff" : "hsl(0 0% 70%)",
                  background: active ? "hsl(0 0% 16%)" : "transparent",
                  minHeight:  "48px",
                }}
              >
                {link.label}
              </button>
            );
          })}
          <a
            href="https://wa.me/923067060074"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm rounded-xl px-4 py-4 mt-1 text-center font-bold active:scale-[0.98] transition-transform"
            style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)", color: "#fff", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={() => setMenuOpen(false)}
          >
            Let&apos;s Talk 💬
          </a>
        </div>
      )}
    </>
  );
}
