import Link from "next/link";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { Button } from "../_components/Button";
import { PageHeader } from "../_components/PageHeader";

const accountLinks = [
  { label: "My listings", href: "/search" },
  { label: "Watchlist", href: "/search?watchlist=1" },
  { label: "Bidding history", href: "/search" },
  { label: "Delivery tracking", href: "/delivery" },
  { label: "Settings", href: "/account/settings" },
];

export default function AccountPage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[16px] px-20 pb-[120px] flex flex-col gap-16 text-foreground max-wide:px-[60px] max-tablet:px-8 max-tablet:pb-24 max-narrow:px-4">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: "My Account" }]}
      />
      <PageHeader
        title="My Account"
        subtitle="Manage your listings, watchlist, and orders"
      />

      <section className="w-full max-w-[960px] mx-auto flex flex-col gap-6">
        <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold m-0 text-dark">Quick links</h2>
          <nav className="flex flex-col gap-3" aria-label="Account navigation">
            {accountLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground no-underline font-semibold hover:underline hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold m-0 text-dark">Deposit & balance</h2>
          <p className="text-base text-muted m-0">
            Place a refundable deposit to participate in auctions.
          </p>
          <Button
            href="/account/deposit"
            variant="primary"
            size="md"
            className="w-fit"
          >
            Add deposit
          </Button>
        </div>
      </section>
    </main>
  );
}
