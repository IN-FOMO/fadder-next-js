import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

const footerColumns = [
  {
    title: "Vehicle Type",
    items: [
      "Cars",
      "Trucks",
      "RVs",
      "Motorcycles",
      "Buses",
      "Trailers",
      "Boats",
      "Jet Skis",
      "Snowmobiles",
      "Industrial Machinery",
    ],
  },
  {
    title: "Brand",
    items: [
      "Acura",
      "Audi",
      "BMW",
      "Chevrolet",
      "Cadillac",
      "Honda",
      "Kia",
      "Jeep",
      "Lexus",
      "Subaru",
    ],
  },
  {
    title: "Country",
    items: [
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "France",
      "Ukraine",
      "Georgia",
      "Saudi Arabia",
      "Japan",
      "Australia",
    ],
  },
  {
    title: "Auction",
    items: [
      "Today's Auctions",
      "Auctions Calendar",
      "Join Auction",
      "Night Cap Sales",
      "Bank-Repo Vehicles",
      "Rental Auctions",
      "Wholesale Auctions",
    ],
  },
];

export function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTopRow}>
          <div className={styles.footerInfo}>
            <button type="button" className={styles.languageButton}>
              <span>English</span>
              <Image src="/figma/icons/icon-arrow-down.svg" alt="" width={24} height={24} />
            </button>
            <div className={styles.footerContact}>
              <span>Email: support@yourwebsite.com</span>
              <span>Address: 123 Auto Avenue, Miami, FL, USA</span>
            </div>
            <Image
              src="/figma/images/footer-socials.svg"
              alt=""
              width={176}
              height={32}
              className={styles.footerSocials}
            />
          </div>
          <div className={styles.footerColumns}>
            {footerColumns.map((column) => (
              <div key={column.title} className={styles.footerColumn}>
                <h4>{column.title}</h4>
                <div className={styles.footerItems}>
                  {column.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footerMap}>
          <iframe
            className={styles.footerMapFrame}
            title="Silicon Valley map"
            src="https://www.google.com/maps?q=Silicon%20Valley%2C%20CA&z=10&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className={styles.footerBottom}>
          <Link href="/blog">Blog</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
