import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/lib/articles";
import { serviceAreas, services, siteConfig, stats } from "@/lib/site-config";
import ScrollReveal from "@/components/ScrollReveal";
import StatCounter from "@/components/StatCounter";
import {
  AlarmClockIcon,
  BadgeCheckIcon,
  ClockIcon,
  DoorOpenIcon,
  KeyRoundIcon,
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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink to-surface text-cream">
        <div
          className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_20%,var(--gold),transparent_35%),radial-gradient(circle_at_85%_70%,white,transparent_40%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-28">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight max-w-3xl">
            {siteConfig.name} — מנעולן מקצועי בשירותך 24/7
          </h1>
          <p className="mt-5 text-lg text-cream/80 max-w-xl leading-relaxed">
            {siteConfig.subTagline}
          </p>
          <p className="mt-6 text-sm text-cream/60">{siteConfig.hoursLong}</p>
        </div>
      </section>

      {/* Stats strip with counters */}
      <section className="bg-surface text-cream border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
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

      {/* Services overview */}
      <section className="bg-ivory border-b border-charcoal/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">השירותים שלנו</h2>
                <p className="mt-2 text-charcoal/70 max-w-xl">
                  מענה מקצועי לכל צורך מנעולנות — מקריאת חירום דחופה ועד שדרוג מערכת הנעילה בבית או בעסק.
                </p>
              </div>
              <Link href="/services" className="text-gold-dark font-semibold hover:underline shrink-0">
                לכל השירותים ←
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.slug];
              return (
                <ScrollReveal key={s.slug} delay={i * 80}>
                  <div className="group h-full flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5 hover:shadow-xl hover:-translate-y-1 transition-all">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-bold text-lg text-charcoal">{s.name}</h3>
                    <p className="mt-2 text-sm text-charcoal/70 leading-relaxed flex-1">{s.short}</p>
                    <Link
                      href={`/services#${s.slug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark group-hover:text-gold transition-colors"
                    >
                      לפרטים ←
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-cream">למה לבחור באופק מנעולים</h2>
            <p className="mt-2 text-cream/60 max-w-xl">
              חמש סיבות שבזכותן לקוחות חוזרים אלינו ומפנים אותנו הלאה.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-xl bg-surface p-6 ring-1 ring-white/5 hover:ring-gold/30 transition-all">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-cream">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-cream/65 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">מה הלקוחות שלנו אומרים</h2>
            <p className="mt-2 text-charcoal/70 max-w-xl">
              שירות הוא לא סיסמה — הוא מה שלקוחות חווים כשהם הכי זקוקים לו.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="h-full rounded-xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5">
                  <div className="flex gap-1 text-gold" aria-hidden>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <StarIcon key={idx} className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-charcoal/80 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <p className="mt-5 font-bold text-charcoal">{t.name}</p>
                  <p className="text-xs text-muted">{t.city}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="bg-ivory border-t border-charcoal/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-14 sm:pb-20">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">אזורי שירות</h2>
            <p className="mt-2 text-charcoal/70 max-w-xl">
              אנחנו זמינים עבורכם בכל האזורים הבאים, עם הגעה מהירה לכל כתובת:
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {serviceAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="rounded-full bg-white ring-1 ring-charcoal/10 px-5 py-2.5 text-sm font-semibold text-charcoal hover:ring-gold hover:text-gold-dark hover:shadow-md transition-all"
                >
                  מנעולן ב{a.name}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles teaser */}
      <section className="bg-ink text-cream border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-cream">מהמדריכים שלנו</h2>
                <p className="mt-2 text-cream/60 max-w-xl">
                  טיפים והסברים מקצועיים שיעזרו לכם לדעת מה לעשות — לפני שמתעורר צורך דחוף.
                </p>
              </div>
              <Link href="/articles" className="text-gold font-semibold hover:underline shrink-0">
                לכל המאמרים ←
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[...articles]
              .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
              .slice(0, 3)
              .map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 80}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group flex h-full flex-col rounded-xl bg-surface p-6 ring-1 ring-white/5 hover:ring-gold/30 transition-all"
                  >
                    <span className="inline-block w-fit rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                      {article.category}
                    </span>
                    <h3 className="mt-3 font-bold text-cream leading-snug group-hover:text-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-cream/65 leading-relaxed flex-1">{article.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-cream/50">
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
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-ink text-cream">
        <div
          className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_80%_30%,var(--gold),transparent_40%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-4xl font-extrabold">נעולים בחוץ? צריכים מנעולן עכשיו?</h2>
            <p className="mt-4 text-cream/75 max-w-xl mx-auto leading-relaxed">
              {siteConfig.tagline}. הרימו טלפון — אנחנו עונים בעצמנו ויוצאים אליכם לדרך מיד.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg font-bold text-ink shadow-lg shadow-gold/30 hover:bg-gold-dark hover:scale-[1.02] transition-all"
              >
                <PhoneIcon className="h-5 w-5" />
                חייגו עכשיו: {siteConfig.phoneDisplay}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
