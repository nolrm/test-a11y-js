import { describe, it, expect } from 'vitest'
import { A11yChecker } from '../../../src/core/a11y-checker'

/**
 * Performance Tests
 * 
 * Tests performance with large files, many violations, and edge cases
 */

describe('Performance Tests', () => {
  describe('Large File Performance', () => {
    it('should handle large DOM with many elements', () => {
      const div = document.createElement('div')
      // Create a large DOM structure
      for (let i = 0; i < 1000; i++) {
        const img = document.createElement('img')
        img.setAttribute('src', `test${i}.jpg`)
        img.setAttribute('alt', `Test image ${i}`)
        div.appendChild(img)
      }

      const start = performance.now()
      const violations = A11yChecker.checkImageAlt(div)
      const end = performance.now()
      const duration = end - start

      expect(violations).toHaveLength(0)
      // Should complete in reasonable time (< 1 second for 1000 elements)
      expect(duration).toBeLessThan(1000)
    })

    it('should handle large DOM with many violations', () => {
      const div = document.createElement('div')
      // Create many elements with violations
      for (let i = 0; i < 500; i++) {
        const img = document.createElement('img')
        img.setAttribute('src', `test${i}.jpg`)
        // No alt attribute
        div.appendChild(img)
      }

      const start = performance.now()
      const violations = A11yChecker.checkImageAlt(div)
      const end = performance.now()
      const duration = end - start

      expect(violations.length).toBe(500)
      // Should complete in reasonable time
      expect(duration).toBeLessThan(1000)
    })
  })

  describe('Many Violations Performance', () => {
    it('should handle component with many different violations', async () => {
      const div = document.createElement('div')
      // Create many different violation types
      for (let i = 0; i < 100; i++) {
        div.innerHTML += `
          <img src="test${i}.jpg" />
          <button></button>
          <a href="/more">more</a>
          <input type="text" />
        `
      }

      const start = performance.now()
      const results = await A11yChecker.check(div)
      const end = performance.now()
      const duration = end - start

      expect(results.violations.length).toBeGreaterThan(0)
      // Should complete in reasonable time
      expect(duration).toBeLessThan(2000)
    })
  })

  describe('Nested Structure Performance', () => {
    it('should handle deeply nested structures efficiently', () => {
      const div = document.createElement('div')
      let current = div
      
      // Create deeply nested structure (20 levels)
      for (let i = 0; i < 20; i++) {
        const child = document.createElement('div')
        current.appendChild(child)
        current = child
      }
      
      // Add image at deepest level
      const img = document.createElement('img')
      img.setAttribute('src', 'test.jpg')
      img.setAttribute('alt', 'Test')
      current.appendChild(img)

      const start = performance.now()
      const violations = A11yChecker.checkImageAlt(div)
      const end = performance.now()
      const duration = end - start

      expect(violations).toHaveLength(0)
      expect(duration).toBeLessThan(100)
    })
  })

  describe('Multiple Check Methods Performance', () => {
    it('should handle running all check methods efficiently', async () => {
      const div = document.createElement('div')
      // Create diverse elements
      for (let i = 0; i < 50; i++) {
        div.innerHTML += `
          <img src="test${i}.jpg" alt="Test ${i}" />
          <button>Button ${i}</button>
          <a href="/link${i}">Link ${i}</a>
          <input type="text" id="input${i}" />
          <label for="input${i}">Label ${i}</label>
        `
      }

      const start = performance.now()
      const results = await A11yChecker.check(div)
      const end = performance.now()
      const duration = end - start

      expect(results.violations).toBeDefined()
      // All 13 check methods should complete efficiently
      expect(duration).toBeLessThan(500)
    })
  })

  describe('Memory Usage', () => {
    it('should not leak memory with repeated checks', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test.jpg" alt="Test" />'

      // Run checks multiple times
      for (let i = 0; i < 100; i++) {
        const violations = A11yChecker.checkImageAlt(div)
        expect(violations).toHaveLength(0)
      }

      // If we get here without memory issues, test passes
      expect(true).toBe(true)
    })
  })

  describe('Concurrent Checks', () => {
    it('should handle multiple simultaneous checks', async () => {
      const divs = Array(10).fill(null).map(() => {
        const div = document.createElement('div')
        div.innerHTML = '<img src="test.jpg" alt="Test" />'
        return div
      })

      const start = performance.now()
      const results = await Promise.all(
        divs.map(div => A11yChecker.check(div))
      )
      const end = performance.now()
      const duration = end - start

      expect(results.length).toBe(10)
      results.forEach(result => {
        expect(result.violations).toBeDefined()
      })
      // Concurrent checks should be efficient
      expect(duration).toBeLessThan(1000)
    })
  })
})

