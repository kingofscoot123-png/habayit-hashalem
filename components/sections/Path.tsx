"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

export function Path() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();
  const certs = content.credentials.items.slice(0, 6);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const steps = section.querySelectorAll<HTMLElement>("[data-path-step]");
      if (reduced) {
        steps.forEach((el) => el.classList.add("is-ready"));
        return;
      }

      steps.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
            onStart: () => el.classList.add("is-ready"),
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="path" ref={sectionRef} className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[120px]">
      <div className="mx-auto mb-10 max-w-3xl text-center" data-reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">{content.path.kicker}</p>
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
            data-path-step
            className="path-step clinic-card overflow-hidden rounded-shell lg:grid lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="media-zoom">
              <img src={step.image} alt={step.alt} className="h-52 w-full object-cover lg:h-full" />
            </div>
            <div className="relative z-10 p-6 sm:p-8">
              <p className="clinic-n">{step.n}</p>
              <h3 className="text-2xl font-light tracking-wide">{step.title}</h3>
              <p className="mt-3 text-body text-ink-soft">{step.body}</p>
              <p className="mt-5 text-caption tracking-wide text-accent">{step.time}</p>
            </div>
          </article>
        ))}
      </div>

      <div id="services" className="mx-auto mt-16 max-w-5xl">
        <p className="mb-6 text-center text-caption tracking-widest text-ink-soft" data-reveal>
          {content.path.workTitle}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {content.deliverables.cards.map((card, i) => (
            <article
              key={card.title}
              className="clinic-card overflow-hidden rounded-shell"
              data-reveal
              data-delay={i * 0.08}
            >
              <div className="media-zoom">
                <img src={card.image} alt={card.alt} className="h-40 w-full object-cover" />
              </div>
              <div className="p-5">
                <p className="text-lg font-light">{card.title}</p>
                <p className="mt-1 text-caption text-ink-soft">{card.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="credentials" className="mx-auto mt-16 max-w-5xl">
        <h3 className="mb-6 text-center text-h2" data-reveal>
          {content.credentials.title}
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {certs.map((item, i) => (
            <figure key={item.src} className="cert-photo rounded-shell p-2" data-reveal data-delay={i * 0.04}>
              <img src={item.src} alt={item.alt} />
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center" data-reveal>
        <h3 className="text-display">
          {content.close.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <a
          href={content.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold shimmer mt-8 rounded-2xl px-8 py-4 text-base"
        >
          {content.cta}
        </a>
        <p className="mt-4 text-caption text-ink-soft">{content.ctaAfter}</p>
      </div>

      <ul className="mx-auto mt-16 max-w-2xl space-y-3">
        {content.objections.items.map((item) => (
          <li key={item.q} className="clinic-card rounded-2xl px-5 py-4" data-reveal>
            <p className="text-lead">{item.q}</p>
            <p className="mt-2 text-body text-ink-soft">{item.a}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
