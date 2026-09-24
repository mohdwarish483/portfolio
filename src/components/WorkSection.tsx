"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects, type Project } from "@/lib/site";

export function WorkSection() {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="section-anchor section-pad overflow-x-clip px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="heading-section">Projects</h2>

        <ul className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.li
              key={project.title}
              className="min-w-0"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="card-hover surface flex h-full min-w-0 flex-col p-5 sm:p-6">
      <p className="meta-date text-amber">{project.period}</p>
      <h3 className="heading-card mt-2">{project.title}</h3>
      <p className="text-body mt-3 text-fog">{project.outcome}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.chips.map((chip) => (
          <li key={chip} className="chip">
            {chip}
          </li>
        ))}
      </ul>
      <p className="text-secondary mt-4 flex-1 text-fog-dim">{project.summary}</p>

      <div className="mt-5">
        {project.slug ? (
          <Link href={`/work/${project.slug}/`} className="text-secondary font-semibold text-amber">
            View project
          </Link>
        ) : (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="text-secondary font-semibold text-amber"
          >
            {open ? "Hide details" : "Details"}
          </button>
        )}
      </div>

      {open && !project.slug ? (
        <ul className="mt-4 space-y-2 border-t border-line pt-4">
          {project.details.map((detail) => (
            <li key={detail} className="text-secondary flex gap-2.5 text-fog">
              <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
