import { useEffect, useState } from 'react'
import { profile } from '../lib/content'
import { prefersReducedMotion } from '../lib/motion'

const fmt = (min: number) => (min >= 60 ? `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, '0')} min` : `${min} min`)
const LINE_MS = 420

/**
 * Hero element: her career shown as a test run. Suites "pass" one by one, then the Jenkins
 * build bar shrinks from 2 h to 45 min. All text is in the DOM from the start for screen readers.
 */
export default function TestRunConsole() {
  const { testRun, highlight, stats } = profile
  const tests = stats.find((s) => /automated test/i.test(s.label))
  const clients = stats.find((s) => /client/i.test(s.label))
  const total = testRun.length
  const [step, setStep] = useState(0) // number of lines shown; total + 1 = build bar done
  const [run, setRun] = useState(0) // bump to replay

  useEffect(() => {
    if (prefersReducedMotion()) { setStep(total + 2); return }
    setStep(0)
    const timers: number[] = []
    for (let i = 1; i <= total + 2; i++) {
      const extra = i > total ? (i - total) * 900 : 0
      timers.push(window.setTimeout(() => setStep(i), 500 + i * LINE_MS + extra))
    }
    return () => timers.forEach(clearTimeout)
  }, [run, total])

  const saved = Math.floor((1 - highlight.afterMinutes / highlight.beforeMinutes) * 100)
  const afterPct = (highlight.afterMinutes / highlight.beforeMinutes) * 100
  const barDone = step > total
  const finished = step > total + 1

  return (
    <figure className="overflow-hidden rounded-lg border border-rule bg-[#070808] text-[#dce3ec] shadow-[0_30px_60px_-30px_rgba(154,199,62,.35)]">
      <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#9ac73e]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4a5566]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4a5566]" aria-hidden />
        <figcaption className="ml-2 font-mono text-xs text-[#9aa7b8]">career regression run</figcaption>
      </div>

      <div className="px-4 py-4 font-mono text-[0.8rem] leading-relaxed sm:px-5 sm:text-sm">
        <p className="text-[#9aa7b8]">$ run --all-clients --parallel</p>
        <ol className="mt-2 space-y-1">
          {testRun.map((l, i) => (
            <li key={l.suite} className={`run-line flex gap-2 ${step > i ? '' : 'pending'}`}>
              <span className="text-[#9ac73e]" aria-hidden>✓</span>
              <span className="min-w-0 flex-1 truncate">{l.suite}</span>
              <span className="shrink-0 text-[#9aa7b8]">{l.result}</span>
            </li>
          ))}
        </ol>

        <div className={`run-line mt-4 ${step > total - 1 ? '' : 'pending'}`}>
          <p className="text-[#9aa7b8]"># {highlight.label}</p>
          <p className="text-[#9aa7b8]"># {highlight.context}</p>
          <div className="mt-2 grid grid-cols-[3.25rem_1fr_auto] items-center gap-3 whitespace-nowrap">
            <span>before</span>
            <div className="h-2.5 rounded-sm bg-[#4a5566]" />
            <span className="text-right">{fmt(highlight.beforeMinutes)}</span>
            <span>after</span>
            <div className="h-2.5 rounded-sm bg-[#2a3547]">
              <div className="run-bar h-2.5 rounded-sm bg-[#9ac73e]" style={{ width: barDone ? `${afterPct}%` : '100%' }} />
            </div>
            <span className="text-right">{barDone ? fmt(highlight.afterMinutes) : '…'}</span>
          </div>
        </div>

        <p className={`run-line mt-4 font-medium text-[#9ac73e] ${finished ? '' : 'pending'}`}>
          PASSED: {saved}% faster build, {tests?.value.toLocaleString('en-US')}{tests?.suffix} tests across {clients?.value}{clients?.suffix} clients
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[#9aa7b8]">{finished ? <>$ <span className="caret" aria-hidden /></> : 'running…'}</p>
          <button type="button" onClick={() => setRun((r) => r + 1)} disabled={!finished}
            className="rounded border border-[#4a5566] px-2.5 py-1 font-sans text-xs text-[#dce3ec] transition hover:border-[#9aa7b8] hover:bg-[#2a3547] disabled:opacity-40">
            Run again
          </button>
        </div>
      </div>
    </figure>
  )
}
