import React from 'react';

// =================================================================================================
// Textarea Component
// A reusable and accessible form textarea component with integrated label and error states.
// =================================================================================================

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The label text to display above the textarea. */
  label?: string;
  /** A unique identifier for the textarea. If not provided, one will be generated automatically. */
  id?: string;
  /** An error message to display below the textarea. Providing a message will trigger the error styling. */
  error?: string;
  /** Additional CSS classes to apply to the main wrapper div. */
  containerClassName?: string;
}

/**
 * A shared textarea component that provides consistent styling for form fields,
 * including labels, focus states, and validation errors.
 *
 * @example
 * // Basic usage
 * <Textarea label="Description" rows={4} placeholder="Enter description..." />
 *
 * @example
 * // With an error message
 * <Textarea
 *   label="Comments"
 *   error="This field is required."
 *   defaultValue=""
 *   rows={3}
 * />
 */
const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  error,
  className,
  containerClassName,
  disabled,
  rows = 4,
  ...props
}) => {
  // Generate a unique ID if not provided, crucial for accessibility (connecting label to textarea).
  const generatedId = React.useId();
  const textareaId = id || generatedId;

  // Base styles for the textarea element
  const baseTextareaStyles = 'w-full rounded-lg border bg-bg-secondary p-3 text-base text-text-primary transition-colors duration-200 focus:outline-none resize-vertical';

  // Conditional styles based on the textarea's state
  const stateStyles = {
    default: 'border-border-primary focus:ring-2 focus:ring-primary-base/50 focus:border-primary-base',
    error: 'border-status-error text-status-error focus:ring-2 focus:ring-status-error/50 focus:border-status-error',
    disabled: 'disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100',
  };

  const textareaClasses = [
    baseTextareaStyles,
    error ? stateStyles.error : stateStyles.default,
    disabled && stateStyles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = ['w-full flex justify-center flex-col', containerClassName].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <label htmlFor={textareaId} className="block text-sm font-semibold mb-2 text-text-primary">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={textareaClasses}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error} // Accessibility attribute for screen readers
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-2 text-sm text-status-error">
          {error}
        </p>
      )}  
    </div>
  );
};

export default Textarea;