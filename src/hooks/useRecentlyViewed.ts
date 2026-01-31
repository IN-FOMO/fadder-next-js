import { useCallback, useEffect, useState } from "react";
import type { VehicleCardData } from "@/app/_components/VehicleCard";

const STORAGE_KEY = "fadder-recently-viewed";
const MAX_ITEMS = 20;

export interface RecentlyViewedItem extends VehicleCardData {
  viewedAt: number;
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentlyViewedItem[];
        // Sort by viewedAt descending (most recent first)
        setItems(parsed.sort((a, b) => b.viewedAt - a.viewedAt));
      }
    } catch {
      // Invalid data in localStorage
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever items change
  const saveItems = useCallback((newItems: RecentlyViewedItem[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    setItems(newItems);
  }, []);

  // Add a vehicle to recently viewed
  const addItem = useCallback((item: Omit<RecentlyViewedItem, "viewedAt">) => {
    if (typeof window === "undefined") return;

    const newItem: RecentlyViewedItem = {
      ...item,
      viewedAt: Date.now(),
    };

    // Load current items
    let currentItems: RecentlyViewedItem[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        currentItems = JSON.parse(stored);
      }
    } catch {
      currentItems = [];
    }

    // Remove duplicate if exists (by provider + externalLotId or by title)
    const filtered = currentItems.filter((existing) => {
      if (item.provider && item.externalLotId) {
        return !(existing.provider === item.provider && existing.externalLotId === item.externalLotId);
      }
      return existing.title !== item.title;
    });

    // Add new item at the beginning
    const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);

    saveItems(updated);
  }, [saveItems]);

  // Remove a specific item
  const removeItem = useCallback((provider: string, externalLotId: string) => {
    const filtered = items.filter(
      (item) => !(item.provider === provider && item.externalLotId === externalLotId)
    );
    saveItems(filtered);
  }, [items, saveItems]);

  // Clear all recently viewed
  const clearAll = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  }, []);

  return {
    items,
    isLoading,
    addItem,
    removeItem,
    clearAll,
  };
}

export default useRecentlyViewed;
