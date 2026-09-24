import { Evento } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { CalendarDays, ChevronRight, MapPin, Sparkles } from 'lucide-react'
import React from 'react'

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

export default EventCard