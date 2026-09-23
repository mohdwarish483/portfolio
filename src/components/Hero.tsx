"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden site-atmosphere">
      <div className="spectrogram-grain absolute inset-0 opacity-70" aria-hidden />
      <WaveformBg />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-32 md:justify-center md:px-8 md:pb-24 md:pt-28">
        <motion.p
          className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-amber"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {site.role}
        </motion.p>

        <motion.h1
          className="max-w-4xl font-serif text-[clamp(3.25rem,10vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-white"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          {site.name}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-2xl text-xl leading-relaxed text-fog md:text-2xl"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {site.thesis}
        </motion.p>

        <motion.p
          className="mt-4 max-w-xl text-base text-fog-dim md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
        >
          {site.support}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#work"
            className="bg-amber px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:bg-white"
          >
            Case studies
          </a>
          <a
            href={site.resumePath}
            className="border border-fog/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:border-amber hover:text-amber"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="border border-fog/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:border-amber hover:text-amber"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function WaveformBg() {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const h = 12 + ((i * 17) % 55) + (i % 3) * 8;
    return h;
  });

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[38vh] items-end justify-center gap-[3px] px-4 opacity-40 md:gap-1"
      aria-hidden
    >
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] bg-gradient-to-t from-teal-mid/80 via-amber/50 to-transparent md:w-1"
          style={{ height: `${h}%` }}
          animate={{
            scaleY: [1, 0.55 + (i % 5) * 0.08, 1.15, 0.7, 1],
          }}
          transition={{
            duration: 3.2 + (i % 7) * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}
