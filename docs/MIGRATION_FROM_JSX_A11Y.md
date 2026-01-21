# Migration Guide: From eslint-plugin-jsx-a11y to test-a11y-js

This guide helps you migrate from `eslint-plugin-jsx-a11y` to `eslint-plugin-test-a11y-js`.

## Why Migrate?

- ✅ **Zero config** - Works out of the box
- ✅ **Vue support** - Full Vue SFC support (jsx-a11y is React-only)
- ✅ **Component mapping** - Built-in support for design-system components
- ✅ **Flat config ready** - ESLint v9+ support
- ✅ **Dual API** - ESLint plugin + programmatic A11yChecker API
- ✅ **Smaller bundle** - 35KB vs larger jsx-a11y bundle

## Rule Mapping

| jsx-a11y Rule | test-a11y-js Rule | Notes |
|---------------|-------------------|-------|
| `jsx-a11y/alt-text` | `test-a11y-js/image-alt` | Enhanced with decorative image options |
| `jsx-a11y/anchor-is-valid` | `test-a11y-js/link-text` | Enhanced with denylist options |
| `jsx-a11y/aria-activedescendant-has-tabindex` | ❌ Not available | Use A11yChecker runtime API |
| `jsx-a11y/aria-props` | `test-a11y-js/aria-validation` | ✅ Available (AST-based) |
| `jsx-a11y/aria-proptypes` | `test-a11y-js/aria-validation` | ✅ Available (AST-based) |
| `jsx-a11y/aria-role` | `test-a11y-js/aria-validation` | ✅ Available (AST-based) |
| `jsx-a11y/aria-unsupported-elements` | `test-a11y-js/aria-validation` | ✅ Available (AST-based) |
| `jsx-a11y/click-events-have-key-events` | ❌ Not available | Runtime-only concern |
| `jsx-a11y/heading-has-content` | `test-a11y-js/heading-order` | Different approach (hierarchy) |
| `jsx-a11y/html-has-lang` | ❌ Not available | Use A11yChecker runtime API |
| `jsx-a11y/iframe-has-title` | `test-a11y-js/iframe-title` | ✅ Available |
| `jsx-a11y/img-redundant-alt` | Built into `test-a11y-js/image-alt` | Checks empty alt |
| `jsx-a11y/interactive-supports-focus` | ❌ Not available | Runtime-only concern |
| `jsx-a11y/label-has-associated-control` | `test-a11y-js/form-label` | ✅ Available |
| `jsx-a11y/media-has-caption` | `test-a11y-js/video-captions`, `test-a11y-js/audio-captions` | ✅ Available |
| `jsx-a11y/mouse-events-have-key-events` | ❌ Not available | Runtime-only concern |
| `jsx-a11y/no-access-key` | ❌ Not available | Use A11yChecker runtime API |
| `jsx-a11y/no-autofocus` | ❌ Not available | Use A11yChecker runtime API |
| `jsx-a11y/no-distracting-elements` | ❌ Not available | Use A11yChecker runtime API |
| `jsx-a11y/no-interactive-element-to-noninteractive-role` | `test-a11y-js/semantic-html` | ✅ Available (AST-based) |
| `jsx-a11y/no-noninteractive-element-interactions` | ❌ Not available | Runtime-only concern |
| `jsx-a11y/no-noninteractive-element-to-interactive-role` | `test-a11y-js/semantic-html` | ✅ Available (AST-based) |
| `jsx-a11y/no-noninteractive-tabindex` | ❌ Not available | Runtime-only concern |
| `jsx-a11y/no-redundant-roles` | `test-a11y-js/semantic-html` | ✅ Available (AST-based) |
| `jsx-a11y/no-static-element-interactions` | ❌ Not available | Runtime-only concern |
| `jsx-a11y/role-has-required-aria-props` | `test-a11y-js/aria-validation` | ✅ Available (AST-based) |
| `jsx-a11y/role-supports-aria-props` | `test-a11y-js/aria-validation` | ✅ Available (AST-based) |
| `jsx-a11y/scope` | `test-a11y-js/table-structure` | ✅ Available |
| `jsx-a11y/tabindex-no-positive` | ❌ Not available | Runtime-only concern |

**Legend:**
- ✅ Available now
- ❌ Not available (runtime-only concerns, use A11yChecker API)

## Step-by-Step Migration

### Step 1: Install test-a11y-js

```bash
npm uninstall eslint-plugin-jsx-a11y
npm install --save-dev eslint-plugin-test-a11y-js
```

### Step 2: Update ESLint Configuration

#### Classic Config (.eslintrc.js)

**Before (jsx-a11y):**
```javascript
module.exports = {
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y']
}
```

**After (test-a11y-js):**
```javascript
module.exports = {
  extends: ['plugin:test-a11y-js/recommended'],
  plugins: ['test-a11y-js']
}
```

#### Flat Config (eslint.config.js)

**Before (jsx-a11y):**
```javascript
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  jsxA11y.configs.recommended
]
```

**After (test-a11y-js):**
```javascript
import testA11yJs from 'eslint-plugin-test-a11y-js'

export default [
  {
    plugins: {
      'test-a11y-js': testA11yJs
    },
    ...testA11yJs.configs['flat/recommended']
  }
]
```

### Step 3: Map Your Rules

Update rule names in your config:

```javascript
// .eslintrc.js
module.exports = {
  extends: ['plugin:test-a11y-js/recommended'],
  plugins: ['test-a11y-js'],
  rules: {
    // Map jsx-a11y rules to test-a11y-js
    'test-a11y-js/image-alt': 'error',        // was: jsx-a11y/alt-text
    'test-a11y-js/link-text': 'warn',         // was: jsx-a11y/anchor-is-valid
    'test-a11y-js/form-label': 'error',       // was: jsx-a11y/label-has-associated-control
    'test-a11y-js/iframe-title': 'error',    // was: jsx-a11y/iframe-has-title
    'test-a11y-js/heading-order': 'warn',    // was: jsx-a11y/heading-has-content
    'test-a11y-js/table-structure': 'error'   // was: jsx-a11y/scope
  }
}
```

### Step 4: Add Component Mapping (If Needed)

If you use design-system components, add component mapping:

```javascript
// .eslintrc.js
module.exports = {
  extends: ['plugin:test-a11y-js/recommended'],
  plugins: ['test-a11y-js'],
  settings: {
    'test-a11y-js': {
      components: {
        Link: 'a',
        Button: 'button',
        Image: 'img'
      },
      polymorphicPropNames: ['as', 'component']
    }
  }
}
```

### Step 5: Handle Missing Rules

For rules not available in test-a11y-js:

1. **Runtime-only rules** (keyboard events, focus, etc.):
   - Use `A11yChecker` programmatic API in tests
   - See [Integration Guide](./INTEGRATION.md)

2. **ARIA rules**:
   - ✅ Available in `test-a11y-js/aria-validation` (v0.12.0+)
   - ✅ Semantic HTML rules available in `test-a11y-js/semantic-html` (v0.12.0+)
   - ✅ Form validation available in `test-a11y-js/form-validation` (v0.12.0+)

3. **Other missing rules**:
   - Check if A11yChecker API covers it
   - Consider if it's truly needed (some jsx-a11y rules are overly strict)

## Compatibility Bridge Preset

For a smoother transition, you can use both plugins temporarily:

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:test-a11y-js/recommended',
    'plugin:jsx-a11y/recommended' // Keep for missing rules
  ],
  plugins: ['test-a11y-js', 'jsx-a11y'],
  rules: {
    // Disable jsx-a11y rules that test-a11y-js covers
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/scope': 'off'
  }
}
```

## Feature Comparison

| Feature | jsx-a11y | test-a11y-js |
|---------|----------|--------------|
| React support | ✅ | ✅ |
| Vue support | ❌ | ✅ |
| Component mapping | ⚠️ Limited | ✅ Full support |
| Polymorphic components | ❌ | ✅ |
| Rule options | ⚠️ Limited | ✅ Extensive |
| Flat config | ⚠️ Partial | ✅ Full support |
| Programmatic API | ❌ | ✅ A11yChecker |
| Bundle size | Larger | 35KB |

## Common Migration Issues

### Issue: "Rules not working"

**Solution:** Ensure you've updated both `extends` and `plugins`:

```javascript
// ✅ Correct
{
  extends: ['plugin:test-a11y-js/recommended'],
  plugins: ['test-a11y-js']
}

// ❌ Wrong - missing plugin
{
  extends: ['plugin:test-a11y-js/recommended']
}
```

### Issue: "Component rules not applying"

**Solution:** Add component mapping in settings:

```javascript
{
  settings: {
    'test-a11y-js': {
      components: { Link: 'a', Button: 'button' }
    }
  }
}
```

### Issue: "Different error messages"

**Solution:** test-a11y-js uses different message IDs. Update your CI/CD or tooling that parses ESLint output.

## Next Steps

1. ✅ Complete migration to test-a11y-js
2. ✅ Enable ARIA rules: `test-a11y-js/aria-validation`, `test-a11y-js/semantic-html`, `test-a11y-js/form-validation`
3. 📚 Read [Configuration Guide](./CONFIGURATION.md) for advanced options
4. 🧪 Set up A11yChecker for runtime testing (see [Integration Guide](./INTEGRATION.md))
5. 🔗 Use runtime comment convention for static + runtime workflow (see [ESLint Plugin Guide](./ESLINT_PLUGIN.md#static--runtime-workflow))

## Need Help?

- Check [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Review [Configuration Guide](./CONFIGURATION.md)
- Open an issue on GitHub
