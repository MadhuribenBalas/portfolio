import PageTitle from '../components/PageTitle'
import Reveal from '../components/Reveal'
import { awards, testimonialById } from '../lib/content'

export default function Testimonials() {
  const withQuotes = awards.filter((a) => a.testimonialIds.length > 0)
  const listOnly = awards.filter((a) => a.testimonialIds.length === 0)
  return (
    <>
      <PageTitle title="Awards and recognition" intro="Tester of the Quarter (Q4 2025) and 15+ client and management recognitions, quoted from the written feedback." />
      <ol className="space-y-12">
        {withQuotes.map((a, i) => (
          <Reveal as="li" key={a.id} delay={(i % 2) * 100} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <p className="text-sm text-ink-soft">{a.date}</p>
            <div className="min-w-0">
              <h2 className="text-xl font-semibold text-ink">{a.title}</h2>
              <p className="text-sm text-meta">{a.org}{a.context && <> | {a.context}</>}</p>
              <div className="mt-4 space-y-5">
                {a.testimonialIds.map((id) => {
                  const t = testimonialById(id)
                  if (!t) return null
                  return (
                    <figure key={id} className="border-l-4 border-accent pl-5">
                      <blockquote className="text-[1.05rem] italic leading-relaxed">“{t.quote}”</blockquote>
                      <figcaption className="mt-2 text-sm"><span className="font-medium">{t.author}</span>, {t.role}</figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      {listOnly.length > 0 && (
        <section className="mt-16" aria-labelledby="tcs-awards">
          <h2 id="tcs-awards" className="text-2xl font-semibold text-ink">Company awards at Tata Consultancy Services</h2>
          <p className="mt-1 text-sm text-meta">Client: Refinitiv / LSEG</p>
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {listOnly.map((a, i) => (
              <Reveal as="li" key={a.id} delay={i * 70} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <p className="text-sm text-ink-soft">{a.date}</p>
                <p className="font-medium">{a.title}</p>
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
