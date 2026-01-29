import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

export default function ContactPage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-16 text-foreground max-wide:px-[60px] max-tablet:px-8 max-tablet:pb-24 max-narrow:px-4">
      <Breadcrumbs items={[{ label: "Home page", href: "/" }, { label: "Contact" }]} />
      <PageHeader title="Contact" subtitle="Get in touch with our team. We're here to help with auctions, delivery, and any questions." />
      <section className="w-full max-w-[1760px] mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold m-0 text-dark">Email</h3>
            <a href="mailto:info@fadder.com" className="text-info no-underline hover:underline font-semibold">info@fadder.com</a>
            <p className="text-base text-muted m-0">We typically respond within 24 hours on business days.</p>
          </div>
          <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold m-0 text-dark">Address</h3>
            <p className="text-base text-foreground m-0">123 Auto Avenue, Miami, FL, USA</p>
            <p className="text-base text-muted m-0">Visit us or send correspondence to this address.</p>
          </div>
        </div>
        <ContactSection />
      </section>
    </main>
  );
}
