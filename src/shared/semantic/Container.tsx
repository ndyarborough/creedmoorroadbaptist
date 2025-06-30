import React from 'react';

// =================================================================================================
// Container Component
// The fundamental layout component for constraining content width.
// =================================================================================================

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content of the container. */
  children: React.ReactNode;
}

/**
 * Container's sole job is to constrain the width of its children and center them.
 * It is unopinionated about background, padding, or shadows.
 * This makes it a pure, reusable layout primitive.
 *
 * @example
 * <Container>
 * <h1>My Page Content</h1>
 * </Container>
 */
export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
  // Sets max-width, centers with mx-auto, and adds horizontal padding for gutters.
  const classes = [
    'mx-auto',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;
