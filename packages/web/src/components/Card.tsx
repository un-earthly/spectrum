import React, { forwardRef } from 'react';
import { createVariants } from '@spectrum/core';
import { cn } from '../utils/cn';

const cardVariants = createVariants({
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
  extends React.HTMLAttributes<HTMLDivElement> {
  // Variant props
  variant?: 'elevated' | 'outlined' | 'filled' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  
  // Custom props
  header?: React.ReactNode;
  footer?: React.ReactNode;
  pressable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
 
    header, 
    footer, 
    pressable, 
    children, 
    onClick,
    ...props 
  }, ref) => {
    const isInteractive = pressable || onClick;
    
    if (pressable) {
      return (
        <button
          className={cn(
            cardVariants({ variant, size }),
            isInteractive && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
            className
          )}
          onClick={onClick}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {header && (
            <div className="mb-4 border-b border-neutral-200 pb-4">
              {header}
            </div>
          )}
          <div>
            {children}
          </div>
          {footer && (
            <div className="mt-4 border-t border-neutral-200 pt-4">
              {footer}
            </div>
          )}
        </button>
      );
    }
    
    return (
      <div
        className={cn(
          cardVariants({ variant, size }),
          isInteractive && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
          className
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {header && (
          <div className="mb-4 border-b border-neutral-200 pb-4">
            {header}
          </div>
        )}
        <div>
          {children}
        </div>
        {footer && (
          <div className="mt-4 border-t border-neutral-200 pt-4">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';