import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
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
      <div className="flex items-center gap-2 text-sm font-semibold shrink-0 max-tablet:hidden">
        <Button
          href="/search"
          variant="ghost"
          size="icon"
          className="p-0 min-w-10 min-h-10"
        >
          <Image
            src="/figma/icons/icon-search.svg"
            alt="Search"
            width={40}
            height={40}
          />
        </Button>
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
