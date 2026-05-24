"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Glowing Brain Lightbulb + Constellation Network
   For Education page
───────────────────────────────────────────── */

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  color: string;
}

const WHITE  = "255,255,255";
const GOLD   = "255,200,80";
const CYAN   = "180,220,255";

function drawBulb(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number) {
  const pulse = 0.75 + 0.25 * Math.sin(t * 0.03);

  // Outer glow
  const og = ctx.createRadialGradient(cx, cy - r * 0.1, 0, cx, cy - r * 0.1, r * 2.8);
  og.addColorStop(0,   `rgba(${WHITE},${0.18 * pulse})`);
  og.addColorStop(0.3, `rgba(180,220,255,${0.10 * pulse})`);
  og.addColorStop(0.7, `rgba(100,160,255,${0.04 * pulse})`);
  og.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = og;
  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.1, r * 2.8, 0, Math.PI * 2);
  ctx.fill();

  // Bulb glass body
  ctx.save();
  ctx.shadowColor = `rgba(${WHITE},${0.9 * pulse})`;
  ctx.shadowBlur  = 30 * pulse;

  const bg = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.4, 0, cx, cy, r);
  bg.addColorStop(0,   `rgba(${WHITE},${0.55 * pulse})`);
  bg.addColorStop(0.5, `rgba(200,230,255,${0.3 * pulse})`);
  bg.addColorStop(1,   `rgba(100,160,255,${0.1 * pulse})`);

  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.15, r, 0, Math.PI * 2);
  ctx.fillStyle = bg;
  ctx.fill();

  // Bulb outline
  ctx.strokeStyle = `rgba(${WHITE},${0.6 * pulse})`;
  ctx.lineWidth   = 1.5;
  ctx.stroke();
  ctx.restore();

  // Base/neck of bulb
  ctx.save();
  ctx.strokeStyle = `rgba(${WHITE},${0.5 * pulse})`;
  ctx.lineWidth   = 2;
  ctx.shadowColor = `rgba(${WHITE},0.6)`;
  ctx.shadowBlur  = 8;

  const bx = cx - r * 0.3;
  const by = cy + r * 0.82;
  const bw = r * 0.6;
  const bh = r * 0.45;

  // Neck lines
  for (let i = 0; i < 3; i++) {
    const yy = by + i * (bh / 3);
    ctx.beginPath();
    ctx.moveTo(bx + (i * 4), yy);
    ctx.lineTo(bx + bw - (i * 4), yy);
    ctx.stroke();
  }
  ctx.restore();

  // Brain inside bulb
  drawBrain(ctx, cx, cy - r * 0.2, r * 0.55, t, pulse);
}

function drawBrain(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  r: number, t: number, pulse: number
) {
  ctx.save();
  ctx.strokeStyle = `rgba(${CYAN},${0.85 * pulse})`;
  ctx.lineWidth   = 1.8;
  ctx.shadowColor = `rgba(${CYAN},0.9)`;
  ctx.shadowBlur  = 12;

  // Left hemisphere
  ctx.beginPath();
  ctx.moveTo(cx, cy + r * 0.3);
  ctx.bezierCurveTo(cx - r * 0.1, cy + r * 0.1, cx - r * 0.8, cy + r * 0.2, cx - r * 0.9, cy - r * 0.1);
  ctx.bezierCurveTo(cx - r * 1.0, cy - r * 0.5, cx - r * 0.7, cy - r * 0.9, cx - r * 0.3, cy - r * 0.85);
  ctx.bezierCurveTo(cx - r * 0.1, cy - r * 0.9, cx, cy - r * 0.7, cx, cy - r * 0.5);
  ctx.stroke();

  // Right hemisphere
  ctx.beginPath();
  ctx.moveTo(cx, cy + r * 0.3);
  ctx.bezierCurveTo(cx + r * 0.1, cy + r * 0.1, cx + r * 0.8, cy + r * 0.2, cx + r * 0.9, cy - r * 0.1);
  ctx.bezierCurveTo(cx + r * 1.0, cy - r * 0.5, cx + r * 0.7, cy - r * 0.9, cx + r * 0.3, cy - r * 0.85);
  ctx.bezierCurveTo(cx + r * 0.1, cy - r * 0.9, cx, cy - r * 0.7, cx, cy - r * 0.5);
  ctx.stroke();

  // Center divide
  ctx.beginPath();
  ctx.moveTo(cx, cy - r * 0.5);
  ctx.lineTo(cx, cy + r * 0.3);
  ctx.stroke();

  // Brain folds (left)
  ctx.lineWidth = 1.2;
  ctx.shadowBlur = 6;
  const folds = [
    [cx - r*0.5, cy - r*0.6, cx - r*0.7, cy - r*0.3],
    [cx - r*0.3, cy - r*0.2, cx - r*0.6, cy + r*0.0],
    [cx - r*0.6, cy - r*0.7, cx - r*0.85, cy - r*0.45],
  ];
  for (const [x1, y1, x2, y2] of folds) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo((x1+x2)/2 - 10, (y1+y2)/2, x2, y2);
    ctx.stroke();
  }
  // Brain folds (right)
  const foldsR = [
    [cx + r*0.5, cy - r*0.6, cx + r*0.7, cy - r*0.3],
    [cx + r*0.3, cy - r*0.2, cx + r*0.6, cy + r*0.0],
    [cx + r*0.6, cy - r*0.7, cx + r*0.85, cy - r*0.45],
  ];
  for (const [x1, y1, x2, y2] of foldsR) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo((x1+x2)/2 + 10, (y1+y2)/2, x2, y2);
    ctx.stroke();
  }

  ctx.restore();
}

export default function BrainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    let frame = 0;

    const setup = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const W = canvas.width;
      const H = canvas.height;

      stars = Array.from({ length: 160 }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * 0.18,
        vy:    (Math.random() - 0.5) * 0.18,
        size:  Math.random() * 2 + 0.3,
        alpha: Math.random() * 0.6 + 0.15,
        color: Math.random() > 0.7 ? GOLD : WHITE,
      }));
    };

    const loop = () => {
      frame++;

      // Dark background fade
      ctx.fillStyle = "rgba(4,4,10,0.28)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;

      // Move + draw stars
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${s.color},${s.alpha})`;
        ctx.shadowColor = `rgba(${s.color},${s.alpha * 0.8})`;
        ctx.shadowBlur  = s.size > 1.2 ? 6 : 2;
        ctx.fill();
      }

      // Constellation lines between nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx   = stars[i].x - stars[j].x;
          const dy   = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            const a = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(${WHITE},${a})`;
            ctx.lineWidth   = 0.5;
            ctx.shadowBlur  = 0;
            ctx.stroke();
          }
        }
      }

      // Glowing brain lightbulb — center
      const bulbR = Math.min(W, H) * 0.13;
      drawBulb(ctx, W / 2, H * 0.48, bulbR, frame);

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
