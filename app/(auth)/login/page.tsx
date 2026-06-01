'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) { setError(err.message); return }
    router.push('/members/dashboard')
    router.refresh()
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
          <p className="text-body-sm text-ash mt-2">Sign in to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className={inputCls}
          />
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={`${inputCls} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fog hover:text-ash transition-colors"
              tabIndex={-1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                {showPw
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>
                }
              </svg>
            </button>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-antique-gold/30 text-bone text-caption tracking-widest uppercase px-6 py-3 hover:border-antique-gold/60 hover:text-porcelain transition-all disabled:opacity-40"
          >
            {loading ? 'Signing in…' : 'Enter'}
          </button>
        </form>

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
