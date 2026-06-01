'use client'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'ghost' | 'text' | 'gold' | 'plum'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
}

const base = 'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-antique-gold/60 disabled:opacity-40 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  ghost: 'border border-antique-gold/25 text-bone hover:border-antique-gold/60 hover:text-porcelain bg-transparent',
  text:  'text-ash hover:text-bone underline underline-offset-4 decoration-antique-gold/30 hover:decoration-antique-gold/60 bg-transparent p-0',
  gold:  'bg-antique-gold/10 border border-antique-gold/40 text-antique-gold hover:bg-antique-gold/20 hover:border-antique-gold/70',
  plum:  'bg-midnight-plum text-bone hover:bg-midnight-plum/80 border border-white/5',
}

const sizes = {
  sm: 'text-caption px-4 py-2 rounded-sm',
  md: 'text-body-sm px-6 py-3 rounded-sm',
  lg: 'text-body px-8 py-4 rounded-sm',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'ghost', size = 'md', className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
)

Button.displayName = 'Button'
export default Button
