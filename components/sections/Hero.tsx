"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

const GOOGLE_RATING: number | null = null;
const GOOGLE_REVIEWS_COUNT: number | null = null;
const HAS_MICHAEL_PHOTO = false;

export function Hero() {
  const { reduced } = useMotionPrefs();
  const [windowsOn, setWindowsOn] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setWindowsOn(true);
      return;
    }
    const onScroll = () => {
      if (window.scrollY <= 40) return;
      setWindowsOn(true);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <header
      id="top"
      dir="rtl"
      className={`hs-hero ${windowsOn ? "is-windows" : ""} ${reduced ? "is-static" : ""}`}
    >
      <div className="hs-hero__inner">
        <div className="hs-hero__copy">
          <p className="hs-hero__kicker">מיכאל מרום, מטפל זוגי ורגשי, 13 שנה בראש העין</p>
          <h1 className="hs-hero__title">
            חוזרים לקרבה שהייתה לפני שהשיחות <span>נשברו</span>
          </h1>
          <p className="hs-hero__sub">
            טיפול זוגי ורגשי בגובה העיניים, בדיסקרטיות מלאה. אפשר להתחיל גם לבד.
          </p>
          <div className="hs-hero__actions">
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
            <a href="tel:+972543534973" className="hs-hero__btn hs-hero__btn--tel">
              להתקשר: 054-353-4973
            </a>
          </div>
          <div className="hs-hero__trust">
            {HAS_MICHAEL_PHOTO ? (
              <img src="/images/michael.jpg" alt="" width={48} height={48} className="hs-hero__photo" />
            ) : null}
            <a href={content.mapsHref} target="_blank" rel="noopener noreferrer">
              סמדר 13, ראש העין
            </a>
            {GOOGLE_RATING != null && GOOGLE_REVIEWS_COUNT != null ? (
              <span className="hs-hero__rating">
                דירוג {GOOGLE_RATING} בגוגל, {GOOGLE_REVIEWS_COUNT} ביקורות
              </span>
            ) : null}
          </div>
        </div>

        <div className="hs-hero__art" aria-hidden="true">
          <svg className="hs-house" viewBox="0 0 400 360" width="400" height="360">
            <defs>
              <filter id="hs-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            <rect className="hs-glow hs-glow--win-r" x="228" y="196" width="46" height="46" rx="2" filter="url(#hs-glow)" />
            <rect className="hs-glow hs-glow--win-l" x="126" y="196" width="46" height="46" rx="2" filter="url(#hs-glow)" />
            <rect className="hs-glow hs-glow--door" x="174" y="236" width="52" height="84" rx="4" filter="url(#hs-glow)" />

            <path data-draw style={{ "--i": 0 } as CSSProperties} pathLength="1" d="M24 318 H376" />
            <path data-draw style={{ "--i": 1 } as CSSProperties} pathLength="1" d="M108 318 V178 H292 V318" />
            <path data-draw style={{ "--i": 2 } as CSSProperties} pathLength="1" d="M88 178 L200 58 L312 178" />
            <path data-draw style={{ "--i": 2 } as CSSProperties} pathLength="1" d="M238 99 V56 H266 V129" />
            <path data-draw style={{ "--i": 3 } as CSSProperties} pathLength="1" d="M176 318 V252 A24 24 0 0 1 224 252 V318" />
            <path
              data-draw
              style={{ "--i": 4 } as CSSProperties}
              pathLength="1"
              d="M128 198 H170 V240 H128 Z M149 198 V240 M128 219 H170 M230 198 H272 V240 H230 Z M251 198 V240 M230 219 H272"
            />
            <path data-draw style={{ "--i": 5 } as CSSProperties} pathLength="1" d="M88 178 H312" />
          </svg>
        </div>
      </div>
    </header>
  );
}
