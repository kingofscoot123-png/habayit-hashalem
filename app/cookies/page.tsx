import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: "הודעת קוקיז · הבית השלם",
  description: "אילו קוקיז האתר של הבית השלם משתמש בהם.",
};

export default function CookiesPage() {
  return (
    <LegalPage title={content.legal.cookies} updated="3 באוקטובר 2026">
      <p>
        קוקיז הם קבצים קטנים שנשמרים בדפדפן. באתר זה נעשה בהם שימוש מצומצם, כדי שההודעה בתחתית
        העמוד לא תופיע שוב אחרי שאישרתם אותה.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">קוקיז הכרחיים</h2>
      <p>
        נשמר מפתח מקומי בדפדפן בשם habayit-cookie-ok. הוא רק מסמן שהודעת הקוקיז נקראה. בלי זה
        ההודעה תופיע שוב בכניסה הבאה. אין כאן קוקיז פרסום מהאתר, ואין רשימת דיוור.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">צדדים מארחים</h2>
      <p>
        האתר עשוי להיות מתארח אצל ספקי תשתית כמו Vercel או GitHub Pages. ספקים אלה יכולים לרשום
        יומני גישה טכניים (כתובת IP, דפדפן, זמן) לצורך אבטחה ותפעול. זה לא מאגר מטופלים.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">שליטה</h2>
      <p>
        אפשר למחוק נתונים שמורים בדפדפן בכל עת דרך הגדרות הפרטיות. מחיקה תחזיר את הודעת הקוקיז.
        לשאלות: {content.phoneDisplay} או{" "}
        <a className="text-accent underline underline-offset-4" href={content.whatsappHref}>
          וואטסאפ
        </a>
        .
      </p>
    </LegalPage>
  );
}
