"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { TreatHouse } from "@/components/TreatHouse";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const flow = ["now", "how", "result"] as const;
const HOUSE_STAGES = 5;
const TREAT_SLOT = 2;
const TREAT_TAIL = 0.35;

/**
 * במה אני מטפל — N cards on scroll (pin scrub).
 * Progress dots follow the visually active card; house build maps onto the same steps.
 * Numbers are tappable — they glide the same scrub timeline without fighting scroll.
 * Full copy opens for the card that was tapped — never the lagging scroll index.
 */
export function Treat() {
  const items = content.treat.items;
  const cardCount = items.length;
  const sectionRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const pinActiveRef = useRef(false);
  const detailOpenRef = useRef(false);
  const jumpingRef = useRef(false);
  const jumpTweenRef = useRef<gsap.core.Tween | null>(null);
  const jumpTokenRef = useRef(0);
  const jumpClearTimerRef = useRef<number | null>(null);
  const stageRef = useRef(0);
  const houseRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [houseStage, setHouseStage] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState(0);
  const { reduced } = useMotionPrefs();
  const current = items[detailIndex] ?? items[0];

  const setStep = (i: number) => {
    stageRef.current = i;
    setStage(i);
  };

  const setHouse = (i: number) => {
    houseRef.current = i;
    setHouseStage(i);
  };

  const syncHouseForCard = (idx: number) => {
    const hIdx =
      cardCount <= 1
        ? HOUSE_STAGES - 1
        : Math.round((idx / (cardCount - 1)) * (HOUSE_STAGES - 1));
    if (hIdx !== houseRef.current) setHouse(hIdx);
  };

  const openDetail = (i: number) => {
    const idx = Math.max(0, Math.min(cardCount - 1, i));
    setDetailIndex(idx);
    setStep(idx);
    syncHouseForCard(idx);
    setDetailOpen(true);
  };
  const closeDetail = () => setDetailOpen(false);

  /** Progress where card `idx` is fully settled on the scrub timeline. */
  const progressForCard = (idx: number) => {
    const n = Math.max(1, cardCount);
    const totalDur = Math.max(0.001, (n - 1) * TREAT_SLOT + 1 + TREAT_TAIL);
    let settle: number;
    if (idx <= 0) settle = 0.04;
    else if (idx >= n - 1) settle = totalDur - 0.12;
    else settle = (idx - 1) * TREAT_SLOT + 1 + 0.85;
    return gsap.utils.clamp(0, 0.999, settle / totalDur);
  };

  const settleCards = (idx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-treat-card]"));
    cards.forEach((card, i) => {
      gsap.set(card, {
        autoAlpha: i === idx ? 1 : 0,
        y: 0,
      });
    });
    setStep(idx);
    syncHouseForCard(idx);
  };

  /** Snap scrub + timeline to the target card so lag cannot revive the old step. */
  const snapTreatScroll = (idx: number, y: number) => {
    window.scrollTo(0, y);
    const st = ScrollTrigger.getById("treat-scroll");
    if (st) {
      const scrubTween = typeof st.getTween === "function" ? st.getTween() : null;
      scrubTween?.progress(1);
      if (st.animation) {
        st.animation.progress(progressForCard(idx));
      }
    }
    ScrollTrigger.update();
    settleCards(idx);
  };

  /** Jump via the existing scrub timeline — glide, then hard-settle the visible card. */
  const jumpTo = (i: number) => {
    if (detailOpenRef.current) return;
    const idx = Math.max(0, Math.min(cardCount - 1, i));
    const from = stageRef.current;
    if (idx === from && !jumpingRef.current) return;

    if (jumpClearTimerRef.current != null) {
      window.clearTimeout(jumpClearTimerRef.current);
      jumpClearTimerRef.current = null;
    }

    if (reduced) {
      settleCards(idx);
      return;
    }

    const st = ScrollTrigger.getById("treat-scroll");
    if (!st) {
      settleCards(idx);
      return;
    }

    const y = st.start + (st.end - st.start) * progressForCard(idx);
    const startY = window.scrollY || window.pageYOffset;
    const token = ++jumpTokenRef.current;
    const scrubLag = window.matchMedia("(max-width: 767px)").matches ? 0.45 : 0.75;

    jumpTweenRef.current?.kill();
    jumpingRef.current = true;
    setStep(idx);
    syncHouseForCard(idx);

    const finishJump = () => {
      if (token !== jumpTokenRef.current) return;
      snapTreatScroll(idx, y);
      // Stay locked longer than scrub lag so onUpdate cannot snap back.
      jumpClearTimerRef.current = window.setTimeout(() => {
        if (token !== jumpTokenRef.current) return;
        snapTreatScroll(idx, y);
        jumpingRef.current = false;
        jumpTweenRef.current = null;
        jumpClearTimerRef.current = null;
      }, Math.round(scrubLag * 1000) + 80);
    };

    if (Math.abs(y - startY) < 2) {
      finishJump();
      return;
    }

    const dist = Math.max(1, Math.abs(idx - from));
    const duration = gsap.utils.clamp(0.5, 0.9, 0.42 + dist * 0.18);
    const proxy = { y: startY };

    jumpTweenRef.current = gsap.to(proxy, {
      y,
      duration,
      ease: "power3.inOut",
      overwrite: true,
      onUpdate: () => {
        if (token !== jumpTokenRef.current) return;
        window.scrollTo(0, proxy.y);
      },
      onComplete: finishJump,
    });
  };

  useEffect(() => {
    detailOpenRef.current = detailOpen;
  }, [detailOpen]);

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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pinEl = section.querySelector<HTMLElement>(".treat-scroll__pin");
    const stageEl = section.querySelector<HTMLElement>(".treat-scroll__stage");
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-treat-card]"));

    const fitStage = () => {
      if (!stageEl || cards.length === 0) return;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      // Mobile keeps the stacked pin. Desktop is side-by-side, so the card
      // can use most of the viewport height without sitting under the fold.
      const avail = desktop
        ? Math.max(400, Math.round(window.innerHeight * 0.62))
        : Math.max(
            mobile ? 300 : 360,
            Math.round(window.innerHeight * (mobile ? 0.62 : 0.58)),
          );
      stageEl.style.minHeight = `${avail}px`;
      stageEl.style.height = `${avail}px`;
      stageEl.style.maxHeight = `${avail}px`;
    };
    fitStage();
    window.addEventListener("resize", fitStage);

    const activeCardIndex = () => {
      let best = 0;
      let bestA = -1;
      cards.forEach((c, i) => {
        const a = Number(gsap.getProperty(c, "autoAlpha"));
        if (a > bestA) {
          bestA = a;
          best = i;
        }
      });
      return best;
    };

    const ctx = gsap.context(() => {
      if (reduced || cards.length === 0) {
        gsap.set(cards, { autoAlpha: 1, y: 0, position: "relative" });
        setHouse(HOUSE_STAGES - 1);
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      gsap.set(cards, { autoAlpha: 0, y: mobile ? 26 : 34 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });
      setStep(0);
      setHouse(0);
      fitStage();

      const perStep = Math.round(window.innerHeight * (mobile ? 0.85 : 1.05));
      const pinTarget = pinEl || section;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "treat-scroll",
          trigger: pinTarget,
          start: mobile ? "top top+=56" : "top top+=80",
          end: () => `+=${perStep * cards.length}`,
          pin: true,
          pinSpacing: true,
          scrub: mobile ? 0.45 : 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: fitStage,
          onToggle: (self) => {
            pinActiveRef.current = self.isActive;
          },
          onUpdate: (self) => {
            pinActiveRef.current = self.isActive;
            if (detailOpenRef.current || jumpingRef.current) return;
            // Follow the card that is actually on screen — scrub lag used to
            // leave React `stage` one topic behind the visible CTA.
            const idx = activeCardIndex();
            if (idx !== stageRef.current) setStep(idx);
            const hIdx =
              cards.length <= 1
                ? HOUSE_STAGES - 1
                : Math.round((idx / (cards.length - 1)) * (HOUSE_STAGES - 1));
            if (hIdx !== houseRef.current) setHouse(hIdx);
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const at = (i - 1) * TREAT_SLOT + 1;
        tl.to(
          cards[i - 1],
          { autoAlpha: 0, y: mobile ? -20 : -26, duration: 0.65, ease: "power2.inOut" },
          at,
        );
        tl.fromTo(
          card,
          { autoAlpha: 0, y: mobile ? 28 : 34 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" },
          at,
        );
      });
      tl.to({}, { duration: TREAT_TAIL }, (cards.length - 1) * TREAT_SLOT + 1);
    }, section);

    return () => {
      pinActiveRef.current = false;
      jumpingRef.current = false;
      jumpTokenRef.current += 1;
      if (jumpClearTimerRef.current != null) {
        window.clearTimeout(jumpClearTimerRef.current);
        jumpClearTimerRef.current = null;
      }
      jumpTweenRef.current?.kill();
      jumpTweenRef.current = null;
      window.removeEventListener("resize", fitStage);
      ctx.revert();
    };
  }, [reduced, items.length]);

  return (
    <section
      id="treat"
      ref={sectionRef}
      className={`treat-scroll mishpacha-canvas ${reduced ? "treat-scroll--static" : ""}`}
      aria-label={content.treat.title}
    >
      <div className="treat-scroll__inner">
        <header className="treat-scroll__head">
          <h2 className="section-title-rule text-h2 text-[#82152B]">
            <AccentLead text={content.treat.title} />
          </h2>
          <span className="treat-scroll__rule" aria-hidden="true" />
          <p className="treat-scroll__lead leading-relaxed">{content.treat.lead}</p>
          <p className="treat-scroll__hint">{content.treat.scrollHint}</p>
        </header>

        <div className="treat-scroll__pin">
          <div className="treat-scroll__house treat-scroll__house--shared relative w-full text-center">
            <div aria-hidden="true">
              <TreatHouse stage={houseStage} />
            </div>
            <ol
              className="treat-scroll__progress treat-scroll__progress--house"
              role="tablist"
              aria-label={content.treat.title}
            >
              {Array.from({ length: cardCount }, (_, pi) => (
                <li
                  key={pi}
                  className={pi === stage ? "is-on" : pi < stage ? "is-done" : ""}
                  role="presentation"
                >
                  <button
                    type="button"
                    role="tab"
                    className="treat-scroll__progress-btn"
                    aria-selected={pi === stage}
                    aria-controls={`treat-card-${pi}`}
                    aria-label={`${items[pi]?.n ?? String(pi + 1).padStart(2, "0")} — ${items[pi]?.title ?? ""}`}
                    onClick={() => jumpTo(pi)}
                  >
                    {String(pi + 1).padStart(2, "0")}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="treat-scroll__stage">
            {items.map((item, i) => (
              <article
                key={item.n}
                id={`treat-card-${i}`}
                data-treat-card
                data-treat-stage={i}
                className={`treat-scroll__card treat-scroll__card--compact treat-scroll__card--no-house border-[#C5A059]/40 ${i === stage ? "is-on" : ""}`}
                role="tabpanel"
                aria-hidden={i !== stage}
              >
                <div className="treat-scroll__meta">
                  <span className="treat-scroll__n">{item.n}</span>
                  <span className="treat-scroll__tag">{item.tag}</span>
                </div>
                <h3 className="treat-scroll__title text-[#82152B]">{item.title}</h3>

                <button
                  type="button"
                  className="treat-detail-cta treat-detail-cta--strong"
                  onClick={() => openDetail(i)}
                  aria-haspopup="dialog"
                  aria-expanded={detailOpen && detailIndex === i}
                >
                  <span className="treat-detail-cta__main">{content.treat.detailCta}</span>
                  <span className="treat-detail-cta__sub">{content.treat.detailHint}</span>
                </button>

                <div className="treat-scroll__preview" aria-hidden="true">
                  <p className="treat-scroll__preview-label text-[#82152B]">{content.treat.labels.now}</p>
                  <p className="treat-scroll__preview-text">{item.now}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
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
              {flow.map((key) => (
                <section
                  key={key}
                  className={`treat-detail-modal__block treat-detail-modal__block--${key}`}
                >
                  <h4>{content.treat.labels[key]}</h4>
                  <p>{current[key]}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
