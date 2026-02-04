import React, { createContext, useCallback, useContext, useState } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  /** User override: null = follow system */
  theme: ThemeMode | null;
  setTheme: (mode: ThemeMode | null) => void;
  toggleTheme: () => void;
  /** Resolved theme for styling (user override or system) */
  effectiveTheme: ThemeMode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode | null>(null);

  const setTheme = useCallback((mode: ThemeMode | null) => {
    setThemeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const system = systemScheme ?? 'light';
      const current = prev ?? system;
      return current === 'light' ? 'dark' : 'light';
    });
  }, [systemScheme]);

  const effectiveTheme: ThemeMode = theme ?? systemScheme ?? 'light';

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    effectiveTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return ctx;
}

/** Resolved theme for use in components that don't need setTheme (e.g. useThemeColor) */
export function useEffectiveTheme(): ThemeMode {
  return useThemeContext().effectiveTheme;
}
