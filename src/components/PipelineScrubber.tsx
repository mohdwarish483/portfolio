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
    <section
      className="border-y border-line bg-ink-elevated/60 py-14 md:py-16"
      aria-label="Call path latency scrubber"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
              Call path
            </p>
            <h2 className="mt-2 font-serif text-2xl text-white md:text-3xl">
              Scrub the turn budget
            </h2>
          </div>
          <p className="max-w-sm font-mono text-xs leading-relaxed text-fog-dim">
            Target &lt;500ms end-to-end. Drag to inspect stage contributions along
            STT → LLM → Tools → TTS.
          </p>
        </div>

        <div
          ref={trackRef}
          className="relative cursor-ew-resize touch-none select-none py-6"
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            onPointer(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons !== 1) return;
            onPointer(e.clientX);
          }}
        >
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            {stages.map((stage, i) => (
              <StageColumn
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
          <motion.div
            className="pointer-events-none absolute top-0 bottom-0 w-px bg-amber"
            style={{ left: scrubLeft }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-fog-dim">
          <span>0ms</span>
          <span className="text-amber">~450ms typical</span>
          <span>500ms budget</span>
        </div>
      </div>
    </section>
  );
}

function StageColumn({
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
  const opacity = useTransform(progress, (p) => {
    if (p < start) return 0.35;
    if (p > end) return 0.55;
    return 1;
  });
  const scaleY = useTransform(progress, (p) => {
    if (p >= start && p <= end) return 1;
    return 0.72;
  });

  return (
    <motion.div
      style={{ opacity }}
      className="relative z-10 border border-line bg-ink/80 p-3 md:p-4"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
    >
      <motion.div
        className="mb-3 origin-bottom bg-gradient-to-t from-teal-mid to-amber"
        style={{ height: `${stage.budget / 2.2}px`, scaleY }}
      />
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-white">
        {stage.label}
      </p>
      <p className="mt-1 text-sm text-fog-dim">{stage.detail}</p>
      <p className="mt-2 font-mono text-[11px] text-amber">~{stage.budget}ms</p>
    </motion.div>
  );
}
