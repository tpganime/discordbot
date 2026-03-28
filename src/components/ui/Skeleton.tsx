import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Skeleton = ({ className, children, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-white/[0.03] rounded-2xl',
        className
      )}
      {...props}
    />
  );
};
