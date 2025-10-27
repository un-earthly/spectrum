import React, { forwardRef } from 'react';
import { defineVariants, type VariantProps } from '@spectrum/core';
import { cn } from '../utils/cn';

const cardVariants = defineVariants({
  base: 'rounded-lg border bg-white text-neutral-900 transition-all',
  variants: {
    variant: {
      elevated: 'border-neutral-200 shadow-md hover:shadow-lg',
      outlined: 'border-neutral-300',
      filled: 'border-transparent bg-neutral-50',
      gradient: 'border-transparent shadow-lg'
    },
    size: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }
  },
  compoundVariants: [
    {
      conditions: { variant: 'gradient' },
      styles: 'bg-gradient-to-br from-primary-50 to-secondary-50'
    }
  ],
  defaultVariants: {
    variant: 'elevated',
    size: 'md'
  }
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  pressable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    padding, 
    header, 
    footer, 
    pressable, 
    children, 
    onClick,
    ...props 
  }, ref) => {
    const Component = pressable ? 'button' : 'div';
    const isInteractive = pressable || onClick;
    
    return (
      <Component
        className={cn(
          cardVariants({ variant, size, padding }),
          isInteractive && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
          className
        )}
        ref={ref as any}
        onClick={onClick}
        {...props}
      >
        {header && (
          <div className="mb-4 border-b border-neutral-200 pb-4">
            {header}
          </div>
        )}
        <div className={cn(padding === 'none' && size && 'p-6')}>
          {children}
        </div>
        {footer && (
          <div className="mt-4 border-t border-neutral-200 pt-4">
            {footer}
          </div>
        )}
      </Component>
    );
  }
);

Card.displayName = 'Card';