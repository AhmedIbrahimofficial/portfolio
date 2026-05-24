"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Holographic AI Room Background
   – Perspective grid floor
   – Falling data-rain columns
   – Floating HUD rectangles
   – Ambient cyan glow orbs
───────────────────────────────────────────── */

const CYAN  = "0,212,255";   // #00d4ff
const BLUE  = "137,170,204"; // #89AACC
const WHITE = "255,255,255";

/* ── Data rain column ── */
interface RainCol {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  alpha: number;
}

/* ── HUD rectangle ── */
interface HudRect {
  x: number; y: number;
  w: number; h: number;
  alpha: number; speed: number;
  phase: number;
}

/* ── Orb ── */
interface Orb {
  x: number; y: number;
  r: number; alpha: number;
  phase: number; speed: number;
}

const CHARS = "01アイウエオカキクケコABCDEF0123456789<>[]{}|/\\";

function randChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rain:  RainCol[] = [];
    let huds:  HudRect[] = [];
    let orbs:  Orb[]     = [];
    let frame = 0;

    /* ── Setup ── */
    const setup = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const W = canvas.width;
      const H = canvas.height;

      /* Rain columns */
      rain = [];
      const cols = Math.floor(W / 22);
      for (let i = 0; i < cols; i++) {
        rain.push({
          x:      i * 22 + Math.random() * 10,
          y:      Math.random() * -H,
          speed:  Math.random() * 2 + 0.8,
          chars:  Array.from({ length: 20 }, randChar),
          length: Math.floor(Math.random() * 12) + 6,
          alpha:  Math.random() * 0.4 + 0.1,
        });
      }

      /* HUD rects */
      huds = Array.from({ length: 8 }, () => ({
        x:     Math.random() * W * 0.8 + W * 0.1,
        y:     Math.random() * H * 0.5 + H * 0.05,
        w:     Math.random() * 120 + 60,
        h:     Math.random() * 60 + 30,
        alpha: Math.random() * 0.25 + 0.05,
        speed: Math.random() * 0.008 + 0.003,
        phase: Math.random() * Math.PI * 2,
      }));

      /* Orbs */
      orbs = Array.from({ length: 5 }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H * 0.7,
        r:     Math.random() * 120 + 60,
        alpha: Math.random() * 0.12 + 0.04,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.005,
      }));
    };

    /* ── Draw perspective grid ── */
    const drawGrid = () => {
      const W  = canvas.width;
      const H  = canvas.height;
      const VP = { x: W / 2, y: H * 0.52 }; // vanishing point
      const ROWS = 18;
      const COLS = 24;

      ctx.save();

      /* Horizontal lines */
      for (let r = 0; r <= ROWS; r++) {
        const t     = r / ROWS;
        const curve = Math.pow(t, 1.8);
        const y     = VP.y + curve * (H - VP.y);
        const alpha = curve * 0.35;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `rgba(${CYAN},${alpha})`;
        ctx.lineWidth   = r === 0 ? 0.3 : 0.6;
        ctx.stroke();
      }

      /* Vertical lines converging to VP */
      for (let c = 0; c <= COLS; c++) {
        const xBottom = (c / COLS) * W;
        const alpha   = 0.2;

        ctx.beginPath();
        ctx.moveTo(VP.x, VP.y);
        ctx.lineTo(xBottom, H);
        ctx.strokeStyle = `rgba(${CYAN},${alpha})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }

      /* Horizon glow */
      const hGrad = ctx.createLinearGradient(0, VP.y - 40, 0, VP.y + 40);
      hGrad.addColorStop(0, `rgba(${CYAN},0)`);
      hGrad.addColorStop(0.5, `rgba(${CYAN},0.18)`);
      hGrad.addColorStop(1, `rgba(${CYAN},0)`);
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, VP.y - 40, W, 80);

      ctx.restore();
    };

    /* ── Draw data rain ── */
    const drawRain = () => {
      ctx.save();
      ctx.font = "11px monospace";

      for (const col of rain) {
        col.y += col.speed;
        if (col.y > canvas.height + 200) {
          col.y = Math.random() * -300;
          col.chars = Array.from({ length: 20 }, randChar);
        }

        /* Randomly mutate one char */
        if (Math.random() < 0.05) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = randChar();
        }

        for (let i = 0; i < col.length; i++) {
          const cy    = col.y - i * 14;
          if (cy < 0 || cy > canvas.height) continue;
          const fade  = 1 - i / col.length;
          const alpha = col.alpha * fade;
          const color = i === 0 ? WHITE : CYAN;
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fillText(col.chars[i % col.chars.length], col.x, cy);
        }
      }
      ctx.restore();
    };

    /* ── Draw HUD rectangles ── */
    const drawHuds = () => {
      ctx.save();
      for (const h of huds) {
        h.phase += h.speed;
        const a = h.alpha * (0.6 + 0.4 * Math.sin(h.phase));

        /* Outer rect */
        ctx.strokeStyle = `rgba(${CYAN},${a})`;
        ctx.lineWidth   = 0.8;
        ctx.strokeRect(h.x - h.w / 2, h.y - h.h / 2, h.w, h.h);

        /* Corner accents */
        const cs = 8;
        const corners = [
          [h.x - h.w / 2, h.y - h.h / 2],
          [h.x + h.w / 2, h.y - h.h / 2],
          [h.x - h.w / 2, h.y + h.h / 2],
          [h.x + h.w / 2, h.y + h.h / 2],
        ] as [number, number][];

        ctx.strokeStyle = `rgba(${BLUE},${a * 1.5})`;
        ctx.lineWidth   = 1.5;
        for (const [cx, cy] of corners) {
          const sx = cx === h.x - h.w / 2 ? 1 : -1;
          const sy = cy === h.y - h.h / 2 ? 1 : -1;
          ctx.beginPath();
          ctx.moveTo(cx + sx * cs, cy);
          ctx.lineTo(cx, cy);
          ctx.lineTo(cx, cy + sy * cs);
          ctx.stroke();
        }

        /* Inner scan line */
        const scanY = h.y - h.h / 2 + ((frame * h.speed * 60) % h.h);
        ctx.strokeStyle = `rgba(${CYAN},${a * 0.5})`;
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(h.x - h.w / 2, scanY);
        ctx.lineTo(h.x + h.w / 2, scanY);
        ctx.stroke();
      }
      ctx.restore();
    };

    /* ── Draw ambient orbs ── */
    const drawOrbs = () => {
      ctx.save();
      for (const o of orbs) {
        o.phase += o.speed;
        const a = o.alpha * (0.7 + 0.3 * Math.sin(o.phase));
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `rgba(${CYAN},${a})`);
        g.addColorStop(0.5, `rgba(${BLUE},${a * 0.4})`);
        g.addColorStop(1,   `rgba(${CYAN},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    /* ── Main loop ── */
    const loop = () => {
      frame++;
      /* Dark fade — not full clear so rain trails persist */
      ctx.fillStyle = "rgba(5,8,12,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawOrbs();
      drawGrid();
      drawRain();
      drawHuds();

      animId = requestAnimationFrame(loop);
    };

    setup();
    loop();

    const onResize = () => { setup(); };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        width:  "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    />
  );
}
