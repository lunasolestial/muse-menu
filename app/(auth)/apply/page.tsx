'use client'
import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { submitApplication } from '@/app/actions'
import SubmissionOverlay from '@/components/ui/SubmissionOverlay'
import Link from 'next/link'

export default function ApplyPage() {
  const [state, setState]           = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg]     = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setFieldErrors({})
    const result = await submitApplication(new FormData(e.currentTarget))
    if (result.success) { setState('success'); return }
    setErrorMsg(result.error ?? 'Something went wrong.')
    if ('fieldErrors' in result && result.fieldErrors) setFieldErrors(result.fieldErrors)
    setState('error')
  }

  const fe = (field: string) => fieldErrors[field]?.[0]

  if (state === 'loading') {
    return (
      <SubmissionOverlay
        message="Receiving your consideration."
        subtext="One moment while we compose the next step."
      />
    )
  }

  if (state === 'success') {
    return (
      <SubmissionOverlay
        message="Your consideration has been received."
        subtext="We will be in touch directly. The process is unhurried."
      />
    )
  }

  return (
    <div className="min-h-screen bg-carbon pt-24 pb-20 px-6 md:px-10">
      <div className="max-w-xl mx-auto">

        <Link href="/" className="font-serif text-base italic text-bone/50 hover:text-bone transition-colors block mb-12">
          Muse <span className="text-antique-gold/30">&amp;</span> Menu Society
        </Link>

        <div className="mb-12">
          <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-3">Membership consideration</p>
          <h1 className="font-serif text-headline text-bone font-light leading-tight mb-4">
            Request consideration.
          </h1>
          <p className="text-body-sm text-ash leading-relaxed">
            {/* [TODO: refine with internal Muse & Menu copy] */}
            Applications are reviewed personally. Please write as yourself —
            not a professional bio. We are interested in who you are at a table,
            not what you do at a desk.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input name="name" label="Full name" placeholder="Your full name" required error={fe('name')} />
            <Input name="email" type="email" label="Email address" placeholder="you@email.com" required error={fe('email')} />
          </div>
          <Input name="city" label="City" placeholder="Where are you based?" required error={fe('city')} />
          <Input name="referred_by" label="Referred by" placeholder="Name of your referral, if any" />
          <Input
            name="how_did_you_hear"
            label="How did you encounter the Society?"
            placeholder="Word of mouth, social, an event…"
          />
          <Textarea
            name="why_muse"
            label="Why Muse & Menu?"
            placeholder="Tell us something about yourself — how you eat, what you value at a table, what kind of evening you are looking for. This is the most important part of your application."
            rows={6}
            required
            error={fe('why_muse')}
          />
          <Textarea
            name="dietary_notes"
            label="Dietary notes"
            placeholder="Any restrictions, allergies, or strong preferences we should know about. (Optional — you'll have the chance to confirm before each event.)"
            rows={3}
          />

          {state === 'error' && !Object.keys(fieldErrors).length && (
            <p className="text-xs text-red-400">{errorMsg}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={state === 'loading'}
              className="w-full border border-antique-gold/30 text-bone text-caption tracking-widest uppercase px-6 py-4 hover:border-antique-gold/60 hover:text-porcelain transition-all disabled:opacity-40"
            >
              {state === 'loading' ? 'Submitting…' : 'Submit application'}
            </button>
            <p className="text-center text-xs text-fog mt-4">
              Submission does not guarantee membership. We will be in touch directly.
            </p>
          </div>
        </form>

      </div>
    </div>
  )
}
