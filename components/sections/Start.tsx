"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

export function Start() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-step-card]"));
    const ctx = gsap.context(() => {
      if (reduced) {
        if (line) gsap.set(line, { scaleY: 1 });
        gsap.set(cards, { clearProps: "all" });
        return;
      }

      gsap.set(cards, { autoAlpha: 0, y: 56, rotateX: 10 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, rotateX: 0 });
      if (line) gsap.set(line, { scaleY: 1 / cards.length, transformOrigin: "top" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cards.length * window.innerHeight * 0.95}`,
          pin: true,
          scrub: 0.55,
          snap: {
            snapTo: 1 / (cards.length - 1),
            duration: 0.3,
            ease: "power1.inOut",
          },
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(cards[i - 1], { autoAlpha: 0, y: -40, rotateX: -8, duration: 1 }, i);
        tl.to(card, { autoAlpha: 1, y: 0, rotateX: 0, duration: 1 }, "<");
        if (line) {
          tl.to(line, { scaleY: (i + 1) / cards.length, duration: 1 }, "<");
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="start" ref={sectionRef} className="relative">
      <div className="flex min-h-[100svh] flex-col justify-center px-6 py-24 lg:px-16">
        <h2 className="mx-auto mb-12 max-w-3xl text-center text-h2">{content.start.title}</h2>
        <div className="relative mx-auto w-full max-w-3xl" style={{ perspective: "1200px" }}>
          <div className="progress-track absolute bottom-8 top-8 start-0 hidden w-[3px] sm:block">
            <div ref={lineRef} className="progress-fill h-full origin-top" />
          </div>
          <div className={`relative ${reduced ? "space-y-8" : "min-h-[520px]"} sm:ps-12`}>
            {content.start.steps.map((step) => (
              <article
                key={step.n}
                data-step-card
                className={
                  reduced
                    ? "glass-card glass-deep rounded-shell p-8 sm:p-12"
                    : "absolute inset-0 glass-card glass-deep rounded-shell p-8 sm:p-12"
                }
              >
                <p data-step-num className="step-num relative z-10 mb-6">
                  {step.n}
                </p>
                <p className="relative z-10 text-xl font-bold leading-relaxed sm:text-2xl">{step.you}</p>
                <p className="relative z-10 mt-5 text-body leading-relaxed text-ink-soft">{step.me}</p>
                <p className="relative z-10 mt-8 text-caption text-accent">{step.time}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
