# Comprehensive Migration Plan: test-a11y-js → eslint-plugin-test-a11y-js

## Overview

This plan details the migration from `test-a11y-js` to `eslint-plugin-test-a11y-js` to follow ESLint plugin naming conventions and enable automatic plugin resolution in `.eslintrc.json` files.

**Version:** 0.8.2 → 0.9.0 (breaking change)

**Goal:** Enable ESLint to automatically resolve the plugin when using `plugins: ['test-a11y-js']` in `.eslintrc.json` files.

---

## Phase 1: Package Structure Changes

### 1.1 Update package.json

**File:** `package.json`

**Changes:**
- Update `name`: `"test-a11y-js"` → `"eslint-plugin-test-a11y-js"`
- Update `version`: `"0.8.2"` → `"0.9.0"`
- Update `description`: Focus on ESLint plugin, mention programmatic API
- Update `main`: Point to ESLint plugin (`dist/linter/eslint-plugin/index.js`)
- Update `module`: Point to ESLint plugin ESM (`dist/linter/eslint-plugin/index.mjs`)
- Update `types`: Point to ESLint plugin types (`dist/linter/eslint-plugin/index.d.ts`)
- Restructure `exports`:
  - Main export (`.`) → ESLint plugin
  - `./core` → Core library (`A11yChecker`)

**New package.json structure:**
```json
{
  "name": "eslint-plugin-test-a11y-js",
  "version": "0.9.0",
  "description": "ESLint plugin for accessibility testing. Zero-config for React, Vue & JSX. Includes programmatic API.",
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

**Verification:**
- [ ] Package name follows `eslint-plugin-*` convention
- [ ] Main export points to ESLint plugin
- [ ] Core library accessible at `./core`
- [ ] All export paths are correct

---

### 1.2 Update ESLint Plugin Meta (Optional but Recommended)

**File:** `src/linter/eslint-plugin/index.ts`

**Changes:**
- Update `meta.name` to match package name
- Update `meta.version` to match package version

**Change:**
```typescript
const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-plugin-test-a11y-js',  // Update from 'test-a11y-js'
    version: '0.9.0'  // Update from '0.8.2'
  },
  // ... rest stays the same
}
```

**Verification:**
- [ ] Plugin meta name matches package name
- [ ] Version matches package version

---

## Phase 2: Source Code Changes

### 2.1 No Source File Restructuring Required

**Decision:** Keep current source structure. The build already outputs both files correctly:
- `dist/index.js` → Core library (for `./core` export)
- `dist/linter/eslint-plugin/index.js` → ESLint plugin (for main export)

**No changes needed to:**
- `src/index.ts`
- `src/linter/eslint-plugin/index.ts`
- `tsup.config.ts`

**Rationale:** Package.json exports handle the routing. No source restructuring needed.

---

## Phase 3: Test Updates

### 3.1 Update Existing Tests

**Files to update:**

#### `tests/vitest/integration/eslint-plugin-import.test.ts`
- Update package name checks
- Update export path assertions
- Verify main export is ESLint plugin
- Verify `./core` export exists

**Changes:**
```typescript
// Update package name check
expect(pkg.name).toBe('eslint-plugin-test-a11y-js')

// Update main export check
expect(pkg.main).toBe('dist/linter/eslint-plugin/index.js')

// Add core export check
expect(pkg.exports['./core']).toBeDefined()
```

#### `tests/vitest/integration/build-verification.test.ts`
- Update package name assertions
- Update export path checks
- Verify both exports work

#### `tests/vitest/integration/eslint-rules.test.ts`
- Update import comments if any
- Verify tests still work with new structure

#### `tests/vitest/unit/linter/plugin-structure.test.ts`
- Update import comment: `'test-a11y-js/eslint-plugin'` → `'eslint-plugin-test-a11y-js'`

**Verification:**
- [ ] All tests updated with new package name
- [ ] Export path assertions updated
- [ ] All tests pass

---

### 3.2 Add Plugin Auto-Resolution Test

**New file:** `tests/vitest/integration/eslint-plugin-auto-resolution.test.ts`

**Purpose:** Verify ESLint can automatically resolve the plugin by name.

**Test cases:**
1. Package name follows `eslint-plugin-*` convention
2. Main export is ESLint plugin
3. Core library accessible at `./core`
4. Plugin can be imported correctly
5. Plugin structure is correct (rules, configs, meta)

**Implementation:**
```typescript
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

describe('ESLint Plugin Auto-Resolution', () => {
  it('should have correct package name for ESLint auto-resolution', () => {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    
    expect(pkg.name).toMatch(/^eslint-plugin-/)
    const pluginName = pkg.name.replace(/^eslint-plugin-/, '')
    expect(pluginName).toBe('test-a11y-js')
  })
  
  it('should have main export pointing to ESLint plugin', () => {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    
    expect(pkg.main).toBe('dist/linter/eslint-plugin/index.js')
    expect(pkg.exports['.']).toBeDefined()
    expect(pkg.exports['.'].require).toBe('./dist/linter/eslint-plugin/index.js')
  })
  
  it('should have core library at ./core export', () => {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    
    expect(pkg.exports['./core']).toBeDefined()
    expect(pkg.exports['./core'].require).toBe('./dist/index.js')
  })
  
  it('should be importable as ESLint plugin', () => {
    const pluginPath = join(process.cwd(), 'dist/linter/eslint-plugin/index.js')
    const plugin = require(pluginPath).default
    
    expect(plugin).toBeDefined()
    expect(plugin.meta).toBeDefined()
    expect(plugin.meta.name).toBe('eslint-plugin-test-a11y-js')
    expect(plugin.rules).toBeDefined()
    expect(plugin.configs).toBeDefined()
  })
  
  it('should be importable as core library from ./core', () => {
    const corePath = join(process.cwd(), 'dist/index.js')
    const core = require(corePath)
    
    expect(core.A11yChecker).toBeDefined()
  })
})
```

**Verification:**
- [ ] Test file created
- [ ] All test cases pass
- [ ] Test added to test suite

---

## Phase 4: Documentation Updates

### 4.1 Update README.md

**Changes needed:**
1. Update package name in installation: `npm install --save-dev eslint-plugin-test-a11y-js`
2. Update npm badge URL (if exists)
3. Update all import examples:
   - Core library: `from 'test-a11y-js'` → `from 'eslint-plugin-test-a11y-js/core'`
   - ESLint config: No change (still `plugins: ['test-a11y-js']`)
4. Add breaking change notice at the top
5. Update all code examples

**Breaking Change Notice:**
```markdown
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
```

**Verification:**
- [ ] Installation command updated
- [ ] All import examples updated
- [ ] Breaking change notice added
- [ ] All code examples work

---

### 4.2 Update All Documentation Files

**Files to update:**

#### `docs/ESLINT_PLUGIN.md`
- Update installation: `npm install --save-dev eslint-plugin-test-a11y-js`
- Update all code examples
- Update package name references

#### `docs/INTEGRATION.md`
- Update package exports section
- Update import examples
- Update package name

#### `docs/CONFIGURATION.md`
- Update all code examples
- Update package name references

#### `docs/VUE_USAGE.md`
- Update import examples
- Update package name

#### `docs/EXAMPLES.md`
- Update all code examples
- Update import paths

#### `docs/TROUBLESHOOTING.md`
- Update package name references
- Update installation commands
- Update import examples

#### `docs/TESTING.md`
- Update package name references
- Update import examples

#### `docs/PERFORMANCE.md`
- Update package name references (if any)

#### `docs/LARGE_PROJECTS.md`
- Update package name references
- Update installation commands

**Search and replace patterns:**
- `test-a11y-js` (in import statements) → `eslint-plugin-test-a11y-js/core`
- `npm install --save-dev test-a11y-js` → `npm install --save-dev eslint-plugin-test-a11y-js`
- `from 'test-a11y-js'` → `from 'eslint-plugin-test-a11y-js/core'`
- `require('test-a11y-js')` → `require('eslint-plugin-test-a11y-js/core'`

**Note:** ESLint config examples (`plugins: ['test-a11y-js']`) stay the same!

**Verification:**
- [ ] All docs updated
- [ ] All code examples work
- [ ] No broken links
- [ ] Import paths are correct

---

## Phase 5: Build and Verification

### 5.1 Build Verification

**Steps:**
1. Clean build: `npm run build`
2. Verify build outputs:
   - `dist/linter/eslint-plugin/index.js` exists (main export)
   - `dist/index.js` exists (core export)
   - All type definitions exist
3. Verify exports:
   - Main export loads ESLint plugin
   - `./core` export loads `A11yChecker`

**Commands:**
```bash
npm run build
node -e "console.log(require('./dist/linter/eslint-plugin/index.js').default)"
node -e "console.log(require('./dist/index.js').A11yChecker)"
```

**Verification:**
- [ ] Build succeeds
- [ ] All output files exist
- [ ] Main export is ESLint plugin
- [ ] Core export is `A11yChecker`

---

### 5.2 Test Suite Verification

**Steps:**
1. Run all tests: `npm test`
2. Verify new auto-resolution test passes
3. Verify all existing tests pass
4. Check for any test failures

**Commands:**
```bash
npm test
npm run test:core
```

**Verification:**
- [ ] All tests pass
- [ ] New auto-resolution test passes
- [ ] No test failures

---

### 5.3 Manual Testing

**Test scenarios:**

1. **ESLint Plugin Resolution (JSON config)**
   - Create test project
   - Install package: `npm install --save-dev eslint-plugin-test-a11y-js`
   - Create `.eslintrc.json`:
     ```json
     {
       "plugins": ["test-a11y-js"],
       "extends": ["plugin:test-a11y-js/recommended"]
     }
     ```
   - Run: `npx eslint test.jsx`
   - Verify: Plugin resolves automatically

2. **Core Library Import**
   - Create test file:
     ```typescript
     import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'
     ```
   - Verify: Import works correctly

3. **ESLint Plugin Import (JS config)**
   - Create `.eslintrc.js`:
     ```javascript
     module.exports = {
       plugins: ['test-a11y-js'],
       extends: ['plugin:test-a11y-js/recommended']
     }
     ```
   - Verify: Works correctly

**Verification:**
- [ ] ESLint resolves plugin automatically
- [ ] Core library importable
- [ ] Both JS and JSON configs work

---

## Phase 6: Versioning and Publishing

### 6.1 Version Update

**File:** `package.json`

**Change:**
- `"version": "0.8.2"` → `"version": "0.9.0"`

**Rationale:** Breaking change requires minor version bump.

---

### 6.2 CHANGELOG Update (if exists)

**Add entry:**
```markdown
## [0.9.0] - YYYY-MM-DD

### Breaking Changes
- Package renamed from `test-a11y-js` to `eslint-plugin-test-a11y-js`
- Core library moved to `./core` export path
  - Old: `import { A11yChecker } from 'test-a11y-js'`
  - New: `import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'`

### Benefits
- ✅ Works with `.eslintrc.json` files (no JavaScript config needed)
- ✅ Follows ESLint plugin naming conventions
- ✅ Better npm discoverability
- ✅ Standard ESLint plugin resolution

### Migration
See README.md for migration instructions.
```

---

### 6.3 Publishing Strategy

**Option A: Deprecate Old Package (Recommended)**

1. Publish new package: `eslint-plugin-test-a11y-js@0.9.0`
2. Publish deprecation to old package: `test-a11y-js@0.8.3`
   - Add deprecation notice in package.json
   - Update README with migration instructions
3. Add note in old package pointing to new package

**Option B: Keep Both (Not Recommended)**
- Maintains backward compatibility but adds confusion
- Not recommended for early stage project

**Recommended: Option A**

---

## Phase 7: Post-Migration

### 7.1 Repository Updates

- [ ] Update GitHub repository description
- [ ] Update repository topics/tags
- [ ] Update any external links

### 7.2 Communication

- [ ] Create GitHub release with migration notes
- [ ] Update npm package description
- [ ] Announce migration (if applicable)

### 7.3 Monitoring

- [ ] Monitor npm downloads
- [ ] Check for issues related to migration
- [ ] Update migration guide based on feedback

---

## Summary of Changes

### Package Structure
- **Name:** `test-a11y-js` → `eslint-plugin-test-a11y-js`
- **Version:** `0.8.2` → `0.9.0`
- **Main export:** ESLint plugin
- **Core export:** `./core` → Core library

### Import Changes

| Use Case | Old | New |
|----------|-----|-----|
| ESLint config (JSON/JS) | `plugins: ['test-a11y-js']` | `plugins: ['test-a11y-js']` ✅ No change |
| Core library (ESM) | `from 'test-a11y-js'` | `from 'eslint-plugin-test-a11y-js/core'` |
| Core library (CJS) | `require('test-a11y-js')` | `require('eslint-plugin-test-a11y-js/core')` |

### Files Changed

**Modified:**
- `package.json` - Package name, exports, version
- `src/linter/eslint-plugin/index.ts` - Meta name/version (optional)
- All documentation files - Import examples, package name
- Test files - Package name assertions

**New:**
- `tests/vitest/integration/eslint-plugin-auto-resolution.test.ts` - Auto-resolution test

**Unchanged:**
- Source file structure
- Build configuration
- Core functionality

---

## Execution Checklist

### Pre-Migration
- [ ] Create feature branch: `feat/rename-to-eslint-plugin`
- [ ] Review all files that reference package name
- [ ] Backup current state

### Code Changes
- [ ] Update `package.json` name and exports
- [ ] Update ESLint plugin meta (optional)
- [ ] Update all import statements in codebase

### Tests
- [ ] Update existing test files
- [ ] Create auto-resolution test
- [ ] Run full test suite
- [ ] Verify all tests pass

### Documentation
- [ ] Update README.md
- [ ] Update all docs in `docs/` folder
- [ ] Add breaking change notice
- [ ] Update all code examples

### Verification
- [ ] Build package: `npm run build`
- [ ] Verify exports structure
- [ ] Test ESLint plugin resolution
- [ ] Test core library import
- [ ] Test in sample project with `.eslintrc.json`
- [ ] Verify all documentation examples work

### Publishing
- [ ] Update version in `package.json`
- [ ] Update CHANGELOG.md (if exists)
- [ ] Create migration announcement
- [ ] Publish new package
- [ ] Deprecate old package (if keeping it)

---

## Risk Assessment

### Low Risk
- Package.json changes (well-defined)
- Documentation updates (straightforward)
- Test updates (mechanical)

### Medium Risk
- Build verification (need to ensure exports work)
- Plugin resolution (need to test with actual ESLint)

### Mitigation
- Comprehensive testing
- Manual verification in test project
- Gradual rollout (deprecate old package)

---

## Timeline Estimate

- **Phase 1-2:** 30 minutes (package.json + source changes)
- **Phase 3:** 1 hour (test updates + new test)
- **Phase 4:** 2-3 hours (documentation updates)
- **Phase 5:** 1 hour (build + verification)
- **Phase 6-7:** 30 minutes (publishing + communication)

**Total:** ~5-6 hours

---

## Success Criteria

✅ ESLint automatically resolves plugin when using `plugins: ['test-a11y-js']`  
✅ Works with `.eslintrc.json` files  
✅ Core library importable from `eslint-plugin-test-a11y-js/core`  
✅ All tests pass  
✅ All documentation updated and accurate  
✅ No breaking changes for ESLint config (only import paths)  

---

## Notes

- This is a breaking change, but minimal impact since it's early stage
- ESLint config syntax stays the same (only package name changes)
- Core library import path changes, but functionality unchanged
- Migration is straightforward (update package name + import path)

