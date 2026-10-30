"use client";

import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Treat() {
  const items = content.treat.items;

  return (
    <section id="treat" className="treat-stack mishpacha-canvas px-4 py-16 md:px-8" aria-label={content.treat.title}>
      <div className="treat-stack__inner">
        <div className="treat-stack__head">
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.treat.title} />
          </h2>
          <span className="treat-stack__rule" aria-hidden="true" />
          <p className="treat-stack__lead">{content.treat.lead}</p>
        </div>

        <div className="treat-stack__list">
          {items.map((item) => (
            <article key={item.n} className="treat-stack__card">
              <div className="treat-stack__meta">
                <span className="treat-stack__tag">{item.tag}</span>
                <span className="treat-stack__n">{item.n}</span>
              </div>

              <h3 className="treat-stack__title">{item.title}</h3>

              <div
                className="treat-stack__scroll"
                data-treat-scroll
                data-lenis-prevent
                data-lenis-prevent-wheel
                tabIndex={0}
                aria-label={`${item.title}: תוכן מלא לגלילה`}
              >
                <div className="treat-stack__block treat-stack__block--now">
                  <h4>{content.treat.labels.now}</h4>
                  <p>{item.now}</p>
                </div>

                <div className="treat-stack__block treat-stack__block--how">
                  <h4>{content.treat.labels.how}</h4>
                  <p>{item.how}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
