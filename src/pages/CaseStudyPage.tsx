import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Reveal from '../components/Reveal'
import { caseStudyBySlug, projectById } from '../lib/content'
import { formatRange } from '../lib/format'
import NotFound from './NotFound'

export default function CaseStudyPage() {
  const { slug = '' } = useParams()
  const c = caseStudyBySlug(slug)
  if (!c) return <NotFound />
  const p = projectById(c.projectId)

  return (
    <article className="max-w-3xl">
      <p className="mb-3 text-sm"><Link to="/case-studies" viewTransition>All case studies</Link></p>
      <PageTitle title={c.title} intro={`${c.client}${p ? `, ${p.role}, ${formatRange(p.start, p.end, p.duration)}` : ''}`} />
      <h2 className="text-xl font-semibold text-ink">The problem</h2>
      <p className="mt-2">{c.problem}</p>
      <h2 className="mt-10 text-xl font-semibold text-ink">What I did</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5">{c.approach.map((a, i) => <Reveal as="li" key={a} delay={i * 90}>{a}</Reveal>)}</ol>
      <h2 className="mt-10 text-xl font-semibold text-ink">The result</h2>
      <ul className="mt-3 space-y-2">{c.result.map((r, i) => <Reveal as="li" key={r} delay={i * 120} className="flex gap-2"><span aria-hidden className="font-semibold text-pass">✓</span>{r}</Reveal>)}</ul>
      <h2 className="mt-10 text-xl font-semibold text-ink">Technologies</h2>
      <p className="mt-3 flex flex-wrap gap-2">{c.technologies.map((t) => <span key={t} className="rounded border border-rule px-2 py-0.5 text-sm">{t}</span>)}</p>
      {c.note && <p className="mt-10 text-sm text-ink-soft">{c.note}</p>}
    </article>
  )
}
