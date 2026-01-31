import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type LotSummaryDto = components["schemas"]["LotSummaryDto"];

export interface SearchParams {
  keyword?: string;
  vin?: string;
  providers?: ("COPART" | "IAAI")[];
  make?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  buyNowPriceMin?: number;
  buyNowPriceMax?: number;
  odometerMin?: number;
  odometerMax?: number;
  damageType?: string[];
  state?: string;
  city?: string;
  vehicleType?: string;
  bodyStyle?: string[];
  fuelType?: string[];
  transmission?: string[];
  driveType?: string[];
  color?: string[];
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  pageSize?: number;
}

interface SearchResult {
  lots: LotSummaryDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface UseSearchLotsReturn {
  data: SearchResult | null;
  isLoading: boolean;
  error: Error | null;
  search: (params: SearchParams) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useSearchLots(initialParams?: SearchParams): UseSearchLotsReturn {
  const [data, setData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentParams, setCurrentParams] = useState<SearchParams>(
    initialParams || {}
  );

  const search = useCallback(async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setCurrentParams(params);

    try {
      const { data: response, error: apiError } = await apiClient.GET(
        "/api/v1/lot/search",
        {
          params: {
            query: {
              keyword: params.keyword,
              vin: params.vin,
              providers: params.providers,
              make: params.make,
              model: params.model,
              yearMin: params.yearMin,
              yearMax: params.yearMax,
              buyNowPriceMin: params.buyNowPriceMin,
              buyNowPriceMax: params.buyNowPriceMax,
              odometerMin: params.odometerMin,
              odometerMax: params.odometerMax,
              damageType: params.damageType,
              state: params.state,
              city: params.city,
              vehicleType: params.vehicleType,
              bodyStyle: params.bodyStyle,
              fuelType: params.fuelType,
              transmission: params.transmission,
              driveType: params.driveType,
              color: params.color,
              sortBy: params.sortBy,
              sortOrder: params.sortOrder,
              page: params.page,
              pageSize: params.pageSize,
            },
          },
        }
      );

      if (apiError) {
        throw new Error("Failed to fetch search results");
      }

      if (response) {
        // Flatten results from all providers
        const allLots: LotSummaryDto[] = [];
        let totalCount = 0;

        if (response.results) {
          for (const result of response.results) {
            if (result.lots) {
              allLots.push(...result.lots);
            }
            totalCount += result.totalCount || 0;
          }
        }

        setData({
          lots: allLots,
          total: totalCount,
          page: params.page || 1,
          pageSize: params.pageSize || 20,
          totalPages: Math.ceil(totalCount / (params.pageSize || 20)),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await search(currentParams);
  }, [search, currentParams]);

  useEffect(() => {
    if (initialParams) {
      search(initialParams);
    }
  }, []);

  return { data, isLoading, error, search, refetch };
}

export default useSearchLots;
