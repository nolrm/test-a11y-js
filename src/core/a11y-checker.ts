import { ARIA_ROLES, ARIA_PROPERTIES, DEPRECATED_ARIA, ARIA_IN_HTML } from './aria-spec'

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
      ...this.checkCompositePatterns(element),
      // Phase 1: Semantic HTML Validation
      ...this.checkSemanticHTML(element),
      // Phase 1: Form Validation Messages
      ...this.checkFormValidationMessages(element)
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
   * Check ARIA properties for validity, appropriateness, and values
   */
  static checkAriaProperties(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    // Get all elements and filter those with aria-* attributes
    const allElements = Array.from(element.querySelectorAll('*')).filter(el => {
      return Array.from(el.attributes).some(attr => attr.name.startsWith('aria-'))
    })
    
    for (const el of Array.from(allElements)) {
      const attributes = Array.from(el.attributes)
        .filter(attr => attr.name.startsWith('aria-'))
      
      for (const attr of attributes) {
        const propName = attr.name
        const propValue = attr.value
        const tagName = el.tagName.toLowerCase()
        const inputType = el.getAttribute('type')
        const elementKey = inputType ? `${tagName}[type="${inputType}"]` : tagName
        
        // Check property is valid
        if (!ARIA_PROPERTIES[propName]) {
          violations.push({
            id: 'aria-invalid-property',
            description: `Invalid ARIA property: ${propName}`,
            element: el,
            impact: 'serious'
          })
          continue
        }
        
        const propDef = ARIA_PROPERTIES[propName]
        
        // Check if deprecated
        if (propDef.deprecated || DEPRECATED_ARIA.properties.includes(propName)) {
          violations.push({
            id: 'aria-deprecated-property',
            description: `ARIA property "${propName}" is deprecated`,
            element: el,
            impact: 'moderate'
          })
        }
        
        // Check ARIA-in-HTML restrictions
        const discouraged = (ARIA_IN_HTML.discouraged as Record<string, string[]>)[elementKey] || 
                            (ARIA_IN_HTML.discouraged as Record<string, string[]>)[tagName]
        if (discouraged && discouraged.includes(propName)) {
          violations.push({
            id: 'aria-property-discouraged',
            description: `${propName} is discouraged on <${tagName}> (use native HTML instead)`,
            element: el,
            impact: 'moderate'
          })
        }
        
        // Validate property value type
        if (!this.validateAriaPropertyValue(propValue, propDef.type, propDef.enumValues)) {
          violations.push({
            id: 'aria-invalid-property-value',
            description: `Invalid value for ${propName}: ${propValue}. Expected ${propDef.type}${propDef.enumValues ? ` (${propDef.enumValues.join(', ')})` : ''}`,
            element: el,
            impact: 'serious'
          })
        }
        
        // Check for empty aria-label
        if (propName === 'aria-label' && propValue.trim() === '') {
          violations.push({
            id: 'aria-label-empty',
            description: 'aria-label must not be empty',
            element: el,
            impact: 'serious'
          })
        }
        
        // Check property is allowed on element type
        if (!propDef.allowedOn.includes('*') && !propDef.allowedOn.includes(tagName)) {
          violations.push({
            id: 'aria-property-on-wrong-element',
            description: `${propName} is not appropriate for <${tagName}>`,
            element: el,
            impact: 'moderate'
          })
        }
      }
    }
    
    return violations
  }

  /**
   * Validate ARIA property value based on type
   */
  private static validateAriaPropertyValue(
    value: string,
    type: string,
    enumValues?: string[]
  ): boolean {
    switch (type) {
      case 'boolean': {
        return value === 'true' || value === 'false'
      }
      
      case 'tristate': {
        return value === 'true' || value === 'false' || value === 'mixed'
      }
      
      case 'idref': {
        return value.length > 0 && /^[a-zA-Z][\w-]*$/.test(value)
      }
      
      case 'idrefs': {
        if (value.trim() === '') return false
        const ids = value.trim().split(/\s+/)
        return ids.every(id => /^[a-zA-Z][\w-]*$/.test(id))
      }
      
      case 'string': {
        return true // Strings are always valid
      }
      
      case 'enum': {
        if (!enumValues) return true
        return enumValues.includes(value)
      }
      
      case 'integer': {
        const intValue = parseInt(value, 10)
        return !isNaN(intValue) && intValue.toString() === value
      }
      
      case 'number': {
        const numValue = parseFloat(value)
        return !isNaN(numValue) && isFinite(numValue)
      }
      
      default: {
        return true
      }
    }
  }

  /**
   * Check ARIA relationships (ID references) with enhanced validation
   */
  static checkAriaRelationships(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    
    // Helper to check ID references
    const checkIdReferences = (
      elements: NodeListOf<Element>,
      attribute: string,
      violationId: string
    ) => {
      for (const el of Array.from(elements)) {
        const ids = el.getAttribute(attribute)?.split(/\s+/) || []
        const elementId = el.id || el.getAttribute('id')
        
        // Check for self-reference
        if (ids.includes(elementId || 'self')) {
          violations.push({
            id: `${violationId}-self-reference`,
            description: `${attribute} should not reference itself`,
            element: el,
            impact: 'serious'
          })
        }
        
        for (const id of ids) {
          if (!id) continue
          
          const referencedEl = element.querySelector(`#${id}`)
          
          // Check if reference exists
          if (!referencedEl) {
            violations.push({
              id: `${violationId}-reference-missing`,
              description: `${attribute} references non-existent ID: ${id}`,
              element: el,
              impact: 'serious'
            })
            continue
          }
          
          // Check if referenced element is aria-hidden
          if (referencedEl.getAttribute('aria-hidden') === 'true') {
            violations.push({
              id: `${violationId}-reference-hidden`,
              description: `${attribute} references element with aria-hidden="true" (name/description will be hidden from AT)`,
              element: el,
              impact: 'serious'
            })
          }
          
          // Check for duplicate IDs (IDs must be unique)
          const allWithId = element.querySelectorAll(`#${id}`)
          if (allWithId.length > 1) {
            violations.push({
              id: `${violationId}-duplicate-id`,
              description: `ID "${id}" is not unique in document (referenced by ${attribute})`,
              element: el,
              impact: 'serious'
            })
          }
        }
      }
    }
    
    // Check aria-labelledby references
    checkIdReferences(
      element.querySelectorAll('[aria-labelledby]'),
      'aria-labelledby',
      'aria-labelledby'
    )
    
    // Check aria-describedby references
    checkIdReferences(
      element.querySelectorAll('[aria-describedby]'),
      'aria-describedby',
      'aria-describedby'
    )
    
    // Check aria-controls references
    checkIdReferences(
      element.querySelectorAll('[aria-controls]'),
      'aria-controls',
      'aria-controls'
    )
    
    // Check aria-owns references
    checkIdReferences(
      element.querySelectorAll('[aria-owns]'),
      'aria-owns',
      'aria-owns'
    )
    
    // Check for circular aria-owns
    const ownsElements = element.querySelectorAll('[aria-owns]')
    for (const el of Array.from(ownsElements)) {
      const ids = el.getAttribute('aria-owns')?.split(/\s+/) || []
      const elementId = el.id || el.getAttribute('id')
      
      for (const id of ids) {
        if (!id) continue
        const referencedEl = element.querySelector(`#${id}`)
        if (referencedEl && referencedEl.getAttribute('aria-owns')?.includes(elementId || '')) {
          violations.push({
            id: 'aria-owns-circular-reference',
            description: 'Circular aria-owns reference detected',
            element: el,
            impact: 'serious'
          })
        }
      }
    }
    
    // Check aria-activedescendant
    const activedescendantElements = element.querySelectorAll('[aria-activedescendant]')
    for (const el of Array.from(activedescendantElements)) {
      const id = el.getAttribute('aria-activedescendant')
      if (!id) continue
      
      const referencedEl = element.querySelector(`#${id}`)
      
      if (!referencedEl) {
        violations.push({
          id: 'aria-activedescendant-reference-missing',
          description: `aria-activedescendant references non-existent ID: ${id}`,
          element: el,
          impact: 'serious'
        })
        continue
      }
      
      // Check owning element is focusable
      const isFocusable = this.isFocusable(el)
      if (!isFocusable) {
        violations.push({
          id: 'aria-activedescendant-owner-not-focusable',
          description: 'Element with aria-activedescendant should be focusable',
          element: el,
          impact: 'serious'
        })
      }
    }
    
    return violations
  }

  /**
   * Check if element is focusable
   */
  private static isFocusable(element: Element): boolean {
    const tagName = element.tagName.toLowerCase()
    const tabindex = element.getAttribute('tabindex')
    
    // Native focusable elements
    if (['a', 'button', 'input', 'select', 'textarea'].includes(tagName)) {
      return !element.hasAttribute('disabled')
    }
    
    // Elements with tabindex
    if (tabindex !== null) {
      return tabindex !== '-1'
    }
    
    return false
  }

  /**
   * Check accessible name computation
   */
  static checkAccessibleName(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    
    // Check elements that require accessible names
    const elementsRequiringName = element.querySelectorAll(
      'button, a, input, select, textarea, dialog, [role="button"], [role="link"], [role="dialog"], [role="alertdialog"]'
    )
    
    for (const el of Array.from(elementsRequiringName)) {
      const ariaLabel = el.getAttribute('aria-label')
      const ariaLabelledBy = el.getAttribute('aria-labelledby')
      const textContent = el.textContent?.trim() || ''
      const tagName = el.tagName.toLowerCase()
      
      // Check for empty aria-label
      if (ariaLabel === '') {
        violations.push({
          id: 'aria-label-empty',
          description: 'aria-label must not be empty',
          element: el,
          impact: 'serious'
        })
      }
      
      // Check aria-labelledby points to empty text
      if (ariaLabelledBy) {
        const ids = ariaLabelledBy.split(/\s+/)
        for (const id of ids) {
          if (!id) continue
          const labelEl = element.querySelector(`#${id}`)
          if (labelEl) {
            const labelText = labelEl.textContent?.trim() || ''
            const labelAriaLabel = labelEl.getAttribute('aria-label')
            if (!labelText && !labelAriaLabel) {
              violations.push({
                id: 'aria-labelledby-empty-reference',
                description: `aria-labelledby references element with no accessible text: ${id}`,
                element: el,
                impact: 'serious'
              })
            }
          }
        }
      }
      
      // Flag name from content vs aria-label mismatches
      if (textContent && ariaLabel && textContent !== ariaLabel) {
        // Check if it's a common mismatch (e.g., icon button)
        if (tagName === 'button' && textContent.length > 0 && ariaLabel.length > 0) {
          violations.push({
            id: 'aria-label-content-mismatch',
            description: `Button has visible text "${textContent}" but aria-label is "${ariaLabel}" - ensure they match or use aria-label only when text is not descriptive`,
            element: el,
            impact: 'moderate'
          })
        }
      }
      
      // Ensure aria-label is used appropriately
      // WCAG: aria-label should be used when visible label isn't available
      if (ariaLabel && tagName === 'input' && el.getAttribute('type') !== 'hidden') {
        const hasLabel = element.querySelector(`label[for="${el.id}"]`) || 
                       el.closest('label')
        if (hasLabel) {
          violations.push({
            id: 'aria-label-with-visible-label',
            description: 'aria-label should only be used when visible label is not available. Consider using <label> instead.',
            element: el,
            impact: 'moderate'
          })
        }
      }
      
      // Dialog/alertdialog accessible name enforcement
      const role = el.getAttribute('role')
      if (role === 'dialog' || role === 'alertdialog' || tagName === 'dialog') {
        const hasHeading = el.querySelector('h1, h2, h3, h4, h5, h6')
        const hasAriaLabel = ariaLabel && ariaLabel.trim() !== ''
        const hasAriaLabelledBy = ariaLabelledBy && ariaLabelledBy.trim() !== ''
        
        if (hasHeading && !hasAriaLabelledBy) {
          violations.push({
            id: 'dialog-prefer-labelledby',
            description: 'Dialog with visible heading should use aria-labelledby instead of aria-label',
            element: el,
            impact: 'moderate'
          })
        }
        
        if (!hasAriaLabel && !hasAriaLabelledBy && !hasHeading) {
          violations.push({
            id: 'dialog-missing-name',
            description: 'Dialog must have accessible name (aria-label, aria-labelledby, or heading)',
            element: el,
            impact: 'critical'
          })
        }
      }
    }
    
    return violations
  }

  /**
   * Check composite patterns (tab/listbox/menu/tree)
   */
  static checkCompositePatterns(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    
    // Tab pattern validation
    const tabs = element.querySelectorAll('[role="tab"]')
    for (const tab of Array.from(tabs)) {
      const tablist = tab.closest('[role="tablist"]')
      if (!tablist) {
        violations.push({
          id: 'tab-missing-tablist',
          description: 'Tab must be inside a tablist',
          element: tab,
          impact: 'serious'
        })
      }
      
      // Check tabpanel association
      const controls = tab.getAttribute('aria-controls')
      if (controls) {
        const tabpanel = element.querySelector(`#${controls}`)
        if (!tabpanel || tabpanel.getAttribute('role') !== 'tabpanel') {
          violations.push({
            id: 'tab-invalid-controls',
            description: 'Tab aria-controls must reference a tabpanel',
            element: tab,
            impact: 'serious'
          })
        }
      }
    }
    
    // Listbox pattern validation
    const listboxes = element.querySelectorAll('[role="listbox"]')
    for (const listbox of Array.from(listboxes)) {
      const options = listbox.querySelectorAll('[role="option"]')
      if (options.length === 0) {
        violations.push({
          id: 'listbox-missing-options',
          description: 'Listbox must contain option elements',
          element: listbox,
          impact: 'serious'
        })
      }
    }
    
    // Menu pattern validation
    const menus = element.querySelectorAll('[role="menu"], [role="menubar"]')
    for (const menu of Array.from(menus)) {
      const menuitems = menu.querySelectorAll('[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]')
      if (menuitems.length === 0) {
        violations.push({
          id: 'menu-missing-menuitems',
          description: 'Menu must contain menuitem elements',
          element: menu,
          impact: 'serious'
        })
      }
    }
    
    // Tree pattern validation
    const trees = element.querySelectorAll('[role="tree"]')
    for (const tree of Array.from(trees)) {
      const treeitems = tree.querySelectorAll('[role="treeitem"]')
      if (treeitems.length === 0) {
        violations.push({
          id: 'tree-missing-treeitems',
          description: 'Tree must contain treeitem elements',
          element: tree,
          impact: 'serious'
        })
      }
    }
    
    // Validate focusability for non-native elements with interactive roles
    const interactiveRoles = ['button', 'link', 'menuitem', 'tab', 'option']
    for (const role of interactiveRoles) {
      const elements = element.querySelectorAll(`[role="${role}"]`)
      for (const el of Array.from(elements)) {
        const tagName = el.tagName.toLowerCase()
        if (!['button', 'a', 'input'].includes(tagName)) {
          const tabindex = el.getAttribute('tabindex')
          if (tabindex === null || tabindex === '-1') {
            violations.push({
              id: 'interactive-role-not-focusable',
              description: `Element with role="${role}" should be focusable (add tabindex="0" or use native element)`,
              element: el,
              impact: 'serious'
            })
          }
        }
      }
    }
    
    return violations
  }

  /**
   * Check semantic HTML usage and structure
   */
  static checkSemanticHTML(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    
    // Check for generic element misuse (div/span with roles or onclick)
    const divsWithRole = element.querySelectorAll('div[role], span[role]')
    for (const el of Array.from(divsWithRole)) {
      const role = el.getAttribute('role')
      const tagName = el.tagName.toLowerCase()
      
      // Map roles to semantic elements
      const roleToElement: Record<string, string> = {
        'button': 'button',
        'link': 'a',
        'heading': 'h1-h6',
        'list': 'ul or ol',
        'listitem': 'li',
        'navigation': 'nav',
        'main': 'main',
        'article': 'article',
        'section': 'section',
        'banner': 'header',
        'contentinfo': 'footer',
        'complementary': 'aside',
        'form': 'form',
        'dialog': 'dialog'
      }
      
      if (role && roleToElement[role]) {
        violations.push({
          id: 'semantic-element-preferred',
          description: `Use <${roleToElement[role]}> instead of <${tagName} role="${role}">`,
          element: el,
          impact: 'moderate'
        })
      }
    }
    
    // Check for interactive elements inside interactive elements
    const interactiveSelectors = 'button, a[href], input[type="button"], input[type="submit"], input[type="reset"], [role="button"], [role="link"]'
    const interactiveElements = element.querySelectorAll(interactiveSelectors)
    for (const el of Array.from(interactiveElements)) {
      const parent = el.parentElement
      if (parent && parent.matches(interactiveSelectors)) {
        violations.push({
          id: 'nested-interactive',
          description: 'Interactive element cannot be nested inside another interactive element',
          element: el,
          impact: 'serious'
        })
      }
    }
    
    // Check anchor without href
    const anchors = element.querySelectorAll('a')
    for (const anchor of Array.from(anchors)) {
      if (!anchor.hasAttribute('href')) {
        violations.push({
          id: 'anchor-without-href',
          description: '<a> without href should be <button> or have href attribute',
          element: anchor,
          impact: 'moderate'
        })
      }
    }
    
    // Check button type in forms
    const forms = element.querySelectorAll('form')
    for (const form of Array.from(forms)) {
      const buttons = form.querySelectorAll('button')
      for (const button of Array.from(buttons)) {
        if (!button.hasAttribute('type')) {
          violations.push({
            id: 'button-missing-type',
            description: '<button> in form should have type="button" to prevent accidental submit',
            element: button,
            impact: 'moderate'
          })
        }
      }
    }
    
    // Check list structure
    const listItems = element.querySelectorAll('li')
    for (const li of Array.from(listItems)) {
      const parent = li.parentElement
      const parentTag = parent?.tagName.toLowerCase()
      if (parent && parentTag !== 'ul' && parentTag !== 'ol' && parentTag !== 'menu') {
        violations.push({
          id: 'list-item-outside-list',
          description: '<li> must be a child of <ul>, <ol>, or <menu>',
          element: li,
          impact: 'serious'
        })
      }
    }
    
    // Check description list structure
    const dts = element.querySelectorAll('dt, dd')
    for (const el of Array.from(dts)) {
      const dl = el.closest('dl')
      if (!dl) {
        violations.push({
          id: 'dt-dd-outside-dl',
          description: `<${el.tagName.toLowerCase()}> must appear under a <dl>`,
          element: el,
          impact: 'serious'
        })
      }
    }
    
    // Note: Image alt text is checked by checkImageAlt() - not duplicated here
    
    // Check figure structure
    const figcaptions = element.querySelectorAll('figcaption')
    for (const figcaption of Array.from(figcaptions)) {
      const figure = figcaption.closest('figure')
      if (!figure) {
        violations.push({
          id: 'figcaption-outside-figure',
          description: '<figcaption> must be inside <figure>',
          element: figcaption,
          impact: 'serious'
        })
      }
    }
    
    const figures = element.querySelectorAll('figure')
    for (const figure of Array.from(figures)) {
      const figcaptions = figure.querySelectorAll('figcaption')
      if (figcaptions.length > 1) {
        violations.push({
          id: 'figure-multiple-figcaptions',
          description: '<figure> should not have multiple <figcaption> elements',
          element: figure,
          impact: 'serious'
        })
      }
    }
    
    // Check landmark uniqueness
    const mains = element.querySelectorAll('main')
    if (mains.length > 1) {
      for (const main of Array.from(mains)) {
        violations.push({
          id: 'multiple-main',
          description: 'Document should have only one <main> element',
          element: main,
          impact: 'serious'
        })
      }
    }
    
    // Check multiple landmarks require labels
    const navs = element.querySelectorAll('nav')
    if (navs.length > 1) {
      for (const nav of Array.from(navs)) {
        const hasLabel = nav.hasAttribute('aria-label') || nav.hasAttribute('aria-labelledby')
        if (!hasLabel) {
          violations.push({
            id: 'multiple-nav-without-label',
            description: 'Multiple <nav> elements require accessible names (aria-label or aria-labelledby)',
            element: nav,
            impact: 'moderate'
          })
        }
      }
    }
    
    // Check form label associations
    const formControls = element.querySelectorAll('input, select, textarea')
    for (const control of Array.from(formControls)) {
      if (control.getAttribute('type') === 'hidden') continue
      
      const id = control.id
      const hasAriaLabel = control.hasAttribute('aria-label')
      const hasAriaLabelledBy = control.hasAttribute('aria-labelledby')
      const isWrappedInLabel = control.closest('label')
      const hasLabelFor = id && element.querySelector(`label[for="${id}"]`)
      
      if (!hasAriaLabel && !hasAriaLabelledBy && !isWrappedInLabel && !hasLabelFor) {
        violations.push({
          id: 'form-control-missing-label',
          description: 'Form control must have associated label',
          element: control,
          impact: 'serious'
        })
      }
    }
    
    // Check ID uniqueness
    const ids = new Map<string, Element[]>()
    const elementsWithIds = element.querySelectorAll('[id]')
    for (const el of Array.from(elementsWithIds)) {
      const id = el.id
      if (id) {
        if (!ids.has(id)) {
          ids.set(id, [])
        }
        const elements = ids.get(id)
        if (elements) {
          elements.push(el)
        }
      }
    }
    
    for (const [id, elements] of ids.entries()) {
      if (elements.length > 1) {
        for (const el of elements) {
          violations.push({
            id: 'duplicate-id',
            description: `Duplicate ID "${id}" found - IDs must be unique`,
            element: el,
            impact: 'serious'
          })
        }
      }
    }
    
    return violations
  }

  /**
   * Check form validation messages
   */
  static checkFormValidationMessages(element: Element): A11yViolation[] {
    const violations: A11yViolation[] = []
    
    // Check aria-invalid usage
    const invalidElements = element.querySelectorAll('[aria-invalid]')
    for (const el of Array.from(invalidElements)) {
      const ariaInvalid = el.getAttribute('aria-invalid')
      if (ariaInvalid === 'true') {
        // Check if there's an associated error message
        const describedBy = el.getAttribute('aria-describedby')
        if (describedBy) {
          const ids = describedBy.split(/\s+/)
          let hasErrorMessage = false
          for (const id of ids) {
            const errorEl = element.querySelector(`#${id}`)
            if (errorEl) {
              const errorText = errorEl.textContent?.trim() || ''
              const errorAriaLabel = errorEl.getAttribute('aria-label')
              if (errorText || errorAriaLabel) {
                hasErrorMessage = true
                break
              }
            }
          }
          
          if (!hasErrorMessage) {
            violations.push({
              id: 'aria-invalid-without-message',
              description: 'Element with aria-invalid="true" should have associated error message via aria-describedby',
              element: el,
              impact: 'serious'
            })
          }
        } else {
          violations.push({
            id: 'aria-invalid-without-describedby',
            description: 'Element with aria-invalid="true" should have aria-describedby pointing to error message',
            element: el,
            impact: 'serious'
          })
        }
      }
    }
    
    // Check required fields have indicators
    const requiredFields = element.querySelectorAll('[required], [aria-required="true"]')
    for (const field of Array.from(requiredFields)) {
      const label = element.querySelector(`label[for="${field.id}"]`) || field.closest('label')
      if (label) {
        const labelText = label.textContent || ''
        // Check if label indicates required (common patterns)
        const hasRequiredIndicator = labelText.includes('*') || 
                                     labelText.toLowerCase().includes('required') ||
                                     field.hasAttribute('aria-required')
        
        if (!hasRequiredIndicator && !field.hasAttribute('aria-required')) {
          violations.push({
            id: 'required-field-indicator',
            description: 'Required field should have visual indicator (e.g., *) or aria-required attribute',
            element: field,
            impact: 'moderate'
          })
        }
      }
    }
    
    return violations
  }
} 