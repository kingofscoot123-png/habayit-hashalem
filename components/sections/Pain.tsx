"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

/*
1. איפה הקורא: מזהה את עצמו במשפט הראשון.
2. כן אבל: כולם אומרים את זה.
3. פסקה אחת, מילים נדלקות, משפט לא נוח בסוף.
4. ביציאה: נראה.
5. זיכרון: הבית כבר לא מרגיש כמו בית.
*/

export function Pain() {
  const elRef = useRef<HTMLParagraphElement>(null);
  const { reduced } = useMotionPrefs();
  const words = content.pain.text.split(" ");

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const spans = el.querySelectorAll("span");
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(spans, { opacity: 1 });
        return;
      }
      gsap.set(spans, { opacity: 0.18 });
      gsap.to(spans, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <p ref={elRef} className="mx-auto max-w-measure text-h2">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
