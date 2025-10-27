import React, { forwardRef } from 'react';
import {
  View,
  TouchableOpacity,
  type ViewStyle,
  type GestureResponderEvent,
  type TouchableOpacityProps
} from 'react-native';
import { defineVariants, useTheme } from '@spectrum/core';
import { useCn, mergeStyles } from '../utils/cn';

const cardVariants = defineVariants<ViewStyle>({
  base: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF'
  },
  variants: {
    variant: {
      elevated: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E5E5E5'
      },
      outlined: {
        borderWidth: 1,
        borderColor: '#D4D4D4'
      },
      filled: {
        backgroundColor: '#F5F5F5',
        borderWidth: 0
      },
      gradient: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 4
      }
    },
    size: {
      sm: { padding: 16 },
      md: { padding: 24 },
      lg: { padding: 32 }
    },
    padding: {
      none: { padding: 0 },
      sm: { padding: 16 },
      md: { padding: 24 },
      lg: { padding: 32 }
    }
  },
  defaultVariants: {
    variant: 'elevated',
    size: 'md'
  }
});

export interface CardProps extends Omit<TouchableOpacityProps, 'style'> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  pressable?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  className?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
  variant?: keyof typeof cardVariants.variants.variant;
  size?: keyof typeof cardVariants.variants.size;
  padding?: keyof typeof cardVariants.variants.padding;
} export const Card = forwardRef<React.ElementRef<typeof View> | React.ElementRef<typeof TouchableOpacity>, CardProps>(
  ({
    className,
    style,
    variant,
    size,
    padding,
    header,
    footer,
    pressable,
    onPress,
    children,
    ...props
  }, ref) => {
    const theme = useTheme();
    const cn = useCn();

    // Build base styles
    const containerStyles = {
      ...cardVariants.base,
      ...(variant && cardVariants.variants?.variant?.[variant]),
      ...(size && cardVariants.variants?.size?.[size]),
      ...(padding && cardVariants.variants?.padding?.[padding])
    };      // Apply gradient background for gradient variant
    let gradientStyles: ViewStyle = {};
    if (variant === 'gradient') {
      gradientStyles = {
        backgroundColor: theme.colors.primary[50] // Fallback for gradient
      };
    }

    const classStyles = className ? cn(className) : {};
    const finalStyles = mergeStyles(containerStyles, gradientStyles, classStyles, style);

    const content = (
      <>
        {header && (
          <View style={{
            marginBottom: 16,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.neutral[200]
          }}>
            {header}
          </View>
        )}
        <View style={padding === 'none' && size ? { padding: 24 } : undefined}>
          {children}
        </View>
        {footer && (
          <View style={{
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.neutral[200]
          }}>
            {footer}
          </View>
        )}
      </>
    );

    if (pressable || onPress) {
      return (
        <TouchableOpacity
          ref={ref}
          style={finalStyles}
          onPress={onPress}
          activeOpacity={0.95}
          {...props}
        >
          {content}
        </TouchableOpacity>
      );
    }

    return (
      <View
        ref={ref}
        style={finalStyles}
        {...props}
      >
        {content}
      </View>
    );
  }
);

Card.displayName = 'Card';