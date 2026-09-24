"use client";

import { useEffect, useRef, useState } from "react";

const NEON = "#3DFF9A";
const TRAIL_MS = 380;
const MAX_POINTS = 40;

type Point = { x: number; y: number; t: number };

function trailAllowed() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(pointer: coarse)").matches
  );
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const sync = () => setEnabled(trailAllowed());
    sync();
    reduce.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points: Point[] = [];
    let frame = 0;
    let running = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      running = true;
      while (points.length > 0 && now - points[0].t > TRAIL_MS) points.shift();
      ctx.clearRect(0, 0, width, height);

      if (points.length === 0) {
        running = false;
        return;
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = NEON;

      for (let i = 1; i < points.length; i++) {
        const life = 1 - (now - points[i].t) / TRAIL_MS;
        const along = i / (points.length - 1);
        const alpha = Math.max(0, life) * (0.2 + 0.8 * along);
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = NEON;
        ctx.lineWidth = 1.25 + alpha * 3.5;
        ctx.beginPath();
        ctx.moveTo(points[i - 1].x, points[i - 1].y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
      }

      const head = points[points.length - 1];
      ctx.globalAlpha = 0.95;
      ctx.shadowBlur = 22;
      ctx.fillStyle = NEON;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      frame = window.requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      const last = points[points.length - 1];
      if (last) {
        const dx = event.clientX - last.x;
        const dy = event.clientY - last.y;
        if (dx * dx + dy * dy < 2.25) return;
      }
      points.push({ x: event.clientX, y: event.clientY, t: now });
      if (points.length > MAX_POINTS) points.shift();
      if (!running) frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
