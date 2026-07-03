import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { services, serviceAreas, siteConfig } from "../lib/site-config";

const ARTICLES_PATH = join(process.cwd(), "content/articles.json");
const QUEUE_PATH = join(process.cwd(), "content/topic-queue.json");

type RawArticle = Record<string, unknown> & {
  slug: string;
  title: string;
  category: string;
};

type TopicQueueItem = {
  slug: string;
  title: string;
  category: string;
  brief: string;
  keywords: string[];
};

const CATEGORIES = ["מדריכי חירום", "אבטחה ובחירת מוצרים", "מחיר ושירות", "טיפים ומניעה"];
const SERVICE_SLUGS = services.map((s) => s.slug);
const AREA_SLUGS = serviceAreas.map((a) => a.slug);

const articleSchema = {
  type: "object",
  properties: {
    slug: { type: "string", description: "kebab-case, ASCII only, English" },
    title: { type: "string" },
    description: { type: "string" },
    category: { type: "string", enum: CATEGORIES },
    readMinutes: { type: "integer" },
    excerpt: { type: "string" },
    intro: { type: "array", items: { type: "string" } },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          heading: { type: "string" },
          paragraphs: { type: "array", items: { type: "string" } },
          bullets: { type: "array", items: { type: "string" } },
        },
        required: ["heading", "paragraphs"],
        additionalProperties: false,
      },
    },
    faq: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "answer"],
        additionalProperties: false,
      },
    },
    relatedServiceSlugs: { type: "array", items: { type: "string", enum: SERVICE_SLUGS } },
    relatedAreaSlugs: { type: "array", items: { type: "string", enum: AREA_SLUGS } },
  },
  required: [
    "slug",
    "title",
    "description",
    "category",
    "readMinutes",
    "excerpt",
    "intro",
    "sections",
    "faq",
    "relatedServiceSlugs",
    "relatedAreaSlugs",
  ],
  additionalProperties: false,
};

const STYLE_GUIDE = `
את/ה כותב/ת תוכן SEO לאתר של "${siteConfig.name}" (${siteConfig.nameEn}) — עסק מנעולנות אמיתי בחיפה והקריות.

עובדות עסקיות (אל תמציא/י עובדות אחרות):
- שם: ${siteConfig.name}, טלפון: ${siteConfig.phoneDisplay}
- ${siteConfig.licenseLine}, ${siteConfig.yearsExperience} שנות ניסיון
- שעות: ${siteConfig.hoursLong}
- אזורי שירות: ${serviceAreas.map((a) => a.name).join(", ")}
- שירותים: ${services.map((s) => s.name).join(", ")}

טון כתיבה: מקצועי, רגוע ומרגיע, בגוף שני (אתם/כם), בלי הבטחות מוגזמות ובלי קלישאות שיווקיות. כל מאמר בנוי כמדריך מעשי שעוזר לקורא להבין מצב, לא כפרסומת. הימנע/י מהמלצות מסוכנות (כמו ניסיון פריצה עצמאי). אל תזכיר/י מחירים מדויקים בש"ח אלא אם זה כלל אצבע כללי.

מבנה תוכן (יישמר כ-JSON לפי הסכמה שתינתן):
- intro: 1-2 פסקאות פתיחה שמציגות את הנושא והקשר אמיתי לחיי הקוראים
- sections: 3-5 סעיפים, כל אחד עם heading ברור, 1-2 פסקאות, ולעיתים bullets
- faq: 2-4 שאלות נפוצות עם תשובות קצרות וברורות
- readMinutes: הערכה ריאלית (5-8)
- relatedServiceSlugs ו-relatedAreaSlugs: בחר/י 1-2 רלוונטיים מהרשימות שניתנו בסכמה
`.trim();

function loadJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf-8")) as T;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildPrompt(existingTitles: string[], topic: TopicQueueItem | null): string {
  if (topic) {
    return `${STYLE_GUIDE}

כתוב/כתבי מאמר חדש על הנושא הבא:
- slug חובה: "${topic.slug}"
- כותרת מוצעת (אפשר לשנות מעט): "${topic.title}"
- קטגוריה: "${topic.category}"
- תקציר נושא: ${topic.brief}
- מילות מפתח רלוונטיות: ${topic.keywords.join(", ")}

מאמרים קיימים באתר (אל תחזור/י על אותו תוכן): ${existingTitles.join(" | ")}`;
  }

  return `${STYLE_GUIDE}

בחר/י נושא חדש ושימושי למאמר SEO בתחום המנעולנות שלא מכוסה עדיין באתר, והגדר/י slug חדש (kebab-case, אנגלית).

מאמרים קיימים באתר (אל תחזור/י על אותו נושא): ${existingTitles.join(" | ")}`;
}

async function generateArticle(
  client: Anthropic,
  existingTitles: string[],
  topic: TopicQueueItem | null,
  retryNote: string,
): Promise<RawArticle> {
  const prompt = buildPrompt(existingTitles, topic) + (retryNote ? `\n\n${retryNote}` : "");

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 4096,
    output_config: {
      format: { type: "json_schema", schema: articleSchema },
    },
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in model response");
  }
  return JSON.parse(textBlock.text) as RawArticle;
}

function validateArticle(article: RawArticle, existingSlugs: Set<string>): string[] {
  const errors: string[] = [];
  if (!article.slug || /[^a-z0-9-]/.test(article.slug)) errors.push("slug must be kebab-case ASCII");
  if (existingSlugs.has(article.slug)) errors.push(`slug "${article.slug}" already exists`);
  if (!Array.isArray(article.intro) || article.intro.length === 0) errors.push("intro is empty");
  const sections = article.sections as unknown[];
  if (!Array.isArray(sections) || sections.length < 3) errors.push("need at least 3 sections");
  const faq = article.faq as unknown[];
  if (!Array.isArray(faq) || faq.length < 2) errors.push("need at least 2 faq entries");
  return errors;
}

async function main() {
  const articles = loadJson<RawArticle[]>(ARTICLES_PATH);
  const queue = loadJson<TopicQueueItem[]>(QUEUE_PATH);
  const existingSlugs = new Set(articles.map((a) => a.slug));
  const existingTitles = articles.map((a) => a.title as string);

  const nextTopic = queue.find((t) => !existingSlugs.has(t.slug)) ?? null;

  const client = new Anthropic();

  let article: RawArticle | null = null;
  let retryNote = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    const candidate = await generateArticle(client, existingTitles, nextTopic, retryNote);
    if (nextTopic) {
      candidate.slug = nextTopic.slug;
      candidate.category = nextTopic.category;
    }
    const errors = validateArticle(candidate, existingSlugs);
    if (errors.length === 0) {
      article = candidate;
      break;
    }
    retryNote = `הניסיון הקודם נכשל בבדיקות: ${errors.join("; ")}. תקן/י ונסה/י שוב.`;
  }

  if (!article) {
    console.error("Failed to generate a valid article after 3 attempts:", retryNote);
    process.exit(1);
  }

  const today = todayISO();
  article.publishedAt = today;
  article.updatedAt = today;

  articles.push(article);
  writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2) + "\n");

  if (nextTopic) {
    const remainingQueue = queue.filter((t) => t.slug !== nextTopic.slug);
    writeFileSync(QUEUE_PATH, JSON.stringify(remainingQueue, null, 2) + "\n");
  }

  console.log(`Added article: ${article.slug} — ${article.title}`);

  if (process.env.GITHUB_OUTPUT) {
    writeFileSync(process.env.GITHUB_OUTPUT, `slug=${article.slug}\ntitle=${article.title}\n`, {
      flag: "a",
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
