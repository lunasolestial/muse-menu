'use client'
import { useState } from 'react'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { submitPartnerInquiry } from '@/app/actions'
import SubmissionOverlay from '@/components/ui/SubmissionOverlay'

export default function VendorsPage() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    const result = await submitPartnerInquiry(new FormData(e.currentTarget))
    if (result.success) { setState('success'); return }
    setErrorMsg(result.error ?? 'Something went wrong.')
    setState('error')
  }

  if (state === 'loading' || state === 'success') {
    return (
      <SubmissionOverlay
        message={state === 'loading' ? 'Preparing your request.' : 'Your credentials have been received.'}
        subtext={state === 'loading' ? 'One moment.' : "We'll be in touch when there is a fit."}
      />
    )
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-4">Maker Partners</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-8">
            One thing,<br /><em>uncommonly well.</em>
          </h1>
          <p className="text-body text-ash leading-relaxed mb-6">
            We work with florists, photographers, ceramicists, musicians, and scent
            designers — people who shape the invisible elements of an evening.
          </p>
          <p className="text-body text-ash leading-relaxed">
            The best work in a room is often the work guests cannot quite name.
            That is what we are looking for.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="type" value="vendor" />
          <Input name="name" label="Your name" placeholder="Full name" required />
          <Input name="brand" label="Studio / brand" placeholder="e.g. Floral Studio name" />
          <Input name="email" type="email" label="Email" placeholder="you@studio.com" required />
          <Input name="website" type="url" label="Portfolio or website" placeholder="https://" />
          <Select name="credentials" label="Specialty">
            <option value="">Select your specialty</option>
            <option value="florals">Florals</option>
            <option value="photography">Photography</option>
            <option value="ceramics">Ceramics / Tableware</option>
            <option value="music">Music / Sound</option>
            <option value="scent">Scent / Fragrance</option>
            <option value="calligraphy">Calligraphy / Paper</option>
            <option value="other">Other</option>
          </Select>
          <Textarea
            name="message"
            label="Your work"
            placeholder="Tell us about your practice and what draws you to this kind of collaboration."
            rows={4}
            required
          />
          {state === 'error' && <p className="text-xs text-red-400">{errorMsg}</p>}
          <button
            type="submit"
            disabled={false}
            className="w-full border border-antique-gold/30 text-bone text-caption tracking-widest uppercase px-6 py-4 hover:border-antique-gold/60 transition-all disabled:opacity-40"
          >
            {'Submit credentials'}
          </button>
        </form>
      </div>
    </div>
  )
}
