import { content } from "@/content";

export function Failed() {
  return (
    <section id="tried" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[120px]" data-section>
      <div className="mx-auto mb-10 max-w-3xl" data-reveal>
        <h2 className="text-h2">
          {content.failed.title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} data-reveal-word className="inline-block pe-2">
              {word}
            </span>
          ))}
        </h2>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        {content.failed.cards.map((card, i) => (
          <article
            key={card.title}
            className="clinic-card rounded-shell px-7 py-8"
            data-reveal
            data-delay={i * 0.06}
          >
            <p className="clinic-n">{card.n}</p>
            <h3 className="relative z-10 text-2xl font-light tracking-wide">{card.title}</h3>
            <p className="relative z-10 mt-4 text-body text-ink-soft">{card.hint}</p>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-3xl text-h2 font-light" data-reveal>
        {content.failed.remain}
      </p>
    </section>
  );
}
