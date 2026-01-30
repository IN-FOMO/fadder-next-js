import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

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
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-6 text-foreground max-tablet:px-8 max-narrow:px-4">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "Terms" }]}
      />
      <PageHeader
        title="Terms & Conditions"
        subtitle="Please read our terms and conditions carefully before using our services"
      />

      <section className="w-full max-w-[1760px] mx-auto flex flex-col gap-[74px]">
        <div className="w-full bg-info-bg rounded-[14px] p-4 flex flex-col gap-3">
          <h3 className="m-0 text-xl leading-6 font-bold text-info">
            Important Notice
          </h3>
          <p className="m-0 text-base leading-5 font-normal text-info">
            These Terms and Conditions form a legally binding agreement between
            you (the Client) and Fadder. By using our website and services, you
            confirm that you have read, understood, and agreed to these Terms.
            Please review them carefully before placing any order.
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 max-narrow:grid-cols-1">
          {termsSections.map((section) => (
            <article
              key={section.title}
              className="bg-white rounded-lg p-4 flex flex-col gap-6"
            >
              <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
                {section.title}
              </h3>
              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <p
                    key={item}
                    className="m-0 text-base leading-5 font-normal text-foreground whitespace-pre-line"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="w-full grid grid-cols-[1fr_170px_1fr] gap-0 max-narrow:grid-cols-1">
          <div className="p-4 border border-border min-h-[52px] flex items-center font-bold bg-table-header rounded-tl-lg">
            Service
          </div>
          <div className="p-4 border border-l-0 border-border min-h-[52px] flex items-center justify-center font-bold bg-table-header">
            Timeline
          </div>
          <div className="p-4 border border-l-0 border-border min-h-[52px] flex items-center font-bold bg-table-header rounded-tr-lg">
            Terms
          </div>
          {serviceRows.map((row, index) => (
            <div key={`${row.service}-${index}`} className="contents">
              <div
                className={`p-4 border border-t-0 border-border min-h-[52px] flex items-center text-base leading-5 text-foreground ${
                  index === serviceRows.length - 1 ? "rounded-bl-lg" : ""
                }`}
              >
                {row.service}
              </div>
              <div className="p-4 border border-t-0 border-l-0 border-border min-h-[52px] flex items-center justify-center text-base leading-5 text-foreground">
                {row.timeline}
              </div>
              <div
                className={`p-4 border border-t-0 border-l-0 border-border min-h-[52px] flex items-center text-base leading-5 text-foreground ${
                  index === serviceRows.length - 1 ? "rounded-br-lg" : ""
                }`}
              >
                {row.terms}
              </div>
            </div>
          ))}
        </div>

        <article className="w-full bg-white rounded-lg p-4 flex flex-col gap-6">
          <h3 className="m-0 text-xl leading-6 font-bold text-foreground">
            Privacy & Data Protection
          </h3>
          <p className="m-0 text-base leading-5 font-normal text-foreground whitespace-pre-line">
            {privacyText}
          </p>
        </article>

        <ContactSection />
      </section>
    </main>
  );
}
