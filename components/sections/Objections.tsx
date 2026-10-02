"use client";

import { useState } from "react";
import { content } from "@/content";

export function Objections() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center text-h2" data-reveal>
          {content.objections.title}
        </h2>
        <ul className="space-y-3">
          {content.objections.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="glass-card glass-deep rounded-2xl px-6" data-reveal="diag">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-5 text-start text-lead"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className={isOpen ? "text-accent" : ""}>{item.q}</span>
                </button>
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows .3s cubic-bezier(.65,0,.35,1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-body text-ink-soft">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
