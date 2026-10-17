"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { content } from "@/content";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "#about", label: content.pain.title },
  { href: "#treat", label: content.treat.title },
  { href: "#quotes", label: content.quotes.title },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-brand-cream/90 shadow-sm backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-6 md:h-20 lg:px-8">
          <div className="hidden items-center gap-8 md:flex">
            <a
              href={NAV_LINKS[0].href}
              className="flex items-center gap-1 text-sm uppercase tracking-wide text-brand-dark transition-opacity hover:opacity-70 animate-fade-down stagger-1"
            >
              {NAV_LINKS[0].label}
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={NAV_LINKS[1].href}
              className="text-sm uppercase tracking-wide text-brand-dark transition-opacity hover:opacity-70 animate-fade-down stagger-2"
            >
              {NAV_LINKS[1].label}
            </a>
            <a
              href={NAV_LINKS[2].href}
              className="text-sm uppercase tracking-wide text-brand-dark transition-opacity hover:opacity-70 animate-fade-down stagger-3"
            >
              {NAV_LINKS[2].label}
            </a>
          </div>

          <a
            href="#top"
            className="absolute left-1/2 flex -translate-x-1/2 items-center animate-fade-down stagger-2"
            aria-label={content.brand}
            onClick={closeMenu}
          >
            <Logo className="scale-90 md:scale-100" />
          </a>

          <a
            href={content.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-auto hidden items-center rounded-full bg-brand-dark px-5 py-2.5 text-sm uppercase tracking-wide text-white transition-colors hover:bg-brand-green md:inline-flex animate-fade-down stagger-3"
          >
            {content.cta}
          </a>

          <button
            type="button"
            className="relative z-50 ms-auto h-10 w-10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`absolute left-1/2 top-[6px] h-[2px] w-6 -translate-x-1/2 rounded bg-brand-dark transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${
                menuOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-1/2 top-[13px] h-[2px] w-6 -translate-x-1/2 rounded bg-brand-dark transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${
                menuOpen ? "-rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-brand-cream transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`flex h-full flex-col items-center justify-center gap-8 transition-all delay-100 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-3xl tracking-tight text-brand-dark"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href={content.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-full bg-brand-dark px-8 py-3.5 text-lg tracking-wide text-white"
            onClick={closeMenu}
          >
            {content.cta}
          </a>
        </div>
      </div>
    </>
  );
}
