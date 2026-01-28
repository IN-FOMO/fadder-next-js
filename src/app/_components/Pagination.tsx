import Image from "next/image";
import styles from "./pagination.module.css";

type PaginationProps = {
  pages: Array<number | string>;
  current?: number;
};

export function Pagination({ pages, current }: PaginationProps) {
  return (
    <div className={styles.pagination} role="navigation" aria-label="Pagination">
      <button type="button" className={styles.navButton}>
        <Image src="/figma/icons/icon-arrow-left.svg" alt="" width={24} height={24} />
        <span>Prev</span>
      </button>
      <div className={styles.pageList}>
        {pages.map((page, index) => {
          const isActive = typeof page === "number" && page === current;
          return (
            <button
              key={`${page}-${index}`}
              type="button"
              className={`${styles.pageButton} ${isActive ? styles.pageActive : ""}`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button type="button" className={styles.navButton}>
        <span>Next</span>
        <Image src="/figma/icons/icon-arrow-right.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}
