import { ICONS } from '../lib/icons'

/** Rounded rectangle with a line icon and the competency name */
export default function CompetencyChip({ name, icon }: { name: string; icon: string }) {
  return (
    <span className="flex h-full items-center gap-3 rounded-xl border border-rule bg-mist px-3.5 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[icon] ?? '' }} />
      </span>
      <span className="text-sm font-medium leading-snug">{name}</span>
    </span>
  )
}
