"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudyFrontmatter } from "@/lib/case-studies";
import { workBlurbs } from "@/lib/site";

type Props = {
  studies: CaseStudyFrontmatter[];
};

export function WorkSection({ studies }: Props) {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          Selected work
        </p>
        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
          Case studies that prove the systems claim
        </h2>
        <p className="mt-4 max-w-2xl text-fog-dim">
          Readable rows—no flip cards. Architecture, latency, and tradeoffs over
          badge walls.
        </p>

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {studies.map((study, i) => (
            <motion.li
              key={study.slug}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link
                href={`/work/${study.slug}/`}
                className="group grid gap-4 py-8 transition-colors md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] md:items-center md:gap-8"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-2xl text-white group-hover:text-amber">
                      {study.title}
                    </h3>
                    <StatusChip status={study.status} />
                  </div>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-amber">
                    {study.outcomeMetric}
                  </p>
                  <p className="mt-3 max-w-xl text-fog-dim">
                    {workBlurbs[study.slug] ?? study.subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {study.stack.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-fog-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-fog transition-colors group-hover:text-amber">
                  Open →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatusChip({ status }: { status: string }) {
  const label =
    status === "public"
      ? "Source available"
      : status === "proprietary-summary"
        ? "Summary · NDA"
        : "Proprietary";

  return (
    <span className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fog-dim">
      {label}
    </span>
  );
}
