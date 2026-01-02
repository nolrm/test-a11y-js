import { ARIA_ROLES, DEPRECATED_ARIA, ARIA_IN_HTML } from './aria-spec'

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

  static checkAudioCaptions(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const audios = element.getElementsByTagName('audio')
    
    for (const audio of Array.from(audios)) {
      // Check for track elements or transcript link
      const tracks = audio.querySelectorAll('track')
      const hasTranscript = audio.hasAttribute('aria-describedby') || 
                           audio.querySelector('a[href*="transcript"]') ||
                           audio.closest('div')?.querySelector('a[href*="transcript"]')
      
      if (tracks.length === 0 && !hasTranscript) {
        violations.push({
          id: 'audio-captions',
          description: 'Audio element must have track elements or a transcript link',
          element: audio,
          impact: 'serious'
        })
      } else if (tracks.length > 0) {
        // Check that tracks have required attributes
        for (const track of Array.from(tracks)) {
          if (!track.hasAttribute('srclang')) {
            violations.push({
              id: 'audio-track-srclang',
              description: 'Audio track must have a srclang attribute',
              element: track,
              impact: 'serious'
            })
          }
          if (!track.hasAttribute('label')) {
            violations.push({
              id: 'audio-track-label',
              description: 'Audio track should have a label attribute',
              element: track,
              impact: 'moderate'
            })
          }
        }
      }
    }
    
    return violations
  }

  static checkLandmarks(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const landmarkTags = ['nav', 'main', 'header', 'footer', 'aside', 'section', 'article']
    
    // Check for multiple main elements
    const mainElements = element.getElementsByTagName('main')
    if (mainElements.length > 1) {
      const mains = Array.from(mainElements)
      // Report all but the first
      for (let i = 1; i < mains.length; i++) {
        violations.push({
          id: 'landmark-multiple-main',
          description: 'Page should have only one main element',
          element: mains[i],
          impact: 'serious'
        })
      }
    }
    
    // Check landmarks for accessible names when needed
    for (const tag of landmarkTags) {
      const landmarks = element.getElementsByTagName(tag)
      
      for (const landmark of Array.from(landmarks)) {
        // Section and article should have accessible names if they're not nested in a named landmark
        if (tag === 'section' || tag === 'article') {
          const hasHeading = landmark.querySelector('h1, h2, h3, h4, h5, h6')
          const hasAriaLabel = landmark.hasAttribute('aria-label')
          const hasAriaLabelledBy = landmark.hasAttribute('aria-labelledby')
          
          if (!hasHeading && !hasAriaLabel && !hasAriaLabelledBy) {
            violations.push({
              id: 'landmark-missing-name',
              description: `${tag} element should have an accessible name (heading, aria-label, or aria-labelledby)`,
              element: landmark,
              impact: 'moderate'
            })
          }
        }
        
        // Check for duplicate landmarks without names (for nav, aside, etc.)
        if (tag === 'nav' || tag === 'aside') {
          const hasAriaLabel = landmark.hasAttribute('aria-label')
          const hasAriaLabelledBy = landmark.hasAttribute('aria-labelledby')
          
          // If there are multiple of the same type without names, that's a problem
          const sameType = Array.from(element.getElementsByTagName(tag))
          const unnamed = sameType.filter(l => 
            !l.hasAttribute('aria-label') && !l.hasAttribute('aria-labelledby')
          )
          
          if (unnamed.length > 1 && !hasAriaLabel && !hasAriaLabelledBy) {
            violations.push({
              id: 'landmark-duplicate-unnamed',
              description: `Multiple ${tag} elements found. Each should have an accessible name (aria-label or aria-labelledby)`,
              element: landmark,
              impact: 'moderate'
            })
          }
        }
      }
    }
    
    return violations
  }

  static checkDialogModal(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const dialogs = element.getElementsByTagName('dialog')
    
    for (const dialog of Array.from(dialogs)) {
      // Check for accessible name
      const hasAriaLabel = dialog.hasAttribute('aria-label')
      const hasAriaLabelledBy = dialog.hasAttribute('aria-labelledby')
      const hasHeading = dialog.querySelector('h1, h2, h3, h4, h5, h6')
      
      if (!hasAriaLabel && !hasAriaLabelledBy && !hasHeading) {
        violations.push({
          id: 'dialog-missing-name',
          description: 'Dialog element must have an accessible name (aria-label, aria-labelledby, or heading)',
          element: dialog,
          impact: 'serious'
        })
      }
      
      // Check for aria-modal attribute (should be true for modal dialogs)
      const isModal = dialog.hasAttribute('open') || dialog.getAttribute('aria-modal') === 'true'
      if (isModal && !dialog.hasAttribute('aria-modal')) {
        violations.push({
          id: 'dialog-missing-modal',
          description: 'Modal dialog should have aria-modal="true" attribute',
          element: dialog,
          impact: 'moderate'
        })
      }
      
      // Check for role="dialog" if using div with role
      const hasRole = dialog.hasAttribute('role')
      const roleValue = dialog.getAttribute('role')
      if (hasRole && roleValue !== 'dialog' && roleValue !== 'alertdialog') {
        violations.push({
          id: 'dialog-invalid-role',
          description: 'Dialog element should have role="dialog" or role="alertdialog"',
          element: dialog,
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
      ...this.checkHeadingOrder(element),
      ...this.checkIframeTitle(element),
      ...this.checkFieldsetLegend(element),
      ...this.checkTableStructure(element),
      ...this.checkDetailsSummary(element),
      ...this.checkVideoCaptions(element),
      ...this.checkAudioCaptions(element),
      ...this.checkLandmarks(element),
      ...this.checkDialogModal(element),
      // Phase 1: ARIA Validation
      ...this.checkAriaRoles(element),
      ...this.checkAriaProperties(element),
      ...this.checkAriaRelationships(element),
      ...this.checkAccessibleName(element),
      ...this.checkCompositePatterns(element)
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

  /**
   * Check ARIA roles for validity, appropriateness, and context
   */
  static checkAriaRoles(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    const allElements = element.querySelectorAll('[role]')
    
    for (const el of Array.from(allElements)) {
      const role = el.getAttribute('role')
      if (!role) continue
      
      const tagName = el.tagName.toLowerCase()
      const inputType = el.getAttribute('type')
      const elementKey = inputType ? `${tagName}[type="${inputType}"]` : tagName
      
      // Check role is valid
      if (!ARIA_ROLES[role]) {
        violations.push({
          id: 'aria-invalid-role',
          description: `Invalid ARIA role: ${role}`,
          element: el,
          impact: 'serious'
        })
        continue
      }
      
      const roleDef = ARIA_ROLES[role]
      
      // Check if deprecated
      if (DEPRECATED_ARIA.roles.includes(role)) {
        violations.push({
          id: 'aria-deprecated-role',
          description: `ARIA role "${role}" is deprecated`,
          element: el,
          impact: 'moderate'
        })
      }
      
      // Check if abstract (warn)
      if (roleDef.abstract) {
        violations.push({
          id: 'aria-abstract-role',
          description: `ARIA role "${role}" is abstract and should not be used`,
          element: el,
          impact: 'moderate'
        })
      }
      
      // Check redundant role (e.g., <button role="button">)
      const implicitRole = ARIA_IN_HTML.implicitRoles[elementKey] || ARIA_IN_HTML.implicitRoles[tagName] || null
      if (implicitRole === role) {
        violations.push({
          id: 'aria-redundant-role',
          description: `Redundant role: <${tagName}> already has implicit role "${role}"`,
          element: el,
          impact: 'minor'
        })
      }
      
      // Check conflicting semantics
      if (implicitRole && implicitRole !== role && this.hasStrongNativeSemantics(tagName)) {
        violations.push({
          id: 'aria-conflicting-semantics',
          description: `Conflicting semantics: <${tagName}> has implicit role "${implicitRole}" but role="${role}" is specified`,
          element: el,
          impact: 'serious'
        })
      }
      
      // Check role is allowed on element type (ARIA-in-HTML)
      if (!roleDef.allowedOn.includes('*') && !roleDef.allowedOn.includes(tagName)) {
        violations.push({
          id: 'aria-role-on-wrong-element',
          description: `Role "${role}" is not appropriate for <${tagName}>`,
          element: el,
          impact: 'serious'
        })
      }
      
      // Check required context (parent role)
      if (roleDef.requiredContext) {
        const parent = el.parentElement
        const parentRole = parent?.getAttribute('role')
        const contexts = Array.isArray(roleDef.requiredContext) 
          ? roleDef.requiredContext 
          : [roleDef.requiredContext]
        
        if (!parentRole || !contexts.includes(parentRole)) {
          violations.push({
            id: 'aria-missing-context-role',
            description: `Role "${role}" must be in context of ${contexts.join(' or ')}`,
            element: el,
            impact: 'serious'
          })
        }
      }
      
      // Check required properties (one of required properties)
      if (roleDef.requiredProperties.length > 0) {
        const hasRequired = roleDef.requiredProperties.some(prop => el.hasAttribute(prop))
        if (!hasRequired) {
          violations.push({
            id: 'aria-missing-required-property',
            description: `Role "${role}" requires one of: ${roleDef.requiredProperties.join(', ')}`,
            element: el,
            impact: 'critical'
          })
        }
      }
    }
    
    return violations
  }

  private static hasStrongNativeSemantics(tagName: string): boolean {
    const strongSemanticElements = ['button', 'a', 'input', 'select', 'textarea', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    return strongSemanticElements.includes(tagName)
  }

  /**
   * Check ARIA properties for validity and appropriateness
   * Placeholder - will be implemented next
   */
  static checkAriaProperties(_element: Element): A11yViolation[] {
    // TODO: Implement ARIA property checker
    return []
  }

  /**
   * Check ARIA relationships (ID references)
   * Placeholder - will be implemented next
   */
  static checkAriaRelationships(_element: Element): A11yViolation[] {
    // TODO: Implement ARIA relationship checker
    return []
  }

  /**
   * Check accessible name computation
   * Placeholder - will be implemented next
   */
  static checkAccessibleName(_element: Element): A11yViolation[] {
    // TODO: Implement accessible name checker
    return []
  }

  /**
   * Check composite patterns (tab/listbox/menu/tree)
   * Placeholder - will be implemented next
   */
  static checkCompositePatterns(_element: Element): A11yViolation[] {
    // TODO: Implement composite pattern checker
    return []
  }
} 