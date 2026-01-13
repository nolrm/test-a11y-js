# eslint-plugin-test-a11y-js

> **Catch accessibility issues in your editor, not in production.** Zero-config ESLint plugin + programmatic API for React, Vue, and JSX.

[![npm version](https://img.shields.io/npm/v/eslint-plugin-test-a11y-js.svg)](https://www.npmjs.com/package/eslint-plugin-test-a11y-js)

## ⚠️ Breaking Change in v0.9.0

The package has been renamed to `eslint-plugin-test-a11y-js` to follow ESLint naming conventions.

**What changed:**
- Package name: `test-a11y-js` → `eslint-plugin-test-a11y-js`
- Core library import: `from 'test-a11y-js'` → `from 'eslint-plugin-test-a11y-js/core'`
- ESLint config: No changes needed! Still use `plugins: ['test-a11y-js']`

**Quick migration:**
```bash
npm uninstall test-a11y-js
npm install --save-dev eslint-plugin-test-a11y-js
```

Then update imports:
```typescript
// Before
import { A11yChecker } from 'test-a11y-js'

// After  
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'
```

## ⚠️ Breaking Change in v0.10.0

**Critical Fix:** Resolved JavaScript heap exhaustion in large projects.

**What changed:**
- ✅ **73% smaller bundle** (132KB → 35KB)
- ✅ **Zero memory issues** - ESLint plugin no longer uses JSDOM
- ✅ **Faster linting** - Pure AST validation
- ⚠️ **3 rules temporarily disabled** until refactored: `aria-validation`, `semantic-html`, `form-validation`

**Workaround:** Use the A11yChecker core library in tests for these checks.

📖 See [BREAKING_CHANGES.md](./BREAKING_CHANGES.md) for full details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**Why test-a11y-js?**
- ✅ **Zero config** - Works out of the box with React, Vue, and JSX
- ✅ **Real-time feedback** - Catch issues in your editor, not in production
- ✅ **13 active accessibility rules** - Covers images, forms, buttons, landmarks, and more (3 more coming soon)
- ✅ **Dual API** - Use as ESLint plugin OR programmatic API
- ✅ **Large project ready** - Minimal preset for incremental adoption
- ✅ **Framework agnostic** - Works with React, Vue, Preact, Solid, and more

## Installation

```bash
npm install --save-dev eslint-plugin-test-a11y-js
```

### Peer Dependencies

- `eslint` (>=8.0.0) - Required for ESLint plugin
- `vue-eslint-parser` (>=9.0.0) - Optional, only needed for Vue support
- `jsdom` (>=23.0.0) - Optional, **only needed for A11yChecker core library** (programmatic API)

**Note:** The ESLint plugin does NOT use jsdom. It performs pure AST validation for maximum performance and zero memory issues. jsdom is only required if you use the programmatic A11yChecker API in your tests. See [jsdom Guide](./docs/JSDOM.md) for details.

## Quick Start (30 seconds)

**Option 1: ESLint Plugin (Recommended)**
```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended']
}
```

**Option 2: Programmatic API**
```typescript
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

const violations = A11yChecker.checkImageAlt(element)
```

That's it! Start catching accessibility issues immediately.

## ESLint Plugin vs Programmatic API

**When to use the ESLint Plugin:**
- ✅ **Real-time feedback** - Catch issues as you type in your editor
- ✅ **CI/CD integration** - Prevent commits with accessibility violations
- ✅ **Team-wide enforcement** - Ensure all developers follow accessibility standards
- ✅ **Zero test code** - No need to write test cases, just configure ESLint
- ✅ **Best for:** Development workflow, code reviews, preventing regressions

**When to use the Programmatic API:**
- ✅ **Custom test scenarios** - Write specific accessibility tests in your test suite
- ✅ **Dynamic content** - Test accessibility of dynamically generated DOM
- ✅ **Integration testing** - Test accessibility in E2E or integration tests
- ✅ **Custom reporting** - Build custom violation reporting or analytics
- ✅ **Best for:** Unit tests, integration tests, custom testing workflows

**You can use both!** Many teams use ESLint plugin for development and programmatic API for comprehensive test coverage.

## What Problems Does This Solve?

❌ **Before:** Accessibility issues discovered in production or by users  
✅ **After:** Issues caught in your editor before commit

❌ **Before:** Manual accessibility audits take hours  
✅ **After:** Automated checks run in milliseconds

❌ **Before:** Complex setup with multiple tools  
✅ **After:** One package, zero config, works everywhere

## Usage

> **Not sure which to use?** See [ESLint Plugin vs Programmatic API](#eslint-plugin-vs-programmatic-api) above for guidance.

### ESLint Plugin (Recommended for Most Cases)

The ESLint plugin provides real-time accessibility linting in your editor and CI/CD. It's the easiest way to catch issues during development.

#### Basic Setup

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended']
}
```

#### Framework-Specific Setup

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

#### Available Configurations

- `plugin:test-a11y-js/minimal` - Only critical rules (3 rules) - **Best for large projects**
- `plugin:test-a11y-js/recommended` - Balanced approach (default)
- `plugin:test-a11y-js/strict` - All rules as errors
- `plugin:test-a11y-js/react` - Optimized for React/JSX
- `plugin:test-a11y-js/vue` - Optimized for Vue SFC

#### Ignoring Files and Lines

Sometimes you need to ignore specific files or lines. Here are your options:

**Ignore a single line:**
```jsx
// eslint-disable-next-line test-a11y-js/image-alt
<img src="decorative.jpg" alt="" />
```

**Ignore an entire file:**
```jsx
/* eslint-disable test-a11y-js/heading-order */
// Entire file exempt from heading-order rule
```

**Ignore directories:**
```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.test.{js,ts,jsx,tsx}' // Optional: exclude test files
  ]
}
```

**Disable rules for specific files:**
```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended'],
  overrides: [
    {
      files: ['**/legacy/**'],
      rules: {
        'test-a11y-js/**': 'warn' // Only warnings in legacy code
      }
    }
  ]
}
```

**Vue template ignore:**
```vue
<!-- eslint-disable-next-line test-a11y-js/image-alt -->
<img src="photo.jpg" />
```

> **Best Practice:** Always add a comment explaining why you're ignoring a rule. For example: `// eslint-disable-next-line test-a11y-js/image-alt -- Decorative image, no semantic meaning`

### Quick Start for Large Projects

```javascript
// .eslintrc.js - Start with minimal rules
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/minimal'],
  ignorePatterns: ['**/node_modules/**', '**/dist/**']
}
```

See [Configuration Guide](./docs/CONFIGURATION.md) for more details and [Large Project Setup Guide](./docs/LARGE_PROJECTS.md) for incremental adoption strategies.

### Programmatic API

Use the `A11yChecker` class to test DOM elements programmatically in your test suites:

```typescript
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

// Test a DOM element for accessibility violations
const results = await A11yChecker.check(element)

// Individual checks
const imageViolations = A11yChecker.checkImageAlt(element)
const linkViolations = A11yChecker.checkLinkText(element)
const buttonViolations = A11yChecker.checkButtonLabel(element)
const formViolations = A11yChecker.checkFormLabels(element)
const headingViolations = A11yChecker.checkHeadingOrder(element)
const iframeViolations = A11yChecker.checkIframeTitle(element)
const fieldsetViolations = A11yChecker.checkFieldsetLegend(element)
const tableViolations = A11yChecker.checkTableStructure(element)
const detailsViolations = A11yChecker.checkDetailsSummary(element)
const videoViolations = A11yChecker.checkVideoCaptions(element)
const audioViolations = A11yChecker.checkAudioCaptions(element)
const landmarkViolations = A11yChecker.checkLandmarks(element)
const dialogViolations = A11yChecker.checkDialogModal(element)

// Phase 1: ARIA, Semantic HTML, Form Validation
const ariaRoleViolations = A11yChecker.checkAriaRoles(element)
const ariaPropertyViolations = A11yChecker.checkAriaProperties(element)
const ariaRelationshipViolations = A11yChecker.checkAriaRelationships(element)
const accessibleNameViolations = A11yChecker.checkAccessibleName(element)
const compositePatternViolations = A11yChecker.checkCompositePatterns(element)
const semanticHTMLViolations = A11yChecker.checkSemanticHTML(element)
const formValidationViolations = A11yChecker.checkFormValidationMessages(element)
```
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
read_file

## API

### A11yChecker

#### `check(element: Element): Promise<A11yResults>`
Performs all accessibility checks on the given element.

#### `checkImageAlt(element: Element): A11yViolation[]`
Checks images for proper alt attributes.

#### `checkLinkText(element: Element): A11yViolation[]`
Validates link text for accessibility.

#### `checkButtonLabel(element: Element): A11yViolation[]`
Ensures buttons have proper labels.

#### `checkFormLabels(element: Element): A11yViolation[]`
Validates form control label associations.

#### `checkHeadingOrder(element: Element): A11yViolation[]`
Checks heading hierarchy.

#### `checkIframeTitle(element: Element): A11yViolation[]`
Validates iframe title attributes.

#### `checkFieldsetLegend(element: Element): A11yViolation[]`
Ensures fieldsets have legend elements.

#### `checkTableStructure(element: Element): A11yViolation[]`
Validates table structure (caption, headers, scope).

#### `checkDetailsSummary(element: Element): A11yViolation[]`
Ensures details elements have summary as first child.

#### `checkVideoCaptions(element: Element): A11yViolation[]`
Validates video elements have caption tracks.

#### `checkAudioCaptions(element: Element): A11yViolation[]`
Validates audio elements have tracks or transcripts.

#### `checkLandmarks(element: Element): A11yViolation[]`
Validates proper use of landmark elements.

#### `checkDialogModal(element: Element): A11yViolation[]`
Validates dialog elements have proper accessibility attributes.

#### `checkAriaRoles(element: Element): A11yViolation[]`
Validates ARIA roles for validity, appropriateness, and context.

#### `checkAriaProperties(element: Element): A11yViolation[]`
Validates ARIA properties for validity, appropriateness, and values.

#### `checkAriaRelationships(element: Element): A11yViolation[]`
Validates ARIA ID references with enhanced checks.

#### `checkAccessibleName(element: Element): A11yViolation[]`
Validates accessible name computation.

#### `checkCompositePatterns(element: Element): A11yViolation[]`
Validates composite ARIA patterns (tab/listbox/menu/tree).

#### `checkSemanticHTML(element: Element): A11yViolation[]`
Validates semantic HTML usage and structure.

#### `checkFormValidationMessages(element: Element): A11yViolation[]`
Validates form validation messages and error handling.

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

## Features

### Core Library
- **Image alt text validation** - Ensures all images have descriptive alt attributes
- **Link text accessibility checks** - Validates links have descriptive text
- **Button label validation** - Ensures buttons have accessible labels
- **Form label association checks** - Validates form controls have proper labels
- **Heading order validation** - Checks proper heading hierarchy (h1-h6)
- **Iframe title validation** - Ensures iframes have descriptive titles
- **Fieldset legend validation** - Validates fieldsets have legend elements
- **Table structure validation** - Checks tables have captions, headers, and scope
- **Details/Summary validation** - Ensures details elements have summary
- **Video captions validation** - Validates video elements have caption tracks
- **Audio captions validation** - Validates audio elements have tracks or transcripts
- **Landmark roles validation** - Checks proper use of semantic landmarks
- **Dialog/Modal validation** - Validates dialog accessibility patterns
- **Comprehensive ARIA validation** - Validates ARIA roles, properties, relationships, accessible names, and composite patterns
- **Semantic HTML validation** - Validates proper use of semantic HTML and detects misuse
- **Form validation messages** - Validates form validation and error handling

### ESLint Plugin
- Real-time accessibility linting in your editor
- Support for React/JSX and Vue templates
- Pure AST validation (no JSDOM, zero memory issues)
- Multiple configuration presets (minimal, recommended, strict)
- Framework-agnostic with framework-specific adapters
- Integrates with existing ESLint workflows
- Performance optimized - 73% smaller bundle (35KB)
- 13 active rules covering critical accessibility patterns

## ESLint Rules

The plugin provides **13 active accessibility rules** (3 temporarily disabled in v0.10.0):

### Active Rules (13)

- `test-a11y-js/image-alt` - Enforce images have alt attributes
- `test-a11y-js/button-label` - Enforce buttons have labels
- `test-a11y-js/link-text` - Enforce links have descriptive text
- `test-a11y-js/form-label` - Enforce form controls have labels
- `test-a11y-js/heading-order` - Enforce proper heading hierarchy
- `test-a11y-js/iframe-title` - Enforce iframes have title attributes
- `test-a11y-js/fieldset-legend` - Enforce fieldsets have legend elements
- `test-a11y-js/table-structure` - Enforce tables have proper structure (caption, headers, scope)
- `test-a11y-js/details-summary` - Enforce details elements have summary as first child
- `test-a11y-js/video-captions` - Enforce video elements have caption tracks
- `test-a11y-js/audio-captions` - Enforce audio elements have tracks or transcripts
- `test-a11y-js/landmark-roles` - Enforce proper use of landmark elements (nav, main, header, footer, aside, section, article)
- `test-a11y-js/dialog-modal` - Enforce dialog elements have proper accessibility attributes

### Temporarily Disabled (v0.10.0)

These rules are being refactored to use AST validation and will be re-enabled in future releases:

- ~~`test-a11y-js/aria-validation`~~ - Comprehensive ARIA validation (coming in v0.11.0)
- ~~`test-a11y-js/semantic-html`~~ - Semantic HTML usage checks (coming in v0.12.0)
- ~~`test-a11y-js/form-validation`~~ - Form validation patterns (coming in v0.12.0)

**Workaround:** Use the A11yChecker core library to validate these patterns in your tests:

```typescript
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

// Validate ARIA, semantic HTML, and form validation
const ariaViolations = A11yChecker.checkAriaRoles(element)
const semanticViolations = A11yChecker.checkSemanticHTML(element)
const formViolations = A11yChecker.checkFormValidationMessages(element)
```

See [BREAKING_CHANGES.md](./BREAKING_CHANGES.md) for full details and migration guide.

See [`src/checks.json`](./src/checks.json) for a complete list of supported elements, ARIA attributes, and rules (including what's not yet supported).

## Documentation

### Getting Started
- [Configuration Guide](./docs/CONFIGURATION.md) - ESLint plugin configuration options
- [Large Project Setup Guide](./docs/LARGE_PROJECTS.md) - **Incremental adoption for large codebases**
- [Performance Guide](./docs/PERFORMANCE.md) - **Performance optimization tips**

### Framework Guides
- [ESLint Plugin Guide](./docs/ESLINT_PLUGIN.md) - Complete ESLint plugin documentation
- [Vue Usage Guide](./docs/VUE_USAGE.md) - Vue-specific setup and examples

### Reference
- [jsdom Guide](./docs/JSDOM.md) - **When and how to use jsdom**
- [Examples](./docs/EXAMPLES.md) - Real-world code examples
- [Troubleshooting Guide](./docs/TROUBLESHOOTING.md) - Common issues and solutions
- [Testing Guide](./docs/TESTING.md) - Testing the plugin
- [Roadmap](./docs/ROADMAP.md) - Planned features and future implementations

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

### ARIA Validation (Phase 1)

```tsx
// ❌ ESLint will catch these ARIA issues
function MyComponent() {
  return (
    <div>
      <div role="invalid-role">Content</div>  {/* Invalid role */}
      <button role="button">Click</button>     {/* Redundant role */}
      <div role="tab">Tab</div>                {/* Missing tablist context */}
      <input aria-label="" />                  {/* Empty aria-label */}
    </div>
  )
}

// ✅ Fixed
function MyComponent() {
  return (
    <div role="tablist">
      <button>Click</button>                    {/* Native button, no role needed */}
      <div role="tab" aria-controls="panel-1">Tab</div>
      <input aria-label="Email address" />
    </div>
  )
}
```

### Semantic HTML (Phase 1)

```tsx
// ❌ ESLint will catch semantic HTML misuse
function MyComponent() {
  return (
    <div>
      <div role="button" onClick={handleClick}>Click</div>  {/* Use <button> */}
      <a>Link without href</a>                               {/* Missing href */}
      <button><a href="/">Nested link</a></button>          {/* Nested interactive */}
      <main>Content</main>
      <main>Another main</main>                             {/* Multiple main */}
    </div>
  )
}

// ✅ Fixed
function MyComponent() {
  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <a href="/page">Link</a>
      <button>Action</button>
      <main>Content</main>
    </div>
  )
}
```
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
run_terminal_cmd

## How It Compares

| Feature | test-a11y-js | eslint-plugin-jsx-a11y | @axe-core/react |
|---------|--------------|------------------------|-----------------|
| Zero config | ✅ | ❌ | ❌ |
| Vue support | ✅ | ❌ | ❌ |
| Programmatic API | ✅ | ❌ | ✅ |
| Editor integration | ✅ | ✅ | ❌ |
| Large project ready | ✅ | ⚠️ | ⚠️ |
| Framework agnostic | ✅ | React only | React only |

## Framework Support

- ✅ **React/JSX** - Full support via JSX AST
- ✅ **Vue** - Full support via vue-eslint-parser
- ✅ **HTML Strings** - Support for template literals (requires jsdom)
- ✅ **Any JSX-based framework** - Preact, Solid, etc.

## Performance

For large projects, use ESLint caching:

```bash
npx eslint . --cache
```

See [Performance Guide](./docs/PERFORMANCE.md) for optimization tips and [Large Project Setup Guide](./docs/LARGE_PROJECTS.md) for incremental adoption strategies.

## Real Impact

**Before using test-a11y-js:**
- Accessibility violations discovered in production audits
- Weeks spent fixing issues after deployment
- High costs for accessibility audits

**After using test-a11y-js:**
- Issues caught during development in your editor
- Zero violations reach production
- Automated checks save time and money

## Publishing

This package uses GitHub Actions for automated publishing to npm. Publishing details are documented in [`.github/workflows/README.md`](.github/workflows/README.md) for maintainers.

## Contributing

Contributions are welcome! Please see the [contributing guidelines](CONTRIBUTING.md) for more information.

## Author

Marlon Maniti (https://github.com/nolrm)

## License

MIT
