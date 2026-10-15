import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Quotes() {
  return (
    <section id="quotes" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-12 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.quotes.title} />
        </h2>
        <p className="mt-3 text-body text-ink-soft">{content.quotes.hint}</p>
      </div>
      <div className="mx-auto max-w-5xl space-y-12">
        {content.quotes.groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-5 text-center text-lg font-medium text-[var(--hs-olive)]">{group.title}</h3>
            <div className="quote-grid" data-stagger>
              {group.items.map((item) => (
                <figure key={item.name} className="quote-card">
                  <p className="quote-card__punch">“{item.punch}”</p>
                  <blockquote className="quote-card__text">{item.quote}</blockquote>
                  <figcaption className="quote-card__who">
                    <span className="quote-card__name">— {item.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
