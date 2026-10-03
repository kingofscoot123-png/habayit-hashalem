"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

type Variant = "cards" | "certs" | "journey";

export function SwipeDeck({
  children,
  label,
  variant = "cards",
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  variant?: Variant;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slides = Children.toArray(children);

  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    if (!items.length) return;
    const mid = track.getBoundingClientRect().left + track.clientWidth / 2;
    let best = 0;
    let dist = Number.POSITIVE_INFINITY;
    items.forEach((item, i) => {
      const r = item.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncActive();
    track.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      track.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [syncActive, slides.length]);

  const go = (index: number) => {
    const track = trackRef.current;
    const item = track?.children[index] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className={`swipe-deck ${className}`}>
      <div
        ref={trackRef}
        className={`swipe-track swipe-track--${variant}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`swipe-slide swipe-slide--${variant}${i === active ? " is-active" : ""}`}
            data-active={i === active ? "true" : "false"}
            onPointerMove={(e) => {
              const el = e.currentTarget;
              const r = el.getBoundingClientRect();
              const x = e.clientX - r.left;
              const y = e.clientY - r.top;
              el.style.setProperty("--sx", `${x}px`);
              el.style.setProperty("--sy", `${y}px`);
              const inner = el.firstElementChild as HTMLElement | null;
              if (inner) {
                inner.style.setProperty("--x", `${x}px`);
                inner.style.setProperty("--y", `${y}px`);
                inner.style.setProperty("--hx", `${x}px`);
                inner.style.setProperty("--hy", `${y}px`);
              }
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      {slides.length > 1 ? (
        <div className="swipe-dots" role="tablist" aria-label={`${label} — ניווט`}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`כרטיס ${i + 1} מתוך ${slides.length}`}
              className={`swipe-dot${i === active ? " is-on" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
