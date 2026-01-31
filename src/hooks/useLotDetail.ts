import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type LotByExternalResponseDto = components["schemas"]["LotByExternalResponseDto"];

interface UseLotDetailReturn {
  lot: LotByExternalResponseDto | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useLotDetail(
  provider: "COPART" | "IAAI",
  externalLotId: string
): UseLotDetailReturn {
  const [lot, setLot] = useState<LotByExternalResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLot = useCallback(async () => {
    if (!provider || !externalLotId) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await apiClient.GET(
        "/api/v1/lot/by-external/{provider}/{externalLotId}",
        {
          params: {
            path: { provider, externalLotId },
          },
        }
      );

      if (apiError) {
        throw new Error("Failed to fetch lot details");
      }

      if (data) {
        setLot(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, [provider, externalLotId]);

  useEffect(() => {
    fetchLot();
  }, [fetchLot]);

  return {
    lot,
    isLoading,
    error,
    refetch: fetchLot,
  };
}

export default useLotDetail;
