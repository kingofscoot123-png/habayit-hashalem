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
    const root = document.documentElement;

    const refresh = () => {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    };

    const onSpot = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
      root.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);

      const card = (e.target as HTMLElement | null)?.closest(".glass-card, .tilt-card, .holo-card") as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
        card.style.setProperty("--hx", `${x}px`);
        card.style.setProperty("--hy", `${y}px`);
        if (!reduced && card.classList.contains("tilt-card") && !card.hasAttribute("data-orbit")) {
          const px = x / r.width - 0.5;
          const py = y / r.height - 0.5;
          const amount = desktop ? 8 : 5;
          card.style.transform = `perspective(1100px) rotateY(${px * amount}deg) rotateX(${-py * (amount * 0.75)}deg)`;
        }
      }

      const mag = (e.target as HTMLElement | null)?.closest(".magnetic") as HTMLElement | null;
      if (mag && !reduced && !mag.dataset.owned) {
        const r = mag.getBoundingClientRect();
        const pull = desktop ? 0.2 : 0.1;
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        mag.style.transform = `translate3d(${x * pull}px, ${y * pull}px, 0)`;
      }
    };

    const onLeaveCard = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest(".tilt-card") as HTMLElement | null;
      const next = e.relatedTarget as Node | null;
      if (card && !card.hasAttribute("data-orbit") && (!next || !card.contains(next))) {
        card.style.transform = "";
      }

      const mag = (e.target as HTMLElement | null)?.closest(".magnetic") as HTMLElement | null;
      if (mag && (!next || !mag.contains(next as Node))) mag.style.transform = "";
    };

    document.addEventListener("pointermove", onSpot, { passive: true });
    document.addEventListener("pointerout", onLeaveCard);

    if (!reduced) {
      gsap.to(root, {
        "--ride": 1,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });

      const media = document.querySelector<HTMLElement>("[data-hero-media]");
      if (media) {
        gsap.to(media, {
          yPercent: desktop ? 14 : 8,
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 0.7 },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal-word]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0, rotateX: desktop ? 18 : 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            delay: (i % 8) * 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: desktop ? 36 : 22, opacity: 0, filter: desktop ? "blur(8px)" : "blur(0px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: desktop ? 0.95 : 0.55,
            delay: Number(el.dataset.delay || 0),
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.965, opacity: 0.78 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 88%", end: "top 42%", scrub: 0.55 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-fx]").forEach((el) => {
        const kind = el.dataset.fx;
        const from =
          kind === "focus"
            ? { filter: desktop ? "blur(12px)" : "blur(0px)", opacity: 0.35 }
            : kind === "depth"
              ? { y: 48, scale: 0.9, opacity: 0, rotateX: 10 }
              : { y: 56, opacity: 0, rotateX: 10 };
        gsap.fromTo(el, from, {
          y: 0,
          scale: 1,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: desktop ? 1.05 : 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".media-zoom img").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: desktop ? "inset(16% 16% 16% 16%)" : "inset(7% 7% 7% 7%)", scale: 1.16 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 88%", end: "top 36%", scrub: 0.6 },
          },
        );
      });
    }

    const lenis = reduced
      ? null
      : new Lenis({
          lerp: desktop ? 0.09 : 0.16,
          smoothWheel: true,
          syncTouch: !desktop,
          touchMultiplier: 1.15,
        });

    const onHash = (e: Event) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || !lenis) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.15 });
    };
    document.addEventListener("click", onHash);

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      refresh();
      return () => {
        document.removeEventListener("pointermove", onSpot);
        document.removeEventListener("pointerout", onLeaveCard);
        document.removeEventListener("click", onHash);
        gsap.ticker.remove(ticker);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    refresh();
    return () => {
      document.removeEventListener("pointermove", onSpot);
      document.removeEventListener("pointerout", onLeaveCard);
      document.removeEventListener("click", onHash);
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
