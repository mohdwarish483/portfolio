"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ResumeIcon, WhatsAppIcon } from "@/components/LinkIcons";
import { site } from "@/lib/site";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const startY = window.scrollY;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 12) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <header ref={barRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div className="relative mx-auto flex w-full max-w-3xl justify-center">
        <div className="nav-pill flex w-full items-center gap-1 rounded-full px-2 py-1.5 backdrop-blur-md md:px-3">
          <Link
            href="/"
            className="shrink-0 px-3 font-serif text-lg leading-none tracking-tight"
            onClick={() => setOpen(false)}
          >
            <span className="text-white">St.</span>{" "}
            <span className="text-amber">Warish</span>
          </Link>

          <nav className="mx-auto hidden items-center md:flex">
            {links.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="nav-link h-9 w-9 justify-center px-0"
            >
              <WhatsAppIcon />
            </a>
            <a href={site.resumePath} className="nav-link gap-1.5 normal-case tracking-normal">
              <ResumeIcon />
              <span>Resume</span>
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog md:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="site-menu"
            className="nav-pill absolute inset-x-0 top-14 rounded-2xl px-3 py-2 md:hidden"
          >
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link min-h-11 w-full justify-start text-base normal-case tracking-normal"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
