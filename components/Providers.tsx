"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CookieNotice } from "@/components/CookieNotice";

gsap.registerPlugin(ScrollTrigger);

export function Providers({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const owned: ScrollTrigger[] = [];

    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    const track = (st?: ScrollTrigger | null) => {
      if (st) owned.push(st);
    };

    if (!reduced) {
      gsap.utils.toArray<HTMLElement>("[data-reveal-word]").forEach((el, i) => {
        const tw = gsap.fromTo(
          el,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            delay: (i % 8) * 0.02,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
        track(tw.scrollTrigger);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const tw = gsap.fromTo(
          el,
          { y: desktop ? 14 : 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.5 : 0.4,
            delay: Number(el.dataset.delay || 0),
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
        track(tw.scrollTrigger);
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((wrap) => {
        const kids = wrap.querySelectorAll<HTMLElement>(":scope > *");
        if (kids.length === 0) return;
        const tw = gsap.fromTo(
          kids,
          { y: desktop ? 12 : 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.45 : 0.35,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
          },
        );
        track(tw.scrollTrigger);
      });

      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
        const tw = gsap.fromTo(
          el,
          { y: desktop ? 18 : 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: desktop ? 0.5 : 0.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 84%", once: true },
            onStart: () => el.classList.add("is-in"),
          },
        );
        track(tw.scrollTrigger);
      });
    }

    const onHash = (e: Event) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: reduced ? "auto" : "smooth" });
    };
    document.addEventListener("click", onHash);

    document.fonts.ready.then(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      document.removeEventListener("click", onHash);
      owned.forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {children}
      <CookieNotice />
    </>
  );
}
