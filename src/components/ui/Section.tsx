import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

export const Section = ({ spacing = 'lg', className, children, ...props }: SectionProps) => {
  const spacings = {
    none: 'py-0',
    sm: 'py-12',
    md: 'py-20',
    lg: 'py-32',
    xl: 'py-48',
  };

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        spacings[spacing],
        className
      )}
      {...props}
    />
  );
};
