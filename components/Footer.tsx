import Link from "next/link";
import { articles } from "@/lib/articles";
import { serviceAreas, services, siteConfig } from "@/lib/site-config";
import { BadgeCheckIcon, ClockIcon, PhoneIcon, WhatsappIcon } from "./icons";

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
    <footer className="bg-ink text-cream mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <h2 className="text-lg font-extrabold text-cream">{siteConfig.name}</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">{siteConfig.tagline}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
            <BadgeCheckIcon className="h-4 w-4" />
            {siteConfig.licenseLine}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">שירותים</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="text-muted hover:text-cream transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">מאמרים</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {featuredArticles.map((a) => (
              <li key={a.slug}>
                <Link href={`/articles/${a.slug}`} className="text-muted hover:text-cream transition-colors">
                  {a.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/articles" className="font-semibold text-gold hover:text-gold-dark transition-colors">
                לכל המאמרים ←
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">אזורי שירות</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {serviceAreas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="text-muted hover:text-cream transition-colors">
                  מנעולן ב{a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gold">יצירת קשר</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 text-muted hover:text-cream transition-colors">
                <PhoneIcon className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted hover:text-[#25D366] transition-colors"
              >
                <WhatsappIcon className="h-4 w-4" />
                ווטסאפ
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-muted">
              <ClockIcon className="h-4 w-4" />
              {siteConfig.hoursShort}
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
