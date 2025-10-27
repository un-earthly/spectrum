import React, { forwardRef } from 'react';
import { 
  View, 
  TouchableOpacity,
  type ViewProps,
  type ViewStyle 
} from 'react-native';
import { defineVariants, useTheme, type VariantProps } from '@spectrum/core';
import { useCn, mergeStyles } from '../utils/cn';

const cardVariants = defineVariants<ViewStyle>({
  base: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF'
  },
  variants: {
    variant: {
      elevated: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E5E5E5'
      },
      outlined: {
        borderWidth: 1,
        borderColor: '#D4D4D4'
      },
      filled: {
        backgroundColor: '#FAFAFA',
        borderWidth: 0
      },
      gradient: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6
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

export interface CardProps
  extends Omit<ViewProps, 'style'>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  pressable?: boolean;
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Card = forwardRef<View, CardProps>(
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
    
    const containerStyles = cardVariants({ variant, size, padding });
    
    // Apply gradient background for gradient variant
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
          ref={ref as any}
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