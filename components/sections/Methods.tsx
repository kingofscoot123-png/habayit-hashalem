"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
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

/** Prefer inner card scroll over page pin scrub while copy still scrolls. */
function useMethodPaneScroll(containerRef: RefObject<HTMLElement | null>, activeIndex: number) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = 0;

    const canScroll = () => el.scrollHeight > el.clientHeight + 2;

    const onWheel = (e: WheelEvent) => {
      if (!canScroll()) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!canScroll()) return;
      const y = e.touches[0]?.clientY ?? touchY;
      const delta = touchY - y;
      touchY = y;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [containerRef, activeIndex]);
}

export function Methods() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const pinnedScrollRef = useRef<HTMLDivElement>(null);
  const deskDetailScrollRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(false);
  const indexRef = useRef(0);
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);
  const items = content.methods.items;
  const current = items[active];
  const left = items.slice(0, 4);
  const right = items.slice(4);

  useMethodPaneScroll(pinnedScrollRef, active);
  useMethodPaneScroll(deskDetailScrollRef, active);

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
        end: () => `+=${Math.round(window.innerHeight * (1.85 + items.length * 0.48))}`,
        pin,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(items.length - 1, Math.floor(self.progress * items.length + 0.0001));
          if (i === indexRef.current) return;
          indexRef.current = i;
          setActive(i);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced, items.length]);

  const reveal = (i: number) => {
    setActive(i);
    setOpen((currentOpen) => (currentOpen === i ? -1 : i));
  };

  const goTo = (i: number) => {
    pauseRef.current = true;
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
          className="card-glass content-shield mx-auto mb-8 max-w-3xl rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 text-center shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8"
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
          <div ref={pinnedScrollRef} className="method-card__scroll max-h-[60vh] overflow-y-auto">
            <MethodSummary text={current.summary} />
            <MethodBody text={current.body} />
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
                <div className="method-card__scroll max-h-[60vh] overflow-y-auto">
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
            <div ref={deskDetailScrollRef} className="kit-core__detail method-card__scroll max-h-[60vh] overflow-y-auto">
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
                  <div className="method-card__scroll max-h-[60vh] overflow-y-auto">
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
              <div className="method-card__scroll method-card__scroll--snap max-h-[60vh] overflow-y-auto">
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
