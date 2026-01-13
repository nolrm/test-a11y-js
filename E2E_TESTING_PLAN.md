# End-to-End Testing Implementation Plan

## Overview
Implement CLI-based end-to-end testing to catch real-world issues before they reach production.

## Current Problem
- Plugin crashes in production with member expressions (e.g., `<Form.Input>`)
- Error: `Cannot read properties of undefined (reading 'name')`
- Current tests use ESLint API programmatically, but don't test the actual CLI experience
- Need to test how users actually run the plugin: `pnpm lint` or `npm run lint`

## Root Cause
`form-label.ts` line 35 assumes `jsxNode.name` is always a simple JSXIdentifier, but it can be:
- JSXMemberExpression (e.g., `<Form.Input>`)
- JSXNamespacedName (e.g., `<namespace:component>`)

## Solution Architecture

### Phase 1: Fix the Bug
1. Add type guard in `form-label.ts` to handle member expressions
2. Skip non-identifier JSX elements (member expressions, namespaced names)
3. Similar fixes needed in ALL rules that check `jsxNode.name.name`

### Phase 2: Create E2E Test Infrastructure
1. Create `tests/e2e/fixtures/` directory structure
2. Set up React fixture app with `.eslintrc.json`
3. Create fixture files with edge cases:
   - Member expressions (`<Form.Input>`)
   - Spread attributes
   - Dynamic components
   - Namespaced JSX
4. Set up Vue fixture app

### Phase 3: Implement CLI-Based Tests
1. Create `tests/vitest/integration/eslint-cli-e2e.test.ts`
2. Use `child_process.exec` to run actual ESLint CLI
3. Parse JSON output to verify:
   - No fatal errors (crashes)
   - Expected violations detected
   - Plugin loads correctly
4. Test all configuration presets (minimal, recommended, strict, react, vue)

### Phase 4: Integration with CI/CD
1. Add `test:e2e` script to package.json
2. Update `pre-check` to include E2E tests
3. Update GitHub Actions to run E2E tests
4. Document in README

## File Structure

```
tests/
  e2e/
    fixtures/
      react-app/
        .eslintrc.json          # Plugin configuration
        package.json            # Minimal deps
        src/
          App.tsx               # Simple component
          components/
            EdgeCases.tsx       # All edge cases in one file
            Form.tsx            # Common form patterns
      vue-app/
        .eslintrc.json
        src/
          App.vue
          components/
            Form.vue
  vitest/
    integration/
      eslint-cli-e2e.test.ts    # Main CLI test
```

## Test Coverage

### Edge Cases to Test
1. **Member Expressions**
   - `<Form.Input>`
   - `<UI.Form.Field.Input>`
   - Nested 3+ levels

2. **Spread Attributes**
   - `<input {...props}>`
   - `<button {...buttonProps}>Click</button>`

3. **Dynamic Components**
   - `<Component type="text">`
   - Variable component names

4. **Namespaced JSX**
   - `<namespace:component>`

5. **Fragments**
   - `<><input /></>`
   - `<React.Fragment>`

6. **Complex Nesting**
   - Forms with multiple controls
   - Nested interactive elements

### Expected Violations
1. Missing alt on `<img>`
2. Missing label on `<input>`
3. Empty button
4. Non-descriptive link text
5. Skipped heading levels

## Rules That Need Type Guards

Check ALL rules for similar bugs:
- ✅ form-label.ts (known issue)
- ❓ image-alt.ts
- ❓ button-label.ts
- ❓ link-text.ts
- ❓ heading-order.ts
- ❓ iframe-title.ts
- ❓ fieldset-legend.ts
- ❓ table-structure.ts
- ❓ details-summary.ts
- ❓ video-captions.ts
- ❓ audio-captions.ts
- ❓ landmark-roles.ts
- ❓ dialog-modal.ts

## Success Criteria

1. ✅ No crashes on member expressions
2. ✅ CLI tests run successfully
3. ✅ All edge cases tested
4. ✅ Tests fail when plugin has bugs
5. ✅ Tests pass when plugin works correctly
6. ✅ E2E tests run in CI/CD
7. ✅ Documentation updated

## Timeline

- Phase 1: 15 minutes (fix bug, verify all rules)
- Phase 2: 20 minutes (create fixtures)
- Phase 3: 25 minutes (implement tests)
- Phase 4: 10 minutes (CI/CD integration)

**Total: ~70 minutes**

## Version Bump

After all fixes: **v0.10.4**

## Rollback Plan

If E2E tests fail unexpectedly:
1. Comment out new tests temporarily
2. Keep bug fixes
3. Publish v0.10.4 with just bug fixes
4. Fix tests in v0.10.5

