"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Circuit Board + AI Glow Background
   – Animated circuit traces (cyan + orange)
   – Glowing nodes at junctions
   – Floating binary/hex data streams
   – Pulsing radial glow orbs
───────────────────────────────────────────── */

const CYAN   = "0,212,255";
const ORANGE = "255,120,40";
const BLUE   = "137,170,204";

interface CircuitNode {
  x: number;
  y: number;
  pulse: number;
  pulseSpeed: number;
  color: string;
  size: number;
}

interface CircuitTrace {
  points: { x: number; y: number }[];
  color: string;
  progress: number;   // 0–1 draw progress
  speed: number;
  alpha: number;
  width: number;
  glowTrail: number;  // trailing glow length 0–1
}

interface DataStream {
  x: number;
  y: number;
  chars: string[];
  speed: number;
  alpha: number;
  color: string;
  fontSize: number;
}

interface GlowOrb {
  x: number;
  y: number;
  r: number;
  color: string;
  phase: number;
  speed: number;
  alpha: number;
}

const HEX_CHARS = "0123456789ABCDEF01アイウエ";
const randChar  = () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];

function buildTraces(W: number, H: number): CircuitTrace[] {
  const traces: CircuitTrace[] = [];
  const GRID = 40;

  for (let t = 0; t < 55; t++) {
    const isCyan   = Math.random() > 0.35;
    const color    = isCyan ? CYAN : ORANGE;
    const points: { x: number; y: number }[] = [];

    let x = Math.floor(Math.random() * (W / GRID)) * GRID;
    let y = Math.floor(Math.random() * (H / GRID)) * GRID;
    points.push({ x, y });

    const steps = Math.floor(Math.random() * 6) + 3;
    for (let s = 0; s < steps; s++) {
      // Only horizontal or vertical moves (circuit style)
      if (Math.random() > 0.5) {
        x += (Math.random() > 0.5 ? 1 : -1) * GRID * (Math.floor(Math.random() * 4) + 1);
      } else {
        y += (Math.random() > 0.5 ? 1 : -1) * GRID * (Math.floor(Math.random() * 4) + 1);
      }
      x = Math.max(0, Math.min(W, x));
      y = Math.max(0, Math.min(H, y));
      points.push({ x, y });
    }

    traces.push({
      points,
      color,
      progress:   Math.random(),
      speed:      Math.random() * 0.003 + 0.001,
      alpha:      Math.random() * 0.35 + 0.1,
      width:      Math.random() > 0.7 ? 1.5 : 0.8,
      glowTrail:  0.15 + Math.random() * 0.2,
    });
  }
  return traces;
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let traces:  CircuitTrace[]  = [];
    let nodes:   CircuitNode[]   = [];
    let streams: DataStream[]    = [];
    let orbs:    GlowOrb[]       = [];

    const setup = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const W = canvas.width;
      const H = canvas.height;

      traces = buildTraces(W, H);

      /* Nodes at trace junctions */
      nodes = [];
      for (const tr of traces) {
        for (const pt of tr.points) {
          if (Math.random() > 0.55) {
            nodes.push({
              x:          pt.x,
              y:          pt.y,
              pulse:      Math.random() * Math.PI * 2,
              pulseSpeed: Math.random() * 0.04 + 0.01,
              color:      tr.color,
              size:       Math.random() * 3 + 1.5,
            });
          }
        }
      }

      /* Data streams */
      streams = Array.from({ length: 30 }, () => ({
        x:        Math.random() * W,
        y:        Math.random() * H,
        chars:    Array.from({ length: 15 }, randChar),
        speed:    Math.random() * 1.2 + 0.4,
        alpha:    Math.random() * 0.3 + 0.08,
        color:    Math.random() > 0.5 ? CYAN : ORANGE,
        fontSize: Math.random() > 0.6 ? 11 : 9,
      }));

      /* Glow orbs */
      orbs = [
        { x: W * 0.25, y: H * 0.35, r: 200, color: CYAN,   phase: 0,    speed: 0.008, alpha: 0.08 },
        { x: W * 0.75, y: H * 0.6,  r: 180, color: ORANGE, phase: 1.5,  speed: 0.006, alpha: 0.07 },
        { x: W * 0.5,  y: H * 0.2,  r: 150, color: BLUE,   phase: 3.0,  speed: 0.01,  alpha: 0.06 },
        { x: W * 0.1,  y: H * 0.8,  r: 120, color: CYAN,   phase: 0.8,  speed: 0.012, alpha: 0.05 },
        { x: W * 0.9,  y: H * 0.15, r: 130, color: ORANGE, phase: 2.2,  speed: 0.009, alpha: 0.06 },
      ];
    };

    /* ── Draw circuit traces with animated progress ── */
    const drawTraces = () => {
      for (const tr of traces) {
        tr.progress += tr.speed;
        if (tr.progress > 1) tr.progress = 0;

        const totalLen = tr.points.length - 1;
        const drawn    = tr.progress * totalLen;
        const seg      = Math.floor(drawn);
        const frac     = drawn - seg;

        ctx.save();
        ctx.lineWidth   = tr.width;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";

        /* Draw completed segments */
        for (let i = 0; i < seg && i < totalLen; i++) {
          const fade = Math.max(0, 1 - (seg - i) / (totalLen * tr.glowTrail));
          ctx.strokeStyle = `rgba(${tr.color},${tr.alpha * fade})`;

          /* Glow layer */
          ctx.shadowColor = `rgba(${tr.color},${tr.alpha * fade * 0.8})`;
          ctx.shadowBlur  = 6;

          ctx.beginPath();
          ctx.moveTo(tr.points[i].x, tr.points[i].y);
          ctx.lineTo(tr.points[i + 1].x, tr.points[i + 1].y);
          ctx.stroke();
        }

        /* Draw current partial segment — bright head */
        if (seg < totalLen) {
          const p0 = tr.points[seg];
          const p1 = tr.points[seg + 1];
          const hx = p0.x + (p1.x - p0.x) * frac;
          const hy = p0.y + (p1.y - p0.y) * frac;

          ctx.strokeStyle = `rgba(${tr.color},${tr.alpha * 1.8})`;
          ctx.shadowColor = `rgba(${tr.color},0.9)`;
          ctx.shadowBlur  = 12;
          ctx.lineWidth   = tr.width * 2;

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(hx, hy);
          ctx.stroke();

          /* Bright dot at head */
          ctx.fillStyle   = `rgba(255,255,255,0.9)`;
          ctx.shadowColor = `rgba(${tr.color},1)`;
          ctx.shadowBlur  = 16;
          ctx.beginPath();
          ctx.arc(hx, hy, tr.width * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    };

    /* ── Draw nodes ── */
    const drawNodes = () => {
      ctx.save();
      for (const n of nodes) {
        n.pulse += n.pulseSpeed;
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const a    = 0.4 + 0.6 * glow;

        /* Outer ring */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${n.color},${a * 0.15})`;
        ctx.shadowColor = `rgba(${n.color},${a})`;
        ctx.shadowBlur  = 10;
        ctx.fill();

        /* Core */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${n.color},${a})`;
        ctx.shadowBlur  = 14;
        ctx.fill();
      }
      ctx.restore();
    };

    /* ── Draw data streams ── */
    const drawStreams = () => {
      ctx.save();
      for (const s of streams) {
        s.y += s.speed;
        if (s.y > canvas.height + 100) {
          s.y     = -100;
          s.x     = Math.random() * canvas.width;
          s.chars = Array.from({ length: 15 }, randChar);
        }
        if (Math.random() < 0.04) {
          s.chars[Math.floor(Math.random() * s.chars.length)] = randChar();
        }

        ctx.font = `${s.fontSize}px monospace`;
        for (let i = 0; i < s.chars.length; i++) {
          const cy   = s.y - i * (s.fontSize + 3);
          if (cy < 0 || cy > canvas.height) continue;
          const fade = 1 - i / s.chars.length;
          ctx.fillStyle   = `rgba(${s.color},${s.alpha * fade})`;
          ctx.shadowColor = `rgba(${s.color},${s.alpha * fade * 0.5})`;
          ctx.shadowBlur  = 4;
          ctx.fillText(s.chars[i], s.x, cy);
        }
      }
      ctx.restore();
    };

    /* ── Draw glow orbs ── */
    const drawOrbs = () => {
      ctx.save();
      for (const o of orbs) {
        o.phase += o.speed;
        const a = o.alpha * (0.7 + 0.3 * Math.sin(o.phase));
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `rgba(${o.color},${a})`);
        g.addColorStop(0.5, `rgba(${o.color},${a * 0.3})`);
        g.addColorStop(1,   `rgba(${o.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    /* ── Main loop ── */
    const loop = () => {
      /* Subtle dark fade for trail effect */
      ctx.fillStyle = "rgba(5,8,14,0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawOrbs();
      drawTraces();
      drawNodes();
      drawStreams();

      animId = requestAnimationFrame(loop);
    };

    setup();
    loop();

    const onResize = () => setup();
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
