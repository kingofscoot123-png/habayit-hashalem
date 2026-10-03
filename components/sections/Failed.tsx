"use client";

import { useRef } from "react";
import { content } from "@/content";

export function Failed() {
  return (
    <section className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[140px]" data-section>
      <div className="mx-auto mb-12 max-w-3xl" data-reveal data-fx="focus">
        <h2 className="text-h2">{content.failed.title}</h2>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {content.failed.cards.map((card, i) => (
          <HoloCard key={card.title} card={card} delay={i * 0.08} />
        ))}
      </div>
      <p className="mx-auto mt-14 max-w-3xl text-h2 font-light" data-reveal="blur" data-fx="depth">
        {content.failed.remain}
      </p>
    </section>
  );
}

function HoloCard({
  card,
  delay,
}: {
  card: (typeof content.failed.cards)[number];
  delay: number;
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <article
      ref={ref}
      className="holo-card tilt-card"
      data-reveal="scale"
      data-delay={delay}
      data-fx="rise"
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || window.matchMedia("(max-width: 1023px)").matches) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--hx", `${e.clientX - r.left}px`);
        el.style.setProperty("--hy", `${e.clientY - r.top}px`);
        el.style.transform = `perspective(1200px) rotateY(${px * 16}deg) rotateX(${-py * 12}deg) translateZ(12px)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "";
      }}
    >
      <span className="holo-card__foil" aria-hidden="true" />
      <span className="holo-card__glow" aria-hidden="true" />
      <p className="holo-card__n">{card.n}</p>
      <h3 className="relative z-10 text-2xl font-light tracking-wide">{card.title}</h3>
      <p className="relative z-10 mt-4 text-body text-ink-soft">{card.hint}</p>
    </article>
  );
}
