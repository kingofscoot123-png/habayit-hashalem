"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

export function Pain() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(0);
  const cards = content.pain.cards;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=88",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length + 0.001));
          setActive((prev) => (prev === i ? prev : i));
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced, cards.length]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`pain-section pain-section--flow px-5 py-16 sm:px-6 lg:px-16 lg:py-20 ${reduced ? "pain-static" : ""}`}
    >
      <div className="pain-flow">
        <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
          <h2 className="text-h2">
            <AccentLead text={content.pain.title} />
          </h2>
        </div>
        <div className="pain-stage mx-auto">
          {cards.map((card, i) => (
            <article key={card.title} data-pain-card className={`pain-card ${i === active ? "is-on" : ""}`}>
              <div className="media-zoom pain-card__media">
                <img src={card.image} alt={card.alt} />
              </div>
              <div className="pain-card__copy">
                <h3>{card.title}</h3>
                <p>{card.line}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
