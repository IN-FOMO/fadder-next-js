import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type BidResponseDto = components["schemas"]["BidResponseDto"];

interface UseBidsReturn {
  activeBids: BidResponseDto[];
  wonBids: BidResponseDto[];
  lostBids: BidResponseDto[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useBids(): UseBidsReturn {
  const [activeBids, setActiveBids] = useState<BidResponseDto[]>([]);
  const [wonBids, setWonBids] = useState<BidResponseDto[]>([]);
  const [lostBids, setLostBids] = useState<BidResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBids = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [activeResponse, wonResponse, lostResponse] = await Promise.all([
        apiClient.GET("/api/v1/bids/active"),
        apiClient.GET("/api/v1/bids/won"),
        apiClient.GET("/api/v1/bids/lost"),
      ]);

      if (activeResponse.data) {
        setActiveBids(activeResponse.data.items || []);
      }

      if (wonResponse.data) {
        setWonBids(wonResponse.data.items || []);
      }

      if (lostResponse.data) {
        setLostBids(lostResponse.data.items || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  return {
    activeBids,
    wonBids,
    lostBids,
    isLoading,
    error,
    refetch: fetchBids,
  };
}

export default useBids;
