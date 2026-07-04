import Link from "next/link";
import { articles } from "@/lib/articles";
import { serviceAreas, services, siteConfig } from "@/lib/site-config";
import { BadgeCheckIcon, ClockIcon, KeyholeIcon, PhoneIcon } from "./icons";

const footerArticleSlugs = [
  "locked-out-of-home-guide",
  "locksmith-cost-haifa",
  "signs-your-lock-is-not-secure",
  "when-to-call-emergency-locksmith",
];

export default function Footer() {
  const year = new Date().getFullYear();
  const featuredArticles = footerArticleSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <footer className="relative bg-ink text-cream">
      <div className="hairline-gold absolute top-0 inset-x-0" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light via-gold to-gold-dark text-ink shadow-md shadow-gold/25">
              <KeyholeIcon className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-extrabold text-cream">{siteConfig.name}</h2>
          </div>
          <p className="mt-4 text-sm text-muted leading-relaxed">{siteConfig.tagline}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
            <BadgeCheckIcon className="h-4 w-4" />
            {siteConfig.licenseLine}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider text-gold">שירותים</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="text-muted hover:text-gold-light transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider text-gold">מאמרים</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {featuredArticles.map((a) => (
              <li key={a.slug}>
                <Link href={`/articles/${a.slug}`} className="text-muted hover:text-gold-light transition-colors">
                  {a.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/articles" className="font-semibold text-gold hover:text-gold-light transition-colors">
                לכל המאמרים ←
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider text-gold">אזורי שירות</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceAreas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="text-muted hover:text-gold-light transition-colors">
                  מנעולן ב{a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wider text-gold">יצירת קשר</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="btn-lux inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-ink"
              >
                <PhoneIcon className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-muted">
              <ClockIcon className="h-4 w-4 text-gold/70" />
              {siteConfig.hoursShort}
            </li>
            <li className="inline-flex items-center gap-2 text-muted">
              <span className="pulse-dot" aria-hidden />
              מענה אנושי ישיר — גם עכשיו
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <p>© {year} {siteConfig.name}. כל הזכויות שמורות. {siteConfig.licenseLine}.</p>
          <p>שירות מנעולנות מקצועי בחיפה, קריות, נשר, עתלית וטירת כרמל</p>
        </div>
      </div>
    </footer>
  );
}
