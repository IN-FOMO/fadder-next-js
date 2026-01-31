import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type DepositSummaryDto = components["schemas"]["DepositSummaryDto"];
type DepositResponseDto = components["schemas"]["DepositResponseDto"];
type PaymentMethod = "bank_transfer" | "crypto" | "card";

interface UseDepositsReturn {
  summary: DepositSummaryDto | null;
  deposits: DepositResponseDto[];
  transactions: unknown[];
  isLoading: boolean;
  error: Error | null;
  createDeposit: (amount: number, paymentMethod: PaymentMethod) => Promise<DepositResponseDto | null>;
  refetch: () => Promise<void>;
}

export function useDeposits(): UseDepositsReturn {
  const [summary, setSummary] = useState<DepositSummaryDto | null>(null);
  const [deposits, setDeposits] = useState<DepositResponseDto[]>([]);
  const [transactions, setTransactions] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [summaryRes, depositsRes, transactionsRes] = await Promise.all([
        apiClient.GET("/api/v1/deposits/summary"),
        apiClient.GET("/api/v1/deposits"),
        apiClient.GET("/api/v1/deposits/transactions"),
      ]);

      if (summaryRes.data) {
        setSummary(summaryRes.data);
      }

      if (depositsRes.data?.items) {
        setDeposits(depositsRes.data.items);
      }

      if (transactionsRes.data) {
        setTransactions(Array.isArray(transactionsRes.data) ? transactionsRes.data : []);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createDeposit = useCallback(async (amount: number, paymentMethod: PaymentMethod): Promise<DepositResponseDto | null> => {
    try {
      const { data, error: apiError } = await apiClient.POST("/api/v1/deposits", {
        body: {
          amount,
          paymentMethod,
        },
      });

      if (apiError) {
        throw new Error("Failed to create deposit");
      }

      await fetchData();

      return data ?? null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    }
  }, [fetchData]);

  return {
    summary,
    deposits,
    transactions,
    isLoading,
    error,
    createDeposit,
    refetch: fetchData,
  };
}

export default useDeposits;
