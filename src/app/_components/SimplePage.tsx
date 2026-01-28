import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageHeader } from "./PageHeader";
import styles from "./simple-page.module.css";

type SimplePageProps = {
  title: string;
  description: string;
};

export function SimplePage({ title, description }: SimplePageProps) {
  return (
    <main className={styles.page}>
      <Breadcrumbs items={[{ label: "Home page", href: "/" }, { label: title }]} />
      <PageHeader title={title} subtitle={description} />
      <Link className={styles.link} href="/">
        Back to home
      </Link>
    </main>
  );
}
