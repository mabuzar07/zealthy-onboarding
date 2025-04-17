import { useState, useCallback } from "react";
import { API_URL } from "../lib/api";

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
      try {
        setLoading(true);
        setError(null);

        const { method = "GET", headers = {}, body } = options;

        const requestOptions: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        };

        if (body) {
          requestOptions.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_URL}${endpoint}`, requestOptions);

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ message: "Unknown error" }));
          throw new Error(
            errorData.message || `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();
        return data as T;
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchData, loading, error };
}
