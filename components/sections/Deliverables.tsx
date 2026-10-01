import { content } from "@/content";

/*
1. איפה הקורא: מעשי, רוצה לדעת מה יוצאים איתו.
2. כן אבל: רשימת פיצ'רים משעממת.
3. כותרת דביקה, רשימת תוצאות, אפס תנועה.
4. ביציאה: ברור.
5. זיכרון: פריט אחד מהרשימה.
*/

export function Deliverables() {
  return (
    <section className="px-6 py-[88px] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-16 lg:py-[140px]">
      <h2 className="mb-12 max-w-measure text-h2 lg:sticky lg:top-[10vh] lg:mb-0 lg:self-start">
        {content.deliverables.title}
      </h2>
      <ul className="space-y-10">
        {content.deliverables.items.map((item) => (
          <li key={item.result} className="max-w-measure border-t border-ink/10 pt-6">
            <p className="text-lead">{item.result}</p>
            <p className="mt-2 text-caption text-ink-soft">({item.part})</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
