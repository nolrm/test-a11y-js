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

  describe('Iframe Tests', () => {
    it('should detect missing title attribute on iframes', () => {
      const container = document.createElement('div')
      const iframe = document.createElement('iframe')
      iframe.setAttribute('src', 'about:blank')
      container.appendChild(iframe)
      document.body.appendChild(container)
      
      const violations = A11yChecker.checkIframeTitle(container)
      expect(violations).toHaveLength(1)
      expect(violations[0]).toMatchObject({
        id: 'iframe-title',
        impact: 'serious'
      })
      
      document.body.removeChild(container)
    })

    it('should detect empty title attribute on iframes', () => {
      const container = document.createElement('div')
      const iframe = document.createElement('iframe')
      iframe.setAttribute('src', 'about:blank')
      iframe.setAttribute('title', '')
      container.appendChild(iframe)
      document.body.appendChild(container)
      
      const violations = A11yChecker.checkIframeTitle(container)
      expect(violations).toHaveLength(1)
      expect(violations[0]).toMatchObject({
        id: 'iframe-title',
        impact: 'serious'
      })
      
      document.body.removeChild(container)
    })

    it('should pass when iframe has title attribute', () => {
      const container = document.createElement('div')
      const iframe = document.createElement('iframe')
      iframe.setAttribute('src', 'about:blank')
      iframe.setAttribute('title', 'Example website')
      container.appendChild(iframe)
      document.body.appendChild(container)
      
      const violations = A11yChecker.checkIframeTitle(container)
      expect(violations).toHaveLength(0)
      
      document.body.removeChild(container)
    })

    it('should check multiple iframes', () => {
      const container = document.createElement('div')
      const iframe1 = document.createElement('iframe')
      iframe1.setAttribute('src', 'about:blank')
      iframe1.setAttribute('title', 'Example')
      const iframe2 = document.createElement('iframe')
      iframe2.setAttribute('src', 'about:blank')
      container.appendChild(iframe1)
      container.appendChild(iframe2)
      document.body.appendChild(container)
      
      const violations = A11yChecker.checkIframeTitle(container)
      expect(violations).toHaveLength(1)
      expect(violations[0].id).toBe('iframe-title')
      
      document.body.removeChild(container)
    })
  })

  describe('Fieldset Tests', () => {
    it('should detect fieldset without legend', () => {
      document.body.innerHTML = `
        <div>
          <fieldset>
            <div>Some content</div>
          </fieldset>
        </div>
      `
      
      const violations = A11yChecker.checkFieldsetLegend(document.body)
      expect(violations).toHaveLength(1)
      expect(violations[0]).toMatchObject({
        id: 'fieldset-legend',
        impact: 'serious'
      })
    })

    it('should detect fieldset with empty legend', () => {
      document.body.innerHTML = `
        <div>
          <fieldset>
            <legend></legend>
            <div>Some content</div>
          </fieldset>
        </div>
      `
      
      const violations = A11yChecker.checkFieldsetLegend(document.body)
      expect(violations).toHaveLength(1)
      expect(violations[0]).toMatchObject({
        id: 'fieldset-legend-empty',
        impact: 'serious'
      })
    })

    it('should pass when fieldset has valid legend', () => {
      document.body.innerHTML = `
        <div>
          <fieldset>
            <legend>Personal Information</legend>
            <div>Some content</div>
          </fieldset>
        </div>
      `
      
      const violations = A11yChecker.checkFieldsetLegend(document.body)
      expect(violations).toHaveLength(0)
    })

    it('should check multiple fieldsets', () => {
      document.body.innerHTML = `
        <div>
          <fieldset>
            <legend>Section 1</legend>
          </fieldset>
          <fieldset>
            <div>Content without legend</div>
          </fieldset>
        </div>
      `
      
      const violations = A11yChecker.checkFieldsetLegend(document.body)
      expect(violations).toHaveLength(1)
      expect(violations[0].id).toBe('fieldset-legend')
    })
  })
}) 