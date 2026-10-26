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

export function Methods() {
  const [open, setOpen] = useState(0);
  const items = content.methods.items;

  const toggle = (i: number) => {
    setOpen((current) => (current === i ? -1 : i));
  };

  return (
    <section id="path" className="kit-section mishpacha-canvas px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
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

      <div className="method-acc mx-auto">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <article key={item.name} className={`method-acc__item ${isOpen ? "is-open" : ""}`}>
              <button
                type="button"
                className="method-acc__btn"
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
              >
                <span className="method-card__tag">{String(i + 1).padStart(2, "0")}</span>
                <span className="method-card__icon" aria-hidden="true">
                  <MethodIcon name={item.name} />
                </span>
                <h3>{item.name}</h3>
                <span className="method-acc__chev" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen ? (
                <p className="method-acc__body methods-copy-soft">
                  <HighlightCopy text={item.body} />
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
