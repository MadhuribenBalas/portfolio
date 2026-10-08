import type { Project } from '../types'
import { formatRange } from '../lib/format'
import Reveal from './Reveal'
import OrgLogo from './OrgLogo'

/** One project in the list. The whole row opens the details dialog. */
export default function ProjectRow({ project, onOpen, index = 0 }: { project: Project; onOpen: (p: Project) => void; index?: number }) {
  return (
    <Reveal as="li" delay={Math.min(index, 5) * 70} className="row-hover grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
      style={{ viewTransitionName: `project-${project.id}` }}>
      <p className="text-sm text-ink-soft">{formatRange(project.start, project.end, project.duration)}</p>
      <div className="flex gap-4">
        <OrgLogo id={project.clientId} className="mt-0.5" />
        <div className="min-w-0">
        <h3 className="text-lg font-semibold">
          <button type="button" onClick={() => onOpen(project)}
            className="text-left text-link underline decoration-rule decoration-2 underline-offset-4 hover:text-accent hover:decoration-accent">
            {project.name}
          </button>
        </h3>
        <p className="text-sm text-ink-soft">{project.client}, {project.role}</p>
        <p className="mt-2 max-w-3xl">{project.summary}</p>
        {project.metrics.length > 0 && (
          <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-pass">
            {project.metrics.map((m) => <span key={m}>✓ {m}</span>)}
          </p>
        )}
        </div>
      </div>
    </Reveal>
  )
}
