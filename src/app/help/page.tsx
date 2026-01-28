"use client";

import Image from "next/image";
import { useState } from "react";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";
import styles from "./help.module.css";

const faqSections = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is Fadder?",
        answer:
          "Fadder is an international platform that helps clients purchase and transport vehicles from America, Canada, Europe, and Asia. We manage the entire process — from bidding at auctions to home delivery.",
        open: true,
      },
      {
        question: "Who can use the platform?",
        answer:
          "Both private individuals and registered businesses can use our services. All users must verify their identity and accept our Terms & Conditions before starting.",
        open: false,
      },
      {
        question: "How do I start buying cars?",
        answer:
          "Create an account on our website, place a refundable deposit, and you'll get access to live car auctions and the \"Buy Now\" option.",
        open: false,
      },
    ],
  },
  {
    title: "Payment & Finances",
    items: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept bank transfers and corporate payments. All transactions are processed through licensed payment institutions registered in the EU or UK.",
        open: true,
      },
      {
        question: "Is my deposit refundable?",
        answer: "Yes. Your deposit is fully refundable if no purchase is made.",
        open: false,
      },
      {
        question: "When must I pay for the car?",
        answer:
          "Full payment must be made within 2–3 business days after winning an auction. After payment, we immediately arrange inland transport to our warehouse.",
        open: false,
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No. The total cost includes auction fees, transport, insurance, and documentation. Import taxes or local VAT may apply depending on your country's regulations.",
        open: false,
      },
    ],
  },
  {
    title: "Delivery & Logistics",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Typical delivery times: Inland (EU): 5–10 days. Ocean Shipping (America/Canada → EU/Asia): 25–60 days. Home Delivery: 2–5 days after customs clearance. All shipments include full cargo insurance and tracking.",
        open: true,
      },
      {
        question: "Can I track my shipment?",
        answer:
          "Yes. Once your vehicle is dispatched, you'll receive access to our online tracking panel with real-time updates.",
        open: false,
      },
      {
        question: "Is my vehicle insured during transport?",
        answer:
          "Yes. All vehicles are fully insured during transportation with comprehensive cargo insurance coverage.",
        open: false,
      },
      {
        question: "Can I get delivery to my address?",
        answer:
          "Yes. We offer door-to-door delivery in selected cities worldwide. Please contact our logistics team for availability in your region.",
        open: false,
      },
    ],
  },
  {
    title: "Vehicle Condition & Inspection",
    items: [
      {
        question: "Can I check the condition of the car before purchase?",
        answer:
          "Yes. Each vehicle has a detailed photo report and auction inspection notes. For selected cars, we can arrange an independent third-party inspection.",
        open: true,
      },
      {
        question: "What happens if my vehicle arrives damaged?",
        answer:
          "In the rare case of transport damage, notify us within 24 hours of delivery. We'll open an insurance claim and handle the process on your behalf.",
        open: false,
      },
      {
        question: "Do you provide a vehicle history report?",
        answer:
          "Yes. We can issue a Carfax or AutoCheck report including service, accident, and ownership history before shipment.",
        open: false,
      },
    ],
  },
  {
    title: "Account & Documents",
    items: [
      {
        question: "What documents will I receive with my vehicle?",
        answer:
          "You'll receive the vehicle title, purchase invoice, and customs clearance documents. All paperwork is prepared to support registration in your country.",
        open: true,
      },
      {
        question: "How can I update my personal data?",
        answer:
          "You can update contact and billing details anytime in your account settings or by contacting info@fadder.com.",
        open: false,
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes. You can request full account deletion and data removal according to our Privacy Policy.",
        open: false,
      },
    ],
  },
];

export default function HelpPage() {
  const [openState, setOpenState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    faqSections.forEach((section) => {
      section.items.forEach((item) => {
        initial[`${section.title}:${item.question}`] = item.open ?? false;
      });
    });
    return initial;
  });

  return (
    <main className={styles.page}>
      <Breadcrumbs items={[{ label: "Home page", href: "/" }, { label: "Help" }]} />
      <PageHeader
        title="Help & Support"
        subtitle="Find answers to common questions and get the help you need"
      />

      <section className={styles.faqGrid}>
        {faqSections.map((section) => (
          <div key={section.title} className={styles.faqCard}>
            <h3 className={styles.faqTitle}>{section.title}</h3>
            <div className={styles.faqList}>
              {section.items.map((item, index) => (
                <div key={`${item.question}-${index}`} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqHeader}
                    aria-expanded={openState[`${section.title}:${item.question}`]}
                    onClick={() =>
                      setOpenState((prev) => ({
                        ...prev,
                        [`${section.title}:${item.question}`]:
                          !prev[`${section.title}:${item.question}`],
                      }))
                    }
                  >
                    <span className={styles.faqQuestion}>{item.question}</span>
                    <Image
                      src={
                        openState[`${section.title}:${item.question}`]
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
                      openState[`${section.title}:${item.question}`]
                        ? styles.faqAnswerOpen
                        : ""
                    }`}
                  >
                    <p className={styles.faqAnswer}>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <ContactSection />
    </main>
  );
}
