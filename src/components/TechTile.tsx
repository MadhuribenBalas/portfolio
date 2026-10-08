import { asset, techById } from '../lib/content'

/** Rounded square tile with a tool's logo (or initials) and its name underneath */
export default function TechTile({ id }: { id: string }) {
  const t = techById(id)
  if (!t) return null
  return (
    <figure className="lift flex w-[6.5rem] flex-col items-center gap-2 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-rule bg-white p-2 shadow-[0_6px_18px_-10px_rgba(0,0,0,.8)]">
        {t.logo ? (
          <img src={asset(`tech/${t.logo}`)} alt={`${t.name} logo`} className="h-full w-full object-contain" width={32} height={32} loading="lazy" />
        ) : (
          <span role="img" aria-label={`${t.name} logo`} className="font-display text-xs font-bold tracking-wide text-[#15171a]">{t.initials}</span>
        )}
      </span>
      <figcaption className="text-sm font-medium leading-snug text-ink">{t.name}</figcaption>
    </figure>
  )
}
