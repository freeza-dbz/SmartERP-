import React, { forwardRef } from 'react';
import type { InputSize } from '../../types';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    hint,
    inputSize = 'md',
    leftIcon,
    rightIcon,
    className = '',
    required,
    id,
    ...props
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              block w-full rounded-lg border
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              transition-colors duration-150
              disabled:bg-slate-50 dark:disabled:bg-slate-900
              disabled:text-slate-500 dark:disabled:text-slate-500
              disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${sizeClasses[inputSize]}
              ${error
                ? 'border-error-300 dark:border-error-500 focus:border-error-500 focus:ring-error-500'
                : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500'
              }
              ${className}
            `}
            required={required}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-error-600 dark:text-error-400">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', required, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            block w-full rounded-lg border px-3 py-2 text-sm
            bg-white dark:bg-slate-800
            text-slate-900 dark:text-slate-100
            transition-colors duration-150
            disabled:bg-slate-50 dark:disabled:bg-slate-900
            disabled:cursor-not-allowed
            ${error
              ? 'border-error-300 dark:border-error-500 focus:border-error-500 focus:ring-error-500'
              : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500'
            }
            ${className}
          `}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-error-600 dark:text-error-400">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', required, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            block w-full rounded-lg border px-3 py-2 text-sm
            bg-white dark:bg-slate-800
            text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            transition-colors duration-150
            disabled:bg-slate-50 dark:disabled:bg-slate-900
            disabled:cursor-not-allowed
            resize-none
            ${error
              ? 'border-error-300 dark:border-error-500 focus:border-error-500 focus:ring-error-500'
              : 'border-slate-300 dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500'
            }
            ${className}
          `}
          required={required}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-error-600 dark:text-error-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`flex items-center ${className}`}>
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className="
            h-4 w-4 rounded border-slate-300 dark:border-slate-600
            text-primary-600 focus:ring-primary-500
            bg-white dark:bg-slate-800
          "
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className="ml-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
