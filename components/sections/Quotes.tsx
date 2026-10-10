import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Quotes() {
  return (
    <section id="quotes" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-10 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.quotes.title} />
        </h2>
        <p className="mt-3 text-caption text-ink-soft">{content.quotes.hint}</p>
      </div>
      <div className="quote-grid mx-auto max-w-5xl" data-stagger>
        {content.quotes.items.map((item) => (
          <figure key={item.quote} className="quote-card">
            <blockquote className="quote-card__text">“{item.quote}”</blockquote>
            <figcaption className="quote-card__who">
              {item.name ? <span className="quote-card__name">{item.name}</span> : null}
              <span>{item.who}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
