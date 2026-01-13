# Breaking Changes - v0.10.0

## Critical Fix: Memory Exhaustion Resolved

Version 0.10.0 fixes a critical issue where the ESLint plugin caused JavaScript heap exhaustion in large projects.

## What Changed

### ESLint Plugin Architecture

The ESLint plugin has been completely refactored to remove JSDOM dependency, resulting in:

- ✅ **58% smaller bundle** (132KB → 55KB)
- ✅ **Zero memory issues** - no more heap exhaustion
- ✅ **Faster linting** - pure AST validation
- ⚠️ **3 rules temporarily disabled** (see below)

### Temporarily Disabled Rules

The following rules are disabled in v0.10.0 and will be re-enabled in future versions after refactoring:

1. **`aria-validation`** - Comprehensive ARIA validation
2. **`semantic-html`** - Semantic HTML usage checks  
3. **`form-validation`** - Form validation patterns

**Impact:** If your ESLint config explicitly enables these rules, they will be silently ignored until re-enabled.

**Workaround:** Use the A11yChecker core library in your tests to validate these patterns:

```javascript
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

// In your tests
const violations = A11yChecker.check(renderedHTML)
```

### Active Rules (13)

These rules continue to work and are **better than before** (faster, no memory issues):

- `image-alt` - Images must have alt attributes
- `button-label` - Buttons must have labels
- `link-text` - Links must have descriptive text
- `form-label` - Form controls must have labels
- `heading-order` - Headings must be in logical order
- `iframe-title` - Iframes must have title attributes
- `fieldset-legend` - Fieldsets must have legends
- `table-structure` - Tables must have proper structure
- `details-summary` - Details elements must have summaries
- `video-captions` - Videos should have captions
- `audio-captions` - Audio should have captions
- `landmark-roles` - Proper use of landmark roles
- `dialog-modal` - Dialogs must be properly marked

## Migration Guide

### No Action Required for Most Users

If you're using the recommended config, you're good to go:

```json
{
  "extends": ["plugin:test-a11y-js/recommended"]
}
```

The plugin will work better than before with zero changes needed.

### If You Explicitly Enable Disabled Rules

**Before v0.10.0:**
```json
{
  "plugins": ["test-a11y-js"],
  "rules": {
    "test-a11y-js/aria-validation": "error",
    "test-a11y-js/semantic-html": "error",
    "test-a11y-js/form-validation": "error"
  }
}
```

**After v0.10.0:**
These rules won't run. Remove them from your config or wait for them to be re-enabled in a future release.

### Using A11yChecker Core (No Changes)

The core library API remains **100% unchanged**:

```javascript
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

// Still works exactly the same
const violations = A11yChecker.check('<div>...</div>')
```

## Why These Changes?

### The Problem

```
FATAL ERROR: Ineffective mark-compacts near heap limit
Allocation failed - JavaScript heap out of memory
```

Large projects (500+ components) were experiencing Node.js crashes during ESLint runs because:

1. Every ESLint rule was importing JSDOM
2. JSDOM instances accumulated during linting
3. Memory exhaustion after checking hundreds of files

### The Solution

Separate static analysis (ESLint) from runtime validation (A11yChecker):

- **ESLint Plugin**: Pure AST validation, no JSDOM, no memory issues
- **A11yChecker Core**: Full JSDOM validation for tests and runtime

Both tools are still available and serve different purposes.

## Timeline

- **v0.10.0** (Current) - Fixed memory issues, 3 rules temporarily disabled
- **v0.11.0** (Planned) - Re-enable `aria-validation` with AST approach
- **v0.12.0** (Planned) - Re-enable `semantic-html` and `form-validation`

## Questions?

### "Will the disabled rules come back?"

Yes! They'll be rewritten to use AST validation (without JSDOM) and re-enabled in upcoming releases.

### "Should I downgrade to v0.9.x?"

**No.** v0.9.x has critical memory issues that make it unusable in large projects. v0.10.0 is stable and production-ready.

### "How do I validate ARIA now?"

Use A11yChecker in your tests:

```javascript
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'
import { render } from '@testing-library/react'

test('accessibility', () => {
  const { container } = render(<MyComponent />)
  const violations = A11yChecker.check(container.innerHTML)
  expect(violations).toHaveLength(0)
})
```

### "Is this stable?"

Yes. The 13 active rules are battle-tested and working better than ever. The 3 disabled rules are the only limitation, and they can be validated using the core library.

## See Also

- [Architecture Refactor Guide](./docs/ARCHITECTURE_REFACTOR.md) - Deep dive into the changes
- [Configuration Guide](./docs/CONFIGURATION.md) - How to configure the plugin
- [Integration Guide](./docs/INTEGRATION.md) - Using with tests

