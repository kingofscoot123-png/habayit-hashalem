"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

const stops = [
  { id: "about", color: "#0d121c" },
  { id: "services", color: "#0a0f1a" },
  { id: "process", color: "#05080d" },
  { id: "credentials", color: "#0c1018" },
  { id: "start", color: "#080b12" },
];

export function BackgroundShift() {
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const triggers = stops
      .map(({ id, color }) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top 70%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(document.body, {
              backgroundColor: color,
              duration: reduced ? 0.2 : 0.85,
              ease: "power2.inOut",
            }),
          onEnterBack: () =>
            gsap.to(document.body, {
              backgroundColor: color,
              duration: reduced ? 0.2 : 0.85,
              ease: "power2.inOut",
            }),
        });
      })
      .filter(Boolean);

    return () => {
      triggers.forEach((t) => t?.kill());
      gsap.set(document.body, { backgroundColor: "var(--surface)", color: "var(--ink)" });
    };
  }, [reduced]);

  return null;
}
