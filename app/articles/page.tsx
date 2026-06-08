import Link from "next/link";
import type { Metadata } from "next";
import Script from "next/script";
import { articles } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import { ClockIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "מאמרים ומדריכי מנעולנות — טיפים ומידע מקצועי",
  description: `מדריכים ומאמרים מקצועיים בנושאי מנעולנות, אבטחת בית ועסק, ופתרונות למצבי חירום — מאת הצוות של ${siteConfig.name}, מנעולן בחיפה והסביבה.`,
  alternates: { canonical: "/articles" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" });
}

const breadcrumbJson = breadcrumbJsonLd([
  { name: "ראשי", path: "/" },
  { name: "מאמרים", path: "/articles" },
]);

export default function ArticlesPage() {
  const sorted = [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <Script
        id="breadcrumb-jsonld-articles"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <section className="bg-gradient-to-b from-ink to-surface text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold">מאמרים ומדריכי מנעולנות</h1>
          <p className="mt-4 text-lg text-cream/75 max-w-2xl leading-relaxed">
            טיפים מעשיים, הסברים ברורים ומדריכים מקצועיים בנושאי מנעולים, אבטחת בית ועסק ומצבי חירום —
            כתובים מתוך ניסיון של {siteConfig.yearsExperience} שנים בשטח, כדי שתדעו בדיוק מה לעשות לפני שמתעורר צורך.
          </p>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((article, i) => (
              <ScrollReveal key={article.slug} delay={(i % 6) * 70}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 hover:ring-gold hover:shadow-lg transition-all"
                >
                  <span className="inline-block w-fit rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-dark">
                    {article.category}
                  </span>
                  <h2 className="mt-3 text-lg font-bold text-charcoal leading-snug group-hover:text-gold-dark transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-charcoal/70 leading-relaxed flex-1">{article.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {article.readMinutes} דקות קריאה
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 rounded-2xl bg-ink text-cream p-6 sm:p-8 text-center">
              <h2 className="text-xl font-bold">לא מוצאים תשובה למצב הספציפי שלכם?</h2>
              <p className="mt-2 text-cream/70 max-w-xl mx-auto">
                התקשרו אלינו ישירות — נשמח להקשיב, להסביר ולעזור, {siteConfig.hoursShort}.
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
