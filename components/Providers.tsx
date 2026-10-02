"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function Providers({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
          card.style.transform = `perspective(1100px) rotateY(${px * 10}deg) rotateX(${-py * 8}deg) scale3d(1.02,1.02,1.02)`;
        }
      }
      const hero = document.getElementById("top");
      if (hero) {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--hx", `${e.clientX - r.left}px`);
        hero.style.setProperty("--hy", `${e.clientY - r.top}px`);
      }
    };

    const onLeaveCard = (e: MouseEvent) => {
      const card = (e.target as HTMLElement | null)?.closest(".tilt-card") as HTMLElement | null;
      const next = e.relatedTarget as Node | null;
      if (card && (!next || !card.contains(next))) card.style.transform = "";
    };

    document.addEventListener("mousemove", onSpot);
    document.addEventListener("mouseout", onLeaveCard);

    if (reduced) {
      refresh();
      return () => {
        document.removeEventListener("mousemove", onSpot);
        document.removeEventListener("mouseout", onLeaveCard);
      };
    }

    const lenis = new Lenis({ lerp: 0.075 });
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    reveals.forEach((el) => {
      const kind = el.dataset.reveal;
      const from =
        kind === "diag"
          ? { x: -36, y: 40, opacity: 0, filter: "blur(12px)", rotateX: 6 }
          : kind === "blur"
            ? { y: 18, opacity: 0, filter: "blur(14px)" }
            : { y: 48, opacity: 0, scale: 0.84, filter: "blur(12px)", rotateX: 10 };
      gsap.fromTo(el, from, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1,
        delay: Number(el.dataset.delay || 0),
        ease: "expo.out",
        clearProps: "transform,filter",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      gsap.to(el, {
        y: Number(el.dataset.parallax || 48),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    refresh();

    return () => {
      document.removeEventListener("mousemove", onSpot);
      document.removeEventListener("mouseout", onLeaveCard);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return children;
}
