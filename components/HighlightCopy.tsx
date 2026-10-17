import { Fragment, type ReactNode } from "react";

const PHRASES: { text: string; className: string }[] = [
  { text: "מיכאל מרום", className: "copy-accent copy-accent--olive" },
  { text: "מטפל בכיר", className: "copy-accent copy-accent--olive" },
  { text: "מטפל זוגי", className: "copy-accent copy-accent--olive" },
  { text: "מטפל בכיר זוגי ורגשי", className: "copy-accent copy-accent--olive" },
  { text: "שיטות טיפול", className: "copy-accent copy-accent--olive" },
  { text: "ארגז הכלים", className: "copy-accent copy-accent--olive" },
];

export function HighlightCopy({ text }: { text: string }) {
  if (!text) return null;

  const sorted = [...PHRASES].sort((a, b) => b.text.length - a.text.length);
  let parts: ReactNode[] = [text];

  for (const phrase of sorted) {
    const next: ReactNode[] = [];
    for (const part of parts) {
      if (typeof part !== "string") {
        next.push(part);
        continue;
      }
      const chunks = part.split(phrase.text);
      if (chunks.length === 1) {
        next.push(part);
        continue;
      }
      chunks.forEach((chunk, i) => {
        if (chunk) next.push(chunk);
        if (i < chunks.length - 1) {
          next.push(
            <span key={`${phrase.text}-${i}-${chunk.length}`} className={phrase.className}>
              {phrase.text}
            </span>,
          );
        }
      });
    }
    parts = next;
  }

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
