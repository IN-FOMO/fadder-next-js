import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type CountryResponseDto = components["schemas"]["CountryResponseDto"];
type CarModelResponseDto = components["schemas"]["CarModelResponseDto"];

interface UseMarketplaceReturn {
  countries: CountryResponseDto[];
  carModels: CarModelResponseDto[];
  isLoading: boolean;
  error: Error | null;
  fetchCarModels: (params?: { countryId?: string; page?: number; limit?: number }) => Promise<void>;
  getCarModel: (id: string) => Promise<CarModelResponseDto | null>;
}

export function useMarketplace(): UseMarketplaceReturn {
  const [countries, setCountries] = useState<CountryResponseDto[]>([]);
  const [carModels, setCarModels] = useState<CarModelResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data, error: apiError } = await apiClient.GET("/api/v1/marketplace/countries");

        if (apiError) {
          throw new Error("Failed to fetch countries");
        }

        if (data?.items) {
          setCountries(data.items);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      }
    };

    fetchCountries();
  }, []);

  // Fetch car models
  const fetchCarModels = useCallback(async (params?: { countryId?: string; page?: number; limit?: number }) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await apiClient.GET("/api/v1/marketplace/car-models", {
        params: {
          query: {
            countryId: params?.countryId,
            page: params?.page,
            limit: params?.limit ?? 20,
          },
        },
      });

      if (apiError) {
        throw new Error("Failed to fetch car models");
      }

      if (data?.items) {
        setCarModels(data.items);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCarModels();
  }, [fetchCarModels]);

  // Get single car model
  const getCarModel = useCallback(async (id: string): Promise<CarModelResponseDto | null> => {
    try {
      const { data, error: apiError } = await apiClient.GET("/api/v1/marketplace/car-models/{id}", {
        params: {
          path: { id },
        },
      });

      if (apiError) {
        throw new Error("Failed to fetch car model");
      }

      return data ?? null;
    } catch {
      return null;
    }
  }, []);

  return {
    countries,
    carModels,
    isLoading,
    error,
    fetchCarModels,
    getCarModel,
  };
}

export default useMarketplace;
