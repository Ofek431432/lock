import type { Metadata } from "next";
import Script from "next/script";
import { articles } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ArticlesFilter from "@/components/ArticlesFilter";

export const metadata: Metadata = {
  title: "מאמרים ומדריכי מנעולנות — טיפים ומידע מקצועי",
  description: `מדריכים ומאמרים מקצועיים בנושאי מנעולנות, אבטחת בית ועסק, ופתרונות למצבי חירום — מאת הצוות של ${siteConfig.name}, מנעולן בחיפה והסביבה.`,
  alternates: { canonical: "/articles" },
};

const breadcrumbJson = breadcrumbJsonLd([
  { name: "ראשי", path: "/" },
  { name: "מאמרים", path: "/articles" },
]);

export default function ArticlesPage() {
  const sorted = [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "מאמרים ומדריכי מנעולנות — אופק מנעולים",
    url: `${siteConfig.domain}/articles`,
    numberOfItems: sorted.length,
    itemListElement: sorted.slice(0, 10).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.domain}/articles/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <>
      <Script
        id="breadcrumb-jsonld-articles"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <Script
        id="itemlist-jsonld-articles"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="hero-lux text-cream">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <p className="eyebrow eyebrow-dark">ידע מהשטח</p>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">
            מאמרים <span className="gold-text">ומדריכי מנעולנות</span>
          </h1>
          <p className="mt-5 text-lg text-cream/75 max-w-2xl leading-relaxed">
            טיפים מעשיים, הסברים ברורים ומדריכים מקצועיים בנושאי מנעולים, אבטחת בית ועסק ומצבי חירום —
            כתובים מתוך ניסיון של {siteConfig.yearsExperience} שנים בשטח, כדי שתדעו בדיוק מה לעשות לפני שמתעורר צורך.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <ArticlesFilter articles={sorted} />
        </div>
      </section>
    </>
  );
}
