"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { HighlightCopy } from "@/components/HighlightCopy";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<string, string> = {
  "שיטת NLP רפואי": "M12 3v18M4 12h16",
  "שיטת EFT": "M12 4v16M7 9l10 6M17 9L7 15",
  "שיטת TAT": "M5 19h14M12 19V5M6 11l6-6 6 6",
  "שיטת TFT": "M4 7h10M4 12h16M4 17h12",
  "דמיון מודרך": "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z",
  "אקסס בארס": "M12 3c3.5 4 4 8 0 18C8 11 8.5 7 12 3z",
  "טרנס": "M12 3v6M12 15v6M3 12h6M15 12h6",
  "שיטת ספירל": "M12 6a4 4 0 1 1-4 4c0 6 8 4 8 10a4 4 0 1 1-8 0",
  "שיטת EMDR": "M4 8h16M4 16h16",
};

function MethodIcon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name] || "M12 5v14M5 12h14"} />
    </svg>
  );
}

function MethodSummary({ text }: { text: string }) {
  return (
    <p className="method-card__summary methods-copy-soft">
      <HighlightCopy text={text} />
    </p>
  );
}

const METHOD_LABELS = [
  "איך זה עובד:",
  "במפגש",
  "איך הטיפול משנה את המצב:",
  "למה זה מתאים:",
] as const;

function MethodBody({ text }: { text: string }) {
  const parts = text.split("\n\n").filter(Boolean);
  return (
    <div className="method-card__body">
      {parts.map((part, idx) => {
        const label = METHOD_LABELS.find((item) => part.startsWith(item));
        if (label) {
          const rest = part.slice(label.length).trim();
          return (
            <div key={idx} className="method-block">
              <h4 className="method-block__label">{label.replace(":", "")}</h4>
              <p className="methods-copy-soft method-block__text">
                <HighlightCopy text={rest} />
              </p>
            </div>
          );
        }
        return (
          <p key={idx} className="methods-copy-soft">
            <HighlightCopy text={part} />
          </p>
        );
      })}
    </div>
  );
}

export function Methods() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const pinnedScrollRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const pinActiveRef = useRef(false);
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(0);
  const items = content.methods.items;
  const current = items[active];
  const canPrev = active > 0;
  const canNext = active < items.length - 1;
  const prevItem = canPrev ? items[active - 1] : null;
  const nextItem = canNext ? items[active + 1] : null;

  const setMethod = (i: number) => {
    const next = Math.max(0, Math.min(items.length - 1, i));
    if (next === indexRef.current) return;
    indexRef.current = next;
    setActive(next);
  };

  const goPrev = () => {
    if (!canPrev) return;
    setMethod(active - 1);
  };

  const goNext = () => {
    if (!canNext) return;
    setMethod(active + 1);
  };

  const scrollToCard = (i: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(`[data-method-card="${i}"]`);
    if (!track || !card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta = cardRect.left - trackRect.left - (trackRect.width - cardRect.width) / 2;
    track.scrollBy({ left: delta, behavior });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-method-card]"));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = Number((visible.target as HTMLElement).dataset.methodCard);
        if (!Number.isNaN(i) && i !== indexRef.current) {
          indexRef.current = i;
          setActive(i);
        }
      },
      { root: track, threshold: 0.55 },
    );

    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const pane = pinnedScrollRef.current;
    if (pane) pane.scrollTop = 0;
  }, [active]);

  /**
   * Sticky visual stays. Vertical scroll ONLY reads the card.
   * Methods change via buttons / dots / horizontal swipe — never via page scrub.
   */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const paneState = () => {
      const el = pinnedScrollRef.current;
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
    let startX = 0;
    let startY = 0;
    let axis: "x" | "y" | null = null;

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      startX = e.touches[0]?.clientX ?? 0;
      startY = touchY;
      axis = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pinActiveRef.current) return;
      const y = e.touches[0]?.clientY ?? touchY;
      const x = e.touches[0]?.clientX ?? startX;
      const dy = touchY - y;
      const dxFromStart = x - startX;
      const dyFromStart = y - startY;

      if (!axis) {
        if (Math.abs(dxFromStart) < 10 && Math.abs(dyFromStart) < 10) return;
        // Prefer vertical reading unless the gesture is clearly horizontal.
        axis = Math.abs(dxFromStart) > Math.abs(dyFromStart) * 1.25 ? "x" : "y";
      }

      if (axis === "x") {
        e.preventDefault();
        return;
      }

      const { el, atTop, atBottom, hasOverflow } = paneState();
      if (!el || !hasOverflow) return;
      if ((dy > 0 && !atBottom) || (dy < 0 && !atTop)) {
        e.preventDefault();
        el.scrollTop += dy;
        touchY = y;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!pinActiveRef.current || axis !== "x") return;
      const endX = e.changedTouches[0]?.clientX ?? startX;
      const dx = endX - startX;
      if (Math.abs(dx) < 56) return;
      // Sequential only (no wrap): finger left → next, finger right → previous.
      // Matches RTL buttons: הבא on the left, הקודם on the right.
      if (dx < 0) setMethod(indexRef.current + 1);
      else setMethod(indexRef.current - 1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!pinActiveRef.current) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setMethod(indexRef.current + 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setMethod(indexRef.current - 1);
      }
    };

    pin.addEventListener("wheel", onWheel, { passive: false });
    pin.addEventListener("touchstart", onTouchStart, { passive: true });
    pin.addEventListener("touchmove", onTouchMove, { passive: false });
    pin.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      pin.removeEventListener("wheel", onWheel);
      pin.removeEventListener("touchstart", onTouchStart);
      pin.removeEventListener("touchmove", onTouchMove);
      pin.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [items.length]);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "methods-pin",
        trigger: section,
        start: "top top+=72",
        // Short sticky hold for the visual effect — methods do not scrub with progress.
        end: () => `+=${Math.round(window.innerHeight * 1.2)}`,
        pin,
        scrub: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          pinActiveRef.current = self.isActive;
        },
      });
    }, section);

    return () => {
      pinActiveRef.current = false;
      ctx.revert();
    };
  }, [reduced]);

  const goTo = (i: number) => {
    setMethod(i);
    scrollToCard(i);
  };

  return (
    <section id="path" ref={sectionRef} className="kit-section mishpacha-canvas px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div ref={pinRef} className="kit-section__pin">
        <div
          className="card-glass content-shield method-section-head mx-auto mb-8 max-w-3xl rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 text-center shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8"
          data-reveal
        >
          <h2 className="section-title-rule text-h2">
            <AccentLead text={content.methods.title} />
          </h2>
          <p className="mt-3 text-caption methods-copy-soft">
            <HighlightCopy text={content.methods.hint} />
          </p>
        </div>

        <div className="kit-core kit-core--mobile" aria-hidden="true">
          <div className="kit-core__glow" />
          <div className="kit-core__orb" data-kit={active}>
            <MethodIcon name={current.name} size={36} />
          </div>
          <p className="kit-core__name">{current.name}</p>
        </div>

        <article key={`method-pinned-${active}`} className="method-card method-card--open method-card--pinned method-card--luxury is-hot">
          <div className="method-card__top">
            <div className="method-card__identity">
              <p className="method-card__eyebrow">{content.methods.core}</p>
              <h3>{current.name}</h3>
            </div>
            <div className="method-card__meta">
              <span className="method-card__tag">{String(active + 1).padStart(2, "0")}</span>
              <span className="method-card__icon" aria-hidden="true">
                <MethodIcon name={current.name} />
              </span>
            </div>
          </div>

          <div className="method-nav" role="group" aria-label="מעבר בין שיטות">
            <button
              type="button"
              className="method-nav__btn"
              onClick={goPrev}
              disabled={!canPrev}
              aria-disabled={!canPrev}
            >
              <span className="method-nav__dir">הקודם</span>
              <span className="method-nav__sub">{prevItem ? prevItem.name : "תחילת הרשימה"}</span>
            </button>
            <p className="method-nav__count">
              <span>{active + 1}</span>
              <span className="method-nav__of">/{items.length}</span>
            </p>
            <button
              type="button"
              className="method-nav__btn method-nav__btn--next"
              onClick={goNext}
              disabled={!canNext}
              aria-disabled={!canNext}
            >
              <span className="method-nav__dir">הבא</span>
              <span className="method-nav__sub">{nextItem ? nextItem.name : "סוף הרשימה"}</span>
            </button>
          </div>

          <div className="method-card__scroll-shell">
            <div
              ref={pinnedScrollRef}
              className="method-card__scroll overflow-y-auto"
              data-method-scroll
            >
              <MethodSummary text={current.summary} />
              <MethodBody text={current.body} />
            </div>
          </div>
        </article>

        {/* Hidden track keeps optional sync hooks; UI uses the single luxury card like mobile. */}
        <div ref={trackRef} className="method-grid method-grid--snap method-grid--hidden" aria-hidden="true">
          {items.map((item, i) => (
            <article key={item.name} data-method-card={i} className="method-card">
              <h3>{item.name}</h3>
            </article>
          ))}
        </div>
        <div className="method-dots" role="tablist" aria-label={content.methods.title}>
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-label={item.name}
              aria-selected={i === active}
              className={`method-dots__dot ${i === active ? "is-on" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
