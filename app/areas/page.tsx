import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { serviceAreas, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import { PhoneIcon } from "@/components/icons";

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

      <section className="bg-gradient-to-b from-ink to-surface text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold">אזורי השירות שלנו</h1>
          <p className="mt-4 text-lg text-cream/75 max-w-2xl leading-relaxed">
            {siteConfig.name} זמין לקריאות בכל האזורים הבאים — עם יציאה מיידית לדרך ויחס מקצועי לכל קריאה,
            דחופה ככל שתהיה.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid gap-5 sm:grid-cols-2">
            {serviceAreas.map((a, i) => (
              <ScrollReveal key={a.slug} delay={i * 60}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="group block h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 hover:ring-gold hover:shadow-lg transition-all"
                >
                  <h2 className="text-xl font-bold text-charcoal group-hover:text-gold-dark transition-colors">
                    מנעולן ב{a.name}
                  </h2>
                  <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{a.intro}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-gold-dark">
                    לפרטי השירות באזור ←
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 rounded-2xl bg-ink text-cream p-6 sm:p-8 text-center">
              <h2 className="text-xl font-bold">לא רואים את האזור שלכם?</h2>
              <p className="mt-2 text-cream/70">
                צרו קשר בכל מקרה — לעיתים ניתן להגיע גם מעבר לאזורים המפורטים, בהתאם למיקום ולשעה.
              </p>
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
