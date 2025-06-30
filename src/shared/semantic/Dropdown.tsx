import React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';

// =================================================================================================
// Dropdown Component
// A reusable and accessible dropdown select component.
// =================================================================================================

// --- Stand-in SVG Icon ---
// To resolve the dependency error, the 'UnfoldMore' icon is now an inline SVG component.


// Define the shape for each option in the dropdown
interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** The label text to display above the dropdown. */
  label?: string;
  /** A unique identifier for the dropdown. If not provided, one will be generated automatically. */
  id?: string;
  /** An array of options to populate the dropdown. */
  options: DropdownOption[];
  /** An error message to display below the dropdown. Providing a message will trigger the error styling. */
  error?: string;
  /** Additional CSS classes to apply to the main wrapper div. */
  containerClassName?: string;
}

/**
 * A shared Dropdown component that provides consistent styling for select fields,
 * including labels, focus states, and validation errors.
 *
 * @example
 * const options = [
 * { label: 'Event Type', value: '' },
 * { label: 'Worship Service', value: 'worship' },
 * { label: 'Bible Study', value: 'study' },
 * ];
 *
 * <Dropdown label="Filter by Category" options={options} />
 */
const Dropdown: React.FC<DropdownProps> = ({
  label,
  id,
  options,
  error,
  className,
  containerClassName,
  disabled,
  ...props
}) => {
  // Generate a unique ID if not provided, crucial for accessibility
  const generatedId = React.useId();
  const selectId = id || generatedId;

  // --- STYLING ---
  // These styles are designed to mirror your existing Input component.

  // Base styles for the select element
  const baseSelectStyles = 'w-full appearance-none rounded-lg border bg-bg-secondary p-3 text-base text-text-primary transition-colors duration-200 focus:outline-none';

  // Conditional styles based on the component's state
  const stateStyles = {
    default: 'border-border-primary focus:ring-2 focus:ring-primary-base/50 focus:border-primary-base',
    error: 'border-status-error text-status-error focus:ring-2 focus:ring-status-error/50 focus:border-status-error',
    disabled: 'disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100',
  };

  const selectClasses = [
    baseSelectStyles,
    error ? stateStyles.error : stateStyles.default,
    disabled && stateStyles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = ['w-full', containerClassName].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-semibold mb-2 text-text-primary">
          {label}
        </label>
      )}
      {/* Wrapper to position the custom dropdown arrow */}
      <div className="relative w-full">
        <select
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom arrow icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <ExpandMore className="h-5 w-5 text-text-muted" />
        </div>
      </div>
      {error && (
        <p id={`${selectId}-error`} className="mt-2 text-sm text-status-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
