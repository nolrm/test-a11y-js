export interface A11yViolation {
  id: string
  description: string
  element: Element
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
}

export interface A11yResults {
  violations: A11yViolation[]
}

export interface A11yRule {
  selector: string;
  test: (element: HTMLElement) => {
    passed: boolean;
    message?: string;
  };
}

export class A11yChecker {
  private rules: A11yRule[] = [
    // Images
    {
      selector: 'img',
      test: (element: HTMLElement) => {
        const img = element as HTMLImageElement;
        if (!img.alt) {
          return {
            passed: false,
            message: 'Images must have alt text for screen readers'
          };
        }
        return { passed: true };
      }
    },

    // Buttons
    {
      selector: 'button',
      test: (element: HTMLElement) => {
        if (!element.textContent?.trim() && !element.getAttribute('aria-label')) {
          return {
            passed: false,
            message: 'Buttons must have text content or aria-label'
          };
        }
        return { passed: true };
      }
    },

    // Form inputs
    {
      selector: 'input:not([type="hidden"])',
      test: (element: HTMLElement) => {
        const input = element as HTMLInputElement;
        const hasLabel = this.hasAssociatedLabel(input);
        const hasAriaLabel = input.getAttribute('aria-label');
        
        if (!hasLabel && !hasAriaLabel) {
          return {
            passed: false,
            message: 'Form inputs must have an associated label or aria-label'
          };
        }
        return { passed: true };
      }
    },

    // Links
    {
      selector: 'a',
      test: (element: HTMLElement) => {
        const link = element as HTMLAnchorElement;
        if (!link.textContent?.trim() && !link.getAttribute('aria-label')) {
          return {
            passed: false,
            message: 'Links must have text content or aria-label'
          };
        }
        return { passed: true };
      }
    },

    // Tables
    {
      selector: 'table',
      test: (element: HTMLElement) => {
        const table = element as HTMLTableElement;
        if (!table.querySelector('caption')) {
          return {
            passed: false,
            message: 'Tables should have captions for better accessibility'
          };
        }
        return { passed: true };
      }
    },

    // iframes
    {
      selector: 'iframe',
      test: (element: HTMLElement) => {
        const iframe = element as HTMLIFrameElement;
        if (!iframe.getAttribute('title')) {
          return {
            passed: false,
            message: 'iframes must have a title attribute'
          };
        }
        return { passed: true };
      }
    }
  ];

  // Helper method to check if an input has an associated label
  private hasAssociatedLabel(input: HTMLInputElement): boolean {
    // Check for explicit label
    if (input.id) {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) return true;
    }

    // Check for implicit label (input nested within label)
    const parentLabel = input.closest('label');
    return !!parentLabel;
  }

  // Method to run all rules
  private runRules(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = [];
    
    this.rules.forEach(rule => {
      const elements = element.querySelectorAll(rule.selector);
      elements.forEach(el => {
        const result = rule.test(el as HTMLElement);
        if (!result.passed) {
          violations.push({
            id: rule.selector,
            description: result.message || 'Accessibility violation found',
            element: el,
            impact: 'serious'
          });
        }
      });
    });

    return violations;
  }

  // Instance method for checking
  public check(element: Element): A11yResults {
    const violations = this.runRules(element);

    if (violations.length > 0) {
      A11yChecker.logViolations(violations);
    }

    return { violations };
  }

  // Static method for checking (maintains backward compatibility)
  static async check(element: Element): Promise<A11yResults> {
    const violations = [
      ...this.checkImageAlt(element),
      ...this.checkLinkText(element),
      ...this.checkButtonLabel(element),
      ...this.checkFormLabels(element),
      ...this.checkHeadingOrder(element),
      ...this.checkIframeTitle(element),
      ...this.checkTableCaption(element)
    ];

    if (violations.length > 0) {
      this.logViolations(violations);
    }

    return { violations };
  }

  // Helper method to log violations
  private static logViolations(violations: A11yViolation[]): void {
    console.warn('\nAccessibility Violations Found:');
    violations.forEach((violation, index) => {
      console.warn(`\n${index + 1}. ${violation.id} (${violation.impact})`);
      console.warn(`   Description: ${violation.description}`);
      console.warn(`   Element: ${violation.element.outerHTML}`);
    });
    console.warn('\n');
  }

  static checkImageAlt(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const images = element.querySelectorAll('img')
    
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
    const buttons = element.querySelectorAll('button')
    
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
    const links = element.querySelectorAll('a')
    
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
    const iframes = element.querySelectorAll('iframe')
    
    for (const iframe of Array.from(iframes)) {
      if (!iframe.hasAttribute('title')) {
        violations.push({
          id: 'iframe-title',
          description: 'iframes must have a title attribute',
          element: iframe,
          impact: 'serious'
        })
      }
    }
    
    return violations
  }

  static checkTableCaption(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const tables = element.querySelectorAll('table')
    
    for (const table of Array.from(tables)) {
      if (!table.querySelector('caption')) {
        violations.push({
          id: 'table-caption',
          description: 'Tables should have captions for better accessibility',
          element: table,
          impact: 'serious'
        })
      }
    }
    
    return violations
  }
} 