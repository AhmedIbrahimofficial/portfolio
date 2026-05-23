"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WORDS = ["Design", "Create", "Inspire"];
const DURATION_MS = 2700;

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  /* ── Counter via rAF ── */
  useEffect(() => {
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const next = Math.min(Math.floor((elapsed / DURATION_MS) * 100), 100);
      setCount(next);

      if (next < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(onComplete, 400);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  /* ── Word cycling every 900 ms ── */
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      900
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "hsl(0 0% 4%)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Top-left label */}
      <motion.p
        className="absolute top-8 left-8 text-xs uppercase tracking-[0.3em]"
        style={{ color: "hsl(0 0% 53%)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Portfolio
      </motion.p>

      {/* Center word */}
      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="font-display italic select-none"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              color: "hsl(0 0% 96% / 0.8)",
              fontFamily: "'Instrument Serif', serif",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <p
        className="absolute bottom-12 right-8 tabular-nums select-none font-display"
        style={{
          fontSize: "clamp(3.5rem, 10vw, 7rem)",
          color: "hsl(0 0% 96%)",
          fontFamily: "'Instrument Serif', serif",
          lineHeight: 1,
        }}
      >
        {String(count).padStart(3, "0")}
      </p>

      {/* Bottom progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: "hsl(0 0% 12% / 0.5)" }}
      >
        <div
          className="h-full origin-left"
          style={{
            background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            transform: `scaleX(${count / 100})`,
            transition: "transform 0.05s linear",
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </motion.div>
  );
}
