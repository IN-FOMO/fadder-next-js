"use client";

import Image from "next/image";
import { Button } from "./Button";

type PaginationProps = {
  pages: Array<number | string>;
  current?: number;
  onPageChange?: (page: number) => void;
};

export function Pagination({ pages, current = 1, onPageChange }: PaginationProps) {
  let ellipsisIndex = 0;
  const numericPages = pages.filter((p): p is number => typeof p === "number");
  const maxPage = Math.max(...numericPages, 1);
  const minPage = Math.min(...numericPages, 1);

  const handlePrev = () => {
    if (current > minPage && onPageChange) {
      onPageChange(current - 1);
    }
  };

  const handleNext = () => {
    if (current < maxPage && onPageChange) {
      onPageChange(current + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number" && onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-[clamp(8px,1.5vw,16px)]"
      aria-label="Pagination"
    >
      <Button
        variant="white"
        size="md"
        className="gap-2 min-w-0"
        onClick={handlePrev}
        disabled={current <= minPage}
      >
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
              onClick={() => handlePageClick(page)}
              disabled={typeof page !== "number"}
            >
              {page}
            </Button>
          );
        })}
      </div>
      <Button
        variant="white"
        size="md"
        className="gap-2 min-w-0"
        onClick={handleNext}
        disabled={current >= maxPage}
      >
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
