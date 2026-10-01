"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

/*
1. איפה הקורא: פחד מתהליך ארוך.
2. כן אבל: כמה זמן, מה אני צריך לעשות.
3. שלושה שלבים ממוספרים, קו התקדמות.
4. ביציאה: זה קטן יותר ממה שחשבתי.
5. זיכרון: שלושת הצעדים.
*/

export function Start() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;
    const dots = section.querySelectorAll("[data-dot]");
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(line, { scaleY: 1 });
        gsap.set(dots, { backgroundColor: "var(--ink)" });
        return;
      }
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );
      dots.forEach((dot) => {
        ScrollTrigger.create({
          trigger: dot,
          start: "top 70%",
          onEnter: () => {
            gsap.to(dot, { backgroundColor: "var(--ink)", duration: 0.25, ease: "power2.inOut" });
          },
          onLeaveBack: () => {
            gsap.to(dot, { backgroundColor: "transparent", duration: 0.25, ease: "power2.inOut" });
          },
        });
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <h2 className="mb-16 max-w-measure text-h2">{content.start.title}</h2>
      <div className="relative max-w-measure ps-8">
        <div className="absolute bottom-4 start-1 top-4 w-px bg-ink/10">
          <div ref={lineRef} className="h-full w-px origin-top bg-ink" />
        </div>
        <ol className="space-y-16">
          {content.start.steps.map((step) => (
            <li key={step.n} className="relative">
              <span
                data-dot
                className="absolute -start-8 top-1.5 h-3 w-3 rounded-full border border-ink bg-transparent"
              />
              <p className="text-caption text-ink-soft">{step.n}</p>
              <p className="mt-2 text-lead">{step.you}</p>
              <p className="mt-1 text-body text-ink-soft">{step.me}</p>
              <p className="mt-3 text-caption">{step.time}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
