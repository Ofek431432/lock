import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { serviceAreas, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPinIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "אזורי שירות — מנעולן בחיפה, קריות, נשר, עתלית וטירת כרמל",
  description: `${siteConfig.name} מספק שירותי מנעולנות בחיפה, קריות, נשר, עתלית וטירת כרמל — עם הגעה מהירה לכל כתובת, ${siteConfig.hoursShort}.`,
  alternates: { canonical: "/areas" },
};

const breadcrumbJson = breadcrumbJsonLd([
  { name: "ראשי", path: "/" },
  { name: "אזורי שירות", path: "/areas" },
]);

export default function AreasPage() {
  return (
    <>
      <Script
        id="breadcrumb-jsonld-areas"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <section className="hero-lux text-cream">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <p className="eyebrow eyebrow-dark">איפה תמצאו אותנו</p>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">
            אזורי <span className="gold-text">השירות שלנו</span>
          </h1>
          <p className="mt-5 text-lg text-cream/75 max-w-2xl leading-relaxed">
            {siteConfig.name} זמין לקריאות בכל האזורים הבאים — עם יציאה מיידית לדרך ויחס מקצועי לכל קריאה,
            דחופה ככל שתהיה.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            {serviceAreas.map((a, i) => (
              <ScrollReveal key={a.slug} delay={i * 60} className="h-full">
                <Link
                  href={`/areas/${a.slug}`}
                  className="card-lift group flex h-full flex-col rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 hover:ring-gold/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 ring-1 ring-gold/20 text-gold-dark transition-all duration-300 group-hover:from-gold group-hover:to-gold-dark group-hover:text-ink">
                      <MapPinIcon className="h-5 w-5" />
                    </span>
                    <h2 className="text-xl font-bold text-charcoal group-hover:text-gold-dark transition-colors">
                      מנעולן ב{a.name}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm text-charcoal/70 leading-relaxed flex-1">{a.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-gold-dark transition-transform duration-300 group-hover:-translate-x-1">
                    לפרטי השירות באזור ←
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="hero-lux mt-10 rounded-3xl text-cream p-7 sm:p-10 text-center">
              <div className="relative">
                <h2 className="text-2xl font-bold">לא רואים את האזור שלכם?</h2>
                <p className="mt-2 text-cream/70 leading-relaxed">
                  צרו קשר בכל מקרה — לעיתים ניתן להגיע גם מעבר לאזורים המפורטים, בהתאם למיקום ולשעה.
                </p>
                <a
                  href={siteConfig.phoneHref}
                  className="btn-lux mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold text-ink"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
