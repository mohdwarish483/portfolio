"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

const stages = [
  { id: "stt", label: "STT", detail: "Deepgram", budget: 90 },
  { id: "llm", label: "LLM", detail: "TTFT", budget: 180 },
  { id: "tools", label: "Tools", detail: "Schedule / auth", budget: 70 },
  { id: "tts", label: "TTS", detail: "ElevenLabs", budget: 110 },
];

const maxBudget = Math.max(...stages.map((s) => s.budget));

export function PipelineScrubber() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.35);
  const progress = useTransform(x, (v) => Math.min(1, Math.max(0, v)));
  const scrubLeft = useTransform(progress, (p) => `${p * 100}%`);

  const onPointer = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((clientX - rect.left) / rect.width);
  };

  return (
    <section className="px-5 py-6 md:px-8" aria-label="Call path latency scrubber">
      <div className="surface mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Call path</p>
            <h2 className="mt-2 font-serif text-2xl text-white md:text-3xl">Scrub the turn budget</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fog-dim">
            Target &lt;500ms end-to-end. Drag the track to inspect STT, LLM, tools, and TTS.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stages.map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              start={i / stages.length}
              end={(i + 1) / stages.length}
              progress={progress}
              index={i}
              reduce={!!reduce}
            />
          ))}
        </div>

        <div
          ref={trackRef}
          className="relative mt-6 cursor-ew-resize touch-none select-none py-4"
          onPointerDown={(e) => {
            (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
            onPointer(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons !== 1) return;
            onPointer(e.clientX);
          }}
        >
          <div className="h-1.5 rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-amber/70"
              style={{ width: scrubLeft }}
            />
          </div>
          <motion.div
            className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-amber shadow-[0_0_16px_rgba(61,255,154,0.7)]"
            style={{ left: scrubLeft }}
          />
        </div>

        <div className="mt-1 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">
          <span>0ms</span>
          <span className="text-amber">~450ms typical</span>
          <span>500ms budget</span>
        </div>
      </div>
    </section>
  );
}

function StageCard({
  stage,
  start,
  end,
  progress,
  index,
  reduce,
}: {
  stage: (typeof stages)[number];
  start: number;
  end: number;
  progress: MotionValue<number>;
  index: number;
  reduce: boolean;
}) {
  const onStage = (p: number) => p >= start && p <= end;
  const barScale = useTransform(progress, (p) => (onStage(p) ? 1 : 0.92));
  const barOpacity = useTransform(progress, (p) => (onStage(p) ? 1 : 0.45));

  return (
    <motion.div
      className="rounded-2xl border border-line bg-ink/70 p-4"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <div className="flex h-24 items-end">
        <motion.div
          className="w-full origin-bottom rounded-md bg-gradient-to-t from-teal-mid to-amber"
          style={{
            height: `${Math.max(28, (stage.budget / maxBudget) * 96)}px`,
            scaleY: barScale,
            opacity: barOpacity,
          }}
        />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-white">{stage.label}</p>
      <p className="mt-1 text-sm text-fog-dim">{stage.detail}</p>
      <p className="mt-2 font-mono text-xs text-amber">~{stage.budget}ms</p>
    </motion.div>
  );
}
