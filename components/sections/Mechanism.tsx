"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

/*
1. איפה הקורא: רוצה להבין למה זה אחר.
2. כן אבל: איך זה עובד בפועל.
3. ארבעה פאנלים sticky, רקע כהה, קו שנמשך.
4. ביציאה: מבין את הסדר.
5. זיכרון: הפאנלים שעולים זה על זה.
*/

export function Mechanism() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { reduced } = useMotionPrefs();
  const steps = content.mechanism.steps;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-panel]"));
    const ctx = gsap.context(() => {
      if (!reduced) {
        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;
          gsap.to(panel, {
            scale: 0.94,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: panels[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: 1,
            },
          });
        });

        const path = pathRef.current;
        if (path) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          });
        }
      }
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="mechanism"
      ref={sectionRef}
      className="relative px-6 py-[88px] lg:px-16 lg:py-[140px]"
    >
      <svg
        className="pointer-events-none absolute left-6 top-[20vh] hidden h-[60%] w-8 lg:block"
        viewBox="0 0 8 400"
        fill="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M4 0 V400"
          stroke="var(--accent)"
          strokeWidth="2"
        />
      </svg>

      <div className="mb-16 max-w-measure">
        <h2 className="text-h2">{content.mechanism.title}</h2>
      </div>

      <div>
        {steps.map((step) => (
          <article
            key={step.title}
            data-panel
            className="step sticky top-[10vh] mb-6 min-h-[78vh] overflow-hidden rounded-shell border border-white/10 bg-[#1F2622] p-8 text-ink-inv lg:p-14"
          >
            <p className="max-w-measure text-h2">{step.title}</p>
            <p className="mt-6 max-w-measure text-lead text-ink-inv/75">{step.body}</p>
            <img
              src={step.image}
              alt={step.alt}
              className="mt-10 w-full rounded-media object-cover"
              style={{ aspectRatio: "3 / 2" }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
