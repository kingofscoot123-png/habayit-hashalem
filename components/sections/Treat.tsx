"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AccentLead } from "@/components/AccentLead";
import { TreatHouse } from "@/components/TreatHouse";
import { content } from "@/content";

const flow = ["now", "how", "result"] as const;

/**
 * במה אני מטפל — sticky house + natural document flow.
 * Text is never trapped in an inner scroll pane. Scrolling through each
 * stage's full copy advances the house build only as the next stage enters.
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
        rootMargin: "-18% 0px -28% 0px",
        threshold: [0.08, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
      },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [items.length]);

  const goTo = (i: number) => {
    const next = Math.max(0, Math.min(items.length - 1, i));
    stageIndex.current = next;
    setStage(next);
    stageRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="treat" className="treat-flow mishpacha-canvas" aria-label={content.treat.title}>
      <div className="treat-flow__inner">
        <header className="treat-flow__head">
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.treat.title} />
          </h2>
          <span className="treat-flow__rule" aria-hidden="true" />
          <p className="treat-flow__lead">{content.treat.lead}</p>
        </header>

        {/* House + stages share one tall parent so sticky works on mobile too */}
        <div className="treat-flow__layout">
          <div className="treat-flow__house-sticky" aria-hidden="true">
            <TreatHouse stage={stage} />
            <div className="treat-flow__dots" role="presentation">
              {items.map((item, i) => (
                <span key={item.n} className={`treat-flow__dot ${i === stage ? "is-on" : ""}`}>
                  {item.n}
                </span>
              ))}
            </div>
          </div>

          <div className="treat-flow__stages">
            {items.map((item, i) => (
              <article
                key={item.n}
                id={`treat-stage-${item.n}`}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                data-treat-stage={i}
                className={`treat-flow__stage ${i === stage ? "is-on" : ""}`}
              >
                <div className="treat-flow__meta">
                  <span className="treat-flow__tag">{item.tag}</span>
                  <span className="treat-flow__n">{item.n}</span>
                </div>
                <h3 className="treat-flow__title">{item.title}</h3>

                <ol className="treat-flow__blocks">
                  {flow.map((key, si) => (
                    <li
                      key={key}
                      className={`treat-step treat-step--${key} treat-step--panel`}
                      style={{ ["--d" as string]: si } as CSSProperties}
                    >
                      <span className="treat-step__label">{content.treat.labels[key]}</span>
                      <p>{item[key]}</p>
                    </li>
                  ))}
                </ol>

                <div className="treat-flow__nav" role="group" aria-label="מעבר בין נושאי טיפול">
                  <button
                    type="button"
                    className="treat-flow__nav-btn"
                    onClick={() => goTo(i - 1)}
                    disabled={i === 0}
                    aria-disabled={i === 0}
                  >
                    <span className="treat-flow__nav-dir">הקודם</span>
                    <span className="treat-flow__nav-sub">
                      {i > 0 ? items[i - 1].title : "תחילת הרשימה"}
                    </span>
                  </button>
                  <p className="treat-flow__nav-count">
                    <span>{i + 1}</span>
                    <span className="treat-flow__nav-of">/{items.length}</span>
                  </p>
                  <button
                    type="button"
                    className="treat-flow__nav-btn treat-flow__nav-btn--next"
                    onClick={() => goTo(i + 1)}
                    disabled={i >= items.length - 1}
                    aria-disabled={i >= items.length - 1}
                  >
                    <span className="treat-flow__nav-dir">הבא</span>
                    <span className="treat-flow__nav-sub">
                      {i < items.length - 1 ? items[i + 1].title : "סוף הרשימה"}
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="treat-flow__tabs" role="tablist" aria-label={content.treat.title}>
          {items.map((item, i) => (
            <button
              key={item.n}
              type="button"
              role="tab"
              aria-selected={i === stage}
              className={`treat-flow__tab ${i === stage ? "is-on" : ""}`}
              onClick={() => goTo(i)}
            >
              {item.n}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
