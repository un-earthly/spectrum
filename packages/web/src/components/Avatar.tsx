import React, { forwardRef, useState } from 'react';
import { defineVariants, type VariantProps } from '@spectrum/core';
import { cn } from '../utils/cn';

const avatarVariants = defineVariants({
  base: 'relative inline-flex items-center justify-center overflow-hidden bg-neutral-100 font-medium text-neutral-600',
  variants: {
    variant: {
      circular: 'rounded-full',
      rounded: 'rounded-lg',
      square: 'rounded-none'
    },
    size: {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl'
    },
    gradientBorder: {
      true: 'p-0.5 bg-gradient-to-r from-primary-500 to-secondary-500'
    }
  },
  defaultVariants: {
    variant: 'circular',
    size: 'md'
  }
});

const statusVariants = defineVariants({
  base: 'absolute border-2 border-white rounded-full',
  variants: {
    status: {
      online: 'bg-success-500',
      offline: 'bg-neutral-400',
      away: 'bg-warning-500',
      busy: 'bg-error-500'
    },
    size: {
      xs: 'h-2 w-2 bottom-0 right-0',
      sm: 'h-2.5 w-2.5 bottom-0 right-0',
      md: 'h-3 w-3 bottom-0 right-0',
      lg: 'h-3.5 w-3.5 bottom-0.5 right-0.5',
      xl: 'h-4 w-4 bottom-1 right-1'
    }
  }
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    variant, 
    size, 
    gradientBorder,
    src, 
    alt, 
    fallback, 
    status,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = useState(false);
    
    const showImage = src && !imageError;
    const showFallback = !showImage && fallback;
    
    const content = (
      <div className={cn(
        avatarVariants({ variant, size }),
        gradientBorder && 'bg-neutral-100',
        className
      )}>
        {showImage && (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {showFallback && (
          <span className="select-none">
            {fallback.slice(0, 2).toUpperCase()}
          </span>
        )}
        {status && (
          <div className={cn(statusVariants({ status, size }))} />
        )}
      </div>
    );
    
    if (gradientBorder) {
      return (
        <div
          ref={ref}
          className={cn(avatarVariants({ variant, size, gradientBorder }))}
          {...props}
        >
          {content}
        </div>
      );
    }
    
    return (
      <div ref={ref} {...props}>
        {content}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';