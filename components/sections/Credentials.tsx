"use client";

import { useEffect, useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Credentials() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<(typeof content.credentials.items)[number] | null>(null);
  const items = open ? content.credentials.items : content.credentials.items.slice(0, content.credentials.previewCount);
  const canToggle = content.credentials.items.length > content.credentials.previewCount;

  useEffect(() => {
    if (!view) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setView(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [view]);

  return (
    <section id="credentials" className="mishpacha-canvas px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div
        className="card-glass content-shield mx-auto mb-10 max-w-3xl rounded-2xl border-t-4 border-[#82152B] bg-white/95 p-6 text-center shadow-2xl shadow-[#82152B]/15 backdrop-blur-md md:p-8"
        data-reveal
      >
        <h2 className="section-title-rule text-h2">
          <AccentLead text={content.credentials.title} />
        </h2>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            className="cert-photo rounded-shell p-2"
            onClick={() => setView(item)}
          >
            <img src={item.src} alt={item.alt} />
          </button>
        ))}
      </div>
      {canToggle ? (
        <div className="mt-8 text-center">
          <button type="button" className="quote-more btn-burgundy" onClick={() => setOpen((v) => !v)}>
            {open ? content.credentials.less : content.credentials.more}
          </button>
        </div>
      ) : null}

      {view ? (
        <div className="method-modal is-on" role="dialog" aria-modal="true" aria-label={view.alt}>
          <button type="button" className="method-modal__backdrop" aria-label="סגירה" onClick={() => setView(null)} />
          <div className="cert-modal__panel">
            <img src={view.src} alt={view.alt} />
            <button type="button" className="btn-ghost mt-5 rounded-2xl px-5 py-2.5 text-sm" onClick={() => setView(null)}>
              סגירה
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
