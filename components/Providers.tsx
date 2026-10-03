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

    if (!reduced) {
      const media = document.querySelector<HTMLElement>("[data-hero-media]");
      if (media) {
        gsap.fromTo(
          media,
          { scale: 1.04 },
          {
            scale: 1.08,
            ease: "none",
            scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 0.9 },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal-word]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 16, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            delay: (i % 8) * 0.04,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: desktop ? 24 : 16, opacity: 0, filter: desktop ? "blur(6px)" : "blur(0px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: desktop ? 0.85 : 0.55,
            delay: Number(el.dataset.delay || 0),
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: desktop ? 42 : 28,
            rotateX: desktop ? 14 : 8,
            z: desktop ? -70 : -30,
            opacity: 0,
            filter: desktop ? "blur(8px)" : "blur(4px)",
          },
          {
            y: 0,
            rotateX: 0,
            z: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: desktop ? 0.95 : 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
            onStart: () => el.classList.add("is-in"),
          },
        );
      });
    }

    const lenis =
      !reduced && desktop
        ? new Lenis({
            lerp: 0.1,
            smoothWheel: true,
            syncTouch: false,
          })
        : null;

    const onHash = (e: Event) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.15 });
        return;
      }
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
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
        document.removeEventListener("click", onHash);
        gsap.ticker.remove(ticker);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    refresh();
    return () => {
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
