import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '../../lib/utils';

interface IconProps extends LucideIcons.LucideProps {
  name: keyof typeof LucideIcons;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = LucideIcons[name] as React.ElementType;

  if (!LucideIcon) {
    return null;
  }

  return (
    <LucideIcon
      className={cn(
        'w-6 h-6',
        className
      )}
      {...props}
    />
  );
};
