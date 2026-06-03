'use client'
import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { submitPartnerInquiry } from '@/app/actions'
import SubmissionOverlay from '@/components/ui/SubmissionOverlay'

export default function ChefsPage() {
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
        message={state === 'loading' ? 'Preparing your submission.' : 'Your credentials have been received.'}
        subtext={state === 'loading' ? 'One moment.' : 'If there is a fit, we will be in touch about an upcoming muse.'}
      />
    )
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

        <div>
          <p className="text-caption tracking-widest uppercase text-antique-gold/40 mb-4">Chef Partners</p>
          <h1 className="font-serif text-display text-bone font-light leading-none mb-8">
            A point of view<br />
            <em>over a brand.</em>
          </h1>
          <div className="space-y-4 text-body text-ash leading-relaxed">
            <p>
              We work with chefs who have something to say. The muse gives them a
              constraint. The room gives them a reason. The members give them an audience
              worth cooking for.
            </p>
            <p>
              We are not looking for names. We are looking for craft, perspective,
              and the ability to compose a meal around an idea.
            </p>
          </div>
          <div className="mt-10 space-y-3 text-body-sm">
            {[
              'A clear culinary perspective — not a concept, a point of view',
              'Interested in intimacy over scale',
              'Able to work with a muse as a creative constraint',
              'Operational: prep, pacing, communication',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-ash">
                <span className="text-antique-gold/40 shrink-0 mt-0.5">—</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="type" value="chef" />
          <Input name="name" label="Your name" placeholder="Full name" required />
          <Input name="brand" label="Restaurant / brand" placeholder="Where are you based?" />
          <Input name="email" type="email" label="Email address" placeholder="you@kitchen.com" required />
          <Input name="website" type="url" label="Website or Instagram" placeholder="https://" />
          <Textarea
            name="credentials"
            label="Your background"
            placeholder="Tell us about your culinary background, your style, and what excites you about this kind of work."
            rows={4}
            required
          />
          <Textarea
            name="message"
            label="Why Muse & Menu"
            placeholder="What kind of muse or format would you want to work with?"
            rows={3}
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
