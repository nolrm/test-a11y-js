# ESLint Plugin Documentation

Complete guide to using the `test-a11y-js` ESLint plugin for accessibility linting.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Rules Reference](#rules-reference)
- [Configuration](#configuration)
- [Framework Support](#framework-support)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## Overview

The `test-a11y-js` ESLint plugin provides real-time accessibility linting for your code. It checks for common accessibility violations directly in your editor and during CI/CD builds.

### Features

- ✅ **Real-time feedback** - Catch accessibility issues as you code
- ✅ **Multi-framework support** - Works with React, Vue, and HTML
- ✅ **Configurable** - Multiple presets and customizable rules
- ✅ **CI/CD ready** - Integrates seamlessly with existing ESLint workflows
- ✅ **Framework-agnostic core** - Same accessibility logic across all frameworks
- ✅ **Editor suggestions** - Get actionable fixes directly in your editor
- ✅ **AST-first validation** - Fast, memory-efficient linting without runtime dependencies

## Installation

```bash
npm install --save-dev eslint-plugin-test-a11y-js eslint
```

### Peer Dependencies

- `eslint` (>=8.0.0) - Required
- `vue-eslint-parser` (>=9.0.0) - Optional, only needed for Vue support

For Vue projects:

```bash
npm install --save-dev vue-eslint-parser
```

## Quick Start

### Basic Setup

Add the plugin to your ESLint configuration:

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended']
}
```

### React/JSX Setup

```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true }
  },
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/react']
}
```

### Vue Setup

```javascript
// .eslintrc.js
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/vue']
}
```

## Rules Reference

### test-a11y-js/image-alt

Enforces that images have `alt` attributes for accessibility.

**Severity:** `error` (recommended)

**Messages:**
- `missingAlt` - Image must have an alt attribute
- `emptyAlt` - Image alt attribute must not be empty
- `dynamicAlt` - Image alt attribute is dynamic. Ensure it is not empty at runtime.

**Examples:**

```jsx
// ❌ Missing alt
<img src="photo.jpg" />

// ❌ Empty alt
<img src="photo.jpg" alt="" />

// ✅ Valid
<img src="photo.jpg" alt="A beautiful landscape" />

// ⚠️ Dynamic (warning)
<img src="photo.jpg" alt={altText} />
```

### test-a11y-js/button-label

Enforces that buttons have labels or `aria-label` attributes.

**Severity:** `error` (recommended)

**Messages:**
- `missingLabel` - Button must have a label or aria-label
- `dynamicLabel` - Button label is dynamic. Ensure it is not empty at runtime.

**Examples:**

```jsx
// ❌ Missing label
<button></button>

// ✅ Valid with text
<button>Click me</button>

// ✅ Valid with aria-label
<button aria-label="Close menu">×</button>

// ⚠️ Dynamic (warning)
<button aria-label={dynamicLabel}></button>
```

### test-a11y-js/link-text

Enforces that links have descriptive text.

**Severity:** `warn` (recommended)

**Messages:**
- `missingText` - Link must have descriptive text
- `nonDescriptive` - Link text should be more descriptive (avoid "click here", "read more", etc.)
- `dynamicText` - Link text is dynamic. Ensure it is descriptive at runtime.

**Examples:**

```jsx
// ❌ Missing text
<a href="/about"></a>

// ⚠️ Non-descriptive
<a href="/about">Click here</a>
<a href="/blog">Read more</a>

// ✅ Valid
<a href="/about">About Us</a>
<a href="/blog">Read our blog posts</a>
```

### test-a11y-js/form-label

Enforces that form controls have associated labels.

**Severity:** `error` (recommended)

**Messages:**
- `missingLabel` - Form control must have an associated label (use id/for, aria-label, or aria-labelledby)

**Examples:**

```jsx
// ❌ Missing label
<input type="text" />

// ✅ Valid with id/for
<label htmlFor="name">Name</label>
<input id="name" type="text" />

// ✅ Valid with aria-label
<input type="email" aria-label="Email address" />

// ✅ Valid with aria-labelledby
<span id="email-label">Email</span>
<input type="email" aria-labelledby="email-label" />
```

### test-a11y-js/heading-order

Enforces proper heading hierarchy (no skipped levels).

**Severity:** `warn` (recommended)

**Messages:**
- `skippedLevel` - Heading level skipped (previous: {previous}, current: {current})

**Examples:**

```jsx
// ✅ Valid hierarchy
<h1>Title</h1>
<h2>Subtitle</h2>
<h3>Section</h3>

// ⚠️ Skipped level
<h1>Title</h1>
<h3>Section</h3> // Skipped h2

// ✅ Same level is OK
<h2>First</h2>
<h2>Second</h2>
<h3>Section</h3>
```

### test-a11y-js/aria-validation

Validates ARIA roles, properties, and ID references (AST-first, no JSDOM).

**Severity:** `error` (strict preset, opt-in for recommended)

**Messages:**
- `ariaViolation` - ARIA validation error (invalid role, property, or reference)

**Examples:**

```jsx
// ❌ Invalid role
<div role="invalid-role">Content</div>

// ⚠️ Redundant role
<button role="button">Click</button>

// ❌ Invalid ID reference
<input aria-labelledby="missing-id" />

// ✅ Valid
<div role="dialog" aria-label="Modal">Content</div>
<label id="email-label">Email</label>
<input aria-labelledby="email-label" />
```

**Note**: This rule is AST-first and validates within the same file only. Cross-file ID references are not validated.

### test-a11y-js/semantic-html

Enforces proper use of semantic HTML elements over generic elements with roles.

**Severity:** `error` (strict preset, opt-in for recommended)

**Messages:**
- `semanticViolation` - Semantic HTML violation

**Examples:**

```jsx
// ⚠️ Redundant role
<button role="button">Click</button>

// ⚠️ Prefer semantic element
<div role="button">Click</div> // Should use <button>

// ✅ Valid
<button>Click</button>
<nav>Navigation</nav>
```

### test-a11y-js/form-validation

Validates form validation patterns and ID references.

**Severity:** `error` (strict preset, opt-in for recommended)

**Messages:**
- `formValidationViolation` - Form validation error

**Examples:**

```jsx
// ❌ Required input without label
<input type="text" required />

// ❌ Invalid ID reference
<input aria-describedby="missing-id" />

// ✅ Valid
<input type="text" required aria-label="Name" />
<label id="email-label">Email</label>
<input type="email" required aria-labelledby="email-label" />
```

## Configuration

See [Configuration Guide](./CONFIGURATION.md) for detailed configuration options.

### Available Presets

- `plugin:test-a11y-js/recommended` - Balanced approach (default)
- `plugin:test-a11y-js/strict` - All rules as errors
- `plugin:test-a11y-js/react` - Optimized for React/JSX
- `plugin:test-a11y-js/vue` - Optimized for Vue SFC

### Custom Configuration

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended'],
  rules: {
    // Override specific rules
    'test-a11y-js/image-alt': 'error',
    'test-a11y-js/link-text': 'warn',
    
    // Disable a rule
    'test-a11y-js/heading-order': 'off'
  }
}
```

## Framework Support

### React/JSX

Full support for JSX syntax:

```jsx
function MyComponent() {
  return (
    <div>
      <img src="photo.jpg" alt="Photo" />
      <button aria-label="Close">×</button>
      <a href="/about">About Us</a>
    </div>
  )
}
```

### Vue

Full support for Vue Single File Components:

```vue
<template>
  <img src="photo.jpg" alt="Photo" />
  <button aria-label="Close">×</button>
  <a href="/about">About Us</a>
</template>
```

Supports:
- Regular attributes: `<img alt="Photo" />`
- v-bind syntax: `<img :alt="altText" />`
- Shorthand: `<img :alt="altText" />`

### HTML Strings

Support for HTML in template literals:

```javascript
const html = `<img src="photo.jpg" alt="Photo" />`
```

## Suggestions & Editor UX

Many rules provide **suggestions** that appear in your editor, allowing you to quickly fix issues with a single click.

### Available Suggestions

#### iframe-title
- **Suggestion**: Add `title=""` attribute placeholder when missing

#### button-label
- **Suggestion**: Add `aria-label=""` for icon-only buttons

#### link-text
- **Suggestion**: Replace non-descriptive text (e.g., "click here") with descriptive placeholder

#### heading-order
- **Suggestion**: Consider using the correct heading level (e.g., `h2` instead of `h3`)

### Using Suggestions

In VS Code and other editors with ESLint support, suggestions appear as:
- **Quick Fix** options (Cmd/Ctrl + .)
- **Lightbulb** icons next to errors
- **Hover tooltips** with fix descriptions

**Note**: Suggestions are **not** autofixes - they require manual review and approval to ensure correctness.

## Examples

### Complete React Component

```tsx
// ❌ Violations
function BadComponent() {
  return (
    <div>
      <img src="header.jpg" />
      <button></button>
      <a href="/more">Read more</a>
      <input type="text" />
      <h1>Title</h1>
      <h3>Section</h3>
    </div>
  )
}

// ✅ Fixed
function GoodComponent() {
  return (
    <div>
      <img src="header.jpg" alt="Site header" />
      <button aria-label="Submit form">Submit</button>
      <a href="/blog">Read our blog posts</a>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" />
      <h1>Title</h1>
      <h2>Subtitle</h2>
      <h3>Section</h3>
    </div>
  )
}
```

### Complete Vue Component

```vue
<!-- ❌ Violations -->
<template>
  <img src="header.jpg" />
  <button></button>
  <a href="/more">Read more</a>
  <input type="text" />
  <h1>Title</h1>
  <h3>Section</h3>
</template>

<!-- ✅ Fixed -->
<template>
  <img src="header.jpg" alt="Site header" />
  <button aria-label="Submit form">Submit</button>
  <a href="/blog">Read our blog posts</a>
  <label for="name">Name</label>
  <input id="name" type="text" />
  <h1>Title</h1>
  <h2>Subtitle</h2>
  <h3>Section</h3>
</template>
```

## Troubleshooting

### Rules Not Working

1. **Check installation**: Ensure `test-a11y-js` and `eslint` are installed
2. **Verify plugin**: Check that `plugins: ['test-a11y-js']` is in your config
3. **Check parser**: For React, ensure JSX is enabled. For Vue, ensure `vue-eslint-parser` is used
4. **File extensions**: Ensure your file extensions (`.jsx`, `.vue`, etc.) are included in ESLint's file patterns

### Too Many Errors

If you're getting overwhelmed by violations:

1. **Start with recommended**: Use `plugin:test-a11y-js/recommended` which uses warnings for moderate issues
2. **Fix incrementally**: Address violations one at a time
3. **Use disable comments**: Temporarily disable rules for exceptions:
   ```jsx
   // eslint-disable-next-line test-a11y-js/image-alt
   <img src="decorative.jpg" alt="" />
   ```
4. **Gradually increase strictness**: Move to strict configuration once compliant

### Vue-Specific Issues

1. **Parser not found**: Ensure `vue-eslint-parser` is installed
2. **Rules not running**: Verify `.vue` files are included in ESLint's file patterns
3. **Dynamic attributes**: Dynamic attributes will show warnings (not errors) - this is expected

### Dynamic Attributes

The plugin cannot statically verify dynamic attribute values. It will warn (not error) when it detects dynamic attributes:

```jsx
// ⚠️ Warning (not error)
<img alt={altText} />
<button aria-label={label}></button>
```

This is intentional - ensure your dynamic values are always set at runtime.

## Best Practices

1. **Start with recommended**: Begin with the recommended configuration
2. **Fix incrementally**: Don't try to fix everything at once
3. **Use strict in CI/CD**: Use strict configuration in CI/CD pipelines
4. **Document exceptions**: Use ESLint disable comments with explanations
5. **Test with screen readers**: ESLint catches many issues, but manual testing is still important

## Integration with CI/CD

Add ESLint to your CI/CD pipeline:

```yaml
# GitHub Actions example
- name: Run ESLint
  run: npm run lint
```

```json
// package.json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.vue"
  }
}
```

## Related Documentation

- [Configuration Guide](./CONFIGURATION.md) - Detailed configuration options
- [Vue Usage Guide](./VUE_USAGE.md) - Vue-specific setup and examples
- [Testing Guide](./TESTING.md) - Testing the plugin

## Support

For issues, questions, or contributions, please visit:
- GitHub: https://github.com/nolrm/eslint-plugin-test-a11y-js
- Issues: https://github.com/nolrm/eslint-plugin-test-a11y-js/issues

