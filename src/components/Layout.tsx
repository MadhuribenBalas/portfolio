import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { profile } from '../lib/content'
import ScrollProgress from './ScrollProgress'

const NAV = [
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/case-studies', label: 'Case studies' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/testimonials', label: 'Recognition' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // New page: scroll to top, close the mobile menu, move focus to the main content
  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2">
        Skip to content
      </a>

      <header className={`site-header sticky top-0 z-50 border-b border-rule bg-paper ${scrolled ? 'scrolled' : ''}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <Link to="/" viewTransition className="text-lg font-semibold text-accent no-underline hover:text-accent-strong">
            {profile.name}
          </Link>
          <button type="button" className="rounded border border-rule px-3 py-1.5 text-sm font-medium md:hidden"
            aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((o) => !o)}>
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <nav id="site-nav" aria-label="Main" className={`${menuOpen ? 'block' : 'hidden'} absolute left-0 right-0 top-[61px] z-40 border-b border-rule bg-paper md:static md:block md:border-0`}>
            <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6 md:flex-row md:gap-1 md:p-0">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} viewTransition
                    className={({ isActive }) => `nav-link block rounded px-3 py-2 text-[0.95rem] no-underline md:py-1.5 ${isActive ? 'active font-medium text-accent' : 'text-ink hover:text-accent'}`}>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 outline-none sm:px-6 sm:py-14">
        <Outlet />
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-ink-soft sm:flex-row sm:justify-between sm:px-6">
          <p>{profile.name}, {profile.title}</p>
          <p className="flex gap-5">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
