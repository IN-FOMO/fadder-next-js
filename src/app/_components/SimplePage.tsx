import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageHeader } from "./PageHeader";

type SimplePageProps = {
  title: string;
  description: string;
};

export function SimplePage({ title, description }: SimplePageProps) {
  return (
    <main className="page-wrap py-[clamp(24px,5vw,64px)]">
      <div className="flex flex-col gap-4 w-full max-w-[clamp(320px,80vw,960px)]">
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
      </div>
    </main>
  );
}
