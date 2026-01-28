import Image from "next/image";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { PageHeader } from "../_components/PageHeader";
import styles from "./delivery.module.css";

const deliveryOptions = [
  {
    title: "Ground Transport",
    description: "Delivery by auto carrier within Europe",
    details: ["Duration: 3–7 days", "Coverage: Major cities in Poland and EU"],
    icon: "/figma/icons/icon-delivery-ground.svg",
  },
  {
    title: "Sea Shipping",
    description: "Container shipping from the USA and other international locations",
    details: ["Duration: 30–45 days", "Coverage: All EU countries"],
    icon: "/figma/icons/icon-delivery-sea.svg",
  },
  {
    title: "Express Delivery",
    description: "Fast shipping to key European destinations",
    details: ["Duration: 5–10 days", "Coverage: Selected major cities"],
    icon: "/figma/icons/icon-delivery-express.svg",
  },
];

const pricingRows = [
  { route: "Hamburg → Berlin", price: "$ 1,200", time: "2–3 days" },
  { route: "Munich → Frankfurt", price: "$ 950", time: "2–4 days" },
  { route: "Munich → Münster", price: "$ 1,100", time: "3–5 days" },
  { route: "Hamburg → Hannover", price: "$ 850", time: "1–2 days" },
];

const includedItems = [
  "Full cargo insurance for the entire transportation period",
  "Professional loading and unloading of vehicles",
  "Real-time cargo tracking",
  "Complete documentation handling",
];

const requiredDocs = [
  "Vehicle registration certificate",
  "Owner's ID or passport",
  "Purchase agreement (if applicable)",
  "Power of attorney (if sender is not the owner)",
];

export default function DeliveryPage() {
  return (
    <main className={styles.page}>
      <Breadcrumbs items={[{ label: "Home page", href: "/" }, { label: "Delivery" }]} />
      <PageHeader
        title="Delivery"
        subtitle="Professional car delivery throughout Poland with full cargo insurance"
      />

      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Image
            src="/figma/images/delivery-hero.png"
            alt=""
            width={1760}
            height={587}
            className={styles.heroImage}
          />
        </div>
        <div className={styles.deliveryCards}>
          {deliveryOptions.map((option) => (
            <article key={option.title} className={styles.deliveryCard}>
              <Image
                src={option.icon}
                alt=""
                width={48}
                height={48}
                className={styles.deliveryIcon}
              />
              <h3 className={styles.cardTitle}>{option.title}</h3>
              <p className={styles.cardDescription}>{option.description}</p>
              <div className={styles.cardDetails}>
                {option.details.map((text) => (
                  <p key={text} className={styles.cardDetail}>
                    {text}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.pricingSection}>
        <div className={styles.pricingTable}>
          <div className={styles.tableColumn}>
            <div className={`${styles.tableCell} ${styles.tableHeader} ${styles.tableHeaderLeft}`}>
              Route
            </div>
            {pricingRows.map((row, index) => (
              <div
                key={row.route}
                className={`${styles.tableCell} ${styles.tableCellRoute} ${
                  index === pricingRows.length - 1 ? styles.tableCellLeftRadius : ""
                }`}
              >
                {row.route}
              </div>
            ))}
          </div>
          <div className={styles.tableColumnPrice}>
            <div
              className={`${styles.tableCell} ${styles.tableHeader} ${styles.tableHeaderPrice}`}
            >
              Price
            </div>
            {pricingRows.map((row) => (
              <div key={row.route} className={`${styles.tableCell} ${styles.tableCellPrice}`}>
                {row.price}
              </div>
            ))}
          </div>
          <div className={styles.tableColumn}>
            <div className={`${styles.tableCell} ${styles.tableHeader} ${styles.tableHeaderRight}`}>
              Delivery Time
            </div>
            {pricingRows.map((row, index) => (
              <div
                key={row.route}
                className={`${styles.tableCell} ${styles.tableCellDelivery} ${
                  index === pricingRows.length - 1 ? styles.tableCellRightRadius : ""
                }`}
              >
                {row.time}
              </div>
            ))}
          </div>
        </div>
        <p className={styles.pricingNote}>
          *Prices are indicative for standard passenger vehicles. Actual cost depends on
          vehicle type, dimensions, weight, pickup location, and current route availability
        </p>
      </section>

      <section className={styles.infoCards}>
        <article className={styles.infoCard}>
          <h3 className={styles.cardTitle}>What's Included</h3>
          <div className={styles.cardList}>
            {includedItems.map((item) => (
              <p key={item} className={styles.cardDetail}>
                {item}
              </p>
            ))}
          </div>
        </article>
        <article className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Required Documents</h3>
          <div className={styles.cardList}>
            {requiredDocs.map((item) => (
              <p key={item} className={styles.cardDetail}>
                {item}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.historyCard}>
        <div className={styles.historyHeader}>
          <h3 className={styles.historyTitle}>Full Car History</h3>
          <Image
            src="/figma/icons/icon-exclamation-circle.svg"
            alt=""
            width={24}
            height={24}
            className={styles.historyIcon}
          />
        </div>
        <p className={styles.historyText}>
          Get a comprehensive report (similar to Carfax) including accident history, service
          records, and more.
        </p>
        <button type="button" className={styles.historyButton}>
          Request Full History (Carfax)
        </button>
      </section>
    </main>
  );
}
