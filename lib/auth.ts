import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'
import type { UserRole, Database } from './database.types'

type UserRow = Database['public']['Tables']['users']['Row']

export async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getCurrentUser(): Promise<UserRow | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return data as UserRow | null
}

export async function getUserRole(): Promise<UserRole> {
  const user = await getCurrentUser()
  return user?.role ?? 'public'
}

export async function requireAuth(redirectTo = '/login') {
  const session = await getSession()
  if (!session) redirect(redirectTo)
  return session
}

export async function requireMember(): Promise<UserRow> {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.role !== 'member' && user.role !== 'admin') redirect('/membership')
  return user as UserRow
}

export async function requireAdmin(): Promise<UserRow> {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.role !== 'admin') redirect('/')
  return user as UserRow
}

type MembershipRow    = Database['public']['Tables']['memberships']['Row']
type MemberProfileRow = Database['public']['Tables']['member_profiles']['Row']

export async function getActiveMembership(userId: string): Promise<MembershipRow | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('memberships')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle()
  return data as MembershipRow | null
}

export async function getMemberProfile(userId: string): Promise<MemberProfileRow | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('member_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()
  return data as MemberProfileRow | null
}
