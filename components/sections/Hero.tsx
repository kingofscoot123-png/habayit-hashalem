"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();
  const [ready, setReady] = useState(reduced);
  const [lineOne, lineTwo, lineThree] = content.hero.titleLines;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    if (!section || !intro) return;

    if (reduced) {
      gsap.set(intro, { autoAlpha: 0 });
      setReady(true);
      return;
    }

    let fail = 0;
    const ctx = gsap.context(() => {
      const words = intro.querySelectorAll("[data-intro-word]");
      const show = () => {
        gsap.set(intro, { autoAlpha: 0 });
        setReady(true);
      };

      gsap.set(words, { opacity: 0, filter: "blur(8px)", y: 8 });
      fail = window.setTimeout(show, 6200);
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          window.clearTimeout(fail);
          setReady(true);
        },
      });
      tl.to(words, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.85, stagger: 0.42 });
      tl.to(intro, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, "+=1.4");
    }, section);

    return () => {
      window.clearTimeout(fail);
      ctx.revert();
    };
  }, [reduced]);

  const introWords = content.hero.titleLines.join(" ").split(" ");

  return (
    <header
      id="top"
      ref={sectionRef}
      className={`hero-studio relative flex min-h-[100svh] max-h-[940px] items-center overflow-hidden ${ready ? "is-ready" : ""}`}
    >
      <div
        ref={introRef}
        className="site-intro fixed inset-0 z-[70] flex items-center justify-center px-5 sm:px-8"
        aria-hidden="true"
      >
        <p className="max-w-4xl text-center text-[clamp(1.7rem,7vw,4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-ink">
          {introWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              data-intro-word
              className={`inline-block px-1 ${word === "נשברו" ? "glow-word-static" : ""}`}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="hero-ghost pointer-events-none absolute inset-inline-start-[-4vw] top-1/2 z-0 select-none"
        data-parallax="24"
      >
        {content.hero.ghost}
        <span className="hero-ghost__dot" />
      </div>
      <div className="hero-studio__light pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-[3] mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-5 px-6 pb-10 pt-20 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-24">
        <div className="relative flex items-center justify-center lg:col-span-5" data-hero-slide>
          <div className="hero-object relative flex w-full max-w-[460px] items-center justify-center" data-parallax="-40">
            <div className="pointer-events-none absolute bottom-8 h-7 w-[68%] rounded-full bg-[#1A2420]/18 blur-[24px]" />
            <Image
              src={content.hero.object}
              alt={content.hero.objectAlt}
              fill
              priority
              sizes="(min-width: 1024px) 460px, 80vw"
              className="object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7 lg:ps-4 xl:ps-10">
          <p data-hero-slide className="hero-studio__badge" style={{ animationDelay: "0.08s" }}>
            <span className="hero-studio__pulse" />
            {content.hero.badge}
          </p>

          <h1 data-hero-slide className="hero-studio__title" style={{ animationDelay: "0.16s" }}>
            <span className="block whitespace-nowrap">{lineOne}</span>
            <span className="block whitespace-nowrap">{lineTwo}</span>
            <span className="hero-studio__accent block whitespace-nowrap">{lineThree}</span>
          </h1>

          <p data-hero-slide className="hero-studio__meta" style={{ animationDelay: "0.28s" }}>
            <span>{content.hero.trust}</span>
            <a href={content.mapsHref} target="_blank" rel="noopener noreferrer">
              {content.address}
            </a>
          </p>

          <div data-hero-slide className="mt-10 flex items-center gap-4" style={{ animationDelay: "0.38s" }}>
            <a
              href={content.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-studio__cta"
            >
              {content.cta}
            </a>
            <a href="#path" aria-label={content.ctaSecondary} className="hero-studio__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-macro pointer-events-none absolute bottom-0 z-[2] hidden overflow-hidden lg:block">
        <Image src={content.hero.macro} alt="" fill sizes="320px" className="object-cover" />
      </div>
    </header>
  );
}
