# Phase 1 Scope Summary

Quick reference for Phase 1 implementation scope.

## ARIA Validation Scope

### Supported in Phase 1 (v0.8.0)

**ARIA Roles: ~40 roles**
- Widget roles: button, checkbox, radio, switch, tab, tabpanel, combobox, slider, etc.
- Composite widget roles: menu, menubar, tablist, tree, treegrid, grid, listbox
- Document structure roles: article, section, navigation, main, complementary, etc.
- Landmark roles: banner, application
- Live region roles: alert, status, log, marquee, timer
- Window roles: dialog, alertdialog

**ARIA Properties: ~35 properties**
- Labeling: aria-label, aria-labelledby, aria-describedby
- Relationships: aria-owns, aria-controls, aria-flowto, aria-activedescendant
- Live regions: aria-live, aria-atomic, aria-relevant, aria-busy
- Global: aria-hidden, aria-invalid, aria-required, aria-readonly, aria-disabled
- Widget: aria-checked, aria-expanded, aria-pressed, aria-selected, aria-modal, etc.
- Range: aria-valuemax, aria-valuemin, aria-valuenow, aria-valuetext

**ARIA States: ~10 states**
- Widget states: aria-checked, aria-selected, aria-expanded, aria-pressed, aria-disabled, aria-readonly, aria-required, aria-invalid
- Live region states: aria-busy
- Global states: aria-hidden

**See:** [ARIA Validation Scope](./ARIA_VALIDATION_SCOPE.md) for complete list

### Not Supported in Phase 1
- Complex table roles (cell, rowheader, columnheader)
- Specialized roles (feed, figure, group, img, list, listitem, math, etc.)
- Complex table properties (aria-colcount, aria-colindex, aria-rowcount, etc.)
- Specialized properties (aria-keyshortcuts, aria-roledescription, aria-current, etc.)

---

## Semantic HTML Validation Scope

### Supported in Phase 1 (v0.8.0)

**Semantic Elements: ~60 elements**
- Text content: h1-h6, p, blockquote, pre, code, em, strong, mark, time, abbr, etc.
- Sectioning: header, footer, nav, main, article, section, aside, address
- Lists: ul, ol, li, dl, dt, dd
- Forms: form, fieldset, legend, label, input, button, select, textarea, output, meter, progress
- Tables: table, caption, thead, tbody, tfoot, tr, th, td, colgroup, col
- Interactive: a, button, details, summary, dialog, menu
- Media: img, video, audio, picture, source, track, figure, figcaption

**Validation Patterns:**
- Generic element misuse: div/span with roles, div/span with onclick
- List structure: ul/ol must contain li, li must be in ul/ol, dl structure
- Heading hierarchy: No skipped levels, proper nesting
- Form structure: fieldset/legend, form element nesting
- Table structure: caption, thead/tbody/tfoot, th scope
- Media structure: figure/figcaption, picture/source

**See:** [Semantic HTML Validation Scope](./SEMANTIC_HTML_SCOPE.md) for complete list

### Not Supported in Phase 1
- Context-aware semantic suggestions
- CSS-based semantic detection
- JavaScript pattern detection
- Framework-specific patterns
- Custom element validation
- Web Component validation

---

## Form Validation Messages Scope

### Supported in Phase 1 (v0.8.0)

**Error Message Association:**
- aria-invalid usage validation
- aria-describedby linking to error messages
- Error message accessibility (visibility, aria-live)
- ID reference validation

**Required Field Indicators:**
- aria-required validation
- Visual indicator detection in labels
- Required field consistency

**Validation State:**
- aria-invalid value validation
- Validation state consistency
- Error message content structure

**See:** [Implementation Plan](./IMPLEMENTATION_PLAN.md#3-form-validation-messages) for details

---

## Quick Stats

### ARIA Validation
- **Roles:** 40 supported / ~80 total
- **Properties:** 35 supported / ~50 total
- **States:** 10 supported / ~12 total
- **Coverage:** ~70% of common ARIA usage

### Semantic HTML Validation
- **Elements:** 60 supported / ~100+ total
- **Patterns:** 7 validation patterns
- **Coverage:** ~90% of common semantic HTML usage

### Form Validation
- **Patterns:** 3 validation patterns
- **Coverage:** Common form validation patterns

---

## Implementation Timeline

**Total: 6-7 weeks**

- **Weeks 1-3:** ARIA Validation (40 roles, 35 properties, 10 states)
- **Weeks 4-5:** Semantic HTML Validation (60 elements, 7 patterns)
- **Weeks 6-7:** Form Validation Messages (3 patterns)

---

## Success Metrics

- ✅ 40+ ARIA roles validated
- ✅ 35+ ARIA properties validated
- ✅ 60+ semantic HTML elements validated
- ✅ 7 semantic HTML patterns validated
- ✅ 3 form validation patterns validated
- ✅ ESLint rules working for JSX, Vue, HTML
- ✅ 90%+ test coverage
- ✅ Documentation complete

