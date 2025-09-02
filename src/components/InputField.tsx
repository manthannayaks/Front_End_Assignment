import React from 'react'
import { clsx } from 'clsx'

type Variant = 'filled' | 'outlined' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  variant?: Variant
  size?: Size
  type?: React.HTMLInputTypeAttribute
  clearable?: boolean
  passwordToggle?: boolean
  id?: string
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-3 py-2 rounded-lg',
  md: 'text-base px-3.5 py-2.5 rounded-xl',
  lg: 'text-base px-4 py-3 rounded-2xl'
}

const variantStyles: Record<Variant, (invalid: boolean) => string> = {
  filled: (invalid) => clsx(
    'bg-gray-100 dark:bg-gray-800',
    'border border-transparent focus:border-gray-300 dark:focus:border-gray-600',
    invalid && 'ring-2 ring-red-500/60 focus:ring-red-500/60'
  ),
  outlined: (invalid) => clsx(
    'bg-transparent border',
    'border-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-600',
    invalid && 'border-red-500 ring-1 ring-red-500/40'
  ),
  ghost: (invalid) => clsx(
    'bg-transparent border border-transparent',
    'focus:border-gray-300 dark:focus:border-gray-600',
    invalid && 'ring-1 ring-red-500/40'
  )
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    loading,
    variant = 'outlined',
    size = 'md',
    type = 'text',
    clearable,
    passwordToggle,
    id
  },
  ref
) {
  const [revealed, setRevealed] = React.useState(false)
  const inputId = id || React.useId()
  const showError = !!invalid && !!errorMessage

  const rightPadding = (clearable || (passwordToggle && type === 'password') || loading) ? 'pr-10' : ''

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid || undefined}
          aria-describedby={helperText ? inputId + '-helper' : undefined}
          type={passwordToggle && type === 'password' ? (revealed ? 'text' : 'password') : type}
          className={clsx(
            'w-full outline-none shadow-sm transition',
            sizeStyles[size],
            variantStyles[variant](!!invalid),
            'disabled:opacity-60 disabled:cursor-not-allowed',
            'focus:ring-2 focus:ring-[hsl(var(--ring))]',
            rightPadding
          )}
        />
        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
        )}
        {clearable && !loading && value && value.length > 0 && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={() => onChange && onChange({ target: { value: '' } } as any)}
            className="absolute right-2 inset-y-0 my-auto h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
          >
            <span aria-hidden>×</span>
          </button>
        )}
        {passwordToggle && type === 'password' && !loading && (
          <button
            type="button"
            aria-label={revealed ? 'Hide password' : 'Show password'}
            onClick={() => setRevealed(r => !r)}
            className="absolute right-2 inset-y-0 my-auto h-6 px-2 rounded-md text-xs border border-gray-300 dark:border-gray-700"
          >
            {revealed ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {helperText && !showError && (
        <p id={inputId + '-helper'} className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {showError && (
        <p className="mt-1 text-xs text-red-600" role="alert">{errorMessage}</p>
      )}
    </div>
  )
})
