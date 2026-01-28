import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

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
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Latest Insights from Our Blog</h2>
        <Link className={styles.viewAll} href="/blog">
          View all
        </Link>
      </div>
      <div className={styles.blogGrid}>
        {cards.map((card) => (
          <article key={card.title} className={styles.blogCard}>
            <div className={styles.blogImage}>
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 834px) 100vw, 560px"
                className={styles.coverImage}
              />
            </div>
            <div className={styles.blogBody}>
              <span className={styles.blogDate}>{card.date}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link href="/blog" className={styles.secondaryButton}>
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
