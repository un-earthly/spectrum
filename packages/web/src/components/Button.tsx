import React, { forwardRef } from 'react';
import { defineVariants, type VariantProps } from '@spectrum/core';
import { cn } from '../utils/cn';

const buttonVariants = defineVariants({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      solid: 'text-white shadow hover:opacity-90',
      outline: 'border-2 bg-transparent hover:bg-opacity-10',
      ghost: 'hover:bg-opacity-10',
      link: 'underline-offset-4 hover:underline',
      gradient: 'text-white shadow-lg hover:shadow-xl'
    },
    size: {
      xs: 'h-7 px-2 text-xs',
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
      xl: 'h-12 px-10 text-lg'
    },
    color: {
      primary: '',
      secondary: '',
      success: '',
      error: '',
      warning: '',
      neutral: ''
    },
    fullWidth: {
      true: 'w-full'
    }
  },
  compoundVariants: [
    // Solid variants
    {
      conditions: { variant: 'solid', color: 'primary' },
      styles: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      conditions: { variant: 'solid', color: 'secondary' },
      styles: 'bg-secondary-500 hover:bg-secondary-600'
    },
    {
      conditions: { variant: 'solid', color: 'success' },
      styles: 'bg-success-500 hover:bg-success-600'
    },
    {
      conditions: { variant: 'solid', color: 'error' },
      styles: 'bg-error-500 hover:bg-error-600'
    },
    {
      conditions: { variant: 'solid', color: 'warning' },
      styles: 'bg-warning-500 hover:bg-warning-600'
    },
    {
      conditions: { variant: 'solid', color: 'neutral' },
      styles: 'bg-neutral-500 hover:bg-neutral-600'
    },
    // Outline variants
    {
      conditions: { variant: 'outline', color: 'primary' },
      styles: 'border-primary-500 text-primary-500 hover:bg-primary-500'
    },
    {
      conditions: { variant: 'outline', color: 'secondary' },
      styles: 'border-secondary-500 text-secondary-500 hover:bg-secondary-500'
    },
    {
      conditions: { variant: 'outline', color: 'success' },
      styles: 'border-success-500 text-success-500 hover:bg-success-500'
    },
    {
      conditions: { variant: 'outline', color: 'error' },
      styles: 'border-error-500 text-error-500 hover:bg-error-500'
    },
    {
      conditions: { variant: 'outline', color: 'warning' },
      styles: 'border-warning-500 text-warning-500 hover:bg-warning-500'
    },
    {
      conditions: { variant: 'outline', color: 'neutral' },
      styles: 'border-neutral-500 text-neutral-500 hover:bg-neutral-500'
    },
    // Ghost variants
    {
      conditions: { variant: 'ghost', color: 'primary' },
      styles: 'text-primary-500 hover:bg-primary-500'
    },
    {
      conditions: { variant: 'ghost', color: 'secondary' },
      styles: 'text-secondary-500 hover:bg-secondary-500'
    },
    {
      conditions: { variant: 'ghost', color: 'success' },
      styles: 'text-success-500 hover:bg-success-500'
    },
    {
      conditions: { variant: 'ghost', color: 'error' },
      styles: 'text-error-500 hover:bg-error-500'
    },
    {
      conditions: { variant: 'ghost', color: 'warning' },
      styles: 'text-warning-500 hover:bg-warning-500'
    },
    {
      conditions: { variant: 'ghost', color: 'neutral' },
      styles: 'text-neutral-500 hover:bg-neutral-500'
    },
    // Link variants
    {
      conditions: { variant: 'link', color: 'primary' },
      styles: 'text-primary-500'
    },
    {
      conditions: { variant: 'link', color: 'secondary' },
      styles: 'text-secondary-500'
    },
    {
      conditions: { variant: 'link', color: 'success' },
      styles: 'text-success-500'
    },
    {
      conditions: { variant: 'link', color: 'error' },
      styles: 'text-error-500'
    },
    {
      conditions: { variant: 'link', color: 'warning' },
      styles: 'text-warning-500'
    },
    {
      conditions: { variant: 'link', color: 'neutral' },
      styles: 'text-neutral-500'
    },
    // Gradient variants
    {
      conditions: { variant: 'gradient', color: 'primary' },
      styles: 'bg-gradient-to-r from-primary-500 to-primary-600'
    },
    {
      conditions: { variant: 'gradient', color: 'secondary' },
      styles: 'bg-gradient-to-r from-secondary-500 to-secondary-600'
    },
    {
      conditions: { variant: 'gradient', color: 'success' },
      styles: 'bg-gradient-to-r from-success-500 to-success-600'
    },
    {
      conditions: { variant: 'gradient', color: 'error' },
      styles: 'bg-gradient-to-r from-error-500 to-error-600'
    },
    {
      conditions: { variant: 'gradient', color: 'warning' },
      styles: 'bg-gradient-to-r from-warning-500 to-warning-600'
    },
    {
      conditions: { variant: 'gradient', color: 'neutral' },
      styles: 'bg-gradient-to-r from-neutral-500 to-neutral-600'
    }
  ],
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary'
  }
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
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
    const isDisabled = disabled || loading;
    
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, color, fullWidth }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';