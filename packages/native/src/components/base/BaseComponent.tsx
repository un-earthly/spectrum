import React, { forwardRef } from 'react';
import { View, type ViewProps, type StyleProp, type ViewStyle } from 'react-native';
import { createVariants, type VariantConfig } from '@spectrum/core';
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
type RefType<T> = T extends React.ForwardRefExoticComponent<unknown>
  ? React.ElementRef<T>
  : T extends React.ComponentClass
  ? InstanceType<T>
  : T extends typeof View
  ? View
  : undefined;

export function createNativeComponent<
  T extends React.ElementType,
  V extends VariantConfig
>(
  Component: T,
  variantConfig: V,
  displayName?: string
) {
  const variantResolver = createVariants(variantConfig);

  const WrappedComponent = forwardRef<
    RefType<T>,
    React.ComponentPropsWithoutRef<T> & BaseComponentProps & {
      [K in keyof V['variants']]?: keyof V['variants'][K];
    }
  >((props, ref) => {
    const { className, style, children, testID, ...rest } = props;
    const cn = useCn();

    // Extract variant props
    let variantProps: {
      [K in keyof V['variants']]?: keyof V['variants'][K];
    } & {
      [K in keyof V['defaultVariants']]?: string;
    } = {};
    const componentProps: Record<string, unknown> = {}; Object.entries(rest).forEach(([key, value]) => {
      if (variantConfig.variants && key in variantConfig.variants) {
        variantProps = { ...variantProps, [key]: value };
      } else {
        componentProps[key] = value;
      }
    });

    // Apply default variants
    if (variantConfig.defaultVariants) {
      Object.entries(variantConfig.defaultVariants).forEach(([key, value]) => {
        if (variantProps[key as keyof typeof variantProps] === undefined) {
          variantProps = { ...variantProps, [key]: value };
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