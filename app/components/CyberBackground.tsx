"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = ["#00ffff", "#00aaff", "#00d4ff", "#7b2fff", "#0080ff"];
const MAX_DIST = 140;
const PARTICLE_COUNT = 80;

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      }));
    };
    initParticles();

    // Draw perspective grid
    const drawGrid = (t: number) => {
      const vanishY = H * 0.5;
      const cols = 20;
      const rows = 14;

      ctx.save();
      ctx.strokeStyle = "#00d4ff";
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let i = 0; i <= cols; i++) {
        const xBottom = (i / cols) * W;
        const xTop = W / 2 + (xBottom - W / 2) * 0.05;
        const alpha = 0.06 + Math.sin(t * 0.5 + i * 0.3) * 0.03;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(xBottom, H);
        ctx.lineTo(xTop, vanishY);
        ctx.stroke();
      }

      // Horizontal lines
      for (let j = 0; j <= rows; j++) {
        const progress = j / rows;
        const y = vanishY + (H - vanishY) * (progress * progress);
        const xLeft  = W / 2 - (W / 2) * (1 - Math.pow(1 - progress, 2));
        const xRight = W / 2 + (W / 2) * (1 - Math.pow(1 - progress, 2));
        const alpha = 0.04 + progress * 0.08 + Math.sin(t * 0.3 + j * 0.5) * 0.02;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(xLeft, y);
        ctx.lineTo(xRight, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            ctx.save();
            ctx.globalAlpha = alpha;
            const grad = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            grad.addColorStop(0, particles[i].color);
            grad.addColorStop(1, particles[j].color);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Draw particles
    const drawParticles = (t: number) => {
      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const pulsedRadius = p.radius + Math.sin(p.pulse) * 0.8;
        const pulsedOpacity = p.opacity + Math.sin(p.pulse) * 0.15;

        // Glow
        ctx.save();
        ctx.globalAlpha = pulsedOpacity * 0.4;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedRadius * 6);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedRadius * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Core dot
        ctx.save();
        ctx.globalAlpha = pulsedOpacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
    };

    // Center glow
    const drawCenterGlow = (t: number) => {
      const pulse = Math.sin(t * 0.8) * 0.1 + 0.9;
      const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.55 * pulse);
      glow.addColorStop(0,   "rgba(0, 80, 200, 0.18)");
      glow.addColorStop(0.3, "rgba(0, 50, 150, 0.10)");
      glow.addColorStop(0.6, "rgba(0, 20, 80,  0.05)");
      glow.addColorStop(1,   "transparent");
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    };

    let t = 0;
    const animate = () => {
      t += 0.016;

      // Background
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, W, H);

      // Radial base gradient
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
      bg.addColorStop(0,   "#0d1b4b");
      bg.addColorStop(0.5, "#060618");
      bg.addColorStop(1,   "#000005");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      drawGrid(t);
      drawCenterGlow(t);
      drawConnections();
      drawParticles(t);

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden
    />
  );
}
