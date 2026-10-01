"use client";

import { useState } from "react";
import { content } from "@/content";

/*
1. איפה הקורא: ההתנגדות האחרונה לפני לחיצה.
2. כן אבל: יקר / זמן / הזוג / כבר ניסינו / דיסקרטיות.
3. אקורדיון בגוף ראשון, תשובות ישירות.
4. ביציאה: נשארה אחת או אפס.
5. זיכרון: התשובה הישירה.
*/

export function Objections() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <h2 className="mb-12 max-w-measure text-h2">{content.objections.title}</h2>
      <ul className="max-w-measure divide-y divide-ink/10">
        {content.objections.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-5 text-start text-lead"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {item.q}
              </button>
              <div
                className="panel grid"
                data-open={isOpen ? "" : undefined}
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
    </section>
  );
}
