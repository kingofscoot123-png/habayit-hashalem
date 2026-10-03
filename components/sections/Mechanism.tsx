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

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-panel]"));
      if (panels.length < 2) return;

      gsap.set(panels, { autoAlpha: 0, y: 28 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(panels.length - 1) * Math.min(420, window.innerHeight * 0.42)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -18, duration: 0.4 }, i);
        tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.4 }, "<");
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(panels, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="process" ref={sectionRef} className="relative">
      <div className="flex min-h-0 flex-col justify-center px-5 py-16 sm:px-6 lg:min-h-[100svh] lg:px-16 lg:py-20">
        <div className="mx-auto mb-6 max-w-3xl text-center lg:mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            {content.mechanism.kicker}
          </p>
          <h2 className="text-h2">{content.mechanism.title}</h2>
        </div>

        <div className={`relative mx-auto w-full max-w-5xl ${reduced ? "space-y-8" : "mechanism-panels"}`}>
          {steps.map((step) => (
            <article
              key={step.title}
              data-panel
              className="glass-card glass-deep grid gap-6 rounded-shell p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:p-10"
            >
              <div className="relative z-10 flex flex-col justify-center">
                <p className="text-h2">{step.title}</p>
                <p className="mt-4 text-body text-ink-soft sm:mt-5 sm:text-lead">{step.body}</p>
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
