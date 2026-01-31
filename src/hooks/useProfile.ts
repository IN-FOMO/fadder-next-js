import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type ProfileDto = components["schemas"]["ProfileResponseDto"];
type UpdateProfileDto = components["schemas"]["UpdateProfileDto"];

interface UseProfileReturn {
  profile: ProfileDto | null;
  isLoading: boolean;
  error: Error | null;
  updateProfile: (data: UpdateProfileDto) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await apiClient.GET("/api/v1/profile/me");

      if (apiError) {
        throw new Error("Failed to fetch profile");
      }

      if (data) {
        setProfile(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: UpdateProfileDto) => {
    try {
      const { data: updated, error: apiError } = await apiClient.PUT(
        "/api/v1/profile/me",
        {
          body: data,
        }
      );

      if (apiError) {
        throw new Error("Failed to update profile");
      }

      if (updated) {
        setProfile(updated);
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error("Unknown error");
    }
  }, []);

  const uploadAvatar = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://rbki.lol/api/v1/profile/me/avatar", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("fadder-access-token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }

      await fetchProfile();
    } catch (err) {
      throw err instanceof Error ? err : new Error("Unknown error");
    }
  }, [fetchProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    uploadAvatar,
    refetch: fetchProfile,
  };
}

export default useProfile;
