"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

/*
1. איפה הקורא: מוכן או לא.
2. כן אבל: עוד לחיצה שקרית.
3. אותה כותרת, אותו CTA, כפתור מגנטי עדין.
4. ביציאה: יודע מה קורה אחרי.
5. זיכרון: הכפתור.
*/

export function Close() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const lines = section.querySelectorAll("[data-close-line]");
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          lines,
          { y: "110%" },
          {
            y: "0%",
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true },
          },
        );
      }
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, {
        x: gsap.utils.clamp(-6, 6, x * 0.12),
        y: gsap.utils.clamp(-6, 6, y * 0.12),
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <h2 className="max-w-measure text-display">
        {content.close.titleLines.map((line) => (
          <span key={line} className="block overflow-hidden">
            <span data-close-line className="block">
              {line}
            </span>
          </span>
        ))}
      </h2>
      <a
        ref={wrapRef}
        href={content.whatsappHref}
        className="mt-10 inline-flex rounded-button bg-accent px-6 py-3 text-body text-ink-inv motion-safe:hover:[box-shadow:0_12px_24px_-16px_rgba(26,31,28,0.45)]"
      >
        {content.cta}
      </a>
      <p className="mt-4 text-caption text-ink-soft">{content.ctaAfter}</p>
    </section>
  );
}
