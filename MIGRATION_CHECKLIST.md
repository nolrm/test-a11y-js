# Migration Checklist: test-a11y-js → eslint-plugin-test-a11y-js

Quick reference checklist for the migration. See `MIGRATION_PLAN.md` for detailed instructions.

## Quick Summary

**Goal:** Rename package to follow ESLint naming conventions, enable `.eslintrc.json` support

**Breaking Change:** Core library import path changes

---

## Pre-Migration

- [ ] Create feature branch: `feat/rename-to-eslint-plugin`
- [ ] Review `MIGRATION_PLAN.md`
- [ ] Backup current state

---

## Phase 1: Package.json Changes

- [ ] Update `name`: `"test-a11y-js"` → `"eslint-plugin-test-a11y-js"`
- [ ] Update `version`: `"0.8.2"` → `"0.9.0"`
- [ ] Update `description` to focus on ESLint plugin
- [ ] Update `main`: `"dist/linter/eslint-plugin/index.js"`
- [ ] Update `module`: `"dist/linter/eslint-plugin/index.mjs"`
- [ ] Update `types`: `"dist/linter/eslint-plugin/index.d.ts"`
- [ ] Restructure `exports`:
  - [ ] Main (`.`) → ESLint plugin
  - [ ] `./core` → Core library

---

## Phase 2: Source Code (Optional)

- [ ] Update `src/linter/eslint-plugin/index.ts` meta.name
- [ ] Update `src/linter/eslint-plugin/index.ts` meta.version

---

## Phase 3: Tests

- [ ] Update `tests/vitest/integration/eslint-plugin-import.test.ts`
- [ ] Update `tests/vitest/integration/build-verification.test.ts`
- [ ] Update `tests/vitest/integration/eslint-rules.test.ts`
- [ ] Update `tests/vitest/unit/linter/plugin-structure.test.ts`
- [ ] Create `tests/vitest/integration/eslint-plugin-auto-resolution.test.ts`
- [ ] Run `npm test` - all tests pass

---

## Phase 4: Documentation

### README.md
- [ ] Update installation command
- [ ] Update all import examples
- [ ] Add breaking change notice
- [ ] Update npm badge URL (if exists)

### Docs Folder
- [ ] `docs/ESLINT_PLUGIN.md`
- [ ] `docs/INTEGRATION.md`
- [ ] `docs/CONFIGURATION.md`
- [ ] `docs/VUE_USAGE.md`
- [ ] `docs/EXAMPLES.md`
- [ ] `docs/TROUBLESHOOTING.md`
- [ ] `docs/TESTING.md`
- [ ] `docs/PERFORMANCE.md` (if needed)
- [ ] `docs/LARGE_PROJECTS.md`

**Search & Replace:**
- `npm install --save-dev test-a11y-js` → `npm install --save-dev eslint-plugin-test-a11y-js`
- `from 'test-a11y-js'` → `from 'eslint-plugin-test-a11y-js/core'`
- `require('test-a11y-js')` → `require('eslint-plugin-test-a11y-js/core'`

**Note:** ESLint config (`plugins: ['test-a11y-js']`) stays the same!

---

## Phase 5: Build & Verification

- [ ] Run `npm run build`
- [ ] Verify `dist/linter/eslint-plugin/index.js` exists
- [ ] Verify `dist/index.js` exists
- [ ] Test main export: `node -e "console.log(require('./dist/linter/eslint-plugin/index.js').default)"`
- [ ] Test core export: `node -e "console.log(require('./dist/index.js').A11yChecker)"`
- [ ] Run `npm test` - all pass
- [ ] Run `npm run test:core` - all pass

### Manual Testing
- [ ] Test ESLint with `.eslintrc.json` file
- [ ] Test core library import: `import { A11yChecker } from 'eslint-plugin-test-a11y-js/core'`
- [ ] Test ESLint plugin resolution works

---

## Phase 6: Publishing

- [ ] Update CHANGELOG.md (if exists)
- [ ] Create GitHub release
- [ ] Publish `eslint-plugin-test-a11y-js@0.9.0`
- [ ] Deprecate `test-a11y-js@0.8.3` (optional)

---

## Phase 7: Post-Migration

- [ ] Update GitHub repo description
- [ ] Update repository topics
- [ ] Monitor npm downloads
- [ ] Check for issues

---

## Import Changes Reference

| Use Case | Old | New |
|----------|-----|-----|
| **ESLint config** | `plugins: ['test-a11y-js']` | `plugins: ['test-a11y-js']` ✅ |
| **Core (ESM)** | `from 'test-a11y-js'` | `from 'eslint-plugin-test-a11y-js/core'` |
| **Core (CJS)** | `require('test-a11y-js')` | `require('eslint-plugin-test-a11y-js/core')` |

---

## Success Criteria

✅ ESLint auto-resolves plugin in `.eslintrc.json`  
✅ Core library importable from `./core`  
✅ All tests pass  
✅ All docs updated  
✅ Build succeeds  

---

## Quick Commands

```bash
# Build
npm run build

# Test
npm test
npm run test:core

# Verify exports
node -e "console.log(require('./dist/linter/eslint-plugin/index.js').default)"
node -e "console.log(require('./dist/index.js').A11yChecker)"
```

