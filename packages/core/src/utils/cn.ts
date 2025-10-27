import type { Theme, StyleProp } from '../types';
import { parseClassName, type ClassMappingConfig, type RNStyle } from './class-mapping';
import { compact } from './index';

/**
 * Class name utility for merging classes and converting to styles
 */
export function createCn(config: ClassMappingConfig) {
  return function cn(...classes: (string | undefined | null | false)[]): StyleProp<RNStyle> {
    // Filter out falsy values and join classes
    const classString = compact(classes).join(' ');
    
    if (config.platform === 'web') {
      // For web, return the class string as-is (to be used with Tailwind)
      return classString as any;
    }
    
    // For React Native, convert to StyleSheet object
    return parseClassName(classString, config);
  };
}

/**
 * Merges multiple style objects, with later styles overriding earlier ones
 */
export function mergeStyles(...styles: (StyleProp<RNStyle> | undefined | null | false)[]): RNStyle {
  const validStyles = compact(styles);
  
  return validStyles.reduce((merged, style) => {
    if (Array.isArray(style)) {
      // Handle array of styles
      return { ...merged, ...mergeStyles(...style) };
    }
    return { ...merged, ...style };
  }, {} as RNStyle);
}

/**
 * Resolves class conflicts by giving precedence to later classes
 */
export function resolveClassConflicts(classes: string[]): string[] {
  const conflictGroups: Record<string, string[]> = {
    // Padding conflicts - more specific wins
    paddingAll: ['p-'],
    paddingX: ['px-'],
    paddingY: ['py-'],
    paddingTop: ['pt-'],
    paddingBottom: ['pb-'],
    paddingLeft: ['pl-'],
    paddingRight: ['pr-'],
    // Margin conflicts - more specific wins
    marginAll: ['m-'],
    marginX: ['mx-'],
    marginY: ['my-'],
    marginTop: ['mt-'],
    marginBottom: ['mb-'],
    marginLeft: ['ml-'],
    marginRight: ['mr-'],
    // Background color conflicts
    background: ['bg-'],
    // Text color conflicts
    textColor: ['text-'],
    // Width conflicts
    width: ['w-'],
    // Height conflicts
    height: ['h-'],
    // Border radius conflicts
    borderRadius: ['rounded'],
    // Flex direction conflicts
    flexDirection: ['flex-row', 'flex-col'],
    // Align items conflicts
    alignItems: ['items-start', 'items-center', 'items-end', 'items-stretch'],
    // Justify content conflicts
    justifyContent: [
      'justify-start',
      'justify-center', 
      'justify-end',
      'justify-between',
      'justify-around',
      'justify-evenly'
    ]
  };
  
  const resolved: string[] = [];
  const conflicts: Record<string, string> = {};
  
  // Process classes to find conflicts
  classes.forEach(cls => {
    let foundConflict = false;
    
    Object.entries(conflictGroups).forEach(([group, prefixes]) => {
      const matches = prefixes.some(prefix => {
        if (Array.isArray(prefix)) {
          return prefix.includes(cls);
        }
        return cls.startsWith(prefix);
      });
      
      if (matches) {
        conflicts[group] = cls; // Later classes override earlier ones
        foundConflict = true;
      }
    });
    
    if (!foundConflict) {
      resolved.push(cls);
    }
  });
  
  // Add resolved conflict classes
  Object.values(conflicts).forEach(cls => {
    resolved.push(cls);
  });
  
  return resolved;
}

/**
 * Creates a platform-aware cn function with theme integration
 */
export function createPlatformCn(theme: Theme, platform: 'web' | 'native') {
  const config: ClassMappingConfig = { theme, platform };
  const cnFunction = createCn(config);
  
  return function platformCn(
    ...inputs: (string | undefined | null | false | StyleProp<RNStyle>)[]
  ): StyleProp<RNStyle> {
    const classes: string[] = [];
    const styles: StyleProp<RNStyle>[] = [];
    
    // Separate classes from style objects
    inputs.forEach(input => {
      if (typeof input === 'string') {
        classes.push(input);
      } else if (input && typeof input === 'object') {
        styles.push(input);
      }
    });
    
    // Resolve class conflicts
    const resolvedClasses = resolveClassConflicts(classes);
    
    // Convert classes to styles
    const classStyles = cnFunction(resolvedClasses.join(' '));
    
    // Merge all styles
    if (platform === 'web') {
      // For web, return class string and merge with style objects
      return [resolvedClasses.join(' '), ...styles] as any;
    }
    
    // For React Native, merge all styles
    return mergeStyles(classStyles, ...styles);
  };
}

// Export utility types
export type CnFunction = ReturnType<typeof createCn>;
export type PlatformCnFunction = ReturnType<typeof createPlatformCn>;