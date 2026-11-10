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

/**
 * במה אני מטפל — N cards on scroll (pin scrub).
 * Progress dots follow the visually active card; house build maps onto the same steps.
 * Full copy opens for the card that was tapped — never the lagging scroll index.
 */
export function Treat() {
  const items = content.treat.items;
  const cardCount = items.length;
  const sectionRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const pinActiveRef = useRef(false);
  const detailOpenRef = useRef(false);
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
      // Pin only the card stack — leave room for the top nav + shared house.
      const avail = Math.max(
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
      const slot = 2;
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
            if (detailOpenRef.current) return;
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
        const at = (i - 1) * slot + 1;
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
      tl.to({}, { duration: 0.35 }, (cards.length - 1) * slot + 1);
    }, section);

    return () => {
      pinActiveRef.current = false;
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
          <div className="treat-scroll__house treat-scroll__house--shared relative w-full text-center" aria-hidden="true">
            <TreatHouse stage={houseStage} />
            <ol className="treat-scroll__progress treat-scroll__progress--house" aria-hidden="true">
              {Array.from({ length: cardCount }, (_, pi) => (
                <li key={pi} className={pi === stage ? "is-on" : pi < stage ? "is-done" : ""}>
                  <span>{String(pi + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="treat-scroll__stage">
            {items.map((item, i) => (
              <article
                key={item.n}
                data-treat-card
                data-treat-stage={i}
                className={`treat-scroll__card treat-scroll__card--compact treat-scroll__card--no-house border-[#C5A059]/40 ${i === stage ? "is-on" : ""}`}
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
