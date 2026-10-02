import { content } from "@/content";

export function Deliverables() {
  return (
    <section id="services" className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <div className="mx-auto mb-16 max-w-3xl text-center" data-reveal>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">מסלולי הטיפול</p>
        <h2 className="text-h2">{content.deliverables.title}</h2>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {content.deliverables.cards.map((card, i) => (
          <article
            key={card.title}
            className="glass-card glass-deep tilt-card border-flow rounded-shell"
            data-reveal="scale"
            data-delay={i * 0.12}
          >
            <div className="media-zoom relative z-10">
              <img
                src={card.image}
                alt={card.alt}
                className="h-52 w-full object-cover"
                style={{ aspectRatio: "4 / 3" }}
              />
            </div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-ink">{card.title}</h3>
              <p className="mt-3 text-body text-ink-soft">{card.result}</p>
              <p className="mt-4 text-caption text-accent">{card.part}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-measure text-center text-lead text-ink-soft" data-reveal>
        {content.deliverables.extra.result}
        <span className="mt-2 block text-caption text-accent">({content.deliverables.extra.part})</span>
      </p>
    </section>
  );
}
