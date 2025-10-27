import React, { forwardRef, useState } from 'react';
import { 
  View, 
  TextInput, 
  Text,
  type TextInputProps,
  type ViewStyle,
  type TextStyle 
} from 'react-native';
import { defineVariants, useTheme, type VariantProps } from '@spectrum/core';
import { useCn, mergeStyles } from '../utils/cn';

const inputVariants = defineVariants<ViewStyle>({
  base: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  variants: {
    variant: {
      outlined: {
        borderWidth: 1,
        borderColor: '#D4D4D4'
      },
      filled: {
        backgroundColor: '#F5F5F5',
        borderWidth: 0
      },
      underlined: {
        borderRadius: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: '#D4D4D4'
      }
    },
    size: {
      sm: { paddingHorizontal: 8, paddingVertical: 6, minHeight: 32 },
      md: { paddingHorizontal: 12, paddingVertical: 8, minHeight: 40 },
      lg: { paddingHorizontal: 16, paddingVertical: 12, minHeight: 48 }
    }
  },
  defaultVariants: {
    variant: 'outlined',
    size: 'md'
  }
});

export interface InputProps
  extends Omit<TextInputProps, 'style'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  state?: 'default' | 'error' | 'success';
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ 
    className,
    style,
    variant, 
    size, 
    state = 'default',
    label, 
    helperText, 
    errorText, 
    leftIcon, 
    rightIcon,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const theme = useTheme();
    const cn = useCn();
    const [isFocused, setIsFocused] = useState(false);
    
    const hasError = state === 'error' || errorText;
    const finalState = hasError ? 'error' : state;
    
    const containerStyles = inputVariants({ variant, size });
    
    // Apply state-specific styles
    let stateStyles: ViewStyle = {};
    if (isFocused) {
      switch (variant) {
        case 'outlined':
          stateStyles.borderColor = finalState === 'error' 
            ? theme.colors.error[500] 
            : theme.colors.primary[500];
          break;
        case 'underlined':
          stateStyles.borderBottomColor = finalState === 'error' 
            ? theme.colors.error[500] 
            : theme.colors.primary[500];
          break;
      }
    } else if (finalState === 'error') {
      if (variant === 'outlined') {
        stateStyles.borderColor = theme.colors.error[500];
      } else if (variant === 'underlined') {
        stateStyles.borderBottomColor = theme.colors.error[500];
      }
    }
    
    const classStyles = className ? cn(className) : {};
    const finalContainerStyles = mergeStyles(containerStyles, stateStyles, classStyles, style);
    
    const textStyle: TextStyle = {
      flex: 1,
      fontSize: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
      color: theme.colors.neutral[900]
    };
    
    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };
    
    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };
    
    return (
      <View style={{ width: '100%' }}>
        {label && (
          <Text style={{
            marginBottom: 8,
            fontSize: 14,
            fontWeight: '500',
            color: theme.colors.neutral[700]
          }}>
            {label}
          </Text>
        )}
        <View style={finalContainerStyles}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {leftIcon && (
              <View style={{ marginRight: 8 }}>
                {leftIcon}
              </View>
            )}
            <TextInput
              ref={ref}
              style={textStyle}
              placeholderTextColor={theme.colors.neutral[500]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
            {rightIcon && (
              <View style={{ marginLeft: 8 }}>
                {rightIcon}
              </View>
            )}
          </View>
        </View>
        {(helperText || errorText) && (
          <Text style={{
            marginTop: 4,
            fontSize: 12,
            color: errorText ? theme.colors.error[500] : theme.colors.neutral[600]
          }}>
            {errorText || helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';