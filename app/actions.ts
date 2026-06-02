'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server'
import { applySchema, partnerInquirySchema, sponsorInquirySchema } from '@/lib/schemas'

// ── Membership application ────────────────────────────────────────────────
export async function submitApplication(formData: FormData) {
  const raw = Object.fromEntries(formData)
  const parsed = applySchema.safeParse(raw)
  if (!parsed.success) {
    return {
      error: 'Please review your responses.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Create auth user if not signed in
  let userId = user?.id
  if (!userId) {
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: crypto.randomUUID(),
      options: {
        data: { full_name: parsed.data.name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://museandmenu.com'}/auth/callback`,
      },
    })
    if (error) return { error: error.message }
    userId = data.user?.id
  }

  if (!userId) return { error: 'Could not create account. Please try again.' }

  // Upsert users row
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await supabase.from('users').upsert({ id: userId, email: parsed.data.email, name: parsed.data.name } as any)

  // Create membership record with status applied
  const { error: memberErr } = await supabase.from('memberships').insert({
    user_id: userId,
    tier: 'society',
    status: 'applied',
    notes: JSON.stringify({
      city: parsed.data.city,
      how_did_you_hear: parsed.data.how_did_you_hear,
      why_muse: parsed.data.why_muse,
      dietary_notes: parsed.data.dietary_notes,
      referred_by: parsed.data.referred_by,
    }),
  } as any)

  if (memberErr) return { error: 'Application could not be submitted. Please try again.' }
  return { success: true }
}

// ── Partner inquiry ───────────────────────────────────────────────────────
export async function submitPartnerInquiry(formData: FormData) {
  const raw = Object.fromEntries(formData)
  const parsed = partnerInquirySchema.safeParse(raw)
  if (!parsed.success) return { error: 'Please review your responses.' }

  const supabase = await createClient()
  const { error } = await supabase.from('partner_inquiries').insert(parsed.data as any)
  if (error) return { error: 'Submission failed. Please try again.' }
  return { success: true }
}

// ── Sponsor inquiry ───────────────────────────────────────────────────────
export async function submitSponsorInquiry(formData: FormData) {
  const raw = Object.fromEntries(formData)
  const parsed = sponsorInquirySchema.safeParse(raw)
  if (!parsed.success) return { error: 'Please review your responses.' }

  const supabase = await createClient()
  const { error } = await supabase.from('sponsor_inquiries').insert(parsed.data as any)
  if (error) return { error: 'Submission failed. Please try again.' }
  return { success: true }
}

// ── Member profile update ─────────────────────────────────────────────────
export async function updateMemberProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated.' }

  const updates = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => v !== '')
  )

  await supabase.from('member_profiles').upsert({ user_id: user.id, ...updates } as any)
  return { success: true }
}

// ── Composition Notes ─────────────────────────────────────────────────────
export async function saveCompositionNotes(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated.' }

  const notes = JSON.stringify({
    intent:          formData.getAll('intent[]'),
    pace:            formData.get('pace'),
    room_loves:      formData.getAll('room_loves[]'),
    introductions:   formData.get('introductions'),
    roles_to_meet:   formData.get('roles_to_meet'),
    favorite_dinner: formData.get('favorite_dinner'),
  })

  await supabase.from('member_profiles').upsert({ user_id: user.id, composition_notes: notes } as any)
  return { success: true }
}

// ── RSVP ─────────────────────────────────────────────────────────────────
export async function submitRSVP(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated.' }

  const eventId    = formData.get('event_id') as string
  const attending  = formData.get('attending') === 'true'
  const guestCount = parseInt(formData.get('guest_count') as string ?? '0', 10)

  // Check capacity
  const { data: event } = await supabase.from('events').select('capacity').eq('id', eventId).single()
  const { count: rsvpCount } = await supabase
    .from('rsvps').select('*', { count: 'exact', head: true })
    .eq('event_id', eventId).eq('status', 'confirmed')

  const atCapacity = event && rsvpCount !== null && rsvpCount >= event.capacity
  const status = !attending ? 'declined' : atCapacity ? 'waitlisted' : 'confirmed'

  const { error } = await supabase.from('rsvps').upsert({
    user_id:              user.id,
    event_id:             eventId,
    status,
    guest_count:          guestCount,
    dietary_confirmation: formData.get('dietary_confirmation') as string,
    private_note_to_host: formData.get('private_note') as string,
  } as any, { onConflict: 'user_id,event_id' })

  if (error) return { error: 'RSVP could not be saved. Please try again.' }
  return { success: true, status }
}
