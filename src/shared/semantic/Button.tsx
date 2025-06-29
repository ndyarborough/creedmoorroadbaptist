import React from 'react';

// =================================================================================================
// Button Component (Corrected)
// =================================================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children: React.ReactNode;
  /** Visual style of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'transparent' | 'danger';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Renders the component as a link or a button */
  as?: 'button' | 'a';
  /** Href for the link if `as` is 'a' */
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  disabled,
  ...props
}) => {
  // Base styles for all buttons
  const baseStyles = 'inline-flex items-center justify-center font-semibold text-center transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Size-specific styles with more balanced padding
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-primary-dark text-white hover:bg-opacity-90 focus:ring-primary-base',
    secondary: 'bg-text-inverted text-primary-dark focus:ring-text-secondary',
    outline: 'border border-border-primary bg-transparent text-text-primary hover:bg-bg-secondary focus:ring-primary-base',
    ghost: 'bg-transparent text-text-primary hover:bg-bg-secondary focus:ring-primary-base',
    white: 'bg-bg-primary text-bg-footer',
    danger: 'bg-status-error text-bg-primary',
    transparent: 'bg-transparent text-bg-primary border-1 border-bg-primary',
  };

  // Styles for the disabled state
  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  // Combine all classes
  const classes = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    disabledStyles,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} disabled={disabled} {...props}>
      {children}
    </Component>
  );
};


export default Button;