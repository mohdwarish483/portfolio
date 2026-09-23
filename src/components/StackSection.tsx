"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stackPillars } from "@/lib/site";

export function StackSection() {
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Stack</p>
        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
          Three pillars I own
        </h2>
        <p className="mt-4 max-w-xl text-fog-dim">
          Keyword scan for recruiters—grouped, not a badge wall.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {stackPillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-amber">
                {pillar.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pillar.chips.map((chip) => (
                  <li
                    key={chip}
                    className="border border-line px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-fog"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
