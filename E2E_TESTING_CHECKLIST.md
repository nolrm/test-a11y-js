# E2E Testing Implementation Checklist

## Phase 1: Fix the Bug ⚠️ CRITICAL

### 1.1 Fix form-label.ts
- [ ] Add type guard to check `jsxNode.name.type === 'JSXIdentifier'`
- [ ] Return early for member expressions
- [ ] Test locally with member expression JSX

### 1.2 Audit ALL Rules
- [ ] image-alt.ts - check for similar bug
- [ ] button-label.ts - check for similar bug
- [ ] link-text.ts - check for similar bug
- [ ] heading-order.ts - check for similar bug
- [ ] iframe-title.ts - check for similar bug
- [ ] fieldset-legend.ts - check for similar bug
- [ ] table-structure.ts - check for similar bug
- [ ] details-summary.ts - check for similar bug
- [ ] video-captions.ts - check for similar bug
- [ ] audio-captions.ts - check for similar bug
- [ ] landmark-roles.ts - check for similar bug
- [ ] dialog-modal.ts - check for similar bug

### 1.3 Build and Test Locally
- [ ] Run `npm run build`
- [ ] Run `npm run test:core`
- [ ] Run `npm run lint`
- [ ] Run `npm run type-check`

---

## Phase 2: Create E2E Test Infrastructure

### 2.1 Create Directory Structure
- [ ] Create `tests/e2e/` directory
- [ ] Create `tests/e2e/fixtures/` directory
- [ ] Create `tests/e2e/fixtures/react-app/` directory
- [ ] Create `tests/e2e/fixtures/react-app/src/` directory
- [ ] Create `tests/e2e/fixtures/react-app/src/components/` directory

### 2.2 Create React Fixture Files
- [ ] Create `tests/e2e/fixtures/react-app/.eslintrc.json`
- [ ] Create `tests/e2e/fixtures/react-app/package.json`
- [ ] Create `tests/e2e/fixtures/react-app/src/App.tsx`
- [ ] Create `tests/e2e/fixtures/react-app/src/components/EdgeCases.tsx`
- [ ] Create `tests/e2e/fixtures/react-app/src/components/Form.tsx`

### 2.3 Edge Cases Coverage
- [ ] Member expressions (`<Form.Input>`)
- [ ] Nested member expressions (`<UI.Form.Input>`)
- [ ] Spread attributes (`<input {...props}>`)
- [ ] Dynamic components
- [ ] Plain inputs (should error)
- [ ] Inputs with aria-label (should pass)
- [ ] Images without alt (should error)
- [ ] Images with alt (should pass)

---

## Phase 3: Implement CLI-Based Tests

### 3.1 Create Test File
- [ ] Create `tests/vitest/integration/eslint-cli-e2e.test.ts`
- [ ] Import necessary utilities (exec, promisify, path, fs)

### 3.2 Implement Test Cases
- [ ] Test: "should run ESLint CLI without crashing"
- [ ] Test: "should handle member expressions without crashing"
- [ ] Test: "should detect expected violations"
- [ ] Test: "should work with recommended config"
- [ ] Test: "should work with react config"
- [ ] Test: "should work with strict config"

### 3.3 Test Assertions
- [ ] Verify no fatal errors
- [ ] Verify expected violations found
- [ ] Verify plugin loads correctly
- [ ] Verify JSON output parseable
- [ ] Handle ESLint exit code 1 (violations found)

---

## Phase 4: Integration with CI/CD

### 4.1 Update package.json
- [ ] Add `test:e2e` script
- [ ] Update `test:all` to include E2E tests
- [ ] Update `pre-check` script

### 4.2 Local Verification
- [ ] Run `npm run test:e2e` locally
- [ ] Verify all tests pass
- [ ] Check test output for clarity

### 4.3 Documentation
- [ ] Update README.md with E2E testing info
- [ ] Add section about running E2E tests
- [ ] Document edge cases covered

---

## Phase 5: Build, Test, Commit, Publish

### 5.1 Full Build
- [ ] Run `npm run build`
- [ ] Verify bundle sizes (35KB plugin, 96KB core)

### 5.2 Complete Test Suite
- [ ] Run `npm run test:core`
- [ ] Run `npm run test:e2e`
- [ ] Run `npm run lint`
- [ ] Run `npm run type-check`
- [ ] Run `npm run pre-check` (all of the above)

### 5.3 Version Bump
- [ ] Update `package.json` version to 0.10.4
- [ ] Update `plugin-structure.test.ts` version expectation

### 5.4 Git Commit
- [ ] Stage all changes
- [ ] Commit with descriptive message
- [ ] Push to GitHub

### 5.5 Verify GitHub Actions
- [ ] Check GitHub Actions run
- [ ] Verify build passes
- [ ] Verify tests pass
- [ ] Verify publish succeeds
- [ ] Check npm for v0.10.4

---

## Phase 6: Test in Real Project (graphora)

### 6.1 Update Package
- [ ] Run `pnpm update eslint-plugin-test-a11y-js` in graphora
- [ ] Verify version is 0.10.4

### 6.2 Test Linting
- [ ] Run `pnpm lint` in graphora
- [ ] Should NOT crash with "Cannot read properties of undefined"
- [ ] Should show expected accessibility violations (if any)

---

## Phase 7: Cleanup

### 7.1 Delete Plan Files
- [ ] Delete `E2E_TESTING_PLAN.md`
- [ ] Delete `E2E_TESTING_CHECKLIST.md`
- [ ] Commit deletion

---

## Success Metrics

- ✅ Zero crashes on member expressions
- ✅ All 13 rules work correctly
- ✅ E2E tests pass locally
- ✅ E2E tests pass in CI/CD
- ✅ graphora project lints without crashes
- ✅ Version 0.10.4 published to npm
- ✅ Documentation updated

## Notes

- Keep commits atomic (separate commits for bug fixes, tests, docs)
- Test thoroughly before pushing
- Ensure backward compatibility
- Document any breaking changes (none expected)

