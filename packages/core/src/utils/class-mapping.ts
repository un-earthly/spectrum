import type { Theme } from '../types';

// React Native style object type
export interface RNStyle {
  [key: string]: any;
}

// Class mapping configuration
export interface ClassMappingConfig {
  theme: Theme;
  platform: 'native' | 'web';
}

/**
 * Parses a class string and converts it to React Native styles
 */
export function parseClassName(className: string, config: ClassMappingConfig): RNStyle {
  if (!className) return {};
  
  const classes = className.split(/\s+/).filter(Boolean);
  const styles: RNStyle = {};
  
  classes.forEach(cls => {
    const style = classToStyle(cls, config);
    Object.assign(styles, style);
  });
  
  return styles;
}

/**
 * Converts a single class to React Native style
 */
function classToStyle(className: string, config: ClassMappingConfig): RNStyle {
  const { theme } = config;
  
  // Padding utilities
  if (className.startsWith('p-')) {
    const size = className.slice(2);
    const value = getSpacingValue(size, theme);
    return { padding: value };
  }
  
  if (className.startsWith('px-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { paddingHorizontal: value };
  }
  
  if (className.startsWith('py-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { paddingVertical: value };
  }
  
  if (className.startsWith('pt-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { paddingTop: value };
  }
  
  if (className.startsWith('pb-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { paddingBottom: value };
  }
  
  if (className.startsWith('pl-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { paddingLeft: value };
  }
  
  if (className.startsWith('pr-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { paddingRight: value };
  }
  
  // Margin utilities
  if (className.startsWith('m-')) {
    const size = className.slice(2);
    const value = getSpacingValue(size, theme);
    return { margin: value };
  }
  
  if (className.startsWith('mx-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { marginHorizontal: value };
  }
  
  if (className.startsWith('my-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { marginVertical: value };
  }
  
  if (className.startsWith('mt-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { marginTop: value };
  }
  
  if (className.startsWith('mb-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { marginBottom: value };
  }
  
  if (className.startsWith('ml-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { marginLeft: value };
  }
  
  if (className.startsWith('mr-')) {
    const size = className.slice(3);
    const value = getSpacingValue(size, theme);
    return { marginRight: value };
  }
  
  // Background color utilities
  if (className.startsWith('bg-')) {
    const colorPath = className.slice(3);
    const color = getColorValue(colorPath, theme);
    return { backgroundColor: color };
  }
  
  // Text color utilities (must have color-shade format)
  if (className.startsWith('text-') && className.includes('-')) {
    const parts = className.slice(5).split('-');
    if (parts.length === 2) {
      const colorPath = className.slice(5);
      const color = getColorValue(colorPath, theme);
      return { color };
    }
  }
  
  // Layout utilities
  switch (className) {
    case 'flex':
      return { display: 'flex' };
    case 'flex-row':
      return { flexDirection: 'row' };
    case 'flex-col':
      return { flexDirection: 'column' };
    case 'flex-wrap':
      return { flexWrap: 'wrap' };
    case 'flex-nowrap':
      return { flexWrap: 'nowrap' };
    case 'items-start':
      return { alignItems: 'flex-start' };
    case 'items-center':
      return { alignItems: 'center' };
    case 'items-end':
      return { alignItems: 'flex-end' };
    case 'items-stretch':
      return { alignItems: 'stretch' };
    case 'justify-start':
      return { justifyContent: 'flex-start' };
    case 'justify-center':
      return { justifyContent: 'center' };
    case 'justify-end':
      return { justifyContent: 'flex-end' };
    case 'justify-between':
      return { justifyContent: 'space-between' };
    case 'justify-around':
      return { justifyContent: 'space-around' };
    case 'justify-evenly':
      return { justifyContent: 'space-evenly' };
  }
  
  // Width utilities
  if (className.startsWith('w-')) {
    const size = className.slice(2);
    if (size === 'full') return { width: '100%' };
    if (size === 'auto') return { width: 'auto' };
    const value = getSizeValue(size, theme);
    return { width: value };
  }
  
  // Height utilities
  if (className.startsWith('h-')) {
    const size = className.slice(2);
    if (size === 'full') return { height: '100%' };
    if (size === 'auto') return { height: 'auto' };
    const value = getSizeValue(size, theme);
    return { height: value };
  }
  
  // Border radius utilities
  if (className.startsWith('rounded')) {
    if (className === 'rounded') {
      return { borderRadius: theme.borderRadius.md };
    }
    if (className.startsWith('rounded-')) {
      const size = className.slice(8);
      const value = getBorderRadiusValue(size, theme);
      return { borderRadius: value };
    }
  }
  
  // Border utilities
  if (className.startsWith('border')) {
    if (className === 'border') {
      return { borderWidth: 1 };
    }
    if (className.startsWith('border-')) {
      const size = className.slice(7);
      const value = parseInt(size) || 1;
      return { borderWidth: value };
    }
  }
  
  // Typography utilities (font size) - single word after text-
  if (className.startsWith('text-')) {
    const parts = className.slice(5).split('-');
    if (parts.length === 1) {
      const size = parts[0];
      const fontSize = getTypographyValue('fontSize', size, theme);
      if (fontSize) return { fontSize };
    }
  }
  
  if (className.startsWith('font-')) {
    const weight = className.slice(5);
    const fontWeight = getTypographyValue('fontWeight', weight, theme);
    if (fontWeight) return { fontWeight };
  }
  
  // Shadow utilities
  if (className.startsWith('shadow')) {
    if (className === 'shadow') {
      return getShadowStyle('md', theme);
    }
    if (className.startsWith('shadow-')) {
      const size = className.slice(7);
      return getShadowStyle(size, theme);
    }
  }
  
  // Position utilities
  switch (className) {
    case 'absolute':
      return { position: 'absolute' };
    case 'relative':
      return { position: 'relative' };
  }
  
  // Flex utilities
  if (className.startsWith('flex-')) {
    const value = className.slice(5);
    if (value === '1') return { flex: 1 };
    if (value === 'none') return { flex: 0 };
    const flexValue = parseInt(value);
    if (!isNaN(flexValue)) return { flex: flexValue };
  }
  
  // Return empty object for unrecognized classes
  return {};
}

/**
 * Gets spacing value from theme
 */
function getSpacingValue(size: string, theme: Theme): number {
  const spacingMap: Record<string, keyof Theme['spacing']> = {
    '0': 'xs',
    '1': 'xs',
    '2': 'sm',
    '3': 'md',
    '4': 'md',
    '5': 'lg',
    '6': 'lg',
    '8': 'xl',
    '10': '2xl',
    '12': '3xl',
    '16': '4xl'
  };
  
  const mappedSize = spacingMap[size];
  if (mappedSize && theme.spacing[mappedSize]) {
    return theme.spacing[mappedSize];
  }
  
  // Direct theme spacing access
  if (theme.spacing[size as keyof Theme['spacing']]) {
    return theme.spacing[size as keyof Theme['spacing']];
  }
  
  // Fallback to numeric value
  const numericValue = parseInt(size);
  return isNaN(numericValue) ? 0 : numericValue * 4; // 4px base unit
}

/**
 * Gets color value from theme
 */
function getColorValue(colorPath: string, theme: Theme): string {
  const parts = colorPath.split('-');
  if (parts.length !== 2) return '#000000';
  
  const [colorName, shade] = parts;
  const colorPalette = theme.colors[colorName as keyof typeof theme.colors];
  
  if (!colorPalette) return '#000000';
  
  const color = (colorPalette as any)[shade];
  return color || '#000000';
}

/**
 * Gets size value for width/height
 */
function getSizeValue(size: string, theme: Theme): number {
  return getSpacingValue(size, theme);
}

/**
 * Gets border radius value from theme
 */
function getBorderRadiusValue(size: string, theme: Theme): number {
  if (theme.borderRadius[size as keyof Theme['borderRadius']]) {
    return theme.borderRadius[size as keyof Theme['borderRadius']];
  }
  return theme.borderRadius.md;
}

/**
 * Gets typography value from theme
 */
function getTypographyValue(
  property: keyof Theme['typography'],
  size: string,
  theme: Theme
): any {
  const typographyScale = theme.typography[property];
  return (typographyScale as any)[size];
}

/**
 * Gets shadow style for React Native
 */
function getShadowStyle(size: string, theme: Theme): RNStyle {
  // React Native shadow properties
  const shadowMap: Record<string, RNStyle> = {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 6
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.1,
      shadowRadius: 25,
      elevation: 10
    }
  };
  
  return shadowMap[size] || shadowMap.md;
}