export type UserRole = 'public' | 'member' | 'admin'
export type MembershipTier = 'society' | 'salon' | 'patron'
export type MembershipStatus = 'applied' | 'invited' | 'active' | 'paused' | 'rejected'
export type EventVisibility = 'public' | 'members_only'
export type EventStatus = 'draft' | 'announced' | 'invitation_release' | 'composed' | 'waitlist_only' | 'archived'
export type RSVPStatus = 'pending' | 'confirmed' | 'waitlisted' | 'declined' | 'cancelled'
export type PartnerType = 'chef' | 'vendor' | 'venue'
export type ArchiveVisibility = 'public_excerpt' | 'members_only'
export type GuestRequestStatus = 'pending' | 'approved' | 'declined'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          role: UserRole
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
        Relationships: []
      }
      memberships: {
        Row: {
          id: string
          user_id: string
          tier: MembershipTier
          status: MembershipStatus
          start_date: string | null
          end_date: string | null
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['memberships']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['memberships']['Insert']>
        Relationships: []
      }
      member_profiles: {
        Row: {
          id: string
          user_id: string
          dietary_restrictions: string | null
          hard_nos: string | null
          favorite_flavors: string | null
          dislikes: string | null
          seating_preferences: string | null
          celebration_notes: string | null
          celebration_dates: Record<string, string> | null
          accessibility_needs: string | null
          conversation_preferences: string | null
          default_guest_name: string | null
          default_guest_notes: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['member_profiles']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['member_profiles']['Insert']>
        Relationships: []
      }
      events: {
        Row: {
          id: string
          slug: string
          name: string
          date: string
          location: string
          capacity: number
          visibility: EventVisibility
          status: EventStatus
          theme_title: string | null
          muse_note_public: string | null
          muse_note_member: string | null
          menu_preview_public: string | null
          menu_full_member: string | null
          dress_note: string | null
          photo_policy: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['events']['Insert']>
        Relationships: []
      }
      rsvps: {
        Row: {
          id: string
          user_id: string
          event_id: string
          status: RSVPStatus
          guest_count: number
          dietary_confirmation: string | null
          private_note_to_host: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['rsvps']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['rsvps']['Insert']>
        Relationships: []
      }
      guest_requests: {
        Row: {
          id: string
          rsvp_id: string
          guest_name: string
          relationship_note: string | null
          status: GuestRequestStatus
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['guest_requests']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['guest_requests']['Insert']>
        Relationships: []
      }
      archive_posts: {
        Row: {
          id: string
          slug: string
          event_id: string | null
          title: string
          lede: string
          body: string
          gallery: Array<{ url: string; caption: string }>
          menu_highlights: Array<{ course: string; description: string }>
          muse_notes: string | null
          published_at: string | null
          visibility: ArchiveVisibility
        }
        Insert: Omit<Database['public']['Tables']['archive_posts']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['archive_posts']['Insert']>
        Relationships: []
      }
      partner_inquiries: {
        Row: {
          id: string
          type: PartnerType
          name: string
          brand: string | null
          email: string
          website: string | null
          credentials: string | null
          message: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['partner_inquiries']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['partner_inquiries']['Insert']>
        Relationships: []
      }
      sponsor_inquiries: {
        Row: {
          id: string
          brand: string
          contact_name: string
          email: string
          website: string | null
          budget_range: string | null
          alignment_note: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['sponsor_inquiries']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['sponsor_inquiries']['Insert']>
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: {
      user_role: UserRole
      membership_tier: MembershipTier
      membership_status: MembershipStatus
      event_visibility: EventVisibility
      event_status: EventStatus
      rsvp_status: RSVPStatus
      partner_type: PartnerType
      archive_visibility: ArchiveVisibility
      guest_request_status: GuestRequestStatus
    }
    CompositeTypes: { [_ in never]: never }
  }
}
