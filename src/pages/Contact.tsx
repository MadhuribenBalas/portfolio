import ContactForm from '../components/ContactForm'
import PageTitle from '../components/PageTitle'
import { asset, profile } from '../lib/content'

export default function Contact() {
  return (
    <>
      <PageTitle title="Contact" intro="Send a message about a role or project, or email me directly." />
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <ContactForm />
        <aside className="space-y-4 text-[0.95rem]">
          {profile.photo && (
            <div className="flex items-center gap-4 pb-2">
              <img src={asset(`photo/${profile.photo}`)} alt={profile.photoAlt ?? profile.name}
                className="portrait h-20 w-20 rounded-full bg-white object-cover" width={80} height={80} loading="lazy" />
              <p><span className="block font-display text-lg font-semibold text-ink">{profile.name}</span><span className="text-sm text-accent">{profile.title}</span></p>
            </div>
          )}
          <p><span className="block text-sm text-ink-soft">Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p><span className="block text-sm text-ink-soft">LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/madhuri6910</a></p>
          <div><span className="block text-sm text-ink-soft">Open to</span>
            <ul className="mt-1 flex flex-wrap gap-2">{profile.openTo.map((r) => <li key={r} className="rounded border border-rule bg-mist px-2 py-0.5 text-sm">{r}</li>)}</ul>
          </div>
          <p><span className="block text-sm text-ink-soft">Location</span>{profile.location}</p>
          <p><span className="block text-sm text-ink-soft">Availability</span>{profile.workPermit}</p>
        </aside>
      </div>
    </>
  )
}
