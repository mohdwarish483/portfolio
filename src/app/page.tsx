import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/LinkIcons";
import { StackSection } from "@/components/StackSection";
import { WorkSection } from "@/components/WorkSection";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="about" className="section-anchor section-pad overflow-x-clip px-5 md:px-8">
        <div className="mx-auto w-full max-w-6xl text-left">
          <h2 className="heading-section">About</h2>
          <div className="surface mt-6 px-5 py-6 text-left md:px-7 md:py-7">
            <p className="text-body max-w-3xl text-fog">{site.about}</p>
            <p className="text-body mt-3 max-w-3xl text-fog">{site.education}</p>
            <ul className="mt-5 flex flex-col items-start gap-2">
              <li>
                <a href={`mailto:${site.email}`} className="link-row text-fog hover:text-amber">
                  <EmailIcon />
                  <span className="min-w-0 break-all">{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-row text-fog hover:text-amber"
                >
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-row text-fog hover:text-amber"
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <ExperienceSection />
      <WorkSection />
      <StackSection />
      <ContactSection />
    </>
  );
}
