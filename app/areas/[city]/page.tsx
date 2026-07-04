import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { getAreaBySlug, serviceAreas, services, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import { CheckIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = getAreaBySlug(city);
  if (!area) return {};

  const title = `מנעולן ב${area.name} — ${siteConfig.name} | זמין 24/7`;
  const description = `מחפשים מנעולן ב${area.name}? ${siteConfig.name} מספק פריצת דלתות ורכבים, החלפת מנעולים, כספות לעסקים ושירות חירום, עם הגעה מהירה לכל כתובת ב${area.name}. ${siteConfig.hoursShort}.`;

  return {
    title,
    description,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.domain}/areas/${area.slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = getAreaBySlug(city);
  if (!area) notFound();

  const otherAreas = serviceAreas.filter((a) => a.slug !== area.slug);

  const breadcrumbJson = breadcrumbJsonLd([
    { name: "ראשי", path: "/" },
    { name: "אזורי שירות", path: "/areas" },
    { name: `מנעולן ב${area.name}`, path: `/areas/${area.slug}` },
  ]);

  const areaBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "@id": `${siteConfig.domain}/areas/${area.slug}/#business`,
    name: `${siteConfig.name} — מנעולן ב${area.name}`,
    url: `${siteConfig.domain}/areas/${area.slug}`,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    areaServed: { "@type": "City", name: area.name },
    address: { "@type": "PostalAddress", addressLocality: area.name, addressCountry: "IL" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "00:00",
      closes: "23:59",
    },
  };

  const whyHere = [
    `הגעה מהירה לכל שכונה ב${area.name}, כולל קריאות חירום בשעות הלילה`,
    "מענה אנושי ישיר בטלפון — בלי מענות אוטומטיות מתישות",
    "הסבר ברור על העבודה והעלות מראש, ללא הפתעות",
    `${siteConfig.licenseLine}, עם ${siteConfig.yearsExperience} שנות ניסיון ועבודה נקייה שאינה פוגעת בדלת, ברכב או במנעול`,
  ];

  const localServices = [
    {
      title: `פתיחת דלתות ב${area.name}`,
      text: `ננעלתם מבחוץ? אנחנו מגיעים לכל כתובת ב${area.name} במהירות ופותחים דלתות בלי לפגוע בדלת או במנעול. שירות ${siteConfig.hoursShort}.`,
      cta: "התקשרו עכשיו",
    },
    {
      title: `החלפת מנעולים ב${area.name}`,
      text: `החלפת צילינדרים ומנעולים לכל סוגי הדלתות ב${area.name} — מבסיסי ועד high-security. מחיר הוגן, מסירת כל המפתחות, ואחריות על העבודה.`,
      cta: "לקבלת מחיר",
    },
    {
      title: `מנעולן לרכב ב${area.name}`,
      text: `ננעלתם מחוץ לרכב ב${area.name}? פותחים רכבים בלי נזק, בכל שעה. גם שכפול מפתח ותיקון מנגנוני נעילה לרכב.`,
      cta: "התקשרו עכשיו",
    },
    {
      title: `מנעולן חירום ב${area.name} — 24/7`,
      text: `תקלה בשעה לא שעה? אנחנו זמינים ${siteConfig.hoursShort} לכל קריאת חירום ב${area.name} — מענה אנושי ישיר, יציאה לדרך מיידית.`,
      cta: "חייגו עכשיו",
    },
  ];

  return (
    <>
      <Script
        id={`breadcrumb-jsonld-area-${area.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <Script
        id={`business-jsonld-area-${area.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaBusinessJsonLd) }}
      />

      <section className="hero-lux text-cream">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1.5 text-sm font-medium text-cream/85 backdrop-blur-sm">
            <MapPinIcon className="h-4 w-4 text-gold" />
            אזור שירות
          </p>
          <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold leading-tight">
            מנעולן <span className="gold-text">ב{area.name}</span>
          </h1>
          <p className="mt-5 text-lg text-cream/75 max-w-2xl leading-relaxed">{area.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.phoneHref}
              className="btn-lux inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold text-ink"
            >
              <PhoneIcon className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <ScrollReveal>
            <p className="eyebrow">מה נוכל לעשות עבורכם</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-charcoal">שירותי מנעולנות ב{area.name}</h2>
            <p className="mt-3 text-charcoal/70 max-w-2xl leading-relaxed">
              אנחנו מספקים את כל השירותים הבאים לתושבי ולעסקי {area.name}, עם הגעה מהירה ויחס מקצועי:
            </p>
          </ScrollReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 60} className="h-full">
                <Link
                  href={`/services#${s.slug}`}
                  className="card-lift group block h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-5 hover:ring-gold/40"
                >
                  <h3 className="font-bold text-charcoal group-hover:text-gold-dark transition-colors">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-charcoal/70 leading-relaxed">{s.short}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Service + city keyword sections */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {localServices.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60} className="h-full">
                <div className="card-lift h-full rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-charcoal">{item.title}</h2>
                  <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{item.text}</p>
                  <a
                    href={siteConfig.phoneHref}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold-dark hover:text-gold transition-colors"
                  >
                    <PhoneIcon className="h-3.5 w-3.5" /> {item.cta}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="hero-lux mt-10 rounded-3xl text-cream p-7 sm:p-10">
              <div className="relative">
                <h2 className="text-2xl font-bold">למה לבחור ב{siteConfig.name} ב{area.name}?</h2>
                <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
                  {whyHere.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-cream/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={siteConfig.phoneHref}
                  className="btn-lux mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-ink"
                >
                  <PhoneIcon className="h-4 w-4" />
                  חייגו עכשיו: {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-12">
            <h2 className="text-lg font-bold text-charcoal">אזורי שירות נוספים</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {otherAreas.map((a) => (
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
          </div>
        </div>
      </section>
    </>
  );
}
