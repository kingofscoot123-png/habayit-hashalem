"use client";

import { useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { HighlightCopy } from "@/components/HighlightCopy";
import { content } from "@/content";

const icons: Record<string, string> = {
  "שיטת NLP רפואי": "M12 3v18M4 12h16",
  "שיטת EFT": "M12 4v16M7 9l10 6M17 9L7 15",
  "שיטת TAT": "M5 19h14M12 19V5M6 11l6-6 6 6",
  "שיטת TFT": "M4 7h10M4 12h16M4 17h12",
  "דמיון מודרך": "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z",
  "אקסס בארס": "M12 3c3.5 4 4 8 0 18C8 11 8.5 7 12 3z",
  "טרנס": "M12 3v6M12 15v6M3 12h6M15 12h6",
  "שיטת ספירל": "M12 6a4 4 0 1 1-4 4c0 6 8 4 8 10a4 4 0 1 1-8 0",
  "שיטת EMDR": "M4 8h16M4 16h16",
};

function MethodIcon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name] || "M12 5v14M5 12h14"} />
    </svg>
  );
}

function MethodBody({ text }: { text: string }) {
  const parts = text.split("\n\n").filter(Boolean);
  return (
    <div className="method-card__body">
      {parts.map((part, idx) => (
        <p key={idx} className="methods-copy-soft">
          <HighlightCopy text={part} />
        </p>
      ))}
    </div>
  );
}

export function Methods() {
  const items = content.methods.items;
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  const toggle = (i: number) => {
    setOpen((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section id="path" className="kit-section method-accordion-section mishpacha-canvas px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div
        className="card-glass content-shield mx-auto mb-8 max-w-3xl rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 text-center shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8"
        data-reveal
      >
        <h2 className="section-title-rule text-h2">
          <AccentLead text={content.methods.title} />
        </h2>
        <p className="mt-3 text-caption methods-copy-soft">
          <HighlightCopy text={content.methods.hint} />
        </p>
      </div>

      <div className="method-accordion mx-auto max-w-6xl" role="list">
        {items.map((item, i) => {
          const isOpen = Boolean(open[i]);
          const panelId = `method-panel-${i}`;
          const buttonId = `method-toggle-${i}`;
          return (
            <article
              key={item.name}
              role="listitem"
              className={`method-card method-accordion__card ${isOpen ? "is-open is-hot" : ""}`}
            >
              <button
                type="button"
                id={buttonId}
                className="method-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="method-card__tag">{String(i + 1).padStart(2, "0")}</span>
                <span className="method-card__icon" aria-hidden="true">
                  <MethodIcon name={item.name} />
                </span>
                <h3 className="method-accordion__title">{item.name}</h3>
                <p className="method-accordion__teaser methods-copy-soft">
                  <HighlightCopy text={item.summary} />
                </p>
                <span className="method-accordion__cta">
                  {isOpen ? content.methods.close : content.methods.expand}
                  <svg
                    className={`method-accordion__chevron ${isOpen ? "is-open" : ""}`}
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
                className={`method-accordion__panel ${isOpen ? "is-open" : ""}`}
              >
                <div className="method-accordion__panel-inner">
                  <MethodBody text={item.body} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
