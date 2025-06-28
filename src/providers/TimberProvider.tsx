import React, { createContext, useContext, ReactNode } from 'react';

export interface TimberConfig {
  apiBaseUrl?: string;
  defaultCurrency?: string;
  dateFormat?: string;
  theme?: {
    primaryColor?: string;
    borderRadius?: string;
  };
  features?: {
    wafeqIntegration?: boolean;
    zohoIntegration?: boolean;
  };
}

const TimberContext = createContext<TimberConfig | null>(null);

export interface TimberProviderProps {
  config: TimberConfig;
  children: ReactNode;
}

export const TimberProvider: React.FC<TimberProviderProps> = ({ config, children }) => {
  return (
    <TimberContext.Provider value={config}>
      {children}
    </TimberContext.Provider>
  );
};

export const useTimberConfig = () => {
  const context = useContext(TimberContext);
  if (!context) {
    throw new Error('useTimberConfig must be used within a TimberProvider');
  }
  return context;
};