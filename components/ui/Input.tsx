import { forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const base = 'w-full bg-transparent border border-antique-gold/20 text-bone placeholder:text-fog px-4 py-3 text-body-sm focus:outline-none focus:border-antique-gold/50 transition-colors'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  rows?: number
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-caption tracking-widest uppercase text-ash">
          {label}
        </label>
      )}
      <input ref={ref} className={`${base} ${error ? 'border-red-500/50' : ''} ${className}`} {...props} />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, rows = 4, className = '', ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-caption tracking-widest uppercase text-ash">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`${base} resize-none ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
)
Textarea.displayName = 'Textarea'

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }>(
  ({ label, error, className = '', children, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-caption tracking-widest uppercase text-ash">{label}</label>
      )}
      <select
        ref={ref}
        className={`${base} bg-carbon cursor-pointer ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
)
Select.displayName = 'Select'
