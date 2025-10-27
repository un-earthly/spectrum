import React, { forwardRef } from 'react';
import { createVariants } from '@spectrum/core';
import { cn } from '../utils/cn';

const badgeVariants = createVariants({
  base: 'inline-flex items-center justify-center font-medium transition-colors',
  variants: {
    variant: {
      solid: 'text-white',
      outline: 'border-2 bg-transparent',
      subtle: 'bg-opacity-10',
      gradient: 'text-white'
    },
    size: {
      sm: 'px-2 py-0.5 text-xs h-5',
      md: 'px-2.5 py-1 text-sm h-6',
      lg: 'px-3 py-1.5 text-base h-8'
    },
    shape: {
      rounded: 'rounded-md',
      pill: 'rounded-full',
      square: 'rounded-none'
    },
    color: {
      primary: '',
      secondary: '',
      success: '',
      error: '',
      warning: '',
      neutral: ''
    }
  },
  compoundVariants: [
    // Solid variants
    { conditions: { variant: 'solid', color: 'primary' }, styles: 'bg-primary-500' },
    { conditions: { variant: 'solid', color: 'secondary' }, styles: 'bg-secondary-500' },
    { conditions: { variant: 'solid', color: 'success' }, styles: 'bg-success-500' },
    { conditions: { variant: 'solid', color: 'error' }, styles: 'bg-error-500' },
    { conditions: { variant: 'solid', color: 'warning' }, styles: 'bg-warning-500' },
    { conditions: { variant: 'solid', color: 'neutral' }, styles: 'bg-neutral-500' },
    
    // Outline variants
    { conditions: { variant: 'outline', color: 'primary' }, styles: 'border-primary-500 text-primary-500' },
    { conditions: { variant: 'outline', color: 'secondary' }, styles: 'border-secondary-500 text-secondary-500' },
    { conditions: { variant: 'outline', color: 'success' }, styles: 'border-success-500 text-success-500' },
    { conditions: { variant: 'outline', color: 'error' }, styles: 'border-error-500 text-error-500' },
    { conditions: { variant: 'outline', color: 'warning' }, styles: 'border-warning-500 text-warning-500' },
    { conditions: { variant: 'outline', color: 'neutral' }, styles: 'border-neutral-500 text-neutral-500' },
    
    // Subtle variants
    { conditions: { variant: 'subtle', color: 'primary' }, styles: 'bg-primary-500 text-primary-700' },
    { conditions: { variant: 'subtle', color: 'secondary' }, styles: 'bg-secondary-500 text-secondary-700' },
    { conditions: { variant: 'subtle', color: 'success' }, styles: 'bg-success-500 text-success-700' },
    { conditions: { variant: 'subtle', color: 'error' }, styles: 'bg-error-500 text-error-700' },
    { conditions: { variant: 'subtle', color: 'warning' }, styles: 'bg-warning-500 text-warning-700' },
    { conditions: { variant: 'subtle', color: 'neutral' }, styles: 'bg-neutral-500 text-neutral-700' },
    
    // Gradient variants
    { conditions: { variant: 'gradient', color: 'primary' }, styles: 'bg-gradient-to-r from-primary-500 to-primary-600' },
    { conditions: { variant: 'gradient', color: 'secondary' }, styles: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
    { conditions: { variant: 'gradient', color: 'success' }, styles: 'bg-gradient-to-r from-success-500 to-success-600' },
    { conditions: { variant: 'gradient', color: 'error' }, styles: 'bg-gradient-to-r from-error-500 to-error-600' },
    { conditions: { variant: 'gradient', color: 'warning' }, styles: 'bg-gradient-to-r from-warning-500 to-warning-600' },
    { conditions: { variant: 'gradient', color: 'neutral' }, styles: 'bg-gradient-to-r from-neutral-500 to-neutral-600' }
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    shape: 'rounded',
    color: 'primary'
  }
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  // Variant props
  variant?: 'solid' | 'outline' | 'subtle' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'neutral';
  shape?: 'rounded' | 'pill' | 'square';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, shape, color, ...props }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant, size, shape, color }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';