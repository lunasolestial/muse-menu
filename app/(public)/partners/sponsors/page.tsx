'use client'
import { useState } from 'react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { submitSponsorInquiry } from '@/app/actions'

export default function SponsorsPage() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    const result = await submitSponsorInquiry(new FormData(e.currentTarget))
    if (result.success) { setState('success'); return }
    setErrorMsg(result.error ?? 'Something went wrong.')
    setState('error')
  }

  if (state === 'success') {
    return (
      <div className="pt-32 pb-24 px-6 max-w-xl mx-auto text-center space-y-6">
        <div className="w-px h-16 bg-antique-gold/30 mx-auto" />
        <h1 className="font-serif text-headline text-bone font-light">Your outline request has been received.</h1>
        <p className="text-body-sm text-ash">
          We review partnership inquiries with care. If there is alignment, someone from the Society will be in touch.
        </p>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-2xl mx-auto">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-4">Sponsors</p>
        <h1 className="font-serif text-display text-bone font-light leading-none mb-6">
          Request a<br /><em>partnership outline.</em>
        </h1>
        <p className="text-body text-ash leading-relaxed mb-12">
          {/* [TODO: refine with internal Muse & Menu copy] */}
          We work with brands whose values, aesthetics, and audience align with the Society.
          If that description fits, we'd like to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="type" value="vendor" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input name="brand" label="Brand name" placeholder="Your brand" required />
            <Input name="contact_name" label="Your name" placeholder="Full name" required />
          </div>
          <Input name="email" type="email" label="Email address" placeholder="you@brand.com" required />
          <Input name="website" type="url" label="Website" placeholder="https://" />
          <Select name="budget_range" label="Approximate partnership budget">
            <option value="">Prefer to discuss</option>
            <option value="under_2500">Under $2,500</option>
            <option value="2500_5000">$2,500 – $5,000</option>
            <option value="5000_10000">$5,000 – $10,000</option>
            <option value="10000_plus">$10,000+</option>
          </Select>
          <Textarea
            name="alignment_note"
            label="Brand alignment"
            placeholder="How does your brand align with the Muse & Menu ethos? What kind of partnership interests you?"
            rows={5}
            required
          />
          {state === 'error' && <p className="text-xs text-red-400">{errorMsg}</p>}
          <button
            type="submit"
            disabled={state === 'loading'}
            className="w-full border border-antique-gold/30 text-bone text-caption tracking-widest uppercase px-6 py-4 hover:border-antique-gold/60 transition-all disabled:opacity-40"
          >
            {state === 'loading' ? 'Sending…' : 'Request partnership outline'}
          </button>
        </form>
      </div>
    </div>
  )
}
