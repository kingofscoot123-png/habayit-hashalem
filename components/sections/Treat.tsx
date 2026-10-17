"use client";

import { useLayoutEffect, useRef, useState } from "react";
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
  const pinRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const { reduced } = useMotionPrefs();
  const [stage, setStage] = useState(0);
  const items = content.treat.items;
  const current = items[stage];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || reduced) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top+=72",
        end: () => `+=${Math.max(3600, Math.round(window.innerHeight * 8.4))}`,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(items.length - 1, Math.floor(self.progress * items.length + 0.001));
          setStage((prev) => (prev === i ? prev : i));
        },
      });
      stRef.current = st;
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      stRef.current = null;
      ctx.revert();
    };
  }, [reduced, items.length]);

  const goTo = (i: number) => {
    setStage(i);
    if (reduced) return;
    const st = stRef.current;
    if (!st) return;
    const y = st.start + ((i + 0.45) / items.length) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="treat" ref={sectionRef} className="treat-pin-section">
      <div ref={pinRef} className="treat-pin">
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
                  {flow.map((key) => (
                    <li key={key} className={`treat-step treat-step--${key}`}>
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
