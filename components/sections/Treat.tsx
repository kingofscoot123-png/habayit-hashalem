"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { TreatHouse } from "@/components/TreatHouse";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const flow = ["now", "how", "result"] as const;

export function Treat() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef(0);
  const pauseRef = useRef(false);
  const { reduced } = useMotionPrefs();
  const [stage, setStage] = useState(0);
  const items = content.treat.items;
  const current = items[stage];

  const setStep = (i: number) => {
    stageRef.current = i;
    setStage(i);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=72",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (pauseRef.current) return;
          const i = Math.min(items.length - 1, Math.floor(self.progress * items.length + 0.001));
          if (i !== stageRef.current) setStep(i);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced, items.length]);

  const goTo = (i: number) => {
    pauseRef.current = true;
    setStep(i);
    window.setTimeout(() => {
      pauseRef.current = false;
    }, 1200);
  };

  return (
    <section id="treat" ref={sectionRef} className="treat-pin-section">
      <div className="treat-pin">
        <div className="treat-pin__head">
          <h2 className="text-h2">
            <AccentLead text={content.treat.title} />
          </h2>
          <p className="mt-3 text-body text-ink-soft">{content.treat.lead}</p>
        </div>

        <div className="treat-pin__grid">
          <div className="treat-pin__copy" aria-live="polite">
            {items.map((item, i) => (
              <article
                key={item.n}
                className={`treat-pin__card ${i === stage ? "is-on" : ""}`}
                aria-hidden={i !== stage}
              >
                <div className="treat-pin__meta">
                  <span className="treat-pin__n">{item.n}</span>
                  <span className="treat-pin__tag">{item.tag}</span>
                </div>
                <h3 className="treat-pin__title">{item.title}</h3>
                <ol className="treat-pin__flow">
                  {flow.map((key, si) => (
                    <li
                      key={key}
                      className={`treat-step treat-step--${key}`}
                      style={i === stage ? ({ ["--d" as string]: si } as CSSProperties) : undefined}
                    >
                      <span className="treat-step__label">{content.treat.labels[key]}</span>
                      <p>{item[key]}</p>
                    </li>
                  ))}
                </ol>
              </article>
            ))}

            <div className="treat-pin__dots" role="tablist" aria-label={content.treat.title}>
              {items.map((item, i) => (
                <button
                  key={item.n}
                  type="button"
                  role="tab"
                  aria-selected={i === stage}
                  className={`treat-pin__dot ${i === stage ? "is-on" : ""}`}
                  onClick={() => goTo(i)}
                >
                  {item.n}
                </button>
              ))}
            </div>
          </div>

          <TreatHouse stage={stage} />
        </div>

        <p className="treat-pin__hint">{current.title}</p>
      </div>
    </section>
  );
}
