import type { ProjectFilter } from '../lib/filters'
import { emptyFilter } from '../lib/filters'

interface Props {
  value: ProjectFilter
  onChange: (f: ProjectFilter) => void
  options: { companies: { value: string; label: string }[]; clients: { value: string; label: string }[]; technologies: string[]; roles: string[] }
  resultCount: number
}

const selectCls = 'mt-1 w-full rounded border border-rule bg-paper px-3 py-2 text-[0.95rem]'

export default function FilterBar({ value, onChange, options, resultCount }: Props) {
  const set = (patch: Partial<ProjectFilter>) => onChange({ ...value, ...patch })
  const active = value.company || value.client || value.technology || value.role || value.query

  return (
    <form role="search" aria-label="Filter projects" onSubmit={(e) => e.preventDefault()}
      className="rounded-lg border border-rule bg-mist p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="text-sm font-medium">Search
          <input type="search" value={value.query} onChange={(e) => set({ query: e.target.value })}
            placeholder="e.g. chatbot, banking" className={selectCls} />
        </label>
        <label className="text-sm font-medium">Employer
          <select value={value.company} onChange={(e) => set({ company: e.target.value })} className={selectCls}>
            <option value="">All employers</option>
            {options.companies.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Client
          <select value={value.client} onChange={(e) => set({ client: e.target.value })} className={selectCls}>
            <option value="">All clients</option>
            {options.clients.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Technology
          <select value={value.technology} onChange={(e) => set({ technology: e.target.value })} className={selectCls}>
            <option value="">All technologies</option>
            {options.technologies.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">Role
          <select value={value.role} onChange={(e) => set({ role: e.target.value })} className={selectCls}>
            <option value="">All roles</option>
            {options.roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 text-sm">
        <p aria-live="polite">{resultCount} {resultCount === 1 ? 'project' : 'projects'}</p>
        {active && <button type="button" onClick={() => onChange(emptyFilter)} className="font-medium text-link underline underline-offset-2 hover:text-accent">Clear filters</button>}
      </div>
    </form>
  )
}
