import Link from "next/link";
import styles from "./simple-page.module.css";

type SimplePageProps = {
  title: string;
  description: string;
};

export function SimplePage({ title, description }: SimplePageProps) {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{description}</p>
      <Link className={styles.link} href="/">
        Back to home
      </Link>
    </main>
  );
}
