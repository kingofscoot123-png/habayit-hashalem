"use client";

import { useEffect, useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Methods() {
  const [open, setOpen] = useState<(typeof content.methods.items)[number] | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setVisible(false);
    window.setTimeout(() => setOpen(null), 280);
  };

  return (
    <section id="path" className="px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div className="mx-auto mb-8 max-w-3xl text-center" data-reveal>
        <h2 className="text-h2">
          <AccentLead text={content.methods.title} />
        </h2>
        <p className="mt-3 text-caption text-ink-soft">{content.methods.hint}</p>
      </div>
      <div className="method-grid mx-auto max-w-5xl" data-stagger>
        {content.methods.items.map((item) => (
          <button
            key={item.name}
            type="button"
            className="method-card"
            onClick={() => setOpen(item)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {open ? (
        <div
          className={`method-modal ${visible ? "is-on" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="method-title"
        >
          <button type="button" className="method-modal__backdrop" aria-label={content.methods.close} onClick={close} />
          <div className="method-modal__panel">
            <h3 id="method-title" className="text-2xl font-medium">
              {open.name}
            </h3>
            <p className="mt-4 text-body text-ink-soft">{open.body}</p>
            <button type="button" className="btn-ghost mt-6 rounded-2xl px-5 py-2.5 text-sm" onClick={close}>
              {content.methods.close}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
