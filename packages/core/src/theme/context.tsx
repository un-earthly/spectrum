import React, { createContext, useCallback, useMemo, useState } from 'react';
import type { Theme, ThemeConfig } from '../types';
import { lightTheme, darkTheme } from './default-themes';
import { deepMerge } from '../utils';

interface ThemeContextValue {
  theme: Theme;
  mode: 'light' | 'dark';
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  setTheme: (theme: Partial<Theme>) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: 'light' | 'dark';
  customTheme?: {
    light?: Partial<Theme>;
    dark?: Partial<Theme>;
  };
  onModeChange?: (mode: 'light' | 'dark') => void;
}

export function ThemeProvider({
  children,
  initialMode = 'light',
  customTheme,
  onModeChange
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<'light' | 'dark'>(initialMode);
  const [customThemeOverrides, setCustomThemeOverrides] = useState<Partial<Theme>>({});

  const baseThemes = useMemo(() => ({
    light: customTheme?.light ? deepMerge(lightTheme, customTheme.light) : lightTheme,
    dark: customTheme?.dark ? deepMerge(darkTheme, customTheme.dark) : darkTheme
  }), [customTheme]);

  const theme = useMemo(() => {
    const baseTheme = baseThemes[mode];
    return Object.keys(customThemeOverrides).length > 0
      ? deepMerge(baseTheme, customThemeOverrides)
      : baseTheme;
  }, [baseThemes, mode, customThemeOverrides]);

  const toggleMode = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setModeState(newMode);
    onModeChange?.(newMode);
  }, [mode, onModeChange]);

  const setMode = useCallback((newMode: 'light' | 'dark') => {
    setModeState(newMode);
    onModeChange?.(newMode);
  }, [onModeChange]);

  const setTheme = useCallback((themeOverrides: Partial<Theme>) => {
    setCustomThemeOverrides(themeOverrides);
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    mode,
    toggleMode,
    setMode,
    setTheme
  }), [theme, mode, toggleMode, setMode, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}