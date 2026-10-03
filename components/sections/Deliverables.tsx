import { content } from "@/content";
import { RootScene } from "@/components/RootScene";
import { SwipeDeck } from "@/components/SwipeDeck";
import { BreakSwitch } from "@/components/BreakSwitch";

function Card({
  card,
  i,
  live3d,
}: {
  card: (typeof content.deliverables.cards)[number];
  i: number;
  live3d?: boolean;
}) {
  return (
    <article className="glass-card glass-deep h-full rounded-shell" data-reveal="scale" data-delay={i * 0.12}>
      <div className="relative z-10 overflow-hidden rounded-t-shell">
        {live3d && "immersive" in card && card.immersive ? (
          <RootScene src={card.image} alt={card.alt} />
        ) : (
          <div className="media-zoom">
            <img
              src={card.image}
              alt={card.alt}
              className="h-52 w-full object-cover"
              style={{ aspectRatio: "4 / 3" }}
            />
          </div>
        )}
      </div>
      <div className="relative z-10 px-7 py-6">
        <h3 className="text-xl font-light tracking-wide text-ink">{card.title}</h3>
        <p className="mt-2 text-body text-ink-soft">{card.result}</p>
      </div>
    </article>
  );
}

function cards(prefix: string, live3d = false) {
  return content.deliverables.cards.map((card, i) => (
    <Card key={`${prefix}-${card.title}`} card={card} i={i} live3d={live3d} />
  ));
}

export function Deliverables() {
  return (
    <section id="services" className="px-0 py-16 lg:px-16 lg:py-[140px]" data-section>
      <div className="mx-auto mb-10 max-w-3xl px-5 text-center sm:px-6 lg:mb-14" data-reveal>
        <h2 className="text-h2">{content.deliverables.title}</h2>
      </div>
      <BreakSwitch
        mobile={<SwipeDeck label={content.deliverables.title}>{cards("m")}</SwipeDeck>}
        desktop={<div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-5">{cards("d", true)}</div>}
      />
    </section>
  );
}
