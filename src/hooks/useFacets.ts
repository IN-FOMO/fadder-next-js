import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type ExtendedFacetsResponseDto = components["schemas"]["ExtendedFacetsResponseDto"];

interface UseFacetsReturn {
  facets: ExtendedFacetsResponseDto | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useFacets(): UseFacetsReturn {
  const [facets, setFacets] = useState<ExtendedFacetsResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFacets = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await apiClient.GET("/api/v1/lot/facets");

      if (apiError) {
        throw new Error("Failed to fetch facets");
      }

      if (data) {
        setFacets(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFacets();
  }, [fetchFacets]);

  return {
    facets,
    isLoading,
    error,
    refetch: fetchFacets,
  };
}

export default useFacets;
