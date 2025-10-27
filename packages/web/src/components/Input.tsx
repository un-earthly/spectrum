import React, { forwardRef } from 'react';
import { defineVariants, type VariantProps } from '@spectrum/core';
import { cn } from '../utils/cn';

const inputVariants = defineVariants({
  base: 'flex w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      outlined: 'border-neutral-300 focus-visible:ring-primary-500',
      filled: 'border-transparent bg-neutral-100 focus-visible:ring-primary-500',
      underlined: 'border-0 border-b-2 border-neutral-300 rounded-none bg-transparent focus-visible:border-primary-500 focus-visible:ring-0'
    },
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base'
    },
    state: {
      default: '',
      error: 'border-error-500 focus-visible:ring-error-500',
      success: 'border-success-500 focus-visible:ring-success-500'
    }
  },
  defaultVariants: {
    variant: 'outlined',
    size: 'md',
    state: 'default'
  }
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    state, 
    label, 
    helperText, 
    errorText, 
    leftIcon, 
    rightIcon,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = state === 'error' || errorText;
    const finalState = hasError ? 'error' : state;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            className={cn(
              inputVariants({ variant, size, state: finalState }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <p className={cn(
            'mt-1 text-xs',
            errorText ? 'text-error-500' : 'text-neutral-600'
          )}>
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';