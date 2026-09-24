"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ORB_COUNT = 16;

const WASH = [
  "radial-gradient(circle at 18% 26%, rgba(61,255,154,0.32) 0%, rgba(61,255,154,0) 34%)",
  "radial-gradient(circle at 74% 20%, rgba(16,88,54,0.72) 0%, rgba(16,88,54,0) 38%)",
  "radial-gradient(circle at 46% 72%, rgba(61,255,154,0.16) 0%, rgba(61,255,154,0) 32%)",
  "radial-gradient(circle at 84% 80%, rgba(8,42,26,0.9) 0%, rgba(8,42,26,0) 42%)",
  "#050806",
].join(", ");

const PALETTE = ["#d9ffe9", "#3dff9a", "#1c8a54", "#0d5c38"];

function bokehTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const texture = new THREE.CanvasTexture(canvas);
  const context = canvas.getContext("2d");
  if (!context) return texture;

  const glow = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  glow.addColorStop(0, "rgba(244,255,250,0.96)");
  glow.addColorStop(0.16, "rgba(61,255,154,0.62)");
  glow.addColorStop(0.4, "rgba(24,128,78,0.2)");
  glow.addColorStop(1, "rgba(24,128,78,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, size, size);
  texture.needsUpdate = true;
  return texture;
}

type Orb = {
  sprite: THREE.Sprite;
  ox: number;
  oy: number;
  phase: number;
  speed: number;
  amp: number;
};

export function ParticleField() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.background = WASH;
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let texture: THREE.CanvasTexture | null = null;
    const materials: THREE.SpriteMaterial[] = [];
    let raf = 0;
    let alive = true;

    const dispose = () => {
      alive = false;
      if (raf !== 0) window.cancelAnimationFrame(raf);
      raf = 0;
      for (const material of materials) material.dispose();
      texture?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
      renderer = null;
    };

    try {

    const viewWidth = () => root.clientWidth || window.innerWidth;
    const viewHeight = () => Math.max(root.clientHeight || window.innerHeight, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, viewWidth() / viewHeight(), 0.1, 50);
    camera.position.set(0, 0, 12);

    const gl = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer = gl;
    gl.setClearColor(0x000000, 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    gl.setSize(viewWidth(), viewHeight());
    gl.domElement.style.display = "block";
    gl.domElement.style.width = "100%";
    gl.domElement.style.height = "100%";
    root.appendChild(gl.domElement);

    texture = bokehTexture();
    const group = new THREE.Group();
    scene.add(group);

    const orbs: Orb[] = [];

    for (let i = 0; i < ORB_COUNT; i += 1) {
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: new THREE.Color(PALETTE[i % PALETTE.length]),
        transparent: true,
        opacity: 0.26 + (i % 5) * 0.08,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });
      materials.push(material);

      const sprite = new THREE.Sprite(material);
      const scale = 2.1 + (i % 6) * 0.72;
      sprite.scale.set(scale, scale, 1);

      const ox = (Math.random() - 0.5) * 16;
      const oy = (Math.random() - 0.5) * 9.5;
      sprite.position.set(ox, oy, -1.5 - Math.random() * 7);
      group.add(sprite);

      orbs.push({
        sprite,
        ox,
        oy,
        phase: Math.random() * Math.PI * 2,
        speed: 0.11 + (i % 4) * 0.04,
        amp: 0.38 + (i % 5) * 0.12,
      });
    }

    const aim = { x: 0, y: 0 };
    const lean = { x: 0, y: 0 };
    let paused = document.hidden;

    const onPointer = (event: PointerEvent) => {
      aim.x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      aim.y = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };

    const onResize = () => {
      const w = viewWidth();
      const h = viewHeight();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      gl.setSize(w, h);
    };

    const tick = (now: number) => {
      if (!alive) return;
      if (paused) {
        raf = 0;
        return;
      }

      const t = now * 0.001;
      for (const orb of orbs) {
        orb.sprite.position.x = orb.ox + Math.sin(t * orb.speed + orb.phase) * orb.amp;
        orb.sprite.position.y = orb.oy + Math.cos(t * orb.speed * 0.7 + orb.phase) * orb.amp * 0.62;
      }

      lean.x += (aim.x * 1.05 - lean.x) * 0.035;
      lean.y += (-aim.y * 0.65 - lean.y) * 0.035;
      group.position.x = lean.x;
      group.position.y = lean.y;
      gl.render(scene, camera);
      raf = window.requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      paused = document.hidden;
      if (paused) {
        if (raf !== 0) window.cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      if (alive && raf === 0) raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointer);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!paused) raf = window.requestAnimationFrame(tick);

    return () => {
      paused = true;
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.remove(group);
      dispose();
    };
    } catch {
      dispose();
      root.style.background = WASH;
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
