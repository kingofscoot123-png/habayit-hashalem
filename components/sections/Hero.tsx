"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

/*
1. איפה הקורא בראש: שבור, סקפטי, בודק אם זה עוד אתר טיפול.
2. כן אבל: עוד הבטחה יפה.
3. הסקשן נותן תוצאה ב-6 מילים ובית שמתכווץ למסגרת.
4. ביציאה: אולי זה עליי.
5. זיכרון: החדר שנהיה תמונה.
*/

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { reduced, canPin } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const img = imgRef.current;
    if (!section || !media) return;

    const ctx = gsap.context(() => {
      const lines = section.querySelectorAll("[data-hero-line]");
      if (!reduced) {
        gsap.fromTo(
          lines,
          { y: "110%" },
          { y: "0%", duration: 0.9, stagger: 0.08, ease: "expo.out" },
        );
      }

      if (canPin) {
        gsap.fromTo(
          media,
          { clipPath: "inset(0% 0% 0% 0% round 0px)" },
          {
            clipPath: "inset(6% 10% 6% 10% round 28px)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=80%",
              scrub: 1,
              pin: true,
            },
          },
        );
      }

      if (img && !reduced) {
        gsap.fromTo(
          img,
          { y: -20 },
          {
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reduced, canPin]);

  return (
    <header ref={sectionRef} className="relative">
      <div className="relative min-h-[100svh]">
        <div ref={mediaRef} className="absolute inset-0 overflow-hidden">
          <img
            ref={imgRef}
            src="/images/hero.svg"
            alt={content.hero.mediaAlt}
            className="h-[120%] w-full object-cover"
            style={{ aspectRatio: "4 / 5" }}
          />
        </div>
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end">
          <div className="bg-surface px-6 pb-16 pt-12 lg:px-[12%] lg:pb-20">
            <h1 className="max-w-measure text-display text-ink">
              {content.hero.titleLines.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-hero-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-measure text-lead text-ink-soft">
              {content.hero.subtitle}
            </p>
            <a
              href={content.whatsappHref}
              className="mt-10 inline-flex w-fit rounded-button bg-accent px-6 py-3 text-body text-ink-inv"
            >
              {content.cta}
            </a>
            <p className="mt-4 text-caption text-ink-soft">{content.hero.trust}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
