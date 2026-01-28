import Image from "next/image";
import { FilterPanel } from "./FilterPanel";
import styles from "../page.module.css";

export function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.hero}>
        <Image
          src="/figma/images/hero-1920.png"
          alt=""
          fill
          sizes="(max-width: 1440px) 100vw, 1760px"
          className={`${styles.heroImage} ${styles.coverImage}`}
          priority
        />
        <div className={styles.heroOverlay} />
        <h1 className={styles.heroTitle}>Buying & Shipping American Automobiles</h1>
      </div>
      <div className={styles.heroSearch}>
        <FilterPanel className={styles.filterCard} />
      </div>
    </section>
  );
}
