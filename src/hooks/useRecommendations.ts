import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type LotSummaryDto = components["schemas"]["LotSummaryDto"];
type FeedPresetInfoDto = components["schemas"]["FeedPresetInfoDto"];

type PresetId = "popular" | "ending_soon" | "under_10k" | "under_20k" | "chinese_repaired_buy_now" | "luxury_deals" | "trucks_and_suvs" | "electric_vehicles";

interface UseRecommendationsReturn {
  presets: FeedPresetInfoDto[];
  presetsLoading: boolean;
  getFeed: (preset: PresetId, limit?: number) => Promise<LotSummaryDto[]>;
}

export function useRecommendations(): UseRecommendationsReturn {
  const [presets, setPresets] = useState<FeedPresetInfoDto[]>([]);
  const [presetsLoading, setPresetsLoading] = useState(true);

  useEffect(() => {
    async function fetchPresets() {
      try {
        const { data } = await apiClient.GET("/api/v1/recommendations/feed/presets");
        if (data?.presets) {
          setPresets(data.presets);
        }
      } catch {
        // Ignore errors
      } finally {
        setPresetsLoading(false);
      }
    }
    fetchPresets();
  }, []);

  const getFeed = useCallback(async (preset: PresetId, pageSize = 12): Promise<LotSummaryDto[]> => {
    try {
      const { data } = await apiClient.GET("/api/v1/recommendations/feed/{preset}", {
        params: {
          path: { preset },
          query: { pageSize },
        },
      });
      return data?.lots || [];
    } catch {
      return [];
    }
  }, []);

  return {
    presets,
    presetsLoading,
    getFeed,
  };
}

// Hook for a specific feed preset
export function useFeed(preset: PresetId, pageSize = 12) {
  const [lots, setLots] = useState<LotSummaryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      setIsLoading(true);
      try {
        const { data } = await apiClient.GET("/api/v1/recommendations/feed/{preset}", {
          params: {
            path: { preset },
            query: { pageSize },
          },
        });
        setLots(data?.lots || []);
      } catch {
        setLots([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeed();
  }, [preset, pageSize]);

  return { lots, isLoading };
}

export type { LotSummaryDto, FeedPresetInfoDto, PresetId };

export default useRecommendations;
