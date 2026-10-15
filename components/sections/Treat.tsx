"use client";

import { useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

const steps = ["now", "how", "result"] as const;

export function Treat() {
  const [open, setOpen] = useState<string | null>(content.treat.items[0].n);

  return (
    <section id="treat" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.treat.title} />
        </h2>
        <p className="mt-4 text-body text-ink-soft">{content.treat.lead}</p>
      </div>
      <div className="mx-auto max-w-3xl space-y-3">
        {content.treat.items.map((item) => {
          const isOpen = open === item.n;
          return (
            <article key={item.n} className={`treat-stack ${isOpen ? "is-open" : ""}`}>
              <button
                type="button"
                className="treat-stack__btn"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.n)}
              >
                <span className="treat-stack__n">{item.n}</span>
                <span className="treat-stack__titles">
                  <span className="treat-stack__title">{item.title}</span>
                  <span className="treat-stack__tag">{item.tag}</span>
                </span>
                <span className="treat-stack__plus" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div className={`faq-a-wrap ${isOpen ? "is-open" : ""}`}>
                <div className="faq-a-inner">
                  <ol className="treat-stack__flow">
                    {steps.map((key) => (
                      <li key={key} className={`treat-step treat-step--${key}`}>
                        <span className="treat-step__label">{content.treat.labels[key]}</span>
                        <p>{item[key]}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
