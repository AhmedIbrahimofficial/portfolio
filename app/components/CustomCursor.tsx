"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ringRef.current) ringRef.current.style.transform += " scale(1.6)";
      if (ringRef.current) ringRef.current.style.borderColor = "#89AACC";
    };
    const onLeaveLink = () => {
      if (ringRef.current) ringRef.current.style.borderColor = "rgba(137,170,204,0.5)";
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    // Scale ring on interactive elements
    const addHover = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };
    addHover();

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full"
        style={{
          background: "#89AACC",
          boxShadow: "0 0 8px #89AACC, 0 0 16px rgba(137,170,204,0.6)",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border-2 transition-[border-color] duration-200"
        style={{
          borderColor: "rgba(137,170,204,0.5)",
          willChange: "transform",
        }}
      />
    </>
  );
}
