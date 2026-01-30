import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageHeader } from "./PageHeader";

type SimplePageProps = {
  title: string;
  description: string;
};

export function SimplePage({ title, description }: SimplePageProps) {
  return (
    <main className="max-w-[960px] mx-auto py-16 px-4 flex flex-col gap-4">
      <Breadcrumbs
        items={[{ label: "Home page", href: "/" }, { label: title }]}
      />
      <PageHeader title={title} subtitle={description} />
      <Link
        className="text-foreground no-underline font-bold hover:underline"
        href="/"
      >
        Back to home
      </Link>
    </main>
  );
}
