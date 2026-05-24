"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  dx: number;
  dy: number;
  dist: number;
  force: number;
  angle: number;
}

const COLORS = [
  "rgba(137,170,204,",   // #89AACC — main accent
  "rgba(78,133,191,",    // #4E85BF — secondary
  "rgba(255,255,255,",   // white dots
];

export default function AIBackground() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const mouseRef    = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const PARTICLE_COUNT = 120;
    const MOUSE_RADIUS   = 100;
    const EASE           = 0.05;
    const FRICTION       = 0.85;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x     = Math.random() * canvas.width;
        const y     = Math.random() * canvas.height;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const alpha = Math.random() * 0.5 + 0.15;
        const size  = Math.random() * 2 + 0.5;

        particles.push({
          x, y,
          originX: x,
          originY: y,
          size,
          color,
          alpha,
          vx: 0, vy: 0,
          ease: EASE + Math.random() * 0.04,
          friction: FRICTION,
          dx: 0, dy: 0,
          dist: 0, force: 0, angle: 0,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Mouse repulsion
        p.dx    = mouseRef.current.x - p.x;
        p.dy    = mouseRef.current.y - p.y;
        p.dist  = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        p.force = -MOUSE_RADIUS / p.dist;

        if (p.dist < MOUSE_RADIUS) {
          p.angle = Math.atan2(p.dy, p.dx);
          p.vx   += p.force * Math.cos(p.angle);
          p.vy   += p.force * Math.sin(p.angle);
        }

        // Spring back to origin
        p.x  += (p.vx *= p.friction) + (p.originX - p.x) * p.ease;
        p.y  += (p.vy *= p.friction) + (p.originY - p.y) * p.ease;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.alpha * 0.15) + ")";
        ctx.fill();
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(137,170,204,${(1 - dist / 90) * 0.12})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize",      resize,      { passive: true });
    window.addEventListener("mousemove",   onMouseMove, { passive: true });
    window.addEventListener("mouseleave",  onMouseLeave);

    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
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
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
