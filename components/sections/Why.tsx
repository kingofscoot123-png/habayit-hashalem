import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Why() {
  return (
    <section id="why" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-10 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.why.title} />
        </h2>
      </div>
      <div className="why-grid mx-auto max-w-5xl" data-stagger>
        {content.why.items.map((item, i) => (
          <article key={item.title} className="why-card">
            <span className="why-card__n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
