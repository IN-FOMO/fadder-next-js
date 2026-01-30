import Image from "next/image";
import { Button } from "./Button";

type PaginationProps = {
  pages: Array<number | string>;
  current?: number;
};

export function Pagination({ pages, current }: PaginationProps) {
  let ellipsisIndex = 0;
  return (
    <nav
      className="flex items-center justify-center gap-4"
      aria-label="Pagination"
    >
      <Button variant="white" size="md" className="gap-2 min-w-0">
        <Image
          src="/figma/icons/icon-arrow-left.svg"
          alt=""
          width={24}
          height={24}
        />
        <span>Prev</span>
      </Button>
      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = typeof page === "number" && page === current;
          const key =
            typeof page === "number"
              ? `page-${page}`
              : `ellipsis-${ellipsisIndex++}`;
          return (
            <Button
              key={key}
              variant={isActive ? "primary" : "white"}
              size="md"
              className="min-w-11 whitespace-nowrap"
            >
              {page}
            </Button>
          );
        })}
      </div>
      <Button variant="white" size="md" className="gap-2 min-w-0">
        <span>Next</span>
        <Image
          src="/figma/icons/icon-arrow-right.svg"
          alt=""
          width={24}
          height={24}
        />
      </Button>
    </nav>
  );
}
