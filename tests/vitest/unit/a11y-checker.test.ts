import { describe, it, expect } from 'vitest'
import { A11yChecker } from '../../../src/core/a11y-checker'

describe('A11yChecker', () => {
  describe('Image Tests', () => {
    it('should detect missing alt attribute on images', async () => {
      document.body.innerHTML = `
        <div>
          <img src="test.jpg" />
        </div>
      `
      
      const results = await A11yChecker.check(document.body)
      expect(results.violations).toHaveLength(1)
      expect(results.violations[0]).toMatchObject({
        id: 'image-alt',
        impact: 'serious'
      })
    })

    it('should pass when image has alt attribute', async () => {
      document.body.innerHTML = `
        <div>
          <img src="test.jpg" alt="Test image" />
        </div>
      `
      
      const results = await A11yChecker.check(document.body)
      expect(results.violations).toHaveLength(0)
    })
  })

  describe('Button Tests', () => {
    it('should detect buttons without labels', async () => {
      document.body.innerHTML = `
        <div>
          <button></button>
        </div>
      `
      
      const results = await A11yChecker.check(document.body)
      expect(results.violations).toHaveLength(1)
      expect(results.violations[0]).toMatchObject({
        id: 'button-label',
        impact: 'critical'
      })
    })

    it('should pass when button has text content', async () => {
      document.body.innerHTML = `
        <div>
          <button>Click me</button>
        </div>
      `
      
      const results = await A11yChecker.check(document.body)
      expect(results.violations).toHaveLength(0)
    })

    it('should pass when button has aria-label', async () => {
      document.body.innerHTML = `
        <div>
          <button aria-label="Menu"></button>
        </div>
      `
      
      const results = await A11yChecker.check(document.body)
      expect(results.violations).toHaveLength(0)
    })
  })
}) 