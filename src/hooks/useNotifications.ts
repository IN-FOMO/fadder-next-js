import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type NotificationDto = components["schemas"]["NotificationResponseDto"];
type NotificationPreferencesDto = components["schemas"]["NotificationPreferencesResponseDto"];
type UpdateNotificationPreferencesDto = components["schemas"]["UpdateNotificationPreferencesDto"];

interface UseNotificationsReturn {
  notifications: NotificationDto[];
  unreadCount: number;
  preferences: NotificationPreferencesDto | null;
  isLoading: boolean;
  error: Error | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  updatePreferences: (prefs: UpdateNotificationPreferencesDto) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [preferences, setPreferences] = useState<NotificationPreferencesDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [notifResponse, countResponse, prefsResponse] = await Promise.all([
        apiClient.GET("/api/v1/notifications"),
        apiClient.GET("/api/v1/notifications/unread-count"),
        apiClient.GET("/api/v1/notifications/preferences"),
      ]);

      if (notifResponse.data) {
        setNotifications(notifResponse.data.items || []);
      }

      if (countResponse.data) {
        setUnreadCount(countResponse.data.unreadCount || 0);
      }

      if (prefsResponse.data) {
        setPreferences(prefsResponse.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await apiClient.PUT("/api/v1/notifications/{notificationId}/read", {
        params: {
          path: { notificationId },
        },
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Unknown error");
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await apiClient.PUT("/api/v1/notifications/read-all");

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      throw err instanceof Error ? err : new Error("Unknown error");
    }
  }, []);

  const updatePreferences = useCallback(
    async (prefs: UpdateNotificationPreferencesDto) => {
      try {
        const { data } = await apiClient.PUT("/api/v1/notifications/preferences", {
          body: prefs,
        });

        if (data) {
          setPreferences(data);
        }
      } catch (err) {
        throw err instanceof Error ? err : new Error("Unknown error");
      }
    },
    []
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    preferences,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    updatePreferences,
    refetch: fetchNotifications,
  };
}

export default useNotifications;
