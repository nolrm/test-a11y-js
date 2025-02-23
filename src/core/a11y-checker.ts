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

  static async check(element: Element): Promise<A11yResults> {
    const violations = [
      ...this.checkImageAlt(element),
      ...this.checkLinkText(element),
      ...this.checkButtonLabel(element),
      ...this.checkFormLabels(element),
      ...this.checkHeadingOrder(element)
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