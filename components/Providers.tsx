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
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            delay: (i % 8) * 0.03,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: desktop ? 18 : 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.6 : 0.45,
            delay: Number(el.dataset.delay || 0),
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "top 96%",
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete: () => el.classList.add("is-revealed"),
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((wrap) => {
        const kids = wrap.querySelectorAll<HTMLElement>(":scope > *");
        if (kids.length === 0) return;
        gsap.fromTo(
          kids,
          { y: desktop ? 16 : 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.5 : 0.4,
            stagger: 0.06,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: wrap,
              start: "top 94%",
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete: () => {
              kids.forEach((kid) => kid.classList.add("is-revealed"));
              wrap.classList.add("is-revealed");
            },
          },
        );
      });

      // Pins + Lenis can leave reveals stuck invisible; force a late refresh and failsafe.
      window.setTimeout(() => ScrollTrigger.refresh(), 900);
      window.setTimeout(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger] > *").forEach((el) => {
          if (getComputedStyle(el).opacity === "0") {
            gsap.set(el, { clearProps: "opacity,transform" });
            el.classList.add("is-revealed");
          }
        });
        ScrollTrigger.refresh();
      }, 2800);

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
            scrub: 1.15,
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
            scrub: 1.2,
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
            y: desktop ? 28 : 16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.65 : 0.5,
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
            lerp: 0.18,
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
