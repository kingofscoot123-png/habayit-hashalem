"use client";

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
 * ארגז הכלים — executive grid of all methods.
 * Completely separate from Treat. No carousel, no clipped overflow.
 */
export function Methods() {
  const items = content.methods.items;

  return (
    <section id="path" className="methods-grid mishpacha-canvas" aria-label={content.methods.title}>
      <div className="methods-grid__inner">
        <header className="methods-grid__head">
          <p className="methods-grid__eyebrow">{content.methods.core}</p>
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.methods.title} />
          </h2>
          <p className="methods-grid__lead">
            שיטות קליניות מדויקות מארגז הכלים של מיכאל מרום — כל כרטיס פתוח במלואו, בלי חיתוך ובלי קרוסלה.
          </p>
        </header>

        <div className="methods-grid__list">
          {items.map((item, i) => (
            <article key={item.name} className="methods-grid__card">
              <div className="methods-grid__card-top">
                <span className="methods-grid__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="methods-grid__icon" aria-hidden="true">
                  <MethodIcon name={item.name} />
                </span>
              </div>
              <h3 className="methods-grid__name">{item.name}</h3>
              <p className="methods-grid__summary">
                <HighlightCopy text={item.summary} />
              </p>
              <div className="methods-grid__detail">
                <h4 className="methods-grid__detail-label">איך זה עובד</h4>
                <p className="methods-grid__detail-text">
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
