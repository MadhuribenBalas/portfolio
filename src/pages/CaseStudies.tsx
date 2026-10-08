import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Reveal from '../components/Reveal'
import { caseStudies, projectById } from '../lib/content'
import OrgLogo from '../components/OrgLogo'

export default function CaseStudies() {
  return (
    <>
      <PageTitle title="Case studies" intro="How I approached three testing problems, and what changed as a result. Client details are kept general to respect confidentiality." />
      <ul className="divide-y divide-rule border-y border-rule">
        {caseStudies.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 110} className="row-hover grid gap-1 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <p className="flex items-center gap-3 text-sm text-ink-soft"><OrgLogo id={projectById(c.projectId)?.clientId ?? ''} size="sm" />{c.client}</p>
            <div>
              <h2 className="text-xl font-semibold"><Link to={`/case-studies/${c.slug}`} viewTransition>{c.title}</Link></h2>
              <p className="mt-2 max-w-3xl">{c.problem}</p>
              <ul className="mt-3 space-y-1 text-sm font-medium text-pass">{c.result.slice(0, 2).map((r) => <li key={r}>✓ {r}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </ul>
    </>
  )
}
