import type { Theme, ColorShades } from '../types';

/**
 * Get a color value from the theme
 */
export function getColor(
  theme: Theme,
  colorPath: string,
  fallback?: string
): string {
  const parts = colorPath.split('-');
  if (parts.length !== 2) {
    console.warn(`Invalid color path: ${colorPath}. Expected format: "color-shade"`);
    return fallback || '#000000';
  }

  const [colorName, shade] = parts;
  const colorPalette = theme.colors[colorName as keyof typeof theme.colors];
  
  if (!colorPalette) {
    console.warn(`Color "${colorName}" not found in theme`);
    return fallback || '#000000';
  }

  const color = (colorPalette as any)[shade];
  if (!color) {
    console.warn(`Shade "${shade}" not found for color "${colorName}"`);
    return fallback || '#000000';
  }

  return color;
}

/**
 * Get spacing value from theme
 */
export function getSpacing(
  theme: Theme,
  size: keyof Theme['spacing'],
  fallback?: number
): number {
  const spacing = theme.spacing[size];
  if (spacing === undefined) {
    console.warn(`Spacing size "${size}" not found in theme`);
    return fallback || 0;
  }
  return spacing;
}

/**
 * Get border radius value from theme
 */
export function getBorderRadius(
  theme: Theme,
  size: keyof Theme['borderRadius'],
  fallback?: number
): number {
  const radius = theme.borderRadius[size];
  if (radius === undefined) {
    console.warn(`Border radius size "${size}" not found in theme`);
    return fallback || 0;
  }
  return radius;
}

/**
 * Get typography value from theme
 */
export function getTypography(
  theme: Theme,
  property: keyof Theme['typography'],
  size: string,
  fallback?: any
): any {
  const typographyScale = theme.typography[property];
  if (!typographyScale) {
    console.warn(`Typography property "${property}" not found in theme`);
    return fallback;
  }

  const value = (typographyScale as any)[size];
  if (value === undefined) {
    console.warn(`Typography size "${size}" not found for property "${property}"`);
    return fallback;
  }

  return value as any;
}

/**
 * Get shadow value from theme
 */
export function getShadow(
  theme: Theme,
  size: keyof Theme['shadows'],
  fallback?: string
): string {
  const shadow = theme.shadows[size];
  if (!shadow) {
    console.warn(`Shadow size "${size}" not found in theme`);
    return fallback || 'none';
  }
  return shadow;
}

/**
 * Get gradient colors from theme
 */
export function getGradient(
  theme: Theme,
  name: keyof Theme['gradients'],
  fallback?: [string, string]
): [string, string] {
  const gradient = theme.gradients[name];
  if (!gradient) {
    console.warn(`Gradient "${name}" not found in theme`);
    return fallback || ['#000000', '#000000'];
  }
  return gradient;
}

/**
 * Create a CSS custom properties object from theme
 */
export function createCSSVariables(theme: Theme, prefix = '--ui'): Record<string, string> {
  const variables: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      variables[`${prefix}-color-${colorName}-${shade}`] = value as string;
    });
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([size, value]) => {
    variables[`${prefix}-spacing-${size}`] = `${value}px`;
  });

  // Typography
  Object.entries(theme.typography.fontSize).forEach(([size, value]) => {
    variables[`${prefix}-font-size-${size}`] = `${value}px`;
  });

  Object.entries(theme.typography.fontWeight).forEach(([weight, value]) => {
    variables[`${prefix}-font-weight-${weight}`] = value;
  });

  // Border radius
  Object.entries(theme.borderRadius).forEach(([size, value]) => {
    variables[`${prefix}-border-radius-${size}`] = `${value}px`;
  });

  // Shadows
  Object.entries(theme.shadows).forEach(([size, value]) => {
    variables[`${prefix}-shadow-${size}`] = value;
  });

  return variables;
}