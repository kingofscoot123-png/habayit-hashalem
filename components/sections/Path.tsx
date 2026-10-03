import { content } from "@/content";

export function Path() {
  const certs = content.credentials.items.slice(0, 6);

  return (
    <section id="path" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">{content.path.workTitle}</h2>
      </div>

      <div className="path-grid mx-auto max-w-5xl">
        {content.deliverables.cards.map((card) => (
          <article key={card.title} data-depth className="path-card">
            <div className="media-zoom path-card__media">
              <img src={card.image} alt={card.alt} />
              <div className="path-card__label">
                <p className="path-card__title">{card.title}</p>
                <p className="path-card__result">{card.result}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div id="credentials" className="mx-auto mt-14 max-w-5xl">
        <h3 className="mb-6 text-center text-h2" data-reveal>
          {content.credentials.title}
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {certs.map((item) => (
            <figure key={item.src} className="cert-photo rounded-shell p-2" data-reveal>
              <img src={item.src} alt={item.alt} />
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl text-center" data-reveal>
        <h3 className="text-display">
          {content.close.titleLines.map((line) => (
            <span key={line} className="block">
              {line.split(" ").map((word, i) => {
                const glow = word === "לקרבה";
                return (
                  <span key={`${word}-${i}`} className={glow ? "glow-word" : undefined}>
                    {word}
                    {i < line.split(" ").length - 1 ? " " : ""}
                  </span>
                );
              })}
            </span>
          ))}
        </h3>
        <a
          href={content.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold shimmer mt-8 rounded-2xl px-8 py-4 text-base"
        >
          {content.cta}
        </a>
        <p className="mt-4 text-caption text-ink-soft">{content.ctaAfter}</p>
      </div>

      <ul className="mx-auto mt-12 max-w-2xl space-y-3">
        {content.objections.items.map((item) => (
          <li key={item.q} className="clinic-card rounded-2xl px-5 py-4" data-reveal>
            <p className="text-lead">{item.q}</p>
            <p className="mt-2 text-body text-ink-soft">{item.a}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
