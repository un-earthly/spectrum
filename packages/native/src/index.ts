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

// Native-specific exports
export * from './components/ThemeProvider';
export * from './components/Button';
export * from './components/Card';
export * from './components/Input';
export * from './components/Badge';
export * from './components/Avatar';
export * from './utils/cn';