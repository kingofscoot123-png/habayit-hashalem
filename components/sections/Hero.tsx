"use client";

import { ArrowRight } from "lucide-react";
import { HeroVideoLoop } from "@/components/HeroVideoLoop";
import { content } from "@/content";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260820_010308_b1636845-4c15-4ab6-b0c9-9a29bfb0c6e3.mp4";

const GOOGLE_RATING: number | null = null;
const GOOGLE_REVIEWS_COUNT: number | null = null;
const HAS_MICHAEL_PHOTO = false;

const TRUST_MARKS = [
  { label: "Access Bars", font: "font-playfair" },
  { label: "NLP", font: "font-oswald uppercase tracking-[0.08em]" },
  { label: "NLPP", font: "font-montserrat tracking-wide" },
  { label: "TFT", font: "font-roboto-slab uppercase tracking-[0.06em]" },
  { label: "TAT", font: "font-raleway tracking-wide" },
] as const;

export function Hero() {
  return (
    <header
      id="top"
      dir="rtl"
      className="hs-hero hs-hero--video relative h-screen min-h-[700px] w-full overflow-hidden bg-brand-cream"
    >
      <div className="hs-hero__media absolute inset-0 overflow-hidden" data-hero-media aria-hidden="true">
        <HeroVideoLoop src={HERO_VIDEO} className="md:object-bottom" />
      </div>

      <div className="relative z-[2] mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-12 pt-28 md:pb-14 md:pt-36 lg:px-8">
        <div className="hs-hero__copy min-w-0 font-sans">
          <a
            href={content.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-dark/15 bg-white/60 px-4 py-2 text-sm text-brand-dark backdrop-blur-sm transition-colors hover:bg-white/80 md:mb-6 animate-fade-up stagger-3"
          >
            מיכאל מרום, מטפל זוגי ורגשי, 13 שנה בראש העין
            <ArrowRight className="h-3.5 w-3.5 shrink-0 rotate-180" aria-hidden="true" />
          </a>

          <h1 className="hs-hero__title font-display max-w-4xl text-start text-3xl leading-[1.08] tracking-tight text-brand-dark sm:text-4xl md:text-5xl lg:text-6xl animate-fade-up stagger-4">
            חוזרים לקרבה שהייתה לפני שהשיחות <span>נשברו</span>
          </h1>

          <p className="hs-hero__sub mt-4 max-w-4xl text-start animate-fade-up stagger-4">
            טיפול זוגי ורגשי בגובה העיניים, בדיסקרטיות מלאה. אפשר להתחיל גם לבד.
          </p>

          <div className="hs-hero__actions animate-fade-up stagger-5">
            <a
              href={content.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hs-hero__btn hs-hero__btn--wa"
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
            <a href={content.phoneHref} className="hs-hero__btn hs-hero__btn--tel">
              להתקשר: {content.phoneDisplay}
            </a>
          </div>

          <div className="hs-hero__trust animate-fade-up stagger-5">
            {HAS_MICHAEL_PHOTO ? (
              <img src="/images/michael.jpg" alt="" width={48} height={48} className="hs-hero__photo" />
            ) : null}
            <a href={content.mapsHref} target="_blank" rel="noopener noreferrer" className="hs-hero__address">
              {content.address}
            </a>
            {GOOGLE_RATING != null && GOOGLE_REVIEWS_COUNT != null ? (
              <span className="hs-hero__rating">
                דירוג {GOOGLE_RATING} בגוגל, {GOOGLE_REVIEWS_COUNT} ביקורות
              </span>
            ) : null}

            <div className="hs-hero__creds">
              <p className="hs-hero__creds-line">{content.hero.trust}</p>
              <div className="hs-hero__creds-row">
                {TRUST_MARKS.map((mark) => (
                  <span key={mark.label} className={`hs-hero__cred ${mark.font}`}>
                    {mark.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
