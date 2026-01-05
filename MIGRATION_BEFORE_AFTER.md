# Migration: Before & After Comparison

Visual comparison of the changes for the package rename.

## Package Structure

### Before (test-a11y-js)

```
package.json
├── name: "test-a11y-js"
├── version: "0.8.2"
├── main: "dist/index.js" (core library)
├── module: "dist/index.mjs" (core library)
├── types: "dist/index.d.ts" (core library)
└── exports:
    ├── "." → dist/index.js (core library)
    └── "./eslint-plugin" → dist/linter/eslint-plugin/index.js
```

### After (eslint-plugin-test-a11y-js)

```
package.json
├── name: "eslint-plugin-test-a11y-js"
├── version: "0.9.0"
├── main: "dist/linter/eslint-plugin/index.js" (ESLint plugin)
├── module: "dist/linter/eslint-plugin/index.mjs" (ESLint plugin)
├── types: "dist/linter/eslint-plugin/index.d.ts" (ESLint plugin)
└── exports:
    ├── "." → dist/linter/eslint-plugin/index.js (ESLint plugin)
    └── "./core" → dist/index.js (core library)
```

## Import Examples

### ESLint Configuration

#### Before & After (No Change ✅)

```json
// .eslintrc.json
{
  "plugins": ["test-a11y-js"],
  "extends": ["plugin:test-a11y-js/recommended"]
}
```

**Status:** ✅ No changes needed! ESLint config stays the same.

---

### Core Library Import

#### Before

```typescript
// ESM
import { A11yChecker } from 'test-a11y-js'

// CJS
const { A11yChecker } = require('test-a11y-js')
```

#### After

```typescript
// ESM
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'

// CJS
const { A11yChecker } = require('eslint-plugin-test-a11y-js/core')
```

**Status:** ⚠️ Breaking change - import path changes

---

### ESLint Plugin Import (Manual)

#### Before

```typescript
// ESM
import plugin from 'test-a11y-js/eslint-plugin'

// CJS
const plugin = require('test-a11y-js/eslint-plugin')
```

#### After

```typescript
// ESM
import plugin from 'eslint-plugin-test-a11y-js'

// CJS
const plugin = require('eslint-plugin-test-a11y-js')
```

**Status:** ⚠️ Breaking change - import path changes (but rarely used)

---

## File Structure

### Source Files (No Changes)

```
src/
├── index.ts (core library exports)
└── linter/
    └── eslint-plugin/
        └── index.ts (ESLint plugin)
```

**Status:** ✅ No source file changes needed

---

### Build Output (No Changes)

```
dist/
├── index.js (core library)
├── index.mjs (core library)
├── index.d.ts (core library)
└── linter/
    └── eslint-plugin/
        ├── index.js (ESLint plugin)
        ├── index.mjs (ESLint plugin)
        └── index.d.ts (ESLint plugin)
```

**Status:** ✅ Build output structure unchanged

---

## ESLint Resolution

### Before

```json
// .eslintrc.json
{
  "plugins": ["test-a11y-js"]
}
```

**Result:** ❌ Error - ESLint looks for `eslint-plugin-test-a11y-js`, finds `test-a11y-js`, fails

**Workaround:** Must use JavaScript config file to manually load plugin

---

### After

```json
// .eslintrc.json
{
  "plugins": ["test-a11y-js"]
}
```

**Result:** ✅ Success - ESLint finds `eslint-plugin-test-a11y-js`, loads automatically

**Benefit:** Works with JSON config files!

---

## Package.json Comparison

### Before

```json
{
  "name": "test-a11y-js",
  "version": "0.8.2",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./eslint-plugin": {
      "import": "./dist/linter/eslint-plugin/index.mjs",
      "require": "./dist/linter/eslint-plugin/index.js",
      "types": "./dist/linter/eslint-plugin/index.d.ts"
    }
  }
}
```

### After

```json
{
  "name": "eslint-plugin-test-a11y-js",
  "version": "0.9.0",
  "main": "dist/linter/eslint-plugin/index.js",
  "module": "dist/linter/eslint-plugin/index.mjs",
  "types": "dist/linter/eslint-plugin/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/linter/eslint-plugin/index.mjs",
      "require": "./dist/linter/eslint-plugin/index.js",
      "types": "./dist/linter/eslint-plugin/index.d.ts"
    },
    "./core": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

---

## User Impact

### ESLint Users (Most Users)

**Impact:** ✅ Positive - Now works with `.eslintrc.json` files!

**Action Required:** 
- Update package name in `package.json`
- No config changes needed

```bash
# Before
npm install --save-dev test-a11y-js

# After
npm install --save-dev eslint-plugin-test-a11y-js
```

---

### Programmatic API Users (Fewer Users)

**Impact:** ⚠️ Breaking change - import path changes

**Action Required:**
- Update import statements

```typescript
// Before
import { A11yChecker } from 'test-a11y-js'

// After
import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'
```

---

## Benefits Summary

### ✅ Benefits

1. **Works with `.eslintrc.json`** - No JavaScript config needed
2. **Follows conventions** - Standard ESLint plugin naming
3. **Better discoverability** - Easier to find on npm
4. **Automatic resolution** - ESLint finds plugin automatically
5. **Clearer purpose** - Package name indicates it's an ESLint plugin

### ⚠️ Trade-offs

1. **Breaking change** - Core library import path changes
2. **Longer package name** - `eslint-plugin-test-a11y-js` vs `test-a11y-js`
3. **Migration required** - Users need to update imports

---

## Migration Effort

### For ESLint Users (90% of users)

**Effort:** 🟢 Low
- Update package name in `package.json`
- No code changes needed

### For Programmatic API Users (10% of users)

**Effort:** 🟡 Medium
- Update package name
- Update import statements (find & replace)

---

## Summary

| Aspect | Before | After | Change |
|--------|--------|-------|--------|
| Package name | `test-a11y-js` | `eslint-plugin-test-a11y-js` | ⚠️ Breaking |
| ESLint config | Manual load required | Auto-resolves | ✅ Improvement |
| Core import | `from 'test-a11y-js'` | `from 'eslint-plugin-test-a11y-js/core'` | ⚠️ Breaking |
| JSON config | ❌ Doesn't work | ✅ Works | ✅ Improvement |
| Source files | No change | No change | ✅ No impact |
| Build output | No change | No change | ✅ No impact |

**Overall:** ✅ Positive change with minimal breaking impact (early stage project)

