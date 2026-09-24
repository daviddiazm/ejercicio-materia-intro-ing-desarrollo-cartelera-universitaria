'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase, type Evento, categories, categoryStyles } from '@/lib/supabase'
import { Bell, CalendarDays, ChevronRight, Clock3, MapPin, Search, Sparkles, UserRound } from 'lucide-react'

// const fallbackEvents: Evento[] = [
//   { id: '1', titulo: 'Foro de innovación y futuro sostenible', descripcion: 'Conoce las ideas que están transformando nuestra universidad y el mundo.', categoria: 'Investigación', fecha_evento: '2026-10-08T10:00:00', lugar: 'Auditorio Central', es_virtual: false, link_virtual: null, afiche_url: null, cupos_maximos: 120, estado: 'aprobado', organizador_id: null },
//   { id: '2', titulo: 'Taller: Diseña tu portafolio profesional', descripcion: 'Una sesión práctica para presentar tu talento con claridad y confianza.', categoria: 'Académico', fecha_evento: '2026-10-12T16:00:00', lugar: 'Sala Creativa 204', es_virtual: false, link_virtual: null, afiche_url: null, cupos_maximos: 35, estado: 'aprobado', organizador_id: null },
//   { id: '3', titulo: 'Festival de talentos universitarios', descripcion: 'Música, danza y arte en una noche para celebrar nuestra comunidad.', categoria: 'Cultural', fecha_evento: '2026-10-18T18:30:00', lugar: 'Plaza de la Cultura', es_virtual: false, link_virtual: null, afiche_url: null, cupos_maximos: null, estado: 'aprobado', organizador_id: null },
// ]

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value)).replace('.', '')
}

function EventCard({ event }: { event: Evento }) {
  const accent = event.category === 'Cultural' ? 'from-violet-500 to-indigo-500' : event.category === 'Académico' ? 'from-blue-600 to-cyan-400' : 'from-emerald-500 to-teal-400'
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className={`relative h-44 bg-gradient-to-br ${accent} p-5`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 0 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        {/* <div className="absolute inset-0 opacity-20" style={{ backgroundImage:` url(${event.post_img_url})`, backgroundPosition: 'no-repeat',backgroundSize: '18px 18px' }} /> */}
        <span className="relative inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{event.category}</span>
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
          <span className="text-sm font-medium opacity-90">Campus abierto</span>
          <Sparkles className="size-5 opacity-80" aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight text-slate-900 group-hover:text-blue-700">{event.title}</h3>
          <ChevronRight className="mt-1 size-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true" />
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-slate-500">{event.description}</p>
        <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 text-sm text-slate-600">
          <span className="flex items-center gap-2"><CalendarDays className="size-4 text-blue-600" aria-hidden="true" />{formatDate(event.event_date)}</span>
          <span className="flex items-center gap-2"><MapPin className="size-4 text-blue-600" aria-hidden="true" />{event.is_virtual ? 'Evento virtual' : event.site}</span>
        </div>
      </div>
    </article>
  )
}

export default function Page() {
  const [events, setEvents] = useState<Evento[]>([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function loadEvents() {
      if (!supabase) { setLoading(false); return }

      console.log(supabase);
      // const { data, error } = await supabase.from('event').select('*').eq('estado', 'aprobado').order('fecha_evento', { ascending: true })
      const { data, error } = await supabase.from('event').select('*')

      console.log(data);
      console.log(error)

      if (active && !error && data?.length) setEvents(data as Evento[])
      if (active) setLoading(false)
    }
    loadEvents()
    return () => { active = false }
  }, [])

  // const filteredEvents = useMemo(() => events.filter((event) => {
  //   const matchesQuery = `${event.title} ${event.description ?? ''}`.toLowerCase().includes(query.toLowerCase())
  //   return matchesQuery && (category === 'Todas' || event.categoria === category)
  // }), [events, query, category])

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Campus Vivo inicio">
            <span className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><CalendarDays className="size-5" aria-hidden="true" /></span>
            <span><strong className="block text-base tracking-tight">Campus Vivo</strong><span className="hidden text-xs text-slate-500 sm:block">Cartelera universitaria</span></span>
          </a>
          <nav className="flex items-center gap-2" aria-label="Navegación principal">
            <a href="#eventos" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:block">Explorar</a>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><UserRound className="size-4" aria-hidden="true" /> Ingresar</button>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-8 pt-12 lg:px-8 lg:pt-20">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700"><Bell className="size-3.5" aria-hidden="true" /> Lo que está pasando en tu campus</div>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Encuentra tu próxima <span className="text-blue-600">gran experiencia.</span></h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Eventos, convocatorias y oportunidades seleccionadas para que vivas la universidad al máximo.</p>
        </div>
        <div className="mt-9 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <label className="relative flex-1"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" /><span className="sr-only">Buscar eventos</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o palabra clave..." className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none ring-blue-500 transition placeholder:text-slate-400 focus:ring-2" /></label>
          <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"><Search className="size-4" aria-hidden="true" /> Buscar</button>
        </div>
      </section>

      <section id="eventos" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-bold tracking-tight">Próximos eventos</h2><p className="mt-1 text-sm text-slate-500">Descubre algo nuevo esta semana</p></div><div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filtrar por categoría">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition ${category === item ? 'border-blue-600 bg-blue-600 text-white' : `border-slate-200 bg-white text-slate-600 hover:border-blue-300 ${categoryStyles[item] ?? ''}`}`}>{item}</button>)}</div></div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[430px] animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : events?.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Clock3 className="mx-auto size-8 text-slate-300" />
            <p className="mt-3 font-semibold">No encontramos eventos con esos filtros.</p>
            <p className="mt-1 text-sm text-slate-500">Prueba con otra búsqueda o categoría.</p>
          </div>
        )}
      </section>
    </main>
  )
}
