# Roadmap

This document outlines the planned features and improvements for `test-a11y-js`.

## Implementation Phases

### Phase 1: Static Validation (v0.8.0) - In Progress
**Timeline:** 6-7 weeks  
**Status:** Planning complete, ready for implementation  
**See:** [Detailed Implementation Plan](./IMPLEMENTATION_PLAN.md)

1. ✅ **Comprehensive ARIA Validation** (2-3 weeks)
   - ARIA role validation
   - ARIA property validation
   - ARIA relationship validation

2. ✅ **Semantic HTML Validation** (1-2 weeks)
   - Semantic element detection
   - List structure validation

3. ✅ **Form Validation Messages** (1-2 weeks)
   - Error message association
   - Required field indicators

### Phase 2: Runtime Validation (v0.9.0) - Planned
**Timeline:** 7-10 weeks  
**Status:** Research phase

4. **Keyboard Navigation Testing** (4-6 weeks)
   - Tab order validation
   - Focus trap detection
   - Keyboard event handling
   - **Note:** Programmatic API only, not ESLint compatible

5. **Focus Visible Indicators** (3-4 weeks)
   - Focus indicator validation
   - CSS parsing for focus styles
   - **Note:** Programmatic API only, requires CSS parsing

## Current Status

**Version:** 0.7.3

**Supported Rules:** 13
- `image-alt` - Image alt attribute validation
- `button-label` - Button label validation
- `link-text` - Link text validation
- `form-label` - Form control label validation
- `heading-order` - Heading hierarchy validation
- `iframe-title` - Iframe title attribute validation
- `fieldset-legend` - Fieldset legend validation
- `table-structure` - Table structure validation
- `details-summary` - Details/Summary validation
- `video-captions` - Video captions validation
- `audio-captions` - Audio captions validation
- `landmark-roles` - Landmark elements validation
- `dialog-modal` - Dialog/Modal validation

**Supported Elements:** 27
- img, button, a, input, select, textarea, h1-h6, iframe, fieldset, table, details, summary, video, audio, nav, main, header, footer, aside, section, article, dialog

## Implementation Priority

### Phase 1: High Impact, Low Complexity (Quick Wins)

These are simple to implement and provide immediate value:

#### 1. fieldset-legend Rule
**Priority:** High  
**Complexity:** Low  
**Estimated Time:** 1-2 days

**Description:**  
Validate that `<fieldset>` elements have an associated `<legend>` child element.

**WCAG Reference:**  
- Success Criterion 1.3.1 (Info and Relationships)

**Implementation:**
- Check for `<legend>` as direct child of `<fieldset>`
- Support JSX, Vue, and HTML strings

**Resources:**
- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset#accessibility
- WCAG: https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html

---

#### 2. table-structure Rule ✅ COMPLETED
**Priority:** High  
**Complexity:** Medium  
**Status:** Implemented in v0.5.7

**Description:**  
Validate table accessibility including caption, header cells (`<th>`), and scope attributes.

**WCAG Reference:**
- Success Criterion 1.3.1 (Info and Relationships)

**Checks:**
- ✅ Tables should have `<caption>` or `aria-label`/`aria-labelledby`
- ✅ Header cells should use `<th>` instead of styled `<td>`
- ✅ Header cells should have `scope` attribute
- ⚠️ Complex tables should use `headers` attribute (future enhancement)

**Resources:**
- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#accessibility
- WCAG: https://www.w3.org/WAI/tutorials/tables/

---

### Phase 2: Medium Complexity

#### 3. video-captions Rule ✅ COMPLETED
**Priority:** Medium  
**Complexity:** Medium  
**Status:** Implemented in v0.5.9

**Description:**  
Validate that `<video>` elements have captions via `<track>` elements.

**WCAG Reference:**
- Success Criterion 1.2.2 (Captions - Prerecorded)

**Checks:**
- ✅ Video elements should have `<track kind="captions">` elements
- ✅ Track elements should have `srclang` attribute
- ✅ Track elements should have `label` attribute

**Resources:**
- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#accessibility
- WCAG: https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html

---

#### 4. audio-captions Rule ✅ COMPLETED
**Priority:** Medium  
**Complexity:** Medium  
**Status:** Implemented in v0.6.0

**Description:**  
Validate that `<audio>` elements have captions/transcripts.

**WCAG Reference:**
- Success Criterion 1.2.1 (Audio-only and Video-only)

**Checks:**
- ✅ Audio elements should have `<track>` elements or transcripts
- ✅ Similar validation to video-captions

**Resources:**
- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#accessibility

---

#### 5. details-summary Rule
**Priority:** Medium  
**Complexity:** Medium  
**Estimated Time:** 2-3 days

**Description:**  
Validate that `<details>` elements have a `<summary>` child.

**WCAG Reference:**
- Success Criterion 4.1.2 (Name, Role, Value)

**Checks:**
- `<details>` must have a `<summary>` as first child
- Summary should have descriptive text

**Resources:**
- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#accessibility

---

### Phase 3: Advanced Features

#### 6. Landmark Elements Validation ✅ COMPLETED
**Priority:** Medium  
**Complexity:** High  
**Status:** Implemented in v0.6.1

**Description:**  
Validate proper use of landmark elements (`<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`, `<section>`, `<article>`).

**WCAG Reference:**
- Success Criterion 1.3.1 (Info and Relationships)
- ARIA Landmarks: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/

**Checks:**
- ✅ Only one `<main>` element per page
- ✅ Landmark elements should have accessible names when needed
- ⚠️ Proper nesting of landmark elements (basic check implemented)

**Elements:**
- nav, main, header, footer, aside, section, article

---

#### 7. dialog-modal Rule ✅ COMPLETED
**Priority:** Low  
**Complexity:** High  
**Status:** Implemented in v0.6.2

**Description:**  
Validate modal dialog accessibility patterns.

**WCAG Reference:**
- Success Criterion 2.4.3 (Focus Order)
- Success Criterion 4.1.3 (Status Messages)

**Checks:**
- ✅ Dialog should have accessible name (`aria-label` or `aria-labelledby`)
- ✅ ARIA attributes (`aria-modal`, `role="dialog"`)
- ⚠️ Focus management (focus trap) - requires runtime testing
- ⚠️ Escape key handling - requires runtime testing

**Resources:**
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

---

### Phase 4: Advanced Rules

#### 8. color-contrast Rule
**Priority:** Medium  
**Complexity:** Very High  
**Estimated Time:** 5-7 days

**Description:**  
Check color contrast ratios against WCAG standards.

**WCAG Reference:**
- Success Criterion 1.4.3 (Contrast - Minimum)
- Success Criterion 1.4.6 (Contrast - Enhanced)

**Challenges:**
- Requires CSS parsing and color calculation
- Need to compute contrast ratios
- Handle background/foreground color detection

**Resources:**
- WCAG: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- Contrast Calculator: https://webaim.org/resources/contrastchecker/

---

#### 9. keyboard-navigation Rule
**Priority:** Medium  
**Complexity:** Very High  
**Estimated Time:** 5-7 days

**Description:**  
Check keyboard accessibility and focus management.

**WCAG Reference:**
- Success Criterion 2.1.1 (Keyboard)
- Success Criterion 2.4.3 (Focus Order)

**Checks:**
- All interactive elements are keyboard accessible
- Tab order is logical
- Focus indicators are visible
- No keyboard traps

**Challenges:**
- Requires runtime analysis
- May need integration with testing frameworks

---

#### 10. focus-visible Rule
**Priority:** Low  
**Complexity:** High  
**Estimated Time:** 3-4 days

**Description:**  
Check that focus indicators are visible.

**WCAG Reference:**
- Success Criterion 2.4.7 (Focus Visible)

**Challenges:**
- Requires CSS analysis
- Need to detect focus styles

---

#### 11. aria-roles Rule
**Priority:** Medium  
**Complexity:** High  
**Estimated Time:** 4-5 days

**Description:**  
Validate proper use of ARIA roles.

**Checks:**
- Valid ARIA roles
- Role attributes match element semantics
- Required ARIA properties for roles
- Prohibited ARIA properties for roles

**Resources:**
- ARIA Specification: https://www.w3.org/TR/wai-aria-1.2/#roles
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/

---

#### 12. aria-properties Rule
**Priority:** Medium  
**Complexity:** High  
**Estimated Time:** 4-5 days

**Description:**  
Validate ARIA properties are valid and used correctly.

**Checks:**
- Valid ARIA attributes
- Required properties for roles
- Valid values for ARIA attributes
- Relationships (aria-labelledby, aria-describedby) reference valid IDs

**Resources:**
- ARIA Specification: https://www.w3.org/TR/wai-aria-1.2/#props

---

#### 13. semantic-html Rule
**Priority:** Low  
**Complexity:** Medium  
**Estimated Time:** 3-4 days

**Description:**  
Encourage use of semantic HTML elements.

**Checks:**
- Use semantic elements instead of divs with roles
- Proper heading structure
- Use of `<article>`, `<section>`, `<nav>`, etc.

---

#### 14. form-validation Rule
**Priority:** Medium  
**Complexity:** High  
**Estimated Time:** 4-5 days

**Description:**  
Validate form validation and error handling.

**WCAG Reference:**
- Success Criterion 3.3.1 (Error Identification)
- Success Criterion 3.3.2 (Labels or Instructions)

**Checks:**
- Error messages are associated with form controls
- Required fields are indicated
- Validation errors are announced
- Error messages are descriptive

---

## Reference Sources

When implementing new rules, refer to these authoritative sources:

### Primary Sources
1. **WCAG 2.1 Guidelines**
   - URL: https://www.w3.org/WAI/WCAG21/quickref/
   - Use for: Accessibility requirements and success criteria

2. **ARIA Authoring Practices Guide (APG)**
   - URL: https://www.w3.org/WAI/ARIA/apg/
   - Use for: ARIA patterns, roles, and properties

3. **MDN Web Docs**
   - URL: https://developer.mozilla.org/en-US/docs/Web/Accessibility
   - Use for: HTML element accessibility requirements

4. **WAI-ARIA Specification**
   - URL: https://www.w3.org/TR/wai-aria-1.2/
   - Use for: ARIA attributes and roles

### Secondary Sources
5. **eslint-plugin-jsx-a11y**
   - URL: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
   - Use for: Rule patterns and implementation examples

6. **axe-core Rules**
   - URL: https://github.com/dequelabs/axe-core/tree/develop/doc/rule-descriptions
   - Use for: Rule descriptions and test cases

7. **WebAIM**
   - URL: https://webaim.org/
   - Use for: Practical accessibility guidance

## Implementation Checklist

For each new rule, follow this checklist:

### 1. Research & Documentation
- [ ] Review WCAG guidelines for element/pattern
- [ ] Check ARIA Authoring Practices Guide
- [ ] Review MDN documentation
- [ ] Check existing ESLint plugins (eslint-plugin-jsx-a11y) for patterns
- [ ] Document requirements in this roadmap

### 2. Core Implementation
- [ ] Add check method to `A11yChecker` class
- [ ] Create ESLint rule file
- [ ] Add rule to plugin index
- [ ] Update `checks.json` (move from notSupported to supported)

### 3. Framework Support
- [ ] Test with JSX
- [ ] Test with Vue templates
- [ ] Test with HTML strings

### 4. Configuration
- [ ] Add to recommended config
- [ ] Add to strict config
- [ ] Verify React and Vue configs inherit correctly

### 5. Testing
- [ ] Unit tests for core check method
- [ ] ESLint rule structure tests
- [ ] Integration tests
- [ ] Real-world examples

### 6. Documentation
- [ ] Update rule documentation
- [ ] Add examples to EXAMPLES.md
- [ ] Update checks.json
- [ ] Update README if needed

## Version Planning

### v0.6.2 (Current Release)
- [x] dialog-modal rule

**🎉 All planned HTML elements are now supported!**

### v0.5.0
- [ ] video-captions rule
- [ ] audio-captions rule
- [ ] details-summary rule

### v0.6.0
- [ ] Landmark elements validation
- [ ] dialog-modal rule

### v0.8.0 - Phase 1: Static Validation (Planned)
- [ ] Comprehensive ARIA validation (aria-roles, aria-properties, aria-relationships)
- [ ] Semantic HTML validation
- [ ] Form validation messages
- **Timeline:** 6-7 weeks
- **See:** [Implementation Plan](./IMPLEMENTATION_PLAN.md)

### v0.9.0 - Phase 2: Runtime Validation (Planned)
- [ ] Keyboard navigation testing (Programmatic API only)
- [ ] Focus visible indicators (Programmatic API only)
- **Timeline:** 7-10 weeks
- **Note:** These features require runtime/DOM APIs and are not ESLint compatible

### Future Considerations
- [ ] color-contrast rule (requires color calculation)

## Contributing

If you'd like to contribute by implementing one of these features:

1. Check the roadmap for priority items
2. Create an issue to discuss the implementation
3. Follow the implementation checklist
4. Submit a pull request with tests and documentation

## Notes

- **Complexity estimates** are rough and may vary based on implementation details
- **Priority** is based on impact and frequency of violations
- **Time estimates** assume working on one feature at a time
- Some features may require additional dependencies or build configuration changes

---

**Last Updated:** 2024-12-22  
**Current Version:** 0.3.0

