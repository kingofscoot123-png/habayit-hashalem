"use client";

import { useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className="px-5 pb-16 sm:px-6 lg:px-16 lg:pb-[100px]">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <h2 className="text-display">
          {content.close.titleLines.map((line, i) => (
            <span key={line} className="block">
              {i === 0 ? <AccentLead text={line} /> : line}
            </span>
          ))}
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-3">
        {content.objections.items.map((item) => {
          const isOpen = open === item.q;
          return (
            <div key={item.q} className="faq-item">
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.q)}
              >
                <span>{item.q}</span>
                <span className="faq-plus" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div className={`faq-a-wrap ${isOpen ? "is-open" : ""}`}>
                <div className="faq-a-inner">
                  <p className="faq-a">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center" data-reveal>
        <p className="mb-6 text-lead text-[var(--hs-ink)]">מוכנים להתחיל? שיחה קצרה, בלי טופס.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={content.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hs-hero__btn hs-hero__btn--wa px-8"
          >
            {content.cta} בוואטסאפ
          </a>
          <a href={content.phoneHref} className="hs-hero__btn hs-hero__btn--tel">
            להתקשר: {content.phoneDisplay}
          </a>
        </div>
        <p className="mt-4 text-caption text-ink-soft">{content.ctaAfter}</p>
      </div>
    </section>
  );
}
