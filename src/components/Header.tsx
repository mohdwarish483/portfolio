"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "border-b border-line bg-ink/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tight text-fog group-hover:text-white">
            {site.shortName}
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-fog-dim sm:inline">
            AI Engineer
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-fog-dim transition-colors hover:text-amber"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.resumePath}
            className="ml-3 border border-amber/40 px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-amber transition-colors hover:bg-amber hover:text-ink"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-widest text-fog md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink px-5 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2 font-mono text-sm uppercase tracking-[0.14em] text-fog"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.resumePath}
              className="py-2 font-mono text-sm uppercase tracking-[0.14em] text-amber"
              onClick={() => setOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
