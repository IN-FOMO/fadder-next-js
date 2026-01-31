import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type PurchaseResponseDto = components["schemas"]["PurchaseResponseDto"];

interface UsePurchasesReturn {
  purchases: PurchaseResponseDto[];
  buyNowPurchases: PurchaseResponseDto[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePurchases(): UsePurchasesReturn {
  const [purchases, setPurchases] = useState<PurchaseResponseDto[]>([]);
  const [buyNowPurchases, setBuyNowPurchases] = useState<PurchaseResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPurchases = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [allResponse, buyNowResponse] = await Promise.all([
        apiClient.GET("/api/v1/purchases"),
        apiClient.GET("/api/v1/purchases/buy-now"),
      ]);

      if (allResponse.data) {
        setPurchases(allResponse.data.items || []);
      }

      if (buyNowResponse.data) {
        setBuyNowPurchases(buyNowResponse.data.items || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  return {
    purchases,
    buyNowPurchases,
    isLoading,
    error,
    refetch: fetchPurchases,
  };
}

export default usePurchases;
