import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseInstance = null
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  } else {
    // Non bloccare il rendering in produzione per env mancanti
    console.warn('Supabase env vars mancanti: l\'autenticazione sarà disattivata.')
  }
} catch (e) {
  console.error('Errore inizializzazione Supabase:', e)
}

export const supabase = supabaseInstance
