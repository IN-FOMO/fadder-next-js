"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems: { label: string; href: string; icon: string }[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/figma/icons/icon-menu.svg" },
  { label: "Profile", href: "/dashboard/profile", icon: "/figma/icons/icon-profile.svg" },
  { label: "Deposit", href: "/account/deposit", icon: "/figma/icons/icon-wallet.svg" },
  { label: "History", href: "/dashboard/history", icon: "/figma/icons/icon-gavel.svg" },
  { label: "Favorites", href: "/dashboard/favorites", icon: "/figma/icons/icon-heart.svg" },
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
                // Figma (Tab profile / Menu profile vertical): Default = white, Press = Accented fill,
                // Hover = white + Accented stroke 1.5px
                "flex items-center justify-center lg:justify-start gap-[14px] py-[8px] px-[24px] rounded-[16px] bg-white text-[14px] leading-[16px] font-bold no-underline transition-colors border-[1.5px] box-border " +
                (isActive ? "bg-[#FFAF0E] border-transparent text-[#0F0F0F]" : "border-transparent text-[#0F0F0F] hover:border-[#FFAF0E]")
              }
            >
              <Image src={item.icon} alt="" width={16} height={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
