import { useEffect, useState } from 'react'

/** Thin accent bar at the very top showing how far down the page you are */
export default function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? window.scrollY / max : 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return <div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-[3px] origin-left bg-accent" style={{ width: '100%', transform: `scaleX(${p})` }} />
}
