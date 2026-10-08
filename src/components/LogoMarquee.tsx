import { Link } from 'react-router-dom'
import { clientOrgs, employers } from '../lib/content'
import OrgLogo from './OrgLogo'

const items = [
  ...clientOrgs.map((o) => ({ id: o.id, name: o.name, to: `/projects?client=${o.id}`, kind: 'Client' })),
  ...employers.map((e) => ({ id: e.orgId, name: e.company, to: '/experience', kind: 'Employer' })),
]

/**
 * Continuously scrolling strip of client and employer logos. The list is rendered twice so the
 * loop is seamless; the second copy is hidden from screen readers and keyboard focus.
 * Pauses on hover/focus; with reduced motion it becomes a static wrapped grid.
 */
export default function LogoMarquee() {
  const row = (copy: boolean) =>
    items.map((o) => (
      <li key={`${copy ? 'b' : 'a'}-${o.kind}-${o.id}`} {...(copy ? { 'aria-hidden': true, 'data-copy': '' } : {})}>
        <Link to={o.to} viewTransition tabIndex={copy ? -1 : undefined}
          className="lift flex items-center gap-3 rounded-lg border border-rule bg-mist py-2 pl-2 pr-4 no-underline hover:border-accent">
          <OrgLogo id={o.id} eager />
          <span className="whitespace-nowrap leading-tight">
            <span className="block text-sm font-semibold text-ink">{o.name}</span>
            <span className="block text-xs text-ink-soft">{o.kind}</span>
          </span>
        </Link>
      </li>
    ))
  return (
    <div className="marquee mt-6 py-2">
      <ul className="marquee-track">{row(false)}{row(true)}</ul>
    </div>
  )
}
