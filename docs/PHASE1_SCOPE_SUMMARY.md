# Phase 1 Scope Summary

Quick reference for Phase 1 implementation scope.

## ARIA Validation Scope

### Supported in Phase 1 (v0.8.0)

**ARIA Roles: ~50 roles** (40 original + 10 high priority additions)
- Widget roles: button, checkbox, radio, switch, tab, tabpanel, combobox, slider, etc.
- Composite widget roles: menu, menubar, tablist, tree, treegrid, grid, listbox
- Document structure roles: article, section, navigation, main, complementary, etc.
- Landmark roles: banner, application
- Live region roles: alert, status, log, marquee, timer
- Window roles: dialog, alertdialog
- **High priority additions:** link, heading, img, progressbar, meter, separator, toolbar, tooltip, none, presentation

**ARIA Properties: ~40 properties** (35 original + 5 high priority additions)
- Labeling: aria-label, aria-labelledby, aria-describedby
- Relationships: aria-owns, aria-controls, aria-flowto, aria-activedescendant
- Live regions: aria-live, aria-atomic, aria-relevant, aria-busy
- Global: aria-hidden, aria-invalid, aria-required, aria-readonly, aria-disabled
- Widget: aria-checked, aria-expanded, aria-pressed, aria-selected, aria-modal, etc.
- Range: aria-valuemax, aria-valuemin, aria-valuenow, aria-valuetext
- **High priority additions:** aria-current, aria-keyshortcuts, aria-roledescription, aria-posinset, aria-setsize
- **Deprecated (warn/error):** aria-dropeffect, aria-grabbed

**ARIA States: ~10 states**
- Widget states: aria-checked, aria-selected, aria-expanded, aria-pressed, aria-disabled, aria-readonly, aria-required, aria-invalid
- Live region states: aria-busy
- Global states: aria-hidden

**Enhanced Validation Features:**
- ✅ **Role context rules** (required parent/children: tab/tablist, option/listbox, menuitem/menu, etc.)
- ✅ **Accessible name computation** (empty checks, content mismatches, appropriate usage)
- ✅ **ARIA-in-HTML conformance** (authoring restrictions)
- ✅ **Redundant/conflicting role detection** (button role="button", etc.)
- ✅ **Enhanced ID reference validation** (self-ref, circular, unique IDs, aria-hidden checks)
- ✅ **Composite pattern validator** (tab/listbox/menu/tree patterns, focusability)

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
- **Roles:** 50 supported / ~80 total (62.5% coverage)
- **Properties:** 40 supported / ~50 total (80% coverage)
- **States:** 10 supported / ~12 total (83% coverage)
- **Coverage:** ~75% of common ARIA usage (enhanced with context rules, accessible name, composite patterns)

### Semantic HTML Validation
- **Elements:** 60 supported / ~100+ total
- **Patterns:** 7 validation patterns
- **Coverage:** ~90% of common semantic HTML usage

### Form Validation
- **Patterns:** 3 validation patterns
- **Coverage:** Common form validation patterns

---

## Implementation Timeline

**Total: 7-8 weeks** (updated with enhanced ARIA features)

- **Weeks 1-4:** ARIA Validation (50 roles, 40 properties, 10 states + context rules + accessible name + composite patterns)
- **Weeks 5-6:** Semantic HTML Validation (60 elements, 7 patterns)
- **Weeks 7-8:** Form Validation Messages (3 patterns)

---

## Success Metrics

- ✅ 50+ ARIA roles validated (including high priority additions)
- ✅ 40+ ARIA properties validated (including high priority additions)
- ✅ Role context rules validated (required parent/children)
- ✅ Accessible name computation validated
- ✅ ARIA-in-HTML conformance validated
- ✅ Redundant/conflicting role detection
- ✅ Enhanced ID reference validation
- ✅ Composite pattern validation
- ✅ 60+ semantic HTML elements validated
- ✅ 7 semantic HTML patterns validated
- ✅ 3 form validation patterns validated
- ✅ ESLint rules working for JSX, Vue, HTML
- ✅ 90%+ test coverage
- ✅ Documentation complete

