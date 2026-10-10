import { content } from "@/content";

export function Path() {
  return (
    <section id="close" className="px-5 pb-16 sm:px-6 lg:px-16 lg:pb-[100px]">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <h2 className="text-display">
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
        </h2>
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
