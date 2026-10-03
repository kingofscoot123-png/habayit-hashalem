"use client";

import { useRef } from "react";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { useScrollOrbit } from "@/lib/useScrollOrbit";

export function Pain() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();
  useScrollOrbit(sectionRef, reduced);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="orbit-stage px-5 py-16 sm:px-6 lg:px-16 lg:py-[120px]"
      data-section
    >
      <div className="mx-auto mb-10 max-w-3xl" data-reveal data-fx="focus">
        <h2 className="text-h2">
          {content.pain.title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} data-reveal-word className="inline-block pe-2">
              {word}
            </span>
          ))}
        </h2>
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
        {content.pain.cards.map((card, i) => (
          <article
            key={card.title}
            data-orbit
            className="glass-card glass-deep tilt-card rounded-shell"
            data-fx="rise"
            data-delay={i * 0.08}
          >
            <div className="media-zoom relative z-10">
              <img
                src={card.image}
                alt={card.alt}
                className="h-56 w-full object-cover"
                style={{ aspectRatio: "16 / 10" }}
              />
            </div>
            <div className="relative z-10 px-7 py-6">
              <h3 className="text-xl font-light tracking-wide">{card.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
