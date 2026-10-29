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

function MethodBody({ text }: { text: string }) {
  const parts = text.split("\n\n").filter(Boolean);
  return (
    <div className="method-card__body">
      {parts.map((part, idx) => (
        <p key={idx} className="methods-copy-soft">
          <HighlightCopy text={part} />
        </p>
      ))}
    </div>
  );
}

export function Methods() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const pinnedScrollRef = useRef<HTMLDivElement>(null);
  const deskDetailScrollRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(false);
  const indexRef = useRef(0);
  const pinActiveRef = useRef(false);
  const clampingRef = useRef(false);
  const releaseDownRef = useRef(0);
  const releaseUpRef = useRef(0);
  const RELEASE_PX = 180;
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);
  const [paneHint, setPaneHint] = useState<"more" | "next" | "done">("more");
  const items = content.methods.items;
  const current = items[active];
  const left = items.slice(0, 4);
  const right = items.slice(4);

  const readPane = () => {
    const el = pinnedScrollRef.current;
    if (!el) return { el: null as HTMLDivElement | null, atTop: true, atBottom: true, hasOverflow: false };
    const hasOverflow = el.scrollHeight > el.clientHeight + 2;
    const atTop = el.scrollTop <= 1;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    return { el, atTop, atBottom, hasOverflow };
  };

  const refreshPaneHint = () => {
    const { atBottom, hasOverflow } = readPane();
    if (!hasOverflow || atBottom) setPaneHint(active >= items.length - 1 ? "done" : "next");
    else setPaneHint("more");
  };

  const lockPinToCurrent = (self: ScrollTrigger) => {
    if (clampingRef.current) return;
    clampingRef.current = true;
    const locked = (indexRef.current + 0.42) / items.length;
    self.scroll(self.start + locked * (self.end - self.start));
    requestAnimationFrame(() => {
      clampingRef.current = false;
    });
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
        if (pauseRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = Number((visible.target as HTMLElement).dataset.methodCard);
        if (!Number.isNaN(i)) {
          indexRef.current = i;
          setActive(i);
        }
      },
      { root: track, threshold: 0.55 },
    );

    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  // Reset inner scroll + release budgets when the active method changes.
  useEffect(() => {
    const pane = pinnedScrollRef.current;
    if (pane) pane.scrollTop = 0;
    const desk = deskDetailScrollRef.current;
    if (desk) desk.scrollTop = 0;
    releaseDownRef.current = 0;
    releaseUpRef.current = 0;
    requestAnimationFrame(refreshPaneHint);
  }, [active]);

  /**
   * Prefer reading the card text. Absorb extra scroll at the edges so a small
   * flick after reading does not jump methods; only a deliberate continue does.
   */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const applyDelta = (delta: number) => {
      if (!pinActiveRef.current || delta === 0) return false;
      const { el, atTop, atBottom, hasOverflow } = readPane();
      if (!el) return false;

      if (delta > 0) {
        releaseUpRef.current = 0;
        if (hasOverflow && !atBottom) {
          el.scrollTop += delta;
          releaseDownRef.current = 0;
          refreshPaneHint();
          return true;
        }
        releaseDownRef.current += delta;
        refreshPaneHint();
        return releaseDownRef.current < RELEASE_PX;
      }

      releaseDownRef.current = 0;
      if (hasOverflow && !atTop) {
        el.scrollTop += delta;
        releaseUpRef.current = 0;
        refreshPaneHint();
        return true;
      }
      releaseUpRef.current += -delta;
      refreshPaneHint();
      return releaseUpRef.current < RELEASE_PX;
    };

    const onWheel = (e: WheelEvent) => {
      if (!pinActiveRef.current) return;
      if (applyDelta(e.deltaY)) e.preventDefault();
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!pinActiveRef.current) return;
      const y = e.touches[0]?.clientY ?? touchY;
      const delta = touchY - y;
      touchY = y;
      if (applyDelta(delta)) e.preventDefault();
    };

    const onPaneScroll = () => refreshPaneHint();
    pinnedScrollRef.current?.addEventListener("scroll", onPaneScroll, { passive: true });

    pin.addEventListener("wheel", onWheel, { passive: false });
    pin.addEventListener("touchstart", onTouchStart, { passive: true });
    pin.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      pinnedScrollRef.current?.removeEventListener("scroll", onPaneScroll);
      pin.removeEventListener("wheel", onWheel);
      pin.removeEventListener("touchstart", onTouchStart);
      pin.removeEventListener("touchmove", onTouchMove);
    };
  }, [active, items.length]);

  useLayoutEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "methods-pin",
        trigger: section,
        start: "top top+=64",
        end: () => `+=${Math.round(window.innerHeight * (2.2 + items.length * 0.58))}`,
        pin,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          pinActiveRef.current = self.isActive;
          if (!self.isActive) {
            releaseDownRef.current = 0;
            releaseUpRef.current = 0;
          }
        },
        onUpdate: (self) => {
          pinActiveRef.current = self.isActive;
          if (pauseRef.current || clampingRef.current) return;

          const target = Math.min(items.length - 1, Math.floor(self.progress * items.length + 0.0001));
          const currentIdx = indexRef.current;
          if (target === currentIdx) return;

          const { atTop, atBottom, hasOverflow } = readPane();

          if (target > currentIdx) {
            const finishedReading = !hasOverflow || atBottom;
            if (!finishedReading || releaseDownRef.current < RELEASE_PX) {
              lockPinToCurrent(self);
              return;
            }
          } else {
            const finishedReading = !hasOverflow || atTop;
            if (!finishedReading || releaseUpRef.current < RELEASE_PX) {
              lockPinToCurrent(self);
              return;
            }
          }

          releaseDownRef.current = 0;
          releaseUpRef.current = 0;
          indexRef.current = target;
          setActive(target);
        },
      });
    }, section);

    return () => {
      pinActiveRef.current = false;
      ctx.revert();
    };
  }, [reduced, items.length]);

  const reveal = (i: number) => {
    setActive(i);
    setOpen((currentOpen) => (currentOpen === i ? -1 : i));
  };

  const goTo = (i: number) => {
    pauseRef.current = true;
    releaseDownRef.current = RELEASE_PX;
    releaseUpRef.current = RELEASE_PX;
    indexRef.current = i;
    setActive(i);
    setOpen(i);
    scrollToCard(i);
    const st = ScrollTrigger.getById("methods-pin");
    if (st) {
      const y = st.start + ((i + 0.45) / items.length) * (st.end - st.start);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    window.setTimeout(() => {
      pauseRef.current = false;
    }, 6000);
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

        <article key={`method-pinned-${active}`} className="method-card method-card--open method-card--pinned is-hot">
          <span className="method-card__tag">{String(active + 1).padStart(2, "0")}</span>
          <span className="method-card__icon" aria-hidden="true">
            <MethodIcon name={current.name} />
          </span>
          <h3>{current.name}</h3>
          <div className="method-card__scroll-shell">
            <div
              ref={pinnedScrollRef}
              className="method-card__scroll max-h-[50vh] overflow-y-auto"
              data-method-scroll
            >
              <MethodSummary text={current.summary} />
              <MethodBody text={current.body} />
            </div>
            {paneHint === "more" ? (
              <p className="method-card__scroll-hint" aria-hidden="true">
                גללו בתוך הכרטיס להמשך ההסבר
              </p>
            ) : null}
            {paneHint === "next" ? (
              <p className="method-card__scroll-hint method-card__scroll-hint--next" aria-hidden="true">
                המשיכו לגלול לשיטה הבאה
              </p>
            ) : null}
          </div>
        </article>

        <div className="kit-desk">
          <div className="kit-desk__col">
            {left.map((item, i) => (
              <article
                key={item.name}
                className={`method-card kit-card ${active === i ? "is-hot" : ""} ${open === i ? "is-open" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => reveal(i)}
              >
                <span className="method-card__tag">{String(i + 1).padStart(2, "0")}</span>
                <span className="method-card__icon">
                  <MethodIcon name={item.name} />
                </span>
                <h3>{item.name}</h3>
                <div className="method-card__scroll max-h-[50vh] overflow-y-auto">
                  <MethodSummary text={item.summary} />
                  <MethodBody text={item.body} />
                </div>
              </article>
            ))}
          </div>
          <div className="kit-core kit-core--desk">
            <div className="kit-core__glow" />
            <div className="kit-core__orb" data-kit={active}>
              <MethodIcon name={current.name} size={42} />
            </div>
            <p className="kit-core__kicker">{content.methods.core}</p>
            <p className="kit-core__name">{current.name}</p>
            <div ref={deskDetailScrollRef} className="kit-core__detail method-card__scroll max-h-[50vh] overflow-y-auto">
              <MethodSummary text={current.summary} />
              <MethodBody text={current.body} />
            </div>
          </div>
          <div className="kit-desk__col">
            {right.map((item, i) => {
              const idx = i + 4;
              return (
                <article
                  key={item.name}
                  className={`method-card kit-card ${active === idx ? "is-hot" : ""} ${open === idx ? "is-open" : ""}`}
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  onClick={() => reveal(idx)}
                >
                  <span className="method-card__tag">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="method-card__icon">
                    <MethodIcon name={item.name} />
                  </span>
                  <h3>{item.name}</h3>
                  <div className="method-card__scroll max-h-[50vh] overflow-y-auto">
                    <MethodSummary text={item.summary} />
                    <MethodBody text={item.body} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div ref={trackRef} className="method-grid method-grid--snap mx-auto max-w-5xl">
          {items.map((item, i) => (
            <article
              key={item.name}
              className={`method-card method-card--open ${active === i ? "is-hot" : ""} ${open === i ? "is-open" : ""}`}
              data-method-card={i}
              onClick={() => reveal(i)}
            >
              <span className="method-card__tag">{String(i + 1).padStart(2, "0")}</span>
              <span className="method-card__icon" aria-hidden="true">
                <MethodIcon name={item.name} />
              </span>
              <h3>{item.name}</h3>
              <div className="method-card__scroll method-card__scroll--snap max-h-[50vh] overflow-y-auto">
                <MethodSummary text={item.summary} />
                <MethodBody text={item.body} />
              </div>
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
