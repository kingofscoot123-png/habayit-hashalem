"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollOrbit(sectionRef: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll<HTMLElement>("[data-orbit]");
      items.forEach((el, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          el,
          {
            rotateY: dir * 18,
            rotateX: 10,
            z: -220,
            y: 70,
            scale: 0.88,
            opacity: 0.15,
          },
          {
            rotateY: 0,
            rotateX: 0,
            z: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 42%",
              scrub: 0.7,
            },
          },
        );
        gsap.to(el, {
          rotateY: dir * -10,
          z: 70,
          scale: 1.03,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 28%",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, reduced]);
}
