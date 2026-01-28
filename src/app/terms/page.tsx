import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";
import styles from "./terms.module.css";

const termsSections = [
  {
    title: "General Terms",
    items: [
      "All services comply with applicable Polish and EU transport regulations.",
      "A prepayment of 30–50% is required before vehicle purchase at auction (Copart, IAAI, or others).",
      "By placing an order, you accept these Terms and Conditions in full.",
      "Full payment must be completed before shipping begins.",
      "The company reserves the right to decline service at its sole discretion.",
      "Payments are accepted via bank transfer to the official company account.",
      "All customs duties, taxes, and port fees are paid separately by the client.",
      "Prices are quoted in USD unless stated otherwise.",
      "Refunds are only available before vehicle purchase at auction.",
    ],
  },
  {
    title: "Delivery Terms",
    items: [
      "Estimated delivery time varies based on auction location, customs procedures, and logistics routes.",
      "Typical timeframes:\n- USA → EU: 30–45 days\n- Intra-EU transport: 3–7 days",
      "The client must provide a valid delivery address and contact information.",
      "Delivery times are approximate and may change due to customs or shipping delays.",
      "Free vehicle storage is provided at our terminal for up to 30 days after arrival.",
      "The company is not responsible for force majeure delays or third-party carrier disruptions.",
    ],
  },
  {
    title: "Insurance & Liability",
    items: [
      "All vehicles are insured during ocean and ground transportation.",
      "Insurance covers physical damage only (not mechanical or hidden defects).",
      "The client must inspect the vehicle within 24 hours after delivery.",
      "Any damage must be noted in the delivery acceptance protocol.",
      "Claims must be submitted within 48 hours of delivery.",
      "Company liability is limited to the amount of the paid service fee.",
    ],
  },
  {
    title: "Cancellation Policy",
    items: [
      "Free cancellation is available before the vehicle purchase at auction.",
      "After the auction purchase, refunds are not available.",
      "If an error occurs during the auction due to company fault, a full refund is provided.",
      "Service fees become non-refundable once documentation processing begins.",
    ],
  },
  {
    title: "Client Responsibilities",
    items: [
      "Provide accurate and complete documentation required for customs and transport.",
      "Respond to company requests or clarifications within 48 hours.",
      "Ensure availability to receive the vehicle upon delivery.",
      "Verify the vehicle condition at the time of delivery.",
      "Complete all customs clearance payments in a timely manner.",
      "Follow all safety and compliance requirements during unloading and acceptance.",
    ],
  },
  {
    title: "Force Majeure",
    items: [
      "In the event of unforeseen circumstances (natural disasters, wars, port strikes, or customs restrictions), Fadder will take reasonable measures to minimize delays.\nEach such case will be handled individually, and timelines may be extended accordingly.",
    ],
  },
];

const serviceRows = [
  {
    service: "Auction Purchase",
    timeline: "1-3 days",
    terms: "Subject to auction availability",
  },
  {
    service: "Document Processing",
    timeline: "5-7 days",
    terms: "All documents must be provided by client",
  },
  {
    service: "Sea Transportation",
    timeline: "25-45 days",
    terms: "Depends on origin port and route",
  },
  {
    service: "Customs Clearance",
    timeline: "3-7 days",
    terms: "Subject to customs inspection",
  },
  {
    service: "Final Delivery",
    timeline: "2-7 days",
    terms: "Depends on delivery location in Poland",
  },
];

const privacyText =
  "We collect and process personal data in accordance with the General Data Protection Regulation (GDPR) and applicable Polish data protection laws.\nYour information is used solely to provide and improve our services and will never be shared with third parties except when required for service delivery (e.g. shipping companies, customs authorities, or payment processors).\nYou have the right to:\nAccess your personal data\nRequest correction of inaccurate information\nRequest deletion (“right to be forgotten”) of your data at any time\nTo exercise your rights or for any data-related inquiries, please contact our Data Protection Officer at:\nprivacy@fadder@gmail.com";

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <Breadcrumbs items={[{ label: "Home page", href: "/" }, { label: "Terms" }]} />
      <PageHeader
        title="Terms & Conditions"
        subtitle="Please read our terms and conditions carefully before using our services"
      />

      <section className={styles.content}>
        <div className={styles.noticeCard}>
          <h3 className={styles.noticeTitle}>Important Notice</h3>
          <p className={styles.noticeText}>
            These Terms and Conditions form a legally binding agreement between you (the
            Client) and Fadder. By using our website and services, you confirm that you have
            read, understood, and agreed to these Terms. Please review them carefully before
            placing any order.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {termsSections.map((section) => (
            <article key={section.title} className={styles.infoCard}>
              <h3 className={styles.cardTitle}>{section.title}</h3>
              <div className={styles.cardList}>
                {section.items.map((item) => (
                  <p key={item} className={styles.cardItem}>
                    {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.serviceTable}>
          <div className={`${styles.tableCell} ${styles.tableHeader} ${styles.tableHeaderLeft}`}>
            Service
          </div>
          <div className={`${styles.tableCell} ${styles.tableHeader} ${styles.tableHeaderCenter}`}>
            Timeline
          </div>
          <div className={`${styles.tableCell} ${styles.tableHeader} ${styles.tableHeaderRight}`}>
            Terms
          </div>
          {serviceRows.map((row, index) => (
            <div key={`${row.service}-${index}`} className={styles.tableRow}>
              <div
                className={`${styles.tableCell} ${styles.tableCellLeft} ${
                  index === serviceRows.length - 1 ? styles.tableCellLeftRadius : ""
                }`}
              >
                {row.service}
              </div>
              <div className={`${styles.tableCell} ${styles.tableCellCenter}`}>
                {row.timeline}
              </div>
              <div
                className={`${styles.tableCell} ${styles.tableCellRight} ${
                  index === serviceRows.length - 1 ? styles.tableCellRightRadius : ""
                }`}
              >
                {row.terms}
              </div>
            </div>
          ))}
        </div>

        <article className={styles.privacyCard}>
          <h3 className={styles.cardTitle}>Privacy & Data Protection</h3>
          <p className={styles.privacyText}>{privacyText}</p>
        </article>

        <ContactSection />
      </section>
    </main>
  );
}
