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
    if (!section || reduced) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-step-card]"));
      if (cards.length < 2) return;

      gsap.set(cards, { autoAlpha: 0, y: 36 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });
      if (line) gsap.set(line, { scaleY: 1 / cards.length, transformOrigin: "top" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(cards.length - 1) * Math.min(380, window.innerHeight * 0.4)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(cards[i - 1], { autoAlpha: 0, y: -24, duration: 0.4 }, i);
        tl.to(card, { autoAlpha: 1, y: 0, duration: 0.4 }, "<");
        if (line) tl.to(line, { scaleY: (i + 1) / cards.length, duration: 0.4 }, "<");
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(cards, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="start" ref={sectionRef} className="relative">
      <div className="flex min-h-0 flex-col justify-center px-5 py-16 sm:px-6 lg:min-h-[100svh] lg:px-16 lg:py-20">
        <h2 className="mx-auto mb-8 max-w-3xl text-center text-h2 lg:mb-12">{content.start.title}</h2>
        <div className="relative mx-auto w-full max-w-3xl" style={{ perspective: "1200px" }}>
          <div className="progress-track absolute bottom-8 top-8 start-0 hidden w-[3px] lg:block">
            <div ref={lineRef} className="progress-fill h-full origin-top" />
          </div>
          <div className={`relative lg:ps-12 ${reduced ? "space-y-6" : "start-panels"}`}>
            {content.start.steps.map((step) => (
              <article
                key={step.n}
                data-step-card
                className="glass-card glass-deep overflow-hidden rounded-shell"
              >
                <div className="media-zoom">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="h-44 w-full object-cover brightness-110 contrast-105 sm:h-52"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p data-step-num className="step-num relative z-10 mb-4">
                    {step.n}
                  </p>
                  <p className="relative z-10 text-lg font-light tracking-wide sm:text-2xl">{step.you}</p>
                  <p className="relative z-10 mt-3 text-body text-ink-soft">{step.me}</p>
                  <p className="relative z-10 mt-5 text-caption tracking-wide text-accent">{step.time}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
