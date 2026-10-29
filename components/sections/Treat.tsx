"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
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
  const copyScrollRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const stageRef = useRef(0);
  const pinActiveRef = useRef(false);
  const { reduced } = useMotionPrefs();
  const [stage, setStage] = useState(0);
  const items = content.treat.items;
  const current = items[stage];

  const setStep = (i: number) => {
    stageRef.current = i;
    setStage(i);
  };

  useEffect(() => {
    const pane = copyScrollRef.current;
    if (pane) pane.scrollTop = 0;
  }, [stage]);

  /**
   * Sticky pin stays. While pinned, vertical scroll first finishes reading the card.
   * Only after the card is fully read (or has no overflow) does page scroll advance stages.
   */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin || reduced) return;

    const paneState = () => {
      const el = copyScrollRef.current;
      if (!el) return { el: null as HTMLDivElement | null, atTop: true, atBottom: true, hasOverflow: false };
      const hasOverflow = el.scrollHeight > el.clientHeight + 2;
      return {
        el,
        hasOverflow,
        atTop: el.scrollTop <= 1,
        atBottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 2,
      };
    };

    const onWheel = (e: WheelEvent) => {
      if (!pinActiveRef.current) return;
      const { el, atTop, atBottom, hasOverflow } = paneState();
      if (!el || !hasOverflow) return;
      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
    };

    let touchY = 0;
    let startY = 0;
    let locking = false;

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      startY = touchY;
      locking = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pinActiveRef.current) return;
      const y = e.touches[0]?.clientY ?? touchY;
      const dy = touchY - y;
      const { el, atTop, atBottom, hasOverflow } = paneState();
      if (!el || !hasOverflow) return;

      const pullingDown = dy < 0;
      const pullingUp = dy > 0;
      if ((pullingUp && !atBottom) || (pullingDown && !atTop)) {
        locking = true;
        e.preventDefault();
        el.scrollTop += dy;
        touchY = y;
      } else if (locking && Math.abs(y - startY) > 8) {
        // Keep consuming the gesture until finger lifts so the page doesn't jump stages mid-read.
        e.preventDefault();
        touchY = y;
      }
    };

    pin.addEventListener("wheel", onWheel, { passive: false });
    pin.addEventListener("touchstart", onTouchStart, { passive: true });
    pin.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      pin.removeEventListener("wheel", onWheel);
      pin.removeEventListener("touchstart", onTouchStart);
      pin.removeEventListener("touchmove", onTouchMove);
    };
  }, [reduced]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || reduced) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    // Longer dwell per topic so sticky reading stays calm; inner scroll covers long copy.
    const endDistance = mobile
      ? Math.round(window.innerHeight * Math.max(4.8, items.length * 1.25))
      : Math.max(2200, Math.round(window.innerHeight * 4.2));

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: mobile ? "top top" : "top top+=72",
        end: `+=${endDistance}`,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          pinActiveRef.current = self.isActive;
        },
        onUpdate: (self) => {
          // Hold each stage a bit longer in the middle of its progress slice.
          const raw = self.progress * items.length;
          const i = Math.min(items.length - 1, Math.floor(raw + 0.001));
          if (i !== stageRef.current) setStep(i);
        },
      });
      stRef.current = st;
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(refresh);

    return () => {
      pinActiveRef.current = false;
      window.removeEventListener("load", refresh);
      stRef.current = null;
      ctx.revert();
    };
  }, [reduced, items.length]);

  const goTo = (i: number) => {
    setStep(i);
    if (reduced) return;
    const st = stRef.current;
    if (!st) return;
    const y = st.start + ((i + 0.45) / items.length) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="treat" ref={sectionRef} className="treat-pin-section mishpacha-canvas">
      <div ref={pinRef} className="treat-pin">
        <div className="treat-pin__head">
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.treat.title} />
          </h2>
          <p className="mt-3 text-body text-ink">{content.treat.lead}</p>
        </div>

        <div className="treat-pin__grid">
          <div className="treat-pin__copy" aria-live="polite">
            <div ref={copyScrollRef} className="treat-pin__scroll" data-treat-scroll>
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
            </div>

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
