import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all duration-300',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
