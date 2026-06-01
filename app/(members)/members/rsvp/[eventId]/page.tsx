'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { submitRSVP } from '@/app/actions'
import { useRouter, useParams } from 'next/navigation'
import { Input, Textarea } from '@/components/ui/Input'
import Link from 'next/link'

type Step = 'attendance' | 'guest' | 'dietary' | 'note' | 'done'

export default function RSVPPage() {
  const params   = useParams()
  const router   = useRouter()
  const eventId  = params.eventId as string
  const supabase = createClient()

  const [step, setStep]               = useState<Step>('attendance')
  const [attending, setAttending]     = useState<boolean | null>(null)
  const [guestCount, setGuestCount]   = useState(0)
  const [guestName, setGuestName]     = useState('')
  const [dietary, setDietary]         = useState('')
  const [note, setNote]               = useState('')
  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState<{ status?: string } | null>(null)
  const [event, setEvent]             = useState<{ theme_title?: string; name: string; capacity: number } | null>(null)

  useEffect(() => {
    supabase.from('events').select('name, theme_title, capacity').eq('id', eventId).single()
      .then(({ data }) => setEvent(data as typeof event))

    // Pre-fill dietary from profile
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from('member_profiles').select('dietary_restrictions, default_guest_name')
        .eq('user_id', user.id).maybeSingle()
        .then(({ data }) => {
          if (data?.dietary_restrictions) setDietary(data.dietary_restrictions)
          if (data?.default_guest_name) setGuestName(data.default_guest_name)
        })
    })
  }, [eventId])

  async function handleSubmit() {
    setLoading(true)
    const form = new FormData()
    form.append('event_id', eventId)
    form.append('attending', String(attending))
    form.append('guest_count', String(guestCount))
    form.append('dietary_confirmation', dietary)
    form.append('private_note', note)
    const res = await submitRSVP(form)
    setLoading(false)
    if (res.success) { setResult(res); setStep('done') }
  }

  if (step === 'done' && result) {
    return (
      <div className="max-w-lg text-center py-20 mx-auto space-y-6">
        <div className="w-px h-16 bg-antique-gold/30 mx-auto" />
        <h1 className="font-serif text-headline text-bone font-light">
          {result.status === 'confirmed'
            ? 'We look forward to seeing you.'
            : result.status === 'waitlisted'
            ? 'You are on standby consideration.'
            : 'Your response has been noted.'}
        </h1>
        <p className="text-body-sm text-ash leading-relaxed">
          {result.status === 'confirmed'
            ? 'Your seat has been held. Details and any final notes will follow closer to the evening.'
            : result.status === 'waitlisted'
            ? 'The table is fully composed. You will hear from us directly if a seat becomes available.'
            : 'Thank you for letting us know.'}
        </p>
        <Link href="/members/events" className="text-caption tracking-widest uppercase text-antique-gold/60 hover:text-antique-gold transition-colors">
          Return to events
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg space-y-10">
      <div>
        <Link href="/members/events" className="text-caption text-ash hover:text-bone transition-colors tracking-widest uppercase mb-4 block">← Events</Link>
        <h1 className="font-serif text-headline text-bone font-light">
          {event?.theme_title ?? event?.name ?? 'RSVP'}
        </h1>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {(['attendance', 'guest', 'dietary', 'note'] as Step[]).map((s, i) => (
          <div key={s} className={`h-0.5 flex-1 transition-colors ${
            ['attendance', 'guest', 'dietary', 'note', 'done'].indexOf(step) >= i
              ? 'bg-antique-gold/50' : 'bg-antique-gold/10'
          }`} />
        ))}
      </div>

      {/* Step 1: Attendance */}
      {step === 'attendance' && (
        <div className="space-y-6">
          <h2 className="font-serif text-title text-bone font-light">Will you be joining us?</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Yes, I will be there.', value: true },
              { label: 'Regretfully, no.', value: false },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => { setAttending(opt.value); setStep(opt.value ? 'guest' : 'done') }}
                className={`border p-5 text-left text-body-sm transition-all ${
                  attending === opt.value
                    ? 'border-antique-gold/60 text-bone bg-antique-gold/5'
                    : 'border-antique-gold/15 text-ash hover:border-antique-gold/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Guest */}
      {step === 'guest' && (
        <div className="space-y-6">
          <h2 className="font-serif text-title text-bone font-light">Will you be bringing a guest?</h2>
          <p className="text-body-sm text-ash">Guest requests are subject to approval and seat availability.</p>
          <div className="grid grid-cols-2 gap-3">
            {[{ label: 'Just me.', count: 0 }, { label: 'One guest.', count: 1 }].map((opt) => (
              <button
                key={opt.count}
                onClick={() => setGuestCount(opt.count)}
                className={`border p-5 text-left text-body-sm transition-all ${
                  guestCount === opt.count
                    ? 'border-antique-gold/60 text-bone bg-antique-gold/5'
                    : 'border-antique-gold/15 text-ash hover:border-antique-gold/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {guestCount === 1 && (
            <Input
              label="Guest name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your guest's full name"
            />
          )}
          <button
            onClick={() => setStep('dietary')}
            className="text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-8 py-3 hover:border-antique-gold/60 transition-all"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 3: Dietary */}
      {step === 'dietary' && (
        <div className="space-y-6">
          <h2 className="font-serif text-title text-bone font-light">Dietary confirmation.</h2>
          <p className="text-body-sm text-ash">Pre-filled from your profile. Update as needed for this evening.</p>
          <Textarea
            label="Dietary restrictions and hard nos"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            placeholder="None, or describe any restrictions or allergies"
            rows={3}
          />
          <button
            onClick={() => setStep('note')}
            className="text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-8 py-3 hover:border-antique-gold/60 transition-all"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 4: Private note */}
      {step === 'note' && (
        <div className="space-y-6">
          <h2 className="font-serif text-title text-bone font-light">A note to the host.</h2>
          <p className="text-body-sm text-ash">Optional. Celebrating something? A preference for this evening? Let us know.</p>
          <Textarea
            label="Private note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything you'd like us to know for this evening…"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-8 py-3 hover:border-antique-gold/60 transition-all disabled:opacity-40"
          >
            {loading ? 'Confirming…' : 'Confirm RSVP'}
          </button>
        </div>
      )}
    </div>
  )
}
