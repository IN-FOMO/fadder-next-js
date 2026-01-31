"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useNotifications } from "@/hooks/useNotifications";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardSidebar } from "../../_components/DashboardSidebar";
import { Pagination } from "../../_components/Pagination";
import { Button } from "../../_components/Button";

function Toggle({
  state,
  onClick,
  disabled,
}: {
  state: "active" | "disabled";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const isActive = state === "active";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        "w-[clamp(28px,4vw,36px)] h-[clamp(16px,3vw,20px)] rounded-[17.7778px] border-[1.111111px] box-border flex items-center cursor-pointer transition-all " +
        (isActive
          ? "bg-[#FFAF0E] border-[#FFAF0E] pl-[clamp(10px,2.2vw,15.6px)]"
          : "bg-[#7B7B7B] border-[#7B7B7B] pl-[clamp(2px,0.5vw,4px)]") +
        (disabled ? " opacity-50 cursor-not-allowed" : "")
      }
    >
      <div className="w-[clamp(12px,2.2vw,18px)] h-[clamp(12px,2.2vw,18px)] rounded-[17.7778px] bg-white" />
    </button>
  );
}

function NotificationCard({
  notification,
  onMarkRead,
}: {
  notification: {
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
  };
  onMarkRead: () => void;
}) {
  return (
    <div
      className={`w-full bg-white rounded-[16px] p-4 flex items-start justify-between gap-4 ${
        !notification.isRead ? "border-l-4 border-primary" : ""
      }`}
    >
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
            {notification.title}
          </span>
          <span className="text-[12px] leading-[14px] px-2 py-1 rounded bg-surface text-muted">
            {notification.type}
          </span>
        </div>
        <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">
          {notification.message}
        </span>
        <span className="text-[12px] leading-[14px] text-muted">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
      {!notification.isRead && (
        <Button variant="secondary" size="sm" onClick={onMarkRead}>
          Mark as read
        </Button>
      )}
    </div>
  );
}

function NotificationsContent() {
  const {
    notifications,
    preferences,
    isLoading,
    markAsRead,
    markAllAsRead,
    updatePreferences,
  } = useNotifications();
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleTogglePreference = async (key: string, currentValue: boolean) => {
    setIsUpdating(true);
    try {
      await updatePreferences({ [key]: !currentValue });
      toast.success("Preferences updated");
    } catch {
      toast.error("Failed to update preferences");
    } finally {
      setIsUpdating(false);
    }
  };

  const pageNumbers: (number | string)[] = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pageNumbers.push(i);
  }
  if (totalPages > 5) {
    pageNumbers.push("...", totalPages);
  }

  const channelPrefs = [
    { label: "E-mail", key: "emailSystem", value: preferences?.system?.email ?? false },
    { label: "Push", key: "pushSystem", value: preferences?.system?.push ?? false },
  ];

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F5F6F8]">
      <div className="page-wrap pt-4 pb-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <DashboardSidebar />

          <div className="w-full flex-1 min-w-0 flex flex-col gap-8">
            {/* Header with Mark All Read */}
            <div className="flex items-center justify-between">
              <h1 className="text-[20px] leading-[24px] font-bold text-[#0A0A0A]">
                Notifications
              </h1>
              {notifications.some((n) => !n.isRead) && (
                <Button variant="secondary" size="sm" onClick={handleMarkAllRead}>
                  Mark all as read
                </Button>
              )}
            </div>

            {/* Notification Preferences */}
            <div className="w-full flex flex-col tablet:flex-row items-start tablet:items-end justify-between gap-6">
              <div className="w-full max-w-[clamp(260px,40vw,415px)] flex flex-col gap-2">
                <span className="text-[16px] leading-[20px] font-bold text-[#0A0A0A]">
                  Notification channels
                </span>
                <span className="text-[14px] leading-[16px] font-normal text-[#717182]">
                  Choose how you want to receive notifications
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                {channelPrefs.map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="text-[16px] leading-[20px] font-bold text-[#0C0C0C]">
                      {c.label}
                    </span>
                    <Toggle
                      state={c.value ? "active" : "disabled"}
                      onClick={() => handleTogglePreference(c.key, c.value)}
                      disabled={isUpdating}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <section className="w-full flex flex-col gap-4">
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-[100px] bg-white rounded-[16px] animate-pulse"
                    />
                  ))}
                </div>
              ) : paginatedNotifications.length === 0 ? (
                <div className="bg-white rounded-[16px] p-8 text-center">
                  <p className="text-muted">No notifications</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {paginatedNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkRead={() => markAsRead(notification.id)}
                    />
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <Pagination
                  pages={pageNumbers}
                  current={currentPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </section>

            {/* Notification Settings */}
            <section className="w-full max-w-[clamp(320px,60vw,700px)] mx-auto flex flex-col gap-4">
              <h2 className="text-[16px] leading-[20px] font-bold text-[#0A0A0A]">
                Notification types
              </h2>
              {[
                {
                  title: "Bid updates",
                  description: "Get notified when there are updates on your bids",
                  key: "emailBidUpdate",
                  value: preferences?.bidUpdate?.email ?? true,
                },
                {
                  title: "Outbid alerts",
                  description: "Get notified when you are outbid on an auction",
                  key: "emailOutbid",
                  value: preferences?.outbid?.email ?? true,
                },
                {
                  title: "Auction ending",
                  description: "Get notified when auctions you're watching are ending soon",
                  key: "emailAuctionEnding",
                  value: preferences?.auctionEnding?.email ?? true,
                },
                {
                  title: "Watchlist updates",
                  description: "Get notified about changes to vehicles in your watchlist",
                  key: "emailWatchlist",
                  value: preferences?.watchlist?.email ?? true,
                },
              ].map((row) => (
                <div
                  key={row.title}
                  className="w-full bg-white rounded-[16px] p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[16px] leading-[20px] font-bold text-[#0F0F0F]">
                      {row.title}
                    </span>
                    <span className="text-[14px] leading-[16px] font-normal text-[#7B7B7B]">
                      {row.description}
                    </span>
                  </div>
                  <Toggle
                    state={row.value ? "active" : "disabled"}
                    onClick={() => handleTogglePreference(row.key, row.value)}
                    disabled={isUpdating}
                  />
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardNotificationsPage() {
  return (
    <ProtectedRoute>
      <NotificationsContent />
    </ProtectedRoute>
  );
}
