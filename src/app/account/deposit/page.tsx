import { Breadcrumbs } from "../../_components/Breadcrumbs";
import { Button } from "../../_components/Button";
import { PageHeader } from "../../_components/PageHeader";

export default function AccountDepositPage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-16 text-foreground max-wide:px-[60px] max-tablet:px-8 max-tablet:pb-24 max-narrow:px-4">
      <Breadcrumbs
        items={[
          { label: "Home page", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Add deposit" },
        ]}
      />
      <PageHeader title="Add deposit" subtitle="Place a refundable deposit to participate in auctions" />
      <section className="w-full max-w-[960px] mx-auto bg-white rounded-lg p-6 flex flex-col gap-4">
        <p className="text-base text-muted m-0">Deposit and payment options will be available here.</p>
        <Button href="/account" variant="secondary" size="md" className="w-fit">
          Back to account
        </Button>
      </section>
    </main>
  );
}
