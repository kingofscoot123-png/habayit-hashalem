"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AccentLead } from "@/components/AccentLead";
import { TreatHouse } from "@/components/TreatHouse";
import { content } from "@/content";

const flow = ["now", "how", "result"] as const;

/**
 * במה אני מטפל — full-bleed sticky house + natural vertical stages.
 * No carousel, no 1/3 counters, no inner scroll boxes.
 */
export function Treat() {
  const items = content.treat.items;
  const [stage, setStage] = useState(0);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const stageIndex = useRef(0);

  useEffect(() => {
    const nodes = stageRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const ratios = new Map<number, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.treatStage);
          if (Number.isNaN(i)) continue;
          ratios.set(i, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = stageIndex.current;
        let bestRatio = -1;
        ratios.forEach((ratio, i) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = i;
          }
        });
        if (best !== stageIndex.current && bestRatio > 0.12) {
          stageIndex.current = best;
          setStage(best);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -30% 0px",
        threshold: [0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
      },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <section id="treat" className="treat-lux mishpacha-canvas" aria-label={content.treat.title}>
      <div className="treat-lux__inner">
        <header className="treat-lux__head">
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.treat.title} />
          </h2>
          <span className="treat-lux__rule" aria-hidden="true" />
          <p className="treat-lux__lead">{content.treat.lead}</p>
        </header>

        <div className="treat-lux__layout">
          {/* Sticky node must be a direct child of the tall layout parent */}
          <div className="treat-lux__house-sticky" aria-hidden="true">
            <TreatHouse stage={stage} />
            <ol className="treat-lux__progress">
              {items.map((item, i) => (
                <li key={item.n} className={i === stage ? "is-on" : i < stage ? "is-done" : ""}>
                  <span>{item.n}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="treat-lux__stages">
            {items.map((item, i) => (
              <article
                key={item.n}
                id={`treat-stage-${item.n}`}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                data-treat-stage={i}
                className={`treat-lux__stage ${i === stage ? "is-on" : ""}`}
              >
                <div className="treat-lux__meta">
                  <span className="treat-lux__n">{item.n}</span>
                  <span className="treat-lux__tag">{item.tag}</span>
                </div>
                <h3 className="treat-lux__title">{item.title}</h3>

                <div className="treat-lux__blocks">
                  {flow.map((key, si) => (
                    <section
                      key={key}
                      className={`treat-lux__block treat-lux__block--${key}`}
                      style={{ ["--d" as string]: si } as CSSProperties}
                    >
                      <h4 className="treat-lux__block-label">{content.treat.labels[key]}</h4>
                      <p className="treat-lux__block-text">{item[key]}</p>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
