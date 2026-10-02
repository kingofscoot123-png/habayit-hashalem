"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const number = numberRef.current;
    if (!section || !number) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        number.textContent = String(content.proof.statValue);
        return;
      }
      const obj = { val: 0 };
      gsap.to(obj, {
        val: content.proof.statValue,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: number, start: "top 80%", once: true },
        onUpdate: () => {
          number.textContent = String(Math.round(obj.val));
        },
      });
    }, section);

    return () => {
      if (number) number.textContent = String(content.proof.statValue);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <div className="mx-auto max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">{content.proof.title}</h2>
        <p className="mt-10">
          <span ref={numberRef} className="text-display text-accent">
            {content.proof.statValue}
          </span>
          <span className="ms-3 text-lead text-ink-soft">{content.proof.statLabel}</span>
        </p>
        <p className="mx-auto mt-5 max-w-measure text-caption text-ink-soft">{content.proof.note}</p>
      </div>
    </section>
  );
}
