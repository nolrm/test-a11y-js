# Testing Checklist

This document tracks testing improvements and coverage for `test-a11y-js`.

## ✅ Completed

- [x] Core A11yChecker unit tests (all 13 check methods)
- [x] ESLint rule structure tests (all rules)
- [x] Vue AST utilities tests
- [x] Basic React/JSX tests
- [x] Real-world component examples
- [x] ArticleCard Vue component test
- [x] Test fixtures library (test-fixtures.ts)
- [x] Test helpers library (test-helpers.ts)
- [x] Testing checklist document

## ⚠️ Known Issues

### Module Resolution in Tests
- RuleTester tests have module resolution issues with vitest
- This is a known limitation documented in TESTING.md
- Workaround: Use structure tests (file reading) or integration tests with built plugin
- Status: Needs investigation for proper fix

## 🔥 High Priority (Immediate)

### Missing ESLint Rule Tests
- [ ] `iframe-title-rule.test.ts` - ESLint rule tests for iframe-title
- [ ] `landmark-roles-rule.test.ts` - ESLint rule tests for landmark-roles
- [ ] `dialog-modal-rule.test.ts` - ESLint rule tests for dialog-modal

### Vue Integration Tests
- [ ] Vue SFC (Single File Component) tests with `<template>`, `<script>`, `<style>`
- [ ] Vue 3 Composition API scenarios
- [ ] Vue dynamic props and computed attributes
- [ ] Vue slots and conditional rendering
- [ ] Vue v-if, v-for, v-show patterns

### React Advanced Scenarios
- [ ] React hooks components (useState, useEffect patterns)
- [ ] React functional components with props
- [ ] React fragments (`<>...</>`)
- [ ] React conditional rendering patterns
- [ ] TypeScript React with interfaces/types
- [ ] React children patterns

### Configuration Preset Tests
- [ ] Minimal config preset tests
- [ ] Recommended config preset tests
- [ ] Strict config preset tests
- [ ] React config preset tests
- [ ] Vue config preset tests

## 📋 Short Term (Medium Priority)

### Complex Scenarios
- [ ] Nested components (components within components)
- [ ] Dynamic component rendering
- [ ] Template literals with expressions
- [ ] Complex form scenarios (nested forms, fieldset groups)
- [ ] Table with merged cells (colspan/rowspan)
- [ ] Multiple landmarks on same page
- [ ] Dialog with focus trap scenarios
- [ ] Video/audio with multiple tracks

### Error Handling Tests
- [ ] Malformed AST handling
- [ ] Missing dependencies (jsdom) graceful fallback
- [ ] Invalid parser configurations
- [ ] Edge cases (null, undefined, empty strings)

### Performance Tests
- [ ] Large file performance (1000+ lines)
- [ ] Many violations performance
- [ ] ESLint cache effectiveness
- [ ] Memory usage tests

### Coverage Reporting
- [ ] Set up vitest coverage configuration
- [ ] Generate coverage reports
- [ ] Set coverage thresholds
- [ ] Track coverage over time

## 🎯 Long Term (Nice to Have)

### E2E Testing
- [ ] Full plugin execution tests with actual ESLint
- [ ] Real project integration tests
- [ ] CI/CD simulation tests
- [ ] Multiple ESLint versions compatibility

### Advanced Testing
- [ ] Visual regression tests (if applicable)
- [ ] Accessibility testing of the testing tool itself
- [ ] Cross-browser testing (if applicable)
- [ ] Performance benchmarking suite

### Test Infrastructure
- [ ] Shared test fixtures library
- [ ] Reusable component examples
- [ ] Test data generators
- [ ] Mock ESLint environments

## 🛠️ Test Quality Improvements

### Test Organization
- [x] Group by framework (React, Vue, HTML)
- [x] Separate unit vs integration clearly
- [ ] Create test utilities/helpers
- [ ] Standardize test file naming

### Test Data
- [ ] Create shared test fixtures
- [ ] Reusable component examples
- [ ] Test data generators
- [ ] Mock data factories

### Assertions
- [ ] More specific error message checks
- [ ] Verify exact violation locations
- [ ] Test violation ordering
- [ ] Test impact levels

### Documentation
- [ ] Document test patterns
- [ ] Add examples for contributors
- [ ] Create testing guide
- [ ] Document test utilities

## 📊 Test Coverage Goals

### Current Coverage
- Core A11yChecker: ~95%
- ESLint Rules: ~70% (missing 3 rule tests)
- Vue Integration: ~40% (basic only)
- React Integration: ~50% (basic only)
- Config Presets: ~0% (not tested)

### Target Coverage
- Core A11yChecker: 100%
- ESLint Rules: 100%
- Vue Integration: 80%
- React Integration: 80%
- Config Presets: 100%
- Overall: 85%+

## Notes

- High priority items should be completed before v0.8.0
- Short term items can be done incrementally
- Long term items are aspirational improvements
- Test quality improvements should be ongoing

