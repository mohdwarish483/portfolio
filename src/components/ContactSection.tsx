import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Contact</p>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl text-white md:text-4xl">
          {site.contactHeadline}
        </h2>
        <p className="mt-5 max-w-2xl text-fog-dim">{site.contactSupport}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="bg-amber px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:bg-white"
          >
            Email me
          </a>
          <a
            href={site.resumePath}
            className="border border-fog/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:border-amber hover:text-amber"
          >
            Resume
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-fog/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:border-amber hover:text-amber"
          >
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-fog/25 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:border-amber hover:text-amber"
          >
            GitHub
          </a>
        </div>

        <p className="mt-8 font-mono text-sm text-fog-dim">
          <a href={`mailto:${site.email}`} className="text-fog hover:text-amber">
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-fog-dim">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs text-fog-dim">{site.role}</p>
      </div>
    </footer>
  );
}
