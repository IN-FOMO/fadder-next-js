"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useHeaderData } from "@/hooks/useHeaderData";
import { Button } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Catalog", href: "/search" },
  { label: "Blog", href: "/blog" },
];

const helpInfoLinks = [
  { label: "Delivery", href: "/delivery" },
  { label: "Terms", href: "/terms" },
  { label: "Help", href: "/help" },
  { label: "About", href: "/about" },
  { label: "Information", href: "/information" },
];

export function Header() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { data: headerData } = useHeaderData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpInfoOpen, setIsHelpInfoOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const helpInfoRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    router.push("/");
    setIsMenuOpen(false);
  };

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

  useEffect(() => {
    if (!isHelpInfoOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!helpInfoRef.current) return;
      if (!helpInfoRef.current.contains(event.target as Node)) {
        setIsHelpInfoOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsHelpInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isHelpInfoOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-white">
      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] max-tablet:block">
          <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="absolute right-0 top-0 h-full w-[min(86vw,360px)] bg-white shadow-dropdown flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/figma/icons/logo.svg"
                  alt="Fadder"
                  width={120}
                  height={36}
                  className="h-auto w-[clamp(80px,24vw,120px)]"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="min-w-9 min-h-9"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <Image
                  src="/figma/icons/icon-cross-small.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-6">
              <nav className="flex flex-col gap-3 text-base font-bold">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-foreground no-underline py-2 border-b border-surface"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const trimmed = searchValue.trim();
                    if (!trimmed) return;
                    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-[14px] bg-surface px-4 py-2"
                >
                  <Image
                    src="/figma/icons/icon-search.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  <input
                    type="text"
                    placeholder="Search VIN, make, model"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="no-focus-ring w-full border-0 bg-transparent outline-none text-sm font-semibold text-foreground placeholder:text-muted"
                  />
                </form>
                <Suspense
                  fallback={
                    <div className="inline-flex items-center justify-center gap-2 rounded-sm py-2 px-3.5 text-xs font-semibold min-h-9 bg-surface text-foreground">
                      English
                    </div>
                  }
                >
                  <LanguageSwitcher size="md" buttonClassName="gap-2 w-full" />
                </Suspense>
              </div>
              <div className="flex flex-col gap-2">
                {isLoading ? (
                  <div className="h-10 w-full animate-pulse rounded-lg bg-surface" />
                ) : isAuthenticated ? (
                  <>
                    <Button
                      href="/account/deposit"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/figma/icons/icon-wallet.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                      <span>${headerData?.balance?.toLocaleString() ?? "0"}</span>
                    </Button>
                    <Button
                      href="/dashboard/history"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/figma/icons/icon-gavel.svg"
                        alt="Active bids"
                        width={20}
                        height={20}
                      />
                      <span>{headerData?.activeBidsCount ?? 0} Bids</span>
                    </Button>
                    <Button
                      href="/dashboard/favorites"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/figma/icons/icon-heart.svg"
                        alt="Watchlist"
                        width={20}
                        height={20}
                      />
                      <span>{headerData?.watchlistCount ?? 0} Saved</span>
                    </Button>
                    <Button
                      href="/dashboard/notifications"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Image
                        src="/figma/icons/icon-notification-bell.svg"
                        alt="Notifications"
                        width={20}
                        height={20}
                      />
                      <span>
                        Notifications
                        {(headerData?.unreadNotificationsCount ?? 0) > 0 &&
                          ` (${headerData?.unreadNotificationsCount})`}
                      </span>
                    </Button>
                    <Button
                      href="/dashboard"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {headerData?.avatarUrl ? (
                        <Image
                          src={headerData.avatarUrl}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                          {user?.firstName?.charAt(0) || "U"}
                        </div>
                      )}
                      <span>{user?.firstName || "My Account"}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      href="/login"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Button>
                    <Button
                      href="/register"
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="page-wrap grid grid-cols-[auto_1fr_auto] items-center justify-between gap-[clamp(16px,6vw,150px)] py-[clamp(8px,1.2vw,16px)] max-tablet:gap-2">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/figma/icons/logo.svg"
            alt="Fadder"
            width={134}
            height={40}
            className="h-auto w-[clamp(42px,7vw,134px)]"
          />
        </Link>
        <div className="flex items-center justify-center min-w-0">
          <nav className="flex items-center justify-center gap-[clamp(12px,1.6vw,32px)] text-base font-bold max-tablet:hidden">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap text-inherit no-underline shrink-0 hover:opacity-80 active:opacity-80"
              >
                {item.label}
              </Link>
            ))}
            {helpInfoLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
              className="hidden min-[1439px]:inline-flex whitespace-nowrap text-inherit no-underline shrink-0 hover:opacity-80 active:opacity-80"
              >
                {item.label}
              </Link>
            ))}
            <div ref={helpInfoRef} className="relative block min-[1439px]:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 text-base font-bold text-foreground border-0 bg-transparent p-0 cursor-pointer hover:opacity-80 active:opacity-80 text-nowrap"
                onClick={() => setIsHelpInfoOpen((prev) => !prev)}
                aria-expanded={isHelpInfoOpen}
              >
                <span>Help & Info</span>
                <Image
                  src="/figma/icons/icon-arrow-down.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              {isHelpInfoOpen ? (
                <div className="absolute top-full left-0 mt-2 min-w-[clamp(180px,24vw,220px)] rounded-[8px] bg-white shadow-dropdown p-2 z-30 flex flex-col gap-1">
                  {helpInfoLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-[8px] px-3 py-2 text-sm font-medium text-foreground no-underline hover:bg-surface"
                      onClick={() => setIsHelpInfoOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-[clamp(6px,0.8vw,12px)] text-sm font-semibold shrink-0 max-tablet:hidden">
          <div ref={searchContainerRef} className="relative flex items-center">
            <form
              ref={searchFormRef}
              onSubmit={handleSearchSubmit}
              className={`absolute right-10 top-1/2 -translate-y-1/2 w-[clamp(240px,50vw,720px)] origin-right transform-gpu transition-all duration-300 ease-out ${
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
          {isLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-surface" />
          ) : isAuthenticated ? (
            <>
              <Button href="/account/deposit" variant="secondary" size="sm">
                <Image
                  src="/figma/icons/icon-wallet.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span>${headerData?.balance?.toLocaleString() ?? "0"}</span>
              </Button>
              <Button href="/dashboard/history" variant="secondary" size="sm">
                <Image
                  src="/figma/icons/icon-gavel.svg"
                  alt="Active bids"
                  width={24}
                  height={24}
                />
                <span>{headerData?.activeBidsCount ?? 0}</span>
              </Button>
              <Button href="/dashboard/favorites" variant="secondary" size="sm">
                <Image
                  src="/figma/icons/icon-heart.svg"
                  alt="Watchlist"
                  width={24}
                  height={24}
                />
                <span>{headerData?.watchlistCount ?? 0}</span>
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
                {(headerData?.unreadNotificationsCount ?? 0) > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {headerData?.unreadNotificationsCount}
                  </span>
                )}
              </Button>
              <Button href="/dashboard" variant="secondary" size="sm">
                {headerData?.avatarUrl ? (
                  <Image
                    src={headerData.avatarUrl}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                    {user?.firstName?.charAt(0) || "U"}
                  </div>
                )}
                <span>{user?.firstName || "Account"}</span>
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="secondary" size="sm">
                Login
              </Button>
              <Button href="/register" variant="primary" size="sm">
                Register
              </Button>
            </>
          )}
        </div>
        <div className="hidden items-center gap-3 max-tablet:flex">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Image
              src="/figma/icons/icon-menu.svg"
              alt=""
              width={24}
              height={24}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
