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
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const stageRef = useRef(0);
  const pinActiveRef = useRef(false);
  const detailOpenRef = useRef(false);
  const { reduced } = useMotionPrefs();
  const [stage, setStage] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const items = content.treat.items;
  const current = items[stage];

  const setStep = (i: number) => {
    stageRef.current = i;
    setStage(i);
  };

  const openDetail = () => setDetailOpen(true);
  const closeDetail = () => setDetailOpen(false);

  useEffect(() => {
    detailOpenRef.current = detailOpen;
  }, [detailOpen]);

  useEffect(() => {
    const pane = copyScrollRef.current;
    if (pane) pane.scrollTop = 0;
  }, [stage]);

  useEffect(() => {
    if (!detailOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetail();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [detailOpen]);

  /**
   * Sticky pin stays. While pinned, vertical scroll first finishes reading the card
   * ("מה קורה עכשיו" → "איך הטיפול משנה את זה" → life result) before stages advance.
   * Modal open freezes stage changes and absorbs wheel/touch so sticky resume stays seamless.
   */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin || reduced) return;

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
      if (detailOpenRef.current || pinActiveRef.current) return true;
      const el = paneEl();
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 72;
    };

    const onWheel = (e: WheelEvent) => {
      if (detailOpenRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
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

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      startY = touchY;
      locking = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (detailOpenRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
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
          if (detailOpenRef.current) return;
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
            <div
              ref={copyScrollRef}
              className="treat-pin__scroll"
              data-treat-scroll
              data-lenis-prevent
              data-lenis-prevent-wheel
              tabIndex={0}
              aria-label={`${current.title}: תוכן מלא לגלילה`}
            >
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
                    {flow.map((key, si) => {
                      const interactive = key === "how" || key === "result";
                      return (
                        <li
                          key={key}
                          className={`treat-step treat-step--${key} ${interactive ? "treat-step--openable" : ""}`}
                          style={i === stage ? ({ ["--d" as string]: si } as CSSProperties) : undefined}
                        >
                          {interactive ? (
                            <button
                              type="button"
                              className="treat-step__hit"
                              onClick={openDetail}
                              aria-haspopup="dialog"
                              aria-expanded={detailOpen && i === stage}
                            >
                              <span className="treat-step__label">{content.treat.labels[key]}</span>
                              <p>{item[key]}</p>
                              <span className="treat-step__hint">לחצו להרחבה</span>
                            </button>
                          ) : (
                            <>
                              <span className="treat-step__label">{content.treat.labels[key]}</span>
                              <p>{item[key]}</p>
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ol>

                  {i === stage ? (
                    <button type="button" className="treat-detail-cta" onClick={openDetail} aria-haspopup="dialog">
                      {content.treat.detailCta}
                    </button>
                  ) : null}
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

      {detailOpen ? (
        <div
          className="method-modal treat-detail-modal is-on"
          role="dialog"
          aria-modal="true"
          aria-labelledby="treat-detail-title"
        >
          <button
            type="button"
            className="method-modal__backdrop treat-detail-modal__backdrop"
            aria-label={content.treat.detailClose}
            onClick={closeDetail}
          />
          <div className="treat-detail-modal__panel method-modal__panel">
            <button
              ref={closeBtnRef}
              type="button"
              className="treat-detail-modal__close"
              aria-label={content.treat.detailClose}
              onClick={closeDetail}
            >
              <span aria-hidden="true">×</span>
            </button>

            <p className="treat-detail-modal__eyebrow">
              <span>{current.n}</span>
              <span>{current.tag}</span>
            </p>
            <h3 id="treat-detail-title" className="treat-detail-modal__title">
              {current.title}
            </h3>

            <div className="treat-detail-modal__blocks">
              <section className="treat-detail-modal__block treat-detail-modal__block--how">
                <h4>{content.treat.labels.how}</h4>
                <p>{current.how}</p>
              </section>
              <section className="treat-detail-modal__block treat-detail-modal__block--result">
                <h4>{content.treat.labels.result}</h4>
                <p>{current.result}</p>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
