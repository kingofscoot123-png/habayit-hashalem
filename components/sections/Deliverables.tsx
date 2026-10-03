import { content } from "@/content";
import { RootScene } from "@/components/RootScene";

export function Deliverables() {
  return (
    <section id="services" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[140px]" data-section>
      <div className="mx-auto mb-14 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">{content.deliverables.title}</h2>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {content.deliverables.cards.map((card, i) => (
          <article
            key={card.title}
            className="glass-card glass-deep rounded-shell"
            data-reveal="scale"
            data-delay={i * 0.12}
          >
            <div className="relative z-10 overflow-hidden rounded-t-shell">
              {"immersive" in card && card.immersive ? (
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
        ))}
      </div>
    </section>
  );
}
