import { Breadcrumbs } from "../_components/Breadcrumbs";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

const privacySections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide when registering, placing orders, or contacting us: name, email, phone number, address, and payment details. We also collect usage data (IP address, browser type, pages visited) to improve our services.",
  },
  {
    title: "How We Use Your Data",
    content:
      "Your data is used to process orders, communicate with you, improve our website and services, comply with legal obligations, and send relevant marketing (with your consent). We do not sell your personal information to third parties.",
  },
  {
    title: "Data Storage and Security",
    content:
      "We store your data on secure servers and use industry-standard encryption. Access is restricted to authorized personnel only. We retain your data for as long as necessary to fulfill our services and legal requirements.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. To exercise these rights, contact us at info@fadder.com. You may also lodge a complaint with a supervisory authority.",
  },
  {
    title: "Cookies",
    content:
      "We use cookies and similar technologies to improve site functionality, analyze traffic, and personalize content. You can manage cookie preferences in your browser settings.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[16px] px-20 pb-[120px] flex flex-col gap-16 text-foreground max-wide:px-[60px] max-tablet:px-8 max-tablet:pb-24 max-narrow:px-4">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "Privacy Policy" }]}
      />
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information"
      />

      <section className="w-full max-w-[960px] mx-auto flex flex-col gap-8">
        {privacySections.map((section) => (
          <article
            key={section.title}
            className="bg-white rounded-lg p-6 flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold m-0 text-dark">{section.title}</h2>
            <p className="text-base leading-5 text-foreground m-0">
              {section.content}
            </p>
          </article>
        ))}
      </section>

      <ContactSection />
    </main>
  );
}
