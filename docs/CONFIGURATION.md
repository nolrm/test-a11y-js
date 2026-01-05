# ESLint Plugin Configuration

The `test-a11y-js` ESLint plugin provides several configuration presets to suit different project needs.

## Available Configurations

### Minimal

The minimal configuration enables only the most critical accessibility rules. Use this for:
- Large projects starting accessibility checks
- Incremental adoption
- Performance-sensitive environments

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/minimal']
}
```

**Rule Severity:**
- `button-label`: error (critical impact)
- `form-label`: error (critical impact)
- `image-alt`: error (serious impact)

**When to use:**
- Starting accessibility checks in large codebase
- Need fast ESLint execution
- Want to focus on critical violations first

See [Large Project Setup Guide](./LARGE_PROJECTS.md) for detailed instructions.

### Recommended (Default)

The recommended configuration uses a balanced approach with critical violations as errors and moderate violations as warnings.

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended']
}
```

**Rule Severity:**
- `image-alt`: error (serious impact)
- `button-label`: error (critical impact)
- `form-label`: error (critical impact)
- `link-text`: warn (moderate impact)
- `heading-order`: warn (moderate impact)

### Strict

The strict configuration treats all violations as errors for maximum enforcement.

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/strict']
}
```

**Rule Severity:**
- All rules: `error`

Use this configuration when you want to enforce strict accessibility standards and catch all violations immediately.

### React

Optimized configuration for React/JSX projects.

```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/react']
}
```

**Features:**
- Pre-configured for JSX parsing
- Same rule severity as recommended
- Optimized for React component patterns

### Vue

Optimized configuration for Vue projects using vue-eslint-parser.

```javascript
// .eslintrc.js
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/vue']
}
```

**Features:**
- Pre-configured for Vue SFC templates
- Same rule severity as recommended
- Optimized for Vue template syntax

**Note:** Requires `vue-eslint-parser` to be installed.

## Custom Configuration

You can also configure rules individually:

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
    'test-a11y-js/heading-order': 'off',
    
    // Use rule with options (if supported in future)
    'test-a11y-js/image-alt': ['error', { allowEmpty: false }]
  }
}
```

## Rule Severity Levels

Rules are categorized by impact level:

### Critical (Error by default)
- **button-label**: Buttons without labels prevent screen reader users from understanding functionality
- **form-label**: Form controls without labels prevent users from understanding what to input

### Serious (Error by default)
- **image-alt**: Images without alt text prevent screen reader users from understanding content

### Moderate (Warning by default)
- **link-text**: Non-descriptive link text makes navigation difficult for screen reader users
- **heading-order**: Skipped heading levels make document structure unclear

## Framework-Specific Setup

### React/JSX

```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/react']
}
```

### Vue

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

### TypeScript

Works with both React and Vue:

```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['test-a11y-js', '@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:test-a11y-js/recommended'
  ]
}
```

## Migration Guide

### From Recommended to Strict

If you want to upgrade from recommended to strict:

```javascript
// Before
extends: ['plugin:test-a11y-js/recommended']

// After
extends: ['plugin:test-a11y-js/strict']
```

This will change `link-text` and `heading-order` from warnings to errors.

### From React to Vue

If migrating a React project to Vue:

```javascript
// Before (React)
parser: '@typescript-eslint/parser',
extends: ['plugin:test-a11y-js/react']

// After (Vue)
parser: 'vue-eslint-parser',
extends: ['plugin:test-a11y-js/vue']
```

## Best Practices

1. **Start with Recommended**: Use the recommended configuration as a starting point
2. **Gradually Increase Strictness**: Move to strict configuration once your codebase is mostly compliant
3. **Framework-Specific Configs**: Use React or Vue configs for better integration
4. **Custom Overrides**: Override specific rules based on your project's needs
5. **CI/CD Integration**: Use strict configuration in CI/CD to catch violations early

## Ignore Patterns for Large Projects

For large codebases, you may want to exclude certain files or directories from accessibility checks.

### Using ESLint ignorePatterns

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended'],
  ignorePatterns: [
    // Exclude build outputs
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/out/**',
    
    // Exclude dependencies
    '**/node_modules/**',
    
    // Exclude test files (optional)
    '**/*.test.{js,ts,jsx,tsx}',
    '**/*.spec.{js,ts,jsx,tsx}',
    
    // Exclude generated files
    '**/*.generated.{js,ts}',
    '**/generated/**',
    
    // Exclude legacy code (temporary)
    '**/legacy/**',
    '**/old/**'
  ]
}
```

### Using .eslintignore file

Create a `.eslintignore` file in your project root:

```
# Build outputs
dist/
build/
.next/
out/

# Dependencies
node_modules/

# Test files (optional)
**/*.test.{js,ts,jsx,tsx}
**/*.spec.{js,ts,jsx,tsx}

# Legacy code
legacy/
old/
```

### File-specific rule disabling

For specific files that need exceptions:

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['test-a11y-js'],
  extends: ['plugin:test-a11y-js/recommended'],
  overrides: [
    {
      files: ['**/*.test.{js,ts,jsx,tsx}'],
      rules: {
        'test-a11y-js/**': 'off' // Disable all a11y rules in tests
      }
    },
    {
      files: ['**/legacy/**'],
      rules: {
        'test-a11y-js/**': 'warn' // Only warnings in legacy code
      }
    }
  ]
}
```

## Troubleshooting

### Rules not working

1. Ensure the plugin is installed: `npm install eslint-plugin-test-a11y-js`
2. Verify the plugin is in your ESLint config
3. Check that your parser supports JSX (for React) or Vue (for Vue)
4. Ensure file extensions are included in ESLint's file patterns

### Too many errors

If you're getting too many violations:
1. Start with minimal configuration (only 3 critical rules)
2. Fix violations incrementally
3. Use `eslint-disable` comments for exceptions
4. Gradually move to recommended, then strict configuration

### Vue rules not working

1. Ensure `vue-eslint-parser` is installed
2. Verify your ESLint config uses `vue-eslint-parser` as the parser
3. Check that `.vue` files are included in ESLint's file patterns

