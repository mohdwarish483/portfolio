"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { experience } from "@/lib/site";

export function ExperienceSection() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          Experience
        </p>
        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
          Where the systems shipped
        </h2>

        <ol className="mt-12 space-y-10">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.org}-${job.period}`}
              className={`grid gap-4 border-l border-line pl-5 md:grid-cols-[180px_1fr] md:gap-10 ${
                job.sidebar ? "opacity-90" : ""
              }`}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-fog-dim">
                  {job.period}
                </p>
                <p className="mt-2 text-sm text-fog">{job.role}</p>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  {job.orgUrl ? (
                    <a
                      href={job.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-2xl text-white hover:text-amber"
                    >
                      {job.org}
                    </a>
                  ) : (
                    <h3 className="font-serif text-2xl text-white">{job.org}</h3>
                  )}
                  {job.caseStudySlug && (
                    <Link
                      href={`/work/${job.caseStudySlug}/`}
                      className="font-mono text-xs uppercase tracking-[0.14em] text-amber hover:underline"
                    >
                      Case study →
                    </Link>
                  )}
                </div>
                <p className="mt-2 text-fog-dim">{job.oneLiner}</p>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-fog-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-amber" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
