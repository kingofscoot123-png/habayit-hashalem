"use client";

import { useEffect, useState } from "react";

export function useMotionPrefs() {
  const [reduced, setReduced] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const width = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      setReduced(motion.matches);
      setDesktop(width.matches);
    };
    apply();
    motion.addEventListener("change", apply);
    width.addEventListener("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      width.removeEventListener("change", apply);
    };
  }, []);

  return { reduced, desktop, canPin: desktop && !reduced };
}
