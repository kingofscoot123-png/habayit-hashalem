"use client";

import { useMemo, useEffect, useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

type CertItem = (typeof content.credentials.items)[number];

export function Credentials() {
  const [view, setView] = useState<CertItem | null>(null);
  const groups = useMemo(() => {
    const map = new Map<string, CertItem[]>();
    for (const item of content.credentials.items) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return Array.from(map.entries());
  }, []);

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
        <p className="mt-3 text-body text-ink">{content.credentials.lead}</p>
      </div>
      <div className="cred-groups mx-auto max-w-5xl">
        {groups.map(([group, items]) => (
          <div key={group} className="cred-group">
            <h3 className="cred-group__title">{group}</h3>
            <div className="cred-group__grid">
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
          </div>
        ))}
      </div>

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
