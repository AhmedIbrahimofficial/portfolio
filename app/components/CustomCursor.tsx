"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on mouse devices, not touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    el.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top  = e.clientY + "px";
    };

    const onEnter = () => {
      el.style.width  = "40px";
      el.style.height = "40px";
      el.style.background = "rgba(137,170,204,0.15)";
      el.style.border = "2px solid #89AACC";
    };

    const onLeave = () => {
      el.style.width  = "12px";
      el.style.height = "12px";
      el.style.background = "#89AACC";
      el.style.border = "none";
    };

    document.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed z-[9999] rounded-full"
      style={{
        width: "12px",
        height: "12px",
        background: "#89AACC",
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        boxShadow: "0 0 10px rgba(137,170,204,0.8), 0 0 20px rgba(137,170,204,0.4)",
        opacity: 0,
        top: 0,
        left: 0,
        willChange: "left, top",
      }}
    />
  );
}
