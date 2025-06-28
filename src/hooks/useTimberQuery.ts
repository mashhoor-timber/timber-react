import { useQuery } from "@tanstack/react-query";

export interface TimberQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useTimberQuery<T = any>(
  queryKey: (string | number | boolean | undefined)[],
  queryFn: () => Promise<T> | undefined,
  options: TimberQueryOptions = {}
) {
  return useQuery({
    queryKey,
    queryFn,
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 5 * 60 * 1000, // 5 minutes
    cacheTime: options.cacheTime || 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: options.refetchOnWindowFocus || false,
  });
}
