import React, { useEffect } from 'react';
import {
  ThemeProvider as CoreThemeProvider,
  useTheme,
  type Theme
} from '@spectrum/core';

interface WebThemeProviderProps {
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
}: WebThemeProviderProps) {
  return (
    <CoreThemeProvider
      initialMode={initialMode}
      customTheme={customTheme}
      onModeChange={onModeChange}
    >
      <ThemeInjector>
        {children}
      </ThemeInjector>
    </CoreThemeProvider>
  );
}

function ThemeInjector({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  useEffect(() => {
    injectThemeVariables(theme);
  }, [theme]);

  return <>{children}</>;
}

function injectThemeVariables(theme: Theme) {
  const root = document.documentElement;

  // Inject color variables (store as valid CSS color strings — keep original value (hex or any CSS color))
  Object.entries(theme.colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      // value is expected to be a CSS color string (hex, rgb(), oklch(), etc.) — use it as-is
      const cssColor = String(value);
      root.style.setProperty(`--color-${colorName}-${shade}`, cssColor);
    });
  });

  // Inject spacing variables
  Object.entries(theme.spacing).forEach(([size, value]) => {
    root.style.setProperty(`--spacing-${size}`, `${value}px`);
  });

  // Inject border radius variables
  Object.entries(theme.borderRadius).forEach(([size, value]) => {
    root.style.setProperty(`--radius-${size}`, `${value}px`);
  });
}
