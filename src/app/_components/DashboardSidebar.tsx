"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems: { label: string; href: string; icon: string }[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/figma/icons/icon-menu.svg" },
  { label: "Profile", href: "/dashboard/profile", icon: "/figma/icons/icon-badge.svg" },
  { label: "Deposit", href: "/account/deposit", icon: "/figma/icons/icon-wallet.svg" },
  { label: "History", href: "/dashboard/history", icon: "/figma/icons/icon-gavel.svg" },
  { label: "Favorites", href: "/search?watchlist=1", icon: "/figma/icons/icon-heart.svg" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "/figma/icons/icon-notification-bell.svg" },
  { label: "Security", href: "/account/settings", icon: "/figma/icons/icon-menu.svg" },
  { label: "Support", href: "/contact", icon: "/figma/icons/icon-question.svg" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-[176px] shrink-0">
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "flex items-center gap-[14px] py-2 px-6 rounded-[16px] text-sm font-bold no-underline transition-colors " +
                (isActive ? "bg-primary text-foreground" : "text-dark")
              }
            >
              <Image
                src={item.icon}
                alt=""
                width={16}
                height={16}
                className={isActive ? "invert" : ""}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
