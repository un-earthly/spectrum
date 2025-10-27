import { useContext } from 'react';
import { ThemeContext } from '../theme/context';
import type { Theme } from '../types';

/**
 * Hook to access the current theme
 */
export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
}

/**
 * Hook to access theme mode and toggle function
 */
export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return {
    mode: context.mode,
    toggleMode: context.toggleMode,
    setMode: context.setMode
  };
}