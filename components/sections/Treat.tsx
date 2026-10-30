"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type WheelEvent, type TouchEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { TreatHouse } from "@/components/TreatHouse";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const flow = ["now", "how"] as const;
const DESKTOP_MQ = "(min-width: 768px)";

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
   * Desktop only: while pinned, vertical scroll finishes reading the active card
   * before stages advance. Mobile uses natural stacked cards (no pin / no trap).
   */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin || reduced) return;
    if (!window.matchMedia(DESKTOP_MQ).matches) return;

    const paneEl = () => copyScrollRef.current;

    const paneState = () => {
      const el = paneEl();
      if (!el) return { el: null as HTMLDivElement | null, atTop: true, atBottom: true, hasOverflow: false };
      const hasOverflow = el.scrollHeight > el.clientHeight + 2;
      return {
        el,
        hasOverflow,
        atTop: el.scrollTop <= 1,
        atBottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 2,
      };
    };

    const preferInnerScroll = () => {
      if (pinActiveRef.current) return true;
      const el = paneEl();
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 72;
    };

    const onWheel = (e: globalThis.WheelEvent) => {
      if (!window.matchMedia(DESKTOP_MQ).matches) return;
      if (!preferInnerScroll()) return;
      const { el, atTop, atBottom, hasOverflow } = paneState();
      if (!el || !hasOverflow) return;
      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += e.deltaY;
      }
    };

    let touchY = 0;
    let startY = 0;
    let locking = false;

    const onTouchStart = (e: globalThis.TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      startY = touchY;
      locking = false;
    };

    const onTouchMove = (e: globalThis.TouchEvent) => {
      if (!window.matchMedia(DESKTOP_MQ).matches) return;
      if (!preferInnerScroll()) return;
      const y = e.touches[0]?.clientY ?? touchY;
      const dy = touchY - y;
      const { el, atTop, atBottom, hasOverflow } = paneState();
      if (!el || !hasOverflow) return;

      const pullingDown = dy < 0;
      const pullingUp = dy > 0;
      if ((pullingUp && !atBottom) || (pullingDown && !atTop)) {
        locking = true;
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += dy;
        touchY = y;
      } else if (locking && Math.abs(y - startY) > 8) {
        e.preventDefault();
        e.stopPropagation();
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

    const desktopMq = window.matchMedia(DESKTOP_MQ);
    let ctx: gsap.Context | null = null;

    const killPin = () => {
      pinActiveRef.current = false;
      stRef.current = null;
      ctx?.revert();
      ctx = null;
    };

    const setupDesktopPin = () => {
      killPin();
      if (!desktopMq.matches) return;

      const endDistance = Math.max(1800, Math.round(window.innerHeight * items.length * 1.35));
      ctx = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top+=72",
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
      ScrollTrigger.refresh();
    };

    setupDesktopPin();
    const onChange = () => setupDesktopPin();
    desktopMq.addEventListener("change", onChange);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(refresh);

    return () => {
      desktopMq.removeEventListener("change", onChange);
      window.removeEventListener("load", refresh);
      killPin();
    };
  }, [reduced, items.length]);

  const goTo = (i: number) => {
    setStep(i);
    if (!window.matchMedia(DESKTOP_MQ).matches) {
      document.getElementById(`treat-card-${items[i]?.n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (reduced) return;
    const st = stRef.current;
    if (!st) return;
    const y = st.start + ((i + 0.45) / items.length) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const stopScrollJack = (e: WheelEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <section id="treat" ref={sectionRef} className="treat-pin-section mishpacha-canvas">
      <div ref={pinRef} className="treat-pin">
        <div className="treat-pin__head">
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.treat.title} />
          </h2>
          <span className="treat-pin__rule" aria-hidden="true" />
          <p className="mt-3 text-body text-ink">{content.treat.lead}</p>
        </div>

        {/* Mobile: natural stacked cards — no sticky pin / no scroll-trap */}
        <div className="treat-mobile-stack">
          {items.map((item) => (
            <article key={item.n} id={`treat-card-${item.n}`} className="treat-mobile-stack__card">
              <div className="treat-pin__meta">
                <span className="treat-pin__tag">{item.tag}</span>
                <span className="treat-pin__n">{item.n}</span>
              </div>
              <h3 className="treat-pin__title">{item.title}</h3>
              <div
                className="treat-mobile-stack__scroll max-h-[70vh] overflow-y-auto"
                data-treat-scroll
                data-lenis-prevent
                data-lenis-prevent-touch
                tabIndex={0}
                aria-label={`${item.title}: תוכן מלא לגלילה`}
                onTouchMove={stopScrollJack}
                onWheel={stopScrollJack}
              >
                <ol className="treat-pin__flow">
                  {flow.map((key) => (
                    <li key={key} className={`treat-step treat-step--${key} treat-step--panel`}>
                      <span className="treat-step__label">{content.treat.labels[key]}</span>
                      <p>{item[key]}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
          <div className="treat-pin__dots treat-pin__dots--mobile" role="tablist" aria-label={content.treat.title}>
            {items.map((item, i) => (
              <button key={item.n} type="button" role="tab" className="treat-pin__dot" onClick={() => goTo(i)}>
                {item.n}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: sticky staged cards */}
        <div className="treat-pin__grid treat-pin__grid--desktop">
          <div className="treat-pin__copy" aria-live="polite">
            <div
              ref={copyScrollRef}
              className="treat-pin__scroll max-h-[50vh] overflow-y-auto"
              data-treat-scroll
              data-lenis-prevent
              data-lenis-prevent-wheel
              tabIndex={0}
              aria-label={`${current.title}: תוכן מלא לגלילה`}
              onWheel={stopScrollJack}
              onTouchMove={stopScrollJack}
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

        <p className="treat-pin__hint treat-pin__hint--desktop">{current.title}</p>
      </div>
    </section>
  );
}
