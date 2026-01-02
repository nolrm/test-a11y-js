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

  describe('Table Tests', () => {
    it('should detect table without caption or aria-label', () => {
      document.body.innerHTML = `
        <div>
          <table>
            <tr><td>Data</td></tr>
          </table>
        </div>
      `
      
      const violations = A11yChecker.checkTableStructure(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'table-caption')).toBe(true)
    })

    it('should detect table without header cells', () => {
      document.body.innerHTML = `
        <div>
          <table>
            <caption>Test Table</caption>
            <tr><td>Data</td></tr>
          </table>
        </div>
      `
      
      const violations = A11yChecker.checkTableStructure(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'table-headers')).toBe(true)
    })

    it('should detect header cells without scope', () => {
      document.body.innerHTML = `
        <div>
          <table>
            <caption>Test Table</caption>
            <tr><th>Header</th><td>Data</td></tr>
          </table>
        </div>
      `
      
      const violations = A11yChecker.checkTableStructure(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'table-header-scope')).toBe(true)
    })

    it('should pass when table has caption and proper headers', () => {
      document.body.innerHTML = `
        <div>
          <table>
            <caption>Test Table</caption>
            <tr><th scope="col">Header</th></tr>
            <tr><td>Data</td></tr>
          </table>
        </div>
      `
      
      const violations = A11yChecker.checkTableStructure(document.body)
      expect(violations).toHaveLength(0)
    })

    it('should pass when table has aria-label instead of caption', () => {
      document.body.innerHTML = `
        <div>
          <table aria-label="Test Table">
            <tr><th scope="col">Header</th></tr>
            <tr><td>Data</td></tr>
          </table>
        </div>
      `
      
      const violations = A11yChecker.checkTableStructure(document.body)
      expect(violations).toHaveLength(0)
    })
  })

  describe('Details/Summary Tests', () => {
    it('should detect details without summary', () => {
      document.body.innerHTML = `
        <div>
          <details>
            <div>Some content</div>
          </details>
        </div>
      `
      
      const violations = A11yChecker.checkDetailsSummary(document.body)
      expect(violations).toHaveLength(1)
      expect(violations[0]).toMatchObject({
        id: 'details-summary',
        impact: 'serious'
      })
    })

    it('should detect details with empty summary', () => {
      document.body.innerHTML = `
        <div>
          <details>
            <summary></summary>
            <div>Some content</div>
          </details>
        </div>
      `
      
      const violations = A11yChecker.checkDetailsSummary(document.body)
      expect(violations).toHaveLength(1)
      expect(violations[0]).toMatchObject({
        id: 'details-summary-empty',
        impact: 'serious'
      })
    })

    it('should pass when details has valid summary as first child', () => {
      document.body.innerHTML = `
        <div>
          <details>
            <summary>Click to expand</summary>
            <div>Some content</div>
          </details>
        </div>
      `
      
      const violations = A11yChecker.checkDetailsSummary(document.body)
      expect(violations).toHaveLength(0)
    })

    it('should fail when summary is not first child', () => {
      document.body.innerHTML = `
        <div>
          <details>
            <div>Other content</div>
            <summary>Summary</summary>
          </details>
        </div>
      `
      
      const violations = A11yChecker.checkDetailsSummary(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'details-summary')).toBe(true)
    })
  })

  describe('Video Tests', () => {
    it('should detect video without caption tracks', () => {
      document.body.innerHTML = `
        <div>
          <video>
            <source src="video.mp4" />
          </video>
        </div>
      `
      
      const violations = A11yChecker.checkVideoCaptions(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'video-captions')).toBe(true)
    })

    it('should detect caption track without srclang', () => {
      document.body.innerHTML = `
        <div>
          <video>
            <source src="video.mp4" />
            <track kind="captions" />
          </video>
        </div>
      `
      
      const violations = A11yChecker.checkVideoCaptions(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'video-track-srclang')).toBe(true)
    })

    it('should pass when video has valid caption track', () => {
      document.body.innerHTML = `
        <div>
          <video>
            <source src="video.mp4" />
            <track kind="captions" srclang="en" label="English" />
          </video>
        </div>
      `
      
      const violations = A11yChecker.checkVideoCaptions(document.body)
      expect(violations).toHaveLength(0)
    })

    it('should warn when caption track lacks label', () => {
      document.body.innerHTML = `
        <div>
          <video>
            <source src="video.mp4" />
            <track kind="captions" srclang="en" />
          </video>
        </div>
      `
      
      const violations = A11yChecker.checkVideoCaptions(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'video-track-label')).toBe(true)
    })
  })

  describe('Audio Tests', () => {
    it('should detect audio without tracks or transcript', () => {
      document.body.innerHTML = `
        <div>
          <audio>
            <source src="audio.mp3" />
          </audio>
        </div>
      `
      
      const violations = A11yChecker.checkAudioCaptions(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'audio-captions')).toBe(true)
    })

    it('should detect audio track without srclang', () => {
      document.body.innerHTML = `
        <div>
          <audio>
            <source src="audio.mp3" />
            <track />
          </audio>
        </div>
      `
      
      const violations = A11yChecker.checkAudioCaptions(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'audio-track-srclang')).toBe(true)
    })

    it('should pass when audio has valid track', () => {
      document.body.innerHTML = `
        <div>
          <audio>
            <source src="audio.mp3" />
            <track srclang="en" label="English" />
          </audio>
        </div>
      `
      
      const violations = A11yChecker.checkAudioCaptions(document.body)
      expect(violations).toHaveLength(0)
    })

    it('should warn when track lacks label', () => {
      document.body.innerHTML = `
        <div>
          <audio>
            <source src="audio.mp3" />
            <track srclang="en" />
          </audio>
        </div>
      `
      
      const violations = A11yChecker.checkAudioCaptions(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'audio-track-label')).toBe(true)
    })
  })

  describe('Landmark Tests', () => {
    it('should detect multiple main elements', () => {
      document.body.innerHTML = `
        <div>
          <main>First main</main>
          <main>Second main</main>
        </div>
      `
      
      const violations = A11yChecker.checkLandmarks(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'landmark-multiple-main')).toBe(true)
    })

    it('should detect section without accessible name', () => {
      document.body.innerHTML = `
        <div>
          <section>
            <div>Content without heading</div>
          </section>
        </div>
      `
      
      const violations = A11yChecker.checkLandmarks(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'landmark-missing-name')).toBe(true)
    })

    it('should pass when section has heading', () => {
      document.body.innerHTML = `
        <div>
          <section>
            <h2>Section Title</h2>
            <div>Content</div>
          </section>
        </div>
      `
      
      const violations = A11yChecker.checkLandmarks(document.body)
      expect(violations.filter(v => v.id === 'landmark-missing-name')).toHaveLength(0)
    })

    it('should pass when section has aria-label', () => {
      document.body.innerHTML = `
        <div>
          <section aria-label="Content Section">
            <div>Content</div>
          </section>
        </div>
      `
      
      const violations = A11yChecker.checkLandmarks(document.body)
      expect(violations.filter(v => v.id === 'landmark-missing-name')).toHaveLength(0)
    })
  })

  describe('Dialog Tests', () => {
    it('should detect dialog without accessible name', () => {
      document.body.innerHTML = `
        <div>
          <dialog>
            <div>Dialog content</div>
          </dialog>
        </div>
      `
      
      const violations = A11yChecker.checkDialogModal(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'dialog-missing-name')).toBe(true)
    })

    it('should detect modal dialog without aria-modal', () => {
      document.body.innerHTML = `
        <div>
          <dialog open>
            <h2>Modal Title</h2>
            <div>Dialog content</div>
          </dialog>
        </div>
      `
      
      const violations = A11yChecker.checkDialogModal(document.body)
      expect(violations.length).toBeGreaterThan(0)
      expect(violations.some(v => v.id === 'dialog-missing-modal')).toBe(true)
    })

    it('should pass when dialog has heading', () => {
      document.body.innerHTML = `
        <div>
          <dialog>
            <h2>Dialog Title</h2>
            <div>Dialog content</div>
          </dialog>
        </div>
      `
      
      const violations = A11yChecker.checkDialogModal(document.body)
      expect(violations.filter(v => v.id === 'dialog-missing-name')).toHaveLength(0)
    })

    it('should pass when dialog has aria-label', () => {
      document.body.innerHTML = `
        <div>
          <dialog aria-label="Confirmation Dialog" aria-modal="true">
            <div>Dialog content</div>
          </dialog>
        </div>
      `
      
      const violations = A11yChecker.checkDialogModal(document.body)
      expect(violations.filter(v => v.id === 'dialog-missing-name')).toHaveLength(0)
    })
  })

  describe('ARIA Validation', () => {
    describe('checkAriaRoles', () => {
      it('should detect invalid ARIA role', () => {
        const div = document.createElement('div')
        div.setAttribute('role', 'invalid-role')
        document.body.appendChild(div)

        const violations = A11yChecker.checkAriaRoles(document.body)
        expect(violations.some(v => v.id === 'aria-invalid-role')).toBe(true)

        document.body.removeChild(div)
      })

      it('should detect redundant role', () => {
        const button = document.createElement('button')
        button.setAttribute('role', 'button')
        document.body.appendChild(button)

        const violations = A11yChecker.checkAriaRoles(document.body)
        expect(violations.some(v => v.id === 'aria-redundant-role')).toBe(true)

        document.body.removeChild(button)
      })

      it('should detect missing context role', () => {
        const tab = document.createElement('div')
        tab.setAttribute('role', 'tab')
        document.body.appendChild(tab)

        const violations = A11yChecker.checkAriaRoles(document.body)
        expect(violations.some(v => v.id === 'aria-missing-context-role')).toBe(true)

        document.body.removeChild(tab)
      })
    })

    describe('checkAriaProperties', () => {
      it('should detect invalid ARIA property', () => {
        const div = document.createElement('div')
        div.setAttribute('aria-invalid-prop', 'value')
        document.body.appendChild(div)

        const violations = A11yChecker.checkAriaProperties(document.body)
        expect(violations.some(v => v.id === 'aria-invalid-property')).toBe(true)

        document.body.removeChild(div)
      })

      it('should detect deprecated property', () => {
        const div = document.createElement('div')
        div.setAttribute('aria-dropeffect', 'copy')
        document.body.appendChild(div)

        const violations = A11yChecker.checkAriaProperties(document.body)
        expect(violations.some(v => v.id === 'aria-deprecated-property')).toBe(true)

        document.body.removeChild(div)
      })

      it('should detect empty aria-label', () => {
        const button = document.createElement('button')
        button.setAttribute('aria-label', '')
        document.body.appendChild(button)

        const violations = A11yChecker.checkAriaProperties(document.body)
        expect(violations.some(v => v.id === 'aria-label-empty')).toBe(true)

        document.body.removeChild(button)
      })
    })

    describe('checkAriaRelationships', () => {
      it('should detect missing ID reference', () => {
        const input = document.createElement('input')
        input.setAttribute('aria-labelledby', 'missing-id')
        document.body.appendChild(input)

        const violations = A11yChecker.checkAriaRelationships(document.body)
        expect(violations.some(v => v.id === 'aria-labelledby-reference-missing')).toBe(true)

        document.body.removeChild(input)
      })

      it('should detect duplicate IDs', () => {
        const label1 = document.createElement('label')
        label1.id = 'test-id'
        const label2 = document.createElement('label')
        label2.id = 'test-id'
        const input = document.createElement('input')
        input.setAttribute('aria-labelledby', 'test-id')
        document.body.appendChild(label1)
        document.body.appendChild(label2)
        document.body.appendChild(input)

        const violations = A11yChecker.checkAriaRelationships(document.body)
        expect(violations.some(v => v.id === 'aria-labelledby-duplicate-id')).toBe(true)

        document.body.removeChild(label1)
        document.body.removeChild(label2)
        document.body.removeChild(input)
      })
    })

    describe('checkAccessibleName', () => {
      it('should detect dialog without accessible name', () => {
        const dialog = document.createElement('dialog')
        // Ensure dialog is in the query selector results
        document.body.appendChild(dialog)

        const violations = A11yChecker.checkAccessibleName(document.body)
        // Check if any violation mentions dialog
        const dialogViolations = violations.filter(v => 
          v.id === 'dialog-missing-name' || v.description.includes('Dialog')
        )
        expect(dialogViolations.length).toBeGreaterThan(0)

        document.body.removeChild(dialog)
      })
    })

    describe('checkCompositePatterns', () => {
      it('should detect tab without tablist', () => {
        const tab = document.createElement('div')
        tab.setAttribute('role', 'tab')
        document.body.appendChild(tab)

        const violations = A11yChecker.checkCompositePatterns(document.body)
        expect(violations.some(v => v.id === 'tab-missing-tablist')).toBe(true)

        document.body.removeChild(tab)
      })
    })
  })

  describe('Semantic HTML Validation', () => {
    describe('checkSemanticHTML', () => {
      it('should detect nested interactive elements', () => {
        const button = document.createElement('button')
        const anchor = document.createElement('a')
        anchor.href = '#'
        anchor.textContent = 'Link'
        button.appendChild(anchor)
        document.body.appendChild(button)

        const violations = A11yChecker.checkSemanticHTML(document.body)
        expect(violations.some(v => v.id === 'nested-interactive')).toBe(true)

        document.body.removeChild(button)
      })

      it('should detect anchor without href', () => {
        const anchor = document.createElement('a')
        document.body.appendChild(anchor)

        const violations = A11yChecker.checkSemanticHTML(document.body)
        expect(violations.some(v => v.id === 'anchor-without-href')).toBe(true)

        document.body.removeChild(anchor)
      })

      it('should detect multiple main elements', () => {
        const main1 = document.createElement('main')
        const main2 = document.createElement('main')
        document.body.appendChild(main1)
        document.body.appendChild(main2)

        const violations = A11yChecker.checkSemanticHTML(document.body)
        expect(violations.some(v => v.id === 'multiple-main')).toBe(true)

        document.body.removeChild(main1)
        document.body.removeChild(main2)
      })

      it('should detect duplicate IDs', () => {
        const div1 = document.createElement('div')
        div1.id = 'test-id'
        const div2 = document.createElement('div')
        div2.id = 'test-id'
        document.body.appendChild(div1)
        document.body.appendChild(div2)

        const violations = A11yChecker.checkSemanticHTML(document.body)
        expect(violations.some(v => v.id === 'duplicate-id')).toBe(true)

        document.body.removeChild(div1)
        document.body.removeChild(div2)
      })
    })
  })

  describe('Form Validation Messages', () => {
    describe('checkFormValidationMessages', () => {
      it('should detect aria-invalid without error message', () => {
        const input = document.createElement('input')
        input.setAttribute('aria-invalid', 'true')
        document.body.appendChild(input)

        const violations = A11yChecker.checkFormValidationMessages(document.body)
        expect(violations.some(v => v.id === 'aria-invalid-without-describedby')).toBe(true)

        document.body.removeChild(input)
      })

      it('should detect aria-invalid with empty error message', () => {
        const input = document.createElement('input')
        input.setAttribute('aria-invalid', 'true')
        input.setAttribute('aria-describedby', 'error-msg')
        const error = document.createElement('div')
        error.id = 'error-msg'
        // Empty error message
        document.body.appendChild(input)
        document.body.appendChild(error)

        const violations = A11yChecker.checkFormValidationMessages(document.body)
        expect(violations.some(v => v.id === 'aria-invalid-without-message')).toBe(true)

        document.body.removeChild(input)
        document.body.removeChild(error)
      })
    })
  })
}) 