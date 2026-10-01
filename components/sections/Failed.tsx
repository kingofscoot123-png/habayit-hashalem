"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

/*
1. איפה הקורא: מתגונן — ניסינו.
2. כן אבל: אז מה, אנחנו אשמים?
3. מוחק את מה שניסו, משאיר משפט אחד חד.
4. ביציאה: אז מה כן.
5. זיכרון: השורה שנשארת.
*/

export function Failed() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rows = section.querySelectorAll<HTMLElement>("[data-row]");
    const ctx = gsap.context(() => {
      if (reduced) {
        rows.forEach((row) => {
          const strike = row.querySelector("[data-strike]");
          gsap.set(strike, { scaleX: 1 });
          gsap.set(row, { opacity: 0.35 });
        });
        return;
      }
      rows.forEach((row) => {
        const strike = row.querySelector("[data-strike]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            once: true,
          },
        });
        tl.to(strike, {
          scaleX: 1,
          transformOrigin: "right",
          duration: 0.5,
          ease: "power2.inOut",
        });
        tl.to(row, { opacity: 0.35, duration: 0.5 }, "<0.1");
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <p className="mb-16 max-w-measure text-lead">{content.failed.lead}</p>
      <ul className="max-w-measure space-y-6">
        {content.failed.rows.map((row) => (
          <li key={row} data-row className="relative text-h2">
            <span
              data-strike
              className="pointer-events-none absolute right-0 top-1/2 h-px w-full origin-right scale-x-0 bg-ink"
            />
            {row}
          </li>
        ))}
      </ul>
      <p className="mt-16 max-w-measure text-h2">{content.failed.remain}</p>
    </section>
  );
}
