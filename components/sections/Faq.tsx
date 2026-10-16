"use client";

import { useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { LeadForm } from "@/components/LeadForm";
import { content } from "@/content";

export function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className="site-section site-section--band-c px-5 pb-16 sm:px-6 lg:px-16 lg:pb-[100px]">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.objections.title} />
        </h2>
        <p className="mt-4 text-lead text-ink-soft">
          {content.close.titleLines[0]} {content.close.titleLines[1]}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-3">
        {content.objections.items.map((item) => {
          const isOpen = open === item.q;
          return (
            <div key={item.q} className={`faq-item faq-item--neo card-lift ${isOpen ? "is-open" : ""}`}>
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

      <LeadForm />
    </section>
  );
}
