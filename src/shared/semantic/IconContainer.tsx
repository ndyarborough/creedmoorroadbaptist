import React from 'react';

// =================================================================================================
// IconContainer Component
// A polished container to display an icon with a styled background.
// =================================================================================================

interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The icon component to be displayed inside the container. */
  children: React.ReactNode;
  /** The background color variant, mapping to your theme colors. */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'muted';
  /** The size of the container. */
  size?: 'sm' | 'md' | 'lg';
  /** The shape of the container. */
  shape?: 'rounded' | 'circle';
}

/**
 * IconContainer provides a consistent, styled background for icons.
 * It's designed to be flexible and integrate with your design system's colors and sizes.
 * Note: The color of the icon itself should be handled on the icon component,
 * usually with a contrasting color to the container's background (e.g., a white icon on a blue background).
 *
 * @example
 * <IconContainer variant="primary" size="md">
 * <HomeIcon className="text-white w-6 h-6" />
 * </IconContainer>
 */
const IconContainer: React.FC<IconContainerProps> = ({
  children,
  className,
  variant = 'muted',
  size = 'md',
  shape = 'circle',
  ...props
}) => {
  // Base styles for centering and layout
  const baseStyles = 'inline-flex items-center justify-center';

  // Size-specific styles for the container's dimensions
  const sizeStyles = {
    sm: 'w-8 h-8',   // 32px
    md: 'w-12 h-12', // 48px
    lg: 'w-16 h-16', // 64px
  };

  // Shape-specific styles
  const shapeStyles = {
    rounded: 'rounded-lg',
    circle: 'rounded-full',
  };

  // Variant-specific styles for background colors.
  // These map to the semantic color variables in your index.css.
  const variantStyles = {
    primary: 'bg-primary-base',
    secondary: 'bg-text-secondary',
    success: 'bg-status-success',
    error: 'bg-status-error',
    muted: 'bg-bg-secondary',
  };

  // Combine all classes
  const classes = [
    baseStyles,
    sizeStyles[size],
    shapeStyles[shape],
    variantStyles[variant],
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

export default IconContainer;
