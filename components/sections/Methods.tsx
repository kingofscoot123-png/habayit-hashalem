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
 * ארגז הכלים — compact accordion (no scroll-jack).
 * Tap a method to expand the full clinical explanation.
 */
export function Methods() {
  const items = content.methods.items;
  const [open, setOpen] = useState(0);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? -1 : i));
  };

  return (
    <section
      id="path"
      className="methods-kit mishpacha-canvas"
      aria-label={content.methods.title}
    >
      <div className="methods-kit__shell">
        <header className="methods-kit__head">
          <p className="methods-kit__eyebrow">{content.methods.core}</p>
          <h2 className="section-title-rule text-h2 text-[#82152B]">
            <AccentLead text={content.methods.title} />
          </h2>
          <span className="methods-kit__rule" aria-hidden="true" />
          <p className="methods-kit__lead leading-relaxed">
            <HighlightCopy text={content.methods.hint} />
          </p>
        </header>

        <div className="methods-kit__list" role="list">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `method-panel-${i}`;
            const buttonId = `method-toggle-${i}`;
            return (
              <article
                key={item.name}
                role="listitem"
                className={`methods-kit__card border-[#C5A059]/40 ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  id={buttonId}
                  className="methods-kit__trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span className="methods-kit__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="methods-kit__icon" aria-hidden="true">
                    <MethodIcon name={item.name} />
                  </span>
                  <span className="methods-kit__copy">
                    <span className="methods-kit__name text-[#82152B]">{item.name}</span>
                    <span className="methods-kit__teaser">
                      <HighlightCopy text={item.summary} />
                    </span>
                  </span>
                  <span className="methods-kit__cta">
                    {isOpen ? content.methods.close : content.methods.expand}
                    <svg
                      className={`methods-kit__chevron ${isOpen ? "is-open" : ""}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`methods-kit__panel ${isOpen ? "is-open" : ""}`}
                >
                  <div className="methods-kit__panel-inner">
                    <h4 className="methods-kit__detail-label text-[#82152B]">איך זה עובד</h4>
                    <p className="methods-kit__detail-text leading-relaxed">
                      <HighlightCopy text={item.body.replace(/^איך זה עובד:\s*/, "")} />
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
