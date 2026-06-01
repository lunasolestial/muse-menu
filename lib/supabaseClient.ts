// Re-exports for convenience — import from specific paths in new code.
// Server components: import { createClient } from '@/lib/supabase/server'
// Client components: import { createClient } from '@/lib/supabase/client'
export { createClient as createServerComponentClient } from './supabase/server'
export { createClient } from './supabase/client'
