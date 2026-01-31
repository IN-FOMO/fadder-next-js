import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type DashboardSummaryDto = components["schemas"]["DashboardSummaryDto"];

interface UseDashboardReturn {
  summary: DashboardSummaryDto | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const [summary, setSummary] = useState<DashboardSummaryDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await apiClient.GET(
        "/api/v1/dashboard/summary"
      );

      if (apiError) {
        throw new Error("Failed to fetch dashboard summary");
      }

      if (data) {
        setSummary(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    isLoading,
    error,
    refetch: fetchSummary,
  };
}

export default useDashboard;
