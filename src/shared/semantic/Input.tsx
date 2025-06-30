import React from 'react';

// =================================================================================================
// Input Component
// A reusable and accessible form input component with integrated label and error states.
// =================================================================================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The label text to display above the input. */
  label?: string;
  /** A unique identifier for the input. If not provided, one will be generated automatically. */
  id?: string;
  /** An error message to display below the input. Providing a message will trigger the error styling. */
  error?: string;
  /** Additional CSS classes to apply to the main wrapper div. */
  containerClassName?: string;
}

/**
 * A shared input component that provides consistent styling for form fields,
 * including labels, focus states, and validation errors.
 *
 * @example
 * // Basic usage
 * <Input label="Full Name" type="text" placeholder="John Doe" />
 *
 * @example
 * // With an error message
 * <Input
 * label="Email Address"
 * type="email"
 * error="Please enter a valid email."
 * defaultValue="invalid-email"
 * />
 */
const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  className,
  containerClassName,
  disabled,
  ...props
}) => {
  // Generate a unique ID if not provided, crucial for accessibility (connecting label to input).
  const generatedId = React.useId();
  const inputId = id || generatedId;

  // Base styles for the input element
  const baseInputStyles = 'w-full rounded-lg border bg-bg-secondary p-3 text-base text-text-primary transition-colors duration-200 focus:outline-none';

  // Conditional styles based on the input's state
  const stateStyles = {
    default: 'border-border-primary focus:ring-2 focus:ring-primary-base/50 focus:border-primary-base',
    error: 'border-status-error text-status-error focus:ring-2 focus:ring-status-error/50 focus:border-status-error',
    disabled: 'disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100',
  };

  const inputClasses = [
    baseInputStyles,
    error ? stateStyles.error : stateStyles.default,
    disabled && stateStyles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = ['w-full flex justify-center flex-col', containerClassName].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <label htmlFor={inputId} className="block text-sm font-semibold mb-2 text-text-primary">
        {label}
      </label>
      <input
        id={inputId}
        className={inputClasses}
        disabled={disabled}
        aria-invalid={!!error} // Accessibility attribute for screen readers
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-status-error">
          {error}
        </p>
      )}  
    </div>
  );
};

export default Input;
