import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { PipelineScrubber } from "@/components/PipelineScrubber";
import { StackSection } from "@/components/StackSection";
import { WorkSection } from "@/components/WorkSection";
import { getAllCaseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export default function HomePage() {
  const studies = getAllCaseStudies();

  return (
    <>
      <Hero />
      <PipelineScrubber />
      <WorkSection studies={studies} />
      <ExperienceSection />
      <StackSection />
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            About
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fog md:text-xl">
            {site.about}
          </p>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
