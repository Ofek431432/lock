import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { serviceAreas, siteConfig, stats } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import StatCounter from "@/components/StatCounter";
import {
  BadgeCheckIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
} from "@/components/icons";

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
    title: `מקצועיות ו-${siteConfig.yearsExperience} שנות ניסיון`,
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

      <section className="hero-lux text-cream">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold text-gold ring-1 ring-gold/25 backdrop-blur-sm">
            <BadgeCheckIcon className="h-4 w-4" />
            {siteConfig.licenseLine} · {siteConfig.yearsExperience} שנות ניסיון
          </p>
          <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold leading-tight">
            מי <span className="gold-text">אנחנו</span>
          </h1>
          <p className="mt-5 text-lg text-cream/75 leading-relaxed max-w-2xl">
            {siteConfig.name} הוא שירות מנעולנות מקצועי שפועל באזור חיפה, הקריות, נשר, עתלית וטירת כרמל —
            עם {siteConfig.yearsExperience} שנות ניסיון, {siteConfig.licenseLine.toLowerCase()}, ומחויבות
            לאמינות, מהירות ושירות אישי.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-surface text-cream border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 text-center">
            {stats.map((s, i) => (
              <ScrollReveal
                key={s.label}
                delay={i * 100}
                className="px-4 border-s border-white/10 first:border-s-0 max-lg:[&:nth-child(3)]:border-s-0"
              >
                <p className="gold-text tabular text-4xl sm:text-5xl font-extrabold">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2.5 text-sm text-cream/65">{s.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-charcoal/10 p-7 sm:p-10 shadow-sm">
              <div className="hairline-gold absolute top-0 inset-x-0" aria-hidden />
              <p className="eyebrow">הסיפור שלנו</p>
              <h2 className="mt-3 text-2xl font-bold text-charcoal">מנעולנות שאפשר לסמוך עליה</h2>
              <p className="mt-4 text-charcoal/75 leading-relaxed">
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
              <ScrollReveal key={v.title} delay={i * 80} className="h-full">
                <div className="card-lift h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 shadow-sm">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 ring-1 ring-gold/20 text-gold-dark">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-bold text-charcoal">{v.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{v.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-ink text-cream p-7 sm:p-10">
              <div
                className="absolute inset-0 opacity-60 [background-image:radial-gradient(ellipse_50%_70%_at_85%_10%,rgba(226,167,46,0.1),transparent_60%)]"
                aria-hidden
              />
              <div className="relative">
                <h2 className="text-2xl font-bold">אזורי השירות שלנו</h2>
                <p className="mt-2 text-cream/70 max-w-2xl leading-relaxed">
                  אנחנו זמינים עבור תושבים ועסקים בכל האזורים הבאים, עם הגעה מהירה לכל כתובת:
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {serviceAreas.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/areas/${a.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-2 text-sm font-semibold text-cream/90 hover:ring-gold/50 hover:bg-gold/10 hover:text-gold-light transition-all"
                    >
                      <MapPinIcon className="h-3.5 w-3.5 text-gold" />
                      מנעולן ב{a.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative mt-10 overflow-hidden rounded-3xl bg-white ring-1 ring-charcoal/10 p-7 sm:p-10 text-center shadow-sm">
              <div className="hairline-gold absolute top-0 inset-x-0" aria-hidden />
              <h2 className="text-2xl font-bold text-charcoal">רוצים לדבר איתנו?</h2>
              <p className="mt-2 text-charcoal/70">נשמח לעזור — בכל שעה, בכל יום.</p>
              <a
                href={siteConfig.phoneHref}
                className="btn-lux mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold text-ink"
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
