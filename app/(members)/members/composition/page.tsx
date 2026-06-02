'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { saveCompositionNotes } from '@/app/actions'

type CompositionState = {
  intent:        string[]
  pace:          string
  room_loves:    string[]
  introductions: string
  roles_to_meet: string
  favorite_dinner: string
}

const EMPTY: CompositionState = {
  intent:          [],
  pace:            '',
  room_loves:      [],
  introductions:   '',
  roles_to_meet:   '',
  favorite_dinner: '',
}

const SANS = 'var(--font-dm-sans), system-ui, sans-serif'

function labelStyle(dim = false) {
  return {
    fontFamily: SANS,
    fontSize: 9,
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: dim ? 'rgba(127,122,115,0.55)' : 'rgba(127,122,115,0.75)',
    marginBottom: 12,
    display: 'block',
  }
}

function ChipToggle({
  label,
  active,
  onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: SANS,
        fontSize: 11,
        letterSpacing: '0.12em',
        padding: '8px 18px',
        border: `1px solid ${active ? 'rgba(212,175,55,0.55)' : 'rgba(212,175,55,0.14)'}`,
        color: active ? 'rgba(244,239,230,0.9)' : 'rgba(169,163,154,0.65)',
        background: active ? 'rgba(212,175,55,0.07)' : 'transparent',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

export default function CompositionPage() {
  const router = useRouter()
  const supabase = createClient()
  const [ready, setReady]   = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [data, setData]     = useState<CompositionState>(EMPTY)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: membership } = await supabase
        .from('memberships')
        .select('tier')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle()

      if (!membership || (membership.tier !== 'salon' && membership.tier !== 'patron')) {
        router.push('/members/dashboard')
        return
      }

      const { data: profile } = await supabase
        .from('member_profiles')
        .select('composition_notes')
        .eq('user_id', user.id)
        .maybeSingle()

      if (profile?.composition_notes) {
        try {
          const parsed = JSON.parse(profile.composition_notes as string)
          setData((d) => ({ ...EMPTY, ...d, ...parsed }))
        } catch {}
      }
      setReady(true)
    }
    load()
  }, [])

  function toggleMulti(key: 'intent' | 'room_loves', value: string, max?: number) {
    setData((d) => {
      const list = d[key]
      if (list.includes(value)) return { ...d, [key]: list.filter((v) => v !== value) }
      if (max && list.length >= max) return d
      return { ...d, [key]: [...list, value] }
    })
    setSaved(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const form = new FormData()
    data.intent.forEach((v) => form.append('intent[]', v))
    form.set('pace', data.pace)
    data.room_loves.forEach((v) => form.append('room_loves[]', v))
    form.set('introductions', data.introductions)
    form.set('roles_to_meet', data.roles_to_meet)
    form.set('favorite_dinner', data.favorite_dinner)
    await saveCompositionNotes(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!ready) return null

  const inputCls: React.CSSProperties = {
    fontFamily: SANS,
    fontSize: 13,
    width: '100%',
    background: 'transparent',
    border: '1px solid rgba(212,175,55,0.18)',
    color: 'rgba(244,239,230,0.85)',
    padding: '12px 16px',
    outline: 'none',
    lineHeight: 1.6,
    resize: 'vertical' as const,
  }

  return (
    <div className="max-w-2xl space-y-12">
      <div className="border-b border-antique-gold/10 pb-8">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">Concierge Intake</p>
        <h1 className="font-serif text-headline text-bone font-light">Composition Notes.</h1>
        <p className="text-body-sm text-ash mt-2">
          Not a personality quiz. A brief so we can compose your evening with intention.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-14">

        {/* Intent */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-title text-bone font-light">What brings you to the table?</h2>
            <p className="text-body-sm text-fog mt-1">Choose up to two.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Conversation', 'Celebration', 'Creative connection', 'Romance', 'Restoration'].map((v) => (
              <ChipToggle
                key={v}
                label={v}
                active={data.intent.includes(v)}
                onClick={() => toggleMulti('intent', v, 2)}
              />
            ))}
          </div>
        </section>

        {/* Social pace */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-title text-bone font-light">Your preferred social pace.</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { value: 'soft',      label: 'Soft + intimate' },
              { value: 'balanced',  label: 'Balanced' },
              { value: 'energetic', label: 'Energetic' },
            ].map(({ value, label }) => (
              <ChipToggle
                key={value}
                label={label}
                active={data.pace === value}
                onClick={() => { setData((d) => ({ ...d, pace: value })); setSaved(false) }}
              />
            ))}
          </div>
        </section>

        {/* Room loves */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-title text-bone font-light">What you love in a room.</h2>
            <p className="text-body-sm text-fog mt-1">Select all that resonate.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Art / design', 'Culture', 'Business / founder energy', 'Food / wine depth', 'Music / scene'].map((v) => (
              <ChipToggle
                key={v}
                label={v}
                active={data.room_loves.includes(v)}
                onClick={() => toggleMulti('room_loves', v)}
              />
            ))}
          </div>
        </section>

        {/* Introductions */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-title text-bone font-light">Open to being introduced?</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { value: 'yes',     label: 'Yes' },
              { value: 'depends', label: 'Depends' },
              { value: 'no',      label: 'No' },
            ].map(({ value, label }) => (
              <ChipToggle
                key={value}
                label={label}
                active={data.introductions === value}
                onClick={() => { setData((d) => ({ ...d, introductions: value })); setSaved(false) }}
              />
            ))}
          </div>
        </section>

        {/* Roles to meet */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-title text-bone font-light">Roles you'd love to meet.</h2>
            <p className="text-body-sm text-fog mt-1">Optional. Creator, chef, founder, artist, brand partner, etc.</p>
          </div>
          <textarea
            name="roles_to_meet"
            value={data.roles_to_meet}
            onChange={(e) => { setData((d) => ({ ...d, roles_to_meet: e.target.value })); setSaved(false) }}
            placeholder="As specific or open as you like"
            rows={3}
            style={inputCls}
          />
        </section>

        {/* Favourite Muse Dinner */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-title text-bone font-light">Your most enjoyed Muse Dinner so far.</h2>
            <p className="text-body-sm text-fog mt-1">Optional. And why.</p>
          </div>
          <textarea
            name="favorite_dinner"
            value={data.favorite_dinner}
            onChange={(e) => { setData((d) => ({ ...d, favorite_dinner: e.target.value })); setSaved(false) }}
            placeholder="The evening, and what made it."
            rows={4}
            style={inputCls}
          />
        </section>

        <div className="flex items-center gap-4 border-t border-antique-gold/10 pt-8">
          <button
            type="submit"
            disabled={saving}
            className="border border-antique-gold/30 text-bone text-caption tracking-widest uppercase px-8 py-3 hover:border-antique-gold/60 transition-all disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save notes'}
          </button>
          {saved && <span className="text-body-sm text-antique-gold/70 font-serif italic">Saved.</span>}
        </div>

      </form>
    </div>
  )
}
