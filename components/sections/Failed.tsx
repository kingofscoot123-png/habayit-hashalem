"use client";

import { useRef } from "react";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { useScrollOrbit } from "@/lib/useScrollOrbit";

export function Failed() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();
  useScrollOrbit(sectionRef, reduced);

  return (
    <section
      id="tried"
      ref={sectionRef}
      className="orbit-stage px-5 py-16 sm:px-6 lg:px-16 lg:py-[120px]"
      data-section
    >
      <div className="mx-auto mb-10 max-w-3xl" data-reveal data-fx="focus">
        <h2 className="text-h2">
          {content.failed.title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} data-reveal-word className="inline-block pe-2">
              {word}
            </span>
          ))}
        </h2>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {content.failed.cards.map((card) => (
          <article key={card.title} data-orbit className="holo-card tilt-card">
            <span className="holo-card__foil" aria-hidden="true" />
            <span className="holo-card__glow" aria-hidden="true" />
            <p className="holo-card__n">{card.n}</p>
            <h3 className="relative z-10 text-2xl font-light tracking-wide">{card.title}</h3>
            <p className="relative z-10 mt-4 text-body text-ink-soft">{card.hint}</p>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-3xl text-h2 font-light" data-reveal data-fx="depth">
        {content.failed.remain}
      </p>
    </section>
  );
}
