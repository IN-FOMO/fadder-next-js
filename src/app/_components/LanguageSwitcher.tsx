"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LANG_OPTIONS = [
  { value: "en", label: "English" },
  { value: "ru", label: "Русский" },
  { value: "pl", label: "Polska" },
];

type LanguageSwitcherProps = {
  size?: "sm" | "md";
  className?: string;
  buttonClassName?: string;
};

function normalizeLang(input?: string) {
  const lower = input?.toLowerCase();
  return LANG_OPTIONS.find((option) => option.value === lower)?.value ?? "en";
}

export function LanguageSwitcher({
  size = "sm",
  className,
  buttonClassName,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const currentLang = normalizeLang(searchParams?.get("lang") ?? undefined);
  const currentLabel =
    LANG_OPTIONS.find((option) => option.value === currentLang)?.label ??
    "English";

  const buildHref = (lang: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("lang", lang);
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const sizeClasses = {
    sm: "rounded-sm py-2 px-3.5 text-xs font-semibold min-h-9",
    md: "rounded-sm py-3 px-5 text-sm font-semibold min-h-10",
  } as const;

  const summaryClass = [
    "inline-flex items-center justify-center gap-2 no-underline transition-colors bg-surface hover:shadow-hover active:bg-surface text-foreground border-0 font-bold cursor-pointer",
    sizeClasses[size],
    buttonClassName,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={className} ref={containerRef}>
      <div className="relative">
        <button
          type="button"
          className={summaryClass}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span>{currentLabel}</span>
          <Image
            src="/figma/icons/icon-arrow-down.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
        {isOpen ? (
          <div className="absolute top-full left-0 mt-2 min-w-[clamp(140px,20vw,180px)] rounded-[8px] bg-white shadow-dropdown p-2 z-30 flex flex-col gap-1">
            {LANG_OPTIONS.map((option) => (
              <Link
                key={option.value}
                href={buildHref(option.value)}
                className={
                  "block rounded-[8px] px-3 py-2 text-sm font-medium text-foreground no-underline hover:bg-surface " +
                  (option.value === currentLang ? "bg-surface" : "")
                }
                onClick={() => setIsOpen(false)}
              >
                {option.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
