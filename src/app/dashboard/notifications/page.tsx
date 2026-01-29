"use client";

import Link from "next/link";
import { DashboardSidebar } from "../../_components/DashboardSidebar";

export default function DashboardNotificationsPage() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-surface">
      <div className="max-w-[1440px] mx-auto px-[60px] pt-6 pb-10 flex flex-col gap-6 max-tablet:px-8 max-narrow:px-4">
        <div className="flex gap-4 flex-col lg:flex-row">
          <DashboardSidebar />
          <div className="flex-1 lg:w-[1144px] bg-white rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-dark">Notifications</span>
            </div>
            <div className="mt-4 bg-surface rounded-[14px] p-4">
              <p className="text-sm text-muted m-0">No notifications yet.</p>
              <Link href="/dashboard" className="text-primary font-semibold no-underline hover:underline mt-4 inline-block">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
