"use client";

import { FormEvent, useState } from "react";
import { content } from "@/content";

export function LeadForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const text = `שלום מיכאל, ${name}. טלפון: ${phone}. דוא״ל: ${email}. פנייה: ${topic}`;
    const href = `https://wa.me/972543534973?text=${encodeURIComponent(text)}`;
    setSent(true);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="start" className="lead-hub">
      <div className="lead-hub__glow" aria-hidden="true" />
      <div className="lead-hub__card lead-hub__card--hero" data-reveal>
        <span className="card-accent-ribbon">פנייה אישית</span>
        <h3 className="lead-hub__title">{content.close.ready}</h3>
        <p className="lead-hub__lead">{content.close.readyLead}</p>
        <form className="lead-form" onSubmit={onSubmit}>
          <label>
            <span>{content.close.fields.name}</span>
            <input name="name" type="text" required autoComplete="name" />
          </label>
          <label>
            <span>{content.close.fields.phone}</span>
            <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
          </label>
          <label>
            <span>{content.close.fields.email}</span>
            <input name="email" type="email" required autoComplete="email" inputMode="email" />
          </label>
          <fieldset>
            <legend>{content.close.fields.topic}</legend>
            <div className="lead-form__topics">
              {content.close.topics.map((topic, i) => (
                <label key={topic} className="lead-form__radio">
                  <input type="radio" name="topic" value={topic} required defaultChecked={i === 0} />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="lead-form__send">
            {sent ? content.close.sent : content.close.send}
          </button>
        </form>
        <div className="lead-hub__alts">
          <a href={content.whatsappHref} target="_blank" rel="noopener noreferrer" className="hs-hero__btn hs-hero__btn--wa">
            {content.cta} בוואטסאפ
          </a>
          <a href={content.phoneHref} className="hs-hero__btn hs-hero__btn--tel">
            להתקשר {content.phoneDisplay}
          </a>
        </div>
        <p className="mt-4 text-caption text-ink-soft">{content.ctaAfter}</p>
      </div>
    </div>
  );
}
