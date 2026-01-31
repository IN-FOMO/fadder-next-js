import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import { useAuth } from "./useAuth";

interface HeaderData {
  balance: number;
  activeBidsCount: number;
  watchlistCount: number;
  unreadNotificationsCount: number;
  avatarUrl?: string;
}

interface UseHeaderDataReturn {
  data: HeaderData | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export function useHeaderData(): UseHeaderDataReturn {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<HeaderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHeaderData = useCallback(async () => {
    if (!isAuthenticated) {
      setData(null);
      return;
    }

    setIsLoading(true);

    try {
      const [dashboardRes, notifRes, profileRes] = await Promise.all([
        apiClient.GET("/api/v1/dashboard/summary"),
        apiClient.GET("/api/v1/notifications/unread-count"),
        apiClient.GET("/api/v1/profile/me"),
      ]);

      setData({
        balance: dashboardRes.data?.availableBalance ?? 0,
        activeBidsCount: dashboardRes.data?.activeBidsCount ?? 0,
        watchlistCount: dashboardRes.data?.watchlistCount ?? 0,
        unreadNotificationsCount: notifRes.data?.unreadCount ?? 0,
        avatarUrl: (profileRes.data?.avatarUrl as unknown as string) ?? undefined,
      });
    } catch {
      // Ignore errors, use defaults
      setData({
        balance: 0,
        activeBidsCount: 0,
        watchlistCount: 0,
        unreadNotificationsCount: 0,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchHeaderData();
  }, [fetchHeaderData]);

  return {
    data,
    isLoading,
    refetch: fetchHeaderData,
  };
}

export default useHeaderData;
