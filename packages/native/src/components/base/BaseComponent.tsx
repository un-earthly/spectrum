import React, { forwardRef } from 'react';
import { View, type ViewProps, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, createVariants, type VariantConfig } from '@spectrum/core';
import { useCn, mergeStyles } from '../../utils/cn';

export interface BaseComponentProps extends Omit<ViewProps, 'style'> {
  className?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  testID?: string;
}

/**
 * Creates a React Native component with variant support and theme integration
 */
export function createNativeComponent<
  T extends React.ComponentType<any>,
  V extends VariantConfig
>(
  Component: T,
  variantConfig: V,
  displayName?: string
) {
  const variantResolver = createVariants(variantConfig);
  
  const WrappedComponent = forwardRef<
    React.ElementRef<T>,
    React.ComponentPropsWithoutRef<T> & BaseComponentProps & {
      [K in keyof V['variants']]?: keyof V['variants'][K];
    }
  >((props, ref) => {
    const { className, style, children, testID, ...rest } = props;
    const theme = useTheme();
    const cn = useCn();
    
    // Extract variant props
    const variantProps: Record<string, any> = {};
    const componentProps: Record<string, any> = {};
    
    Object.entries(rest).forEach(([key, value]) => {
      if (variantConfig.variants && key in variantConfig.variants) {
        variantProps[key] = value;
      } else {
        componentProps[key] = value;
      }
    });
    
    // Apply default variants
    if (variantConfig.defaultVariants) {
      Object.entries(variantConfig.defaultVariants).forEach(([key, value]) => {
        if (variantProps[key] === undefined) {
          variantProps[key] = value;
        }
      });
    }
    
    // Resolve variant styles (for native, this returns StyleSheet objects)
    const variantStyles = variantResolver(variantProps);
    
    // Convert className to styles and merge with variant styles
    const classStyles = className ? cn(className) : {};
    const finalStyles = mergeStyles(variantStyles, classStyles, style);
    
    return React.createElement(
      Component,
      {
        ref,
        style: finalStyles,
        testID,
        ...componentProps
      },
      children
    );
  });
  
  if (displayName) {
    WrappedComponent.displayName = displayName;
  }
  
  return WrappedComponent;
}

/**
 * Base component wrapper for consistent styling
 */
export const BaseComponent = forwardRef<View, BaseComponentProps>(
  ({ className, children, testID, style, ...props }, ref) => {
    const cn = useCn();
    const classStyles = className ? cn(className) : {};
    const finalStyles = mergeStyles(classStyles, style);
    
    return (
      <View
        ref={ref}
        style={finalStyles}
        testID={testID}
        {...props}
      >
        {children}
      </View>
    );
  }
);

BaseComponent.displayName = 'BaseComponent';