import React from 'react';
import { 
  ThemeProvider as CoreThemeProvider,
  type Theme 
} from '@spectrum/core';

interface NativeThemeProviderProps {
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
}: NativeThemeProviderProps) {
  return (
    <CoreThemeProvider
      initialMode={initialMode}
      customTheme={customTheme}
      onModeChange={onModeChange}
    >
      {children}
    </CoreThemeProvider>
  );
}