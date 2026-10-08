import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CountUp from '../components/CountUp'
import ResumeDownloads from '../components/ResumeDownloads'
import Reveal from '../components/Reveal'
import TestimonialQuote from '../components/TestimonialQuote'
import TestRunConsole from '../components/TestRunConsole'
import LogoMarquee from '../components/LogoMarquee'
import { asset, caseStudies, certifications, profile, testimonials } from '../lib/content'

export default function Home() {
  useEffect(() => { document.title = `${profile.name} – ${profile.title}` }, [])
  const badges = certifications.filter((c) => c.badge)

  return (
    <>
      <section className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="hero-glow" aria-hidden />
        <div className="hero-in relative z-10">
          {profile.photo && (
            <img src={asset(`photo/${profile.photo}`)} alt={profile.photoAlt ?? profile.name}
              className="portrait mb-6 h-32 w-32 rounded-full bg-white object-cover sm:h-40 sm:w-40" width={160} height={160} fetchPriority="high" />
          )}
          <h1 className="text-5xl font-bold tracking-tight text-ink sm:text-6xl">{profile.name}</h1>
          <p className="mt-4 font-display text-xl font-medium text-accent sm:text-2xl">{profile.title}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-medium text-ink">
            <span className="open-dot h-2 w-2 rounded-full bg-accent" aria-hidden />
            Open to Senior and Lead QA roles
          </p>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{profile.tagline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <ResumeDownloads compact />
            <Link to="/projects" viewTransition className="font-medium">See all projects</Link>
          </div>
          <div className="mt-8 flex items-center gap-4">
            {badges.map((c) => (
              <a key={c.id} href={c.verifyUrl} target="_blank" rel="noopener noreferrer" title={`Verify: ${c.name}`} className="lift">
                <img src={asset(`badges/${c.badge}`)} alt={`${c.name}, verify credential`} className="h-16 w-auto rounded-md bg-white p-1" width={78} height={64} />
              </a>
            ))}
          </div>
        </div>
        <div className="hero-in hero-in-2 relative z-10"><TestRunConsole /></div>
      </section>

      <section aria-label="Career in numbers" className="mt-16 border-y border-rule">
        <dl className="grid grid-cols-2 gap-y-6 py-7 lg:grid-cols-4">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className={`px-1 ${i % 2 ? 'pl-6' : ''} lg:pl-6 ${i === 0 ? 'lg:pl-0' : 'lg:border-l lg:border-rule'}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-bold text-accent sm:text-5xl"><CountUp value={s.value} suffix={s.suffix} /></span>
                <span className="mt-1 block text-sm text-ink-soft" aria-hidden>{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mt-14" aria-labelledby="clients-heading">
        <Reveal as="h2" id="clients-heading" className="text-2xl font-semibold text-ink">Clients and employers</Reveal>
        <p className="mt-2 text-ink-soft">Select a client to see the projects I delivered for them.</p>
        <LogoMarquee />
      </section>

      <section className="mt-16" aria-labelledby="work-heading">
        <Reveal as="h2" id="work-heading" className="text-2xl font-semibold text-ink">Selected work</Reveal>
        <ul className="mt-6 divide-y divide-rule border-y border-rule">
          {caseStudies.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 100} className="row-hover grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <p className="text-sm text-ink-soft">{c.client}</p>
              <div>
                <h3 className="text-lg font-semibold"><Link to={`/case-studies/${c.slug}`} viewTransition>{c.title}</Link></h3>
                <p className="mt-1 max-w-3xl text-ink-soft">{c.result[0]}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-20" aria-labelledby="quotes-heading">
        <Reveal as="h2" id="quotes-heading" className="text-2xl font-semibold text-ink">What managers and clients say</Reveal>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          {testimonials.filter((t) => t.featured).slice(0, 2).map((t, i) => <Reveal key={t.id} delay={i * 150}><TestimonialQuote t={t} /></Reveal>)}
        </div>
        <p className="mt-6"><Link to="/testimonials" viewTransition>See all awards and testimonials</Link></p>
      </section>

      <Reveal as="section" className="mt-20 rounded-lg bg-mist p-6 sm:p-8" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-2xl font-semibold text-ink">Hiring for a senior or lead QA role?</h2>
        <p className="mt-2 max-w-2xl">I am open to {listRoles(profile.openTo)} roles. {profile.workPermit}</p>
        <p className="mt-5"><Link to="/contact" viewTransition className="btn inline-flex rounded bg-accent px-4 py-2 font-medium text-on-accent no-underline hover:bg-accent-strong hover:text-on-accent">Get in touch<span aria-hidden className="cta-arrow ml-2">→</span></Link></p>
      </Reveal>
    </>
  )
}

/** "A, B and C" */
function listRoles(roles: string[]) {
  return roles.length < 2 ? roles.join('') : `${roles.slice(0, -1).join(', ')} and ${roles[roles.length - 1]}`
}
