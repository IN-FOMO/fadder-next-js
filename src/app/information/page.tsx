import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

const infoBlocks = [
  {
    title: "How Auctions Work",
    content:
      'We partner with leading auction platforms (e.g. Copart, IAAI) to give you access to thousands of vehicles. You can bid in real time or use our "Buy Now" option. A refundable deposit is required to participate.',
  },
  {
    title: "Delivery Options",
    content:
      "We offer inland transport, ocean shipping, and door-to-door delivery. Typical delivery times: USA → EU 30–45 days; intra-EU 3–7 days. All shipments are fully insured and trackable.",
  },
  {
    title: "Payment & Fees",
    content:
      "We accept bank transfers and corporate payments. A prepayment of 30–50% is required before auction purchase. The total cost includes auction fees, transport, insurance, and documentation. Import taxes may apply in your country.",
  },
  {
    title: "Vehicle Inspection",
    content:
      "We recommend a full inspection before bidding. Our team can arrange third-party inspections and provide condition reports. Claims for damage must be submitted within 48 hours of delivery.",
  },
];

export default function InformationPage() {
  return (
    <main className="page-wrap py-[clamp(16px,2vw,24px)] pb-[clamp(48px,6vw,120px)] flex flex-col gap-[clamp(24px,5vw,64px)] text-foreground">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "Information" }]}
      />
      <PageHeader
        title="Information"
        subtitle="General information about our services, auctions, and delivery"
      />

      <section className="w-full flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoBlocks.map((block) => (
            <article
              key={block.title}
              className="bg-white rounded-lg p-6 flex flex-col gap-4 shadow-card-soft"
            >
              <h2 className="text-xl font-bold m-0 text-dark">{block.title}</h2>
              <p className="text-base leading-5 text-foreground m-0">
                {block.content}
              </p>
            </article>
          ))}
        </div>

        <ContactSection />
      </section>
    </main>
  );
}
