"use client";

import { useState } from "react";
import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function AssessmentWidget() {
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

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const waText = `${content.assessment.waIntro} ${answers.map((a, i) => `${questions[i].q}: ${a}`).join(". ")}`;
  const waHref = `https://wa.me/972543534973?text=${encodeURIComponent(waText)}`;

  return (
    <section id="assessment" className="assess px-5 py-14 sm:px-6 lg:px-16 lg:py-20">
      <div className="assess__card mx-auto max-w-xl" data-reveal>
        <h2 className="text-h2 text-center">
          <AccentLead text={content.assessment.title} />
        </h2>
        <p className="mt-3 text-center text-body text-ink-soft">{content.assessment.lead}</p>

        {!done ? (
          <div className="assess__step">
            <p className="assess__progress">
              {step + 1} / {questions.length}
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
          <div className="assess__done">
            <p className="assess__result">{content.assessment.result}</p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="assess__wa cta-mint">
              {content.assessment.cta}
            </a>
            <button type="button" className="assess__again" onClick={reset}>
              {content.assessment.again}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
