import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-carbon flex flex-col items-center justify-center px-6">
      <p
        style={{
          fontFamily: 'var(--font-cinzel), "Trajan Pro", serif',
          fontSize: 9,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(212,175,55,0.38)',
          marginBottom: 24,
        }}
      >
        404
      </p>
      <h1
        className="font-serif font-light text-bone text-center"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 20 }}
      >
        This page is not<br />
        <em>in the room.</em>
      </h1>
      <div style={{ width: 32, height: 1, background: 'rgba(212,175,55,0.22)', margin: '0 auto 28px' }} />
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-cinzel), "Trajan Pro", serif',
          fontSize: 9,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(212,175,55,0.55)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        className="hover:text-antique-gold"
      >
        Return home
      </Link>
    </div>
  )
}
