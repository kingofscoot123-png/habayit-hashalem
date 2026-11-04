"use client";

import { HeroHouseMark } from "@/components/HeroHouseMark";
import { content } from "@/content";

const TRUST_MARKS = ["TAT", "TFT", "NLP", "Access Bars"] as const;

/**
 * Hero — blue-reference structure with brand colors:
 * One full-bleed family photo. Live HTML text sits ON the photo
 * (right on desktop, lower band on mobile) over a soft cream glow
 * so copy stays readable without covering faces or cutting the family.
 */
export function Hero() {
  const headline = content.hero.titleLines.join(" ");

  return (
    <header id="top" dir="rtl" className="hs-hero hs-hero--onphoto">
      <div className="hs-hero__stage">
        <picture className="hs-hero__plate">
          {/* Landscape family plate on all sizes — matches blue-ref side-by-side composition */}
          <source srcSet={content.hero.familyDesktop} type="image/webp" />
          <img
            src={content.hero.familyDesktopJpg}
            alt={content.hero.familyAlt}
            width={1536}
            height={864}
            className="hs-hero__plate-img"
            decoding="async"
            fetchPriority="high"
          />
        </picture>

        {/* Soft cream glow — blends like the reference white bloom, not a solid card */}
        <div className="hs-hero__glow" aria-hidden="true" />

        <div className="hs-hero__copy">
          <div className="hs-hero__overlay">
            <div className="hs-hero__overlay-top animate-fade-up stagger-2">
              <HeroHouseMark className="hs-hero__house-mark" />
              <p className="hs-hero__brand-word">{content.hero.brand}</p>
              <p className="hs-hero__person-line">{content.person}</p>
            </div>

            <h1 className="hs-hero__headline animate-fade-up stagger-3">{headline}</h1>

            <div className="hs-hero__overlay-mid animate-fade-up stagger-4">
              <p className="hs-hero__capsule">{content.hero.serviceBadge}</p>

              <div className="hs-hero__heart-rule" aria-hidden="true">
                <span className="hs-hero__heart-rule__line" />
                <span className="hs-hero__heart">
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 21s-6.7-4.35-9.33-7.7C.8 10.9 1.1 7.6 3.4 5.9c2-1.5 4.7-1.1 6.3.7L12 9l2.3-2.4c1.6-1.8 4.3-2.2 6.3-.7 2.3 1.7 2.6 5 .73 7.4C18.7 16.65 12 21 12 21z"
                    />
                  </svg>
                </span>
                <span className="hs-hero__heart-rule__line" />
              </div>

              <p className="hs-hero__service-line">{content.hero.serviceLine}</p>
              <p className="hs-hero__clinic-line">{content.hero.subtitle}</p>
            </div>

            <div className="hs-hero__overlay-bottom animate-fade-up stagger-5">
              <div className="hs-hero__actions">
                <a
                  href={content.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hs-hero__btn hs-hero__btn--wa border border-[#C5A059]/70 shadow-xl"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"
                    />
                    <path
                      fill="currentColor"
                      d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.89-4.43 9.89-9.89C21.94 6.43 17.5 2 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.15.83.84-3.07-.2-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.53 3.69-8.21 8.23-8.21 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.81c0 4.54-3.69 8.22-8.19 8.22z"
                    />
                  </svg>
                  שיחת היכרות בוואטסאפ
                </a>
                <a
                  href={content.phoneHref}
                  className="hs-hero__btn hs-hero__btn--tel border border-[#C5A059]/55 bg-white font-bold text-[#82152B]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                    />
                  </svg>
                  להתקשר: {content.phoneDisplay}
                </a>
              </div>

              <div className="hs-hero__trust">
                <a
                  href={content.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-pill hs-hero__address inline-block rounded-full border border-[#C5A059]/55 bg-white/90 px-4 py-1.5 text-sm font-bold text-[#82152B] shadow-md"
                >
                  {content.address}
                </a>
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
      </div>
    </header>
  );
}
