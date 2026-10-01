"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const refresh = () => {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    };

    if (reduced) {
      refresh();
      return;
    }

    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    refresh();

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return children;
}
