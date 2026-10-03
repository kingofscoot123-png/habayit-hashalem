import { content } from "@/content";
import { SwipeDeck } from "@/components/SwipeDeck";
import { BreakSwitch } from "@/components/BreakSwitch";

function Card({
  card,
  i,
}: {
  card: (typeof content.pain.cards)[number];
  i: number;
}) {
  return (
    <article
      className="glass-card glass-deep tilt-card h-full rounded-shell"
      data-reveal={i % 2 === 0 ? "diag" : "scale"}
      data-delay={i * 0.1}
      data-fx="rise"
    >
      <div className="media-zoom relative z-10">
        <img
          src={card.image}
          alt={card.alt}
          className="h-52 w-full object-cover"
          style={{ aspectRatio: "16 / 10" }}
        />
      </div>
      <div className="relative z-10 px-7 py-6">
        <h3 className="text-xl font-light tracking-wide">{card.title}</h3>
      </div>
    </article>
  );
}

function cards(prefix: string) {
  return content.pain.cards.map((card, i) => <Card key={`${prefix}-${card.title}`} card={card} i={i} />);
}

export function Pain() {
  return (
    <section id="about" className="px-0 py-16 lg:px-16 lg:py-[140px]" data-section>
      <div className="mx-auto mb-10 max-w-3xl px-5 sm:px-6 lg:mb-12" data-reveal>
        <h2 className="text-h2">{content.pain.title}</h2>
      </div>
      <BreakSwitch
        mobile={<SwipeDeck label={content.pain.title}>{cards("m")}</SwipeDeck>}
        desktop={<div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-5">{cards("d")}</div>}
      />
    </section>
  );
}
