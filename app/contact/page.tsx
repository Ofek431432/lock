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

      <section className="bg-gradient-to-b from-ink to-surface text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold">צור קשר</h1>
          <p className="mt-4 text-lg text-cream/75 max-w-2xl leading-relaxed">
            הדרך הכי מהירה ליצור קשר — חיוג ישיר. אנחנו עונים בעצמנו, בכל שעה, ויוצאים אליכם לדרך מיד.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
          <ScrollReveal>
            <div className="rounded-2xl bg-gradient-to-br from-ink to-surface text-cream p-8 sm:p-12 text-center shadow-lg">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <PhoneIcon className="h-7 w-7" />
              </span>
              <h2 className="mt-4 text-xl font-bold">חייגו עכשיו — מענה אנושי ישיר</h2>
              <p className="mt-2 text-cream/70">גם למקרי חירום דחופים, בכל שעה ביום ובלילה</p>
              <a
                href={siteConfig.phoneHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-9 py-4 text-xl font-extrabold text-ink shadow-lg shadow-gold/30 hover:bg-gold-dark hover:scale-[1.02] transition-all"
              >
                <PhoneIcon className="h-5 w-5" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <ScrollReveal delay={80}>
              <div className="h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold-dark">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-bold text-charcoal">שעות פעילות</h2>
                <p className="mt-1.5 text-sm text-charcoal/70 leading-relaxed">{siteConfig.hoursLong}</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-gold-dark">
                  <BadgeCheckIcon className="h-4 w-4" />
                  {siteConfig.licenseLine} · {siteConfig.yearsExperience} שנות ניסיון
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div className="h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold-dark">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-bold text-charcoal">אזורי השירות שלנו</h2>
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
