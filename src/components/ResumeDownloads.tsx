import { asset, profile } from '../lib/content'

export default function ResumeDownloads({ compact = false }: { compact?: boolean }) {
  const list = compact ? profile.resumes.slice(0, 1) : profile.resumes
  return (
    <ul className={compact ? '' : 'divide-y divide-rule border-y border-rule'}>
      {list.map((r) => (
        <li key={r.file} className={compact ? '' : 'flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between'}>
          {!compact && (
            <div>
              <p className="font-medium">{r.label}</p>
              <p className="text-sm text-ink-soft">{r.description}</p>
            </div>
          )}
          <a href={asset(r.file)} download
            className="btn inline-flex w-fit items-center rounded bg-accent px-4 py-2 font-medium text-on-accent no-underline hover:bg-accent-strong hover:text-on-accent">
            {compact ? 'Download CV (PDF)' : 'Download PDF'}<span aria-hidden className="cta-arrow ml-2">→</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
