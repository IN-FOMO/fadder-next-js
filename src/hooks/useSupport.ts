import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import type { components } from "@/types/api";

type FaqItemResponseDto = components["schemas"]["FaqItemResponseDto"];

interface UseFaqReturn {
  faqItems: FaqItemResponseDto[];
  isLoading: boolean;
  error: Error | null;
}

export function useFaq(): UseFaqReturn {
  const [faqItems, setFaqItems] = useState<FaqItemResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFaq = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: apiError } = await apiClient.GET("/api/v1/support/faq");

        if (apiError) {
          throw new Error("Failed to fetch FAQ");
        }

        if (data?.items) {
          setFaqItems(data.items);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaq();
  }, []);

  return { faqItems, isLoading, error };
}

interface UseSupportTicketsReturn {
  submitTicket: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  error: Error | null;
}

export function useSupportTickets(): UseSupportTicketsReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitTicket = useCallback(async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: apiError } = await apiClient.POST("/api/v1/support/tickets", {
        body: {
          subject: `Support request from ${data.firstName} ${data.lastName}`,
          message: `${data.message}\n\nContact: ${data.email}${data.phone ? `, ${data.phone}` : ""}`,
          priority: "medium",
        },
      });

      if (apiError) {
        throw new Error("Failed to submit support ticket");
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { submitTicket, isSubmitting, error };
}

export default useFaq;
