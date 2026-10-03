"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

function glowify(line: string) {
  return line.split(" ").map((word) => {
    const clean = word.replace(/[.,—–־]/g, "");
    const glow = (content.hero.glowWords as readonly string[]).includes(clean);
    return { word, glow };
  });
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    if (!section || !intro) return;

    const ctx = gsap.context(() => {
      const introWords = intro.querySelectorAll("[data-intro-word]");
      const slide = section.querySelectorAll("[data-hero-slide]");
      const frame = section.querySelector(".gold-frame");
      const line = section.querySelector(".gold-line");

      if (reduced) {
        gsap.set(intro, { autoAlpha: 0 });
        gsap.set(slide, { y: 0, opacity: 1 });
        gsap.set([frame, line], { opacity: 1, scaleX: 1 });
        return;
      }

      gsap.set(introWords, { opacity: 0, filter: "blur(10px)", y: 10 });
      gsap.set(slide, { y: 28, opacity: 0 });
      gsap.set(frame, { opacity: 0 });
      gsap.set(line, { scaleX: 0, opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(introWords, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.9,
        stagger: 0.48,
      });
      tl.to(intro, { autoAlpha: 0, duration: 1.15 }, "+=2.4");
      tl.to(slide, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, "-=0.35");
      tl.to(frame, { opacity: 1, duration: 1.1 }, "-=0.6");
      tl.to(line, { scaleX: 1, duration: 1 }, "-=0.9");
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  const introWords = glowify(content.hero.titleLines.join(" "));

  return (
    <header id="top" ref={sectionRef} className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet={content.hero.mediaDesktop} />
          <img
            src={content.hero.mediaMobile}
            alt={content.hero.mediaAlt}
            className="hero-pulse h-full w-full object-cover object-[center_20%]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/35 via-[#0b0f19]/62 to-[#0b0f19]" />
        <div className="hero-spot" />
        <span className="orb orb-a" data-parallax="-40" />
        <span className="orb orb-b" data-parallax="50" />
        <span className="orb orb-c" data-parallax="-24" />
        <div className="gold-frame hidden md:block" />
      </div>

      <div
        ref={introRef}
        className="site-intro fixed inset-0 z-[70] flex items-center justify-center bg-black px-6"
        aria-hidden="true"
      >
        <p className="max-w-4xl text-center text-display text-ink">
          {introWords.map(({ word, glow }, i) => (
            <span
              key={`${word}-${i}`}
              data-intro-word
              className={`inline-block px-1 ${glow ? "glow-word" : ""}`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 pb-16 pt-28 text-center">
        <span
          data-hero-slide
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold tracking-wide text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {content.hero.badge}
        </span>

        <h1 data-hero-slide className="text-display text-ink">
          {content.hero.titleLines.map((line) => {
            const parts = glowify(line);
            return (
              <span key={line} className="block">
                {parts.map(({ word, glow }, i) => (
                  <span key={`${word}-${i}`} className={glow ? "glow-word" : undefined}>
                    {word}
                    {i < parts.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            );
          })}
        </h1>

        <div data-hero-slide className="gold-line mx-auto mt-6 w-40" />

        <p data-hero-slide className="mt-6 max-w-measure text-lead text-ink-soft">
          {content.hero.subtitle}
        </p>

        <div data-hero-slide className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={content.phoneHref} className="btn-gold shimmer w-full rounded-2xl px-8 py-4 text-base font-bold sm:w-auto">
            {content.cta}
          </a>
          <a href="#services" className="btn-ghost w-full rounded-2xl px-8 py-4 text-base font-medium sm:w-auto">
            {content.ctaSecondary}
          </a>
        </div>

        <p data-hero-slide className="mt-5 text-caption text-ink-soft">
          {content.hero.trust}
        </p>
      </div>
    </header>
  );
}
