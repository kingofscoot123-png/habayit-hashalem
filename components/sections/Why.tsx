"use client";

import { useEffect, useRef, useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

function useCount(target: number, play: boolean) {
  const [n, setN] = useState(target);
  useEffect(() => {
    if (!play) {
      setN(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 520);
      setN(Math.max(1, Math.round(p * target)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, target]);
  return String(n).padStart(2, "0");
}

export function Why() {
  const items = content.why.items;
  const sectionRef = useRef<HTMLElement>(null);
  const snapRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(false);
  const mountedRef = useRef(false);
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(0);
  const count = useCount(active + 1, true);
  const angle = active * 60;
  const current = items[active];

  const pick = (i: number) => {
    pauseRef.current = true;
    setActive(i);
    window.setTimeout(() => {
      pauseRef.current = false;
    }, 12000);
  };

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;
    mountedRef.current = true;

    const tick = window.setInterval(() => {
      if (!mountedRef.current) return;
      if (pauseRef.current) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 80 || rect.top > window.innerHeight - 80) return;
      setActive((v) => (v + 1) % items.length);
    }, 3000);

    return () => {
      mountedRef.current = false;
      window.clearInterval(tick);
    };
  }, [reduced, items.length]);

  useEffect(() => {
    const snap = snapRef.current;
    if (!snap) return;
    const slide = snap.querySelector<HTMLElement>(`[data-why-slide="${active}"]`);
    slide?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [active, reduced]);

  useEffect(() => {
    const snap = snapRef.current;
    if (!snap) return;

    const slides = Array.from(snap.querySelectorAll<HTMLElement>("[data-why-slide]"));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = Number((visible.target as HTMLElement).dataset.whySlide);
        if (!Number.isNaN(i)) setActive(i);
      },
      { root: snap, threshold: 0.6 },
    );

    slides.forEach((slide) => io.observe(slide));
    return () => io.disconnect();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="why-radar px-5 py-12 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.why.title} />
        </h2>
        <p className="mt-3 text-caption text-ink-soft">{content.why.core}</p>
      </div>

      <div className="why-radar__stage">
        <div className="why-compass" style={{ ["--why-rot" as string]: `${reduced ? 0 : angle}deg` }}>
          <div className="why-compass__halo" />
          <svg className="why-compass__svg" viewBox="0 0 320 320" aria-hidden="true">
            <defs>
              <linearGradient id="why-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2D4A3E" />
                <stop offset="100%" stopColor="#1E3A2B" />
              </linearGradient>
            </defs>
            <g className="why-compass__spin why-compass__spin--a">
              <circle cx="160" cy="160" r="118" fill="none" stroke="url(#why-ring)" strokeWidth="1.2" strokeDasharray="6 10" opacity="0.5" />
            </g>
            <g className="why-compass__spin why-compass__spin--b">
              <circle cx="160" cy="160" r="92" fill="none" stroke="rgba(30,58,43,0.35)" strokeWidth="1.4" />
            </g>
            <circle cx="160" cy="160" r="54" fill="rgba(255,253,248,0.78)" stroke="rgba(30,58,43,0.45)" strokeWidth="1.6" />
            <circle cx="160" cy="160" r="8" fill="#2D4A3E" />
            <path className="why-compass__needle" d="M160 86 L168 160 L160 148 L152 160 Z" fill="#7C4A2D" />
            {items.map((_, i) => {
              const a = ((i * 60 - 90) * Math.PI) / 180;
              const x = 160 + Math.cos(a) * 118;
              const y = 160 + Math.sin(a) * 118;
              return (
                <g key={i}>
                  <line className={`why-laser ${i === active ? "is-on" : ""}`} x1="160" y1="160" x2={x} y2={y} />
                  <circle className={`why-node ${i === active ? "is-on" : ""}`} cx={x} cy={y} r="7" />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="why-radar__copy">
          <article key={active} className="why-depth is-on">
            <span className="why-depth__n">{count}</span>
            <h3>{current.title}</h3>
            <p>{current.body}</p>
          </article>
          <div className="why-radar__picks" role="tablist" aria-label={content.why.title}>
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`why-radar__pick ${i === active ? "is-on" : ""}`}
                onClick={() => pick(i)}
              >
                {String(i + 1).padStart(2, "0")} {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={snapRef} className="why-snap" role="region" aria-label={content.why.title}>
        {items.map((item, i) => (
          <article
            key={item.title}
            data-why-slide={i}
            className={`why-depth why-depth--slide ${i === active ? "is-on" : ""}`}
          >
            <span className="why-depth__n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className="why-mobile-dots method-dots" role="tablist" aria-label={content.why.title}>
        {items.map((item, i) => (
          <button
            key={item.title}
            type="button"
            aria-label={item.title}
            className={`method-dots__dot ${i === active ? "is-on" : ""}`}
            onClick={() => pick(i)}
          />
        ))}
      </div>
    </section>
  );
}
