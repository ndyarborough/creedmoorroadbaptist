import React from 'react';

// =================================================================================================
// Tag Component
// A small, inline component for displaying categories or labels.
// =================================================================================================

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The text content of the tag. */
  children: React.ReactNode;
}

/**
 * A flexible Tag component for displaying short pieces of information like categories.
 * Its colors are fully customizable via the `className` prop using Tailwind utilities.
 *
 * @example
 * // A yellow category tag
 * <Tag className="bg-yellow-200 text-yellow-800">
 * Children's Ministry
 * </Tag>
 *
 * @example
 * // A pink category tag
 * <Tag className="bg-pink-100 text-pink-700">
 * Women's Ministry
 * </Tag>
 */
const Tag: React.FC<TagProps> = ({
  children,
  className,
  ...props
}) => {
  // Base styles provide consistent padding, font size, and shape.
  const baseStyles = 'inline-block px-3 py-1 text-sm font-semibold rounded-full';

  // Combine base styles with custom classes passed in for colors.
  const classes = [
    baseStyles,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Tag;
