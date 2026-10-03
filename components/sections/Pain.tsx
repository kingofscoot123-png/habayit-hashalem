import { content } from "@/content";

export function Pain() {
  return (
    <section id="about" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[140px]" data-section>
      <div className="mx-auto mb-12 max-w-3xl" data-reveal>
        <h2 className="text-h2">{content.pain.title}</h2>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {content.pain.cards.map((card, i) => (
          <article
            key={card.title}
            className="glass-card glass-deep tilt-card rounded-shell"
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
        ))}
      </div>
    </section>
  );
}
