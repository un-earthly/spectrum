export interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ColorPalette {
  primary: ColorShades;
  secondary: ColorShades;
  success: ColorShades;
  error: ColorShades;
  warning: ColorShades;
  neutral: ColorShades;
}

export interface GradientPalette {
  primary: [string, string];
  sunset: [string, string];
  ocean: [string, string];
  forest: [string, string];
  purple: [string, string];
}

export interface SpacingScale {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface TypographyScale {
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  fontFamily: {
    sans: string[];
    mono: string[];
  };
}

export interface BorderRadiusScale {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ShadowScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Theme {
  colors: ColorPalette;
  gradients: GradientPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  borderRadius: BorderRadiusScale;
  shadows: ShadowScale;
}

export interface ThemeConfig {
  name: string;
  mode: 'light' | 'dark';
  theme: Theme;
}

// Component variant types
export interface VariantConfig<T = any> {
  base: T;
  variants: Record<string, Record<string, T>>;
  compoundVariants?: Array<{
    conditions: Record<string, any>;
    styles: T;
  }>;
  defaultVariants?: Record<string, string>;
}

export type VariantProps<T extends VariantConfig> = {
  [K in keyof T['variants']]?: keyof T['variants'][K];
} & {
  [K in keyof T['defaultVariants']]?: string;
};

// Platform types
export type Platform = 'web' | 'native';

// Style types
export type StyleProp<T> = T | T[] | undefined | null | false;