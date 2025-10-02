import { createClient } from '@supabase/supabase-js'

// Reemplaza estas URLs con tus credenciales reales de Supabase
const supabaseUrl = 'https://wnezmeavwonovnpilbad.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZXptZWF2d29ub3ZucGlsYmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNzUxNDcsImV4cCI6MjA3NDk1MTE0N30.-obX2NMgzRRpG8qMA3ngnI91dn_3Ig_KdcYyGis9s6I'

export const client = createClient(supabaseUrl, supabaseKey)
