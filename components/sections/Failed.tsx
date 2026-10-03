"use client";

import { useRef } from "react";
import { content } from "@/content";
import { SwipeDeck } from "@/components/SwipeDeck";
import { BreakSwitch } from "@/components/BreakSwitch";

function cards(prefix: string) {
  return content.failed.cards.map((card, i) => (
    <HoloCard key={`${prefix}-${card.title}`} card={card} delay={i * 0.08} />
  ));
}

export function Failed() {
  return (
    <section className="px-0 py-16 sm:px-0 lg:px-16 lg:py-[140px]" data-section>
      <div className="mx-auto mb-10 max-w-3xl px-5 sm:px-6 lg:mb-12" data-reveal data-fx="focus">
        <h2 className="text-h2">{content.failed.title}</h2>
      </div>
      <BreakSwitch
        mobile={<SwipeDeck label={content.failed.title}>{cards("m")}</SwipeDeck>}
        desktop={<div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5">{cards("d")}</div>}
      />
      <p className="mx-auto mt-10 max-w-3xl px-5 text-h2 font-light sm:px-6 lg:mt-14" data-reveal="blur" data-fx="depth">
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
      className="holo-card tilt-card h-full"
      data-reveal="scale"
      data-delay={delay}
      data-fx="rise"
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--hx", `${e.clientX - r.left}px`);
        el.style.setProperty("--hy", `${e.clientY - r.top}px`);
        const mobile = window.matchMedia("(max-width: 1023px)").matches;
        const amount = mobile ? 6 : 16;
        el.style.transform = `perspective(1200px) rotateY(${px * amount}deg) rotateX(${-py * (amount * 0.75)}deg) translateZ(${mobile ? 6 : 12}px)`;
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
