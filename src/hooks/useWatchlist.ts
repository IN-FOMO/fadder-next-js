import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type WatchlistItemDto = components["schemas"]["WatchlistItemResponseDto"];

interface UseWatchlistReturn {
  items: WatchlistItemDto[];
  isLoading: boolean;
  error: Error | null;
  addToWatchlist: (
    provider: "COPART" | "IAAI",
    lotId: string,
    metadata?: { lotTitle?: string; lotThumbnail?: string; saleDate?: string; currentBid?: number }
  ) => Promise<void>;
  removeFromWatchlist: (provider: "COPART" | "IAAI", lotId: string) => Promise<void>;
  isInWatchlist: (provider: "COPART" | "IAAI", lotId: string) => boolean;
  refetch: () => Promise<void>;
}

export function useWatchlist(): UseWatchlistReturn {
  const [items, setItems] = useState<WatchlistItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWatchlist = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await apiClient.GET("/api/v1/watchlist");

      if (apiError) {
        throw new Error("Failed to fetch watchlist");
      }

      if (data) {
        setItems(data.items || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToWatchlist = useCallback(
    async (
      provider: "COPART" | "IAAI",
      lotId: string,
      metadata?: { lotTitle?: string; lotThumbnail?: string; saleDate?: string; currentBid?: number }
    ) => {
      try {
        const { error: apiError } = await apiClient.POST(
          "/api/v1/watchlist/{provider}/{lotId}",
          {
            params: {
              path: { provider, lotId },
            },
            body: metadata ?? {},
          }
        );

        if (apiError) {
          throw new Error("Failed to add to watchlist");
        }

        await fetchWatchlist();
      } catch (err) {
        throw err instanceof Error ? err : new Error("Unknown error");
      }
    },
    [fetchWatchlist]
  );

  const removeFromWatchlist = useCallback(
    async (provider: "COPART" | "IAAI", lotId: string) => {
      try {
        const { error: apiError } = await apiClient.DELETE(
          "/api/v1/watchlist/{provider}/{lotId}",
          {
            params: {
              path: { provider, lotId },
            },
          }
        );

        if (apiError) {
          throw new Error("Failed to remove from watchlist");
        }

        await fetchWatchlist();
      } catch (err) {
        throw err instanceof Error ? err : new Error("Unknown error");
      }
    },
    [fetchWatchlist]
  );

  const isInWatchlist = useCallback(
    (provider: "COPART" | "IAAI", lotId: string) => {
      return items.some(
        (item) => item.provider === provider && item.externalLotId === lotId
      );
    },
    [items]
  );

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return {
    items,
    isLoading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    refetch: fetchWatchlist,
  };
}

export default useWatchlist;
