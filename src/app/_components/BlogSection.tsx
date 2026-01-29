import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";

export type BlogCard = {
  title: string;
  date: string;
  description: string;
  image: string;
};

type BlogSectionProps = {
  cards: BlogCard[];
};

export function BlogSection({ cards }: BlogSectionProps) {
  return (
    <section className="flex flex-col gap-4 mx-20 max-wide:mx-[60px] max-tablet:mx-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold m-0 text-dark">Latest Insights from Our Blog</h2>
        <Link
          href="/blog"
          className="text-base font-bold text-dark no-underline hover:underline active:underline"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-6 max-wide:grid-cols-2 max-tablet:grid-cols-1">
        {cards.map((card) => (
          <article key={card.title} className="bg-white rounded-lg overflow-hidden flex flex-col">
            <div className="relative h-[180px] bg-surface">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 834px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-3">
              <span className="text-sm text-muted">{card.date}</span>
              <h3 className="text-base font-bold m-0 text-dark">{card.title}</h3>
              <p className="text-sm text-muted m-0">{card.description}</p>
              <Button href="/blog" variant="secondary" size="sm" className="w-fit">
                Read more
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
