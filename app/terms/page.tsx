import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: "תנאי שימוש · הבית השלם",
  description: "תנאי השימוש באתר הבית השלם של מיכאל מרום.",
};

export default function TermsPage() {
  return (
    <LegalPage title={content.legal.terms} updated="3 באוקטובר 2026">
      <p>
        השימוש באתר «הבית השלם» מהווה הסכמה לתנאים אלה. האתר מציג מידע על הקליניקה של {content.person}{" "}
        בראש העין. הוא אינו תחליף לאבחון, לייעוץ רפואי או לשיחת היכרות.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">השירות</h2>
      <p>
        פנייה דרך האתר, הטלפון או הוואטסאפ היא בקשה לשיחת היכרות. אין התחייבות לתחילת טיפול, ואין
        מחיר קבוע באתר. תנאי הטיפול, המועדים והתשלום נקבעים בשיחה, אם שני הצדדים בוחרים להמשיך.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">תוכן האתר</h2>
      <p>
        הטקסטים, התמונות והסימנים באתר שייכים לקליניקה או משמשים בהרשאה. אין להעתיק את האתר
        לשימוש מסחרי בלי אישור מראש. אין באתר המלצות מטופלים מומצאות, ואין הבטחה לתוצאה מסוימת.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">אחריות</h2>
      <p>
        האתר ניתן כפי שהוא. ייתכנו הפסקות זמניות או הבדלים בין דפדפנים. הקליניקה לא אחראית
        לשימוש באתר בניגוד לייעודו, או לתוכן באתרים שאליהם מובילים קישורים חיצוניים.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">יצירת קשר</h2>
      <p>
        {content.person} · {content.phoneDisplay} ·{" "}
        <a className="text-accent underline underline-offset-4" href={content.whatsappHref}>
          וואטסאפ
        </a>
      </p>
    </LegalPage>
  );
}
