"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeroFigure } from "@/components/HeroFigure";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_minmax(7.5rem,17rem)] items-center gap-4 px-4 pb-8 pt-24 sm:gap-8 md:px-8 md:pb-12 md:pt-28">
      <div className="min-w-0 text-left">
        <motion.h1
          className="font-serif text-[clamp(2.1rem,5.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {site.name}
        </motion.h1>

        <motion.p
          className="mt-3 max-w-xl text-base text-fog sm:text-lg md:mt-4 md:text-xl"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {site.role} · 2+ years across voice, vision, and agents
        </motion.p>

        <motion.p
          className="text-secondary mt-2 max-w-lg text-fog-dim"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          {site.support}
        </motion.p>

        <motion.div
          className="mt-5 flex flex-wrap items-center gap-3 md:mt-7"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
        >
          <a href="#projects" className="btn-primary">
            View projects
          </a>
          <a href="#contact" className="btn-ghost">
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroFigure />
      </motion.div>
    </section>
  );
}
