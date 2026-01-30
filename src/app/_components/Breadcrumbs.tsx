import Image from "next/image";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div
            key={`${item.label}-${index}`}
            className="inline-flex items-center gap-1"
          >
            {item.href && !isLast ? (
              <Link
                className="inline-flex items-center gap-2.5 text-xs font-normal leading-[14px] text-muted no-underline"
                href={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2.5 text-xs font-normal leading-[14px] text-dark">
                {item.label}
              </span>
            )}
            {!isLast ? (
              <Image
                src="/figma/icons/icon-arrow-right.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
