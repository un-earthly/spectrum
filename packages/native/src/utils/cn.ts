import { createPlatformCn, type StyleProp } from '@spectrum/core';
import { useTheme } from '@spectrum/core';
import { StyleSheet } from 'react-native';

/**
 * React Native specific cn utility that converts classes to StyleSheet objects
 */
export function useCn() {
  const theme = useTheme();
  return createPlatformCn(theme, 'native');
}

/**
 * Utility for merging React Native styles
 */
export function mergeStyles(...styles: (StyleProp<any> | undefined | null | false)[]): StyleProp<any> {
  const validStyles = styles.filter(Boolean);
  
  if (validStyles.length === 0) return undefined;
  if (validStyles.length === 1) return validStyles[0];
  
  return StyleSheet.flatten(validStyles);
}