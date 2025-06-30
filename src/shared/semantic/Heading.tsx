import React from 'react';

// =================================================================================================
// Heading Component
// A flexible component for rendering all semantic heading levels (h1-h6).
// =================================================================================================

// Define the variants which map to the semantic classes in your index.css
type HeadingVariant = 'page' | 'content' | 'section' | 'section-subheader' | 'footer' | 'banner';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The content of the heading. */
  children: React.ReactNode;
  /** The semantic heading level (h1, h2, etc.). Determines the HTML tag. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** The visual style of the heading, maps to your CSS component classes. */
  variant: HeadingVariant;
}

/**
 * Heading provides a consistent and semantic way to display titles and headers.
 * It decouples the semantic tag (`as` prop) from the visual presentation (`variant` prop).
 *
 * @example
 * // Renders an <h1> tag with the visual style of a page header
 * <Heading as="h1" variant="page">Welcome to Our Church</Heading>
 *
 * @example
 * // Renders an <h2> tag with the visual style of a section header
 * <Heading as="h2" variant="section">Upcoming Events</Heading>
 */
export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  as: Component = 'h2', // Default to h2 for semantic correctness
  variant,
  ...props
}) => {
  const variantClasses: Record<HeadingVariant, string> = {
    page: 'page-header',
    content: 'content-header',
    section: 'section-header',
    'section-subheader': 'section-subheader',
    footer: 'footer-header',
    banner: 'banner-header',
  };

  const classes = [
    variantClasses[variant],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
