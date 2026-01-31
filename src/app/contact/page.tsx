import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

export default function ContactPage() {
  return (
    <main className="page-wrap py-[clamp(16px,2vw,24px)] pb-[clamp(48px,6vw,120px)] flex flex-col gap-[clamp(24px,5vw,64px)] text-foreground">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "Contact" }]}
      />
      <PageHeader
        title="Contact"
        subtitle="Get in touch with our team. We're here to help with auctions, delivery, and any questions."
      />
      <section className="w-full flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold m-0 text-dark">Email</h3>
            <a
              href="mailto:info@fadder.com"
              className="text-info no-underline hover:underline font-semibold"
            >
              info@fadder.com
            </a>
            <p className="text-base text-muted m-0">
              We typically respond within 24 hours on business days.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold m-0 text-dark">Address</h3>
            <p className="text-base text-foreground m-0">
              123 Auto Avenue, Miami, FL, USA
            </p>
            <p className="text-base text-muted m-0">
              Visit us or send correspondence to this address.
            </p>
          </div>
        </div>
        <ContactSection />
      </section>
    </main>
  );
}
