"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

export function Pain() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-pain-card]"));

    const ctx = gsap.context(() => {
      if (reduced || cards.length === 0) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(cards, { autoAlpha: 0, y: 24 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88px",
          end: "+=150%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(cards[i - 1], { autoAlpha: 0, y: -18, duration: 0.45, ease: "power2.inOut" }, i);
        tl.fromTo(
          card,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
          i,
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`px-5 py-16 sm:px-6 lg:px-16 lg:py-20 ${reduced ? "pain-static" : ""}`}
    >
      <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">{content.pain.title}</h2>
      </div>
      <div className="pain-stage mx-auto">
        {content.pain.cards.map((card) => (
          <article key={card.title} data-pain-card className="pain-card">
            <div className="media-zoom pain-card__media">
              <img src={card.image} alt={card.alt} />
            </div>
            <div className="pain-card__copy">
              <h3>{card.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
