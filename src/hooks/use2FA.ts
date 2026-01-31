import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type TwoFactorStatusResponseDto = components["schemas"]["TwoFactorStatusResponseDto"];
type TwoFactorSetupResponseDto = components["schemas"]["TwoFactorSetupResponseDto"];

interface Use2FAReturn {
  isEnabled: boolean;
  isLoading: boolean;
  error: Error | null;
  setupData: TwoFactorSetupResponseDto | null;
  getStatus: () => Promise<void>;
  setup: () => Promise<TwoFactorSetupResponseDto | null>;
  enable: (code: string, backupCodes?: boolean) => Promise<{ backupCodes?: string[] } | null>;
  disable: (code: string, password: string) => Promise<void>;
}

export function use2FA(): Use2FAReturn {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [setupData, setSetupData] = useState<TwoFactorSetupResponseDto | null>(null);

  const getStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await apiClient.GET("/api/v1/auth/2fa/status");

      if (apiError) {
        throw new Error("Failed to get 2FA status");
      }

      if (data) {
        setIsEnabled(data.enabled);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setup = useCallback(async (): Promise<TwoFactorSetupResponseDto | null> => {
    try {
      const { data, error: apiError } = await apiClient.POST("/api/v1/auth/2fa/setup");

      if (apiError) {
        throw new Error("Failed to setup 2FA");
      }

      if (data) {
        setSetupData(data);
        return data;
      }
      return null;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Unknown error");
    }
  }, []);

  const enable = useCallback(
    async (
      code: string,
      generateBackupCodes = true
    ): Promise<{ backupCodes?: string[] } | null> => {
      try {
        const { data, error: apiError } = await apiClient.POST("/api/v1/auth/2fa/enable", {
          body: { code, generateBackupCodes },
        });

        if (apiError) {
          throw new Error("Failed to enable 2FA");
        }

        if (data) {
          setIsEnabled(true);
          setSetupData(null);
          return { backupCodes: data.backupCodes };
        }
        return null;
      } catch (err) {
        throw err instanceof Error ? err : new Error("Unknown error");
      }
    },
    []
  );

  const disable = useCallback(async (code: string, password: string) => {
    try {
      const { error: apiError } = await apiClient.POST("/api/v1/auth/2fa/disable", {
        body: { code, password },
      });

      if (apiError) {
        throw new Error("Failed to disable 2FA");
      }

      setIsEnabled(false);
    } catch (err) {
      throw err instanceof Error ? err : new Error("Unknown error");
    }
  }, []);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return {
    isEnabled,
    isLoading,
    error,
    setupData,
    getStatus,
    setup,
    enable,
    disable,
  };
}

export default use2FA;
