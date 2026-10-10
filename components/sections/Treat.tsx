"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

const { items, labels } = content.treat;
const steps = ["now", "how", "result"] as const;

export function Treat() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLSpanElement>(null);
  const touched = useRef(false);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const go = (i: number, focusTab = false) => {
    const next = (i + items.length) % items.length;
    if (next === active) return;
    touched.current = true;
    setDir(i > active ? "next" : "prev");
    setActive(next);
    if (focusTab) {
      window.requestAnimationFrame(() => {
        trackRef.current?.querySelector<HTMLElement>(`[data-tab="${next}"]`)?.focus();
      });
    }
  };

  useLayoutEffect(() => {
    const place = (smooth = false) => {
      const tab = trackRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
      const ink = inkRef.current;
      if (tab && ink) {
        ink.style.width = `${tab.offsetWidth}px`;
        ink.style.transform = `translateX(${tab.offsetLeft}px)`;
      }
      const strip = trackRef.current?.parentElement;
      if (tab && strip && strip.scrollWidth > strip.clientWidth) {
        const t = tab.getBoundingClientRect();
        const s = strip.getBoundingClientRect();
        strip.scrollBy({
          left: t.left + t.width / 2 - (s.left + s.width / 2),
          behavior: smooth ? "smooth" : "auto",
        });
      }
      const stage = stageRef.current;
      if (stage) stage.style.setProperty("--stage-w", `${stage.clientWidth}px`);
    };
    const onResize = () => place();
    place(touched.current);
    document.fonts?.ready.then(onResize);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const onTabKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = {
      ArrowLeft: active + 1,
      ArrowRight: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    go(map[e.key], true);
  };

  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const untilt = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const onSwipeStart = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };

  const onSwipeEnd = (e: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    go(active + (dx > 0 ? 1 : -1));
  };

  return (
    <section id="treat" className="treat-section px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.treat.title} />
        </h2>
        <p className="mt-4 text-body text-ink-soft">{content.treat.lead}</p>
      </div>

      <div className="treat-tabs" data-reveal>
        <div
          ref={trackRef}
          className="treat-tabs__track"
          role="tablist"
          aria-label={content.treat.title}
          onKeyDown={onTabKeys}
        >
          <span ref={inkRef} className="treat-tabs__ink" aria-hidden="true" />
          {items.map((item, i) => (
            <button
              key={item.n}
              type="button"
              role="tab"
              id={`treat-tab-${i}`}
              data-tab={i}
              aria-selected={active === i}
              aria-controls={`treat-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              className={`treat-tab ${active === i ? "is-active" : ""}`}
              onClick={() => go(i)}
            >
              <span className="treat-tab__n">{item.n}</span>
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        className="treat-stage mx-auto"
        data-dir={dir}
        style={{ "--i": active } as CSSProperties}
        onPointerDown={onSwipeStart}
        onPointerUp={onSwipeEnd}
        onPointerCancel={() => (swipe.current = null)}
      >
        <span className="treat-orb treat-orb--a" aria-hidden="true" />
        <span className="treat-orb treat-orb--b" aria-hidden="true" />

        {items.map((item, i) => {
          const on = active === i;
          return (
            <article
              key={item.n}
              id={`treat-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`treat-tab-${i}`}
              className={`treat-card ${on ? "is-active" : ""}`}
              onPointerMove={on ? tilt : undefined}
              onPointerLeave={untilt}
            >
              <span className="treat-card__spot" aria-hidden="true" />
              <span className="treat-card__ghost" aria-hidden="true">
                {item.n}
              </span>

              <button
                type="button"
                className="treat-card__sliver"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => go(i)}
              >
                <span className="treat-card__n">{item.n}</span>
                <span className="treat-card__sliver-title">{item.title}</span>
              </button>

              <div className="treat-card__body" inert={!on}>
                <header className="treat-card__head">
                  <span className="treat-card__n">{item.n}</span>
                  <div>
                    <h3 className="treat-card__title">{item.title}</h3>
                    <p className="treat-card__tag">{item.tag}</p>
                  </div>
                </header>
                <ol className="treat-flow">
                  {steps.map((key, d) => (
                    <li
                      key={key}
                      className={`treat-step treat-step--${key}`}
                      style={{ "--d": d } as CSSProperties}
                    >
                      <span className="treat-step__label">{labels[key]}</span>
                      <p>{item[key]}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          );
        })}
      </div>

      <div className="treat-pager lg:hidden">
        <button type="button" className="treat-pager__btn" aria-label={content.treat.prev} onClick={() => go(active - 1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <div className="treat-pager__dots" aria-hidden="true">
          {items.map((item, i) => (
            <span key={item.n} className={active === i ? "is-on" : ""} />
          ))}
        </div>
        <button type="button" className="treat-pager__btn" aria-label={content.treat.next} onClick={() => go(active + 1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
