import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { Button } from "../_components/Button";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

type ContentBlock =
  | { type: "text"; value: string }
  | {
      type: "image";
      value: { id: number; url: string; width: number; height: number };
    }
  | { type: "youtube"; value: string };

type NewsPost = {
  id: number;
  title: string;
  news_lead: string;
  sharing_description: string;
  sharing_image: string;
  content_factory: ContentBlock[];
  slug?: string;
};

type NewsResponse = {
  lang: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  posts: NewsPost[];
};

const DEFAULT_LANG = "en";
const ALLOWED_LANGS = ["en", "ru", "pl"] as const;
type AllowedLang = (typeof ALLOWED_LANGS)[number];

function normalizeLang(input?: string): AllowedLang {
  if (!input) return DEFAULT_LANG;
  const lower = input.toLowerCase();
  return (
    ALLOWED_LANGS.includes(lower as AllowedLang) ? lower : DEFAULT_LANG
  ) as AllowedLang;
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getPostSlug(post: NewsPost) {
  return post.slug ?? (toSlug(post.title) || String(post.id));
}

async function getNews(lang: string, page: number): Promise<NewsResponse> {
  const url = `https://editor.fadder.com/api/news/?lang=${lang}&page=${page}`;
  const response = await fetch(url, { cache: "no-store" });
  return response.json();
}

function buildPagination(totalPages: number, currentPage: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: Array<number | string> = [1];
  if (currentPage > 3) pages.push("...");
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (currentPage < totalPages - 2) pages.push("...");
  pages.push(totalPages);
  return pages;
}

type BlogPageProps = {
  searchParams?: Promise<{ lang?: string; page?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const lang = normalizeLang(resolvedSearchParams?.lang);
  const page = Math.max(1, Number(resolvedSearchParams?.page ?? "1") || 1);
  const data = await getNews(lang, page);
  const pages = buildPagination(data.total_pages, page);
  return (
    <main className="max-w-[1920px] mx-auto py-[16px] px-20 pb-[120px] flex flex-col gap-16 text-foreground max-wide:px-[60px] max-tablet:px-8 max-tablet:pb-24 max-narrow:px-4">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "Blog" }]}
      />
      <PageHeader
        title="Blog"
        subtitle="Latest insights and articles about car auctions, inspections, and market trends"
      />
      <section className="grid grid-cols-3 gap-6 max-wide:grid-cols-2 max-tablet:grid-cols-1 w-full max-w-[1760px] mx-auto">
        {data.posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-[16px] overflow-hidden flex flex-col shadow-card-soft"
          >
            <div className="relative h-[180px] bg-surface">
              <Image
                src={post.sharing_image}
                alt=""
                fill
                sizes="(max-width: 834px) 100vw, 560px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4 flex flex-col gap-3 flex-1">
              <h2 className="text-base font-bold m-0 text-dark">
                {post.title}
              </h2>
              <p className="text-sm text-muted m-0 flex-1">{post.news_lead}</p>
              <Button
                href={`/blog/${getPostSlug(post)}?lang=${lang}`}
                variant="secondary"
                size="sm"
                className="w-fit"
              >
                Read more
              </Button>
            </div>
          </article>
        ))}
      </section>
      {data.total_pages > 1 ? (
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            {pages.map((item) => {
              if (item === "...") {
                return (
                  <span
                    key={`ellipsis-${item}`}
                    className="min-w-10 text-center text-muted"
                  >
                    ...
                  </span>
                );
              }
              return (
                <Link
                  key={`page-${item}`}
                  href={`/blog?lang=${lang}&page=${item}`}
                  className={
                    "min-w-10 h-10 inline-flex items-center justify-center rounded-[12px] text-sm font-bold " +
                    (item === page
                      ? "bg-primary text-foreground"
                      : "bg-white text-foreground")
                  }
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
      <ContactSection />
    </main>
  );
}
