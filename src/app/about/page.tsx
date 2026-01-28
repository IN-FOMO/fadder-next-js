import Image from "next/image";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { PageHeader } from "../_components/PageHeader";
import styles from "./about.module.css";

const missionVision = [
  {
    title: "Our Mission",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Our Vision",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const stats = [
  { value: "5000+", label: "Delivered Vehicles" },
  { value: "2000+", label: "Happy Clients" },
  { value: "15+", label: "Partner Countries" },
  { value: "24/7", label: "Customer Support" },
];

const timeline = [
  {
    year: "2014",
    title: "Founded in Warsaw, Poland",
    description:
      "Fadder was established as a small local transport company, focusing on car delivery services within Poland and neighboring countries. Our mission was simple — make vehicle transport reliable and transparent.",
  },
  {
    year: "2016",
    title: "Expansion Across Europe",
    description:
      "We launched our first international routes, covering Germany, the Czech Republic, and the Netherlands. The growing demand for cross-border vehicle logistics helped us build partnerships with leading dealerships and private clients.",
  },
  {
    year: "2018",
    title: "Digital Transformation",
    description:
      "Fadder introduced its first online booking and tracking system, allowing customers to schedule shipments and monitor delivery in real time. This innovation made the process faster and more secure.",
  },
  {
    year: "2020",
    title: "B2B and Fleet Services",
    description:
      "We expanded our services for corporate clients, offering full-cycle logistics solutions for dealerships and leasing companies. Despite the global challenges, the company continued to grow and optimize its operations.",
  },
  {
    year: "2022",
    title: "Sustainable Logistics Initiative",
    description:
      "Fadder began implementing eco-friendly solutions, including route optimization and a partial transition to low-emission transport vehicles, contributing to greener logistics in Europe.",
  },
  {
    year: "2024",
    title: "Global Network and Automation",
    description:
      "Today, Fadder operates across the entire EU and UK, integrating AI-based systems for route planning, customer service, and shipment tracking — ensuring efficiency, safety, and transparency at every stage.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <Breadcrumbs items={[{ label: "Home page", href: "/" }, { label: "About" }]} />
      <PageHeader
        title="About Fadder"
        subtitle="Helping individuals and companies purchase quality vehicles from abroad since 2014"
      />

      <section className={styles.section}>
        <div className={styles.missionGrid}>
          {missionVision.map((item) => (
            <article key={item.title} className={styles.infoCard}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.statsGrid}>
          {stats.map((item) => (
            <div key={item.label} className={styles.statCard}>
              <div className={styles.statValue}>{item.value}</div>
              <div className={styles.statLabel}>{item.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.timeline}>
          {timeline.map((item) => (
            <div key={item.year} className={styles.timelineItem}>
              <div className={styles.timelineYear}>{item.year}</div>
              <div className={styles.timelineCard}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <section className={styles.contactSection}>
          <div className={styles.contactContent}>
            <div className={styles.contactHeader}>
              <h3 className={styles.contactTitle}>Have Questions? We're Here to Help!</h3>
              <p className={styles.contactSubtitle}>
                Our expert team is ready to assist you with any questions about our auctions,
                bidding process, or vehicle inspections.
                {"\n"}
                {"\n"}
                Get in touch today!
              </p>
            </div>
            <div className={styles.contactForm}>
              <div className={styles.inputRow}>
                <input className={styles.input} placeholder="Last Name" />
                <input className={styles.input} placeholder="First Name" />
              </div>
              <input className={styles.inputWide} placeholder="Email" />
              <input className={styles.inputWide} placeholder="Phone Number" />
              <textarea className={styles.textArea} placeholder="Message" />
              <div className={styles.buttonRow}>
                <button type="button" className={styles.primaryButton}>
                  Send Message
                </button>
                <button type="button" className={styles.secondaryButton}>
                  Ask to chat
                </button>
              </div>
            </div>
          </div>
          <div className={styles.contactImage}>
            <Image
              src="/figma/images/terms-contact.png"
              alt=""
              width={832}
              height={536}
              className={styles.contactImg}
            />
          </div>
        </section>
      </section>
    </main>
  );
}
