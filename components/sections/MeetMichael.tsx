"use client";

import { content } from "@/content";

export function MeetMichael() {
  return (
    <section
      id="meet"
      className="meet-michael mishpacha-canvas px-5 pt-4 pb-2 sm:px-6 sm:pt-6 lg:px-16"
      aria-label={content.meet.aria}
    >
      <div className="meet-michael__shell" data-reveal>
        <div className="meet-michael__frame">
          <picture>
            <source srcSet="/images/michael.webp" type="image/webp" />
            <img
              src={content.who.portrait}
              alt={content.who.portraitAlt}
              width={720}
              height={720}
              decoding="async"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
          <span className="meet-michael__ring" aria-hidden="true" />
        </div>
        <div className="meet-michael__copy">
          <p className="meet-michael__eyebrow">{content.meet.eyebrow}</p>
          <h2 className="meet-michael__name">{content.meet.name}</h2>
          <p className="meet-michael__role">{content.meet.role}</p>
          <p className="meet-michael__line">{content.meet.line}</p>
        </div>
      </div>
    </section>
  );
}
