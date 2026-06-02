// Shared wordmark — used by Header (horizontal) and Footer (stacked).
// Wrapped in .logo-luster for the slow gold shimmer defined in globals.css.

interface WordmarkProps {
  height?: number
  stacked?: boolean  // when true, renders "SOCIETY" beneath
}

export default function Wordmark({ height = 38, stacked = false }: WordmarkProps) {
  const scriptSize = Math.round(height * 0.78)
  const capsSize   = Math.round(height * 0.40)
  const gap        = Math.round(height * 0.14)

  return (
    <span className="logo-luster" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: stacked ? 'center' : 'flex-start', gap: stacked ? Math.round(height * 0.12) : 0 }}>
      {/* Horizontal wordmark row */}
      <span
        aria-label="Muse & Menu Society"
        style={{ display: 'inline-flex', alignItems: 'baseline', gap, lineHeight: 1 }}
      >
        <span style={{
          fontFamily: 'var(--font-pinyon), "Edwardian Script ITC", "Bickham Script Pro", cursive',
          fontSize: scriptSize, fontWeight: 400, color: '#D6A34A', lineHeight: 1,
        }}>
          Muse
        </span>
        <span style={{
          fontFamily: 'var(--font-cinzel), "Trajan Pro", serif',
          fontSize: capsSize, fontWeight: 400, color: '#D6A34A',
          letterSpacing: '0.08em', lineHeight: 1,
          position: 'relative', bottom: Math.round(height * 0.06),
        }}>
          &amp;
        </span>
        <span style={{
          fontFamily: 'var(--font-cinzel), "Trajan Pro", serif',
          fontSize: capsSize, fontWeight: 400, color: '#D6A34A',
          letterSpacing: '0.22em', lineHeight: 1,
        }}>
          MENU
        </span>
      </span>

      {/* Optional "SOCIETY" subline */}
      {stacked && (
        <span style={{
          fontFamily: 'var(--font-cinzel), "Trajan Pro", serif',
          fontSize: Math.round(capsSize * 0.55),
          fontWeight: 400, color: 'rgba(214,163,74,0.6)',
          letterSpacing: '0.5em', textTransform: 'uppercase', lineHeight: 1,
        }}>
          SOCIETY
        </span>
      )}
    </span>
  )
}
