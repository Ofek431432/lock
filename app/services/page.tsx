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

      <section className="bg-gradient-to-b from-ink to-surface text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold">שירותי מנעולנות בחיפה והסביבה</h1>
          <p className="mt-4 text-lg text-cream/75 max-w-2xl leading-relaxed">
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
            className={`scroll-mt-20 ${dark ? "bg-ink text-cream" : "bg-ivory text-charcoal"}`}
          >
            <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-18">
              <ScrollReveal>
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      dark ? "bg-gold/15 text-gold" : "bg-gold/10 text-gold-dark"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">{s.name}</h2>
                    <p className={`mt-3 leading-relaxed ${dark ? "text-cream/75" : "text-charcoal/75"}`}>
                      {s.description}
                    </p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex items-start gap-2 text-sm ${dark ? "text-cream/70" : "text-charcoal/70"}`}
                        >
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={siteConfig.phoneHref}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink shadow-md shadow-gold/30 hover:bg-gold-dark transition-colors"
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 sm:p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-charcoal">לא בטוחים איזה שירות מתאים לכם?</h2>
            <p className="mt-2 text-charcoal/70">
              התקשרו ונבין יחד את המצב — נכוון אתכם לפתרון הנכון, גם אם זה לא דורש הגעה בכלל.
            </p>
            <a
              href={siteConfig.phoneHref}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink shadow-md shadow-gold/30 hover:bg-gold-dark transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
