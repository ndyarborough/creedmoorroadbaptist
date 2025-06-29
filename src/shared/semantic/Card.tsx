import React from 'react';

// =================================================================================================
// Card Component
// A versatile container for displaying content in a card format.
// =================================================================================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to be displayed inside the card. */
  children: React.ReactNode;
}

/**
 * Card is a foundational UI component used to group related content.
 * It provides a distinct, bordered, and shadowed container.
 * It is unopinionated about its internal layout, allowing for flexible composition.
 * The `overflow-hidden` class is crucial for ensuring that child elements
 * (like a top-aligned image) have their corners clipped to match the card's border radius.
 *
 * @example
 * <Card>
 * <img src="..." alt="Card image" />
 * <div className="p-6">
 * <h3>Card Title</h3>
 * <p>Some descriptive text for the card.</p>
 * </div>
 * </Card>
 */
const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  // Base styles using semantic tokens from your index.css
  const baseStyles = 'bg-white border border-border-primary rounded-lg shadow-md overflow-hidden';

  // Combine all classes
  const classes = [
    baseStyles,
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
