"use client";

import { HeroHouseMark } from "@/components/HeroHouseMark";
import { content } from "@/content";

const GOOGLE_RATING: number | null = null;
const GOOGLE_REVIEWS_COUNT: number | null = null;

const TRUST_MARKS = ["TAT", "TFT", "NLP", "Access Bars"] as const;

const TAG_LINES = content.hero.treatmentTags
  .split("|")
  .map((part) => part.trim())
  .filter(Boolean);

/**
 * Split hero — family photo (visual left) + reference-inspired text stack (visual right).
 * All copy stays in HTML/CSS; photo has no overlaid text.
 */
export function Hero() {
  return (
    <header id="top" dir="rtl" className="hs-hero hs-hero--split">
      <div className="hs-hero__split">
        {/* Visual LEFT (LTR placement) — family photograph only */}
        <div className="hs-hero__visual">
          <picture>
            <source srcSet={content.hero.family} type="image/webp" />
            <img
              src={content.hero.familyJpg}
              alt={content.hero.familyAlt}
              width={1600}
              height={900}
              className="hs-hero__photo-img"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <div className="hs-hero__visual-shade" aria-hidden="true" />
        </div>

        {/* Visual RIGHT — typographic hierarchy inspired by the blue reference */}
        <div className="hs-hero__panel">
          <div className="hs-hero__copy hs-hero__copy--split">
            <div className="hs-hero__mark animate-fade-up stagger-2" aria-hidden="true">
              <HeroHouseMark className="hs-hero__house-mark" />
            </div>

            <p className="hs-hero__brand-word animate-fade-up stagger-3">{content.hero.brand}</p>

            <h1 className="hs-hero__headline font-display animate-fade-up stagger-4">
              {content.hero.titleLines.map((line, i) => (
                <span key={line} className="hs-hero__headline-line">
                  {line}
                  {i < content.hero.titleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>

            <p className="hs-hero__capsule animate-fade-up stagger-4">{content.hero.subtitle}</p>

            <div className="hs-hero__heart-rule animate-fade-up stagger-5" aria-hidden="true">
              <span className="hs-hero__heart-rule__line" />
              <span className="hs-hero__heart" title="">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 21s-6.7-4.35-9.33-7.7C.8 10.9 1.1 7.6 3.4 5.9c2-1.5 4.7-1.1 6.3.7L12 9l2.3-2.4c1.6-1.8 4.3-2.2 6.3-.7 2.3 1.7 2.6 5 .73 7.4C18.7 16.65 12 21 12 21z"
                  />
                </svg>
              </span>
              <span className="hs-hero__heart-rule__line" />
            </div>

            <ul className="hs-hero__tag-lines animate-fade-up stagger-5">
              {TAG_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <div className="hs-hero__actions animate-fade-up stagger-5">
              <a
                href={content.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-hero__btn hs-hero__btn--wa border border-[#C5A059]/70 shadow-xl"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"
                  />
                  <path
                    fill="currentColor"
                    d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.89-4.43 9.89-9.89C21.94 6.43 17.5 2 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.15.83.84-3.07-.2-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.53 3.69-8.21 8.23-8.21 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.81c0 4.54-3.69 8.22-8.19 8.22z"
                  />
                </svg>
                לשיחת היכרות בוואטסאפ
              </a>
              <a
                href={content.phoneHref}
                className="hs-hero__btn hs-hero__btn--tel border border-[#C5A059]/50 bg-white/80 font-bold text-[#18181B] backdrop-blur-md"
              >
                להתקשר: {content.phoneDisplay}
              </a>
            </div>

            <div className="hs-hero__trust animate-fade-up stagger-5">
              <a
                href={content.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-pill hs-hero__address inline-block rounded-full border border-[#C5A059]/55 bg-white/80 px-4 py-1.5 text-sm font-bold text-[#82152B] shadow-md backdrop-blur-md"
              >
                {content.address}
              </a>
              {GOOGLE_RATING != null && GOOGLE_REVIEWS_COUNT != null ? (
                <span className="hs-hero__rating">
                  דירוג {GOOGLE_RATING} בגוגל, {GOOGLE_REVIEWS_COUNT} ביקורות
                </span>
              ) : null}

              <div className="hs-hero__badges" aria-label="שיטות טיפול">
                {TRUST_MARKS.map((mark) => (
                  <span key={mark} className="hs-hero__cred-badge">
                    {mark}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hs-hero__blend hs-hero__blend--split" aria-hidden="true" />
    </header>
  );
}
