import React from 'react';

// =================================================================================================
// Checkbox Component
// A reusable and accessible checkbox component with an integrated label.
// =================================================================================================

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The label text to display next to the checkbox. */
  label: string;
  /** A unique identifier for the checkbox. If not provided, one will be generated automatically. */
  id?: string;
  /** Additional CSS classes to apply to the main wrapper div. */
  containerClassName?: string;
}

/**
 * A shared Checkbox component that provides consistent styling and accessibility
 * for boolean inputs.
 *
 * @example
 * <Checkbox label="I agree to the terms and conditions" />
 */
const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  className,
  containerClassName,
  disabled,
  ...props
}) => {
  // Generate a unique ID if not provided, crucial for accessibility.
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  // Base styles for the checkbox element.
  // We use `@tailwindcss/forms` plugin to handle the checkmark and colors.
  const checkboxClasses = [
    'h-5 w-5 rounded border-border-primary text-primary-base focus:ring-primary-base',
    'transition duration-150 ease-in-out',
    disabled && 'opacity-60 cursor-not-allowed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = ['relative flex items-center mt-4', containerClassName].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <input
        id={checkboxId}
        type="checkbox"
        className={checkboxClasses}
        disabled={disabled}
        {...props}
      />
      <label htmlFor={checkboxId} className="ml-3 block text-sm text-text-secondary">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
