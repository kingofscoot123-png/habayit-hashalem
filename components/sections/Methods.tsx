"use client";

import { useEffect, useRef, useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { HighlightCopy } from "@/components/HighlightCopy";
import { content } from "@/content";

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
 * ארגז הכלים — dedicated luxury canvas + scroll-driven method stages.
 * Natural window scroll advances cards; no inner overflow-y-auto boxes.
 */
export function Methods() {
  const items = content.methods.items;
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const ratios = new Map<number, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.methodStage);
          if (Number.isNaN(i)) continue;
          ratios.set(i, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = activeRef.current;
        let bestRatio = -1;
        ratios.forEach((ratio, i) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = i;
          }
        });
        if (best !== activeRef.current && bestRatio > 0.15) {
          activeRef.current = best;
          setActive(best);
        }
      },
      {
        root: null,
        rootMargin: "-22% 0px -28% 0px",
        threshold: [0.1, 0.25, 0.4, 0.55, 0.7, 0.85],
      },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <section id="path" className="methods-lux mishpacha-canvas" aria-label={content.methods.title}>
      <div className="methods-lux__canvas">
        <header className="methods-lux__head">
          <p className="methods-lux__eyebrow">{content.methods.core}</p>
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.methods.title} />
          </h2>
          <span className="methods-lux__rule" aria-hidden="true" />
          <p className="methods-lux__lead leading-loose">
            שיטות קליניות מדויקות מארגז הכלים של מיכאל מרום — גללו בין הכרטיסים בנחת, כל שיטה במלואה.
          </p>
        </header>

        <ol className="methods-lux__progress" aria-hidden="true">
          {items.map((item, i) => (
            <li key={item.name} className={i === active ? "is-on" : i < active ? "is-done" : ""}>
              <span>{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>

        <div className="methods-lux__stages">
          {items.map((item, i) => (
            <article
              key={item.name}
              id={`method-stage-${i + 1}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-method-stage={i}
              className={`methods-lux__card border-[#C5A059]/30 ${i === active ? "is-on" : ""}`}
            >
              <div className="methods-lux__card-top">
                <span className="methods-lux__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="methods-lux__icon" aria-hidden="true">
                  <MethodIcon name={item.name} />
                </span>
              </div>
              <h3 className="methods-lux__name">{item.name}</h3>
              <p className="methods-lux__summary leading-loose">
                <HighlightCopy text={item.summary} />
              </p>
              <div className="methods-lux__detail">
                <h4 className="methods-lux__detail-label">איך זה עובד</h4>
                <p className="methods-lux__detail-text leading-loose">
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
