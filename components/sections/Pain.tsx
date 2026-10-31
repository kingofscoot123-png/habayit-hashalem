"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

export function Pain() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const stage = section.querySelector<HTMLElement>(".pain-stage");
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-pain-card]"));

    const fitStage = () => {
      if (!stage || cards.length === 0) return;
      const tallest = cards.reduce((max, card) => Math.max(max, card.scrollHeight), 0);
      if (tallest > 0) stage.style.minHeight = `${tallest}px`;
    };
    fitStage();
    window.addEventListener("resize", fitStage);

    const ctx = gsap.context(() => {
      if (reduced || cards.length === 0) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      gsap.set(cards, { autoAlpha: 0, y: mobile ? 20 : 24 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });
      fitStage();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: mobile ? "top top+=72" : "top top+=88",
          end: mobile ? `+=${Math.round(window.innerHeight * 2.2)}` : "+=200%",
          pin: true,
          scrub: mobile ? 1.45 : 1.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: fitStage,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(
          cards[i - 1],
          { autoAlpha: 0, y: mobile ? -14 : -18, duration: 0.55, ease: "power2.inOut" },
          i,
        );
        tl.fromTo(
          card,
          { autoAlpha: 0, y: mobile ? 22 : 28 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
          i,
        );
      });
    }, section);

    return () => {
      window.removeEventListener("resize", fitStage);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`pain-section mishpacha-canvas relative z-10 -mt-20 px-5 pt-4 pb-14 sm:px-6 sm:pb-16 lg:px-16 lg:pb-20 ${reduced ? "pain-static" : ""}`}
    >
      <div
        className="card-glass content-shield mx-auto mb-6 max-w-3xl rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-5 text-center shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:mb-8 md:p-8"
        data-reveal
      >
        <p className="section-welcome">
          {content.pain.welcome.split(/\s+[—–]\s+/).map((part, i) => (
            <span key={part}>
              {i > 0 ? (
                <span className="gold-sep" aria-hidden="true">
                  {" "}
                  •{" "}
                </span>
              ) : null}
              {part}
            </span>
          ))}
        </p>
        <h2 className="section-title-rule text-h2">
          <AccentLead text={content.pain.title} />
        </h2>
      </div>
      <div className="pain-stage mx-auto">
        {content.pain.cards.map((card) => (
          <article key={card.title} data-pain-card className="pain-card">
            <div className="media-zoom pain-card__media">
              <img src={card.image} alt={card.alt} data-parallax="-28" />
            </div>
            <div className="pain-card__copy">
              <h3>{card.title}</h3>
              <p>{card.line}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
