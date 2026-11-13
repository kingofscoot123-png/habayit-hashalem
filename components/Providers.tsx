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
      gsap.utils.toArray<HTMLElement>("[data-reveal-word]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.32,
            delay: (i % 8) * 0.02,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 98%", once: true },
          },
        );
      });

      // Reveal with the finger — early trigger + short travel so sections
      // never sit invisible in an empty viewport while the user scrolls.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: desktop ? 10 : 6, opacity: 0.08 },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.32 : 0.22,
            delay: Number(el.dataset.delay || 0),
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 99%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((wrap) => {
        const kids = wrap.querySelectorAll<HTMLElement>(":scope > *");
        if (kids.length === 0) return;
        gsap.fromTo(
          kids,
          { y: desktop ? 8 : 5, opacity: 0.08 },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.28 : 0.2,
            stagger: 0.035,
            ease: "power2.out",
            scrollTrigger: { trigger: wrap, start: "top 98%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const dist = Number(el.dataset.parallax || -36);
        const trigger = el.closest(".site-backdrop") || el.closest("header, section") || document.documentElement;
        gsap.to(el, {
          y: dist,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom top",
            scrub: 0.35,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".site-backdrop__orb").forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.35 + (i % 3) * 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "max",
            scrub: 0.4,
          },
        });
      });

      const scenes: { id: string; scene: string }[] = [
        { id: "#top", scene: "hero" },
        { id: "#about", scene: "calm" },
        { id: "#treat", scene: "treat" },
        { id: "#path", scene: "tools" },
        { id: "#who", scene: "warm" },
        { id: "#why", scene: "trust" },
        { id: "#credentials", scene: "trust" },
        { id: "#assessment", scene: "warm" },
      ];

      const setScene = (scene: string) => {
        document.documentElement.dataset.scene = scene;
      };

      scenes.forEach(({ id, scene }) => {
        const trigger = document.querySelector(id);
        if (!trigger) return;
        ScrollTrigger.create({
          trigger,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setScene(scene),
          onEnterBack: () => setScene(scene),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: desktop ? 14 : 8,
            opacity: 0.1,
          },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.34 : 0.24,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 96%", once: true },
            onStart: () => el.classList.add("is-in"),
          },
        );
      });
    }

    const lenis =
      !reduced && desktop
        ? new Lenis({
            lerp: 0.28,
            smoothWheel: true,
            syncTouch: false,
          })
        : null;

    const navOffset = 80;

    const scrollToSection = (target: HTMLElement) => {
      if (lenis) {
        lenis.scrollTo(target, { offset: -navOffset, duration: 1.15 });
        return;
      }
      const top = window.scrollY + target.getBoundingClientRect().top - navOffset;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    };

    const onHash = (e: Event) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      scrollToSection(target);
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
