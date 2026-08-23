import React from 'react';
import { cn } from '../../lib/utils';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 2 | 4 | 6 | 8 | 10 | 12;
  children?: React.ReactNode;
}

export const Flex = ({ direction = 'row', align = 'center', justify = 'start', gap = 4, className, children, ...props }: FlexProps) => {
  const directions = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const alignments = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifications = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const gaps = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
  };

  return (
    <div
      className={cn(
        'flex w-full',
        directions[direction],
        alignments[align],
        justifications[justify],
        gaps[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
