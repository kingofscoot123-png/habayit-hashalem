"use client";

import { useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { HighlightCopy } from "@/components/HighlightCopy";
import { content } from "@/content";

export function About() {
  const [open, setOpen] = useState(false);

  return (
    <section id="who" className="about-section mishpacha-canvas px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="about-layout">
        <div className="about-portrait" data-reveal>
          <div className="about-portrait__frame rounded-full border-4 border-[#82152B] bg-white p-1 shadow-2xl ring-2 ring-[#C5A059]">
            <img src={content.who.portrait} alt={content.who.portraitAlt} />
          </div>
        </div>

        <div className="card-glass content-shield rounded-2xl border-t-4 border-[#18181B] border-b border-[#C5A059]/30 bg-white/95 p-6 shadow-2xl shadow-black/10 backdrop-blur-md md:p-8">
          <div data-reveal>
            <p className="about-badge mb-3 text-xs font-semibold uppercase tracking-widest">{content.who.title}</p>
            <h2 className="section-title-rule text-h2">
              <AccentLead text={content.who.name} />
            </h2>
            <div className="about-creds-primary" aria-label="הסמכות ראשיות">
              {content.who.primaryCreds.map((cred) => (
                <span key={cred} className="about-cred font-bold text-[#82152B]">
                  {cred}
                </span>
              ))}
            </div>
            <p className="about-copy-soft mt-4 text-lead">
              <HighlightCopy text={content.who.role} />
            </p>
            <p className="about-copy-soft mt-2 text-body">
              <HighlightCopy text={content.who.years} />
            </p>
          </div>

          <div className="mt-8 space-y-5" data-reveal>
            {content.who.paragraphs.map((p) => (
              <p key={p} className="about-copy-soft text-body">
                <HighlightCopy text={p} />
              </p>
            ))}
          </div>

          <div className="mt-6" data-reveal>
            <button type="button" className="btn-burgundy rounded-2xl px-6 py-3 text-sm" onClick={() => setOpen((v) => !v)}>
              {open ? content.who.less : content.who.more}
            </button>
            {open ? (
              <div className="about-secondary-creds mt-5">
                <div className="about-creds-more" aria-label="הסמכות משניות">
                  {content.who.secondaryCreds.map((cred) => (
                    <span key={cred} className="about-cred about-cred--soft">
                      {cred}
                    </span>
                  ))}
                </div>
                <div className="about-certs-grid mt-5">
                  {content.credentials.items.map((item) => (
                    <figure key={item.src} className="about-cert-card rounded-2xl">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="clinic-card mt-10 rounded-2xl px-6 py-5" data-reveal>
            <p className="text-caption tracking-widest text-ink-soft">כתובת הקליניקה</p>
            <a
              href={content.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="clinic-address mt-2 inline-block text-lead font-extrabold text-[#82152B] transition hover:text-[#C5A059]"
            >
              {content.address}
            </a>
            <a href={content.phoneHref} className="mt-3 block text-body text-burgundy">
              {content.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
