import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "../../_components/Breadcrumbs";
import { Button } from "../../_components/Button";
import { ContactSection } from "../../_components/ContactSection";

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

async function findPost(lang: string, slug: string) {
  const first = await getNews(lang, 1);
  for (const post of first.posts) {
    if (getPostSlug(post) === slug || String(post.id) === slug) return post;
  }
  for (let page = 2; page <= first.total_pages; page += 1) {
    const data = await getNews(lang, page);
    for (const post of data.posts) {
      if (getPostSlug(post) === slug || String(post.id) === slug) return post;
    }
  }
  return null;
}

async function getRelatedPosts(lang: string, currentId: number) {
  const data = await getNews(lang, 1);
  return data.posts.filter((post) => post.id !== currentId).slice(0, 3);
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fadder.com";

export async function generateMetadata({
  params,
  searchParams,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const lang = normalizeLang(resolvedSearchParams?.lang);
  const post = await findPost(lang, resolvedParams.slug);
  if (!post) {
    return { title: "Blog", description: "News and updates." };
  }
  return {
    title: post.title,
    description: post.sharing_description || post.news_lead,
    openGraph: {
      title: post.title,
      description: post.sharing_description || post.news_lead,
      images: post.sharing_image ? [{ url: post.sharing_image }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const lang = normalizeLang(resolvedSearchParams?.lang);
  const post = await findPost(lang, resolvedParams.slug);
  const canonicalUrl = `${SITE_URL}/blog/${resolvedParams.slug}?lang=${lang}`;
  const relatedPosts = post ? await getRelatedPosts(lang, post.id) : [];

  if (!post) {
    return (
      <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] max-wide:px-[60px] max-tablet:px-8 max-narrow:px-4">
        <Breadcrumbs
          items={[
            { label: "Home page", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Not found" },
          ]}
        />
        <div className="mt-10">
          <h1 className="text-2xl font-bold text-foreground m-0">
            Article not found
          </h1>
          <p className="text-base text-muted mt-4">
            Try another article or return to the blog list.
          </p>
          <Button href="/blog" variant="secondary" size="sm">
            Back to blog
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-10 text-foreground max-wide:px-[60px] max-tablet:px-8 max-narrow:px-4">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: schema.org markup
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: post.title,
            description: post.sharing_description || post.news_lead,
            image: post.sharing_image ? [post.sharing_image] : undefined,
            inLanguage: lang,
            mainEntityOfPage: canonicalUrl,
            author: {
              "@type": "Organization",
              name: "Fadder",
            },
            publisher: {
              "@type": "Organization",
              name: "Fadder",
            },
          }),
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Home page", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <header className="flex flex-col gap-4 max-w-[960px] mx-auto w-full">
        <h1 className="text-[32px] leading-[38px] font-bold m-0 text-foreground">
          {post.title}
        </h1>
        <p className="text-base leading-5 text-muted m-0">{post.news_lead}</p>
        {post.sharing_image ? (
          <div className="relative h-[420px] rounded-[16px] overflow-hidden">
            <Image
              src={post.sharing_image}
              alt=""
              fill
              sizes="(max-width: 834px) 100vw, 960px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : null}
      </header>

      <article className="flex flex-col gap-6 max-w-[960px] mx-auto w-full">
        {post.content_factory.map((block) => {
          if (block.type === "text") {
            const key = `text-${block.value.slice(0, 48)}`;
            return (
              <div
                key={key}
                className="text-base leading-6 text-foreground"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: WYSIWYG HTML from trusted CMS
                dangerouslySetInnerHTML={{ __html: block.value }}
              />
            );
          }
          if (block.type === "image") {
            return (
              <Image
                key={`image-${block.value.id}`}
                src={block.value.url}
                width={block.value.width}
                height={block.value.height}
                className="w-full h-auto rounded-[16px]"
                alt=""
                unoptimized
              />
            );
          }
          if (block.type === "youtube") {
            return (
              <div
                key={`youtube-${block.value}`}
                className="relative w-full pt-[56.25%] rounded-[16px] overflow-hidden bg-black"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${block.value}`}
                  className="absolute inset-0 w-full h-full"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            );
          }
          return null;
        })}
      </article>

      <div className="max-w-[960px] mx-auto w-full">
        <Button
          href={`/blog?lang=${lang}`}
          variant="primary"
          size="md"
          className="w-fit"
        >
          Back to blog
        </Button>
      </div>

      {relatedPosts.length > 0 ? (
        <section className="w-full max-w-[1760px] mx-auto flex flex-col gap-6">
          <h2 className="text-2xl font-bold leading-7 m-0 text-foreground">
            Other articles
          </h2>
          <div className="grid grid-cols-3 gap-6 max-wide:grid-cols-2 max-tablet:grid-cols-1">
            {relatedPosts.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-[16px] overflow-hidden flex flex-col shadow-card-soft"
              >
                <div className="relative h-[180px] bg-surface rounded-t-[16px] overflow-hidden">
                  <Image
                    src={item.sharing_image}
                    alt=""
                    fill
                    sizes="(max-width: 834px) 100vw, 560px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <h3 className="text-base font-bold m-0 text-dark">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted m-0 flex-1">
                    {item.news_lead}
                  </p>
                  <Button
                    href={`/blog/${getPostSlug(item)}?lang=${lang}`}
                    variant="secondary"
                    size="sm"
                    className="w-fit"
                  >
                    Read more
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <ContactSection />
    </main>
  );
}
