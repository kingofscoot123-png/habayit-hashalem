"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

export function Mechanism() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();
  const steps = content.mechanism.steps;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-panel]"));
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 48 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${panels.length * window.innerHeight}`,
          pin: true,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.32,
            ease: "power1.inOut",
          },
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -28, duration: 0.45 });
        tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.45 });
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" ref={sectionRef} className="relative">
      <div className="flex min-h-[100svh] flex-col justify-center px-6 py-24 lg:px-16">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            {content.mechanism.kicker}
          </p>
          <h2 className="text-h2">{content.mechanism.title}</h2>
        </div>

        <div className={`relative mx-auto w-full max-w-5xl ${reduced ? "space-y-10" : "min-h-[560px]"}`}>
          {steps.map((step) => (
            <article
              key={step.title}
              data-panel
              className={
                reduced
                  ? "glass-card glass-deep grid gap-8 rounded-shell p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]"
                  : "absolute inset-0 grid gap-8 rounded-shell p-6 glass-card glass-deep sm:p-10 lg:grid-cols-[1.05fr_0.95fr]"
              }
            >
              <div className="relative z-10 flex flex-col justify-center">
                <p className="text-h2">{step.title}</p>
                <p className="mt-5 text-lead text-ink-soft">{step.body}</p>
              </div>
              <div className="media-zoom relative z-10 overflow-hidden rounded-media">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="h-full w-full object-cover"
                  style={{ aspectRatio: "16 / 10" }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
