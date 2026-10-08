import type { Testimonial } from '../types'

export default function TestimonialQuote({ t }: { t: Testimonial }) {
  return (
    <figure className="border-l-4 border-accent pl-5">
      <blockquote className="text-[1.05rem] italic leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="mt-3 text-sm">
        <span className="font-medium">{t.author}</span>, {t.role}
        <span className="block text-ink-soft">{t.context}, {t.date}</span>
      </figcaption>
    </figure>
  )
}
