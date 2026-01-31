"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";

const menuItems: { label: string; href: string; icon: string }[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "/figma/icons/icon-menu.svg",
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: "/figma/icons/icon-profile.svg",
  },
  {
    label: "Deposit",
    href: "/account/deposit",
    icon: "/figma/icons/icon-wallet.svg",
  },
  {
    label: "History",
    href: "/dashboard/history",
    icon: "/figma/icons/icon-gavel.svg",
  },
  {
    label: "Favorites",
    href: "/dashboard/favorites",
    icon: "/figma/icons/icon-heart.svg",
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: "/figma/icons/icon-notification-bell.svg",
  },
  {
    label: "Security",
    href: "/dashboard/security",
    icon: "/figma/icons/icon-security.svg",
  },
  {
    label: "Support",
    href: "/dashboard/support",
    icon: "/figma/icons/icon-support.svg",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full tablet:w-[clamp(160px,16vw,220px)] shrink-0">
      <nav className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:flex-col tablet:items-stretch tablet:gap-1 tablet:overflow-visible tablet:pb-0 tablet:mx-0 tablet:px-0">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              href={item.href}
              variant={isActive ? "primary" : "outlineInactive"}
              size="sm"
              className={`justify-center tablet:justify-start gap-[14px] py-[8px] px-[16px] min-w-max rounded-[16px] text-[14px] leading-[16px] font-bold tablet:px-[24px] ${
                isActive ? "" : "hover:bg-primary-hover active:bg-primary-pressed"
              }`}
            >
              <Image src={item.icon} alt="" width={16} height={16} />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
