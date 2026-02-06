import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://brkaqoybslwapzjazyyj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJya2Fxb3lic2x3YXB6amF6eXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3OTcxNzcsImV4cCI6MjA4NTM3MzE3N30.ssdVoRZq6cJsYvNPiOSBtt7_jaBLegk2JNQT7FFEyug'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
