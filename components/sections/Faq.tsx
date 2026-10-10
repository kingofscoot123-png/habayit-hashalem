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
        <a
          href={content.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold shimmer mt-8 rounded-2xl px-8 py-4 text-base"
        >
          {content.cta}
        </a>
        <p className="mt-4 text-caption text-ink-soft">{content.ctaAfter}</p>
      </div>

      <h3 className="mx-auto mt-14 max-w-2xl text-center text-h2" data-reveal>
        <AccentLead text={content.objections.title} />
      </h3>
      <div className="mx-auto mt-6 max-w-2xl space-y-3">
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
    </section>
  );
}
