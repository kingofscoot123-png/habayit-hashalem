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
    const next = Math.max(0, Math.min(items.length - 1, i));
    if (next === stageRef.current) return;
    stageRef.current = next;
    setStage(next);
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetail();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [detailOpen]);

  /**
   * Classic sticky pin + scroll-paced stages (like before).
   * While the card text overflows, prefer a short inner scroll first.
   * Tap/click the visible text (or "קראו את הכל") to open a focused reader;
   * closing it resumes the same scroll rhythm into the next treatment.
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

    const onWheel = (e: globalThis.WheelEvent) => {
      if (detailOpenRef.current) {
        e.preventDefault();
        return;
      }
      if (!pinActiveRef.current) return;
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
      if (detailOpenRef.current) {
        e.preventDefault();
        return;
      }
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

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const endDistance = mobile
      ? Math.round(window.innerHeight * Math.max(4.2, items.length * 1.4))
      : Math.max(2000, Math.round(window.innerHeight * items.length * 1.35));

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

        <div className="treat-pin__grid">
          <div className="treat-pin__copy" aria-live="polite">
            <div
              ref={copyScrollRef}
              className="treat-pin__scroll"
              data-treat-scroll
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              tabIndex={0}
              aria-label={`${current.title}: גללו או לחצו על הטקסט לקריאה מלאה`}
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
                        className={`treat-step treat-step--${key} treat-step--panel treat-step--openable`}
                        style={i === stage ? ({ ["--d" as string]: si } as CSSProperties) : undefined}
                      >
                        <button
                          type="button"
                          className="treat-step__hit"
                          onClick={openDetail}
                          aria-haspopup="dialog"
                          aria-expanded={detailOpen && i === stage}
                        >
                          <span className="treat-step__label">{content.treat.labels[key]}</span>
                          <p>{item[key]}</p>
                          <span className="treat-step__hint">{content.treat.detailHint}</span>
                        </button>
                      </li>
                    ))}
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
              <section className="treat-detail-modal__block treat-detail-modal__block--now">
                <h4>{content.treat.labels.now}</h4>
                <p>{current.now}</p>
              </section>
              <section className="treat-detail-modal__block treat-detail-modal__block--how">
                <h4>{content.treat.labels.how}</h4>
                <p>{current.how}</p>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
