import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { createClient } from "timber-node";

export interface TimberConfig {
  baseUrl?: string;
  apiKey: string;
}

export interface TimberClient {
  expense: {
    create: (payload: any) => Promise<any>;
    // ...other methods
  };
  expenseCategory: {
    create: (payload: any) => Promise<any>;
    list: (payload: any) => Promise<any>;
  };
  invoice: {
    create: (payload: any) => Promise<any>;
    list: (payload: any) => Promise<any>;
  };
  // ...other properties
}

// Create separate contexts for config and client
const TimberConfigContext = createContext<TimberConfig | null>(null);
const TimberClientContext = createContext<TimberClient | null>(null);

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
        {children}
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
