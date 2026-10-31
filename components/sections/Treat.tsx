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

type PaneSnap = {
  el: HTMLDivElement | null;
  hasOverflow: boolean;
  atTop: boolean;
  atBottom: boolean;
};

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
  const canPrev = stage > 0;
  const canNext = stage < items.length - 1;
  const prevItem = canPrev ? items[stage - 1] : null;
  const nextItem = canNext ? items[stage + 1] : null;

  const setStep = (i: number) => {
    const next = Math.max(0, Math.min(items.length - 1, i));
    if (next === stageRef.current) return;
    stageRef.current = next;
    setStage(next);
  };

  useEffect(() => {
    const pane = copyScrollRef.current;
    if (pane) pane.scrollTop = 0;
  }, [stage]);

  const readPane = (): PaneSnap => {
    const el = copyScrollRef.current;
    if (!el) return { el: null, hasOverflow: false, atTop: true, atBottom: true };
    const hasOverflow = el.scrollHeight > el.clientHeight + 2;
    return {
      el,
      hasOverflow,
      atTop: el.scrollTop <= 1,
      atBottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 2,
    };
  };

  /**
   * Sticky pin + scroll-driven stages so the house builds 01→02→03.
   * While a card still has unread overflow, vertical gestures finish the
   * inner pane first; then page progress advances the stage / house.
   */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin || reduced) return;

    const preferInnerScroll = () => {
      if (pinActiveRef.current) return true;
      const el = copyScrollRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 72;
    };

    const onWheel = (e: globalThis.WheelEvent) => {
      if (!preferInnerScroll()) return;
      const { el, atTop, atBottom, hasOverflow } = readPane();
      if (!el || !hasOverflow) return;
      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += e.deltaY;
      }
    };

    let touchY = 0;
    let startY = 0;
    let lockingY = false;

    const onTouchStart = (e: globalThis.TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      startY = touchY;
      lockingY = false;
    };

    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (!preferInnerScroll()) return;
      const y = e.touches[0]?.clientY ?? touchY;
      const dy = touchY - y;
      const { el, atTop, atBottom, hasOverflow } = readPane();
      if (!el || !hasOverflow) return;

      const pullingUp = dy > 0;
      const pullingDown = dy < 0;
      if ((pullingUp && !atBottom) || (pullingDown && !atTop)) {
        lockingY = true;
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += dy;
        touchY = y;
      } else if (lockingY && Math.abs(y - startY) > 8) {
        e.preventDefault();
        e.stopPropagation();
        touchY = y;
      }
    };

    pin.addEventListener("wheel", onWheel, { passive: false, capture: true });
    pin.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    pin.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });

    return () => {
      pin.removeEventListener("wheel", onWheel, true);
      pin.removeEventListener("touchstart", onTouchStart, true);
      pin.removeEventListener("touchmove", onTouchMove, true);
    };
  }, [reduced, items.length]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || reduced) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const endDistance = mobile
      ? Math.round(window.innerHeight * Math.max(4.4, items.length * 1.55))
      : Math.max(2400, Math.round(window.innerHeight * items.length * 1.45));

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        id: "treat-pin",
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
          <span className="treat-pin__rule" aria-hidden="true" />
          <p className="treat-pin__lead mt-3 text-body text-ink">{content.treat.lead}</p>
        </div>

        <div className="treat-pin__grid">
          <div className="treat-pin__copy" aria-live="polite">
            <div className="treat-pin__nav" role="group" aria-label="מעבר בין נושאי טיפול">
              <button
                type="button"
                className="treat-pin__nav-btn"
                onClick={() => goTo(stage - 1)}
                disabled={!canPrev}
                aria-disabled={!canPrev}
              >
                <span className="treat-pin__nav-dir">הקודם</span>
                <span className="treat-pin__nav-sub">{prevItem ? prevItem.title : "תחילת הרשימה"}</span>
              </button>
              <p className="treat-pin__nav-count">
                <span>{stage + 1}</span>
                <span className="treat-pin__nav-of">/{items.length}</span>
              </p>
              <button
                type="button"
                className="treat-pin__nav-btn treat-pin__nav-btn--next"
                onClick={() => goTo(stage + 1)}
                disabled={!canNext}
                aria-disabled={!canNext}
              >
                <span className="treat-pin__nav-dir">הבא</span>
                <span className="treat-pin__nav-sub">{nextItem ? nextItem.title : "סוף הרשימה"}</span>
              </button>
            </div>

            <div
              ref={copyScrollRef}
              className="treat-pin__scroll"
              data-treat-scroll
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              tabIndex={0}
              aria-label={`${current.title}: גללו לקריאת כל התוכן. השתמשו בהבא/הקודם או ב־01–03 למעבר`}
            >
              {items.map((item, i) => (
                <article
                  key={item.n}
                  className={`treat-pin__card ${i === stage ? "is-on" : ""}`}
                  aria-hidden={i !== stage}
                >
                  <div className="treat-pin__meta">
                    <span className="treat-pin__tag">{item.tag}</span>
                    <span className="treat-pin__n">{item.n}</span>
                  </div>
                  <h3 className="treat-pin__title">{item.title}</h3>
                  <ol className="treat-pin__flow">
                    {flow.map((key, si) => (
                      <li
                        key={key}
                        className={`treat-step treat-step--${key} treat-step--panel`}
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
