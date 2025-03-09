import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client only if valid URL is provided
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if we have valid Supabase credentials before creating client
const isValidUrl = (url: string) => {
  try {
    // Check if it's a placeholder or a valid URL
    return url !== 'your-supabase-url' && url.startsWith('http');
  } catch (e) {
    return false;
  }
}

// Create client only if valid URL, otherwise create a mock client
export const supabase = isValidUrl(supabaseUrl) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ data: null, error: { message: 'Invalid Supabase URL' } }),
        insert: () => ({ data: null, error: { message: 'Invalid Supabase URL' } }),
        update: () => ({ data: null, error: { message: 'Invalid Supabase URL' } }),
        delete: () => ({ data: null, error: { message: 'Invalid Supabase URL' } }),
        eq: () => ({ data: null, error: { message: 'Invalid Supabase URL' }, single: () => ({ data: null, error: { message: 'Invalid Supabase URL' } }) }),
        single: () => ({ data: null, error: { message: 'Invalid Supabase URL' } }),
      }),
      rpc: () => ({ data: null, error: { message: 'Invalid Supabase URL' } }),
    }; 