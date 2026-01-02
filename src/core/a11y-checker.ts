export interface A11yViolation {
  id: string
  description: string
  element: Element
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
}

export interface A11yResults {
  violations: A11yViolation[]
}

export class A11yChecker {
  static checkImageAlt(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const images = element.getElementsByTagName('img')
    
    for (const img of Array.from(images)) {
      if (!img.hasAttribute('alt')) {
        violations.push({
          id: 'image-alt',
          description: 'Image must have an alt attribute',
          element: img,
          impact: 'serious'
        })
      } else if (img.getAttribute('alt')?.trim() === '') {
        violations.push({
          id: 'image-alt',
          description: 'Image alt attribute must not be empty',
          element: img,
          impact: 'serious'
        })
      }
    }
    
    return violations
  }

  static checkButtonLabel(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const buttons = element.getElementsByTagName('button')
    
    for (const button of Array.from(buttons)) {
      if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
        violations.push({
          id: 'button-label',
          description: 'Button must have a label or aria-label',
          element: button,
          impact: 'critical'
        })
      }
    }
    
    return violations
  }

  static checkFormLabels(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const inputs = element.querySelectorAll('input, select, textarea')
    
    for (const input of Array.from(inputs)) {
      const hasLabel = input.hasAttribute('id') && 
        element.querySelector(`label[for="${input.getAttribute('id')}"]`)
      const hasAriaLabel = input.hasAttribute('aria-label')
      const hasAriaLabelledBy = input.hasAttribute('aria-labelledby') &&
        document.getElementById(input.getAttribute('aria-labelledby') || '')
      
      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        violations.push({
          id: 'form-label',
          description: 'Form control must have an associated label',
          element: input,
          impact: 'critical'
        })
      }
    }
    
    return violations
  }

  static checkHeadingOrder(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let previousLevel = 0
    
    for (const heading of Array.from(headings)) {
      const currentLevel = parseInt(heading.tagName[1])
      
      if (previousLevel > 0 && currentLevel - previousLevel > 1) {
        violations.push({
          id: 'heading-order',
          description: `Heading level skipped from h${previousLevel} to h${currentLevel}`,
          element: heading,
          impact: 'moderate'
        })
      }
      previousLevel = currentLevel
    }
    
    return violations
  }

  static checkLinkText(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const links = element.getElementsByTagName('a')
    
    for (const link of Array.from(links)) {
      const text = link.textContent?.trim().toLowerCase() || ''
      const ariaLabel = link.getAttribute('aria-label')?.toLowerCase()
      
      if (!text && !ariaLabel) {
        violations.push({
          id: 'link-text',
          description: 'Link must have descriptive text',
          element: link,
          impact: 'serious'
        })
      } else if (
        ['click here', 'read more', 'more'].includes(text) &&
        !ariaLabel
      ) {
        violations.push({
          id: 'link-text-descriptive',
          description: 'Link text should be more descriptive',
          element: link,
          impact: 'moderate'
        })
      }
    }
    
    return violations
  }

  static checkIframeTitle(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const iframes = element.getElementsByTagName('iframe')
    
    for (const iframe of Array.from(iframes)) {
      if (!iframe.hasAttribute('title')) {
        violations.push({
          id: 'iframe-title',
          description: 'iframe must have a title attribute',
          element: iframe,
          impact: 'serious'
        })
      } else if (iframe.getAttribute('title')?.trim() === '') {
        violations.push({
          id: 'iframe-title',
          description: 'iframe title attribute must not be empty',
          element: iframe,
          impact: 'serious'
        })
      }
    }
    
    return violations
  }

  static checkFieldsetLegend(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const fieldsets = element.getElementsByTagName('fieldset')
    
    for (const fieldset of Array.from(fieldsets)) {
      // Check for legend as direct child
      const legend = Array.from(fieldset.children).find(
        child => child.tagName.toLowerCase() === 'legend'
      )
      
      if (!legend) {
        violations.push({
          id: 'fieldset-legend',
          description: 'fieldset must have a legend element as a direct child',
          element: fieldset,
          impact: 'serious'
        })
      } else if (!legend.textContent?.trim()) {
        violations.push({
          id: 'fieldset-legend-empty',
          description: 'fieldset legend must have non-empty text content',
          element: fieldset,
          impact: 'serious'
        })
      }
    }
    
    return violations
  }

  static checkTableStructure(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const tables = element.getElementsByTagName('table')
    
    for (const table of Array.from(tables)) {
      // Check for caption or aria-label/aria-labelledby
      const hasCaption = table.querySelector('caption')
      const hasAriaLabel = table.hasAttribute('aria-label')
      const hasAriaLabelledBy = table.hasAttribute('aria-labelledby')
      
      if (!hasCaption && !hasAriaLabel && !hasAriaLabelledBy) {
        violations.push({
          id: 'table-caption',
          description: 'Table must have a caption or aria-label/aria-labelledby',
          element: table,
          impact: 'serious'
        })
      }
      
      // Check for header cells (th elements)
      const headerCells = table.querySelectorAll('th')
      const dataCells = table.querySelectorAll('td')
      
      // If there are data cells but no header cells, that's a problem
      if (dataCells.length > 0 && headerCells.length === 0) {
        violations.push({
          id: 'table-headers',
          description: 'Table must have header cells (th elements) when it has data cells',
          element: table,
          impact: 'serious'
        })
      }
      
      // Check that header cells have scope attribute
      for (const th of Array.from(headerCells)) {
        if (!th.hasAttribute('scope')) {
          violations.push({
            id: 'table-header-scope',
            description: 'Table header cells (th) should have a scope attribute',
            element: th,
            impact: 'moderate'
          })
        }
      }
    }
    
    return violations
  }

  static checkDetailsSummary(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const detailsElements = element.getElementsByTagName('details')
    
    for (const details of Array.from(detailsElements)) {
      // Check for summary as first child
      const firstChild = details.firstElementChild
      if (!firstChild || firstChild.tagName.toLowerCase() !== 'summary') {
        violations.push({
          id: 'details-summary',
          description: 'details element must have a summary element as its first child',
          element: details,
          impact: 'serious'
        })
      } else if (!firstChild.textContent?.trim()) {
        violations.push({
          id: 'details-summary-empty',
          description: 'details summary element must have non-empty text content',
          element: details,
          impact: 'serious'
        })
      }
    }
    
    return violations
  }

  static checkVideoCaptions(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const videos = element.getElementsByTagName('video')
    
    for (const video of Array.from(videos)) {
      // Check for track elements with kind="captions"
      const tracks = video.querySelectorAll('track')
      const captionTracks = Array.from(tracks).filter(track => 
        track.getAttribute('kind')?.toLowerCase() === 'captions'
      )
      
      if (captionTracks.length === 0) {
        violations.push({
          id: 'video-captions',
          description: 'Video element must have at least one track element with kind="captions"',
          element: video,
          impact: 'serious'
        })
      } else {
        // Check that caption tracks have required attributes
        for (const track of captionTracks) {
          if (!track.hasAttribute('srclang')) {
            violations.push({
              id: 'video-track-srclang',
              description: 'Video caption track must have a srclang attribute',
              element: track,
              impact: 'serious'
            })
          }
          if (!track.hasAttribute('label')) {
            violations.push({
              id: 'video-track-label',
              description: 'Video caption track should have a label attribute',
              element: track,
              impact: 'moderate'
            })
          }
        }
      }
    }
    
    return violations
  }

  static async check(element: Element): Promise<A11yResults> {
    const violations = [
      ...this.checkImageAlt(element),
      ...this.checkLinkText(element),
      ...this.checkButtonLabel(element),
      ...this.checkFormLabels(element),
      ...this.checkHeadingOrder(element),
      ...this.checkIframeTitle(element),
      ...this.checkFieldsetLegend(element),
      ...this.checkTableStructure(element),
      ...this.checkDetailsSummary(element),
      ...this.checkVideoCaptions(element)
    ]
    
    // Log violations for debugging
    if (violations.length > 0) {
      console.warn('\nAccessibility Violations Found:')
      violations.forEach((violation, index) => {
        console.warn(`\n${index + 1}. ${violation.id} (${violation.impact})`)
        console.warn(`   Description: ${violation.description}`)
        console.warn(`   Element: ${violation.element.outerHTML}`)
      })
      console.warn('\n')
    }
    
    return { violations }
  }
} 