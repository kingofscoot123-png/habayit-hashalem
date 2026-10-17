import { AccentLead } from "@/components/AccentLead";
import { HighlightCopy } from "@/components/HighlightCopy";
import { content } from "@/content";

export function About() {
  return (
    <section id="who" className="about-section px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto max-w-3xl" data-reveal>
        <p className="about-badge mb-3 text-xs font-semibold uppercase tracking-widest">{content.who.title}</p>
        <h2 className="text-h2">
          <AccentLead text={content.who.name} />
        </h2>
        <p className="about-copy-soft mt-4 text-lead">
          <HighlightCopy text={content.who.role} />
        </p>
        <p className="about-copy-soft mt-2 text-body">
          <HighlightCopy text={content.who.years} />
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl space-y-5" data-reveal>
        {content.who.paragraphs.map((p) => (
          <p key={p} className="about-copy-soft text-body">
            <HighlightCopy text={p} />
          </p>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-3xl clinic-card rounded-shell px-6 py-5" data-reveal>
        <p className="text-caption tracking-widest text-ink-soft">כתובת הקליניקה</p>
        <a
          href={content.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-lead transition hover:text-[#047857]"
        >
          {content.address}
        </a>
        <a href={content.phoneHref} className="mt-3 block text-body text-[#047857]">
          {content.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
