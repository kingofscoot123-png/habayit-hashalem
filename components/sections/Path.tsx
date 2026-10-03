import { content } from "@/content";

export function Path() {
  const certs = content.credentials.items.slice(0, 6);

  return (
    <section id="path" className="depth-stage px-5 py-16 sm:px-6 lg:px-16 lg:py-[120px]">
      <div className="mx-auto mb-10 max-w-3xl text-center" data-reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">{content.path.kicker}</p>
        <h2 className="text-h2">
          {content.path.title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} data-reveal-word className="inline-block pe-2">
              {word}
            </span>
          ))}
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8">
        {content.path.steps.map((step) => (
          <article key={step.title} data-depth className="story-shot story-shot--split">
            <div className="media-zoom story-shot__media">
              <img src={step.image} alt={step.alt} />
            </div>
            <div className="story-shot__copy">
              <h3 className="text-2xl font-light tracking-wide">{step.title}</h3>
              <p className="mt-3 text-body text-ink-soft">{step.body}</p>
              <p className="mt-5 text-caption tracking-wide text-accent">{step.time}</p>
            </div>
          </article>
        ))}
      </div>

      <div id="services" className="mx-auto mt-16 max-w-5xl">
        <p className="mb-6 text-center text-caption tracking-widest text-ink-soft" data-reveal>
          {content.path.workTitle}
        </p>
        <div className="grid gap-7">
          {content.deliverables.cards.map((card) => (
            <article
              key={card.title}
              data-depth
              className="story-shot story-shot--split"
            >
              <div className="media-zoom story-shot__media">
                <img src={card.image} alt={card.alt} />
              </div>
              <div className="story-shot__copy">
                <p className="text-2xl font-light">{card.title}</p>
                <p className="mt-2 text-body text-ink-soft">{card.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="credentials" className="mx-auto mt-16 max-w-5xl">
        <h3 className="mb-6 text-center text-h2" data-reveal>
          {content.credentials.title}
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {certs.map((item) => (
            <figure key={item.src} className="cert-photo rounded-shell p-2" data-reveal>
              <img src={item.src} alt={item.alt} />
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center" data-reveal>
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

      <ul className="mx-auto mt-16 max-w-2xl space-y-3">
        {content.objections.items.map((item) => (
          <li key={item.q} className="clinic-card rounded-2xl px-5 py-4" data-depth>
            <p className="text-lead">{item.q}</p>
            <p className="mt-2 text-body text-ink-soft">{item.a}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
