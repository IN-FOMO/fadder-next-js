import Image from "next/image";
import Link from "next/link";

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
    <section className="flex flex-col gap-4 w-full max-w-[1760px] mx-auto px-20 max-wide:px-[60px] max-tablet:px-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold leading-7 m-0 text-black">
          Latest Insights from Our Blog
        </h2>
        <Link
          href="/blog"
          className="text-base font-bold text-foreground no-underline bg-white py-2.5 px-4 rounded-[16px] inline-flex items-center justify-center hover:bg-surface transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="flex items-stretch gap-4 max-tablet:flex-col">
        {cards.map((card) => (
          <article
            key={card.title}
            className="bg-white rounded-[16px] overflow-hidden flex flex-col flex-1"
          >
            <div className="relative h-[180px] bg-surface rounded-t-[16px] overflow-hidden">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 834px) 100vw, 576px"
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col justify-between gap-6 flex-1">
              <div className="flex flex-col gap-6">
                <span className="text-base leading-5 text-black">
                  {card.date}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold leading-6 m-0 text-black">
                    {card.title}
                  </h3>
                  <p className="text-base leading-5 m-0 text-black">
                    {card.description}
                  </p>
                </div>
              </div>
              <Link
                href="/blog"
                className="flex items-center justify-center gap-2.5 px-8 h-[52px] bg-surface rounded-[14px] text-base leading-5 font-bold text-black no-underline"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
