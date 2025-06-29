import React from 'react';

// =================================================================================================
// Flex Component
// A flexible, reusable component for creating flexbox layouts.
// =================================================================================================

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content of the flex container. */
  children: React.ReactNode;
  /** The direction of the flex items. */
  direction?: 'row' | 'col';
  /** How to align items along the main axis. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** How to align items along the cross axis. */
  items?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** How to wrap flex items. */
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /** The gap between flex items, corresponds to Tailwind's gap scale (e.g., 2, 4, 8). */
  gap?: number;
}

/**
 * Flex provides a powerful and semantic way to build flexbox layouts.
 * It abstracts away Tailwind classes into readable props.
 * Note: Does not include `w-full` by default to remain a pure layout primitive.
 * Add `className="w-full"` when you need it to occupy full width.
 *
 * @example
 * <Flex justify="between" items="center" gap={4} className="w-full">
 * <div>Left</div>
 * <div>Right</div>
 * </Flex>
 */
export const Flex: React.FC<FlexProps> = ({
  children,
  className,
  direction = 'row',
  justify = 'start',
  items = 'stretch', // Changed default to stretch to better match browser default
  wrap = 'nowrap',
  gap = 0,
  ...props
}) => {
  // Using a simple array and join for performance and to avoid a new dependency.
  const classes = [
    'flex',
    `flex-${direction}`,
    `justify-${justify}`,
    `items-${items}`,
    `flex-${wrap}`,
    'w-full',
    gap ? `gap-${gap}` : ``,
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

export default Flex;
