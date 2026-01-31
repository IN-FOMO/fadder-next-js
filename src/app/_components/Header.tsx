"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Catalog", href: "/search" },
  { label: "Delivery", href: "/delivery" },
  { label: "Terms", href: "/terms" },
  { label: "Help", href: "/help" },
  { label: "About", href: "/about" },
  { label: "Information", href: "/information" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!searchContainerRef.current) return;
      if (!searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isSearchOpen]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="grid grid-cols-[auto_1fr_auto] items-center justify-between gap-[150px] bg-white px-20 py-4 max-wide:px-[60px] max-tablet:gap-2 max-tablet:py-3 max-tablet:px-4 max-narrow:px-4 max-narrow:py-2">
      <Link href="/" className="inline-flex items-center">
        <Image
          src="/figma/icons/logo.svg"
          alt="Fadder"
          width={134}
          height={40}
          className="h-10 w-[134px] max-narrow:h-10 max-narrow:w-[42px]"
        />
      </Link>
      <div className="flex items-center justify-center">
        <nav className="flex items-center justify-center gap-8 text-base font-bold max-tablet:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-inherit no-underline shrink-0 hover:opacity-80 active:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold shrink-0 max-tablet:hidden">
        <div ref={searchContainerRef} className="relative flex items-center">
          <form
            ref={searchFormRef}
            onSubmit={handleSearchSubmit}
            className={`absolute right-10 top-1/2 -translate-y-1/2 w-[50vw] origin-right transform-gpu transition-all duration-300 ease-out ${
              isSearchOpen
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0 pointer-events-none"
            }`}
          >
            <label className="flex items-center gap-3 rounded-[14px] bg-surface px-4 py-2 shadow-card-soft">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search VIN, make, model"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="no-focus-ring w-full border-0 bg-transparent outline-none focus:outline-none focus-visible:outline-none focus:ring-0 text-sm font-semibold text-foreground placeholder:text-muted"
              />
            </label>
          </form>
          <Button
            variant="ghost"
            size="icon"
            className="p-0 min-w-10 min-h-10 z-1100"
            onClick={() => {
              if (isSearchOpen && searchValue.trim()) {
                searchFormRef.current?.requestSubmit();
                return;
              }
              setIsSearchOpen((prev) => !prev);
            }}
            aria-label={isSearchOpen ? "Close search" : "Open search"}
          >
            <Image
              src="/figma/icons/icon-search.svg"
              alt="Search"
              width={40}
              height={40}
            />
          </Button>
        </div>
        <Suspense
          fallback={
            <div className="inline-flex items-center justify-center gap-2 rounded-sm py-2 px-3.5 text-xs font-semibold min-h-9 bg-surface text-foreground">
              English
            </div>
          }
        >
          <LanguageSwitcher size="sm" buttonClassName="gap-2" />
        </Suspense>
        <Button variant="secondary" size="sm">
          <Image
            src="/figma/icons/icon-wallet.svg"
            alt=""
            width={24}
            height={24}
          />
          <span>$0</span>
        </Button>
        <Button variant="secondary" size="sm">
          <Image
            src="/figma/icons/icon-gavel.svg"
            alt="Active bids"
            width={24}
            height={24}
          />
          <span>10</span>
        </Button>
        <Button variant="secondary" size="sm">
          <Image
            src="/figma/icons/icon-heart.svg"
            alt="Watchlist"
            width={24}
            height={24}
          />
          <span>0</span>
        </Button>
        <Button
          href="/dashboard/notifications"
          variant="secondary"
          size="sm"
          className="relative"
        >
          <Image
            src="/figma/icons/icon-notification-bell.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-xl bg-error text-white text-xs font-bold px-1">
            99
          </span>
        </Button>
        <Button href="/dashboard" variant="secondary" size="sm">
          <Image
            src="/figma/images/my-account.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 rounded-full"
          />
          <span>My Account</span>
        </Button>
      </div>
      <div className="hidden items-center gap-3 max-tablet:flex">
        <Button variant="secondary" size="icon">
          <Image
            src="/figma/icons/icon-menu.svg"
            alt=""
            width={24}
            height={24}
          />
        </Button>
      </div>
    </header>
  );
}
