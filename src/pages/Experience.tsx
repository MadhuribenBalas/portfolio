import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import OrgLogo from '../components/OrgLogo'
import CompetencyChip from '../components/CompetencyChip'
import TechTile from '../components/TechTile'
import PageTitle from '../components/PageTitle'
import ResumeDownloads from '../components/ResumeDownloads'
import Reveal from '../components/Reveal'
import { useInView } from '../hooks/useInView'
import { asset, employers, orgById, profile, projects } from '../lib/content'
import { sortProjects } from '../lib/filters'
import { formatRange } from '../lib/format'

export default function Experience() {
  return (
    <>
      <PageTitle title="Experience" intro={profile.headline} />

      <section aria-labelledby="summary-heading" className="max-w-3xl space-y-3">
        <h2 id="summary-heading" className="text-2xl font-semibold text-ink">Professional summary</h2>
        {profile.summary.map((s) => <p key={s}>{s}</p>)}
        <p className="flex flex-wrap gap-2 pt-2">
          {profile.focusAreas.map((f) => <span key={f} className="rounded border border-rule bg-mist px-2.5 py-1 text-sm font-medium text-accent">{f}</span>)}
        </p>
      </section>

      <section className="mt-14" aria-labelledby="history-heading">
        <h2 id="history-heading" className="text-2xl font-semibold text-ink">Work experience</h2>
        <Timeline>
          {employers.map((e, i) => {
            const clientProjects = sortProjects(projects.filter((p) => p.employerId === e.id))
            return (
              <Reveal as="li" key={e.id} delay={i * 150} className="relative grid gap-2 pl-8 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <span className="timeline-dot" style={{ ['--d' as string]: `${300 + i * 250}ms` }} aria-hidden />
                <p className="text-sm text-ink-soft">{formatRange(e.start, e.end)}</p>
                <div className="min-w-0">
                  <div className="flex items-start gap-4">
                    <OrgLogo id={e.orgId} size="lg" />
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold">{e.title}</h3>
                      <p className="font-medium text-accent">{e.company}</p>
                      <p className="text-sm text-ink-soft">{e.location}. {e.summary}</p>
                    </div>
                  </div>
                  {e.clientIds.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Clients</p>
                      <ul className="mt-2 flex flex-wrap gap-3">
                        {e.clientIds.map((id) => (
                          <li key={id}>
                            <Link to={`/projects?client=${id}`} viewTransition
                              className="lift flex items-center gap-2 rounded-md border border-rule bg-paper py-1 pl-1 pr-3 text-sm no-underline hover:border-link">
                              <OrgLogo id={id} size="sm" />
                              <span>{orgById(id)?.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <ul className="mt-4 list-disc space-y-1.5 pl-5">
                    {e.highlights.map((h) => <li key={h.text}>{h.label && <span className="font-semibold">{h.label}: </span>}{h.text}</li>)}
                  </ul>
                  {clientProjects.length > 0 && (
                    <div className="mt-5 space-y-4 border-l-2 border-rule pl-4">
                      {clientProjects.map((p) => (
                        <div key={p.id}>
                          <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <Link to={`/projects?client=${p.clientId}`} viewTransition className="font-semibold">{p.name}</Link>
                            <span className="text-sm text-ink-soft">{formatRange(p.start, p.end, p.duration)}</span>
                          </p>
                          <p className="text-sm italic text-meta">
                            <span className="font-semibold">Client:</span> {p.client} | <span className="font-semibold">Role:</span> {p.role} | <span className="font-semibold">Technologies:</span> {p.technologies.join(', ')}
                          </p>
                          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[0.95rem]">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </Timeline>
      </section>

      <section className="mt-16" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-2xl font-semibold text-ink">Skills</h2>
        <h3 className="mt-6 text-lg font-semibold">Core competencies</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profile.competencies.map((c, i) => (
            <Reveal as="li" key={c.name} delay={Math.min(i, 12) * 35}><CompetencyChip name={c.name} icon={c.icon} /></Reveal>
          ))}
        </ul>

        <h3 className="mt-12 text-lg font-semibold">Tools and technologies</h3>
        <div className="mt-4 space-y-8">
          {profile.toolGroups.map((g) => (
            <div key={g.label}>
              <h4 className="text-sm font-semibold text-accent">{g.label}</h4>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-5">
                {g.tools.map((id, i) => <Reveal as="li" key={id} delay={Math.min(i, 8) * 45}><TechTile id={id} /></Reveal>)}
              </ul>
            </div>
          ))}
        </div>

        <details className="mt-10 rounded-xl border border-rule bg-mist px-4 py-3">
          <summary className="cursor-pointer font-semibold">Full technical skills list</summary>
          <dl className="mt-3 divide-y divide-rule">
            {profile.skills.map((s) => (
              <div key={s.label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-medium">{s.label}</dt>
                <dd className="text-ink-soft">{s.items}</dd>
              </div>
            ))}
          </dl>
        </details>
      </section>

      <section className="mt-16" aria-labelledby="edu-heading">
        <h2 id="edu-heading" className="text-2xl font-semibold text-ink">Education</h2>
        <ul className="mt-6 space-y-5">
          {profile.education.map((ed) => (
            <Reveal as="li" key={ed.qualification} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <p className="text-sm text-ink-soft">{ed.dates}</p>
              <div className="flex items-start gap-4">
                {ed.logo && (
                  <img src={asset(`logos/${ed.logo}`)} alt={ed.logoAlt ?? ''} className="h-16 w-16 shrink-0 rounded-md bg-white object-contain p-1" width={64} height={64} loading="lazy" />
                )}
                <div className="min-w-0">
                  <p className="font-semibold">{ed.qualification}</p>
                  <p className="font-medium text-accent">{ed.institution}</p>
                  <p className="text-sm text-meta">{ed.details}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="ach-heading">
        <h2 id="ach-heading" className="text-2xl font-semibold text-ink">Academic achievements and activities</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {profile.achievements.map((g, i) => (
            <Reveal key={g.label} delay={i * 120}>
              <h3 className="font-semibold">{g.label}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem]">{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="lang-heading">
        <h2 id="lang-heading" className="text-2xl font-semibold text-ink">Languages</h2>
        <ul className="mt-4 space-y-1">{profile.languages.map((l) => <li key={l.language}><span className="font-medium">{l.language}:</span> {l.level}</li>)}</ul>
      </section>

      <section className="mt-16" aria-labelledby="dl-heading">
        <h2 id="dl-heading" className="text-2xl font-semibold text-ink">Download my CV</h2>
        <div className="mt-4 max-w-3xl"><ResumeDownloads /></div>
      </section>
    </>
  )
}

/** Vertical line that draws itself down the work history */
function Timeline({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLOListElement>()
  return <ol ref={ref} className={`timeline mt-8 space-y-14 ${inView ? 'in' : ''}`}>{children}</ol>
}
