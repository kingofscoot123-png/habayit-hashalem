"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/content";

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) {
      setN(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setN(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return n;
}

export function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRun(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = content.impact.items;
  const c0 = useCountUp(items[0].value, run);
  const c1 = useCountUp(items[1].value, run);
  const c2 = useCountUp(items[2].value, run);
  const counts = [c0, c1, c2];

  return (
    <section className="impact-bar bg-[#82152B] px-5 py-10 text-[#FAF8F5] sm:px-6 lg:px-16" aria-label={content.impact.title}>
      <div ref={ref} className="impact-bar__inner mx-auto max-w-5xl">
        <div className="impact-bar__live">
          <span className="impact-bar__pill">נתוני אמון בלייב</span>
        </div>
        <p className="impact-bar__title">{content.impact.title}</p>
        <div className="impact-bar__grid">
          {items.map((item, i) => (
            <div key={item.label} className="impact-bar__cell">
              <p className="impact-bar__num">
                {counts[i]}
                {item.suffix}
              </p>
              <p className="impact-bar__label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
