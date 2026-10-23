"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const STEP_MS = 3000;

export function Why() {
  const items = content.why.items;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const pauseRef = useRef(false);
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(0);
  const angle = active * (360 / items.length);
  const current = items[active];
  const stepLabel = String(active + 1).padStart(2, "0");

  const setStep = (i: number) => {
    indexRef.current = i;
    setActive(i);
  };

  const pick = (i: number) => {
    pauseRef.current = true;
    setStep(i);
    const st = ScrollTrigger.getById("why-pin");
    if (st) {
      const y = st.start + ((i + 0.45) / items.length) * (st.end - st.start);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    window.setTimeout(() => {
      pauseRef.current = false;
    }, STEP_MS * 3);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || reduced) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const endDistance = Math.round(window.innerHeight * (2.2 + items.length * 0.45));

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "why-pin",
        trigger: section,
        start: "top top+=80",
        end: `+=${endDistance}`,
        pin,
        scrub: 1.25,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (pauseRef.current) return;
          const i = Math.min(items.length - 1, Math.floor(self.progress * items.length + 0.0001));
          if (i !== indexRef.current) setStep(i);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced, items.length]);

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    let tick: number | undefined;
    const mq = window.matchMedia("(max-width: 767px)");

    const setup = () => {
      if (tick) window.clearInterval(tick);
      tick = undefined;
      if (!mq.matches) return;
      tick = window.setInterval(() => {
        if (pauseRef.current || !section) return;
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 48;
        if (!inView) return;
        setStep((indexRef.current + 1) % items.length);
      }, STEP_MS);
    };

    setup();
    mq.addEventListener("change", setup);
    return () => {
      if (tick) window.clearInterval(tick);
      mq.removeEventListener("change", setup);
    };
  }, [reduced, items.length]);

  return (
    <section id="why" ref={sectionRef} className="why-radar mishpacha-canvas overflow-visible px-5 py-12 sm:px-6 lg:px-16 lg:py-[100px]">
      <div
        className="card-glass content-shield mx-auto mb-8 max-w-3xl rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 text-center shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8"
        data-reveal
      >
        <h2 className="section-title-rule text-h2">
          <AccentLead text={content.why.title} />
        </h2>
        <p className="mt-3 text-caption text-ink-soft">
          <span className="copy-accent font-semibold text-[#C5A059]">{content.why.core}</span>
        </p>
      </div>

      <div ref={pinRef} className="why-radar__pin">
        <div className="why-radar__stage">
          <div className="why-compass bg-transparent" style={{ ["--why-rot" as string]: `${reduced ? 0 : angle}deg` }}>
            <svg className="why-compass__svg" viewBox="0 0 320 320" aria-hidden="true">
              <defs>
                <linearGradient id="why-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#82152B" />
                  <stop offset="100%" stopColor="#C5A059" />
                </linearGradient>
              </defs>
              <g className="why-compass__spin why-compass__spin--a">
                <circle cx="160" cy="160" r="118" fill="none" stroke="url(#why-ring)" strokeWidth="1.2" strokeDasharray="6 10" opacity="0.45" />
              </g>
              <g className="why-compass__spin why-compass__spin--b">
                <circle cx="160" cy="160" r="92" fill="none" stroke="rgba(130,21,43,0.28)" strokeWidth="1.4" />
              </g>
              <circle cx="160" cy="160" r="54" fill="none" stroke="rgba(130,21,43,0.35)" strokeWidth="1.4" />
              <circle cx="160" cy="160" r="8" fill="#82152B" />
              <path className="why-compass__needle" d="M160 86 L168 160 L160 148 L152 160 Z" fill="#C5A059" />
              {items.map((_, i) => {
                const stepAngle = (360 / items.length) * i;
                const a = ((stepAngle - 90) * Math.PI) / 180;
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
            <article
              key={active}
              className="card-glass why-depth why-depth--active is-on rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8"
            >
              <span className="why-depth__n">{stepLabel}</span>
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
      </div>
    </section>
  );
}
