"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

/*
1. איפה הקורא: יופי, תוכיח.
2. כן אבל: אולי זה דיבור.
3. מספר אמיתי אחד + מקומות להמלצות, בלי המצאות.
4. ביציאה: אפשר לבדוק.
5. זיכרון: 13 שנות קליניקה.
*/

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const { reduced, canPin } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const number = numberRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      if (number && !reduced) {
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
      }

      if (canPin) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + Math.min(track.scrollWidth - window.innerWidth, window.innerHeight * 2),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      const marquee = marqueeRef.current;
      if (marquee && !reduced) {
        const tween = gsap.to(marquee, {
          xPercent: -50,
          ease: "none",
          repeat: -1,
          duration: 30,
        });
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 2000, 2);
            tween.timeScale(speed);
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reduced, canPin]);

  return (
    <section ref={sectionRef} className="overflow-hidden py-[88px] lg:py-[140px]">
      <div className="px-6 lg:px-16">
        <h2 className="max-w-measure text-h2">{content.proof.title}</h2>
        <p className="mt-8">
          <span ref={numberRef} className="text-display text-accent">
            {content.proof.statValue}
          </span>
          <span className="ms-3 text-lead text-ink-soft">{content.proof.statLabel}</span>
        </p>
        <p className="mt-4 max-w-measure text-caption text-ink-soft">{content.proof.note}</p>
      </div>

      <div
        ref={trackRef}
        className="mt-16 flex w-max gap-4 px-6 lg:px-16 max-lg:w-full max-lg:flex-col max-lg:px-6"
      >
        {content.proof.items.slice(0, 5).map((item) => (
          <figure
            key={item.src}
            className="w-[min(80vw,420px)] shrink-0 max-lg:w-full"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full rounded-media object-cover"
              style={{ aspectRatio: "1 / 1" }}
            />
          </figure>
        ))}
      </div>

      <div className="mt-16 overflow-hidden">
        <div ref={marqueeRef} className="flex w-max gap-8 px-6">
          {[...content.proof.items, ...content.proof.items].map((item, i) => (
            <span key={`${item.src}-${i}`} className="text-caption text-ink-soft">
              {item.alt}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
