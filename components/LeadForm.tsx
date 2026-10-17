"use client";

import { FormEvent, useState } from "react";
import { content } from "@/content";

export function LeadForm() {
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questions = content.assessment.questions;
  const done = step >= questions.length;
  const q = questions[step];

  const choose = (value: string) => {
    const next = [...answers, value];
    setAnswers(next);
    if (step + 1 >= questions.length) setStep(questions.length);
    else setStep(step + 1);
  };

  const resetAssessment = () => {
    setStep(0);
    setAnswers([]);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const assessment = answers.map((a, i) => `${questions[i].q}: ${a}`).join(". ");
    const text = `שלום מיכאל, ${name}. טלפון: ${phone}. שאלון התאמה: ${assessment}`;
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

        <div className="lead-steps" aria-label="תהליך יצירת קשר">
          <span className={`lead-steps__item ${!done ? "is-on" : ""}`}>01 שאלון התאמה</span>
          <span className={`lead-steps__item ${done ? "is-on" : ""}`}>02 פרטים לחזרה</span>
        </div>

        <div id="assessment" className="lead-hub__assessment">
          {!done ? (
            <div className="assess__step lead-step-panel">
              <h4>{content.assessment.title}</h4>
              <p>{content.assessment.lead}</p>
              <p className="assess__progress">
                שאלה {step + 1} מתוך {questions.length}
              </p>
              <p className="assess__q">{q.q}</p>
              <div className="assess__opts">
                {q.options.map((opt) => (
                  <button key={opt} type="button" className="assess__opt" onClick={() => choose(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form className="lead-form lead-step-panel" onSubmit={onSubmit}>
              <h4>פרטים לחזרה</h4>
              <p className="assess__result">{content.assessment.result}</p>
              <label>
                <span>{content.close.fields.name}</span>
                <input name="name" type="text" required autoComplete="name" />
              </label>
              <label>
                <span>{content.close.fields.phone}</span>
                <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
              </label>
              <button type="submit" className="lead-form__send">
                {sent ? content.close.sent : content.close.send}
              </button>
              <button type="button" className="assess__again" onClick={resetAssessment}>
                {content.assessment.again}
              </button>
            </form>
          )}
        </div>
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
