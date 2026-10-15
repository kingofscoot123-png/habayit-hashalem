import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

const icons: Record<string, string> = {
  "שיטת NLP רפואי": "M12 3v18M4 12h16",
  "שיטת EFT": "M12 4v16M7 9l10 6M17 9L7 15",
  "שיטת TAT": "M5 19h14M12 19V5M6 11l6-6 6 6",
  "שיטת TFT": "M4 7h10M4 12h16M4 17h12",
  "דמיון מודרך": "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z",
  "אקסס בארס": "M12 3c3.5 4 4 8 0 18C8 11 8.5 7 12 3z",
  "טרנס": "M12 3v6M12 15v6M3 12h6M15 12h6",
  "שיטת ספירל": "M12 6a4 4 0 1 1-4 4c0 6 8 4 8 10a4 4 0 1 1-8 0",
  "שיטת EMDR": "M4 8h16M4 16h16",
};

export function Methods() {
  return (
    <section id="path" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.methods.title} />
        </h2>
        <p className="mt-3 text-caption text-ink-soft">{content.methods.hint}</p>
      </div>
      <div className="method-grid mx-auto max-w-5xl" data-stagger>
        {content.methods.items.map((item) => (
          <article key={item.name} className="method-card method-card--open">
            <span className="method-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d={icons[item.name] || "M12 5v14M5 12h14"} />
              </svg>
            </span>
            <h3>{item.name}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
