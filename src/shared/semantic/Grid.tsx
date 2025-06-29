import React from 'react';

// =================================================================================================
// Grid Component
// A component for creating CSS grid layouts.
// =================================================================================================

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content of the grid container. */
  children: React.ReactNode;
  /** The number of columns in the grid. For responsiveness, use className. */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** The number of rows in the grid. */
  rows?: number;
  /** The gap between grid items, corresponds to Tailwind's gap scale. */
  gap?: number;
}

/**
 * Grid provides a simple way to create grid layouts.
 * IMPORTANT: Tailwind's JIT compiler needs to see full class names to generate CSS.
 * For responsive columns (e.g., 1 on mobile, 3 on desktop), use the className prop.
 *
 * @example
 * <Grid gap={4} className="grid-cols-1 md:grid-cols-3">
 * <div>Item 1</div>
 * <div>Item 2</div>
 * <div>Item 3</div>
 * </Grid>
 */
export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols,
  rows,
  gap = 0,
  ...props
}) => {
  const classes = [
    'grid',
    cols ? `grid-cols-${cols}` : '',
    rows ? `grid-rows-${rows}` : '',
    gap > 0 ? `gap-${gap}` : '',
    'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Grid;
