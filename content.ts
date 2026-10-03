import { asset } from "@/lib/asset";

export const content = {
  brand: "הבית השלם",
  person: "מיכאל מרום",
  phoneDisplay: "054-353-4973",
  phoneHref: "tel:0543534973",
  whatsappHref: "https://wa.me/972543534973?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%9E%D7%99%D7%9B%D7%90%D7%9C%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%99%D7%9B%D7%A8%D7%95%D7%AA",
  cta: "שיחת היכרות",
  ctaSecondary: "המסלולים",
  ctaAfter: "שיחה קצרה. בלי טופס.",

  hero: {
    titleLines: ["חוזרים לקרבה שהייתה", "לפני שהשיחות נשברו"],
    glowWords: ["לקרבה", "נשברו"],
    trust: "13 שנים · ראש העין",
    mediaAlt: "חדר טיפול שקט: אדם יושב ורושם במחברת באור רך",
    mediaDesktop: asset("/images/hero-desktop.jpg"),
    mediaMobile: asset("/images/hero-mobile.jpg"),
  },

  pain: {
    title: "מה קורה בבית",
    cards: [
      {
        title: "השיחה נשברת",
        image: asset("/images/pain-break.jpg"),
        alt: "זוג יושב רחוק על ספה בערב",
      },
      {
        title: "האהבה עדיין שם",
        image: asset("/images/pain-love.jpg"),
        alt: "שתי ידיים כמעט נוגעות",
      },
      {
        title: "הבית לא בית",
        image: asset("/images/pain-home.jpg"),
        alt: "מטבח ריק בלילה",
      },
    ],
  },

  failed: {
    title: "מה כבר ניסיתם",
    cards: [
      { n: "01", title: "אותה שיחה במעגל", hint: "המילים השתנו. הדפוס נשאר." },
      { n: "02", title: "זמן בלי תזוזה", hint: "נתתם לזה זמן. דבר לא זז." },
      { n: "03", title: "מאמץ שהפך ללחץ", hint: "התאמצתם יותר. הבית רק הכביד." },
      { n: "04", title: "טיפול שנשאר שיחה", hint: "בחדר היה נעים. בבית חזר המעגל." },
    ],
    remain: "נשאר השורש.",
  },

  mechanism: {
    kicker: "העבודה",
    title: "ארבעה מהלכים",
    steps: [
      {
        title: "הלולאה",
        body: "הדפוס שחוזר. ברגע שהוא נראה, אפשר לעצור אותו.",
        image: asset("/images/mechanism-loop.jpg"),
        alt: "זוג על ספה בערב",
      },
      {
        title: "השורש",
        body: "מה שמפעיל את הגוף לפני שהמשפט יוצא.",
        image: asset("/images/mechanism-depth.jpg"),
        alt: "רגע שקט בחדר טיפול",
      },
      {
        title: "התרגול",
        body: "תגובה חדשה שעומדת גם כשזה בוער.",
        image: asset("/images/mechanism-practice.jpg"),
        alt: "שתי כורסאות בחדר טיפול",
      },
      {
        title: "הבית",
        body: "משימה אחת לשבוע. מה שעובד בחדר חייב לעמוד במטבח.",
        image: asset("/images/mechanism-home.jpg"),
        alt: "מטבח ביתי בערב",
      },
    ],
  },

  proof: {
    title: "מה שיש ביד",
    statValue: 13,
    statLabel: "שנות קליניקה",
    note: "המלצות ייכנסו כשיהיו ביד.",
  },

  credentials: {
    title: "הסמכות",
    items: [
      { src: asset("/images/cert-01.jpg"), alt: "תעודת עזרה ראשונה נפשית" },
      { src: asset("/images/cert-02.jpg"), alt: "תעודת קורס TDA" },
      { src: asset("/images/cert-03.jpg"), alt: "תעודת TFT" },
      { src: asset("/images/cert-04.jpg"), alt: "תעודת הכשרת יועצים זוגיים" },
      { src: asset("/images/cert-05.jpg"), alt: "תעודת השתתפות בקורס" },
      { src: asset("/images/cert-06.jpg"), alt: "תעודת TAT" },
      { src: asset("/images/cert-07.jpg"), alt: "תעודת NLPP טריינר" },
      { src: asset("/images/cert-08.jpg"), alt: "תעודת הסמכה" },
      { src: asset("/images/cert-09.jpg"), alt: "תעודת מאסטר NLP רפואי" },
      { src: asset("/images/cert-10.jpg"), alt: "תעודת הדרכת נישואין" },
    ],
  },

  quotes: {
    title: "מה שנשאר",
    items: [
      "על השורש.",
      "לא על הוויכוח האחרון.",
      "תגובה חדשה שעומדת.",
    ],
  },

  deliverables: {
    title: "מה יוצאים איתו",
    cards: [
      {
        title: "טיפול זוגי",
        result: "שיחה שלא נשברת תוך דקה",
        part: "זוגיות",
        image: asset("/images/treatment-couple.jpg"),
        alt: "זוג יושב קרוב על ספה",
      },
      {
        title: "טיפול אישי",
        result: "שקט שיוצא מהחדר",
        part: "רגשי",
        image: asset("/images/treatment-calm.jpg"),
        alt: "כורסה ליד חלון",
      },
      {
        title: "עבודה על השורש",
        result: "תגובה אחרת ברגע הבריחה",
        part: "השורש",
        image: asset("/images/treatment-root.jpg"),
        alt: "שורשי עץ אוחזים באדמה",
        immersive: true,
      },
    ],
    extra: {
      result: "משימה אחת לבית",
      part: "בין המפגשים",
    },
  },

  path: {
    kicker: "העבודה",
    title: "איך זה מתחיל ונגמר",
    workTitle: "המסלולים",
    steps: [
      {
        n: "01",
        title: "כותבים. או מתקשרים.",
        body: "מיפוי ראשוני של מה שכואב עכשיו.",
        time: "היכרות, היום או מחר",
        image: asset("/images/start-write.jpg"),
        alt: "שולחן קליניקה: פנקס, עט וטלפון ליצירת קשר",
      },
      {
        n: "02",
        title: "מגיעים. או אונליין.",
        body: "מסלול זוגי, אישי, או שניהם. עובדים על הלולאה, לא על עוד ויכוח.",
        time: "המפגש הראשון בתיאום קרוב",
        image: asset("/images/start-clinic.jpg"),
        alt: "שתי כורסאות זו מול זו בחדר טיפול שקט",
      },
      {
        n: "03",
        title: "הבית השלם מחדש",
        body: "דבר אחד בבית. חזרה לקרבה שהייתה לפני שהשיחות נשברו.",
        time: "בקצב שאפשר לעמוד בו",
        image: asset("/images/start-home.jpg"),
        alt: "שולחן מטבח בערב, מחברת ושני ספלים, תרגול בבית",
      },
    ],
  },

  journey: {
    kicker: "העבודה",
    title: "עשרה מהלכים",
    steps: [
      {
        n: "01",
        title: "כותבים או מתקשרים",
        body: "מיפוי ראשוני של מה שכואב עכשיו. היכרות היום או מחר.",
        image: asset("/images/start-write.jpg"),
        alt: "שולחן קליניקה: פנקס, עט וטלפון ליצירת קשר",
      },
      {
        n: "02",
        title: "שוברים את הלופ",
        body: "הרגע שבו השיחות הפכו לשידור חוזר בלי פתרון.",
        image: asset("/images/mechanism-loop.jpg"),
        alt: "זוג על ספה בערב",
      },
      {
        n: "03",
        title: "זמן בלי תזוזה",
        body: "נתתם לזה זמן. דבר לא זז.",
        image: asset("/images/pain-home.jpg"),
        alt: "מטבח ריק בלילה",
      },
      {
        n: "04",
        title: "מאמץ שהפך ללחץ",
        body: "התאמצתם יותר. הבית רק הכביד.",
        image: asset("/images/pain-break.jpg"),
        alt: "זוג יושב רחוק על ספה בערב",
      },
      {
        n: "05",
        title: "נשאר השורש",
        body: "מה שמפעיל את הגוף לפני שהמילים יוצאות.",
        image: asset("/images/mechanism-depth.jpg"),
        alt: "רגע שקט בחדר טיפול",
      },
      {
        n: "06",
        title: "התרגול החדש",
        body: "תגובה אחרת שעומדת גם כשזה בוער.",
        image: asset("/images/mechanism-practice.jpg"),
        alt: "שתי כורסאות בחדר טיפול",
      },
      {
        n: "07",
        title: "מפגש ראשון",
        body: "קליניקה או אונליין. מסלול זוגי, אישי, או שניהם.",
        image: asset("/images/start-clinic.jpg"),
        alt: "שתי כורסאות זו מול זו בחדר טיפול שקט",
      },
      {
        n: "08",
        title: "פירוק המוקשים",
        body: "עבודה על נקודות החיכוך בלי ליפול לעוד ויכוח.",
        image: asset("/images/treatment-couple.jpg"),
        alt: "זוג יושב קרוב על ספה",
      },
      {
        n: "09",
        title: "בניית שפה משותפת",
        body: "מרחב שבו אפשר לדבר ולהישמע בקצב שמתאים לשניהם.",
        image: asset("/images/pain-love.jpg"),
        alt: "שתי ידיים כמעט נוגעות",
      },
      {
        n: "10",
        title: "הבית השלם מחדש",
        body: "חזרה לקרבה שהייתה לפני שהשיחות נשברו.",
        image: asset("/images/start-home.jpg"),
        alt: "שולחן מטבח בערב, מחברת ושני ספלים, תרגול בבית",
      },
    ],
  },

  start: {
    title: "איך זה מתחיל",
    steps: [
      {
        n: "01",
        you: "כותבים. או מתקשרים.",
        me: "אני ממפה מה כואב עכשיו.",
        time: "היכרות, היום או מחר",
        image: asset("/images/start-write.jpg"),
        alt: "שולחן קליניקה: פנקס, עט וטלפון ליצירת קשר",
      },
      {
        n: "02",
        you: "מגיעים. או אונליין.",
        me: "מתאים מסלול זוגי, אישי, או שניהם.",
        time: "המפגש הראשון בתיאום קרוב",
        image: asset("/images/start-clinic.jpg"),
        alt: "שתי כורסאות זו מול זו בחדר טיפול שקט",
      },
      {
        n: "03",
        you: "דבר אחד בבית.",
        me: "עובדים על הלולאה. לא על עוד ויכוח.",
        time: "בקצב שאפשר לעמוד בו",
        image: asset("/images/start-home.jpg"),
        alt: "שולחן מטבח בערב, מחברת ושני ספלים, תרגול בבית",
      },
    ],
  },

  objections: {
    title: "מה עוצרים עליו",
    items: [
      {
        q: "זה נשמע יקר",
        a: "אין מחיר באתר. בשיחה תשמעו מספר. אם זה לא מתאים, תגידו לא.",
      },
      {
        q: "אין לי זמן",
        a: "מפגש אחד בכל פעם. משימה קטנה לבית. הקצב מותאם למי שאין לו שבוע פנוי.",
      },
      {
        q: "בן הזוג לא יבוא",
        a: "אפשר להתחיל לבד. הרבה פעמים הצד השני מצטרף כשהוא רואה שזה לא האשמה.",
      },
      {
        q: "כבר היינו בטיפול",
        a: "לא חוזרים על עוד שיחה על הוויכוח. עובדים על הלולאה שמייצרת אותו.",
      },
      {
        q: "אני לא רוצה שיידעו",
        a: "דיסקרטיות מלאה. מה שנאמר בחדר נשאר בחדר.",
      },
    ],
  },

  close: {
    titleLines: ["חוזרים לקרבה", "שלפני השבר"],
  },

  footer: "© 2026 הבית השלם · מיכאל מרום",
  legal: {
    privacy: "מדיניות פרטיות",
    terms: "תנאי שימוש",
    cookies: "הודעת קוקיז",
    clinic: "קליניקה בראש העין",
    acceptCookies: "הבנתי",
    cookieBanner: "קוקיז הכרחיים בלבד. פירוט בהודעת הקוקיז.",
  },
} as const;
