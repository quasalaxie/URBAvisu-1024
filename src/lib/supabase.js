import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vtohthfqdxfogpibqaho.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0b2h0aGZxZHhmb2dwaWJxYWhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1Mzk3OTksImV4cCI6MjA2OTExNTc5OX0.ASIJvGcNd_jkDYPlOwN5n_1QgmFxtcDRUOHrVLj9upU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})