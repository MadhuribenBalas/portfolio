import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../components/FilterBar'
import PageTitle from '../components/PageTitle'
import ProjectDialog from '../components/ProjectDialog'
import ProjectRow from '../components/ProjectRow'
import { employers, organizations, projects } from '../lib/content'
import { filterFromParams, filterOptions, filterProjects, filterToParams, sortProjects, type ProjectFilter } from '../lib/filters'
import type { Project } from '../types'
import { withViewTransition } from '../lib/motion'

export default function Projects() {
  // Filters live in the URL (e.g. #/projects?tech=Appium) so a filtered view can be shared
  const [params, setParams] = useSearchParams()
  const filter = filterFromParams(params)
  const [open, setOpen] = useState<Project | null>(null)

  const options = useMemo(() => filterOptions(projects, employers, organizations), [])
  const results = useMemo(() => sortProjects(filterProjects(projects, filter)), [params]) // eslint-disable-line react-hooks/exhaustive-deps
  const update = (f: ProjectFilter) => withViewTransition(() => setParams(filterToParams(f), { replace: true }))

  return (
    <>
      <PageTitle title="Projects" intro="Client projects delivered through SourceFuse and Tata Consultancy Services. Filter by employer, client, technology or role, and select a project for full details." />
      <FilterBar value={filter} onChange={update} options={options} resultCount={results.length} />
      {results.length > 0 ? (
        <ul className="mt-6 divide-y divide-rule border-b border-rule">
          {results.map((p, i) => <ProjectRow key={p.id} project={p} onOpen={setOpen} index={i} />)}
        </ul>
      ) : (
        <div className="mt-10 max-w-xl">
          <p className="font-medium">No projects match these filters.</p>
          <p className="mt-1 text-ink-soft">Try a different technology, or clear the filters to see all {projects.length} projects.</p>
          <button type="button" onClick={() => update({ company: '', client: '', technology: '', role: '', query: '' })} className="mt-4 rounded border border-rule px-4 py-2 font-medium hover:bg-mist">Clear filters</button>
        </div>
      )}
      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </>
  )
}
