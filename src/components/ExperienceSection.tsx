"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { experience, type ExperienceItem } from "@/lib/site";

export function ExperienceSection() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="section-anchor section-pad overflow-x-clip px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="heading-section">Experience</h2>

        <ol className="mt-6 space-y-4">
          {experience.map((job) => (
            <RoleCard key={`${job.org}-${job.period}`} job={job} reduce={reduce} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function RoleCard({ job, reduce }: { job: ExperienceItem; reduce: boolean | null }) {
  const ref = useRef<HTMLLIElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.55"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const groups = job.groups ?? [];

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <li ref={ref} className="[perspective:1100px]">
      <motion.article
        className="card-hover surface origin-top p-5 sm:p-6"
        style={reduce === false && ready ? { rotateX, y } : undefined}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="role-mark">{job.role}</p>
          <p className="meta-date text-amber">{job.period}</p>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {job.orgUrl ? (
            <a
              href={job.orgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="heading-card underline decoration-amber/50 underline-offset-4 hover:text-amber"
            >
              {job.org}
            </a>
          ) : (
            <h3 className="heading-card">{job.org}</h3>
          )}
          {job.place ? <p className="text-secondary text-fog-dim">{job.place}</p> : null}
        </div>

        <p className="text-secondary mt-2 max-w-3xl text-fog">{job.oneLiner}</p>

        {groups.length > 0 ? (
          <div className="mt-4 space-y-3">
            {groups.map((group) => (
              <div key={group.label}>
                <h4 className="text-secondary font-semibold text-amber">{group.label}</h4>
                <ul className="mt-1">
                  {group.bullets.map((bullet) => (
                    <li key={bullet} className="text-body flex gap-2 py-0.5 leading-snug text-fog">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="mt-3">
            {job.bullets.map((bullet) => (
              <li key={bullet} className="text-body flex gap-2 py-0.5 leading-snug text-fog">
                <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.article>
    </li>
  );
}
