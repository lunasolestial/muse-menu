'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import { Input, Textarea, Select } from '@/components/ui/Input'
import type { Database } from '@/lib/database.types'
import Link from 'next/link'

type EventRow = Database['public']['Tables']['events']['Row']

const STATUS_OPTIONS = ['draft', 'announced', 'invitation_release', 'composed', 'waitlist_only', 'archived']
const VISIBILITY_OPTIONS = ['public', 'members_only']

export default function EventEditorPage() {
  const params   = useParams()
  const router   = useRouter()
  const supabase = createClient()
  const isNew    = params.id === 'new'

  const [form, setForm] = useState({
    slug: '', name: '', date: '', location: '', capacity: '24',
    visibility: 'members_only', status: 'draft',
    theme_title: '', muse_note_public: '', muse_note_member: '',
    menu_preview_public: '', menu_full_member: '',
    dress_note: '', photo_policy: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)

  useEffect(() => {
    if (isNew) return
    supabase.from('events').select('*').eq('id', params.id as string).single()
      .then(({ data: rawData }) => {
        const data = rawData as EventRow | null
        if (data) setForm({
          slug: data.slug ?? '',
          name: data.name ?? '',
          date: data.date ? new Date(data.date).toISOString().slice(0, 16) : '',
          location: data.location ?? '',
          capacity: String(data.capacity ?? 24),
          visibility: data.visibility ?? 'members_only',
          status: data.status ?? 'draft',
          theme_title: data.theme_title ?? '',
          muse_note_public: data.muse_note_public ?? '',
          muse_note_member: data.muse_note_member ?? '',
          menu_preview_public: data.menu_preview_public ?? '',
          menu_full_member: data.menu_full_member ?? '',
          dress_note: data.dress_note ?? '',
          photo_policy: data.photo_policy ?? '',
        })
      })
  }, [params.id])

  function field(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    const payload = { ...form, capacity: parseInt(form.capacity, 10) } as unknown as EventRow
    if (isNew) {
      const { data: rawInserted } = await supabase.from('events').insert(payload as never).select().single()
      const inserted = rawInserted as EventRow | null
      setSaving(false)
      if (inserted) router.push(`/admin/events/${inserted.id}`)
    } else {
      await supabase.from('events').update(payload as never).eq('id', params.id as string)
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="max-w-2xl space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/events" className="text-caption text-ash hover:text-bone tracking-widest uppercase transition-colors block mb-2">← Events</Link>
          <h1 className="font-serif text-headline text-bone font-light">{isNew ? 'New event' : 'Edit event'}</h1>
        </div>
        <div className="flex items-center gap-4">
          {saved && <span className="text-body-sm text-antique-gold/70 font-serif italic">Saved.</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-6 py-2.5 hover:border-antique-gold/60 transition-all disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save event'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Core */}
        <section className="space-y-4">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50">Core details</p>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Event name" value={form.name} onChange={(e) => field('name', e.target.value)} placeholder="Internal name" />
            <Input label="Slug" value={form.slug} onChange={(e) => field('slug', e.target.value)} placeholder="url-slug" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date & time" type="datetime-local" value={form.date} onChange={(e) => field('date', e.target.value)} />
            <Input label="Location" value={form.location} onChange={(e) => field('location', e.target.value)} placeholder="Venue name" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Capacity" type="number" value={form.capacity} onChange={(e) => field('capacity', e.target.value)} />
            <Select label="Visibility" value={form.visibility} onChange={(e) => field('visibility', e.target.value)}>
              {VISIBILITY_OPTIONS.map((o) => <option key={o} value={o}>{o.replace('_', ' ')}</option>)}
            </Select>
            <Select label="Status" value={form.status} onChange={(e) => field('status', e.target.value)}>
              {STATUS_OPTIONS.map((o) => <option key={o} value={o}>{o.replace('_', ' ')}</option>)}
            </Select>
          </div>
        </section>

        {/* Content */}
        <section className="space-y-4">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50">Content</p>
          <Input label="Theme title" value={form.theme_title} onChange={(e) => field('theme_title', e.target.value)} placeholder="The evening's muse title" />
          <Textarea label="Muse note (public)" value={form.muse_note_public} onChange={(e) => field('muse_note_public', e.target.value)} placeholder="Short, poetic — shown publicly" rows={3} />
          <Textarea label="Muse note (members)" value={form.muse_note_member} onChange={(e) => field('muse_note_member', e.target.value)} placeholder="Longer, more detailed — members only" rows={4} />
          <Textarea label="Menu preview (public)" value={form.menu_preview_public} onChange={(e) => field('menu_preview_public', e.target.value)} placeholder="Teaser only" rows={3} />
          <Textarea label="Full menu (members)" value={form.menu_full_member} onChange={(e) => field('menu_full_member', e.target.value)} placeholder="Full menu courses" rows={6} />
        </section>

        {/* Notes */}
        <section className="space-y-4">
          <p className="text-caption tracking-widest uppercase text-antique-gold/50">Notes</p>
          <Input label="Dress note" value={form.dress_note} onChange={(e) => field('dress_note', e.target.value)} placeholder="e.g. Evening wear encouraged" />
          <Input label="Photo policy" value={form.photo_policy} onChange={(e) => field('photo_policy', e.target.value)} placeholder="e.g. No guest photography please" />
        </section>
      </div>
    </div>
  )
}
