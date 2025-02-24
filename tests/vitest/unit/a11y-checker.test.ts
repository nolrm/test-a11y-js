import { describe, it, expect } from 'vitest'
import { A11yChecker } from '../../../src/core/a11y-checker'

describe('A11yChecker', () => {
  describe('Image Tests', () => {
    it('should detect missing alt attribute on images', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<img src="test.jpg">'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(1)
      expect(results.violations[0]).toMatchObject({
        id: 'img',
        description: 'Images must have alt text for screen readers'
      })
    })

    it('should pass when image has alt attribute', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<img src="test.jpg" alt="Test image">'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(0)
    })
  })

  describe('Button Tests', () => {
    it('should detect buttons without labels', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<button></button>'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(1)
      expect(results.violations[0]).toMatchObject({
        id: 'button',
        description: 'Buttons must have text content or aria-label'
      })
    })

    it('should pass when button has text content', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<button>Click me</button>'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(0)
    })

    it('should pass when button has aria-label', () => {
      const checker = new A11yChecker()
      const container = document.createElement('div')
      container.innerHTML = '<button aria-label="Close dialog">×</button>'
      
      const results = checker.check(container)
      
      expect(results.violations).toHaveLength(0)
    })
  })
}) 