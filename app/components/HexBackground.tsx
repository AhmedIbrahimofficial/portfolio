"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Floating Hexagon Icons + AI Head + Blue Gradient
   Animated canvas background for Experience page
───────────────────────────────────────────── */

const CYAN  = "0,212,255";
const BLUE  = "41,98,255";
const ICONS = ["⚙️","💻","🤖","🔒","📊","🎨","🚀","📱","🌐","⚡","🧠","🔗"];

interface Hex {
  x: number;
  y: number;
  size: number;
  icon: string;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  glowColor: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  life: number;
  maxLife: number;
}

function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  size: number,
  rotation: number,
  strokeColor: string,
  alpha: number,
  glow: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.shadowColor  = strokeColor;
  ctx.shadowBlur   = 18 * glow;
  ctx.strokeStyle  = strokeColor.replace("rgb", "rgba").replace(")", `,${alpha})`);
  ctx.lineWidth    = 1.5;
  ctx.fillStyle    = strokeColor.replace("rgb", "rgba").replace(")", `,${alpha * 0.08})`);

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px    = size * Math.cos(angle);
    const py    = size * Math.sin(angle);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawAIHead(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const x     = W * 0.12;
  const y     = H * 0.45;
  const scale = Math.min(W, H) * 0.0018;
  const pulse = 0.6 + 0.4 * Math.sin(t * 0.02);

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Outer glow
  const grad = ctx.createRadialGradient(0, 0, 20, 0, 0, 160);
  grad.addColorStop(0,   `rgba(${CYAN},${0.12 * pulse})`);
  grad.addColorStop(0.5, `rgba(${BLUE},${0.06 * pulse})`);
  grad.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 160, 0, Math.PI * 2);
  ctx.fill();

  // Head silhouette path (simplified human head profile)
  ctx.strokeStyle = `rgba(${CYAN},${0.55 * pulse})`;
  ctx.lineWidth   = 2.5;
  ctx.shadowColor = `rgba(${CYAN},0.8)`;
  ctx.shadowBlur  = 14;
  ctx.fillStyle   = `rgba(${CYAN},${0.04 * pulse})`;

  ctx.beginPath();
  // Head shape
  ctx.moveTo(20, -90);
  ctx.bezierCurveTo(70, -90, 90, -50, 85, -10);
  ctx.bezierCurveTo(90, 20, 70, 50, 50, 65);
  ctx.bezierCurveTo(40, 75, 30, 80, 20, 82);
  ctx.bezierCurveTo(10, 84, -5, 82, -15, 78);
  ctx.bezierCurveTo(-40, 68, -55, 45, -55, 15);
  ctx.bezierCurveTo(-60, -10, -50, -40, -35, -60);
  ctx.bezierCurveTo(-20, -80, 0, -90, 20, -90);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Neck
  ctx.beginPath();
  ctx.moveTo(-15, 82);
  ctx.lineTo(-20, 120);
  ctx.moveTo(20, 82);
  ctx.lineTo(25, 120);
  ctx.stroke();

  // "AI" text
  ctx.shadowBlur  = 20;
  ctx.fillStyle   = `rgba(${CYAN},${0.9 * pulse})`;
  ctx.font        = "bold 28px monospace";
  ctx.textAlign   = "center";
  ctx.fillText("AI", -80, -100);

  ctx.restore();
}

export default function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let hexes:     Hex[]      = [];
    let particles: Particle[] = [];
    let frame = 0;

    const setup = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const W = canvas.width;
      const H = canvas.height;

      hexes = ICONS.map((icon, i) => ({
        x:          W * 0.25 + Math.random() * W * 0.7,
        y:          H * 0.05 + Math.random() * H * 0.85,
        size:       40 + Math.random() * 35,
        icon,
        vx:         (Math.random() - 0.5) * 0.35,
        vy:         (Math.random() - 0.5) * 0.25,
        rotation:   (Math.PI / 6) * i,
        rotSpeed:   (Math.random() - 0.5) * 0.004,
        alpha:      0.4 + Math.random() * 0.4,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        glowColor:  Math.random() > 0.4
          ? `rgb(${CYAN})`
          : `rgb(${BLUE})`,
      }));
    };

    const spawnParticle = (x: number, y: number) => {
      if (particles.length > 80) return;
      particles.push({
        x, y,
        vx:      (Math.random() - 0.5) * 1.2,
        vy:      (Math.random() - 0.5) * 1.2,
        alpha:   0.6,
        size:    Math.random() * 2 + 0.5,
        life:    0,
        maxLife: 60 + Math.random() * 40,
      });
    };

    const loop = () => {
      frame++;

      /* Background gradient */
      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0,   "rgba(2,8,28,0.25)");
      bg.addColorStop(0.5, "rgba(5,15,40,0.25)");
      bg.addColorStop(1,   "rgba(2,8,28,0.25)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* AI head silhouette */
      drawAIHead(ctx, canvas.width, canvas.height, frame);

      /* Particles */
      particles = particles.filter(p => p.life < p.maxLife);
      for (const p of particles) {
        p.x    += p.vx;
        p.y    += p.vy;
        p.life++;
        p.alpha = 0.6 * (1 - p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${CYAN},${p.alpha})`;
        ctx.shadowColor = `rgba(${CYAN},${p.alpha})`;
        ctx.shadowBlur  = 6;
        ctx.fill();
      }

      /* Hexagons */
      for (const h of hexes) {
        h.x        += h.vx;
        h.y        += h.vy;
        h.rotation += h.rotSpeed;
        h.pulsePhase += h.pulseSpeed;

        /* Bounce off edges */
        if (h.x < 50 || h.x > canvas.width  - 50) { h.vx *= -1; spawnParticle(h.x, h.y); }
        if (h.y < 50 || h.y > canvas.height - 50) { h.vy *= -1; spawnParticle(h.x, h.y); }

        const glow  = (Math.sin(h.pulsePhase) + 1) / 2;
        const alpha = h.alpha * (0.6 + 0.4 * glow);

        drawHexagon(ctx, h.x, h.y, h.size, h.rotation, h.glowColor, alpha, glow);

        /* Icon inside hex */
        ctx.save();
        ctx.font      = `${h.size * 0.55}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha  = alpha * 0.85;
        ctx.shadowColor  = h.glowColor;
        ctx.shadowBlur   = 10;
        ctx.fillText(h.icon, h.x, h.y);
        ctx.restore();

        /* Spawn occasional particles from hex */
        if (frame % 40 === 0 && Math.random() > 0.5) spawnParticle(h.x, h.y);
      }

      /* Connecting lines between nearby hexes */
      for (let i = 0; i < hexes.length; i++) {
        for (let j = i + 1; j < hexes.length; j++) {
          const dx   = hexes[i].x - hexes[j].x;
          const dy   = hexes[i].y - hexes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const a = (1 - dist / 220) * 0.18;
            ctx.beginPath();
            ctx.moveTo(hexes[i].x, hexes[i].y);
            ctx.lineTo(hexes[j].x, hexes[j].y);
            ctx.strokeStyle = `rgba(${CYAN},${a})`;
            ctx.lineWidth   = 0.6;
            ctx.shadowBlur  = 0;
            ctx.stroke();
          }
        }
      }

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
        opacity: 0.35,
      }}
    />
  );
}
