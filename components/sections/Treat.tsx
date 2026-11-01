"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentLead } from "@/components/AccentLead";
import { TreatHouse } from "@/components/TreatHouse";
import { content } from "@/content";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const flow = ["now", "how", "result"] as const;

/**
 * במה אני מטפל — pinned house/card stages.
 * Mobile: finger scroll reads the active card first; only then does scrub advance.
 */
export function Treat() {
  const items = content.treat.items;
  const sectionRef = useRef<HTMLElement>(null);
  const pinActiveRef = useRef(false);
  const stageRef = useRef(0);
  const [stage, setStage] = useState(0);
  const { reduced } = useMotionPrefs();

  const setStep = (i: number) => {
    stageRef.current = i;
    setStage(i);
  };

  // Reset inner read position whenever the active card changes.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const pane = section.querySelector<HTMLElement>(
      `.treat-scroll__card.is-on [data-treat-read], [data-treat-card][data-treat-stage="${stage}"] [data-treat-read]`,
    );
    if (pane) pane.scrollTop = 0;
  }, [stage]);

  /**
   * While pinned, route wheel/touch into the active card's text pane first.
   * Page scrub (stage change) only continues after the pane hits top/bottom.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const activePane = () =>
      section.querySelector<HTMLElement>(".treat-scroll__card.is-on [data-treat-read]");

    const paneState = () => {
      const el = activePane();
      if (!el) return { el: null as HTMLElement | null, atTop: true, atBottom: true, hasOverflow: false };
      const hasOverflow = el.scrollHeight > el.clientHeight + 2;
      return {
        el,
        hasOverflow,
        atTop: el.scrollTop <= 1,
        atBottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 2,
      };
    };

    const onWheel = (e: WheelEvent) => {
      if (!pinActiveRef.current) return;
      const { el, atTop, atBottom, hasOverflow } = paneState();
      if (!el || !hasOverflow) return;
      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += e.deltaY;
      }
    };

    let touchY = 0;
    let locking = false;

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      locking = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pinActiveRef.current) return;
      const y = e.touches[0]?.clientY ?? touchY;
      const dy = touchY - y;
      const { el, atTop, atBottom, hasOverflow } = paneState();
      if (!el || !hasOverflow) return;

      const pullingUp = dy > 0;
      const pullingDown = dy < 0;
      if ((pullingUp && !atBottom) || (pullingDown && !atTop)) {
        locking = true;
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += dy;
        touchY = y;
      } else if (locking) {
        e.preventDefault();
        touchY = y;
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
    };
  }, [reduced]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stageEl = section.querySelector<HTMLElement>(".treat-scroll__stage");
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-treat-card]"));

    const fitStage = () => {
      if (!stageEl || cards.length === 0) return;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      if (mobile) {
        // Tall enough for house + a real reading pane on phones.
        const avail = Math.max(360, Math.round(window.innerHeight * 0.72));
        stageEl.style.minHeight = `${avail}px`;
        stageEl.style.height = `${avail}px`;
        stageEl.style.maxHeight = `${avail}px`;
      } else {
        const tallest = cards.reduce((max, card) => Math.max(max, card.scrollHeight), 0);
        const h = Math.max(tallest, Math.round(window.innerHeight * 0.72));
        stageEl.style.minHeight = `${h}px`;
        stageEl.style.height = "";
        stageEl.style.maxHeight = "";
      }
    };
    fitStage();
    window.addEventListener("resize", fitStage);

    const ctx = gsap.context(() => {
      if (reduced || cards.length === 0) {
        gsap.set(cards, { autoAlpha: 1, y: 0, position: "relative" });
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      gsap.set(cards, { autoAlpha: 0, y: mobile ? 28 : 36 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });
      setStep(0);
      fitStage();

      // Snappy stage scrub — reading happens via inner card scroll, not endless pin.
      const perStep = Math.round(window.innerHeight * (mobile ? 1.25 : 1.55));
      const slot = 2;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "treat-scroll",
          trigger: section,
          start: mobile ? "top top+=56" : "top top+=80",
          end: () => `+=${perStep * cards.length}`,
          pin: true,
          pinSpacing: true,
          scrub: mobile ? 0.55 : 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: fitStage,
          onToggle: (self) => {
            pinActiveRef.current = self.isActive;
          },
          onUpdate: (self) => {
            pinActiveRef.current = self.isActive;
            const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length + 0.001));
            if (idx !== stageRef.current) setStep(idx);
          },
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const at = (i - 1) * slot + 1;
        tl.to(
          cards[i - 1],
          { autoAlpha: 0, y: mobile ? -22 : -28, duration: 0.7, ease: "power2.inOut" },
          at,
        );
        tl.fromTo(
          card,
          { autoAlpha: 0, y: mobile ? 30 : 36 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
          at,
        );
      });
      tl.to({}, { duration: 0.85 }, (cards.length - 1) * slot + 1);
    }, section);

    return () => {
      pinActiveRef.current = false;
      window.removeEventListener("resize", fitStage);
      ctx.revert();
    };
  }, [reduced, items.length]);

  return (
    <section
      id="treat"
      ref={sectionRef}
      className={`treat-scroll mishpacha-canvas ${reduced ? "treat-scroll--static" : ""}`}
      aria-label={content.treat.title}
    >
      <div className="treat-scroll__inner">
        <header className="treat-scroll__head">
          <h2 className="section-title-rule text-h2 text-[#82152B]">
            <AccentLead text={content.treat.title} />
          </h2>
          <span className="treat-scroll__rule" aria-hidden="true" />
          <p className="treat-scroll__lead leading-relaxed">{content.treat.lead}</p>
        </header>

        <div className="treat-scroll__stage">
          {items.map((item, i) => (
            <article
              key={item.n}
              data-treat-card
              data-treat-stage={i}
              className={`treat-scroll__card border-[#C5A059]/40 ${i === stage ? "is-on" : ""}`}
            >
              <div className="treat-scroll__house relative top-0 w-full text-center" aria-hidden="true">
                <TreatHouse stage={i} />
                <ol className="treat-scroll__progress">
                  {items.map((it, pi) => (
                    <li key={it.n} className={pi === i ? "is-on" : pi < i ? "is-done" : ""}>
                      <span>{it.n}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="treat-scroll__read" data-treat-read>
                <div className="treat-scroll__meta">
                  <span className="treat-scroll__n">{item.n}</span>
                  <span className="treat-scroll__tag">{item.tag}</span>
                </div>
                <h3 className="treat-scroll__title text-[#82152B]">{item.title}</h3>
                <div className="treat-scroll__blocks">
                  {flow.map((key, si) => (
                    <section
                      key={key}
                      className={`treat-scroll__block treat-scroll__block--${key}`}
                      style={{ ["--d" as string]: si } as CSSProperties}
                    >
                      <h4 className="treat-scroll__block-label text-[#82152B]">{content.treat.labels[key]}</h4>
                      <p className="treat-scroll__block-text leading-relaxed">{item[key]}</p>
                    </section>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
