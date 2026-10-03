import { content } from "@/content";

export function Failed() {
  return (
    <section id="tried" className="depth-stage px-5 py-16 sm:px-6 lg:px-16 lg:py-[120px]">
      <div className="mx-auto mb-10 max-w-3xl" data-reveal>
        <h2 className="text-h2">
          {content.failed.title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} data-reveal-word className="inline-block pe-2">
              {word}
            </span>
          ))}
        </h2>
      </div>
      <div className="mx-auto grid max-w-5xl gap-7">
        {content.failed.cards.map((card) => (
          <article key={card.title} data-depth className="story-shot">
            <div className="media-zoom story-shot__media">
              <img src={card.image} alt={card.alt} />
            </div>
            <div className="story-shot__copy">
              <h3 className="text-2xl font-light tracking-wide">{card.title}</h3>
              <p className="mt-3 text-body text-ink-soft">{card.hint}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-3xl text-h2 font-light" data-reveal>
        {content.failed.remain}
      </p>
    </section>
  );
}
