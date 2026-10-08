import { expect, test } from '@playwright/test'

test.describe('portfolio smoke tests', () => {
  test('home shows the profile and a working CV download', async ({ page, request }) => {
    await page.goto('./')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Madhuriben Balas')
    const cv = page.getByRole('link', { name: 'Download CV (PDF)' })
    const href = await cv.getAttribute('href')
    const res = await request.get(href!)
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('pdf')
  })

  test('every page has exactly one h1 and no images without alt text', async ({ page }) => {
    for (const path of ['', 'experience', 'projects', 'case-studies', 'case-studies/faster-ci-builds', 'certifications', 'testimonials', 'contact']) {
      await page.goto(`./#/${path}`)
      await expect(page.locator('h1'), path).toHaveCount(1)
      await expect(page.locator('img:not([alt])'), path).toHaveCount(0)
    }
  })

  test('project filters narrow the list and survive a reload', async ({ page }) => {
    await page.goto('./#/projects')
    await expect(page.getByText('8 projects')).toBeVisible()
    await page.getByLabel('Technology').selectOption('Appium')
    await expect(page.getByText('2 projects')).toBeVisible()
    await expect(page).toHaveURL(/tech=Appium/)
    await page.reload()
    await expect(page.getByText('2 projects')).toBeVisible()
    await page.getByRole('button', { name: 'Clear filters' }).click()
    await expect(page.getByText('8 projects')).toBeVisible()
  })

  test('a search with no results explains how to recover', async ({ page }) => {
    await page.goto('./#/projects?q=zzzz')
    await expect(page.getByText('No projects match these filters.')).toBeVisible()
  })

  test('project dialog opens, shows details and closes with Escape', async ({ page }) => {
    await page.goto('./#/projects')
    await page.getByRole('button', { name: /^Rakuten Link/ }).click()
    const dialog = page.getByRole('dialog', { name: /^Rakuten Link/ })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('400+ automated in total')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('contact form explains each missing field', async ({ page }) => {
    await page.goto('./#/contact')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.getByText('Enter your name.')).toBeVisible()
    await expect(page.getByText(/Enter an email address/)).toBeVisible()
    await expect(page.getByLabel('Your name')).toBeFocused()
  })

  test('unknown pages show a helpful not-found page', async ({ page }) => {
    await page.goto('./#/no-such-page')
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  })
})

test('mobile menu opens and navigates', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.goto('./')
  await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('link', { name: 'Certifications' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Certifications')
})

test.describe('motion', () => {
  test('hero test run finishes and can be replayed', async ({ page }) => {
    await page.goto('./')
    const again = page.getByRole('button', { name: 'Run again' })
    await expect(page.getByText('PASSED: 62% faster build, 4,500+ tests across 7+ clients')).toBeVisible({ timeout: 8000 })
    await expect(again).toBeEnabled({ timeout: 8000 })
    await again.click()
    await expect(again).toBeDisabled()
    await expect(again).toBeEnabled({ timeout: 8000 })
  })

  test('counters reach their real values', async ({ page }) => {
    await page.goto('./')
    const stats = page.getByRole('region', { name: 'Career in numbers' })
    await stats.scrollIntoViewIfNeeded()
    await expect(stats.getByText('4,500+').first()).toBeVisible()
    await expect(stats.locator('[aria-hidden="true"]').filter({ hasText: /^4,500\+$/ })).toBeVisible({ timeout: 4000 })
  })

  test('with reduced motion everything is shown at once', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    await page.goto('http://localhost:4173/')
    await expect(page.getByRole('button', { name: 'Run again' })).toBeEnabled({ timeout: 500 })
    const opacity = await page.locator('.reveal').first().evaluate((el) => getComputedStyle(el).opacity)
    expect(opacity).toBe('1')
    await ctx.close()
  })
})

test('a logo that fails to load falls back to the initials badge', async ({ page }) => {
  await page.route(/logos\/comviva\.png/, (route) => route.abort())
  await page.goto('./#/experience')
  await expect(page.getByRole('img', { name: 'Comviva' }).first()).toBeVisible()
})

test('no page scrolls sideways', async ({ page }) => {
  for (const path of ['', 'experience', 'projects', 'certifications', 'testimonials', 'contact']) {
    await page.goto(`./#/${path}`)
    await page.waitForTimeout(300)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow, `#/${path} is ${overflow}px wider than the screen`).toBeLessThanOrEqual(0)
  }
})


test('text stays light on the dark background even when a host page styles <body>', async ({ page }) => {
  await page.goto('./#/experience')
  await page.addStyleTag({ content: 'body { color: #111; }' })
  const color = await page.locator('#summary-heading + p').evaluate((el) => getComputedStyle(el).color)
  expect(color).toBe('rgb(242, 244, 245)')
})

test('home and contact pages say she is open to senior and lead roles', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByText('Open to Senior and Lead QA roles')).toBeVisible()
  await expect(page.getByText(/open to Senior Test Automation Engineer, .* and Test Automation Lead roles/)).toBeAttached()
  await expect(page.getByText(/aspiring/i)).toHaveCount(0)
  await page.goto('./#/contact')
  await expect(page.getByRole('listitem').filter({ hasText: 'QA Lead / Test Lead' })).toBeVisible()
})
