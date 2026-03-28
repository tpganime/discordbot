import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
}

export const Container = ({ size = 'lg', className, children, ...props }: ContainerProps) => {
  const sizes = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  };

  return (
    <div
      className={cn(
        'mx-auto px-6 w-full',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
