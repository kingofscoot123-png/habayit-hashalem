"use client";

import { useEffect, useState } from "react";
import { content } from "@/content";

export function Quotes() {
  const [i, setI] = useState(0);
  const quote = content.quotes.items[i];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % content.quotes.items.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <div className="mx-auto max-w-3xl text-center" data-reveal>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
          {content.quotes.title}
        </p>
        <p className="quote-mark" aria-hidden="true">
          ”
        </p>
        <p key={quote} className="mt-6 text-h2">
          {quote}
        </p>
      </div>
    </section>
  );
}
