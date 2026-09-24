import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Evento = {
  id: string
  titulo: string
  descripcion: string | null
  categoria: string
  fecha_evento: string
  lugar: string | null
  es_virtual: boolean | null
  link_virtual: string | null
  afiche_url: string | null
  cupos_maximos: number | null
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  organizador_id: string | null
}

export const categories = ['Todas', 'Académico', 'Cultural', 'Deportivo', 'Investigación', 'Convocatoria']

export const categoryStyles: Record<string, string> = {
  Académico: 'bg-blue-50 text-blue-700 border-blue-100',
  Cultural: 'bg-violet-50 text-violet-700 border-violet-100',
  Deportivo: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Investigación: 'bg-amber-50 text-amber-700 border-amber-100',
  Convocatoria: 'bg-rose-50 text-rose-700 border-rose-100',
}
