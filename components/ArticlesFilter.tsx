"use client";

import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";
import ScrollReveal from "@/components/ScrollReveal";
import { ClockIcon, PhoneIcon } from "@/components/icons";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" });
}

const ALL_CATEGORIES = ["הכול", "מדריכי חירום", "אבטחה ובחירת מוצרים", "מחיר ושירות", "טיפים ומניעה"];

export default function ArticlesFilter({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState("הכול");

  const filtered = activeCategory === "הכול"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-gold text-ink shadow-md shadow-gold/30"
                : "bg-white ring-1 ring-charcoal/10 text-charcoal hover:ring-gold hover:text-gold-dark"
            }`}
          >
            {cat}
            {cat !== "הכול" && (
              <span className={`mr-1.5 text-xs ${activeCategory === cat ? "text-ink/60" : "text-muted"}`}>
                ({articles.filter((a) => a.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, i) => (
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

      {filtered.length === 0 && (
        <p className="text-center text-charcoal/60 py-12">אין מאמרים בקטגוריה זו עדיין.</p>
      )}

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
  );
}
