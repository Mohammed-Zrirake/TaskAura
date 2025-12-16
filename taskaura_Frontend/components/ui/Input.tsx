import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-sm 
          text-slate-900 dark:text-slate-100 placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';