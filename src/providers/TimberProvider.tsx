import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { createClient, TimberClientType } from "timber-node";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export interface TimberConfig {
  baseUrl?: string;
  apiKey: string;
}

// Create separate contexts for config and client
const TimberConfigContext = createContext<TimberConfig | null>(null);
const TimberClientContext = createContext<TimberClientType | null>(null);

export interface TimberProviderProps {
  config: TimberConfig;
  children: ReactNode;
}

export const TimberProvider: React.FC<TimberProviderProps> = ({
  config,
  children,
}) => {
  // Initialize the timber client with memoization to prevent recreation on re-renders
  const timberClient = useMemo(() => {
    return createClient(config.apiKey);
  }, [config.apiKey, config.baseUrl]);

  return (
    <TimberConfigContext.Provider value={config}>
      <TimberClientContext.Provider value={timberClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TimberClientContext.Provider>
    </TimberConfigContext.Provider>
  );
};

export const useTimberConfig = () => {
  const context = useContext(TimberConfigContext);
  if (!context) {
    throw new Error("useTimberConfig must be used within a TimberProvider");
  }
  return context;
};

// Hook to get timber client instance
export const useTimberClient = () => {
  const context = useContext(TimberClientContext);
  if (!context) {
    throw new Error("useTimberClient must be used within a TimberProvider");
  }
  return context;
};
