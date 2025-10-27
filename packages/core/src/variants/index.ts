import type { VariantConfig, VariantProps } from '../types';
import { deepMerge } from '../utils';

/**
 * Creates a variant resolver function from a variant configuration
 */
export function createVariants<T extends VariantConfig>(config: T) {
  return function resolveVariants(
    props: VariantProps<T> & Record<string, any>
  ): T['base'] {
    // Start with base styles
    let resolvedStyles = { ...config.base };

    // Apply variant styles
    if (config.variants) {
      Object.entries(config.variants).forEach(([variantKey, variantOptions]) => {
        const propValue = props[variantKey];
        if (propValue && variantOptions[propValue]) {
          resolvedStyles = deepMerge(resolvedStyles, variantOptions[propValue]);
        }
      });
    }

    // Apply compound variants
    if (config.compoundVariants) {
      config.compoundVariants.forEach((compound) => {
        const matches = Object.entries(compound.conditions).every(
          ([key, value]) => props[key] === value
        );
        if (matches) {
          resolvedStyles = deepMerge(resolvedStyles, compound.styles);
        }
      });
    }

    return resolvedStyles;
  };
}

/**
 * Extracts variant props from component props
 */
export function extractVariantProps<T extends VariantConfig>(
  config: T,
  props: Record<string, any>
): VariantProps<T> {
  const variantKeys = Object.keys(config.variants || {});
  const variantProps: Record<string, any> = {};

  variantKeys.forEach((key) => {
    if (props[key] !== undefined) {
      variantProps[key] = props[key];
    }
  });

  // Add default variants for missing props
  if (config.defaultVariants) {
    Object.entries(config.defaultVariants).forEach(([key, value]) => {
      if (variantProps[key] === undefined) {
        variantProps[key] = value;
      }
    });
  }

  return variantProps as VariantProps<T>;
}

/**
 * Gets the default variant values for a configuration
 */
export function getDefaultVariants<T extends VariantConfig>(
  config: T
): VariantProps<T> {
  return (config.defaultVariants || {}) as VariantProps<T>;
}

/**
 * Validates that variant props match the configuration
 */
export function validateVariantProps<T extends VariantConfig>(
  config: T,
  props: Record<string, any>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!config.variants) {
    return { isValid: true, errors };
  }

  Object.entries(props).forEach(([key, value]) => {
    if (config.variants![key]) {
      const validOptions = Object.keys(config.variants![key]);
      if (!validOptions.includes(value)) {
        errors.push(
          `Invalid value "${value}" for variant "${key}". Valid options: ${validOptions.join(', ')}`
        );
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Merges multiple variant configurations
 */
export function mergeVariantConfigs<T extends VariantConfig>(
  ...configs: Partial<T>[]
): T {
  return configs.reduce((merged, config) => {
    return deepMerge(merged, config);
  }, {} as any) as T;
}

/**
 * Creates a variant configuration with type safety
 */
export function defineVariants<T>(config: VariantConfig<T>): VariantConfig<T> {
  return config;
}

// Common variant utilities
export const commonVariants = {
  size: {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl'
  } as const,
  
  color: {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    error: 'error',
    warning: 'warning',
    neutral: 'neutral'
  } as const,
  
  variant: {
    solid: 'solid',
    outline: 'outline',
    ghost: 'ghost',
    link: 'link',
    gradient: 'gradient'
  } as const
};

export type CommonSize = keyof typeof commonVariants.size;
export type CommonColor = keyof typeof commonVariants.color;
export type CommonVariant = keyof typeof commonVariants.variant;