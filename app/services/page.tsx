import type { Metadata } from "next";
import Script from "next/script";
import { services, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import {
  AlarmClockIcon,
  CheckIcon,
  DoorOpenIcon,
  KeyRoundIcon,
  PhoneIcon,
  ShieldCheckIcon,
  type IconComponent,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "שירותי מנעולנות בחיפה — פריצת דלתות, החלפת מנעולים, כספות וחירום",
  description: `כל שירותי המנעולנות של ${siteConfig.name} בחיפה והסביבה: פריצת דלתות ומנעולים, החלפת צילינדרים ומנעולים, כספות ומנעולים לעסקים ושירות חירום 24/7. מחיר הוגן, הגעה מהירה.`,
  alternates: { canonical: "/services" },
};

const serviceIcons: Record<string, IconComponent> = {
  "break-in-opening": DoorOpenIcon,
  "lock-replacement": KeyRoundIcon,
  "safes-business": ShieldCheckIcon,
  emergency: AlarmClockIcon,
};

const breadcrumbJson = breadcrumbJsonLd([
  { name: "ראשי", path: "/" },
  { name: "שירותים", path: "/services" },
]);

export default function ServicesPage() {
  return (
    <>
      <Script
        id="breadcrumb-jsonld-services"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <section className="hero-lux text-cream">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <p className="eyebrow eyebrow-dark">השירותים שלנו</p>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">
            שירותי מנעולנות <span className="gold-text">בחיפה והסביבה</span>
          </h1>
          <p className="mt-5 text-lg text-cream/75 max-w-2xl leading-relaxed">
            פריצת דלתות, החלפת מנעולים וצילינדרים, כספות לעסקים ושירות חירום 24/7 — בחיפה, הקריות, נשר, עתלית וטירת כרמל. מחיר הוגן ושקוף, הגעה עד 30 דקות.
          </p>
        </div>
      </section>

      {services.map((s, i) => {
        const Icon = serviceIcons[s.slug];
        const dark = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`relative scroll-mt-20 overflow-hidden ${dark ? "bg-ink text-cream" : "bg-ivory text-charcoal"}`}
          >
            {dark && (
              <div
                className="absolute inset-0 opacity-60 [background-image:radial-gradient(ellipse_45%_60%_at_88%_15%,rgba(226,167,46,0.08),transparent_60%)]"
                aria-hidden
              />
            )}
            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
              <ScrollReveal>
                <div className="flex items-start gap-5">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ${
                      dark
                        ? "bg-gold/15 ring-gold/25 text-gold"
                        : "bg-gradient-to-br from-gold/15 to-gold/5 ring-gold/20 text-gold-dark"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <p className={`text-xs font-bold tracking-widest tabular ${dark ? "text-gold/70" : "text-gold-dark/70"}`}>
                      0{i + 1}
                    </p>
                    <h2 className="mt-1 text-2xl sm:text-3xl font-bold">{s.name}</h2>
                    <p className={`mt-4 leading-relaxed ${dark ? "text-cream/75" : "text-charcoal/75"}`}>
                      {s.description}
                    </p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex items-start gap-2.5 text-sm ${dark ? "text-cream/70" : "text-charcoal/70"}`}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              dark ? "bg-gold/15 text-gold" : "bg-gold/10 text-gold-dark"
                            }`}
                          >
                            <CheckIcon className="h-3 w-3" />
                          </span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={siteConfig.phoneHref}
                      className="btn-lux mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-ink"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      חייגו עכשיו: {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      <section className="bg-ivory">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-charcoal/10 p-8 sm:p-10 text-center shadow-lg">
              <div className="hairline-gold absolute top-0 inset-x-0" aria-hidden />
              <h2 className="text-2xl font-bold text-charcoal">לא בטוחים איזה שירות מתאים לכם?</h2>
              <p className="mt-3 text-charcoal/70 leading-relaxed">
                התקשרו ונבין יחד את המצב — נכוון אתכם לפתרון הנכון, גם אם זה לא דורש הגעה בכלל.
              </p>
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
