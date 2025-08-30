import { useCallback, useState } from "react";

import { useAppStore } from "../store/useAppStore";

type UseApiOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
};

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const { setLoading, setError } = useAppStore();

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      options.onSuccess?.(result);
      return result;
    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      options.onError?.(errorMessage);
      throw error;
    }
    finally {
      setLoading(false);
    }
  }, [setLoading, setError, options]);

  return { data, execute };
}
