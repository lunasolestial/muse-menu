'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    setLoading(false)
    if (err) { setError(err.message); return }
    setSent(true)
  }

  const inputCls = 'w-full bg-transparent border border-antique-gold/20 text-bone placeholder:text-fog px-4 py-3 text-body-sm focus:outline-none focus:border-antique-gold/50 transition-colors'

  return (
    <div className="min-h-screen bg-carbon flex flex-col items-center justify-center px-6">
      <Link href="/" className="font-serif text-xl italic text-bone/60 hover:text-bone transition-colors mb-12">
        Muse <span className="text-antique-gold/40">&amp;</span> Menu Society
      </Link>

      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-title text-bone font-light">Member Access</h1>
          <p className="text-body-sm text-ash mt-2">
            {sent ? 'Check your inbox.' : 'Enter your email to receive a sign-in link.'}
          </p>
        </div>

        {sent ? (
          <div className="border border-antique-gold/15 p-8 text-center space-y-4">
            <p className="font-serif text-title text-bone font-light italic">A sign-in link has been sent.</p>
            <p className="text-body-sm text-ash">
              Follow the link in your email to access your member portal.
              The link expires after a short window.
            </p>
            <button
              onClick={() => { setSent(false); setEmail('') }}
              className="text-caption text-fog hover:text-ash transition-colors tracking-widest uppercase"
            >
              Use a different address
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className={inputCls}
            />

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-antique-gold/30 text-bone text-caption tracking-widest uppercase px-6 py-3 hover:border-antique-gold/60 hover:text-porcelain transition-all disabled:opacity-40"
            >
              {loading ? 'Sending…' : 'Send link'}
            </button>
          </form>
        )}

        <p className="text-center text-caption text-fog">
          Not yet a member?{' '}
          <Link href="/membership" className="text-antique-gold/60 hover:text-antique-gold transition-colors underline underline-offset-4 decoration-antique-gold/20">
            Request consideration
          </Link>
        </p>
      </div>
    </div>
  )
}
