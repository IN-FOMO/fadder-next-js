import Image from "next/image";
import Link from "next/link";
import styles from "./breadcrumbs.module.css";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={`${item.label}-${index}`} className={styles.crumbGroup}>
            {item.href && !isLast ? (
              <Link className={styles.crumb} href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className={`${styles.crumb} ${styles.crumbActive}`}>{item.label}</span>
            )}
            {!isLast ? (
              <Image
                src="/figma/icons/icon-arrow-right.svg"
                alt=""
                width={24}
                height={24}
                className={styles.icon}
              />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
