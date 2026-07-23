import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/lib/articles";
import { serviceAreas, services, siteConfig, stats } from "@/lib/site-config";
import ScrollReveal from "@/components/ScrollReveal";
import StatCounter from "@/components/StatCounter";
import {
  AlarmClockIcon,
  BadgeCheckIcon,
  CheckIcon,
  ClockIcon,
  DoorOpenIcon,
  KeyRoundIcon,
  KeyholeIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
  ZapIcon,
  type IconComponent,
} from "@/components/icons";

export const metadata: Metadata = {
  title: `${siteConfig.name} — מנעולן בחיפה והקריות, זמין 24/7`,
  description: `מנעולן מקצועי ואמין בחיפה, קריות, נשר, עתלית וטירת כרמל. פריצת דלתות, החלפת מנעולים, כספות לעסקים ושירות חירום 24/7. ${siteConfig.hoursLong}. התקשרו: ${siteConfig.phoneDisplay}`,
  keywords: [
    "מנעולן בחיפה",
    "מנעולן 24 שעות",
    "מנעולן חירום",
    "החלפת מנעול בדירה",
    "מנעולן לעסקים",
    "פתיחת דלתות בחיפה",
  ],
  alternates: { canonical: "/" },
};

const serviceIcons: Record<string, IconComponent> = {
  "break-in-opening": DoorOpenIcon,
  "lock-replacement": KeyRoundIcon,
  "safes-business": ShieldCheckIcon,
  emergency: AlarmClockIcon,
};

const whyUs = [
  { icon: BadgeCheckIcon, title: `${siteConfig.yearsExperience} שנות ניסיון`, text: "ותק רב בתחום המנעולנות, עם ידע מעשי בכל סוגי המנעולים, הדלתות והכספות." },
  { icon: ShieldCheckIcon, title: siteConfig.licenseLine, text: "עבודה לפי הסטנדרטים המקצועיים בתחום, באחריות מלאה ובשקיפות מול הלקוח." },
  { icon: ZapIcon, title: `זמינות והגעה מהירה — עד ${siteConfig.arrivalMinutes} דקות`, text: "יציאה לדרך מיידית לכל קריאה באזור השירות, בכל שעה ביום או בלילה." },
  { icon: BadgeCheckIcon, title: "אחריות מלאה על העבודה", text: "כל עבודה מלווה באחריות ובמקצועיות — כדי שתרגישו בטוחים גם אחרי שסגרנו את הדלת מאחורינו." },
  { icon: UsersIcon, title: `מעל ${siteConfig.happyCustomers.toLocaleString("he-IL")} לקוחות מרוצים`, text: "אלפי קריאות לאורך השנים, ושורה ארוכה של לקוחות שממליצים עלינו הלאה." },
];

const testimonials = [
  {
    name: "דניאל כהן",
    city: "חיפה",
    text: "נעלתי את עצמי בחוץ באמצע הלילה והם הגיעו תוך פחות מחצי שעה. פתחו את הדלת בלי לשרוט אותה ובלי לגרום לי לשלם הון. שירות אדיב ומקצועי באמת.",
  },
  {
    name: "מירב לוי",
    city: "קריית ביאליק",
    text: "החליפו לי את כל המנעולים בבית אחרי שהארנק עם המפתחות נגנב. הסבירו בסבלנות על כל אפשרות, לא לחצו ונתנו מחיר הוגן. ממליצה בחום.",
  },
  {
    name: "יוסי מזרחי",
    city: "נשר",
    text: "ננעלתי מחוץ לרכב בחניון שומם בשעה מאוחרת. הגיעו מהר, היו רגועים ומקצועיים, ופתחו את הרכב בלי לפגוע בו. בדיוק השירות שרציתי שיגיע באותו רגע.",
  },
];

const heroChips = [
  { icon: BadgeCheckIcon, label: siteConfig.licenseLine },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-lux text-cream">
        <KeyholeIcon
          className="absolute -left-16 top-1/2 -translate-y-1/2 h-[26rem] w-[26rem] text-gold opacity-[0.05] pointer-events-none hidden lg:block"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.12] sm:leading-[1.08] max-w-3xl">
            מנעולן בחיפה והקריות —{" "}
            <span className="gold-text">{siteConfig.name}</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-cream/80 max-w-xl leading-relaxed">
            {siteConfig.subTagline}
          </p>
          <ul className="mt-9 flex flex-wrap items-center gap-x-3.5 gap-y-2.5 text-base sm:text-xl font-bold text-cream/95">
            {["החלפת מנעולים", "פריצת דלתות", "פתיחת רכבים", "כספות לעסקים", "ועוד"].map((s, i) => (
              <li key={s} className="flex items-center gap-x-3.5">
                {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />}
                {s}
              </li>
            ))}
          </ul>
          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {heroChips.map((chip) => (
              <li key={chip.label} className="inline-flex items-center gap-2 text-sm font-medium text-cream/70">
                <chip.icon className="h-4 w-4 text-gold" />
                {chip.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats strip with counters */}
      <section className="bg-surface text-cream border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
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

      {/* Services overview */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="eyebrow">מה אנחנו עושים</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-charcoal">השירותים שלנו</h2>
                <p className="mt-3 text-charcoal/70 max-w-xl leading-relaxed">
                  מענה מקצועי לכל צורך מנעולנות — מקריאת חירום דחופה ועד שדרוג מערכת הנעילה בבית או בעסק.
                </p>
              </div>
              <Link
                href="/services"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-charcoal/10 px-5 py-2.5 text-sm font-bold text-charcoal hover:ring-gold hover:text-gold-dark hover:shadow-md transition-all"
              >
                לכל השירותים ←
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.slug];
              return (
                <ScrollReveal key={s.slug} delay={i * 80} className="h-full">
                  <Link
                    href={`/services#${s.slug}`}
                    className="card-lift group relative h-full flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5 hover:ring-gold/40"
                  >
                    <span
                      className="absolute -top-2 left-4 text-6xl font-extrabold text-charcoal/[0.045] tabular select-none"
                      aria-hidden
                    >
                      0{i + 1}
                    </span>
                    <span className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 ring-1 ring-gold/20 text-gold-dark transition-all duration-300 group-hover:from-gold group-hover:to-gold-dark group-hover:text-ink group-hover:shadow-lg group-hover:shadow-gold/30">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-bold text-lg text-charcoal">{s.name}</h3>
                    <p className="mt-2 text-sm text-charcoal/70 leading-relaxed flex-1">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-gold-dark transition-transform duration-300 group-hover:-translate-x-1">
                      לפרטים ←
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative bg-ink text-cream overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(ellipse_50%_60%_at_85%_10%,rgba(226,167,46,0.09),transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <ScrollReveal>
            <p className="eyebrow eyebrow-dark">היתרון שלנו</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-cream">למה לבחור באופק מנעולים</h2>
            <p className="mt-3 text-cream/60 max-w-xl leading-relaxed">
              חמש סיבות שבזכותן לקוחות חוזרים אלינו ומפנים אותנו הלאה.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80} className="h-full">
                <div className="card-glass h-full rounded-2xl p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/25 text-gold">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-bold text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm text-cream/65 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing transparency */}
      <section className="bg-white border-b border-charcoal/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <ScrollReveal>
            <p className="eyebrow">שקיפות מלאה</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-charcoal">מחיר הוגן ושקוף — בלי הפתעות</h2>
            <p className="mt-4 text-charcoal/70 max-w-2xl leading-relaxed">
              אנחנו לא מאמינים בהפתעות בתשלום. לפני כל עבודה — נסביר מה הבעיה, מה הפתרון ומה העלות. מחיר הגעה ברור, מחיר עבודה ברור, ואין חיובים נסתרים.
            </p>
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { title: "מחיר הגעה קבוע", text: "דמי הגעה אחידים לכל קריאה — יודעים מראש, בלי הפתעות." },
              { title: "הצעת מחיר לפני העבודה", text: "לפני שמתחילים — מסבירים ומאשרים איתכם. לא מתחילים בלי אישור." },
              { title: "אחריות על כל עבודה", text: "כל החלפה, תיקון או פתיחה מגיעים עם אחריות מלאה על החלקים ועל ההתקנה." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80} className="h-full">
                <div className="card-lift h-full rounded-2xl bg-ivory ring-1 ring-charcoal/5 p-6">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/25 text-gold-dark">
                    <CheckIcon className="h-4.5 w-4.5" />
                  </span>
                  <p className="mt-4 font-bold text-charcoal">{item.title}</p>
                  <p className="mt-1.5 text-sm text-charcoal/70 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <ScrollReveal>
            <p className="eyebrow">לקוחות מספרים</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-charcoal">מה הלקוחות שלנו אומרים</h2>
            <p className="mt-3 text-charcoal/70 max-w-xl leading-relaxed">
              שירות הוא לא סיסמה — הוא מה שלקוחות חווים כשהם הכי זקוקים לו.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100} className="h-full">
                <figure className="card-lift relative h-full flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5">
                  <span
                    className="absolute top-3 left-5 font-heading text-7xl leading-none text-gold/15 select-none"
                    aria-hidden
                  >
                    ”
                  </span>
                  <div className="flex gap-1 text-gold" aria-label="5 כוכבים">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <StarIcon key={idx} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm text-charcoal/80 leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-ink font-bold text-sm shadow-md shadow-gold/25">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-bold text-charcoal text-sm">{t.name}</span>
                      <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted">
                        <MapPinIcon className="h-3 w-3" />
                        {t.city}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="bg-ivory border-t border-charcoal/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
          <ScrollReveal>
            <p className="eyebrow">איפה תמצאו אותנו</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-charcoal">אזורי שירות</h2>
            <p className="mt-3 text-charcoal/70 max-w-xl leading-relaxed">
              אנחנו זמינים עבורכם בכל האזורים הבאים, עם הגעה מהירה לכל כתובת:
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {serviceAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-charcoal/10 px-5 py-2.5 text-sm font-semibold text-charcoal hover:ring-gold hover:text-gold-dark hover:shadow-md transition-all"
                >
                  <MapPinIcon className="h-4 w-4 text-gold-dark" />
                  מנעולן ב{a.name}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles teaser */}
      <section className="relative bg-ink text-cream border-t border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(ellipse_45%_55%_at_10%_15%,rgba(226,167,46,0.08),transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="eyebrow eyebrow-dark">ידע מהשטח</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-cream">מהמדריכים שלנו</h2>
                <p className="mt-3 text-cream/60 max-w-xl leading-relaxed">
                  טיפים והסברים מקצועיים שיעזרו לכם לדעת מה לעשות — לפני שמתעורר צורך דחוף.
                </p>
              </div>
              <Link
                href="/articles"
                className="btn-ghost-dark shrink-0 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-cream"
              >
                לכל המאמרים ←
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[...articles]
              .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
              .slice(0, 3)
              .map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 80} className="h-full">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="card-glass group flex h-full flex-col rounded-2xl p-6"
                  >
                    <span className="inline-block w-fit rounded-full bg-gold/15 ring-1 ring-gold/25 px-3 py-1 text-xs font-semibold text-gold">
                      {article.category}
                    </span>
                    <h3 className="mt-4 font-bold text-cream leading-snug group-hover:text-gold-light transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-cream/60 leading-relaxed flex-1">{article.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-cream/50">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {article.readMinutes} דקות קריאה
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="hero-lux text-cream">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <ScrollReveal>
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light via-gold to-gold-dark text-ink shadow-xl shadow-gold/30">
              <KeyholeIcon className="h-8 w-8" />
            </span>
            <h2 className="mt-7 text-3xl sm:text-5xl font-extrabold leading-tight">
              נעולים בחוץ? <span className="gold-text">צריכים מנעולן עכשיו?</span>
            </h2>
            <p className="mt-5 text-cream/75 max-w-xl mx-auto leading-relaxed">
              {siteConfig.tagline}. הרימו טלפון — אנחנו עונים בעצמנו ויוצאים אליכם לדרך מיד.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={siteConfig.phoneHref}
                className="btn-lux inline-flex items-center gap-2.5 rounded-full px-9 py-4.5 text-lg font-extrabold text-ink"
              >
                <PhoneIcon className="h-5 w-5" />
                חייגו עכשיו: {siteConfig.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-cream/55">
              <span className="pulse-dot" aria-hidden />
              מענה אנושי ישיר · יציאה מיידית · {siteConfig.hoursShort}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
