"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import apiClient, {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
  getRefreshToken,
} from "@/lib/api-client";
import type { components } from "@/types/api";

type User = components["schemas"]["UserResponseDto"];
type RegisterDto = components["schemas"]["RegisterDto"];

interface LoginResult {
  success: boolean;
  requires2FA?: boolean;
  tempToken?: string;
  requiresEmailVerification?: boolean;
  email?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingTwoFactor: { email: string; tempToken: string } | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  loginWith2FA: (code: string) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  requestEmailVerification: () => Promise<void>;
  confirmEmailVerification: (token: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingTwoFactor, setPendingTwoFactor] = useState<{
    email: string;
    tempToken: string;
  } | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await apiClient.GET("/api/v1/auth/me");
      if (error || !data) {
        clearTokens();
        setUser(null);
      } else {
        setUser(data);
      }
    } catch {
      clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Try to restore session on mount
  useEffect(() => {
    // Check for existing token or try to refresh
    const token = getAccessToken();
    const refreshToken = getRefreshToken();

    if (token) {
      fetchCurrentUser();
    } else if (refreshToken) {
      // Try to refresh the access token
      apiClient
        .POST("/api/v1/auth/refresh", {
          body: { refreshToken },
        })
        .then(({ data, error }) => {
          if (data && !error) {
            setAccessToken(data.accessToken);
            if (data.refreshToken) {
              setRefreshToken(data.refreshToken);
            }
            setUser(data.user);
          }
          setIsLoading(false);
        })
        .catch(() => {
          clearTokens();
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [fetchCurrentUser]);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const { data, error, response } = await apiClient.POST("/api/v1/auth/login", {
      body: { email, password },
    });

    // Check error responses
    const errorObj = error as Record<string, unknown> | undefined;

    // Check if email verification is required
    if (errorObj && (errorObj.code === "EMAIL_NOT_VERIFIED" || errorObj.code === "EMAIL_VERIFICATION_REQUIRED")) {
      return { success: false, requiresEmailVerification: true, email };
    }

    // Check if 2FA is required (typically indicated by a specific status or response field)
    if (response?.status === 202 || (errorObj && errorObj.code === "2FA_REQUIRED")) {
      const tempToken = (errorObj?.tempToken as string) || "";
      setPendingTwoFactor({ email, tempToken });
      return { success: false, requires2FA: true, tempToken };
    }

    if (error) {
      const errorMessage =
        (error as { message?: string }).message || "Login failed";
      throw new Error(errorMessage);
    }

    if (data) {
      setAccessToken(data.accessToken);
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }
      setUser(data.user);
      setPendingTwoFactor(null);
    }

    return { success: true };
  }, []);

  const loginWith2FA = useCallback(async (code: string) => {
    if (!pendingTwoFactor) {
      throw new Error("No pending 2FA verification");
    }

    // Re-login with 2FA code - this depends on how the backend expects 2FA
    // Some APIs have a separate endpoint, others accept code in the login body
    const { data, error } = await apiClient.POST("/api/v1/auth/login", {
      body: {
        email: pendingTwoFactor.email,
        password: "", // Backend should use tempToken
        twoFactorCode: code,
      } as { email: string; password: string },
    });

    if (error) {
      const errorMessage =
        (error as { message?: string }).message || "2FA verification failed";
      throw new Error(errorMessage);
    }

    if (data) {
      setAccessToken(data.accessToken);
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }
      setUser(data.user);
      setPendingTwoFactor(null);
    }
  }, [pendingTwoFactor]);

  const register = useCallback(async (registerData: RegisterDto) => {
    const { data, error } = await apiClient.POST("/api/v1/auth/register", {
      body: registerData,
    });

    if (error) {
      const errorMessage =
        (error as { message?: string }).message || "Registration failed";
      throw new Error(errorMessage);
    }

    if (data) {
      setAccessToken(data.accessToken);
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }
      setUser(data.user);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.POST("/api/v1/auth/logout", {
        body: {},
      });
    } catch {
      // Ignore logout errors
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await fetchCurrentUser();
  }, [fetchCurrentUser]);

  const requestEmailVerification = useCallback(async () => {
    if (!user?.email) {
      throw new Error("No email address available");
    }

    const { error } = await apiClient.POST("/api/v1/auth/verify/request", {
      body: { email: user.email },
    });

    if (error) {
      const errorMessage =
        (error as { message?: string }).message || "Failed to send verification email";
      throw new Error(errorMessage);
    }
  }, [user?.email]);

  const confirmEmailVerification = useCallback(async (token: string) => {
    const { error } = await apiClient.POST("/api/v1/auth/verify/confirm", {
      body: { token },
    });

    if (error) {
      const errorMessage =
        (error as { message?: string }).message || "Email verification failed";
      throw new Error(errorMessage);
    }

    // Refresh user to get updated emailVerified status
    await fetchCurrentUser();
  }, [fetchCurrentUser]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const { error } = await apiClient.PUT("/api/v1/auth/password", {
      body: { currentPassword, newPassword },
    });

    if (error) {
      const errorMessage =
        (error as { message?: string }).message || "Failed to change password";
      throw new Error(errorMessage);
    }
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    pendingTwoFactor,
    login,
    loginWith2FA,
    register,
    logout,
    refreshUser,
    requestEmailVerification,
    confirmEmailVerification,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
