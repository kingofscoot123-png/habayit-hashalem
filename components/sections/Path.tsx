"use client";

import { useRef } from "react";
import { content } from "@/content";
import { RootScene } from "@/components/RootScene";
import { Magnetic } from "@/components/Magnetic";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { useScrollOrbit } from "@/lib/useScrollOrbit";

export function Path() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();
  useScrollOrbit(sectionRef, reduced);
  const certs = content.credentials.items.slice(0, 6);

  return (
    <section id="path" ref={sectionRef} className="orbit-stage px-5 py-16 sm:px-6 lg:px-16 lg:py-[120px]">
      <div className="mx-auto mb-10 max-w-3xl text-center" data-reveal>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">{content.path.kicker}</p>
        <h2 className="text-h2">
          {content.path.title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} data-reveal-word className="inline-block pe-2">
              {word}
            </span>
          ))}
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8">
        {content.path.steps.map((step) => (
          <article
            key={step.n}
            data-orbit
            className="glass-card glass-deep tilt-card overflow-hidden rounded-shell lg:grid lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="media-zoom">
              <img src={step.image} alt={step.alt} className="h-52 w-full object-cover lg:h-full" />
            </div>
            <div className="relative z-10 p-6 sm:p-8">
              <p className="holo-card__n">{step.n}</p>
              <h3 className="text-2xl font-light tracking-wide">{step.title}</h3>
              <p className="mt-3 text-body text-ink-soft">{step.body}</p>
              <p className="mt-5 text-caption tracking-wide text-accent">{step.time}</p>
            </div>
          </article>
        ))}
      </div>

      <div id="services" className="mx-auto mt-16 max-w-5xl" data-orbit>
        <div className="glass-card glass-deep overflow-hidden rounded-shell p-4 sm:p-6">
          <p className="mb-4 text-center text-caption tracking-widest text-ink-soft">{content.path.workTitle}</p>
          <RootScene src={content.deliverables.cards[2].image} alt={content.deliverables.cards[2].alt} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {content.deliverables.cards.map((card) => (
              <div key={card.title}>
                <p className="text-lg font-light">{card.title}</p>
                <p className="mt-1 text-caption text-ink-soft">{card.result}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="credentials" className="mx-auto mt-16 max-w-5xl">
        <h3 className="mb-6 text-center text-h2" data-reveal>
          {content.credentials.title}
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {certs.map((item, i) => (
            <figure key={item.src} data-orbit className="cert-photo rounded-shell p-2" data-delay={i * 0.04}>
              <img src={item.src} alt={item.alt} />
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center" data-orbit>
        <h3 className="text-display">
          {content.close.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <Magnetic
          href={content.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold shimmer mt-8 inline-flex rounded-2xl px-8 py-4 text-base"
        >
          {content.cta}
        </Magnetic>
        <p className="mt-4 text-caption text-ink-soft">{content.ctaAfter}</p>
      </div>

      <ul className="mx-auto mt-16 max-w-2xl space-y-3">
        {content.objections.items.map((item) => (
          <li key={item.q} className="glass-card glass-deep rounded-2xl px-5 py-4" data-orbit>
            <p className="text-lead">{item.q}</p>
            <p className="mt-2 text-body text-ink-soft">{item.a}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
