import { describe, it, expect } from 'vitest'

/**
 * Core Export Integration Test
 *
 * Tests that the ./core export path works and A11yChecker is functional.
 * Uses ESM import since that's the correct path for the ./core export.
 */

describe('./core export', () => {
  it('should export A11yChecker class via ESM', async () => {
    const coreModule = await import('../../../src/core/a11y-checker')
    expect(coreModule.A11yChecker).toBeDefined()
    expect(typeof coreModule.A11yChecker).toBe('function')
  })

  it('should export A11yChecker.check as a static method', async () => {
    const { A11yChecker } = await import('../../../src/core/a11y-checker')
    expect(typeof A11yChecker.check).toBe('function')
  })

  it('should export A11yViolation and A11yResults types (module loads cleanly)', async () => {
    const coreModule = await import('../../../src/core/a11y-checker')
    expect(coreModule).toBeDefined()
  })

  it('should detect a missing alt attribute on img', async () => {
    const { A11yChecker } = await import('../../../src/core/a11y-checker')

    document.body.innerHTML = '<img src="photo.jpg">'
    const results = await A11yChecker.check(document.body)

    expect(results).toBeDefined()
    expect(results.violations.length).toBeGreaterThan(0)
    expect(results.violations[0].id).toBe('image-alt')
  })

  it('should pass for accessible HTML', async () => {
    const { A11yChecker } = await import('../../../src/core/a11y-checker')

    document.body.innerHTML = '<img src="photo.jpg" alt="A beautiful sunset">'
    const results = await A11yChecker.check(document.body)

    const imgAltViolations = results.violations.filter(v => v.id === 'image-alt')
    expect(imgAltViolations.length).toBe(0)
  })

  it('should have ESM dist export containing A11yChecker', async () => {
    // Verify the built ESM output exports A11yChecker
    const coreModule = await import('../../../dist/index.mjs')
    expect(coreModule.A11yChecker).toBeDefined()
    expect(typeof coreModule.A11yChecker).toBe('function')
  })
})
