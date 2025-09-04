import React from 'react';

// Mock TimberProvider for Storybook that doesn't use React Query
export const TimberProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return <>{children}</>;
};