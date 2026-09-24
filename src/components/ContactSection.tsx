import { EmailIcon, GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/LinkIcons";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="section-anchor section-pad overflow-x-clip px-5 md:px-8">
      <div className="surface mx-auto grid max-w-6xl gap-8 px-5 py-8 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)] md:px-8 md:py-10">
        <div className="min-w-0">
          <h2 className="heading-section">Contact</h2>
          <p className="text-body mt-4 max-w-xl text-fog">{site.contactSupport}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a href={`mailto:${site.email}?subject=Hiring%20Mohammed%20Warish`} className="btn-primary link-row w-full sm:w-auto">
              <EmailIcon />
              <span>Email</span>
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost link-row w-full sm:w-auto">
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost link-row w-full sm:w-auto">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-ghost link-row w-full sm:w-auto">
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        <div className="flex min-w-0 flex-col justify-end gap-2 border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p className="text-secondary font-semibold text-amber">Direct</p>
          <a href={`mailto:${site.email}`} className="link-row text-white hover:text-amber">
            <EmailIcon />
            <span className="min-w-0 break-all">{site.email}</span>
          </a>
          <a href={site.phoneTel} className="text-body text-white hover:text-amber">
            {site.phoneDisplay}
          </a>
          <p className="text-secondary text-fog-dim">{site.location}</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <p className="text-secondary text-fog-dim">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="text-secondary text-fog-dim">{site.location}</p>
      </div>
    </footer>
  );
}
