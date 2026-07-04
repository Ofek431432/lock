import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { serviceAreas, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import { BadgeCheckIcon, ClockIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "צור קשר — התקשרו אלינו",
  description: `יצירת קשר עם ${siteConfig.name}: התקשרו ל-${siteConfig.phoneDisplay}. ${siteConfig.hoursLong}. ${siteConfig.licenseLine}, פעילים בחיפה, הקריות, נשר, עתלית וטירת כרמל.`,
  alternates: { canonical: "/contact" },
};

const breadcrumbJson = breadcrumbJsonLd([
  { name: "ראשי", path: "/" },
  { name: "צור קשר", path: "/contact" },
]);

export default function ContactPage() {
  return (
    <>
      <Script
        id="breadcrumb-jsonld-contact"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <section className="hero-lux text-cream">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <p className="eyebrow eyebrow-dark">כאן בשבילכם</p>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">
            צור <span className="gold-text">קשר</span>
          </h1>
          <p className="mt-5 text-lg text-cream/75 max-w-2xl leading-relaxed">
            הדרך הכי מהירה ליצור קשר — חיוג ישיר. אנחנו עונים בעצמנו, בכל שעה, ויוצאים אליכם לדרך מיד.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
          <ScrollReveal>
            <div className="hero-lux rounded-3xl text-cream p-8 sm:p-12 text-center shadow-xl">
              <div className="relative">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light via-gold to-gold-dark text-ink shadow-lg shadow-gold/30">
                  <PhoneIcon className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-2xl font-bold">חייגו עכשיו — מענה אנושי ישיר</h2>
                <p className="mt-2 text-cream/70">גם למקרי חירום דחופים, בכל שעה ביום ובלילה</p>
                <a
                  href={siteConfig.phoneHref}
                  className="btn-lux mt-7 inline-flex items-center gap-2.5 rounded-full px-10 py-4 text-xl font-extrabold text-ink tabular"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {siteConfig.phoneDisplay}
                </a>
                <p className="mt-5 inline-flex items-center justify-center gap-2 text-sm text-cream/55 w-full">
                  <span className="pulse-dot" aria-hidden />
                  זמינים עכשיו · יציאה מיידית לדרך
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <ScrollReveal delay={80} className="h-full">
              <div className="card-lift h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 ring-1 ring-gold/20 text-gold-dark">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-bold text-charcoal">שעות פעילות</h2>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{siteConfig.hoursLong}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-dark">
                  <BadgeCheckIcon className="h-4 w-4" />
                  {siteConfig.licenseLine} · {siteConfig.yearsExperience} שנות ניסיון
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160} className="h-full">
              <div className="card-lift h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 ring-1 ring-gold/20 text-gold-dark">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-bold text-charcoal">אזורי השירות שלנו</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {serviceAreas.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/areas/${a.slug}`}
                        className="block rounded-full bg-ivory ring-1 ring-charcoal/10 px-3.5 py-1.5 text-xs font-semibold text-charcoal hover:ring-gold hover:text-gold-dark transition-all"
                      >
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
