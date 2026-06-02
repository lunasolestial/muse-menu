import { forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

// Shared field base — solid dark background so the field is always legible
const fieldBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(26, 13, 36, 0.6)',   // midnight plum tint — dark, warm, not pure black
  border: '1px solid rgba(212, 175, 55, 0.2)',
  color: '#F4EFE6',
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 13,
  letterSpacing: '0.01em',
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color 0.25s, background 0.25s',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none' as const,
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 9,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: 'rgba(169,163,154,0.8)',
  marginBottom: 8,
}

const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 11,
  color: 'rgba(248, 113, 113, 0.9)',
  marginTop: 4,
}

// ── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, style, ...props }, ref) => (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        ref={ref}
        style={{
          ...fieldBase,
          borderColor: error ? 'rgba(248,113,113,0.5)' : 'rgba(212,175,55,0.2)',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(212,175,55,0.55)'
          e.currentTarget.style.background   = 'rgba(42,22,54,0.4)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? 'rgba(248,113,113,0.5)' : 'rgba(212,175,55,0.2)'
          e.currentTarget.style.background   = 'rgba(26,13,36,0.6)'
        }}
        {...props}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'

// ── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  rows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, rows = 4, style, ...props }, ref) => (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        style={{
          ...fieldBase,
          resize: 'none',
          borderColor: error ? 'rgba(248,113,113,0.5)' : 'rgba(212,175,55,0.2)',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(212,175,55,0.55)'
          e.currentTarget.style.background   = 'rgba(42,22,54,0.4)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? 'rgba(248,113,113,0.5)' : 'rgba(212,175,55,0.2)'
          e.currentTarget.style.background   = 'rgba(26,13,36,0.6)'
        }}
        {...props}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
)
Textarea.displayName = 'Textarea'

// ── Select ───────────────────────────────────────────────────────────────────

const CARET = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23D4AF37'/%3E%3C/svg%3E")`

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, style, children, ...props }, ref) => (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      <select
        ref={ref}
        style={{
          ...fieldBase,
          // Solid background critical — prevents white-on-white option text
          background: `${CARET} no-repeat right 14px center, rgba(26,13,36,0.85)`,
          backgroundSize: '10px 6px, 100%',
          paddingRight: 38,
          cursor: 'pointer',
          borderColor: error ? 'rgba(248,113,113,0.5)' : 'rgba(212,175,55,0.2)',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(212,175,55,0.55)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? 'rgba(248,113,113,0.5)' : 'rgba(212,175,55,0.2)'
        }}
        {...props}
      >
        {children}
      </select>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
)
Select.displayName = 'Select'
