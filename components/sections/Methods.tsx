"use client";

import { useState } from "react";
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
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name] || "M12 5v14M5 12h14"} />
    </svg>
  );
}

/**
 * ארגז הכלים — standalone executive methods section.
 * Completely separate from Treat. No shared pin, no clipped overflow.
 */
export function Methods() {
  const items = content.methods.items;
  const [active, setActive] = useState(0);
  const current = items[active];
  const canPrev = active > 0;
  const canNext = active < items.length - 1;

  const goTo = (i: number) => {
    setActive(Math.max(0, Math.min(items.length - 1, i)));
  };

  return (
    <section
      id="path"
      className="methods-exec mishpacha-canvas"
      aria-label={content.methods.title}
    >
      <div className="methods-exec__inner">
        <header className="methods-exec__head">
          <p className="methods-exec__eyebrow">{content.methods.core}</p>
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.methods.title} />
          </h2>
          <p className="methods-exec__lead">{content.methods.hint}</p>
        </header>

        <article className="methods-exec__card" key={current.name}>
          <div className="methods-exec__top">
            <div className="methods-exec__identity">
              <span className="methods-exec__index">{String(active + 1).padStart(2, "0")}</span>
              <h3 className="methods-exec__name">{current.name}</h3>
            </div>
            <span className="methods-exec__icon" aria-hidden="true">
              <MethodIcon name={current.name} />
            </span>
          </div>

          <div className="methods-exec__nav" role="group" aria-label="מעבר בין שיטות">
            <button
              type="button"
              className="methods-exec__nav-btn"
              onClick={() => goTo(active - 1)}
              disabled={!canPrev}
              aria-disabled={!canPrev}
            >
              <span className="methods-exec__nav-dir">הקודם</span>
              <span className="methods-exec__nav-sub">
                {canPrev ? items[active - 1].name : "תחילת הרשימה"}
              </span>
            </button>
            <p className="methods-exec__count">
              <span>{active + 1}</span>
              <span className="methods-exec__of">/{items.length}</span>
            </p>
            <button
              type="button"
              className="methods-exec__nav-btn methods-exec__nav-btn--next"
              onClick={() => goTo(active + 1)}
              disabled={!canNext}
              aria-disabled={!canNext}
            >
              <span className="methods-exec__nav-dir">הבא</span>
              <span className="methods-exec__nav-sub">
                {canNext ? items[active + 1].name : "סוף הרשימה"}
              </span>
            </button>
          </div>

          <div className="methods-exec__body">
            <p className="methods-exec__summary">
              <HighlightCopy text={current.summary} />
            </p>
            <div className="methods-exec__detail">
              <h4 className="methods-exec__detail-label">איך זה עובד</h4>
              <p className="methods-exec__detail-text">
                <HighlightCopy
                  text={current.body.replace(/^איך זה עובד:\s*/, "")}
                />
              </p>
            </div>
          </div>

          <div className="methods-exec__dots" role="tablist" aria-label={content.methods.title}>
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-label={item.name}
                aria-selected={i === active}
                className={`methods-exec__dot ${i === active ? "is-on" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
