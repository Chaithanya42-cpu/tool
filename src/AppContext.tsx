import React from 'react';
import { useAppState } from './hooks/useAppState';

type AppState = ReturnType<typeof useAppState>;

const AppContext = React.createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const state = useAppState();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
