# test-a11y-js

A JavaScript library for testing component accessibility across multiple testing frameworks. Includes both a programmatic API and an ESLint plugin for real-time accessibility linting.

## Installation

```bash
npm install --save-dev test-a11y-js
```

### Peer Dependencies

- `eslint` (>=8.0.0) - Required for ESLint plugin
- `vue-eslint-parser` (>=9.0.0) - Optional, only needed for Vue support

## Usage

### Programmatic API

Use the `A11yChecker` class to test DOM elements programmatically:

```typescript
import { A11yChecker } from 'test-a11y-js'

// Test a DOM element for accessibility violations
const results = await A11yChecker.check(element)

// Individual checks
const imageViolations = A11yChecker.checkImageAlt(element)
const linkViolations = A11yChecker.checkLinkText(element)
const buttonViolations = A11yChecker.checkButtonLabel(element)
const formViolations = A11yChecker.checkFormLabels(element)
const headingViolations = A11yChecker.checkHeadingOrder(element)
```

### ESLint Plugin

Use the ESLint plugin for real-time accessibility linting in your editor and CI/CD:

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

- `plugin:test-a11y-js/recommended` - Balanced approach (default)
- `plugin:test-a11y-js/strict` - All rules as errors
- `plugin:test-a11y-js/react` - Optimized for React/JSX
- `plugin:test-a11y-js/vue` - Optimized for Vue SFC

See [Configuration Guide](./docs/CONFIGURATION.md) for more details.

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
- Image alt text validation
- Link text accessibility checks
- Button label validation
- Form label association checks
- Heading order validation

### ESLint Plugin
- Real-time accessibility linting in your editor
- Support for React/JSX, Vue, and HTML
- Multiple configuration presets
- Framework-agnostic core with framework-specific adapters
- Integrates with existing ESLint workflows

## ESLint Rules

The plugin provides 5 accessibility rules:

- `test-a11y-js/image-alt` - Enforce images have alt attributes
- `test-a11y-js/button-label` - Enforce buttons have labels
- `test-a11y-js/link-text` - Enforce links have descriptive text
- `test-a11y-js/form-label` - Enforce form controls have labels
- `test-a11y-js/heading-order` - Enforce proper heading hierarchy

## Documentation

- [Configuration Guide](./docs/CONFIGURATION.md) - ESLint plugin configuration options
- [Vue Usage Guide](./docs/VUE_USAGE.md) - Vue-specific setup and examples

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

## Framework Support

- ✅ **React/JSX** - Full support via JSX AST
- ✅ **Vue** - Full support via vue-eslint-parser
- ✅ **HTML Strings** - Support for template literals
- ✅ **Any JSX-based framework** - Preact, Solid, etc.

## Contributing

Contributions are welcome! Please see the [contributing guidelines](CONTRIBUTING.md) for more information.

## Author

Marlon Maniti (https://github.com/nolrm)

## License

MIT
