import { Breadcrumbs } from "../../_components/Breadcrumbs";
import { PageHeader } from "../../_components/PageHeader";

export default function AccountSettingsPage() {
  return (
    <main className="max-w-[1920px] mx-auto py-[88px] px-20 pb-[120px] flex flex-col gap-16 text-foreground max-wide:px-[60px] max-tablet:px-8 max-tablet:pb-24 max-narrow:px-4">
      <Breadcrumbs
        items={[
          { label: "Home page", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" },
        ]}
      />
      <PageHeader title="Settings" subtitle="Manage your account preferences" />
      <section className="w-full max-w-[960px] mx-auto bg-white rounded-lg p-6">
        <p className="text-base text-muted m-0">Account settings and preferences will be available here.</p>
      </section>
    </main>
  );
}
