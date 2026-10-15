"use client";

import { useEffect, useState } from "react";
import { content } from "@/content";
import { Logo } from "@/components/Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav-bar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <a href="#top" className="min-w-0" aria-label={content.brand}>
          <Logo />
        </a>
        <div className="hidden items-center gap-6 text-[13px] text-[var(--hs-muted)] lg:flex">
          <a href="#about" className="transition hover:text-[var(--hs-ink)]">
            {content.pain.title}
          </a>
          <a href="#treat" className="transition hover:text-[var(--hs-ink)]">
            {content.treat.title}
          </a>
          <a href="#path" className="transition hover:text-[var(--hs-ink)]">
            {content.methods.title}
          </a>
          <a href="#who" className="transition hover:text-[var(--hs-ink)]">
            {content.who.title}
          </a>
          <a href="#quotes" className="transition hover:text-[var(--hs-ink)]">
            המלצות
          </a>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href={content.phoneHref} className="nav-tel hidden sm:inline-flex">
            {content.phoneDisplay}
          </a>
          <a
            href={content.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hs-hero__btn hs-hero__btn--wa h-11 whitespace-nowrap px-5 text-sm sm:px-6"
          >
            {content.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
