import React from 'react';

// =================================================================================================
// Card Component
// A versatile container for displaying content in a card format.
// =================================================================================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to be displayed inside the card. */
  children: React.ReactNode;
  /** The direction of the accent border. */
  accent?: 'left' | 'right' | 'top' | 'bottom';
  /** The color of the accent border, corresponding to a theme color. */
  accentColor?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error';
}

/**
 * Card is a foundational UI component used to group related content.
 * It is unopinionated about its background color and can feature an optional accent border.
 *
 * @example
 * <Card className="bg-white p-4" accent="left" accentColor="primary">
 * <h3>Card Title</h3>
 * <p>Card content...</p>
 * </Card>
 */
const Card: React.FC<CardProps> = ({
  children,
  className,
  accent,
  accentColor = 'primary',
  ...props
}) => {
  // Base styles provide the foundational card shell.
  const baseStyles = 'w-full p-8 space-y-4 rounded-lg shadow-md overflow-hidden';

  // Accent border styles are applied conditionally.
  const accentStyles = {
    left: 'border-l-4',
    right: 'border-r-4',
    top: 'border-t-4',
    bottom: 'border-b-4',
  };

  // Accent color styles map to your theme.
  const accentColorStyles = {
    primary: 'border-primary-base',
    secondary: 'border-text-secondary',
    tertiary: 'border-text-tertiary',
    success: 'border-status-success',
    error: 'border-status-error',

  };

  const classes = [
    baseStyles,
    // Add a default border unless an accent is specified.
    !accent && 'border border-border-primary',
    accent && accentStyles[accent],
    accent && accentColor && accentColorStyles[accentColor],
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

export default Card;
