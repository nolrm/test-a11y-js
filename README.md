# eslint-plugin-test-a11y-js

> **Catch accessibility issues in your editor, not in production.** Zero-config ESLint plugin + programmatic API for React, Vue, and JSX.

[![npm version](https://img.shields.io/npm/v/eslint-plugin-test-a11y-js.svg)](https://www.npmjs.com/package/eslint-plugin-test-a11y-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Why test-a11y-js?

- ✅ **Zero config** - Works out of the box with React, Vue, and JSX
- ✅ **Real-time feedback** - Catch issues in your editor, not in production
- ✅ **13 accessibility rules** - Covers images, forms, buttons, landmarks, and more
- ✅ **Dual API** - Use as ESLint plugin OR programmatic API
- ✅ **Large project ready** - Minimal preset for incremental adoption
- ✅ **Framework agnostic** - Works with React, Vue, Preact, Solid, and more
- ✅ **Fast & lightweight** - Pure AST validation, 35KB bundle, zero memory issues

## Installation

```bash
npm install --save-dev eslint-plugin-test-a11y-js
```

### Peer Dependencies

- `eslint` (>=8.0.0) - Required for ESLint plugin
- `vue-eslint-parser` (>=9.0.0) - Optional, only needed for Vue support
- `jsdom` (>=23.0.0) - Optional, only needed for A11yChecker core library (programmatic API)

**Note:** The ESLint plugin does NOT use jsdom. It performs pure AST validation for maximum performance. jsdom is only required if you use the programmatic A11yChecker API in your tests.

## Quick Start

### Option 1: ESLint Plugin (Recommended)

Add to your `.eslintrc.js` or `.eslintrc.json`:

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended']
}
```

Or for React/JSX projects:

```javascript
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/react']
}
```

That's it! Start catching accessibility issues immediately in your editor.

### Option 2: Programmatic API

Use in your tests:

```typescript
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

// Test a DOM element for accessibility violations
const violations = await A11yChecker.check(element)

// Or check specific patterns
const imageViolations = A11yChecker.checkImageAlt(element)
const buttonViolations = A11yChecker.checkButtonLabel(element)
```

## ESLint Plugin vs Programmatic API

**Use ESLint Plugin when:**
- ✅ You want real-time feedback in your editor
- ✅ You want to catch issues during development
- ✅ You want CI/CD integration to prevent commits with violations
- ✅ You want team-wide enforcement

**Use Programmatic API when:**
- ✅ You want to write specific accessibility tests
- ✅ You need to test dynamically generated DOM
- ✅ You want custom reporting or analytics
- ✅ You're writing integration/E2E tests

**You can use both!** Many teams use ESLint plugin for development and programmatic API for comprehensive test coverage.

## Configuration Options

### Available Presets

- `plugin:test-a11y-js/minimal` - Only 3 critical rules (best for large projects)
- `plugin:test-a11y-js/recommended` - Balanced approach (default)
- `plugin:test-a11y-js/strict` - All rules as errors
- `plugin:test-a11y-js/react` - Optimized for React/JSX
- `plugin:test-a11y-js/vue` - Optimized for Vue SFC

### Framework-Specific Setup

**React/JSX:**
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true }
  },
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/react']
}
```

**Vue:**
```javascript
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/vue']
}
```

### Ignoring Rules

**Ignore a single line:**
```jsx
// eslint-disable-next-line test-a11y-js/image-alt
<img src="decorative.jpg" alt="" />
```

**Ignore an entire file:**
```jsx
/* eslint-disable test-a11y-js/heading-order */
```

**Ignore directories:**
```javascript
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.test.{js,ts,jsx,tsx}'
  ]
}
```

## ESLint Rules

The plugin provides **13 accessibility rules**:

- `test-a11y-js/image-alt` - Enforce images have alt attributes
- `test-a11y-js/button-label` - Enforce buttons have labels
- `test-a11y-js/link-text` - Enforce links have descriptive text
- `test-a11y-js/form-label` - Enforce form controls have labels
- `test-a11y-js/heading-order` - Enforce proper heading hierarchy
- `test-a11y-js/iframe-title` - Enforce iframes have title attributes
- `test-a11y-js/fieldset-legend` - Enforce fieldsets have legend elements
- `test-a11y-js/table-structure` - Enforce tables have proper structure
- `test-a11y-js/details-summary` - Enforce details elements have summary
- `test-a11y-js/video-captions` - Enforce video elements have caption tracks
- `test-a11y-js/audio-captions` - Enforce audio elements have tracks or transcripts
- `test-a11y-js/landmark-roles` - Enforce proper use of landmark elements
- `test-a11y-js/dialog-modal` - Enforce dialog elements have proper accessibility attributes

## Programmatic API

### A11yChecker Methods

```typescript
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

// Comprehensive check
const results = await A11yChecker.check(element)

// Individual checks
A11yChecker.checkImageAlt(element)
A11yChecker.checkButtonLabel(element)
A11yChecker.checkLinkText(element)
A11yChecker.checkFormLabels(element)
A11yChecker.checkHeadingOrder(element)
A11yChecker.checkIframeTitle(element)
A11yChecker.checkFieldsetLegend(element)
A11yChecker.checkTableStructure(element)
A11yChecker.checkDetailsSummary(element)
A11yChecker.checkVideoCaptions(element)
A11yChecker.checkAudioCaptions(element)
A11yChecker.checkLandmarks(element)
A11yChecker.checkDialogModal(element)

// Advanced checks (available in core library)
A11yChecker.checkAriaRoles(element)
A11yChecker.checkAriaProperties(element)
A11yChecker.checkAriaRelationships(element)
A11yChecker.checkAccessibleName(element)
A11yChecker.checkCompositePatterns(element)
A11yChecker.checkSemanticHTML(element)
A11yChecker.checkFormValidationMessages(element)
```

### Types

```typescript
interface A11yViolation {
  id: string
  description: string
  element: Element
  impact: 'critical' | 'serious' | 'moderate' | 'minor'
}

interface A11yResults {
  violations: A11yViolation[]
}
```

## Examples

### React Component

```tsx
// ❌ ESLint will catch this
function MyComponent() {
  return (
    <div>
      <img src="photo.jpg" />  {/* Missing alt */}
      <button></button>         {/* No label */}
    </div>
  )
}

// ✅ Fixed
function MyComponent() {
  return (
    <div>
      <img src="photo.jpg" alt="A beautiful landscape" />
      <button aria-label="Close menu">×</button>
    </div>
  )
}
```

### Vue Component

```vue
<!-- ❌ ESLint will catch this -->
<template>
  <img src="photo.jpg" />
  <button></button>
</template>

<!-- ✅ Fixed -->
<template>
  <img src="photo.jpg" alt="A beautiful landscape" />
  <button aria-label="Close menu">×</button>
</template>
```

### Using in Tests

```typescript
import { render } from '@testing-library/react'
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

test('component is accessible', async () => {
  const { container } = render(<MyComponent />)
  const results = await A11yChecker.check(container)
  expect(results.violations).toHaveLength(0)
})
```

## Large Projects

For large codebases, start with minimal rules:

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/minimal'],
  ignorePatterns: ['**/node_modules/**', '**/dist/**']
}
```

See [Large Project Setup Guide](./docs/LARGE_PROJECTS.md) for incremental adoption strategies.

## Custom Formatter (Optional)

The plugin includes an optional custom formatter with Vite-style output. To use it, add the `--format` flag:

```bash
npx eslint --format eslint-plugin-test-a11y-js/formatter .
```

Or in your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint --format eslint-plugin-test-a11y-js/formatter ."
  }
}
```

### Output Features

- ✅ **File-by-file results** with line numbers
- ✅ **Summary** showing total files, errors, and warnings
- ✅ **Color-coded** output (errors in red, warnings in yellow)

Example output:
```
src/components/Button.tsx
  5:12  ✖ Image missing alt attribute (test-a11y-js/image-alt)
  8:3   ⚠ Button should have accessible label (test-a11y-js/button-label)

────────────────────────────────────────────────────────────

Summary: 15 files linted • 2 errors • 5 warnings
```

**Note:** The formatter is optional. If you don't specify it, ESLint will use its default formatter.

## Performance

For large projects, use ESLint caching:

```bash
npx eslint . --cache
```

See [Performance Guide](./docs/PERFORMANCE.md) for optimization tips.

## Framework Support

- ✅ **React/JSX** - Full support via JSX AST
- ✅ **Vue** - Full support via vue-eslint-parser
- ✅ **HTML Strings** - Support for template literals (requires jsdom for core API)
- ✅ **Any JSX-based framework** - Preact, Solid, etc.

## Documentation

- [Configuration Guide](./docs/CONFIGURATION.md) - ESLint plugin configuration options
- [Large Project Setup Guide](./docs/LARGE_PROJECTS.md) - Incremental adoption strategies
- [Performance Guide](./docs/PERFORMANCE.md) - Performance optimization tips
- [ESLint Plugin Guide](./docs/ESLINT_PLUGIN.md) - Complete ESLint plugin documentation
- [Vue Usage Guide](./docs/VUE_USAGE.md) - Vue-specific setup and examples
- [Examples](./docs/EXAMPLES.md) - Real-world code examples
- [Troubleshooting Guide](./docs/TROUBLESHOOTING.md) - Common issues and solutions
- [JSDOM Guide](./docs/JSDOM.md) - When and how to use jsdom

## How It Compares

| Feature | test-a11y-js | eslint-plugin-jsx-a11y | @axe-core/react |
|---------|--------------|------------------------|-----------------|
| Zero config | ✅ | ❌ | ❌ |
| Vue support | ✅ | ❌ | ❌ |
| Programmatic API | ✅ | ❌ | ✅ |
| Editor integration | ✅ | ✅ | ❌ |
| Large project ready | ✅ | ⚠️ | ⚠️ |
| Framework agnostic | ✅ | React only | React only |

## Contributing

Contributions are welcome! Please see the [contributing guidelines](CONTRIBUTING.md) for more information.

## Author

Marlon Maniti (https://github.com/nolrm)

## License

MIT
