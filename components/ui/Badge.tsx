type Variant = 'gold' | 'plum' | 'ash' | 'green' | 'red'

const variants: Record<Variant, string> = {
  gold:  'border border-antique-gold/30 text-antique-gold/80 bg-antique-gold/5',
  plum:  'border border-midnight-plum bg-midnight-plum/40 text-bone/70',
  ash:   'border border-white/10 text-ash bg-white/5',
  green: 'border border-emerald-500/30 text-emerald-400/80 bg-emerald-500/5',
  red:   'border border-red-500/30 text-red-400/80 bg-red-500/5',
}

export default function Badge({
  children,
  variant = 'ash',
}: {
  children: React.ReactNode
  variant?: Variant
}) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] tracking-widest uppercase font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}
