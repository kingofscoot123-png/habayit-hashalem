"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { HighlightCopy } from "@/components/HighlightCopy";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<string, string> = {
  "NLP – ניתוב לשוני נוירולוגי": "M12 3v18M4 12h16",
  "EFT / TFT – טכניקות שחרור רגשי": "M12 4v16M7 9l10 6M17 9L7 15",
  "Access Bars – אקסס בארס": "M12 3c3.5 4 4 8 0 18C8 11 8.5 7 12 3z",
  "TAT – שיטת טאפאס": "M5 19h14M12 19V5M6 11l6-6 6 6",
  "EMDR – עיבוד מחדש באמצעות גירוי דו־צדדי": "M4 8h16M4 16h16",
  "שיטת הספירלה": "M12 6a4 4 0 1 1-4 4c0 6 8 4 8 10a4 4 0 1 1-8 0",
};

function MethodIcon({ name }: { name: string }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name] || "M12 5v14M5 12h14"} />
    </svg>
  );
}

/**
 * ארגז הכלים — single active card, GSAP pinned scroll progression.
 * One treatment at a time; scroll fades/slides to the next. No vertical dump.
 */
export function Methods() {
  const items = content.methods.items;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stageEl = section.querySelector<HTMLElement>(".methods-scroll__stage");
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-method-card]"));

    const fitStage = () => {
      if (!stageEl || cards.length === 0) return;
      const tallest = cards.reduce((max, card) => Math.max(max, card.scrollHeight), 0);
      stageEl.style.minHeight = `${Math.max(tallest, Math.round(window.innerHeight * 0.62))}px`;
    };
    fitStage();
    window.addEventListener("resize", fitStage);

    const ctx = gsap.context(() => {
      if (reduced || cards.length === 0) {
        gsap.set(cards, { autoAlpha: 1, y: 0, position: "relative" });
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      gsap.set(cards, { autoAlpha: 0, y: mobile ? 32 : 40, scale: 0.985 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });
      setActive(0);
      fitStage();

      const perStep = Math.round(window.innerHeight * (mobile ? 1.15 : 1.25));

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "methods-scroll",
          trigger: section,
          start: mobile ? "top top+=64" : "top top+=80",
          end: () => `+=${perStep * cards.length}`,
          pin: true,
          pinSpacing: true,
          scrub: mobile ? 1.15 : 1.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: fitStage,
          onUpdate: (self) => {
            const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length + 0.001));
            setActive((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(
          cards[i - 1],
          { autoAlpha: 0, y: mobile ? -24 : -30, scale: 0.98, duration: 0.65, ease: "power2.inOut" },
          i,
        );
        tl.fromTo(
          card,
          { autoAlpha: 0, y: mobile ? 34 : 42, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, ease: "power2.out" },
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
      id="path"
      ref={sectionRef}
      className={`methods-scroll mishpacha-canvas ${reduced ? "methods-scroll--static" : ""}`}
      aria-label={content.methods.title}
    >
      <div className="methods-scroll__canvas">
        <header className="methods-scroll__head">
          <p className="methods-scroll__eyebrow">{content.methods.core}</p>
          <h2 className="section-title-rule text-h2 text-[#82152B]">
            <AccentLead text={content.methods.title} />
          </h2>
          <span className="methods-scroll__rule" aria-hidden="true" />
          <p className="methods-scroll__lead leading-relaxed">
            שיטה אחת בכל פעם — גללו בקצב שלכם בין הכלים הקליניים של מיכאל מרום.
          </p>
        </header>

        <ol className="methods-scroll__progress" aria-hidden="true">
          {items.map((item, i) => (
            <li key={item.name} className={i === active ? "is-on" : i < active ? "is-done" : ""}>
              <span>{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>

        <div className="methods-scroll__stage">
          {items.map((item, i) => (
            <article
              key={item.name}
              data-method-card
              data-method-stage={i}
              className={`methods-scroll__card border-[#C5A059]/40 ${i === active ? "is-on" : ""}`}
            >
              <div className="methods-scroll__card-top">
                <span className="methods-scroll__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="methods-scroll__icon" aria-hidden="true">
                  <MethodIcon name={item.name} />
                </span>
              </div>
              <h3 className="methods-scroll__name text-[#82152B]">{item.name}</h3>
              <p className="methods-scroll__summary leading-relaxed">
                <HighlightCopy text={item.summary} />
              </p>
              <div className="methods-scroll__detail">
                <h4 className="methods-scroll__detail-label text-[#82152B]">איך זה עובד</h4>
                <p className="methods-scroll__detail-text leading-relaxed">
                  <HighlightCopy text={item.body.replace(/^איך זה עובד:\s*/, "")} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
