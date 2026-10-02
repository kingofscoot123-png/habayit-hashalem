import { content } from "@/content";

export function Failed() {
  return (
    <section className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <div className="mx-auto mb-14 max-w-3xl" data-reveal>
        <h2 className="text-h2">{content.failed.title}</h2>
        <p className="mt-5 max-w-measure text-lead text-ink-soft">{content.failed.lead}</p>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        {content.failed.cards.map((card, i) => (
          <article
            key={card.title}
            className="glass-card glass-deep tilt-card border-flow rounded-shell p-8"
            data-reveal={i % 2 ? "diag" : "scale"}
            data-delay={i * 0.08}
          >
            <h3 className="relative z-10 text-2xl font-bold">{card.title}</h3>
            <p className="relative z-10 mt-4 text-body leading-relaxed text-ink-soft">{card.body}</p>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-14 max-w-3xl text-h2" data-reveal="blur">
        {content.failed.remain}
      </p>
    </section>
  );
}
