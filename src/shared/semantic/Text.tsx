import React from 'react';

// =================================================================================================
// Text Component
// A flexible component for rendering all non-heading text elements.
// =================================================================================================

type TextVariant =
  | 'page-subheader'
  | 'body'
  | 'link'
  | 'footer-link'
  | 'footer-copyright'
  | 'nav-item'
  | 'category-tag'
  | 'tab-header';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  /** The content of the text block. */
  children: React.ReactNode;
  /** The semantic element to render. Use 'p' for paragraphs and 'span' for inline text. */
  as?: 'p' | 'span';
  /** The visual style of the text, maps to your CSS component classes. */
  variant: TextVariant;
}

/**
 * Text provides a consistent way to display all non-heading text.
 * It allows you to apply consistent text styles from your design system easily.
 *
 * @example
 * // Renders a <p> tag with the section-body style
 * <Text as="p" variant="body">This is a paragraph of body text.</Text>
 *
 * @example
 * // Renders a <span> tag styled as a link
 * <Text as="span" variant="link">Learn More</Text>
 */
export const Text: React.FC<TextProps> = ({
  children,
  className,
  as: Component = 'p', // Default to 'p' for paragraphs
  variant,
  ...props
}) => {
  const variantClasses: Record<TextVariant, string> = {
    'page-subheader': 'page-subheader',
    body: 'section-body',
    link: 'text-link',
    'footer-link': 'footer-link',
    'footer-copyright': 'footer-copyright',
    'nav-item': 'nav-item',
    'category-tag': 'category-tag',
    'tab-header': 'tab-header',
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

export default Text;
