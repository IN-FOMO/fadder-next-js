import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Delivery", href: "/delivery" },
  { label: "Terms", href: "/terms" },
  { label: "Help", href: "/help" },
  { label: "About", href: "/about" },
  { label: "Information", href: "/information" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/figma/icons/logo.svg"
          alt="Fadder"
          width={134}
          height={40}
          className={styles.logoImage}
        />
      </Link>
      <nav className={styles.nav}>
        {navLinks.map((item) => (
          <Link key={item.label} href={item.href} className={styles.navItem}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.headerActions}>
        <button type="button" className={styles.iconOnlyButton}>
          <Image src="/figma/icons/icon-search.svg" alt="" width={40} height={40} />
        </button>
        <button type="button" className={styles.langButton}>
          <span>English</span>
          <Image
            src="/figma/icons/icon-arrow-down.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
        <button type="button" className={styles.iconButton}>
          <Image src="/figma/icons/icon-wallet.svg" alt="" width={24} height={24} />
          <span>$0</span>
        </button>
        <button type="button" className={styles.iconButton}>
          <Image src="/figma/icons/icon-gavel.svg" alt="" width={24} height={24} />
          <span>0 | 0</span>
        </button>
        <button type="button" className={styles.iconButton}>
          <Image src="/figma/icons/icon-heart.svg" alt="" width={24} height={24} />
          <span>0</span>
        </button>
        <Link href="/account" className={styles.accountButton}>
          <Image
            src="/figma/images/my-account.png"
            alt=""
            width={24}
            height={24}
            className={styles.accountAvatar}
          />
          <span>My Account</span>
        </Link>
      </div>
      <div className={styles.mobileActions}>
        <button type="button" className={styles.mobileMenu}>
          <Image src="/figma/icons/icon-menu.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </header>
  );
}
