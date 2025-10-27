// Re-export core functionality
export {
  useTheme,
  useThemeMode,
  lightTheme,
  darkTheme,
  createVariants,
  type Theme,
  type ThemeConfig,
  type VariantConfig,
  type VariantProps
} from '@spectrum/core';

// Web-specific exports
export * from './components/ThemeProvider';
export * from './utils/cn';