import { Search } from 'lucide-react'
import React from 'react'

interface SearchProps {
  query: string,
  setQuery: (query:string) => void
}


const SearchEvents = ({query, setQuery}: SearchProps) => {
  return (
    <div className="mt-9 flex max-w-3xl flex-col gap-3 sm:flex-row">
      <label className="relative flex-1">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <span className="sr-only">Buscar eventos</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o palabra clave..." className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none ring-blue-500 transition placeholder:text-slate-400 focus:ring-2" />
      </label>
      <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"><Search className="size-4" aria-hidden="true" /> Buscar</button>
    </div>
  )
}

export default SearchEvents