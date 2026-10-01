"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

export function BackgroundShift() {
  const { reduced } = useMotionPrefs();

  useLayoutEffect(() => {
    const trigger = document.getElementById("mechanism");
    if (!trigger) return;

    const tweenTo = (active: boolean) => {
      gsap.to(document.body, {
        backgroundColor: active ? "var(--surface-deep)" : "var(--surface)",
        color: active ? "var(--ink-inv)" : "var(--ink)",
        duration: reduced ? 0.2 : 0.6,
        ease: "power2.inOut",
      });
    };

    const st = ScrollTrigger.create({
      trigger,
      start: "top 60%",
      end: "bottom 40%",
      onToggle: ({ isActive }) => tweenTo(isActive),
    });

    return () => {
      st.kill();
      gsap.set(document.body, {
        backgroundColor: "var(--surface)",
        color: "var(--ink)",
      });
    };
  }, [reduced]);

  return null;
}
