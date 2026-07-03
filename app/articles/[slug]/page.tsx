import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { articles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { getAreaBySlug, getServiceBySlug, siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import ScrollReveal from "@/components/ScrollReveal";
import { ClockIcon, PhoneIcon, WhatsappIcon } from "@/components/icons";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${siteConfig.domain}/articles/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);
  const relatedServices = article.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedAreas = article.relatedAreaSlugs
    .map((s) => getAreaBySlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.domain}/articles/${article.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbJson = breadcrumbJsonLd([
    { name: "ראשי", path: "/" },
    { name: "מאמרים", path: "/articles" },
    { name: article.title, path: `/articles/${article.slug}` },
  ]);

  return (
    <>
      <Script
        id={`breadcrumb-jsonld-${article.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <Script
        id={`article-jsonld-${article.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id={`faq-jsonld-${article.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-gradient-to-b from-ink to-surface text-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 sm:py-20">
          <nav className="text-sm text-cream/60">
            <Link href="/articles" className="hover:text-gold transition-colors">
              מאמרים
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/80">{article.category}</span>
          </nav>
          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold leading-tight">{article.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-cream/65">
            <span>פורסם: {formatDate(article.publishedAt)}</span>
            <span aria-hidden>•</span>
            <span>עודכן: {formatDate(article.updatedAt)}</span>
            <span aria-hidden>•</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              {article.readMinutes} דקות קריאה
            </span>
          </div>
        </div>
      </section>

      <article className="bg-ivory">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
          <ScrollReveal>
            <div className="space-y-4 text-charcoal/85 leading-relaxed">
              {article.intro.map((p, i) => (
                <p key={i} className="text-lg">
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <div className="mt-10 space-y-10">
            {article.sections.map((section, i) => (
              <ScrollReveal key={section.heading} delay={Math.min(i, 4) * 60}>
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal">{section.heading}</h2>
                  <div className="mt-3 space-y-3 text-charcoal/80 leading-relaxed">
                    {section.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-charcoal/80">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </ScrollReveal>
            ))}
          </div>

          {/* FAQ */}
          <ScrollReveal>
            <div className="mt-12 rounded-2xl bg-white ring-1 ring-charcoal/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-charcoal">שאלות נפוצות</h2>
              <div className="mt-5 space-y-5">
                {article.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-semibold text-charcoal">{item.question}</h3>
                    <p className="mt-1.5 text-sm text-charcoal/75 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Related services & areas */}
          {(relatedServices.length > 0 || relatedAreas.length > 0) && (
            <ScrollReveal>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services#${s.slug}`}
                    className="rounded-full bg-white ring-1 ring-charcoal/10 px-4 py-2 text-sm font-semibold text-charcoal hover:ring-gold hover:text-gold-dark transition-all"
                  >
                    {s.name} ←
                  </Link>
                ))}
                {relatedAreas.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/areas/${a.slug}`}
                    className="rounded-full bg-white ring-1 ring-charcoal/10 px-4 py-2 text-sm font-semibold text-charcoal hover:ring-gold hover:text-gold-dark transition-all"
                  >
                    מנעולן ב{a.name} ←
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Closing CTA */}
          <ScrollReveal>
            <div className="mt-10 rounded-2xl bg-ink text-cream p-6 sm:p-8 text-center">
              <h2 className="text-xl font-bold">צריכים מנעולן עכשיו?</h2>
              <p className="mt-2 text-cream/70">{siteConfig.tagline}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink shadow-md shadow-gold/30 hover:bg-gold-dark transition-colors"
                >
                  <PhoneIcon className="h-4 w-4" />
                  חייגו עכשיו: {siteConfig.phoneDisplay}
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
          </ScrollReveal>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-lg font-bold text-charcoal">מאמרים נוספים שיכולים לעניין אתכם</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/articles/${r.slug}`}
                    className="group block h-full rounded-xl bg-white ring-1 ring-charcoal/10 p-5 hover:ring-gold hover:shadow-md transition-all"
                  >
                    <span className="text-xs font-semibold text-gold-dark">{r.category}</span>
                    <h3 className="mt-1.5 font-bold text-charcoal text-sm leading-snug group-hover:text-gold-dark transition-colors">
                      {r.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
