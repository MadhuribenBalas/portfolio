import PageTitle from '../components/PageTitle'
import Reveal from '../components/Reveal'
import { asset, certifications, certificationsInProgress } from '../lib/content'
import { formatMonth } from '../lib/format'

export default function Certifications() {
  return (
    <>
      <PageTitle title="Certifications" intro="Every certification links to the issuer's own verification page." />
      <ul className="divide-y divide-rule border-y border-rule">
        {certifications.map((c, i) => (
          <Reveal as="li" key={c.id} delay={Math.min(i, 5) * 80} className="grid gap-3 py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:gap-6">
            <p className="text-sm text-ink-soft">{c.issued && formatMonth(c.issued)}</p>
            <div>
              <h2 className="text-lg font-semibold">{c.name}</h2>
              <p className="text-sm text-ink-soft">
                {c.issuer}
                {c.credentialId && <>, credential {c.credentialId}</>}
                {c.score && <>, score {c.score}</>}
              </p>
              {c.details && <p className="mt-1 text-sm text-meta">{c.details}</p>}
              <p className="mt-1 flex flex-wrap gap-x-5">
                {c.verifyUrl && <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer">Verify this credential<span className="sr-only"> (opens in a new tab)</span></a>}
                {c.links?.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}<span className="sr-only"> (opens in a new tab)</span></a>)}
              </p>
            </div>
            {c.badge ? <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="lift w-fit" tabIndex={-1} aria-hidden="true"><img src={asset(`badges/${c.badge}`)} alt="" className="h-20 w-auto rounded-md bg-white p-1" width={97} height={80} loading="lazy" /></a> : <span />}
          </Reveal>
        ))}
      </ul>

      {certificationsInProgress.length > 0 && (
        <section className="mt-14" aria-labelledby="progress-heading">
          <h2 id="progress-heading" className="text-2xl font-semibold text-ink">In progress</h2>
          <p className="mt-2 text-ink-soft">Preparing for QA leadership roles.</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {certificationsInProgress.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 100} className="rounded-lg border border-dashed border-rule p-4">
                <p className="text-sm font-medium text-link">Expected {c.expected}</p>
                <h3 className="mt-1 font-semibold">{c.name}</h3>
                <p className="text-sm text-ink-soft">{c.issuer}</p>
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
