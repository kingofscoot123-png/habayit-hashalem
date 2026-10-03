import { content } from "@/content";
import { SwipeDeck } from "@/components/SwipeDeck";

export function Journey() {
  return (
    <section id="process" className="px-0 py-16 sm:py-20 lg:px-16 lg:py-[140px]">
      <div className="mx-auto mb-8 max-w-3xl px-5 text-center sm:px-6 lg:mb-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
          {content.journey.kicker}
        </p>
        <h2 className="text-h2">{content.journey.title}</h2>
      </div>
      <SwipeDeck label={content.journey.title} variant="journey">
        {content.journey.steps.map((step) => (
          <article key={step.n} className="journey-card glass-card glass-deep tilt-card">
            <div className="media-zoom journey-card__media">
              <img src={step.image} alt={step.alt} />
            </div>
            <div className="journey-card__body">
              <p className="holo-card__n">{step.n}</p>
              <h3 className="text-2xl font-light tracking-wide sm:text-[1.7rem]">{step.title}</h3>
              <p className="mt-3 text-body text-ink-soft">{step.body}</p>
            </div>
          </article>
        ))}
      </SwipeDeck>
    </section>
  );
}
