import React, { createContext, useContext } from "react";

type TimberConfig = { apiKey: string; baseUrl?: string };
type TimberClientType = {
  /* shape not needed for stories */
};

const TimberConfigContext = createContext<TimberConfig | null>(null);
const TimberClientContext = createContext<TimberClientType | null>({} as any);

export const TimberProvider: React.FC<{
  config: TimberConfig;
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <TimberConfigContext.Provider value={{ apiKey: "mock" }}>
      <TimberClientContext.Provider value={{} as any}>
        {children}
      </TimberClientContext.Provider>
    </TimberConfigContext.Provider>
  );
};

export const useTimberConfig = () => {
  const ctx = useContext(TimberConfigContext);
  if (!ctx)
    throw new Error("useTimberConfig must be used within a TimberProvider");
  return ctx;
};

export const useTimberClient = () => {
  const ctx = useContext(TimberClientContext);
  if (!ctx)
    throw new Error("useTimberClient must be used within a TimberProvider");
  return ctx;
};
