import { describe, it, expect } from 'vitest'
import { A11yChecker } from '../../../src/core/a11y-checker'

/**
 * Error Handling Tests
 * 
 * Tests edge cases, malformed data, and error scenarios
 */

describe('Error Handling', () => {
  describe('Null and Undefined Handling', () => {
    it('should throw error for null element', () => {
      // @ts-expect-error - Testing error handling
      expect(() => A11yChecker.checkImageAlt(null)).toThrow()
    })

    it('should throw error for undefined element', () => {
      // @ts-expect-error - Testing error handling
      expect(() => A11yChecker.checkImageAlt(undefined)).toThrow()
    })

    it('should handle empty element', () => {
      const emptyDiv = document.createElement('div')
      const violations = A11yChecker.checkImageAlt(emptyDiv)
      expect(violations).toHaveLength(0)
    })
  })

  describe('Malformed HTML', () => {
    it('should handle malformed HTML strings', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test.jpg" alt="Test"'
      // Missing closing bracket - browser will still parse it
      const violations = A11yChecker.checkImageAlt(div)
      // Should still work with browser-parsed HTML
      expect(violations).toBeDefined()
    })

    it('should handle unclosed tags', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test.jpg" alt="Test">'
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations).toHaveLength(0)
    })
  })

  describe('Empty Values', () => {
    it('should handle empty alt attribute', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test.jpg" alt="" />'
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations[0].id).toBe('image-alt')
    })

    it('should handle whitespace-only alt attribute', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test.jpg" alt="   " />'
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations.length).toBeGreaterThan(0)
    })

    it('should handle empty button text', () => {
      const div = document.createElement('div')
      div.innerHTML = '<button></button>'
      const violations = A11yChecker.checkButtonLabel(div)
      expect(violations.length).toBeGreaterThan(0)
    })

    it('should handle whitespace-only button text', () => {
      const div = document.createElement('div')
      div.innerHTML = '<button>   </button>'
      const violations = A11yChecker.checkButtonLabel(div)
      expect(violations.length).toBeGreaterThan(0)
    })
  })

  describe('Missing Attributes', () => {
    it('should handle elements with no attributes', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img />'
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations.length).toBeGreaterThan(0)
    })

    it('should handle iframe without src', () => {
      const div = document.createElement('div')
      div.innerHTML = '<iframe></iframe>'
      const violations = A11yChecker.checkIframeTitle(div)
      expect(violations.length).toBeGreaterThan(0)
    })
  })

  describe('Invalid Element Types', () => {
    it('should handle checking non-existent elements', () => {
      const div = document.createElement('div')
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations).toHaveLength(0)
    })

    it('should handle checking wrong element type', () => {
      const div = document.createElement('div')
      div.innerHTML = '<div>Not an image</div>'
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations).toHaveLength(0)
    })
  })

  describe('Nested Edge Cases', () => {
    it('should handle deeply nested elements', () => {
      const div = document.createElement('div')
      div.innerHTML = `
        <div>
          <div>
            <div>
              <div>
                <img src="test.jpg" alt="Nested image" />
              </div>
            </div>
          </div>
        </div>
      `
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations).toHaveLength(0)
    })

    it('should handle elements with many siblings', () => {
      const div = document.createElement('div')
      const html = Array(100).fill('<img src="test.jpg" alt="Image" />').join('')
      div.innerHTML = html
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations).toHaveLength(0)
    })
  })

  describe('Special Characters', () => {
    it('should handle alt text with special characters', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test.jpg" alt="Image &amp; Text &lt;special&gt;" />'
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations).toHaveLength(0)
    })

    it('should handle unicode characters in alt text', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test.jpg" alt="图片 🎨 émoji" />'
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations).toHaveLength(0)
    })
  })

  describe('Dynamic Content Edge Cases', () => {
    it('should handle elements added after initial check', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test1.jpg" alt="First" />'
      
      const violations1 = A11yChecker.checkImageAlt(div)
      expect(violations1).toHaveLength(0)
      
      // Add another image
      const img2 = document.createElement('img')
      img2.setAttribute('src', 'test2.jpg')
      div.appendChild(img2)
      
      const violations2 = A11yChecker.checkImageAlt(div)
      expect(violations2.length).toBeGreaterThan(0)
    })

    it('should handle removed elements', () => {
      const div = document.createElement('div')
      div.innerHTML = '<img src="test.jpg" alt="Test" /><img src="test2.jpg" />'
      
      const violations1 = A11yChecker.checkImageAlt(div)
      expect(violations1.length).toBeGreaterThan(0)
      
      // Remove the problematic image
      const img2 = div.querySelector('img[src="test2.jpg"]')
      if (img2) {
        div.removeChild(img2)
      }
      
      const violations2 = A11yChecker.checkImageAlt(div)
      expect(violations2).toHaveLength(0)
    })
  })

  describe('Multiple Violations of Same Type', () => {
    it('should detect all instances of same violation', () => {
      const div = document.createElement('div')
      div.innerHTML = `
        <img src="test1.jpg" />
        <img src="test2.jpg" />
        <img src="test3.jpg" />
      `
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations.length).toBe(3)
    })

    it('should handle mix of valid and invalid elements', () => {
      const div = document.createElement('div')
      div.innerHTML = `
        <img src="test1.jpg" alt="Valid" />
        <img src="test2.jpg" />
        <img src="test3.jpg" alt="Valid" />
        <img src="test4.jpg" />
      `
      const violations = A11yChecker.checkImageAlt(div)
      expect(violations.length).toBe(2)
    })
  })
})

