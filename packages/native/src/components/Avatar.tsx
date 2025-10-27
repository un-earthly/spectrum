import React, { forwardRef, useState } from 'react';
import { 
  View, 
  Image, 
  Text,
  type ViewProps,
  type ViewStyle,
  type TextStyle 
} from 'react-native';
import { defineVariants, useTheme, type VariantProps } from '@spectrum/core';
import { useCn, mergeStyles } from '../utils/cn';

const avatarVariants = defineVariants<ViewStyle>({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    overflow: 'hidden'
  },
  variants: {
    variant: {
      circular: { borderRadius: 999 },
      rounded: { borderRadius: 12 },
      square: { borderRadius: 0 }
    },
    size: {
      xs: { width: 24, height: 24 },
      sm: { width: 32, height: 32 },
      md: { width: 40, height: 40 },
      lg: { width: 48, height: 48 },
      xl: { width: 64, height: 64 }
    }
  },
  defaultVariants: {
    variant: 'circular',
    size: 'md'
  }
});

const statusVariants = defineVariants<ViewStyle>({
  base: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 999
  },
  variants: {
    size: {
      xs: { width: 8, height: 8, bottom: 0, right: 0 },
      sm: { width: 10, height: 10, bottom: 0, right: 0 },
      md: { width: 12, height: 12, bottom: 0, right: 0 },
      lg: { width: 14, height: 14, bottom: 2, right: 2 },
      xl: { width: 16, height: 16, bottom: 4, right: 4 }
    }
  }
});

export interface AvatarProps
  extends Omit<ViewProps, 'style'>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  gradientBorder?: boolean;
  className?: string;
  style?: ViewStyle;
}

export const Avatar = forwardRef<View, AvatarProps>(
  ({ 
    className,
    style,
    variant = 'circular', 
    size = 'md',
    src, 
    fallback, 
    status,
    gradientBorder,
    ...props 
  }, ref) => {
    const theme = useTheme();
    const cn = useCn();
    const [imageError, setImageError] = useState(false);
    
    const containerStyles = avatarVariants({ variant, size });
    const statusStyles = statusVariants({ size });
    
    const showImage = src && !imageError;
    const showFallback = !showImage && fallback;
    
    // Status colors
    const statusColors = {
      online: theme.colors.success[500],
      offline: theme.colors.neutral[400],
      away: theme.colors.warning[500],
      busy: theme.colors.error[500]
    };
    
    const textStyle: TextStyle = {
      fontSize: size === 'xs' ? 10 : size === 'sm' ? 12 : size === 'lg' ? 16 : size === 'xl' ? 20 : 14,
      fontWeight: '500',
      color: theme.colors.neutral[600]
    };
    
    // Gradient border styles
    let gradientStyles: ViewStyle = {};
    if (gradientBorder) {
      gradientStyles = {
        padding: 2,
        backgroundColor: theme.colors.primary[500] // Fallback for gradient
      };
    }
    
    const classStyles = className ? cn(className) : {};
    const finalStyles = mergeStyles(
      containerStyles, 
      gradientStyles, 
      classStyles, 
      style
    );
    
    const content = (
      <View style={gradientBorder ? containerStyles : undefined}>
        {showImage && (
          <Image
            source={{ uri: src }}
            style={{ width: '100%', height: '100%' }}
            onError={() => setImageError(true)}
          />
        )}
        {showFallback && (
          <Text style={textStyle}>
            {fallback.slice(0, 2).toUpperCase()}
          </Text>
        )}
        {status && (
          <View 
            style={[
              statusStyles,
              { backgroundColor: statusColors[status] }
            ]} 
          />
        )}
      </View>
    );
    
    return (
      <View
        ref={ref}
        style={finalStyles}
        {...props}
      >
        {gradientBorder ? (
          <View style={[containerStyles, { backgroundColor: '#F5F5F5' }]}>
            {content}
          </View>
        ) : (
          content
        )}
      </View>
    );
  }
);

Avatar.displayName = 'Avatar';