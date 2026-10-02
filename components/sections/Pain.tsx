import { content } from "@/content";

export function Pain() {
  return (
    <section id="about" className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <div className="mx-auto mb-14 max-w-3xl" data-reveal>
        <h2 className="text-h2">{content.pain.title}</h2>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {content.pain.cards.map((card, i) => (
          <article
            key={card.title}
            className="glass-card glass-deep tilt-card border-flow rounded-shell"
            data-reveal={i % 2 === 0 ? "diag" : "scale"}
            data-delay={i * 0.1}
          >
            <div className="media-zoom depth-pulse relative z-10">
              <img
                src={card.image}
                alt={card.alt}
                className="h-48 w-full object-cover"
                style={{ aspectRatio: "16 / 10" }}
              />
            </div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold leading-snug">{card.title}</h3>
              <p className="mt-4 text-body leading-relaxed text-ink-soft">{card.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
