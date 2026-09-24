"use client";

import { motion, useReducedMotion } from "framer-motion";
import { certifications, stackPillars } from "@/lib/site";

export function StackSection() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="section-anchor section-pad overflow-x-clip px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="heading-section">Skills</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stackPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="surface min-w-0 p-5"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.4 }}
            >
              <h3 className="text-body font-semibold text-white">{pillar.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pillar.chips.map((chip) => (
                  <li key={chip}>
                    <span className="skill-chip">{chip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="heading-card">Certifications</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {certifications.map((item) => (
              <li key={item.title} className="surface min-w-0 px-4 py-3">
                <p className="text-body text-fog">{item.title}</p>
                <p className="text-secondary mt-1 text-fog-dim">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
