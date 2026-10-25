"use client";

import { useEffect, useMemo, useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { QuoteStars } from "@/components/QuoteStars";
import { content } from "@/content";

type Quote = { punch: string; quote: string; name: string; group: string };

function QuoteCard({ punch, quote, name }: Quote) {
  return (
    <figure className="card-glass quote-card quote-card--uniform quote-card--google card-lift rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8">
      <div className="quote-card__meta">
        <span className="quote-card__google">{content.quotes.googleBadge}</span>
        <QuoteStars />
      </div>
      <p className="quote-card__punch">"{punch}"</p>
      <blockquote className="quote-card__text">{quote}</blockquote>
      <figcaption className="quote-card__who">
        <span className="quote-card__name">{name}</span>
      </figcaption>
    </figure>
  );
}

export function Quotes() {
  const all = useMemo<Quote[]>(
    () =>
      content.quotes.groups.flatMap((group) =>
        group.items.map((item) => ({ ...item, group: group.title })),
      ),
    [],
  );
  const [index, setIndex] = useState(0);
  const [per, setPer] = useState(1);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setPer(mq.matches ? 3 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal]);

  const max = Math.max(1, all.length - per + 1);
  const page = ((index % max) + max) % max;
  const visible = all.slice(page, page + per);

  return (
    <section id="quotes" className="site-section site-section--band-b mishpacha-canvas px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div
        className="card-glass content-shield mx-auto mb-10 max-w-3xl rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 text-center shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8"
        data-reveal
      >
        <h2 className="section-title-rule text-h2">
          <AccentLead text={content.quotes.title} />
        </h2>
        <p className="mt-3 text-body text-ink">{content.quotes.hint}</p>
      </div>

      <div className="quote-carousel mx-auto max-w-6xl">
        <div className="quote-carousel__row">
          {visible.map((item) => (
            <QuoteCard key={`${item.name}-${item.punch}`} {...item} />
          ))}
        </div>
        <div className="quote-carousel__nav">
          <button type="button" className="quote-carousel__btn" aria-label="הקודם" onClick={() => setIndex((v) => v - 1)}>
            ←
          </button>
          <div className="quote-carousel__dots">
            {Array.from({ length: max }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`swipe-dot ${i === page ? "is-on" : ""}`}
                aria-label={`המלצה ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button type="button" className="quote-carousel__btn" aria-label="הבא" onClick={() => setIndex((v) => v + 1)}>
            →
          </button>
        </div>
        <div className="mt-8 text-center">
          <button type="button" className="quote-more btn-burgundy" onClick={() => setModal(true)}>
            {content.quotes.more}
          </button>
        </div>
        <div className="quote-certs mt-12">
          <p className="quote-certs__title">{content.quotes.coupleCertsTitle}</p>
          <div className="quote-certs__grid">
            {content.quotes.coupleCerts.map((item) => (
              <figure key={item.src} className="quote-certs__card">
                <img src={item.src} alt={item.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </div>

      {modal ? (
        <div className="method-modal is-on" role="dialog" aria-modal="true" aria-label={content.quotes.more}>
          <button type="button" className="method-modal__backdrop" aria-label={content.quotes.modalClose} onClick={() => setModal(false)} />
          <div className="quote-modal">
            <h3>{content.quotes.more}</h3>
            <div className="quote-modal__list">
              {all.map((item) => (
                <figure
                  key={`${item.group}-${item.name}-${item.punch}`}
                  className="card-glass quote-card quote-card--uniform quote-card--google card-lift rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8"
                >
                  <div className="quote-card__meta">
                    <span className="quote-card__google">{content.quotes.googleBadge}</span>
                    <QuoteStars />
                  </div>
                  <p className="quote-card__punch">"{item.punch}"</p>
                  <blockquote className="quote-card__text">{item.quote}</blockquote>
                  <figcaption className="quote-card__who">
                    <span className="quote-card__name">{item.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <a
              href={content.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hs-hero__btn hs-hero__btn--tel mt-4"
            >
              {content.quotes.googleLabel}
            </a>
            <div className="quote-certs mt-8">
              <p className="quote-certs__title">{content.quotes.coupleCertsTitle}</p>
              <div className="quote-certs__grid">
                {content.quotes.coupleCerts.map((item) => (
                  <figure key={`modal-${item.src}`} className="quote-certs__card">
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </figure>
                ))}
              </div>
            </div>
            <button type="button" className="btn-ghost mt-4 rounded-2xl px-5 py-2.5 text-sm" onClick={() => setModal(false)}>
              {content.quotes.modalClose}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
