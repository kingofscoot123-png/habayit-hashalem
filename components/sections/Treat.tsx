"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { TreatHouse } from "@/components/TreatHouse";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const flow = ["now", "how", "result"] as const;

/**
 * במה אני מטפל — GSAP pinned scroll cards.
 * House lives inside each card header (never a floating overlay over text).
 * Step advances only after the prior card has been scrolled through.
 */
export function Treat() {
  const items = content.treat.items;
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stageEl = section.querySelector<HTMLElement>(".treat-scroll__stage");
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-treat-card]"));

    const fitStage = () => {
      if (!stageEl || cards.length === 0) return;
      const tallest = cards.reduce((max, card) => Math.max(max, card.scrollHeight), 0);
      stageEl.style.minHeight = `${Math.max(tallest, Math.round(window.innerHeight * 0.72))}px`;
    };
    fitStage();
    window.addEventListener("resize", fitStage);

    const ctx = gsap.context(() => {
      if (reduced || cards.length === 0) {
        gsap.set(cards, { autoAlpha: 1, y: 0, position: "relative" });
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      gsap.set(cards, { autoAlpha: 0, y: mobile ? 28 : 36 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });
      setStage(0);
      fitStage();

      const perStep = Math.round(window.innerHeight * (mobile ? 1.35 : 1.55));

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "treat-scroll",
          trigger: section,
          start: mobile ? "top top+=64" : "top top+=80",
          end: () => `+=${perStep * cards.length}`,
          pin: true,
          pinSpacing: true,
          scrub: mobile ? 1.2 : 1.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: fitStage,
          onUpdate: (self) => {
            const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length + 0.001));
            setStage((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(
          cards[i - 1],
          { autoAlpha: 0, y: mobile ? -22 : -28, duration: 0.7, ease: "power2.inOut" },
          i,
        );
        tl.fromTo(
          card,
          { autoAlpha: 0, y: mobile ? 30 : 36 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
          i,
        );
      });
    }, section);

    return () => {
      window.removeEventListener("resize", fitStage);
      ctx.revert();
    };
  }, [reduced, items.length]);

  return (
    <section
      id="treat"
      ref={sectionRef}
      className={`treat-scroll mishpacha-canvas ${reduced ? "treat-scroll--static" : ""}`}
      aria-label={content.treat.title}
    >
      <div className="treat-scroll__inner">
        <header className="treat-scroll__head">
          <h2 className="section-title-rule text-h2 text-[#82152B]">
            <AccentLead text={content.treat.title} />
          </h2>
          <span className="treat-scroll__rule" aria-hidden="true" />
          <p className="treat-scroll__lead leading-relaxed">{content.treat.lead}</p>
        </header>

        <div className="treat-scroll__stage">
          {items.map((item, i) => (
            <article
              key={item.n}
              data-treat-card
              data-treat-stage={i}
              className={`treat-scroll__card border-[#C5A059]/40 ${i === stage ? "is-on" : ""}`}
            >
              {/* House anchored in card header — never a floating overlay */}
              <div className="treat-scroll__house relative top-0 mb-4 w-full text-center" aria-hidden="true">
                <TreatHouse stage={i} />
                <ol className="treat-scroll__progress">
                  {items.map((it, pi) => (
                    <li key={it.n} className={pi === i ? "is-on" : pi < i ? "is-done" : ""}>
                      <span>{it.n}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="treat-scroll__meta">
                <span className="treat-scroll__n">{item.n}</span>
                <span className="treat-scroll__tag">{item.tag}</span>
              </div>
              <h3 className="treat-scroll__title text-[#82152B]">{item.title}</h3>

              <div className="treat-scroll__blocks">
                {flow.map((key, si) => (
                  <section
                    key={key}
                    className={`treat-scroll__block treat-scroll__block--${key}`}
                    style={{ ["--d" as string]: si } as CSSProperties}
                  >
                    <h4 className="treat-scroll__block-label text-[#82152B]">{content.treat.labels[key]}</h4>
                    <p className="treat-scroll__block-text leading-relaxed">{item[key]}</p>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
