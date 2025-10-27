import React, { forwardRef } from 'react';
import { 
  View, 
  Text,
  type ViewProps,
  type ViewStyle,
  type TextStyle 
} from 'react-native';
import { defineVariants, useTheme, type VariantProps } from '@spectrum/core';
import { useCn, mergeStyles } from '../utils/cn';

const badgeVariants = defineVariants<ViewStyle>({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  variants: {
    variant: {
      solid: {},
      outline: {
        borderWidth: 2,
        backgroundColor: 'transparent'
      },
      subtle: {},
      gradient: {}
    },
    size: {
      sm: { paddingHorizontal: 8, paddingVertical: 2, minHeight: 20 },
      md: { paddingHorizontal: 10, paddingVertical: 4, minHeight: 24 },
      lg: { paddingHorizontal: 12, paddingVertical: 6, minHeight: 32 }
    },
    shape: {
      rounded: { borderRadius: 6 },
      pill: { borderRadius: 999 },
      square: { borderRadius: 0 }
    }
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    shape: 'rounded'
  }
});

export interface BadgeProps
  extends Omit<ViewProps, 'style'>,
    VariantProps<typeof badgeVariants> {
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'neutral';
  className?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Badge = forwardRef<View, BadgeProps>(
  ({ 
    className,
    style,
    variant = 'solid', 
    size = 'md', 
    shape = 'rounded',
    color = 'primary',
    children,
    ...props 
  }, ref) => {
    const theme = useTheme();
    const cn = useCn();
    
    const containerStyles = badgeVariants({ variant, size, shape });
    
    // Apply color-specific styles
    let colorStyles: ViewStyle = {};
    let textColorStyles: TextStyle = {};
    
    const colorValue = theme.colors[color];
    
    switch (variant) {
      case 'solid':
        colorStyles.backgroundColor = colorValue[500];
        textColorStyles.color = '#FFFFFF';
        break;
      case 'outline':
        colorStyles.borderColor = colorValue[500];
        textColorStyles.color = colorValue[500];
        break;
      case 'subtle':
        colorStyles.backgroundColor = colorValue[100];
        textColorStyles.color = colorValue[700];
        break;
      case 'gradient':
        // Fallback to solid for React Native
        colorStyles.backgroundColor = colorValue[500];
        textColorStyles.color = '#FFFFFF';
        break;
    }
    
    const textStyle: TextStyle = {
      fontSize: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
      fontWeight: '500',
      ...textColorStyles
    };
    
    const classStyles = className ? cn(className) : {};
    const finalStyles = mergeStyles(containerStyles, colorStyles, classStyles, style);
    
    return (
      <View
        ref={ref}
        style={finalStyles}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

Badge.displayName = 'Badge';