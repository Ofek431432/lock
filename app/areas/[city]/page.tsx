import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { getAreaBySlug, serviceAreas, services, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import { CheckIcon, PhoneIcon, WhatsappIcon } from "@/components/icons";

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
    openGraph: { title, description, url: `${siteConfig.domain}/areas/${area.slug}` },
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

      <section className="bg-gradient-to-b from-ink to-surface text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-cream/80 ring-1 ring-white/10">
            אזור שירות
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">מנעולן ב{area.name}</h1>
          <p className="mt-4 text-lg text-cream/75 max-w-2xl leading-relaxed">{area.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink shadow-md shadow-gold/30 hover:bg-gold-dark transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md hover:brightness-105 transition-all"
            >
              <WhatsappIcon className="h-4 w-4" />
              ווטסאפ
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-charcoal">שירותי מנעולנות ב{area.name}</h2>
            <p className="mt-2 text-charcoal/70 max-w-2xl">
              אנחנו מספקים את כל השירותים הבאים לתושבי ולעסקי {area.name}, עם הגעה מהירה ויחס מקצועי:
            </p>
          </ScrollReveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 60}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group block h-full rounded-xl bg-white ring-1 ring-charcoal/10 p-5 hover:ring-gold hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-charcoal group-hover:text-gold-dark transition-colors">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-charcoal/70 leading-relaxed">{s.short}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 rounded-2xl bg-ink text-cream p-6 sm:p-8">
              <h2 className="text-xl font-bold">למה לבחור ב{siteConfig.name} ב{area.name}?</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {whyHere.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-cream/75">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <div className="mt-10">
            <h2 className="text-lg font-bold text-charcoal">אזורי שירות נוספים</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {otherAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="rounded-full bg-white ring-1 ring-charcoal/10 px-5 py-2.5 text-sm font-semibold text-charcoal hover:ring-gold hover:text-gold-dark hover:shadow-md transition-all"
                >
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
