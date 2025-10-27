import React, { forwardRef } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ActivityIndicator,
  type TouchableOpacityProps,
  type ViewStyle,
  type TextStyle
} from 'react-native';
import { defineVariants, useTheme, type VariantProps } from '@spectrum/core';
import { useCn, mergeStyles } from '../utils/cn';

const buttonVariants = defineVariants<ViewStyle>({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  variants: {
    variant: {
      solid: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
      },
      outline: {
        borderWidth: 2,
        backgroundColor: 'transparent'
      },
      ghost: {
        backgroundColor: 'transparent'
      },
      link: {
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        paddingVertical: 0
      },
      gradient: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
      }
    },
    size: {
      xs: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        minHeight: 28
      },
      sm: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        minHeight: 32
      },
      md: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 40
      },
      lg: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        minHeight: 44
      },
      xl: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        minHeight: 48
      }
    },
    color: {
      primary: {},
      secondary: {},
      success: {},
      error: {},
      warning: {},
      neutral: {}
    },
    fullWidth: {
      true: {
        width: '100%'
      }
    }
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary'
  }
});

const textVariants = defineVariants<TextStyle>({
  base: {
    fontWeight: '500',
    textAlign: 'center'
  },
  variants: {
    size: {
      xs: { fontSize: 12 },
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
      xl: { fontSize: 20 }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export interface ButtonProps
  extends Omit<TouchableOpacityProps, 'style'>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ 
    className,
    style,
    textStyle,
    variant, 
    size, 
    color, 
    fullWidth, 
    leftIcon, 
    rightIcon, 
    loading, 
    disabled, 
    children,
    ...props 
  }, ref) => {
    const theme = useTheme();
    const cn = useCn();
    const isDisabled = disabled || loading;
    
    // Get base styles from variants
    const containerStyles = buttonVariants({ variant, size, color, fullWidth });
    const textStyles = textVariants({ size });
    
    // Apply color-specific styles
    let colorStyles: ViewStyle = {};
    let textColorStyles: TextStyle = {};
    
    if (color && variant) {
      const colorValue = theme.colors[color as keyof typeof theme.colors];
      
      switch (variant) {
        case 'solid':
          colorStyles.backgroundColor = colorValue[500];
          textColorStyles.color = '#FFFFFF';
          break;
        case 'outline':
          colorStyles.borderColor = colorValue[500];
          textColorStyles.color = colorValue[500];
          break;
        case 'ghost':
        case 'link':
          textColorStyles.color = colorValue[500];
          break;
        case 'gradient':
          // For React Native, we'll use solid color as fallback
          colorStyles.backgroundColor = colorValue[500];
          textColorStyles.color = '#FFFFFF';
          break;
      }
    }
    
    // Apply disabled styles
    if (isDisabled) {
      colorStyles.opacity = 0.5;
    }
    
    // Convert className to styles and merge
    const classStyles = className ? cn(className) : {};
    const finalContainerStyles = mergeStyles(
      containerStyles,
      colorStyles,
      classStyles,
      style
    );
    
    const finalTextStyles = mergeStyles(textStyles, textColorStyles, textStyle);
    
    return (
      <TouchableOpacity
        ref={ref}
        style={finalContainerStyles}
        disabled={isDisabled}
        activeOpacity={0.7}
        {...props}
      >
        {loading && (
          <ActivityIndicator 
            size="small" 
            color={textColorStyles.color || theme.colors.primary[500]}
            style={{ marginRight: 8 }}
          />
        )}
        {!loading && leftIcon && (
          <View style={{ marginRight: 8 }}>{leftIcon}</View>
        )}
        {typeof children === 'string' ? (
          <Text style={finalTextStyles}>{children}</Text>
        ) : (
          children
        )}
        {!loading && rightIcon && (
          <View style={{ marginLeft: 8 }}>{rightIcon}</View>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';