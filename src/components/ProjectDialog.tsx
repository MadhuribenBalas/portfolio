import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../types'
import { employerById } from '../lib/content'
import OrgLogo from './OrgLogo'
import { formatRange } from '../lib/format'

/** Project details in a native <dialog>: focus trapping, Esc to close and screen-reader support are built in */
export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (project && !d.open) d.showModal()
    if (!project && d.open) d.close()
  }, [project])

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="project-title"
      onClick={(e) => { if (e.target === ref.current) onClose() }}
      className="m-auto w-[min(44rem,calc(100%-2rem))] rounded-lg border border-rule bg-paper p-0 text-ink shadow-xl">
      {project && (
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <OrgLogo id={project.clientId} size="lg" />
              <div className="min-w-0">
                <p className="text-sm text-ink-soft">{project.client}, via {employerById(project.employerId)?.company}</p>
                <h2 id="project-title" className="mt-1 text-2xl font-semibold text-link">{project.name}</h2>
              </div>
            </div>
            <button type="button" onClick={onClose} className="rounded border border-rule px-3 py-1 text-sm hover:bg-mist">Close</button>
          </div>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-ink-soft">Role</dt><dd>{project.role}</dd>
            <dt className="text-ink-soft">When</dt><dd>{formatRange(project.start, project.end, project.duration)}</dd>
            <dt className="text-ink-soft">Domain</dt><dd>{project.domain}</dd>
          </dl>
          <p className="mt-5">{project.summary}</p>
          {project.metrics.length > 0 && (
            <>
              <h3 className="mt-6 font-semibold">Results</h3>
              <ul className="mt-2 space-y-1">
                {project.metrics.map((m) => <li key={m} className="flex gap-2"><span aria-hidden className="text-pass">✓</span>{m}</li>)}
              </ul>
            </>
          )}
          <h3 className="mt-6 font-semibold">What I did</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {project.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <h3 className="mt-6 font-semibold">Technologies</h3>
          <p className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((t) => <span key={t} className="rounded border border-rule px-2 py-0.5 text-sm">{t}</span>)}
          </p>
          {project.caseStudy && (
            <p className="mt-6"><Link to={`/case-studies/${project.caseStudy}`} onClick={onClose} className="font-medium">Read the case study</Link></p>
          )}
        </div>
      )}
    </dialog>
  )
}
