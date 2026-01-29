"use client";

import Image from "next/image";
import { useState } from "react";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { VehicleCard, type VehicleCardData } from "../_components/VehicleCard";
import styles from "./vehicle.module.css";

const primarySpecs = [
  { label: "Lot Number", value: "62812505" },
  { label: "VIN", value: "123ABC456DEF789GHI" },
  { label: "Title Code", value: "NH CERT OF TITLE-SALVAGE" },
  { label: "Loss", value: "Collision" },
  { label: "Primary damage", value: "Right front" },
  { label: "Secondary Damage", value: "Rear End" },
  { label: "Odometer", value: "25 145 mi (40 467 km)" },
  { label: "Start code", value: "Starts" },
  { label: "Key", value: "Present" },
  { label: "Est. Repair Cost", value: "$10,525 USD" },
  { label: "Est. Retail Value", value: "$13,974 USD" },
];

const secondarySpecs = [
  { label: "Body Style", value: "Coupe" },
  { label: "Exterior color", value: "Black" },
  { label: "Engine", value: "5.7L, V8" },
  { label: "Transmission", value: "Automatic" },
  { label: "Fuel Type", value: "Gasoline" },
  { label: "Drive Type", value: "Rear wheel drive" },
];

const calculatorRows = [
  { label: "Lot Price", value: "$6,000" },
  { label: "Auction Fees", value: "$955" },
  { label: "Trucking to port", value: "$400" },
  { label: "Shipping to", value: "$1,595" },
  { label: "BidCars Fee (+ VAT/Tax)", value: "$450" },
];

const faqItems = [
  {
    question: "Are the vehicles new or used?",
    answer:
      "Most vehicles on the platform are new or nearly new from official dealers and verified partners. Some listings may be used—mileage and condition are always clearly stated.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We support modern international payment options, including bank transfers and crypto payments, so you can choose the most convenient and secure method.",
  },
  {
    question: "Can I pay in USD or EUR?",
    answer:
      "Yes. We accept payments in USD and EUR. The final currency depends on the seller, contract terms, and deal structure.",
  },
  {
    question: "Can I pay on behalf of a company?",
    answer:
      "Yes. Vehicles can be purchased by individuals or legal entities. All necessary invoices and commercial documents are issued accordingly.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location, destination country, and transport method. Estimated timelines are provided before payment.",
  },
  {
    question: "Which delivery options are available?",
    answer:
      "Vehicles ship from major logistics hubs and ports in China. Depending on your region, delivery can be organized by sea, rail, or road transport.",
  },
  {
    question: "Can I track the vehicle during delivery?",
    answer:
      "Yes. You will receive regular status updates and tracking information to follow the delivery step by step.",
  },
  {
    question: "Do you deliver to my country?",
    answer:
      "We deliver to most European countries, CIS regions, and selected global markets. Contact our team to confirm delivery to your country.",
  },
  {
    question: "Who is responsible for the vehicle during delivery?",
    answer:
      "Your vehicle is insured during transport. Liability, coverage, and delivery terms are confirmed before shipment, and our team provides full support.",
  },
  {
    question: "How safe is the platform?",
    answer:
      "Fadder works only with vetted sellers and reliable partners. Every deal runs through secure processes to ensure transparency and buyer protection.",
    open: true,
  },
];

const similarCards: VehicleCardData[] = [
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-1.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "IAAI",
    bid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-2.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "Copart",
    bid: "$725",
  },
  {
    title: "1981 Chevrolet Corvette",
    image: "/figma/images/vehicle-3.png",
    odometer: "25 145 mi (40 467 km)",
    engine: "5.7L, V8",
    transmission: "Automatic",
    fuel: "Gasoline",
    drive: "Rear wheel drive",
    timer: "1 d 21 h 23 min 00 sec",
    auction: "Copart",
    bid: "$725",
  },
];

export default function VehiclePage() {
  const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    faqItems.forEach((item) => {
      initial[item.question] = item.open ?? false;
    });
    return initial;
  });

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: "Home page", href: "/" },
          { label: "Сatalog", href: "/search" },
          { label: "Chevrolet" },
          { label: "1982 Chevrolet Corvette" },
        ]}
      />

      <div className={styles.titleRow}>
        <h1 className={styles.title}>1982 Chevrolet Corvette</h1>
        <span className={`${styles.auctionBadge} ${styles.titleBadge}`}>Copart</span>
      </div>

      <div className={styles.pageBody}>
        <section className={styles.content}>
          <div className={styles.mediaColumn}>
          <div className={styles.mainImageWrap}>
            <Image
              src="/figma/images/vehicle-detail-main-22d215.png"
              alt=""
              width={700}
              height={460}
              className={styles.mainImage}
            />
            <button type="button" className={`${styles.mediaNav} ${styles.mediaNavLeft}`}>
              <Image src="/figma/icons/icon-arrow-left.svg" alt="" width={24} height={24} />
            </button>
            <button type="button" className={`${styles.mediaNav} ${styles.mediaNavRight}`}>
              <Image src="/figma/icons/icon-arrow-right.svg" alt="" width={24} height={24} />
            </button>
          </div>
          <div className={styles.thumbGrid}>
            {Array.from({ length: 15 }).map((_, index) => (
              <Image
                key={`thumb-${index}`}
                src="/figma/images/vehicle-detail-thumb-22d215.png"
                alt=""
                width={140}
                height={72}
                className={`${styles.thumbImage} ${index === 0 ? styles.thumbActive : ""}`}
              />
            ))}
          </div>
          <div className={styles.leftCard}>
            <div className={styles.cardHeaderRow}>
              <h3 className={styles.cardTitle}>Full Car History</h3>
              <Image src="/figma/icons/icon-exclamation-circle.svg" alt="" width={24} height={24} />
            </div>
            <p className={styles.cardTextDark}>
              Get a comprehensive report (similar to Carfax) including accident history, service
              records, and more.
            </p>
            <button type="button" className={styles.primaryButton}>
              Request Full History (Carfax)
            </button>
          </div>
          <div className={styles.leftCard}>
            <div className={styles.cardHeaderRow}>
              <h3 className={styles.cardTitle}>Get Alerts for Similar Vehicles</h3>
              <Image src="/figma/icons/icon-exclamation-circle.svg" alt="" width={24} height={24} />
            </div>
            <div className={styles.alertStack}>
              <input className={styles.alertInput} placeholder="Email" />
              <div className={styles.frequencyRow}>
                <span className={styles.frequencyLabel}>Select Frequency</span>
                <div className={styles.frequencyOptions}>
                  <label className={styles.radioItem}>
                    <span className={styles.radioChecked} />
                    <span>Daily</span>
                  </label>
                  <label className={styles.radioItem}>
                    <span className={styles.radioUnchecked} />
                    <span>Weekly</span>
                  </label>
                </div>
              </div>
            </div>
            <button type="button" className={styles.alertButton}>
              <Image src="/figma/icons/icon-notification-bell.svg" alt="" width={24} height={24} />
              <span>Set Alert</span>
            </button>
          </div>
          <div className={styles.leftCard}>
            <h3 className={styles.cardTitle}>Legal Import Restrictions</h3>
            <p className={styles.legalText}>
              Potential Restrictions:
              {"\n"}Vehicles older than 10 years may incur higher import duties in Poland.
              {"\n"}Salvage title vehicles require a mandatory technical inspection and
              re-registration process in Poland.
              {"\n"}Emissions standards apply to imported vehicles. This 2022 Camry meets Euro 6.
            </p>
            <p className={styles.legalNote}>
              Please consult with a local expert for definitive information.
            </p>
          </div>
        </div>

        <div className={styles.specsColumn}>
          <div className={styles.specsCard}>
            <div className={styles.specsGrid}>
              {primarySpecs.map((item) => (
                <div key={item.label} className={styles.specRow}>
                  <span className={styles.specLabel}>{item.label}</span>
                  <span className={styles.specValue}>
                    {item.value}
                    {item.label === "Lot Number" || item.label === "VIN" ? (
                      <Image
                        src="/figma/icons/icon-copy.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={styles.copyIcon}
                      />
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.specsCard}>
            <div className={styles.specsGrid}>
              {secondarySpecs.map((item) => (
                <div key={item.label} className={styles.specRow}>
                  <span className={styles.specLabel}>{item.label}</span>
                  <span className={styles.specValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.calculatorCard}>
            <div className={styles.calculatorHeader}>
              <h3 className={styles.cardTitle}>Final Price Calculator</h3>
              <Image src="/figma/icons/icon-exclamation-circle.svg" alt="" width={24} height={24} />
            </div>
            <div className={styles.calculatorList}>
              {calculatorRows.map((row) => (
                <div key={row.label} className={styles.calculatorRow}>
                  <span className={styles.specLabel}>{row.label}</span>
                  <span className={styles.specValue}>{row.value}</span>
                </div>
              ))}
              <div className={styles.calculatorTotal}>
                <span>Subtotal</span>
                <span>$8,950</span>
              </div>
              <p className={styles.calculatorNote}>
                The calculator check location of the vehicle and shipment from one of the six
                ports in the USA depending on the branch location. Penalties and additional
                auction fees
              </p>
            </div>
          </div>
        </div>

        <div className={styles.actionsColumn}>
          <div className={styles.actionRow}>
            <button type="button" className={styles.shareButton}>
              <Image src="/figma/icons/icon-share.svg" alt="" width={24} height={24} />
            </button>
            <button type="button" className={styles.shareButton}>
              <Image src="/figma/icons/icon-heart.svg" alt="" width={24} height={24} />
            </button>
            <button type="button" className={styles.askManagerButton}>
              Ask Manager
            </button>
          </div>

          <div className={styles.timeCard}>
            <div className={styles.timeRow}>
              <span className={styles.timeLabel}>Time left</span>
              <span className={styles.timeValue}>1 d 21 h 23 min 00 sec</span>
            </div>
            <button type="button" className={styles.calendarButton}>
              <Image src="/figma/icons/icon-reminder.svg" alt="" width={24} height={24} />
              <span>Add to calendar</span>
            </button>
          </div>

          <div className={styles.bidCard}>
            <div className={styles.bidHeader}>
              <span className={styles.bidTitle}>Your bid</span>
              <Image src="/figma/icons/icon-question.svg" alt="" width={24} height={24} />
            </div>
            <div className={styles.bidControls}>
              <div className={styles.bidAmount}>
                <button type="button" className={styles.bidControlButton}>
                  <Image src="/figma/icons/icon-minus.svg" alt="" width={24} height={24} />
                </button>
                <span className={styles.bidValue}>$525</span>
                <button type="button" className={styles.bidControlButton}>
                  <Image src="/figma/icons/icon-plus.svg" alt="" width={24} height={24} />
                </button>
              </div>
              <p className={styles.bidHint}>Enter Maximum Bid ($25 Bid Increments)</p>
            </div>
            <button type="button" className={styles.bidButton}>
              Bid Now
            </button>
          </div>

          <div className={styles.auctionCard}>
            <div className={styles.auctionRow}>
              <span className={styles.specLabel}>Auction</span>
              <span className={styles.auctionBadge}>Copart</span>
            </div>
            <div className={styles.auctionRow}>
              <span className={styles.specLabel}>Current Bid</span>
              <span className={styles.currentBid}>$525 USD</span>
            </div>
            <div className={styles.auctionRow}>
              <span className={styles.specLabel}>Bid Status</span>
              <span className={styles.specValueMuted}>You Haven't Bid</span>
            </div>
            <div className={styles.auctionRow}>
              <span className={styles.specLabel}>Sale Status</span>
              <span className={styles.specValue}>On Minimum Bid</span>
            </div>
            <div className={styles.auctionRow}>
              <span className={styles.specLabel}>Sellers Reserve</span>
              <span className={styles.specValue}>Not yet met</span>
            </div>
          </div>

          <div className={styles.fastBuyCard}>
            <div className={styles.fastBuyHeader}>
              <span className={styles.bidTitle}>Fast Buy Price</span>
              <Image src="/figma/icons/icon-question.svg" alt="" width={24} height={24} />
            </div>
            <span className={styles.fastBuyPrice}>$6,000 USD</span>
            <button type="button" className={styles.fastBuyButton}>
              Buy Now
            </button>
          </div>
        </div>
      </section>

        <section className={styles.faqSection}>
        <div className={styles.faqCard}>
          <div className={styles.faqHeaderRow}>
            <h3 className={styles.cardTitle}>FAQ</h3>
          </div>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <div
                key={item.question}
                  className={`${styles.faqItem} ${
                    openState[item.question] ? styles.faqItemOpen : ""
                  }`}
              >
                  <button
                    type="button"
                    className={styles.faqQuestionRow}
                    aria-expanded={openState[item.question]}
                    onClick={() =>
                      setOpenState((prev) => ({
                        ...prev,
                        [item.question]: !prev[item.question],
                      }))
                    }
                  >
                    <span className={styles.faqQuestion}>{item.question}</span>
                    <Image
                      src={
                        openState[item.question]
                          ? "/figma/icons/icon-minus.svg"
                          : "/figma/icons/icon-plus.svg"
                      }
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                  <div
                    className={`${styles.faqAnswerWrap} ${
                      openState[item.question] ? styles.faqAnswerOpen : ""
                    }`}
                  >
                    <p className={styles.faqAnswer}>{item.answer}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.similarSection}>
        <div className={styles.similarHeader}>
          <h2 className={styles.similarTitle}>Similar Auctions</h2>
          <button type="button" className={styles.viewAllButton}>
            View all
          </button>
        </div>
        <div className={styles.similarScroller}>
          {similarCards.map((card, index) => (
            <VehicleCard key={`${card.title}-${index}`} card={card} className={styles.similarCard} />
          ))}
        </div>
      </section>
      </div>
    </main>
  );
}
