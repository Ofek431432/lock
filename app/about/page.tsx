import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { serviceAreas, siteConfig, stats } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import StatCounter from "@/components/StatCounter";
import { BadgeCheckIcon, PhoneIcon, ShieldCheckIcon, UsersIcon, ZapIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "אודות — מי אנחנו",
  description: `קצת עלינו: ${siteConfig.name} הוא שירות מנעולנות מקצועי באזור חיפה, עם ${siteConfig.yearsExperience} שנות ניסיון, ${siteConfig.licenseLine} ומחויבות לאמינות, מהירות ושירות אישי.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: ShieldCheckIcon,
    title: "אמינות לפני הכול",
    text: "אנחנו מגיעים אליכם ברגע פגיע — דלת נעולה, רכב שלא נפתח, מצב חירום. בדיוק לכן חשוב לנו שתרגישו בטוחים איתנו לאורך כל הדרך, מהשיחה הראשונה ועד סיום העבודה.",
  },
  {
    icon: ZapIcon,
    title: "מהירות והגעה אמינה",
    text: `אנחנו זמינים ${siteConfig.hoursShort.toLowerCase()} ויוצאים לדרך מיד עם הקריאה — בדרך כלל מגיעים תוך כ-${siteConfig.arrivalMinutes} דקות לכל כתובת באזור השירות.`,
  },
  {
    icon: BadgeCheckIcon,
    title: "מקצועיות ו-13 שנות ניסיון",
    text: `${siteConfig.licenseLine}, עם ${siteConfig.yearsExperience} שנות ניסיון מעשי בתחום — ידע שמתורגם לפתרון נכון, מהיר ונקי לכל סוג של מנעול, דלת, רכב או כספת.`,
  },
  {
    icon: UsersIcon,
    title: "מחירים הוגנים ושקיפות מלאה",
    text: "לפני שמתחילים בעבודה אנחנו מסבירים מה הבעיה, מה הפתרון המוצע ומה העלות — כדי שתדעו בדיוק למה אתם משלמים, בלי הפתעות בסוף.",
  },
];

const breadcrumbJson = breadcrumbJsonLd([
  { name: "ראשי", path: "/" },
  { name: "אודות", path: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <Script
        id="breadcrumb-jsonld-about"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <section className="bg-gradient-to-b from-ink to-surface text-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold text-gold ring-1 ring-gold/20">
            <BadgeCheckIcon className="h-4 w-4" />
            {siteConfig.licenseLine} · {siteConfig.yearsExperience} שנות ניסיון
          </p>
          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold">מי אנחנו</h1>
          <p className="mt-4 text-lg text-cream/75 leading-relaxed max-w-2xl">
            {siteConfig.name} הוא שירות מנעולנות מקצועי שפועל באזור חיפה, הקריות, נשר, עתלית וטירת כרמל —
            עם {siteConfig.yearsExperience} שנות ניסיון, {siteConfig.licenseLine.toLowerCase()}, ומחויבות
            לאמינות, מהירות ושירות אישי.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-surface text-cream border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 100}>
                <p className="text-3xl sm:text-4xl font-extrabold text-gold">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm text-cream/70">{s.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
          <ScrollReveal>
            <div className="rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-charcoal">הסיפור שלנו</h2>
              <p className="mt-3 text-charcoal/75 leading-relaxed">
                {siteConfig.name} פועל כבר {siteConfig.yearsExperience} שנים מתוך רצון להעניק לתושבי חיפה
                והסביבה שירות מנעולנות שאפשר לסמוך עליו — כזה שמגיע מהר, מסביר בכנות מה המצב, ועושה את העבודה
                בצורה נקייה ומקצועית. כ{siteConfig.licenseLine.toLowerCase()}, יצאנו לדרך עם מטרה אחת ברורה:
                שכל קריאה — בין אם זו דלת שנסגרה בטעות בשעת בוקר מוקדמת, רכב שננעל עם מפתחות בפנים או כספת
                שצריך לפתוח בעסק — תיגמר באותה תחושה: שהיה שווה להתקשר דווקא אלינו. היום, אחרי מעל{" "}
                {siteConfig.happyCustomers.toLocaleString("he-IL")} לקוחות מרוצים, אנחנו ממשיכים לפעול לפי
                אותם ערכים בדיוק.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold-dark">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-charcoal">{v.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{v.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 rounded-2xl bg-ink text-cream p-6 sm:p-8">
              <h2 className="text-xl font-bold">אזורי השירות שלנו</h2>
              <p className="mt-2 text-cream/70 max-w-2xl">
                אנחנו זמינים עבור תושבים ועסקים בכל האזורים הבאים, עם הגעה מהירה לכל כתובת:
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {serviceAreas.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/areas/${a.slug}`}
                    className="rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-2 text-sm font-semibold text-cream/90 hover:bg-white/10 hover:text-gold transition-colors"
                  >
                    מנעולן ב{a.name}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-10 rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 sm:p-8 text-center">
              <h2 className="text-xl font-bold text-charcoal">רוצים לדבר איתנו?</h2>
              <p className="mt-2 text-charcoal/70">נשמח לעזור — בכל שעה, בכל יום.</p>
              <a
                href={siteConfig.phoneHref}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink shadow-md shadow-gold/30 hover:bg-gold-dark transition-colors"
              >
                <PhoneIcon className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
