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

    let fail = 0;
    const ctx = gsap.context(() => {
      const introWords = intro.querySelectorAll("[data-intro-word]");
      const slide = section.querySelectorAll("[data-hero-slide]");
      const frame = section.querySelector(".gold-frame");
      const line = section.querySelector(".gold-line");

      const showHero = () => {
        gsap.set(intro, { autoAlpha: 0 });
        gsap.set(slide, { y: 0, opacity: 1 });
        gsap.set(frame, { opacity: 1 });
        gsap.set(line, { scaleX: 1, opacity: 1 });
      };

      if (reduced) {
        showHero();
        return;
      }

      gsap.set(introWords, { opacity: 0, filter: "blur(8px)", y: 8 });
      gsap.set(slide, { y: 20, opacity: 0 });
      gsap.set(frame, { opacity: 0 });
      gsap.set(line, { scaleX: 0, opacity: 1 });

      fail = window.setTimeout(showHero, 6200);
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => window.clearTimeout(fail),
      });
      tl.to(introWords, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.85,
        stagger: 0.42,
      });
      tl.to(intro, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, "+=1.4");
      tl.to(slide, { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 }, "-=0.35");
      tl.to(frame, { opacity: 1, duration: 1.1 }, "-=0.6");
      tl.to(line, { scaleX: 1, duration: 1 }, "-=0.9");
    }, section);

    return () => {
      window.clearTimeout(fail);
      ctx.revert();
    };
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
            className="h-full w-full object-cover object-[center_36%] md:object-[center_42%]"
            data-hero-media
          />
        </picture>
        <div className="hero-veil" />
        <div className="gold-frame hidden lg:block" />
      </div>

      <div
        ref={introRef}
        className="site-intro fixed inset-0 z-[70] flex items-center justify-center px-5 sm:px-8"
        aria-hidden="true"
      >
        <p className="max-w-4xl text-center font-display text-[clamp(1.7rem,7vw,4.4rem)] font-light leading-[1.15] tracking-[0.01em] text-ink">
          {introWords.map(({ word, glow }, i) => (
            <span
              key={`${word}-${i}`}
              data-intro-word
              className={`inline-block px-1 ${glow ? "glow-word-static" : ""}`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="hero-copy relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:px-6">
        <h1 data-hero-slide className="hero-title text-ink">
          {content.hero.titleLines.map((line) => {
            const parts = glowify(line);
            return (
              <span key={line} className="hero-title__line">
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

        <div data-hero-slide className="gold-line mx-auto mt-6 w-28 sm:mt-8 sm:w-40" />

        <div data-hero-slide className="mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:gap-4">
          <a
            href={content.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold shimmer w-full rounded-2xl px-8 py-4 text-base font-normal sm:w-auto"
          >
            {content.cta}
          </a>
          <a href="#path" className="btn-ghost w-full rounded-2xl px-8 py-4 text-base font-normal sm:w-auto">
            {content.ctaSecondary}
          </a>
        </div>

        <p data-hero-slide className="mt-5 text-caption tracking-[0.16em] text-ink-soft sm:mt-6">
          {content.hero.trust}
        </p>
      </div>
    </header>
  );
}
