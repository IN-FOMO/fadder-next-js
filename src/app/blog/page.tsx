import Image from "next/image";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { Button } from "../_components/Button";
import { ContactSection } from "../_components/ContactSection";
import { PageHeader } from "../_components/PageHeader";

const blogCards = [
  { title: "Top 10 Bidding Strategies for Car Auctions", date: "January 15, 2024", description: "Learn the insider secrets that professional bidders use to win their dream cars at auction", image: "/figma/images/blog-1.png" },
  { title: "Complete Car Inspection Checklist", date: "January 15, 2024", description: "Everything you need to know before bidding on a vehicle at our auctions", image: "/figma/images/blog-2.png" },
  { title: "2024 Electric Vehicle Market Trends", date: "January 15, 2024", description: "Discover which electric vehicles are gaining value and why they're auction favorites", image: "/figma/images/blog-3.png" },
];

export default function BlogPage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-16 text-foreground max-wide:px-[60px] max-tablet:px-8 max-tablet:pb-24 max-narrow:px-4">
      <Breadcrumbs items={[{ label: "Home page", href: "/" }, { label: "Blog" }]} />
      <PageHeader title="Blog" subtitle="Latest insights and articles about car auctions, inspections, and market trends" />
      <section className="grid grid-cols-3 gap-6 max-wide:grid-cols-2 max-tablet:grid-cols-1 w-full max-w-[1760px] mx-auto">
        {blogCards.map((card) => (
          <article key={card.title} className="bg-white rounded-lg overflow-hidden flex flex-col shadow-card-soft">
            <div className="relative h-[180px] bg-surface">
              <Image src={card.image} alt="" fill sizes="(max-width: 834px) 100vw, 560px" className="object-cover" />
            </div>
            <div className="p-4 flex flex-col gap-3 flex-1">
              <span className="text-sm text-muted">{card.date}</span>
              <h2 className="text-base font-bold m-0 text-dark">{card.title}</h2>
              <p className="text-sm text-muted m-0 flex-1">{card.description}</p>
              <Button href="/blog" variant="secondary" size="sm" className="w-fit">Read more</Button>
            </div>
          </article>
        ))}
      </section>
      <ContactSection />
    </main>
  );
}
