'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updateMemberProfile } from '@/app/actions'
import { Input, Textarea, Select } from '@/components/ui/Input'

export default function ProfilePage() {
  const supabase = createClient()
  const [saved, setSaved]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    dietary_restrictions: '',
    hard_nos: '',
    favorite_flavors: '',
    dislikes: '',
    seating_preferences: '',
    celebration_notes: '',
    accessibility_needs: '',
    conversation_preferences: '',
    default_guest_name: '',
    default_guest_notes: '',
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from('member_profiles').select('*').eq('user_id', user.id).maybeSingle()
        .then(({ data }) => { if (data) setProfile((p) => ({ ...p, ...(data as typeof p) })) })
    })
  }, [])

  function handleChange(key: string, value: string) {
    setProfile((p) => ({ ...p, [key]: value }))
    setSaved(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    await updateMemberProfile(form)
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const sections = [
    {
      title: 'At the table',
      subtitle: 'How you eat, what you love, what we should know.',
      fields: [
        { key: 'dietary_restrictions', label: 'Dietary restrictions & allergies', type: 'textarea', placeholder: 'Any allergies, intolerances, or dietary needs' },
        { key: 'hard_nos', label: 'Hard nos', type: 'textarea', placeholder: 'Ingredients or foods you will never eat' },
        { key: 'favorite_flavors', label: 'Favorite flavors & ingredients', type: 'textarea', placeholder: 'What excites you on a menu?' },
        { key: 'dislikes', label: 'Dislikes', type: 'textarea', placeholder: "What you'd rather not encounter (but not hard nos)" },
      ],
    },
    {
      title: 'The room',
      subtitle: 'How we seat and consider you.',
      fields: [
        { key: 'seating_preferences', label: 'Seating preference', type: 'select', options: [
          { value: '', label: 'No preference' },
          { value: 'quiet_corner', label: 'Quiet corner — I prefer less foot traffic' },
          { value: 'social', label: 'Social — I want to be in the middle of things' },
          { value: 'new_faces', label: 'New faces — seat me near people I don\'t know' },
          { value: 'familiar', label: 'Familiar — I prefer known company' },
        ]},
        { key: 'conversation_preferences', label: 'Conversation preferences', type: 'textarea', placeholder: 'Topics you love, topics you\'d rather not be introduced to' },
      ],
    },
    {
      title: 'Moments',
      subtitle: 'So we can acknowledge what matters.',
      fields: [
        { key: 'celebration_notes', label: 'Celebration notes', type: 'textarea', placeholder: 'Birthdays, anniversaries, milestones we should know about' },
        { key: 'accessibility_needs', label: 'Accessibility needs', type: 'textarea', placeholder: 'Anything that would make your evening more comfortable' },
      ],
    },
    {
      title: 'Your guest',
      subtitle: 'Default guest information, pre-filled for RSVPs.',
      fields: [
        { key: 'default_guest_name', label: 'Default guest name', type: 'input', placeholder: 'Their full name' },
        { key: 'default_guest_notes', label: 'Default guest notes', type: 'textarea', placeholder: 'Their dietary needs or anything we should know' },
      ],
    },
  ]

  return (
    <div className="max-w-2xl space-y-12">
      <div className="border-b border-antique-gold/10 pb-8">
        <p className="text-caption tracking-widest uppercase text-antique-gold/50 mb-2">Member Profile</p>
        <h1 className="font-serif text-headline text-bone font-light">Your preferences.</h1>
        <p className="text-body-sm text-ash mt-2">
          This is how we remember you. Every field is optional and entirely private.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-14">
        {sections.map((section) => (
          <section key={section.title} className="space-y-6">
            <div>
              <h2 className="font-serif text-title text-bone font-light">{section.title}</h2>
              <p className="text-body-sm text-fog mt-1">{section.subtitle}</p>
            </div>
            <div className="space-y-5">
              {section.fields.map((field) => {
                if (field.type === 'select' && field.options) {
                  return (
                    <Select
                      key={field.key}
                      name={field.key}
                      label={field.label}
                      value={profile[field.key as keyof typeof profile]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    >
                      {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Select>
                  )
                }
                if (field.type === 'textarea') {
                  return (
                    <Textarea
                      key={field.key}
                      name={field.key}
                      label={field.label}
                      placeholder={field.placeholder}
                      value={profile[field.key as keyof typeof profile]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      rows={3}
                    />
                  )
                }
                return (
                  <Input
                    key={field.key}
                    name={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={profile[field.key as keyof typeof profile]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                )
              })}
            </div>
          </section>
        ))}

        <div className="flex items-center gap-4 border-t border-antique-gold/10 pt-8">
          <button
            type="submit"
            disabled={loading}
            className="border border-antique-gold/30 text-bone text-caption tracking-widest uppercase px-8 py-3 hover:border-antique-gold/60 transition-all disabled:opacity-40"
          >
            {loading ? 'Saving…' : 'Save profile'}
          </button>
          {saved && <span className="text-body-sm text-antique-gold/70 font-serif italic">Saved.</span>}
        </div>
      </form>
    </div>
  )
}
