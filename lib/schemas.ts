import { z } from 'zod'

export const applySchema = z.object({
  name:  z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  city:  z.string().min(2, 'Please enter your city'),
  how_did_you_hear: z.string().optional(),
  why_muse: z.string().min(50, 'Please share a bit more — at least 50 characters').max(800),
  dietary_notes: z.string().optional(),
  referred_by: z.string().optional(),
})

export const partnerInquirySchema = z.object({
  type:        z.enum(['chef', 'vendor', 'venue']),
  name:        z.string().min(2),
  brand:       z.string().optional(),
  email:       z.string().email(),
  website:     z.string().url().optional().or(z.literal('')),
  credentials: z.string().min(20, 'Please share your background and experience'),
  message:     z.string().min(20),
})

export const sponsorInquirySchema = z.object({
  brand:          z.string().min(2),
  contact_name:   z.string().min(2),
  email:          z.string().email(),
  website:        z.string().url().optional().or(z.literal('')),
  budget_range:   z.string().optional(),
  alignment_note: z.string().min(30, 'Please describe how your brand aligns with the Muse & Menu ethos'),
})

export const rsvpSchema = z.object({
  event_id:             z.string().uuid(),
  attending:            z.boolean(),
  guest_count:          z.number().min(0).max(2),
  guest_name:           z.string().optional(),
  guest_relationship:   z.string().optional(),
  dietary_confirmation: z.string().optional(),
  private_note:         z.string().max(500).optional(),
  join_waitlist:        z.boolean().optional(),
})

export const memberProfileSchema = z.object({
  dietary_restrictions:    z.string().optional(),
  hard_nos:                z.string().optional(),
  favorite_flavors:        z.string().optional(),
  dislikes:                z.string().optional(),
  seating_preferences:     z.enum(['quiet_corner', 'social', 'new_faces', 'familiar']).optional(),
  celebration_notes:       z.string().optional(),
  accessibility_needs:     z.string().optional(),
  conversation_preferences:z.string().optional(),
  default_guest_name:      z.string().optional(),
  default_guest_notes:     z.string().optional(),
})

export type ApplyInput           = z.infer<typeof applySchema>
export type PartnerInquiryInput  = z.infer<typeof partnerInquirySchema>
export type SponsorInquiryInput  = z.infer<typeof sponsorInquirySchema>
export type RSVPInput             = z.infer<typeof rsvpSchema>
export type MemberProfileInput   = z.infer<typeof memberProfileSchema>
