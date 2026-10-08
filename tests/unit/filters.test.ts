import { describe, expect, it } from 'vitest'
import { employers, organizations, projects } from '../../src/lib/content'
import { emptyFilter, filterFromParams, filterOptions, filterProjects, filterToParams, sortProjects } from '../../src/lib/filters'

describe('filterProjects', () => {
  it('returns everything with no filters', () => {
    expect(filterProjects(projects, emptyFilter)).toHaveLength(projects.length)
  })
  it('filters by company', () => {
    const r = filterProjects(projects, { ...emptyFilter, company: 'tcs' })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((p) => p.employerId === 'tcs')).toBe(true)
  })
  it('filters by technology', () => {
    const r = filterProjects(projects, { ...emptyFilter, technology: 'Appium' })
    expect(r.map((p) => p.id).sort()).toEqual(['axis-siddhi', 'itomixer'])
  })
  it('combines filters with AND', () => {
    const r = filterProjects(projects, { ...emptyFilter, company: 'sourcefuse', technology: 'Appium' })
    expect(r.map((p) => p.id)).toEqual(['itomixer'])
  })
  it('filters by client', () => {
    const r = filterProjects(projects, { ...emptyFilter, client: 'comviva' })
    expect(r.map((p) => p.id).sort()).toEqual(['bluemarble', 'neuratalk'])
  })
  it('searches text case-insensitively', () => {
    expect(filterProjects(projects, { ...emptyFilter, query: 'CHATBOT' }).map((p) => p.id)).toContain('neuratalk')
  })
  it('returns an empty list when nothing matches', () => {
    expect(filterProjects(projects, { ...emptyFilter, query: 'no-such-thing' })).toEqual([])
  })
})

describe('filterOptions', () => {
  it('lists each technology once, sorted', () => {
    const { technologies, clients } = filterOptions(projects, employers, organizations)
    expect(clients.every((c) => c.label !== c.value)).toBe(true)
    expect(new Set(technologies).size).toBe(technologies.length)
    expect(technologies).toEqual([...technologies].sort((a, b) => a.localeCompare(b)))
  })
})

describe('sortProjects', () => {
  it('puts newest first and undated projects last', () => {
    const sorted = sortProjects(projects)
    expect(sorted[0].start).toBe('2026-08')
    expect(sorted.at(-1)?.start).toBeNull()
  })
})

describe('URL round trip', () => {
  it('keeps filters when shared as a link', () => {
    const f = { company: 'sourcefuse', client: 'rakuten-mobile', technology: 'Kotlin', role: 'Senior Tester – Automation, Team Lead', query: 'mobile' }
    expect(filterFromParams(filterToParams(f))).toEqual(f)
  })
})
