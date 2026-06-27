import articlesData from "@/content/articles.json";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
  intro: string[];
  sections: ArticleSection[];
  faq: ArticleFaq[];
  relatedServiceSlugs: string[];
  relatedAreaSlugs: string[];
};

export const articleCategories = [
  "מדריכי חירום",
  "אבטחה ובחירת מוצרים",
  "מחיר ושירות",
  "טיפים ומניעה",
] as const;

export const articles: Article[] = articlesData as Article[];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string) {
  return articles.filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return articles
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0;
      const bScore = b.category === current.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}
