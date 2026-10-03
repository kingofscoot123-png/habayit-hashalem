import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { content } from "@/content";

export const metadata: Metadata = {
  title: "מדיניות פרטיות · הבית השלם",
  description: "איך הבית השלם ומיכאל מרום מתייחסים לפרטיות באתר ובקליניקה.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title={content.legal.privacy} updated="3 באוקטובר 2026">
      <p>
        מדיניות זו חלה על האתר של «הבית השלם» ועל יצירת קשר עם מיכאל מרום, קליניקה לטיפול זוגי
        ורגשי בראש העין. היא כתובה בעברית פשוטה, בלי להבטיח דברים שהאתר לא עושה בפועל.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">מה נאסף באתר</h2>
      <p>
        באתר אין טופס הרשמה ואין יצירת חשבון. אם פניתם בטלפון או בוואטסאפ, פרטי השיחה נשארים אצל
        הקליניקה לצורך מענה ותיאום, ולא מועלים לאתר.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">קוקיז</h2>
      <p>
        האתר שומר קוקיז הכרחיים כדי לזכור שקראתם את הודעת הקוקיז. אין כאן רשימת דיוור או פרסום
        צד שלישי מהאתר עצמו. פירוט נוסף בעמוד הודעת הקוקיז.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">דיסקרטיות טיפולית</h2>
      <p>
        תוכן מפגש, שמות מטופלים ופרטים רפואיים או זוגיים לא מתפרסמים באתר. מה שנאמר בחדר נשאר
        בחדר, בכפוף לחובות הדין כשיש חובת דיווח.
      </p>
      <h2 className="pt-2 text-xl font-bold text-ink">יצירת קשר</h2>
      <p>
        לשאלות על פרטיות: {content.person}, {content.phoneDisplay}, או{" "}
        <a className="text-accent underline underline-offset-4" href={content.whatsappHref}>
          וואטסאפ
        </a>
        . הקליניקה בראש העין.
      </p>
    </LegalPage>
  );
}
