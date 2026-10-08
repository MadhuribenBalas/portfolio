import { useEffect } from 'react'
import { profile } from '../lib/content'

/** Sets the browser tab title and renders the page heading */
export default function PageTitle({ title, intro }: { title: string; intro?: string }) {
  useEffect(() => { document.title = `${title} – ${profile.name}` }, [title])
  return (
    <div className="mb-10 max-w-3xl">
      <h1 className="text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
      {intro && <p className="mt-3 text-lg text-ink-soft">{intro}</p>}
    </div>
  )
}
