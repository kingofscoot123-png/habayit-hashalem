"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { CookieNotice } from "@/components/CookieNotice";

gsap.registerPlugin(ScrollTrigger);

export function Providers({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    const refresh = () => {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    };

    const onSpot = (e: MouseEvent) => {
      const card = (e.target as HTMLElement | null)?.closest(".glass-card, .tilt-card") as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
        if (!reduced && card.classList.contains("tilt-card")) {
          const px = x / r.width - 0.5;
          const py = y / r.height - 0.5;
          const amount = desktop ? 8 : 5;
          card.style.transform = `perspective(1100px) rotateY(${px * amount}deg) rotateX(${-py * (amount * 0.75)}deg)`;
        }
      }

      const mag = (e.target as HTMLElement | null)?.closest(".magnetic") as HTMLElement | null;
      if (mag && desktop && !reduced && !mag.dataset.owned) {
        const r = mag.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        mag.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
      }
    };

    const onLeaveCard = (e: MouseEvent) => {
      const card = (e.target as HTMLElement | null)?.closest(".tilt-card") as HTMLElement | null;
      const next = e.relatedTarget as Node | null;
      if (card && (!next || !card.contains(next))) card.style.transform = "";

      const mag = (e.target as HTMLElement | null)?.closest(".magnetic") as HTMLElement | null;
      if (mag && (!next || !mag.contains(next as Node))) mag.style.transform = "";
    };

    document.addEventListener("pointermove", onSpot, { passive: true });
    document.addEventListener("mouseout", onLeaveCard);

    if (!reduced) {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        const from = desktop
          ? { y: 36, opacity: 0, filter: "blur(8px)" }
          : { y: 20, opacity: 0 };
        gsap.fromTo(el, from, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: desktop ? 0.95 : 0.55,
          delay: Number(el.dataset.delay || 0),
          ease: "power2.out",
          clearProps: "transform,filter",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.72 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 40%",
              scrub: 0.6,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fx]").forEach((el) => {
        const kind = el.dataset.fx;
        const from =
          kind === "focus"
            ? { filter: desktop ? "blur(14px)" : "blur(0px)", opacity: 0.35 }
            : kind === "depth"
              ? { y: 48, scale: 0.9, opacity: 0, rotateX: desktop ? 10 : 0 }
              : kind === "rise"
                ? { y: 64, opacity: 0, rotateX: desktop ? 12 : 0 }
                : { y: 28, opacity: 0 };
        gsap.fromTo(el, from, {
          y: 0,
          scale: 1,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: desktop ? 1.05 : 0.6,
          ease: "power3.out",
          clearProps: "transform,filter",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".media-zoom img").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: desktop ? "inset(18% 18% 18% 18%)" : "inset(8% 8% 8% 8%)", scale: 1.12 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: desktop ? 1.15 : 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          },
        );
      });
    }

    if (reduced || !desktop) {
      refresh();
      return () => {
        document.removeEventListener("pointermove", onSpot);
        document.removeEventListener("mouseout", onLeaveCard);
      };
    }

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    refresh();

    return () => {
      document.removeEventListener("pointermove", onSpot);
      document.removeEventListener("mouseout", onLeaveCard);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {children}
      <CookieNotice />
    </>
  );
}
