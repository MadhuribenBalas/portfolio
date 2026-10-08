import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { prefersReducedMotion } from '../lib/motion'

/** Counts from 0 to `value` when it scrolls into view. Screen readers get the final number straight away. */
export default function CountUp({ value, suffix = '', duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) { setN(value); return }
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      <span aria-hidden="true" className="tabular-nums">{n.toLocaleString('en-US')}{suffix}</span>
      <span className="sr-only">{value.toLocaleString('en-US')}{suffix}</span>
    </span>
  )
}
